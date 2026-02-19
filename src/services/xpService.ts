import { supabase } from './supabase';
import {
  addXP,
  calculateLevelInfo,
  getXPReward,
  XPAction,
} from '@/utils/xpCalculator';

/**
 * Service pour gérer les XP et niveaux dans Supabase
 */

export interface XPUpdateResult {
  success: boolean;
  newTotalXP: number;
  oldLevel: number;
  newLevel: number;
  leveledUp: boolean;
  levelsGained: number;
  error?: string;
}

/**
 * Ajoute des XP à un utilisateur et met à jour son niveau
 * Compatible avec le nouveau schema (profiles au lieu de user_progress)
 */
export const awardXP = async (
  userId: string,
  actionType: XPAction['type']
): Promise<XPUpdateResult> => {
  try {
    // 1. Récupérer la progression actuelle depuis profiles
    const { data: profileData, error: fetchError } = await supabase
      .from('profiles')
      .select('xp, level')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (!profileData) throw new Error('Profil utilisateur introuvable');

    // 2. Calculer les nouveaux XP
    const xpToAdd = getXPReward(actionType);
    const currentTotalXP = profileData.xp;
    const result = addXP(currentTotalXP, xpToAdd);

    // 3. Mettre à jour dans Supabase profiles
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        xp: result.newTotalXP,
        level: result.newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // 4. Logger dans xp_history
    await logXPHistory(userId, actionType, xpToAdd, result.newTotalXP, result.newLevel);

    // 5. Si level up, créer une notification et logger
    if (result.leveledUp) {
      await createLevelUpNotification(userId, result.newLevel);
      // Logger le level up comme action distincte
      await logXPHistory(userId, 'level_up' as any, 0, result.newTotalXP, result.newLevel);
    }

    return {
      success: true,
      newTotalXP: result.newTotalXP,
      oldLevel: result.oldLevel,
      newLevel: result.newLevel,
      leveledUp: result.leveledUp,
      levelsGained: result.levelsGained,
    };
  } catch (error: any) {
    console.error('Erreur lors de l\'attribution des XP:', error);
    return {
      success: false,
      newTotalXP: 0,
      oldLevel: 0,
      newLevel: 0,
      leveledUp: false,
      levelsGained: 0,
      error: error.message,
    };
  }
};

/**
 * Log les gains d'XP dans la table xp_history
 */
const logXPHistory = async (
  userId: string,
  action: XPAction['type'] | 'level_up',
  xpGained: number,
  totalXP: number,
  level: number
): Promise<void> => {
  try {
    const actionMap: Record<string, string> = {
      module: 'module_complete',
      daily_choice: 'daily_choice',
      quiz: 'quiz_success',
      streak_7: 'streak_7',
      invite_friend: 'invite_friend',
      level_up: 'level_up',
    };

    await supabase.from('xp_history').insert({
      user_id: userId,
      action: actionMap[action],
      xp_gained: xpGained,
      total_xp: totalXP,
      level: level,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erreur lors du log XP history:', error);
    // Ne pas bloquer l'attribution des XP si le log échoue
  }
};

/**
 * Récupère les informations de niveau détaillées pour un utilisateur
 * Compatible avec le nouveau schema (profiles)
 */
export const getUserLevelInfo = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('xp, level')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profil utilisateur introuvable');

    return {
      success: true,
      levelInfo: calculateLevelInfo(data.xp),
    };
  } catch (error: any) {
    console.error('Erreur lors de la récupération du niveau:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Ajoute des XP personnalisés (pour les admins ou cas spéciaux)
 * Compatible avec le nouveau schema (profiles)
 */
export const awardCustomXP = async (
  userId: string,
  xpAmount: number,
  reason: string
): Promise<XPUpdateResult> => {
  try {
    const { data: profileData, error: fetchError } = await supabase
      .from('profiles')
      .select('xp, level')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (!profileData) throw new Error('Profil utilisateur introuvable');

    const result = addXP(profileData.xp, xpAmount);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        xp: result.newTotalXP,
        level: result.newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Log de l'action admin
    console.log(`XP personnalisés attribués: ${xpAmount} XP à ${userId}. Raison: ${reason}`);

    // Logger dans xp_history avec metadata
    await supabase.from('xp_history').insert({
      user_id: userId,
      action: 'module_complete', // Action générique pour custom XP
      xp_gained: xpAmount,
      total_xp: result.newTotalXP,
      level: result.newLevel,
      metadata: { reason },
      created_at: new Date().toISOString(),
    });

    if (result.leveledUp) {
      await createLevelUpNotification(userId, result.newLevel);
      await logXPHistory(userId, 'level_up' as any, 0, result.newTotalXP, result.newLevel);
    }

    return {
      success: true,
      newTotalXP: result.newTotalXP,
      oldLevel: result.oldLevel,
      newLevel: result.newLevel,
      leveledUp: result.leveledUp,
      levelsGained: result.levelsGained,
    };
  } catch (error: any) {
    console.error('Erreur lors de l\'attribution des XP personnalisés:', error);
    return {
      success: false,
      newTotalXP: 0,
      oldLevel: 0,
      newLevel: 0,
      leveledUp: false,
      levelsGained: 0,
      error: error.message,
    };
  }
};

/**
 * Crée une notification de level up
 */
const createLevelUpNotification = async (
  userId: string,
  newLevel: number
): Promise<void> => {
  try {
    // Pour l'instant, on log juste
    // Plus tard, on pourra créer une table notifications
    console.log(`🎉 Level Up! User ${userId} a atteint le niveau ${newLevel}!`);
    
    // TODO: Insérer dans une table notifications si elle existe
    // await supabase.from('notifications').insert({...});
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
  }
};

/**
 * Récupère l'historique des gains d'XP (si on crée une table xp_history)
 */
export const getXPHistory = async (
  userId: string,
  limit: number = 10
) => {
  // TODO: Implémenter quand on aura une table xp_history
  console.log(`Récupération de l'historique XP pour ${userId} (limit: ${limit})`);
  return {
    success: true,
    history: [],
  };
};
