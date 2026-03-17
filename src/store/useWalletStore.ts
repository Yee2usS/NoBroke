import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/services/supabase';
import { syncWalletBalance } from '@/services/leaderboardService';

export interface WalletTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  scenarioId: string;
  balanceAfter: number;
}

interface WalletState {
  balance: number;
  transactions: WalletTransaction[];
  initialBalance: number;

  applyTransaction: (
    amount: number,
    description: string,
    scenarioId: string,
    date: string
  ) => void;
  resetWallet: () => void;

  /** Charge le wallet pour un utilisateur (appelé au login) */
  loadForUser: (userId: string) => Promise<void>;
  /** Réinitialise le wallet (appelé au logout) */
  clearForLogout: () => void;
}

const INITIAL_BALANCE = 2000;
const STORAGE_PREFIX = 'nobroke-wallet';

const getStorageKey = (userId: string) => `${STORAGE_PREFIX}-${userId}`;

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: INITIAL_BALANCE,
  transactions: [],
  initialBalance: INITIAL_BALANCE,

  applyTransaction: (amount, description, scenarioId, date) => {
    const { balance, transactions } = get();

    const alreadyApplied = transactions.some(
      (t) => t.scenarioId === scenarioId && t.date === date
    );
    if (alreadyApplied) return;

    const newBalance = Math.max(0, balance + amount);

    const transaction: WalletTransaction = {
      id: `${scenarioId}-${date}`,
      date,
      amount,
      description,
      scenarioId,
      balanceAfter: newBalance,
    };

    const newTransactions = [transaction, ...transactions].slice(0, 90);
    set({ balance: newBalance, transactions: newTransactions });

    // Persister localement + sync classement Supabase
    const userId = useUserStore.getState().user?.id;
    if (userId) {
      AsyncStorage.setItem(
        getStorageKey(userId),
        JSON.stringify({
          balance: newBalance,
          transactions: newTransactions,
          initialBalance: INITIAL_BALANCE,
        })
      ).catch(() => {});
      syncWalletBalance(userId, newBalance).catch(() => {});
    }
  },

  resetWallet: () => {
    set({ balance: INITIAL_BALANCE, transactions: [] });
    const userId = useUserStore.getState().user?.id;
    if (userId) {
      AsyncStorage.setItem(
        getStorageKey(userId),
        JSON.stringify({
          balance: INITIAL_BALANCE,
          transactions: [],
          initialBalance: INITIAL_BALANCE,
        })
      ).catch(() => {});
      syncWalletBalance(userId, INITIAL_BALANCE).catch(() => {});
    }
  },

  loadForUser: async (userId: string) => {
    try {
      // 1. Charger depuis Supabase (source de vérité pour le classement)
      const { data: profile } = await supabase
        .from('profiles')
        .select('wallet_balance')
        .eq('id', userId)
        .single();

      const dbBalance = profile?.wallet_balance ?? null;

      // 2. Charger depuis AsyncStorage (transactions + migration anciens users)
      const raw = await AsyncStorage.getItem(getStorageKey(userId));
      const localData = raw ? JSON.parse(raw) : null;
      const localBalance = localData?.balance ?? null;

      // 3. Priorité : local si utilisé (transactions), sinon DB, sinon 2000
      let balance = INITIAL_BALANCE;
      const hasLocalHistory = localData?.transactions?.length > 0;
      if (hasLocalHistory && localBalance !== null && localBalance !== undefined) {
        // L'utilisateur a une historique local → priorité au local, sync vers DB
        balance = localBalance;
        syncWalletBalance(userId, balance).catch(() => {});
      } else if (dbBalance !== null && dbBalance !== undefined) {
        balance = dbBalance;
      } else if (localBalance !== null && localBalance !== undefined) {
        balance = localBalance;
        syncWalletBalance(userId, balance).catch(() => {});
      }

      set({
        balance,
        transactions: localData?.transactions ?? [],
        initialBalance: localData?.initialBalance ?? INITIAL_BALANCE,
      });
    } catch {
      set({
        balance: INITIAL_BALANCE,
        transactions: [],
        initialBalance: INITIAL_BALANCE,
      });
    }
  },

  clearForLogout: () => {
    set({
      balance: INITIAL_BALANCE,
      transactions: [],
      initialBalance: INITIAL_BALANCE,
    });
  },
}));
