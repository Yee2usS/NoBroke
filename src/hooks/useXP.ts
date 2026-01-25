import { useState, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { awardXP, getUserLevelInfo } from '@/services/xpService';
import { calculateLevelInfo, XPAction } from '@/utils/xpCalculator';
import { Alert } from 'react-native';

/**
 * Hook personnalisé pour gérer les XP et niveaux
 */
export const useXP = () => {
  const { user, progress, setProgress, updateProgress } = useUserStore();
  const [isAwarding, setIsAwarding] = useState(false);

  /**
   * Récupère les informations de niveau actuelles
   */
  const getLevelInfo = useCallback(() => {
    if (!progress) return null;
    return calculateLevelInfo(progress.xp);
  }, [progress]);

  /**
   * Attribue des XP pour une action
   */
  const awardXPForAction = useCallback(
    async (actionType: XPAction['type'], showNotification: boolean = true) => {
      if (!user?.id) {
        console.error('Utilisateur non connecté');
        return null;
      }

      setIsAwarding(true);

      try {
        const result = await awardXP(user.id, actionType);

        if (result.success) {
          // Mettre à jour le store local
          updateProgress({
            xp: result.newTotalXP,
            level: result.newLevel,
          });

          // Afficher une notification si level up
          if (result.leveledUp && showNotification) {
            showLevelUpNotification(result.newLevel, result.levelsGained);
          }

          return result;
        } else {
          Alert.alert('Erreur', result.error || 'Impossible d\'attribuer les XP');
          return null;
        }
      } catch (error: any) {
        console.error('Erreur dans useXP:', error);
        Alert.alert('Erreur', 'Une erreur est survenue');
        return null;
      } finally {
        setIsAwarding(false);
      }
    },
    [user, updateProgress]
  );

  /**
   * Affiche une alerte de level up
   */
  const showLevelUpNotification = (newLevel: number, levelsGained: number) => {
    const message =
      levelsGained > 1
        ? `Tu as gravi ${levelsGained} niveaux ! Tu es maintenant niveau ${newLevel} ! 🎉`
        : `Félicitations ! Tu es passé au niveau ${newLevel} ! 🎉`;

    Alert.alert('Level Up ! 🎊', message, [
      {
        text: 'Génial !',
        style: 'default',
      },
    ]);
  };

  /**
   * Rafraîchit les données de niveau depuis Supabase
   */
  const refreshLevelInfo = useCallback(async () => {
    if (!user?.id) return;

    try {
      const result = await getUserLevelInfo(user.id);
      if (result.success && result.levelInfo) {
        updateProgress({
          level: result.levelInfo.currentLevel,
        });
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
    }
  }, [user, updateProgress]);

  return {
    // État
    levelInfo: getLevelInfo(),
    isAwarding,
    currentLevel: progress?.level || 1,
    currentXP: progress?.xp || 0,

    // Actions
    awardXPForAction,
    refreshLevelInfo,
  };
};
