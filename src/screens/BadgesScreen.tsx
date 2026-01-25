import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '@/store/useGameStore';
import { BADGE_RARITIES } from '@/utils/constants';
import { BadgeRarity } from '@/types';

const BadgesScreen: React.FC = () => {
  const { badges, userBadges, fetchBadges, fetchUserBadges, isLoading } = useGameStore();

  useEffect(() => {
    fetchBadges();
    fetchUserBadges();
  }, []);

  const hasBadge = (badgeId: string) => {
    return userBadges.some(ub => ub.badge_id === badgeId);
  };

  const earnedCount = userBadges.length;
  const totalCount = badges.length;
  const completionPercentage = totalCount > 0 
    ? Math.round((earnedCount / totalCount) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          🏆 Collection de Badges
        </Text>
        <Text style={styles.headerSubtitle}>
          {earnedCount} / {totalCount} badges débloqués
        </Text>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCardContainer}>
        <LinearGradient
          colors={['#a855f7', '#6366f1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.progressCard}
        >
          <Text style={styles.progressCardTitle}>
            Progression Globale
          </Text>
          <View style={styles.progressCardRow}>
            <Text style={styles.progressPercentage}>
              {completionPercentage}%
            </Text>
            <Text style={styles.progressCount}>
              {earnedCount} badges
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View 
              style={[styles.progressBarFill, { width: `${completionPercentage}%` }]}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Badges List */}
      <ScrollView style={styles.badgesList} contentContainerStyle={styles.badgesContent}>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : badges.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Aucun badge disponible</Text>
          </View>
        ) : (
          <View style={styles.badgesGrid}>
            {badges.map((badge) => {
              const earned = hasBadge(badge.id);
              const rarity = BADGE_RARITIES[badge.rarity as BadgeRarity];

              return (
                <TouchableOpacity
                  key={badge.id}
                  style={styles.badgeContainer}
                >
                  <View style={[
                    styles.badgeCard,
                    earned ? styles.badgeCardEarned : styles.badgeCardLocked
                  ]}>
                    <View 
                      style={[
                        styles.badgeIconContainer,
                        !earned && styles.badgeIconLocked,
                        { backgroundColor: rarity.color + '20' }
                      ]}
                    >
                      <Text style={styles.badgeIcon}>
                        {earned ? badge.icon : '🔒'}
                      </Text>
                    </View>
                    <Text 
                      style={[
                        styles.badgeName,
                        earned ? styles.badgeNameEarned : styles.badgeNameLocked
                      ]}
                      numberOfLines={2}
                    >
                      {badge.name}
                    </Text>
                    {earned && (
                      <View 
                        style={[
                          styles.rarityBadge,
                          { backgroundColor: rarity.color + '20' }
                        ]}
                      >
                        <Text 
                          style={[styles.rarityText, { color: rarity.color }]}
                        >
                          {rarity.label}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#c7d2fe',
    fontSize: 16,
  },
  progressCardContainer: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  progressCard: {
    borderRadius: 16,
    padding: 24,
  },
  progressCardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressPercentage: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  progressCount: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 999,
  },
  badgesList: {
    flex: 1,
  },
  badgesContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    color: '#6b7280',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  badgeContainer: {
    width: '33.333%',
    padding: 8,
  },
  badgeCard: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  badgeCardEarned: {
    backgroundColor: '#f9fafb',
  },
  badgeCardLocked: {
    backgroundColor: '#f3f4f6',
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeIconLocked: {
    opacity: 0.3,
  },
  badgeIcon: {
    fontSize: 30,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeNameEarned: {
    color: '#1f2937',
  },
  badgeNameLocked: {
    color: '#9ca3af',
  },
  rarityBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default BadgesScreen;
