import { supabase } from './supabase';
import { SubscriptionTier } from '@/types';

/**
 * Service pour gérer les abonnements utilisateur
 * MVP: Gestion simple sans paiement Stripe
 */

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  canAccessPremium: boolean;
  canAccessPro: boolean;
}

/**
 * Récupère l'abonnement actuel d'un utilisateur
 */
export const getUserSubscription = async (
  userId: string
): Promise<{
  success: boolean;
  subscription?: SubscriptionInfo;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profil utilisateur introuvable');

    const tier = (data.subscription_tier as SubscriptionTier) || 'free';

    return {
      success: true,
      subscription: {
        tier,
        canAccessPremium: tier === 'premium' || tier === 'pro',
        canAccessPro: tier === 'pro',
      },
    };
  } catch (error: any) {
    console.error('Erreur getUserSubscription:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Vérifie si l'utilisateur peut accéder au contenu Premium
 */
export const canAccessPremiumContent = async (
  userId: string
): Promise<boolean> => {
  const result = await getUserSubscription(userId);
  return result.subscription?.canAccessPremium || false;
};

/**
 * Vérifie si l'utilisateur peut accéder au contenu Pro
 */
export const canAccessProContent = async (userId: string): Promise<boolean> => {
  const result = await getUserSubscription(userId);
  return result.subscription?.canAccessPro || false;
};

/**
 * Met à jour l'abonnement d'un utilisateur
 * MVP: Simple update database (pas de paiement Stripe)
 * TODO: Intégrer Stripe payment flow
 */
export const upgradeSubscription = async (
  userId: string,
  newTier: SubscriptionTier
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // TODO: Intégrer Stripe payment
    // 1. Créer Stripe checkout session
    // 2. Attendre confirmation paiement
    // 3. Update database

    // MVP: Direct update
    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_tier: newTier,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    console.log(`✅ Abonnement mis à jour: ${userId} → ${newTier}`);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Erreur upgradeSubscription:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Downgrade vers Free (annulation abonnement)
 * TODO: Gérer fin de période payée (Stripe)
 */
export const cancelSubscription = async (
  userId: string
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // TODO: Stripe cancellation
    // Garder accès jusqu'à fin période payée

    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_tier: 'free',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    console.log(`❌ Abonnement annulé: ${userId} → free`);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Erreur cancelSubscription:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Récupère les limites selon le tier
 */
export const getSubscriptionLimits = (
  tier: SubscriptionTier
): {
  dailyChoicesPerDay: number;
  streakProtectionPerMonth: number;
  hasAds: boolean;
  offlineMode: boolean;
} => {
  const limits = {
    free: {
      dailyChoicesPerDay: 1,
      streakProtectionPerMonth: 0,
      hasAds: true,
      offlineMode: false,
    },
    premium: {
      dailyChoicesPerDay: 3,
      streakProtectionPerMonth: 2,
      hasAds: false,
      offlineMode: true,
    },
    pro: {
      dailyChoicesPerDay: 999, // Illimité
      streakProtectionPerMonth: 999, // Illimité
      hasAds: false,
      offlineMode: true,
    },
  };

  return limits[tier];
};
