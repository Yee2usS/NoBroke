import { create } from 'zustand';
import { UserState, User, UserProgress } from '@/types';

/**
 * Store Zustand pour gérer l'état de l'utilisateur
 * Contient les informations du profil, la progression, et les stats de jeu
 */
interface ExtendedUserState extends UserState {
  // Stats de jeu (calculées depuis les choix quotidiens)
  virtualMoney: number;
  stats: {
    discipline: number;
    creativity: number;
    prudence: number;
  };
  
  // Actions pour les stats
  updateVirtualMoney: (amount: number) => void;
  updateStats: (updates: Partial<ExtendedUserState['stats']>) => void;
  resetStats: () => void;
}

export const useUserStore = create<ExtendedUserState>((set) => ({
  user: null,
  progress: null,
  isLoading: false,
  error: null,
  
  // Stats de jeu (MVP - pas encore sauvegardées en DB)
  virtualMoney: 1000, // Argent virtuel de départ
  stats: {
    discipline: 0,
    creativity: 0,
    prudence: 0,
  },

  setUser: (user) => set({ user }),
  
  setProgress: (progress) => set({ progress }),
  
  updateProgress: (updates) => set((state) => ({
    progress: state.progress ? { ...state.progress, ...updates } : null,
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  // Actions pour l'argent virtuel
  updateVirtualMoney: (amount) => set((state) => ({
    virtualMoney: state.virtualMoney + amount,
  })),
  
  // Actions pour les stats
  updateStats: (updates) => set((state) => ({
    stats: { ...state.stats, ...updates },
  })),
  
  resetStats: () => set({
    virtualMoney: 1000,
    stats: { discipline: 0, creativity: 0, prudence: 0 },
  }),
  
  logout: () => set({
    user: null,
    progress: null,
    error: null,
    virtualMoney: 1000,
    stats: { discipline: 0, creativity: 0, prudence: 0 },
  }),
}));
