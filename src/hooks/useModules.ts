import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import {
  getModules,
  getModuleById,
  completeModule,
  getUserModuleStats,
} from '@/services/moduleService';
import { ModuleWithProgress } from '@/types/module.types';
import { Alert } from 'react-native';

/**
 * Hook personnalisé pour gérer les modules
 */
export const useModules = () => {
  const { user, progress } = useUserStore();
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  /**
   * Charge tous les modules
   */
  const loadModules = useCallback(async () => {
    if (!user?.id || !progress) return;

    setLoading(true);
    setError(null);

    try {
      const subscriptionTier = (user as any).subscription_tier || 'free';
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
  }, [user, progress]);

  /**
   * Charge les stats de progression
   */
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

  /**
   * Récupère les modules d'une zone spécifique
   */
  const getModulesByZone = useCallback(
    (zoneId: number): ModuleWithProgress[] => {
      return modules
        .filter((module) => module.zone === zoneId)
        .sort((a, b) => a.orderInZone - b.orderInZone);
    },
    [modules]
  );

  /**
   * Récupère un module par son ID
   */
  const getModule = useCallback(
    async (moduleId: string) => {
      if (!user?.id) return null;

      try {
        const result = await getModuleById(moduleId, user.id);
        if (result.success) {
          return result.module;
        }
        return null;
      } catch (err: any) {
        console.error('Erreur getModule:', err);
        return null;
      }
    },
    [user]
  );

  /**
   * Complète un module
   */
  const handleCompleteModule = useCallback(
    async (moduleId: string, quizScore: number) => {
      if (!user?.id) {
        Alert.alert('Erreur', 'Utilisateur non connecté');
        return null;
      }

      try {
        const result = await completeModule(user.id, moduleId, quizScore);

        if (result.success) {
          // Recharger les modules et stats
          await loadModules();
          await loadStats();

          // Afficher une notification de level up si nécessaire
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
    [user, loadModules, loadStats]
  );

  // Charger au montage
  useEffect(() => {
    loadModules();
    loadStats();
  }, [loadModules, loadStats]);

  return {
    // État
    modules,
    loading,
    error,
    stats,

    // Actions
    getModulesByZone,
    getModule,
    completeModule: handleCompleteModule,
    refreshModules: loadModules,
    refreshStats: loadStats,
  };
};
