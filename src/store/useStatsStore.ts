import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '@/store/useUserStore';

export interface UserStats {
  discipline: number;
  creativity: number;
  prudence: number;
}

interface StatsState extends UserStats {
  addStats: (updates: Partial<UserStats>) => void;
  setStats: (stats: UserStats) => void;
  loadForUser: (userId: string) => Promise<void>;
  clearForLogout: () => void;
}

const STORAGE_PREFIX = 'nobroke-stats';

const getStorageKey = (userId: string) => `${STORAGE_PREFIX}-${userId}`;

const DEFAULT_STATS: UserStats = {
  discipline: 0,
  creativity: 0,
  prudence: 0,
};

export const useStatsStore = create<StatsState>((set, get) => ({
  ...DEFAULT_STATS,

  addStats: (updates) => {
    const { discipline, creativity, prudence } = get();
    const newStats = {
      discipline: Math.max(0, discipline + (updates.discipline ?? 0)),
      creativity: Math.max(0, creativity + (updates.creativity ?? 0)),
      prudence: Math.max(0, prudence + (updates.prudence ?? 0)),
    };
    set(newStats);

    const userId = useUserStore.getState().user?.id;
    if (userId) {
      AsyncStorage.setItem(getStorageKey(userId), JSON.stringify(newStats)).catch(
        () => {}
      );
    }
  },

  setStats: (stats) => {
    const newStats = {
      discipline: Math.max(0, stats.discipline ?? 0),
      creativity: Math.max(0, stats.creativity ?? 0),
      prudence: Math.max(0, stats.prudence ?? 0),
    };
    set(newStats);

    const userId = useUserStore.getState().user?.id;
    if (userId) {
      AsyncStorage.setItem(getStorageKey(userId), JSON.stringify(newStats)).catch(
        () => {}
      );
    }
  },

  loadForUser: async (userId: string) => {
    try {
      const raw = await AsyncStorage.getItem(getStorageKey(userId));
      if (raw) {
        const data = JSON.parse(raw);
        set({
          discipline: data.discipline ?? 0,
          creativity: data.creativity ?? 0,
          prudence: data.prudence ?? 0,
        });
      } else {
        set(DEFAULT_STATS);
      }
    } catch {
      set(DEFAULT_STATS);
    }
  },

  clearForLogout: () => set(DEFAULT_STATS),
}));
