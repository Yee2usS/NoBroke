import { useState, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { awardXP, getUserLevelInfo } from '@/services/xpService';
import { calculateLevelInfo, XPAction } from '@/utils/xpCalculator';

/**
 * Hook personnalisé pour gérer les XP et niveaux avec modal de level up
 */
export const useXP = () => {
  const { user, progress, setProgress, updateProgress } = useUserStore();
  const [isAwarding, setIsAwarding] = useState(false);
  const [levelUpModalVisible, setLevelUpModalVisible] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; levelsGained: number } | null>(null);

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
    async (actionType: XPAction['type'], showModal: boolean = true) => {
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

          // Afficher le modal si level up
          if (result.leveledUp && showModal) {
            setLevelUpData({
              newLevel: result.newLevel,
              levelsGained: result.levelsGained,
            });
            setLevelUpModalVisible(true);
          }

          return result;
        } else {
          console.error('Erreur XP:', result.error);
          return null;
        }
      } catch (error: any) {
        console.error('Erreur dans useXP:', error);
        return null;
      } finally {
        setIsAwarding(false);
      }
    },
    [user, updateProgress]
  );

  /**
   * Affiche le modal de level up manuellement
   */
  const showLevelUpModal = useCallback((newLevel: number, levelsGained: number = 1) => {
    setLevelUpData({ newLevel, levelsGained });
    setLevelUpModalVisible(true);
  }, []);

  /**
   * Ferme le modal de level up
   */
  const closeLevelUpModal = useCallback(() => {
    setLevelUpModalVisible(false);
    setLevelUpData(null);
  }, []);

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
          xp: result.levelInfo.currentXP + result.levelInfo.xpForCurrentLevel,
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

    // Modal Level Up
    levelUpModalVisible,
    levelUpData,
    showLevelUpModal,
    closeLevelUpModal,

    // Actions
    awardXPForAction,
    refreshLevelInfo,
  };
};
