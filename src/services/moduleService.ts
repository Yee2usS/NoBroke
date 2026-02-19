import { supabase } from './supabase';
import { awardXP } from './xpService';
import {
  saveLocalModuleProgress,
  getLocalModuleProgress,
} from './moduleProgressLocalService';
import { MODULES, getModuleById as getModuleFromData } from '@/data/modulesData';
import {
  Module,
  ModuleWithProgress,
  UserModuleProgress,
  ModuleCompletionResult,
} from '@/types/module.types';

/**
 * Service pour gérer les modules d'apprentissage
 */

/**
 * Récupère tous les modules avec la progression de l'utilisateur
 */
export const getModules = async (
  userId: string,
  userLevel: number,
  subscriptionTier: 'free' | 'premium' | 'pro' = 'free'
): Promise<{
  success: boolean;
  modules: ModuleWithProgress[];
  error?: string;
}> => {
  try {
    // 1. Récupérer la progression de l'utilisateur depuis Supabase
    // Note: Pour le MVP, les modules ont des IDs custom (module-1-1) et non des UUIDs
    // La progression sera vide pour ces modules jusqu'à migration vers UUIDs
    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (progressError && progressError.code !== 'PGRST116') {
      // Ignore l'erreur si la table est vide
      console.warn('Erreur progression (ignorée pour MVP):', progressError);
    }

    // 2. Mapper la progression par module_id
    const progressMap: Record<string, UserModuleProgress> = {};
    (progressData || []).forEach((progress) => {
      progressMap[progress.module_id] = {
        moduleId: progress.module_id,
        completed: progress.completed,
        score: progress.score,
        completedAt: progress.completed_at,
      };
    });

    // 3. Récupérer la progression locale (IDs custom)
    const localProgress = await getLocalModuleProgress(userId);

    // 4. Enrichir les modules avec la progression (Supabase + local)
    const modulesWithProgress: ModuleWithProgress[] = MODULES.map((module) => {
      const dbProgress = progressMap[module.id];
      const local = localProgress[module.id];
      const progress = local
        ? {
            moduleId: module.id,
            completed: local.completed,
            score: local.score,
            completedAt: local.completedAt,
          }
        : dbProgress;
      const locked = userLevel < module.levelRequired;
      const premiumLocked = module.isPremium && subscriptionTier === 'free';

      return {
        ...module,
        progress,
        locked,
        premiumLocked,
      };
    });

    return {
      success: true,
      modules: modulesWithProgress,
    };
  } catch (error: any) {
    console.error('Erreur getModules:', error);
    return {
      success: false,
      modules: [],
      error: error.message,
    };
  }
};

/**
 * Récupère un module par son ID
 */
export const getModuleById = async (
  moduleId: string,
  userId: string
): Promise<{
  success: boolean;
  module: ModuleWithProgress | null;
  error?: string;
}> => {
  try {
    const moduleData = getModuleFromData(moduleId);
    if (!moduleData) {
      throw new Error('Module introuvable');
    }

    // Récupérer la progression (Supabase pour UUID, local pour IDs custom)
    let progressData = null;

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      moduleId
    );

    if (isUUID) {
      const { data, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .maybeSingle();

      if (progressError && progressError.code !== 'PGRST116') {
        throw progressError;
      }

      progressData = data;
    }

    // Progression locale (IDs custom)
    const localProgress = await getLocalModuleProgress(userId);
    const local = localProgress[moduleId];

    const progress: UserModuleProgress | undefined = local
      ? {
          moduleId,
          completed: local.completed,
          score: local.score,
          completedAt: local.completedAt,
        }
      : progressData
        ? {
            moduleId: progressData.module_id,
            completed: progressData.completed,
            score: progressData.score,
            completedAt: progressData.completed_at,
          }
        : undefined;

    // Récupérer le niveau de l'utilisateur
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('level, subscription_tier')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    const userLevel = profileData.level;
    const subscriptionTier = profileData.subscription_tier || 'free';

    const locked = userLevel < moduleData.levelRequired;
    const premiumLocked = moduleData.isPremium && subscriptionTier === 'free';

    return {
      success: true,
      module: {
        ...moduleData,
        progress,
        locked,
        premiumLocked,
      },
    };
  } catch (error: any) {
    console.error('Erreur getModuleById:', error);
    return {
      success: false,
      module: null,
      error: error.message,
    };
  }
};

/**
 * Vérifie si l'utilisateur peut accéder à un module
 */
