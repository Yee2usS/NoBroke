import { supabase } from './supabase';

/**
 * Récupère le nombre de votes par fonctionnalité
 */
export const getVoteCounts = async (): Promise<Record<string, number>> => {
  const { data, error } = await supabase
    .from('feature_votes')
    .select('feature_id');

  if (error) {
    console.error('Erreur getVoteCounts:', error);
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data || []) {
    counts[row.feature_id] = (counts[row.feature_id] || 0) + 1;
  }
  return counts;
};

/**
 * Récupère les feature_ids pour lesquels l'utilisateur a voté
 */
export const getUserVotes = async (userId: string): Promise<Set<string>> => {
  const { data, error } = await supabase
    .from('feature_votes')
    .select('feature_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Erreur getUserVotes:', error);
    return new Set();
  }

  return new Set((data || []).map((r) => r.feature_id));
};

/**
 * Ajoute ou retire un vote
 */
export const toggleVote = async (
  userId: string,
  featureId: string
): Promise<{ voted: boolean; error?: string }> => {
  const { data: existing } = await supabase
    .from('feature_votes')
    .select('id')
    .eq('user_id', userId)
    .eq('feature_id', featureId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('feature_votes')
      .delete()
      .eq('user_id', userId)
      .eq('feature_id', featureId);
    if (error) return { voted: true, error: error.message };
    return { voted: false };
  } else {
    const { error } = await supabase.from('feature_votes').insert({
      user_id: userId,
      feature_id: featureId,
    });
    if (error) return { voted: false, error: error.message };
    return { voted: true };
  }
};
