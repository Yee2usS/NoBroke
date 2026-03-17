import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import {
  getModules,
  getModuleById,
  completeModule,
  getUserModuleStats,
} from '@/services/moduleService';
import { ModuleWithProgress } from '@/types/module.types';
import { SubscriptionTier } from '@/types';
import { Alert } from 'react-native';

/**
 * Hook personnalisé pour gérer les modules
 * subscriptionTier est passé depuis l'extérieur pour éviter les problèmes
 * de synchronisation entre instances de useSubscription
 */
export const useModules = (subscriptionTier: SubscriptionTier = 'free') => {
  const { user, progress, updateProgress } = useUserStore();
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  const loadModules = useCallback(async () => {
    if (!user?.id || !progress) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getModules(user.id, progress.level, subscriptionTier);

      if (result.success) {
        setModules(result.modules);
      } else {
        setError(result.error || 'Erreur lors du chargement des modules');
      }
    } catch (err: any) {
      console.error('Erreur loadModules:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, progress, subscriptionTier]);

  const loadStats = useCallback(async () => {
    if (!user?.id) return;

    try {
      const result = await getUserModuleStats(user.id);
      if (result.success) {
        setStats(result.stats);
      }
    } catch (err: any) {
      console.error('Erreur loadStats:', err);
    }
  }, [user]);

  const getModulesByZone = useCallback(
    (zoneId: number): ModuleWithProgress[] => {
      return modules
        .filter((module) => module.zone === zoneId)
        .sort((a, b) => a.orderInZone - b.orderInZone);
    },
    [modules]
  );

  const getModule = useCallback(
    async (moduleId: string) => {
      if (!user?.id) return null;

      try {
        const result = await getModuleById(moduleId, user.id);
        if (result.success) return result.module;
        return null;
      } catch (err: any) {
        console.error('Erreur getModule:', err);
        return null;
      }
    },
    [user]
  );

  const handleCompleteModule = useCallback(
    async (moduleId: string, quizScore: number) => {
      if (!user?.id) {
        Alert.alert('Erreur', 'Utilisateur non connecté');
        return null;
      }

      try {
        const result = await completeModule(user.id, moduleId, quizScore);

        if (result.success) {
          // Mettre à jour la barre XP du dashboard immédiatement
          if (result.newTotalXP !== undefined && result.newLevel !== undefined) {
            const completedCount = (progress?.total_modules_completed ?? 0) + 1;
            updateProgress({
              xp: result.newTotalXP,
              level: result.newLevel,
              total_modules_completed: completedCount,
            });
          }
          await loadModules();
          await loadStats();

          if (result.leveledUp) {
            Alert.alert(
              'Level Up ! 🎉',
              `Félicitations ! Tu es maintenant niveau ${result.newLevel} !`
            );
          }

          return result;
        } else {
          Alert.alert('Erreur', result.error || 'Impossible de compléter le module');
          return null;
        }
      } catch (err: any) {
        console.error('Erreur handleCompleteModule:', err);
        Alert.alert('Erreur', err.message);
        return null;
      }
    },
    [user, progress, loadModules, loadStats, updateProgress]
  );

  // Re-charge automatiquement quand subscriptionTier change
  useEffect(() => {
    loadModules();
    loadStats();
  }, [loadModules, loadStats]);

  return {
    modules,
    loading,
    error,
    stats,
    getModulesByZone,
    getModule,
    completeModule: handleCompleteModule,
    refreshModules: loadModules,
    refreshStats: loadStats,
  };
};
