import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import {
  getTodayChoice,
  submitChoice,
  UserChoiceResult,
} from '@/services/dailyChoiceService';
import { DailyScenario } from '@/data/dailyScenarios';

/**
 * Hook personnalisé pour gérer le Choix du Jour
 */
export const useDailyChoice = () => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [todayChoice, setTodayChoice] = useState<DailyScenario | null>(null);
  const [dailyChoiceId, setDailyChoiceId] = useState<string | null>(null);
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consequences, setConsequences] = useState<UserChoiceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Charge le choix du jour
   */
  const loadTodayChoice = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getTodayChoice(user.id);

      if (result.success && result.scenario) {
        setTodayChoice(result.scenario);
        setDailyChoiceId(result.dailyChoice?.id || null);
        setHasCompletedToday(result.hasCompleted);
        
        // Si déjà complété, récupérer les conséquences
        if (result.hasCompleted && result.userChoice) {
          setSelectedChoiceIndex(result.userChoice.choice_index);
          
          // Reconstruire les conséquences depuis le choice
          const choice = result.scenario.choices[result.userChoice.choice_index];
          if (choice) {
            setConsequences({
              success: true,
              consequences: choice.consequences,
              explanation: choice.explanation,
              lesson: result.scenario.lesson,
            });
          }
        }
      } else {
        setError(result.error || 'Impossible de charger le choix du jour');
      }
    } catch (err: any) {
      console.error('Erreur loadTodayChoice:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Soumet un choix
   */
  const handleSubmitChoice = useCallback(
    async (choiceIndex: number) => {
      if (!user?.id || !dailyChoiceId || hasCompletedToday) {
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const result = await submitChoice(user.id, dailyChoiceId, choiceIndex);

        if (result.success) {
          setSelectedChoiceIndex(choiceIndex);
          setConsequences(result);
          setHasCompletedToday(true);
          return result;
        } else {
          setError(result.error || 'Erreur lors de la soumission');
          return null;
        }
      } catch (err: any) {
        console.error('Erreur handleSubmitChoice:', err);
        setError(err.message);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, dailyChoiceId, hasCompletedToday]
  );

  /**
   * Réinitialise pour un nouveau choix (après minuit)
   */
  const reset = useCallback(() => {
    setTodayChoice(null);
    setDailyChoiceId(null);
    setHasCompletedToday(false);
    setSelectedChoiceIndex(null);
    setConsequences(null);
    setError(null);
    loadTodayChoice();
  }, [loadTodayChoice]);

  // Charger au montage
  useEffect(() => {
    loadTodayChoice();
  }, [loadTodayChoice]);

  // Vérifier à minuit si on doit reset (check toutes les minutes)
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        reset();
      }
    };

    const interval = setInterval(checkMidnight, 60000); // Toutes les minutes

    return () => clearInterval(interval);
  }, [reset]);

  return {
    // État
    loading,
    todayChoice,
    hasCompletedToday,
    selectedChoiceIndex,
    isSubmitting,
    consequences,
    error,

    // Actions
    submitChoice: handleSubmitChoice,
    refreshChoice: loadTodayChoice,
    reset,
  };
};
