import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { UPCOMING_FEATURES, UpcomingFeature } from '@/data/upcomingFeatures';
import {
  getVoteCounts,
  getUserVotes,
  toggleVote,
} from '@/services/featureVotesService';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const UpcomingFeaturesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUserStore();
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [counts, votes] = await Promise.all([
        getVoteCounts(),
        user?.id ? getUserVotes(user.id) : Promise.resolve(new Set<string>()),
      ]);
      setVoteCounts(counts);
      setUserVotes(votes);
    } catch (e) {
      console.error('Erreur chargement votes:', e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleVote = async (feature: UpcomingFeature) => {
    if (!user?.id) {
      Alert.alert(
        'Connexion requise',
        'Connecte-toi pour voter pour tes fonctionnalités préférées.'
      );
      return;
    }
    setTogglingId(feature.id);
    try {
      const result = await toggleVote(user.id, feature.id);
      if (result.error) {
        Alert.alert('Erreur', result.error);
      } else {
        await loadData();
      }
    } finally {
      setTogglingId(null);
    }
  };

  const getTierConfig = (tier: 'premium' | 'pro') => {
    if (tier === 'premium') {
      return {
        colors: ['#f59e0b', '#f97316'] as [string, string],
        label: 'Premium',
        icon: '⭐',
      };
    }
    return {
      colors: ['#8b5cf6', '#6366f1'] as [string, string],
      label: 'Pro',
      icon: '💎',
    };
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fonctionnalités à venir</Text>
        <Text style={styles.headerSubtitle}>
          Vote pour celles que tu veux en priorité
        </Text>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Chargement des votes...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {UPCOMING_FEATURES.map((tierData) => {
            const config = getTierConfig(tierData.tier);
            return (
              <View key={tierData.tier} style={styles.tierSection}>
                <View style={styles.tierHeader}>
                  <LinearGradient
                    colors={config.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tierBadge}
                  >
                    <Text style={styles.tierIcon}>{config.icon}</Text>
                    <Text style={styles.tierLabel}>{config.label}</Text>
                    <Text style={styles.tierPrice}>{tierData.price}</Text>
                  </LinearGradient>
                </View>

                {tierData.features.map((feature, index) => {
                  const count = voteCounts[feature.id] ?? 0;
                  const hasVoted = userVotes.has(feature.id);
                  const isToggling = togglingId === feature.id;

                  return (
                    <View key={feature.id} style={styles.featureCard}>
                      <View style={styles.featureNumber}>
                        <Text style={styles.featureNumberText}>{index + 1}</Text>
                      </View>
                      <View style={styles.featureContent}>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text style={styles.featureDesc}>
                          {feature.description}
                        </Text>
                        <View style={styles.featureFooter}>
                          <TouchableOpacity
                            style={[
                              styles.voteBtn,
                              hasVoted && styles.voteBtnActive,
                            ]}
                            onPress={() => handleVote(feature)}
                            disabled={isToggling}
                            activeOpacity={0.8}
                          >
                            {isToggling ? (
                              <ActivityIndicator
                                size="small"
                                color={hasVoted ? '#fff' : '#6366f1'}
                              />
                            ) : (
                              <>
                                <Ionicons
                                  name={hasVoted ? 'heart' : 'heart-outline'}
                                  size={18}
                                  color={hasVoted ? '#fff' : '#6366f1'}
                                />
                                <Text
                                  style={[
                                    styles.voteBtnText,
                                    hasVoted && styles.voteBtnTextActive,
                                  ]}
                                >
                                  {hasVoted ? 'Voté' : 'Voter'}
                                </Text>
                              </>
                            )}
                          </TouchableOpacity>
                          <Text style={styles.voteCount}>
                            {count} vote{count !== 1 ? 's' : ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Ton avis compte ! Les fonctionnalités les plus votées seront
              priorisées.
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748b',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  tierSection: {
    marginBottom: 28,
  },
  tierHeader: {
    marginBottom: 16,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  tierIcon: {
    fontSize: 20,
  },
  tierLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tierPrice: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  featureNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
    marginBottom: 12,
  },
  featureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  voteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#6366f115',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  voteBtnActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  voteBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366f1',
  },
  voteBtnTextActive: {
    color: '#fff',
  },
  voteCount: {
    fontSize: 12,
    color: '#94a3b8',
  },
  footer: {
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default UpcomingFeaturesScreen;
