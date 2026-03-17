import { create } from 'zustand';
import {
  createBattle,
  acceptBattle,
  rejectBattle,
  getBattlesForUser,
  getBattleById,
} from '@/services/battleService';
import type { Battle, BattleType } from '@/types/battle.types';

interface BattlesState {
  battles: Battle[];
  loading: boolean;
  error: string | null;
  fetchBattles: (userId: string) => Promise<void>;
  createBattleAction: (
    challengerId: string,
    opponentId: string,
    type: BattleType,
    moduleId?: string,
    scenarioId?: string
  ) => Promise<{ success: boolean; battleId?: string; error?: string }>;
  acceptBattleAction: (battleId: string, userId: string) => Promise<boolean>;
  rejectBattleAction: (battleId: string, userId: string) => Promise<boolean>;
  getBattle: (battleId: string) => Promise<Battle | null>;
  pendingCount: (userId: string) => number;
  inProgressCount: (userId: string) => number;
}

export const useBattlesStore = create<BattlesState>((set, get) => ({
  battles: [],
  loading: false,
  error: null,

  fetchBattles: async (userId) => {
    set({ loading: true, error: null });
    const res = await getBattlesForUser(userId);
    set({
      battles: res.battles || [],
      loading: false,
      error: res.success ? null : res.error || null,
    });
  },

  createBattleAction: async (challengerId, opponentId, type, moduleId, scenarioId) => {
    set({ error: null });
    const res = await createBattle(challengerId, opponentId, type, moduleId, scenarioId);
    if (res.success && res.battle) {
      const { battles } = get();
      set({ battles: [res.battle, ...battles] });
      return { success: true, battleId: res.battle.id };
    }
    return { success: false, error: res.error };
  },

  acceptBattleAction: async (battleId, userId) => {
    const res = await acceptBattle(battleId, userId);
    if (res.success) {
      const { battles } = get();
      set({
        battles: battles.map((b) =>
          b.id === battleId ? { ...b, status: 'accepted' as const } : b
        ),
      });
    }
    return res.success;
  },

  rejectBattleAction: async (battleId, userId) => {
    const res = await rejectBattle(battleId, userId);
    if (res.success) {
      const { battles } = get();
      set({
        battles: battles.map((b) =>
          b.id === battleId ? { ...b, status: 'rejected' as const } : b
        ),
      });
    }
    return res.success;
  },

  getBattle: async (battleId) => {
    const res = await getBattleById(battleId);
    return res.battle || null;
  },

  pendingCount: (userId) => {
    return get().battles.filter(
      (b) => b.opponent_id === userId && b.status === 'pending'
    ).length;
  },

  inProgressCount: (userId) => {
    return get().battles.filter(
      (b) =>
        (b.challenger_id === userId || b.opponent_id === userId) &&
        (b.status === 'accepted' || b.status === 'in_progress')
    ).length;
  },
}));
