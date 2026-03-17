import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserStore } from '@/store/useUserStore';
import { useStatsStore } from '@/store/useStatsStore';
import { useGameStore } from '@/store/useGameStore';
import { useWalletStore } from '@/store/useWalletStore';
import { supabase } from '@/services/supabase';
import {
  getUserChoiceHistory,
  calculateUserStats,
} from '@/services/dailyChoiceService';
import { calculateLevelInfo } from '@/utils/xpCalculator';
import { getUserLevelInfo } from '@/services/xpService';
import { checkAndAwardBadges } from '@/services/badgeService';
import { RootStackParamList } from '@/types';
import { BADGE_RARITIES } from '@/utils/constants';
import type { BadgeRarity } from '@/types';

const MAX_SKILL = 100;

const SkillRow: React.FC<{
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: number;
  color: string;
}> = ({ icon, label, value, color }) => {
  const percent = Math.min(100, Math.max(0, (value / MAX_SKILL) * 100));
  return (
    <View style={styles.skillRow}>
      <View style={styles.skillHeader}>
        <Ionicons name={icon} size={18} color={color} />
        <Text style={styles.skillLabel}>{label}</Text>
        <Text style={[styles.skillValue, { color }]}>{value}</Text>
      </View>
      <View style={styles.skillBarBg}>
        <View style={[styles.skillBarFill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

type NavProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { user, progress, logout, updateProgress } = useUserStore();
  const { discipline, creativity, prudence, setStats } = useStatsStore();
  const {
    badges,
    userBadges,
    fetchBadges,
    fetchUserBadges,
  } = useGameStore();
  const { balance } = useWalletStore();

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;
      // Rafraîchir XP / niveau + vérifier badges
      getUserLevelInfo(user.id).then((res) => {
        if (res.success && res.levelInfo) {
          const level = res.levelInfo.currentLevel;
          updateProgress({
            level,
            xp: res.levelInfo.currentXP + res.levelInfo.xpForCurrentLevel,
          });
          checkAndAwardBadges(user.id, level, balance).then(({ awarded }) => {
            if (awarded.length > 0) fetchUserBadges();
          });
        }
      });
      // Synchroniser les stats (Discipline, Créativité, Prudence) depuis la DB
      getUserChoiceHistory(user.id, 365)
        .then(({ success, history }) => {
          if (success && history?.length > 0) {
            const { discipline: d, creativity: c, prudence: p } =
              calculateUserStats(history);
            setStats({ discipline: d, creativity: c, prudence: p });
          }
        })
        .catch(() => {});
      fetchBadges();
      fetchUserBadges();
    }, [user?.id, updateProgress, setStats, balance, fetchBadges, fetchUserBadges])
  );

  const hasBadge = (badgeId: string) =>
    userBadges.some((ub) => ub.badge_id === badgeId);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Tu vas être déconnecté de NoBroke.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            logout();
          },
        },
      ]
    );
  };

  const totalXP = Number(progress?.xp) || 0;
  const streak = progress?.streak || 0;
  const modulesCompleted = progress?.total_modules_completed || 0;

  const levelInfo = calculateLevelInfo(totalXP);
  const level = levelInfo.currentLevel;
  const xpInLevel = levelInfo.currentXP;
  const xpNeeded = levelInfo.xpForNextLevel - levelInfo.xpForCurrentLevel;
  const xpPercent = levelInfo.progressPercentage;

  const stats = [
    { label: 'Série',   value: `${streak}j`, icon: '🔥', color: '#f97316' },
    { label: 'Modules', value: `${modulesCompleted}`, icon: '📚', color: '#8b5cf6' },
    { label: 'XP Total', value: `${totalXP}`, icon: '💎', color: '#3b82f6' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header gradient */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.username?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{level}</Text>
            </View>
          </View>

          <Text style={styles.username}>{user?.username || 'Utilisateur'}</Text>
          <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>

          {/* Barre XP */}
          <View style={styles.xpContainer}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>Niveau {level}</Text>
              <Text style={styles.xpLabel}>{xpInLevel} / {xpNeeded} XP</Text>
            </View>
            <View style={styles.xpBarBg}>
              <View style={[styles.xpBarFill, { width: `${xpPercent}%` }]} />
            </View>
            <Text style={styles.xpNextLevel}>Niveau {level + 1} →</Text>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Comportement financier (Choix du Jour) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comportement financier</Text>
          <Text style={styles.sectionSubtitle}>
            Évolue avec tes Choix du Jour
          </Text>
          <View style={styles.skillsCard}>
            <SkillRow
              icon="flag"
              label="Discipline"
              value={discipline}
              color="#6366f1"
            />
            <SkillRow
              icon="bulb"
              label="Créativité"
              value={creativity}
              color="#a855f7"
            />
            <SkillRow
              icon="shield-checkmark"
              label="Prudence"
              value={prudence}
              color="#10b981"
            />
          </View>
        </View>

        {/* Collection de badges */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Collection de badges</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Badges')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Niveaux atteints · Cagnotte (Choix du Jour)
          </Text>
          <View style={styles.badgesGrid}>
            {(badges.length > 0 ? badges.slice(0, 9) : []).map((badge) => {
              const earned = hasBadge(badge.id);
              const rarity = BADGE_RARITIES[(badge.rarity || 'common') as BadgeRarity];
              return (
                <View key={badge.id} style={styles.badgeCell}>
                  <View
                    style={[
                      styles.badgeCircle,
                      { backgroundColor: rarity.color + '20', borderColor: rarity.color + '40' },
                      !earned && styles.badgeCircleLocked,
                    ]}
                  >
                    <Text style={styles.badgeEmoji}>{earned ? badge.icon : '🔒'}</Text>
                  </View>
                  <Text
                    style={[styles.badgeName, !earned && styles.badgeNameLocked]}
                    numberOfLines={2}
                  >
                    {badge.name}
                  </Text>
                </View>
              );
            })}
          </View>
          {badges.length === 0 && (
            <Text style={styles.badgesEmpty}>Aucun badge disponible</Text>
          )}
        </View>

        {/* Infos compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mon compte</Text>
          <View style={styles.card}>
            <View style={[styles.infoRow, styles.rowBorder]}>
              <Text style={styles.infoLabel}>Pseudo</Text>
              <Text style={styles.infoValue}>{user?.username || '—'}</Text>
            </View>
            <View style={[styles.infoRow, styles.rowBorder]}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{user?.email || '—'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Niveau</Text>
              <Text style={styles.infoValue}>Niveau {level} · {totalXP} XP</Text>
            </View>
          </View>
        </View>

        {/* Déconnexion */}
        <View style={styles.section}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.8}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          Les paramètres de l'application se trouvent dans l'onglet Plus →
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },

  /* Header */
  header: {
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 24,
  },
  xpContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  xpBarBg: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
    marginBottom: 6,
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#fbbf24',
  },
  xpNextLevel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'right',
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },

  /* Section */
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
    marginLeft: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366f1',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  badgeCell: {
    width: '33.333%',
    padding: 6,
    alignItems: 'center',
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  badgeCircleLocked: {
    opacity: 0.5,
  },
  badgeEmoji: {
    fontSize: 26,
  },
  badgeName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 13,
  },
  badgeNameLocked: {
    color: '#94a3b8',
  },
  badgesEmpty: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    paddingVertical: 16,
  },
  skillsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  skillRow: {
    marginBottom: 14,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  skillLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  skillValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  skillBarBg: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 999,
  },

  /* Info card */
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    maxWidth: '60%',
    textAlign: 'right',
  },

  /* Logout */
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ef4444',
  },

  /* Hint */
  hint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 28,
    paddingHorizontal: 32,
  },
});

export default ProfileScreen;
