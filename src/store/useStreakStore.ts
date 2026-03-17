import { create } from 'zustand';

interface StreakState {
  /** À afficher : streak du jour après mise à jour */
  pendingCelebration: number | null;
  /** Afficher le modal de félicitations */
  showStreakModal: (streak: number) => void;
  /** Fermer le modal */
  dismissStreakModal: () => void;
}

export const useStreakStore = create<StreakState>((set) => ({
  pendingCelebration: null,

  showStreakModal: (streak: number) => {
    set({ pendingCelebration: streak });
  },

  dismissStreakModal: () => {
    set({ pendingCelebration: null });
  },
}));
