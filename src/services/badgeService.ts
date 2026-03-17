import { supabase } from './supabase';

export interface UnlockCondition {
  type: 'level' | 'wallet' | 'modules_completed' | 'streak';
  value: number;
}

/**
 * Vérifie et attribue les badges selon le niveau et le solde de cagnotte
 */
export const checkAndAwardBadges = async (
  userId: string,
  level: number,
  walletBalance: number
): Promise<{ awarded: string[] }> => {
  const awarded: string[] = [];

  try {
    // 1. Récupérer tous les badges
    const { data: badges, error: badgesError } = await supabase
      .from('badges')
      .select('id, name, unlock_condition');

    if (badgesError || !badges?.length) return { awarded };

    // 2. Récupérer les badges déjà débloqués
    const { data: userBadges, error: ubError } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    if (ubError) return { awarded };

    const ownedBadgeIds = new Set((userBadges || []).map((ub: any) => ub.badge_id));

    // 3. Pour chaque badge, vérifier si la condition est remplie
    for (const badge of badges) {
      if (ownedBadgeIds.has(badge.id)) continue;

      const condition = badge.unlock_condition as UnlockCondition;
      if (!condition?.type || condition.value === undefined) continue;

      let shouldAward = false;

      if (condition.type === 'level') {
        shouldAward = level >= condition.value;
      } else if (condition.type === 'wallet') {
        shouldAward = walletBalance >= condition.value;
      }
      // modules_completed et streak gérés ailleurs si besoin

      if (shouldAward) {
        const { error: insertError } = await supabase.from('user_badges').insert({
          user_id: userId,
          badge_id: badge.id,
        });

        if (!insertError) {
          awarded.push(badge.name);
          ownedBadgeIds.add(badge.id);
        }
      }
    }

    return { awarded };
  } catch {
    return { awarded };
  }
};
