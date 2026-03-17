import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import {
  getSavingsActions,
  addSavingsAction,
  deleteSavingsAction,
  getTotalSavings,
  SavingsAction,
  CreateSavingsActionInput,
} from '@/services/savingsService';

export const useSavings = () => {
  const { user } = useUserStore();
  const [actions, setActions] = useState<SavingsAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalSaved = getTotalSavings(actions);

  const fetchActions = useCallback(async () => {
    if (!user?.id) {
      setActions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getSavingsActions(user.id);
      setActions(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur chargement');
      setActions([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  const addAction = async (input: CreateSavingsActionInput) => {
    if (!user?.id) throw new Error('Non connecté');
    const newAction = await addSavingsAction(user.id, input);
    setActions((prev) => [newAction, ...prev]);
    return newAction;
  };

  const removeAction = async (actionId: string) => {
    if (!user?.id) throw new Error('Non connecté');
    await deleteSavingsAction(user.id, actionId);
    setActions((prev) => prev.filter((a) => a.id !== actionId));
  };

  return {
    actions,
    totalSaved,
    loading,
    error,
    refresh: fetchActions,
    addAction,
    removeAction,
  };
};