export const canAccessModule = async (
  userId: string,
  moduleId: string
): Promise<{
  success: boolean;
  canAccess: boolean;
  reason?: string;
}> => {
  try {
    const moduleData = getModuleFromData(moduleId);
    if (!moduleData) {
      return {
        success: false,
        canAccess: false,
        reason: 'Module introuvable',
      };
    }

    // Vérifier le niveau et l'abonnement
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('level, subscription_tier')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    const userLevel = profileData.level;
    const subscriptionTier = profileData.subscription_tier || 'free';

    // Check niveau
    if (userLevel < moduleData.levelRequired) {
      return {
        success: true,
        canAccess: false,
        reason: `Niveau ${moduleData.levelRequired} requis (tu es niveau ${userLevel})`,
      };
    }

    // Check premium
    if (moduleData.isPremium && subscriptionTier === 'free') {
      return {
        success: true,
        canAccess: false,
        reason: 'Abonnement Premium requis',
      };
    }

    return {
      success: true,
      canAccess: true,
    };
  } catch (error: any) {
    console.error('Erreur canAccessModule:', error);
    return {
      success: false,
      canAccess: false,
      reason: error.message,
    };
  }
};

/**
 * Complète un module (après quiz)
 */
export const completeModule = async (
  userId: string,
  moduleId: string,
  quizScore: number
): Promise<ModuleCompletionResult> => {
  try {
    // 1. Vérifier l'accès
    const accessCheck = await canAccessModule(userId, moduleId);
    if (!accessCheck.canAccess) {
      throw new Error(accessCheck.reason || 'Accès refusé');
    }

    const moduleData = getModuleFromData(moduleId);
    if (!moduleData) {
      throw new Error('Module introuvable');
    }

    // 2. Enregistrer la progression dans user_progress
    // Note: Pour le MVP, skip si moduleId n'est pas un UUID (modules avec IDs custom)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(moduleId);
    
    if (isUUID) {
      const { error: upsertError } = await supabase.from('user_progress').upsert(
        {
          user_id: userId,
          module_id: moduleId,
          completed: true,
          score: quizScore,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,module_id',
        }
      );

      if (upsertError) throw upsertError;
    } else {
      // IDs custom (ex: module-1-1) : sauvegarde locale
      await saveLocalModuleProgress(userId, moduleId, true, quizScore);
    }

    // 3. Attribuer les XP via xpService
    const xpResult = await awardXP(userId, 'module');

    if (!xpResult.success) {
      throw new Error(`Impossible d'attribuer les XP: ${xpResult.error || 'Erreur inconnue'}`);
    }

    // 4. TODO: Vérifier si des badges sont débloqués
    // (À implémenter dans le module Badges)

    return {
      success: true,
      xpGained: moduleData.xpReward,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.leveledUp ? xpResult.newLevel : undefined,
    };
  } catch (error: any) {
    console.error('Erreur completeModule:', error);
    return {
      success: false,
      xpGained: 0,
      leveledUp: false,
      error: error.message,
    };
  }
};

/**
 * Récupère les statistiques de progression globale
 */
export const getUserModuleStats = async (
  userId: string
): Promise<{
  success: boolean;
  stats?: {
    totalModules: number;
    completedModules: number;
    progressPercentage: number;
    totalXPEarned: number;
    averageScore: number;
  };
  error?: string;
}> => {
  try {
    const { data: dbData, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('completed', true);

    if (error) throw error;

    const localProgress = await getLocalModuleProgress(userId);
    const localCompletedIds = Object.keys(localProgress).filter(
      (id) => localProgress[id].completed
    );
    const dbCompletedIds = new Set((dbData || []).map((p) => p.module_id));
    const allCompletedIds = new Set([...dbCompletedIds, ...localCompletedIds]);
    const completedModules = allCompletedIds.size;
    const totalModules = MODULES.length;
    const progressPercentage = Math.round(
      (completedModules / totalModules) * 100
    );

    let totalXPEarned = (dbData || []).reduce((sum, progress) => {
      const module = getModuleFromData(progress.module_id);
      return sum + (module?.xpReward || 0);
    }, 0);
    totalXPEarned += localCompletedIds.reduce((sum, moduleId) => {
      const module = getModuleFromData(moduleId);
      return sum + (module?.xpReward || 0);
    }, 0);

    const dbScores = (dbData || []).map((p) => p.score);
    const localScores = localCompletedIds.map(
      (id) => localProgress[id].score
    );
    const allScores = [...dbScores, ...localScores];
    const averageScore =
      allScores.length > 0
        ? allScores.reduce((sum, s) => sum + s, 0) / allScores.length
        : 0;

    return {
      success: true,
      stats: {
        totalModules,
        completedModules,
        progressPercentage,
        totalXPEarned,
        averageScore: Math.round(averageScore * 10) / 10,
      },
    };
  } catch (error: any) {
    console.error('Erreur getUserModuleStats:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
