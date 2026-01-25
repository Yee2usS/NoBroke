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
 */
export const awardXP = async (
  userId: string,
  actionType: XPAction['type']
): Promise<XPUpdateResult> => {
  try {
    // 1. Récupérer la progression actuelle
    const { data: progressData, error: fetchError } = await supabase
      .from('user_progress')
      .select('xp, level')
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (!progressData) throw new Error('Progression utilisateur introuvable');

    // 2. Calculer les nouveaux XP
    const xpToAdd = getXPReward(actionType);
    const currentTotalXP = progressData.xp;
    const result = addXP(currentTotalXP, xpToAdd);

    // 3. Mettre à jour dans Supabase
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({
        xp: result.newTotalXP,
        level: result.newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    // 4. Si level up, créer une notification (optionnel)
    if (result.leveledUp) {
      await createLevelUpNotification(userId, result.newLevel);
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
 * Récupère les informations de niveau détaillées pour un utilisateur
 */
export const getUserLevelInfo = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('xp, level')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Progression utilisateur introuvable');

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
 */
export const awardCustomXP = async (
  userId: string,
  xpAmount: number,
  reason: string
): Promise<XPUpdateResult> => {
  try {
    const { data: progressData, error: fetchError } = await supabase
      .from('user_progress')
      .select('xp, level')
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (!progressData) throw new Error('Progression utilisateur introuvable');

    const result = addXP(progressData.xp, xpAmount);

    const { error: updateError } = await supabase
      .from('user_progress')
      .update({
        xp: result.newTotalXP,
        level: result.newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    // Log de l'action admin
    console.log(`XP personnalisés attribués: ${xpAmount} XP à ${userId}. Raison: ${reason}`);

    if (result.leveledUp) {
      await createLevelUpNotification(userId, result.newLevel);
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
