import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { useGameStore } from '@/store/useGameStore';
import { useXP } from '@/hooks/useXP';
import { useModules } from '@/hooks/useModules';
import { useSubscription } from '@/hooks/useSubscription';
import LevelUpModal from '@/components/LevelUpModal';
import DailyChoiceWidget from '@/components/DailyChoiceWidget';
import { useWalletStore } from '@/store/useWalletStore';
import { useSavings } from '@/hooks/useSavings';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const PADDING = 20;

// Palette NoBroke - identité cohérente
const COLORS = {
  primary: '#4f46e5',
  primaryLight: '#6366f1',
  accent: '#10b981',
  accentMuted: 'rgba(16, 185, 129, 0.12)',
  surface: '#ffffff',
  bg: '#f8fafc',
  text: '#0f172a',
  textMuted: '#64748b',
  border: '#e2e8f0',
  gold: '#f59e0b',
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, progress } = useUserStore();
  const { userBadges, fetchUserBadges, fetchDailyChoice } = useGameStore();
  const { levelInfo, levelUpModalVisible, levelUpData, closeLevelUpModal, refreshLevelInfo } = useXP();
  const { modules, stats } = useModules();
  const { subscription } = useSubscription();
  const { balance, initialBalance, transactions } = useWalletStore();
  const { totalSaved, actions: savingsActions } = useSavings();

  useEffect(() => {
    fetchDailyChoice();
    fetchUserBadges();
  }, []);

  // Rafraîchir la barre XP à chaque retour sur le dashboard (après complétion d'un module)
  useFocusEffect(
    React.useCallback(() => {
      refreshLevelInfo();
    }, [refreshLevelInfo])
  );

  const ongoingModules = modules
    .filter((m) => !m.locked && !m.premiumLocked && !m.progress?.completed)
    .slice(0, 3);

  const getModuleProgress = (module: typeof modules[0]) => {
    if (module.progress?.completed) return 100;
    if (module.progress?.score !== undefined) {
      return Math.round((module.progress.score / 3) * 100);
    }
    return 0;
  };

  const formatNumber = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const xpRequired =
    levelInfo ? levelInfo.xpForNextLevel - levelInfo.xpForCurrentLevel : 500;
  const xpCurrent = levelInfo?.currentXP ?? 0;
  const xpProgress = levelInfo?.progressPercentage ?? 0;

  const completedCount = stats?.completedModules ?? modules.filter((m) => m.progress?.completed).length;
  const totalCount = stats?.totalModules ?? modules.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header - identité NoBroke */}
      <LinearGradient
        colors={['#312e81', '#4338ca', '#4f46e5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroContent}>
          <View style={styles.heroTop}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(user?.username || 'A')[0].toUpperCase()}
                </Text>
              </View>
              <View style={styles.statusDot} />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.heroGreeting}>Salut,</Text>
              <Text style={styles.heroName}>{user?.username || 'Apprenant'}</Text>
            </View>
            <View style={styles.levelPill}>
              <Ionicons name="star" size={14} color={COLORS.gold} />
              <Text style={styles.levelPillText}>Niv. {progress?.level || 1}</Text>
            </View>
          </View>

          {/* XP Bar */}
          <View style={styles.xpBlock}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLabel}>Progression</Text>
              <Text style={styles.xpCount}>
                {formatNumber(xpCurrent)} / {formatNumber(xpRequired)} XP
              </Text>
            </View>
            <View style={styles.xpBar}>
              <View style={[styles.xpBarFill, { width: `${Math.min(xpProgress, 100)}%` }]} />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Contenu principal */}
      <View style={styles.main}>
        {/* Upgrade (si free) - carte unifiée */}
        {subscription === 'free' && (
          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardPrimary]}
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionCardAccent, { backgroundColor: COLORS.primary }]} />
            <View style={styles.actionCardContent}>
              <View style={[styles.actionCardIcon, { backgroundColor: COLORS.accentMuted }]}>
                <Ionicons name="diamond" size={22} color={COLORS.primary} />
              </View>
              <View style={styles.actionCardText}>
                <Text style={styles.actionCardTitle}>Passe à Premium</Text>
                <Text style={styles.actionCardSub}>Débloque tous les modules</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
            </View>
          </TouchableOpacity>
        )}

        {/* 1. Ma Cagnotte - en premier */}
        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardWallet]}
          onPress={() => navigation.navigate('Wallet' as any)}
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.actionCardAccent,
              { backgroundColor: balance >= initialBalance ? COLORS.accent : '#ef4444' },
            ]}
          />
          <View style={styles.actionCardContent}>
            <View style={styles.walletMain}>
              <View style={styles.walletHeader}>
                <Ionicons
                  name="wallet"
                  size={20}
                  color={balance >= initialBalance ? COLORS.accent : '#ef4444'}
                />
                <Text style={styles.walletLabel}>Ma Cagnotte</Text>
              </View>
              <Text style={styles.walletBalance}>{balance.toLocaleString('fr-FR')} €</Text>
              <Text style={styles.walletSub}>
                {transactions.length > 0
                  ? `${transactions.length} opération${transactions.length > 1 ? 's' : ''}`
                  : 'Choix du Jour pour commencer'}
              </Text>
            </View>
            <View style={styles.walletRight}>
              {transactions.length > 0 && (
                <View
                  style={[
                    styles.walletDelta,
                    {
                      backgroundColor:
                        balance >= initialBalance ? COLORS.accentMuted : 'rgba(239,68,68,0.12)',
                    },
                  ]}
                >
                  <Ionicons
                    name={balance >= initialBalance ? 'trending-up' : 'trending-down'}
                    size={14}
                    color={balance >= initialBalance ? COLORS.accent : '#ef4444'}
                  />
                  <Text
                    style={[
                      styles.walletDeltaText,
                      { color: balance >= initialBalance ? COLORS.accent : '#ef4444' },
                    ]}
                  >
                    {Math.abs(balance - initialBalance).toLocaleString('fr-FR')} €
                  </Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Espace Économies */}
        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardWallet]}
          onPress={() => navigation.navigate('Savings')}
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.actionCardAccent,
              { backgroundColor: COLORS.accent },
            ]}
          />
          <View style={styles.actionCardContent}>
            <View style={styles.walletMain}>
              <View style={styles.walletHeader}>
                <Ionicons name="cash" size={20} color={COLORS.accent} />
                <Text style={styles.walletLabel}>Espace Économies</Text>
              </View>
              <Text style={styles.walletBalance}>{totalSaved.toLocaleString('fr-FR')} €</Text>
              <Text style={styles.walletSub}>
                {savingsActions.length > 0
                  ? `${savingsActions.length} action${savingsActions.length > 1 ? 's' : ''} enregistrée${savingsActions.length > 1 ? 's' : ''}`
                  : 'Enregistre tes économies réelles'}
              </Text>
            </View>
            <View style={styles.walletRight}>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
            </View>
          </View>
        </TouchableOpacity>

        {/* 2. Choix du Jour */}
        <DailyChoiceWidget />

        {/* 3. Carrousel : Battle, Classement, Communauté */}
        <View style={styles.carouselSection}>
          <Text style={styles.carouselSectionTitle}>Explorer</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
          >
            <TouchableOpacity
              style={[styles.carouselCard, { borderLeftColor: COLORS.accent }]}
              onPress={() => navigation.navigate('Battles')}
              activeOpacity={0.85}
            >
              <View style={[styles.carouselIcon, { backgroundColor: COLORS.accentMuted }]}>
                <Ionicons name="game-controller" size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.carouselTitle}>Battle tes amis</Text>
              <Text style={styles.carouselSub}>Quiz ou duel de cagnotte</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} style={styles.carouselChevron} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.carouselCard, { borderLeftColor: '#f59e0b' }]}
              onPress={() => navigation.navigate('Leaderboard')}
              activeOpacity={0.85}
            >
              <View style={[styles.carouselIcon, { backgroundColor: 'rgba(245,158,11,0.15)' }]}>
                <Ionicons name="trophy" size={24} color="#f59e0b" />
              </View>
              <Text style={styles.carouselTitle}>Classement</Text>
              <Text style={styles.carouselSub}>Vois où tu te situes</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} style={styles.carouselChevron} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.carouselCard, { borderLeftColor: '#14b8a6' }]}
              onPress={() => navigation.navigate('Community')}
              activeOpacity={0.85}
            >
              <View style={[styles.carouselIcon, { backgroundColor: 'rgba(20,184,166,0.15)' }]}>
                <Ionicons name="people" size={24} color="#14b8a6" />
              </View>
              <Text style={styles.carouselTitle}>Communauté</Text>
              <Text style={styles.carouselSub}>
                {subscription === 'free' ? 'Premium & Pro' : 'Échange avec les membres'}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} style={styles.carouselChevron} />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: 'rgba(251,191,36,0.15)' }]}>
              <Ionicons name="flame" size={20} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>{progress?.streak ?? 0}</Text>
            <Text style={styles.statLabel}>Série</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: 'rgba(99,102,241,0.18)' }]}>
              <Ionicons name="book" size={20} color="#6366f1" />
            </View>
            <Text style={styles.statValue}>{completedCount}/{totalCount}</Text>
            <Text style={styles.statLabel}>Modules</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: 'rgba(168,85,247,0.18)' }]}>
              <Ionicons name="trophy" size={20} color="#a855f7" />
            </View>
            <Text style={styles.statValue}>{userBadges?.length ?? 0}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Section Continuer */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continuer</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ModulesList' as any)}>
              <Text style={styles.seeAll}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          {ongoingModules.length > 0 ? (
            ongoingModules.map((module) => {
              const prog = getModuleProgress(module);
              return (
                <TouchableOpacity
                  key={module.id}
                  style={styles.moduleCard}
                  onPress={() => navigation.navigate('ModuleDetail' as any, { moduleId: module.id })}
                  activeOpacity={0.85}
                >
                  <View style={styles.moduleIconWrap}>
                    <Text style={styles.moduleIcon}>{module.icon}</Text>
                  </View>
                  <View style={styles.moduleContent}>
                    <Text style={styles.moduleTitle} numberOfLines={2}>{module.title}</Text>
                    <View style={styles.moduleProgRow}>
                      <View style={styles.moduleProgBg}>
                        <View style={[styles.moduleProgFill, { width: `${Math.min(100, Math.max(0, prog))}%` }]} />
                      </View>
                      <Text style={styles.moduleProgPct}>{prog}%</Text>
                    </View>
                  </View>
                  <View style={styles.modulePlay}>
                    <Ionicons name="play-circle" size={36} color="#6366f1" />
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons name="library-outline" size={40} color="#94a3b8" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyText}>Aucun module en cours</Text>
              <Text style={styles.emptySub}>Découvre les modules pour commencer</Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => navigation.navigate('ModulesList' as any)}
              >
                <Text style={styles.emptyBtnText}>Voir les modules</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: 120 }} />
      </View>

      {levelUpData && (
        <LevelUpModal
          visible={levelUpModalVisible}
          newLevel={levelUpData.newLevel}
          onClose={closeLevelUpModal}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Hero
  hero: {
    paddingTop: 56,
    paddingHorizontal: PADDING,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  heroContent: {},
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: '800' },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#312e81',
  },
  heroText: { flex: 1, marginLeft: 14 },
  heroGreeting: { fontSize: 14, color: 'rgba(255,255,255,0.6)' },
  heroName: { fontSize: 20, fontWeight: '700', color: '#fff' },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  levelPillText: { fontSize: 13, fontWeight: '700', color: '#fff' },

  xpBlock: {},
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  xpLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  xpCount: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '700' },
  xpBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#a5b4fc',
    borderRadius: 3,
  },

  // Main
  main: { paddingHorizontal: PADDING, paddingTop: 20, marginTop: -12 },

  // Cartes d'action unifiées (identité NoBroke)
  actionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  actionCardPrimary: {},
  actionCardWallet: {},
  actionCardAccent: {
    width: 4,
  },
  actionCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 18,
  },
  actionCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionCardText: { flex: 1 },
  actionCardLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginBottom: 2 },
  actionCardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  actionCardSub: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },

  // Wallet (carte spéciale)
  walletMain: { flex: 1 },
  walletHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  walletLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  walletBalance: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  walletSub: { fontSize: 12, color: COLORS.textMuted },
  walletRight: { alignItems: 'flex-end', gap: 8 },
  walletDelta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  walletDeltaText: { fontSize: 13, fontWeight: '700' },

  // Carrousel
  carouselSection: {
    marginBottom: 24,
  },
  carouselSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  carouselContent: {
    paddingRight: PADDING,
    gap: 12,
  },
  carouselCard: {
    width: width * 0.72,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  carouselIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  carouselSub: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  carouselChevron: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: CARD_GAP,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2, fontWeight: '600' },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  seeAll: { fontSize: 14, fontWeight: '700', color: COLORS.primary },

  // Module cards
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  moduleIcon: { fontSize: 26 },
  moduleContent: { flex: 1 },
  moduleTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  moduleProgRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  moduleProgBg: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  moduleProgFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  moduleProgPct: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted, minWidth: 28 },
  modulePlay: { marginLeft: 8 },

  // Empty
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  emptySub: { fontSize: 13, color: COLORS.textMuted, marginBottom: 8 },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  emptyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});

export default HomeScreen;
