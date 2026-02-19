import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { getUserSubscription, getSubscriptionLimits } from '@/services/subscriptionService';
import { SubscriptionTier } from '@/types';

/**
 * Hook pour gérer l'abonnement utilisateur
 */
export const useSubscription = () => {
  const { user } = useUserStore();
  const [subscription, setSubscription] = useState<SubscriptionTier>('free');
  const [canAccessPremium, setCanAccessPremium] = useState(false);
  const [canAccessPro, setCanAccessPro] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await getUserSubscription(user.id);

    if (result.success && result.subscription) {
      setSubscription(result.subscription.tier);
      setCanAccessPremium(result.subscription.canAccessPremium);
      setCanAccessPro(result.subscription.canAccessPro);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSubscription();
  }, [user?.id]);

  const limits = getSubscriptionLimits(subscription);

  return {
    subscription,
    canAccessPremium,
    canAccessPro,
    loading,
    limits,
    refresh: fetchSubscription,
  };
};
