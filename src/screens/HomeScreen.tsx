import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { useGameStore } from '@/store/useGameStore';
import { useXP } from '@/hooks/useXP';
import { useModules } from '@/hooks/useModules';
import { useSubscription } from '@/hooks/useSubscription';
import LevelUpModal from '@/components/LevelUpModal';
import DailyChoiceWidget from '@/components/DailyChoiceWidget';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const STATS_CARD_WIDTH = (width - 48 - CARD_GAP) / 2;

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, progress } = useUserStore();
  const { userBadges, fetchUserBadges, fetchDailyChoice } = useGameStore();
  const { levelInfo, levelUpModalVisible, levelUpData, closeLevelUpModal } = useXP();
  const { modules, stats } = useModules();
  const { subscription } = useSubscription();

  useEffect(() => {
    fetchDailyChoice();
    fetchUserBadges();
  }, []);

  // Modules en cours (non complétés, non lockés)
  const ongoingModules = modules
    .filter((m) => !m.locked && !m.premiumLocked && !m.progress?.completed)
    .slice(0, 3);

  // Progression d'un module (estimation : score quiz ou 0)
  const getModuleProgress = (module: typeof modules[0]) => {
    if (module.progress?.completed) return 100;
    if (module.progress?.score !== undefined) {
      return Math.round((module.progress.score / 3) * 100);
    }
    return 0;
  };

  const formatNumber = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const xpRequired =
    levelInfo
      ? levelInfo.xpForNextLevel - levelInfo.xpForCurrentLevel
      : 1000;
  const xpCurrent = levelInfo?.currentXP ?? 0;
  const xpProgress = levelInfo?.progressPercentage ?? 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header: Avatar + Welcome + Level badge */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.username || 'A')[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.statusDot} />
          </View>
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcomeText}>Content de te revoir,</Text>
            <Text style={styles.userName}>{user?.username || 'Apprenant'}</Text>
          </View>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeStar}>★</Text>
          <Text style={styles.levelBadgeText}>Niveau {progress?.level || 1}</Text>
        </View>
      </View>

      {/* XP Progression Card */}
      <View style={styles.xpCard}>
        <Text style={styles.xpLabel}>PROGRESSION XP</Text>
        <View style={styles.xpBarRow}>
          <View style={styles.xpBarContainer}>
            <View style={[styles.xpBarFill, { width: `${Math.min(xpProgress, 100)}%` }]} />
          </View>
          <Text style={styles.xpCount}>
            {formatNumber(xpCurrent)} / {formatNumber(xpRequired)} XP
          </Text>
        </View>
      </View>

      {/* Upgrade Banner (si free) */}
      {subscription === 'free' && (
        <TouchableOpacity
          style={styles.upgradeBanner}
          onPress={() => navigation.navigate('Subscription')}
        >
          <LinearGradient
            colors={['#8B5CF6', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.upgradeBannerGradient}
          >
            <View style={styles.upgradeBannerContent}>
              <Text style={styles.upgradeBannerIcon}>⭐</Text>
              <View style={styles.upgradeBannerText}>
                <Text style={styles.upgradeBannerTitle}>Passe à Premium</Text>
                <Text style={styles.upgradeBannerSubtitle}>
                  Débloque tous les modules
                </Text>
              </View>
              <Text style={styles.upgradeBannerArrow}>→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Daily Choice Widget */}
      <DailyChoiceWidget />

      {/* Stats Grid 2x2 */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>{progress?.streak ?? 0}</Text>
          <Text style={styles.statLabel}>Jours de série</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📚</Text>
          <Text style={styles.statValue}>
            {stats
              ? `${stats.completedModules}/${stats.totalModules}`
              : modules.length > 0
                ? `${modules.filter((m) => m.progress?.completed).length}/${modules.length}`
                : '0/—'}
          </Text>
          <Text style={styles.statLabel}>Modules finis</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏅</Text>
          <Text style={styles.statValue}>{userBadges?.length ?? 0}</Text>
          <Text style={styles.statLabel}>Badges gagnés</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={styles.statValue}>Top 15%</Text>
          <Text style={styles.statLabel}>Classement global</Text>
        </View>
      </View>

      {/* Section Continuer */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continuer</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ModulesList' as any)}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {ongoingModules.length > 0 ? (
          ongoingModules.map((module) => {
            const prog = getModuleProgress(module);
            return (
              <TouchableOpacity
                key={module.id}
                style={styles.moduleCard}
                onPress={() =>
                  navigation.navigate('ModuleDetail' as any, { moduleId: module.id })
                }
                activeOpacity={0.8}
              >
                <View style={styles.moduleCardLeft}>
                  <View style={styles.moduleIconBg}>
                    <Text style={styles.moduleIcon}>{module.icon}</Text>
                  </View>
                  <View style={styles.moduleCardContent}>
                    <Text style={styles.moduleCardTitle}>{module.title}</Text>
                    <View style={styles.moduleProgressRow}>
                      <View style={styles.moduleProgressBg}>
                        <View
                          style={[
                            styles.moduleProgressFill,
                            { width: `${Math.min(100, Math.max(0, prog))}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.moduleProgressPct}>{prog}%</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() =>
                    navigation.navigate('ModuleDetail' as any, { moduleId: module.id })
                  }
                >
                  <Text style={styles.playIcon}>▶</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyModules}>
            <Text style={styles.emptyText}>
              Aucun module en cours. Commence par découvrir les modules !
            </Text>
            <TouchableOpacity
              style={styles.startModuleButton}
              onPress={() => navigation.navigate('ModulesList' as any)}
            >
              <Text style={styles.startModuleText}>Voir les modules</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{ height: 100 }} />

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
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  welcomeBlock: {
    marginLeft: 14,
  },
  welcomeText: {
    fontSize: 14,
    color: '#64748b',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  levelBadgeStar: {
    fontSize: 14,
    color: '#F59E0B',
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  xpCard: {
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  xpLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  xpBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  xpBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 5,
  },
  xpCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    minWidth: 90,
    textAlign: 'right',
  },
  upgradeBanner: {
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  upgradeBannerGradient: {
    padding: 16,
  },
  upgradeBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeBannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  upgradeBannerText: {
    flex: 1,
  },
  upgradeBannerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upgradeBannerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
  },
  upgradeBannerArrow: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 24,
    marginTop: 20,
    gap: CARD_GAP,
  },
  statCard: {
    width: STATS_CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  moduleCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moduleIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  moduleIcon: {
    fontSize: 24,
  },
  moduleCardContent: {
    flex: 1,
  },
  moduleCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  moduleProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  moduleProgressBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  moduleProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  moduleProgressPct: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    minWidth: 32,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  playIcon: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 2,
  },
  emptyModules: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  startModuleButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  startModuleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
