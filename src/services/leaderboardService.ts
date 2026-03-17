import { supabase } from './supabase';

export interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  avatar_url?: string;
  wallet_balance: number;
}

/**
 * Récupère le classement des utilisateurs par cagnotte
 */
export const getWalletLeaderboard = async (
  limit: number = 50
): Promise<{ success: boolean; entries?: LeaderboardEntry[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, wallet_balance')
      .not('wallet_balance', 'is', null)
      .order('wallet_balance', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const entries: LeaderboardEntry[] = (data || []).map((row: any, index: number) => ({
      rank: index + 1,
      id: row.id,
      username: row.username || 'Anonyme',
      avatar_url: row.avatar_url,
      wallet_balance: row.wallet_balance ?? 2000,
    }));

    return { success: true, entries };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

/**
 * Met à jour le solde de cagnotte d'un utilisateur dans profiles
 */
export const syncWalletBalance = async (
  userId: string,
  balance: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        wallet_balance: Math.max(0, balance),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};
