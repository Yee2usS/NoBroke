import { create } from 'zustand';
import { UserState, User, UserProgress } from '@/types';

/**
 * Store Zustand pour gérer l'état de l'utilisateur
 * Contient les informations du profil et la progression
 */
export const useUserStore = create<UserState>((set) => ({
  user: null,
  progress: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  
  setProgress: (progress) => set({ progress }),
  
  updateProgress: (updates) => set((state) => ({
    progress: state.progress ? { ...state.progress, ...updates } : null,
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  logout: () => set({ user: null, progress: null, error: null }),
}));
