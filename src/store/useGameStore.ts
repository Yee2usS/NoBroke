import { create } from 'zustand';
import { GameState } from '@/types';
import { supabase, handleSupabaseError } from '@/services/supabase';
import { useUserStore } from './useUserStore';

/**
 * Store Zustand pour gérer l'état du jeu
 * Gère les modules, badges, et le choix du jour
 */
export const useGameStore = create<GameState>((set, get) => ({
  modules: [],
  userModules: [],
  badges: [],
  userBadges: [],
  dailyChoice: null,
  hasAnsweredDailyChoice: false,
  isLoading: false,
  error: null,

  fetchModules: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      set({ modules: data || [], isLoading: false });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },

  fetchUserModules: async () => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('user_modules')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      set({ userModules: data || [], isLoading: false });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },

  fetchBadges: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('rarity', { ascending: true });

      if (error) throw error;
      set({ badges: data || [], isLoading: false });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },

  fetchUserBadges: async () => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      set({ userBadges: data || [], isLoading: false });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },

  fetchDailyChoice: async () => {
    const userId = useUserStore.getState().user?.id;
    const today = new Date().toISOString().split('T')[0];

    set({ isLoading: true, error: null });
    try {
      // Récupérer le choix du jour
      const { data: choiceData, error: choiceError } = await supabase
        .from('daily_choices')
        .select('*')
        .eq('date', today)
        .single();

      if (choiceError && choiceError.code !== 'PGRST116') throw choiceError;

      // Vérifier si l'utilisateur a déjà répondu
      let hasAnswered = false;
      if (userId && choiceData) {
        const { data: answerData, error: answerError } = await supabase
          .from('user_daily_choices')
          .select('id')
          .eq('user_id', userId)
          .eq('daily_choice_id', choiceData.id)
          .single();

        if (answerError && answerError.code !== 'PGRST116') throw answerError;
        hasAnswered = !!answerData;
      }

      set({
        dailyChoice: choiceData || null,
        hasAnsweredDailyChoice: hasAnswered,
        isLoading: false,
      });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },

  completeModule: async (moduleId: string) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      // Marquer le module comme complété
      const { error: updateError } = await supabase
        .from('user_modules')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed: true,
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          last_accessed: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      // Récupérer le module pour l'XP
      const module = get().modules.find(m => m.id === moduleId);
      if (module) {
        const currentProgress = useUserStore.getState().progress;
        if (currentProgress) {
          useUserStore.getState().updateProgress({
            xp: currentProgress.xp + module.xp_reward,
            total_modules_completed: currentProgress.total_modules_completed + 1,
          });
        }
      }

      // Rafraîchir les modules de l'utilisateur
      await get().fetchUserModules();
      set({ isLoading: false });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },

  answerDailyChoice: async (choiceId: string, selectedOption: 'a' | 'b') => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const dailyChoice = get().dailyChoice;
      if (!dailyChoice) throw new Error('Pas de choix du jour disponible');

      const isCorrect = selectedOption === dailyChoice.correct_option;

      // Enregistrer la réponse
      const { error: insertError } = await supabase
        .from('user_daily_choices')
        .insert({
          user_id: userId,
          daily_choice_id: choiceId,
          selected_option: selectedOption,
          is_correct: isCorrect,
          answered_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      // Ajouter l'XP si correct
      if (isCorrect) {
        const currentProgress = useUserStore.getState().progress;
        if (currentProgress) {
          useUserStore.getState().updateProgress({
            xp: currentProgress.xp + dailyChoice.xp_reward,
          });
        }
      }

      set({ hasAnsweredDailyChoice: true, isLoading: false });
    } catch (error) {
      set({ error: handleSupabaseError(error), isLoading: false });
    }
  },
}));
