import { supabase } from './supabase';

export interface SavingsAction {
  id: string;
  user_id: string;
  description: string;
  amount_euros: number;
  created_at: string;
}

export interface CreateSavingsActionInput {
  description: string;
  amount_euros: number;
}

/**
 * Récupère toutes les actions d'économie de l'utilisateur
 */
export const getSavingsActions = async (userId: string): Promise<SavingsAction[]> => {
  const { data, error } = await supabase
    .from('savings_actions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map((r) => ({
    ...r,
    amount_euros: Number(r.amount_euros),
  }));
};

/**
 * Calcule le total des économies
 */
export const getTotalSavings = (actions: SavingsAction[]): number => {
  return actions.reduce((sum, a) => sum + a.amount_euros, 0);
};

/**
 * Ajoute une action d'économie
 * Utilise auth.uid() pour garantir la cohérence avec les politiques RLS
 */
export const addSavingsAction = async (
  userId: string,
  input: CreateSavingsActionInput
): Promise<SavingsAction> => {
  const { data: { user: authUser } } = await supabase.auth.getUser();
  const effectiveUserId = authUser?.id ?? userId;

  const { data, error } = await supabase
    .from('savings_actions')
    .insert({
      user_id: effectiveUserId,
      description: input.description.trim(),
      amount_euros: Number(input.amount_euros),
    })
    .select()
    .single();

  if (error) {
    console.error('[savingsService] addSavingsAction error:', error);
    const err = new Error(error.message || 'Impossible d\'ajouter');
    (err as any).supabaseError = error;
    throw err;
  }
  return { ...data, amount_euros: Number(data.amount_euros) };
};

/**
 * Supprime une action d'économie
 */
export const deleteSavingsAction = async (
  userId: string,
  actionId: string
): Promise<void> => {
  const { error } = await supabase
    .from('savings_actions')
    .delete()
    .eq('id', actionId)
    .eq('user_id', userId);

  if (error) throw error;
};
