import { supabase } from './supabase';

/**
 * Retourne la date du jour en YYYY-MM-DD (timezone locale)
 */
const getTodayDate = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

/**
 * Retourne la date d'hier en YYYY-MM-DD
 */
const getYesterdayDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export interface StreakUpdateResult {
  success: boolean;
  newStreak: number;
  updated: boolean;
  isNewDay: boolean;
  error?: string;
}

/**
 * Met à jour le streak et last_visit quand l'utilisateur ouvre l'app.
 * - Si last_visit = hier → streak + 1
 * - Si last_visit = aujourd'hui → pas de changement
 * - Si last_visit < hier → streak = 1 (nouvelle série)
 */
export const updateStreakOnVisit = async (
  userId: string
): Promise<StreakUpdateResult> => {
  try {
    const today = getTodayDate();
    const yesterday = getYesterdayDate();

    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('streak, last_visit')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) {
      return {
        success: false,
        newStreak: 0,
        updated: false,
        isNewDay: false,
        error: fetchError?.message,
      };
    }

    const lastVisit = profile.last_visit
      ? new Date(profile.last_visit).toISOString().split('T')[0]
      : null;
    const currentStreak = profile.streak ?? 0;

    let newStreak = currentStreak;
    let updated = false;

    if (!lastVisit) {
      // Premier passage
      newStreak = 1;
      updated = true;
    } else if (lastVisit === today) {
      // Déjà visité aujourd'hui
      newStreak = currentStreak;
      updated = false;
    } else if (lastVisit === yesterday) {
      // Retour après hier → série maintenue
      newStreak = currentStreak + 1;
      updated = true;
    } else {
      // Plus d'un jour d'écart → nouvelle série
      newStreak = 1;
      updated = true;
    }

    if (updated) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          streak: newStreak,
          last_visit: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) {
        return {
          success: false,
          newStreak: currentStreak,
          updated: false,
          isNewDay: false,
          error: updateError.message,
        };
      }
    }

    return {
      success: true,
      newStreak,
      updated,
      isNewDay: updated,
    };
  } catch (e: any) {
    return {
      success: false,
      newStreak: 0,
      updated: false,
      isNewDay: false,
      error: e.message,
    };
  }
};
