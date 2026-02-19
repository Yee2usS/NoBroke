import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSubscription } from '@/hooks/useSubscription';
import { upgradeSubscription } from '@/services/subscriptionService';
import { useUserStore } from '@/store/useUserStore';
import { SubscriptionTier, SubscriptionPlan } from '@/types';

/**
 * Écran de gestion des abonnements
 * MVP: Upgrade simple sans paiement Stripe
 */
const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useUserStore();
  const { subscription, refresh } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Gratuit',
      icon: '🆓',
      price: { monthly: 0, yearly: 0 },
      features: [
        '32 modules gratuits',
        '1 Choix du Jour par jour',
        'Badges communs et rares',
        'Simulateurs basiques',
        'Avec publicités',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: '⭐',
      price: { monthly: 9.99, yearly: 99 },
      features: [
        'Tous les 59 modules',
        '3 Choix du Jour par jour',
        'Tous les badges',
        'Simulateurs avancés',
        'Mode hors ligne',
        'Protection streak 2×/mois',
        '0 publicité',
      ],
      recommended: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: '💎',
      price: { monthly: 19.99, yearly: 199 },
      features: [
        'Tout Premium +',
        'Agent IA copilote (Claude)',
        'Communauté privée',
        'Bilans trimestriels',
        'Protection streak illimitée',
        'Support prioritaire',
      ],
    },
  ];

  const handleUpgrade = async (tier: SubscriptionTier) => {
    if (!user?.id) return;

    if (tier === subscription) {
      Alert.alert('Info', 'Tu es déjà sur ce plan');
      return;
    }

    if (tier === 'free') {
      Alert.alert(
        'Annuler l\'abonnement',
        'Es-tu sûr de vouloir passer en gratuit ?',
        [
          { text: 'Non', style: 'cancel' },
          {
            text: 'Oui',
            style: 'destructive',
            onPress: () => performUpgrade(tier),
          },
        ]
      );
      return;
    }

    // TODO: Intégrer Stripe payment flow
    Alert.alert(
      'Upgrade (MVP)',
      `Paiement Stripe bientôt disponible.\n\nPour tester, je vais activer ${tier} gratuitement.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Activer',
          onPress: () => performUpgrade(tier),
        },
      ]
    );
  };

  const performUpgrade = async (tier: SubscriptionTier) => {
    setLoading(true);
    const result = await upgradeSubscription(user!.id, tier);

    if (result.success) {
      await refresh();
      Alert.alert(
        'Succès ! 🎉',
        `Ton abonnement ${tier} est maintenant actif !`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('Erreur', result.error || 'Impossible de mettre à jour l\'abonnement');
    }

    setLoading(false);
  };

  const getPlanPrice = (plan: SubscriptionPlan) => {
    if (plan.id === 'free') return 'Gratuit';
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
    const period = billingCycle === 'monthly' ? '/mois' : '/an';
    return `${price}€${period}`;
  };

  const getSavings = (plan: SubscriptionPlan) => {
    if (plan.id === 'free' || billingCycle === 'monthly') return null;
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyCost - yearlyCost;
    return `Économise ${savings}€`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#6366f1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choisir un plan</Text>
        <Text style={styles.headerSubtitle}>
          Débloque tout le potentiel de NoBroke
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Billing Cycle Toggle */}
        <View style={styles.billingToggleContainer}>
          <TouchableOpacity
            style={[
              styles.billingToggleButton,
              billingCycle === 'monthly' && styles.billingToggleButtonActive,
            ]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text
              style={[
                styles.billingToggleText,
                billingCycle === 'monthly' && styles.billingToggleTextActive,
              ]}
            >
              Mensuel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.billingToggleButton,
              billingCycle === 'yearly' && styles.billingToggleButtonActive,
            ]}
            onPress={() => setBillingCycle('yearly')}
          >
            <Text
              style={[
                styles.billingToggleText,
                billingCycle === 'yearly' && styles.billingToggleTextActive,
              ]}
            >
              Annuel
            </Text>
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsBadgeText}>-17%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plans */}
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === subscription;
          const savings = getSavings(plan);

          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                plan.recommended && styles.planCardRecommended,
                isCurrentPlan && styles.planCardCurrent,
              ]}
            >
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedBadgeText}>Recommandé</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planIcon}>{plan.icon}</Text>
                <View style={styles.planHeaderText}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planPrice}>{getPlanPrice(plan)}</Text>
                  {savings && <Text style={styles.planSavings}>{savings}</Text>}
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureCheck}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.planButton,
                  isCurrentPlan && styles.planButtonCurrent,
                ]}
                onPress={() => handleUpgrade(plan.id)}
                disabled={loading || isCurrentPlan}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.planButtonText}>
                    {isCurrentPlan ? 'Plan actuel' : 'Choisir'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            💳 Paiement Stripe bientôt disponible
          </Text>
          <Text style={styles.disclaimerSubtext}>
            Pour le MVP, l'upgrade est gratuit pour tester les fonctionnalités.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#e0e7ff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  billingToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  billingToggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  billingToggleButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  billingToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  billingToggleTextActive: {
    color: '#1f2937',
  },
  savingsBadge: {
    position: 'absolute',
    top: -8,
    right: 8,
    backgroundColor: '#10b981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  savingsBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  planCardRecommended: {
    borderColor: '#8B5CF6',
    borderWidth: 3,
  },
  planCardCurrent: {
    backgroundColor: '#f9fafb',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    left: 24,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  planIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  planHeaderText: {
    flex: 1,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  planSavings: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
    marginTop: 2,
  },
  planFeatures: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureCheck: {
    fontSize: 16,
    color: '#10b981',
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
  },
  planButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  planButtonCurrent: {
    backgroundColor: '#d1d5db',
  },
  planButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  disclaimerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  disclaimerSubtext: {
    fontSize: 12,
    color: '#92400e',
  },
});

export default SubscriptionScreen;
