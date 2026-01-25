import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '@/store/useUserStore';
import { useGameStore } from '@/store/useGameStore';
import { useXP } from '@/hooks/useXP';
import LevelProgressBar from '@/components/LevelProgressBar';

const HomeScreen: React.FC = () => {
  const { user, progress } = useUserStore();
  const { dailyChoice, hasAnsweredDailyChoice, fetchDailyChoice } = useGameStore();
  const { levelInfo } = useXP();

  useEffect(() => {
    fetchDailyChoice();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Bonjour {user?.username || 'Apprenant'} 👋
        </Text>
        <Text style={styles.headerSubtitle}>
          Prêt à apprendre aujourd'hui ?
        </Text>
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Niveau</Text>
            <Text style={styles.statValue}>
              {progress?.level || 1}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Série</Text>
            <Text style={[styles.statValue, { color: '#f59e0b' }]}>
              {progress?.streak_days || 0}🔥
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Modules</Text>
            <Text style={[styles.statValue, { color: '#10b981' }]}>
              {progress?.total_modules_completed || 0}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          {levelInfo && (
            <LevelProgressBar
              currentLevel={levelInfo.currentLevel}
              currentXP={levelInfo.currentXP}
              xpForNextLevel={levelInfo.xpForNextLevel - levelInfo.xpForCurrentLevel}
              progressPercentage={levelInfo.progressPercentage}
              animated={true}
            />
          )}
        </View>
      </View>

      {/* Choix du Jour */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          ⭐ Choix du Jour
        </Text>
        
        {dailyChoice ? (
          <LinearGradient
            colors={['#a855f7', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.dailyChoiceCard}
          >
            <Text style={styles.dailyChoiceScenario}>
              {dailyChoice.scenario}
            </Text>
            
            {!hasAnsweredDailyChoice ? (
              <View style={styles.choicesContainer}>
                <TouchableOpacity style={styles.choiceButton}>
                  <Text style={styles.choiceText}>
                    A. {dailyChoice.option_a}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choiceButton}>
                  <Text style={styles.choiceText}>
                    B. {dailyChoice.option_b}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.answeredContainer}>
                <Text style={styles.answeredText}>
                  ✅ Vous avez déjà répondu aujourd'hui !
                </Text>
              </View>
            )}
            
            <View style={styles.xpRewardContainer}>
              <Text style={styles.xpRewardText}>
                +{dailyChoice.xp_reward} XP
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.noChoiceCard}>
            <Text style={styles.noChoiceText}>
              Aucun choix disponible pour aujourd'hui
            </Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { marginBottom: 32 }]}>
        <Text style={styles.sectionTitle}>
          Actions Rapides
        </Text>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6366f1' }]}>
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionText}>Continuer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10b981' }]}>
            <Text style={styles.actionIcon}>🎯</Text>
            <Text style={styles.actionText}>Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  statsCard: {
    marginHorizontal: 24,
    marginTop: -24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#4f46e5',
    fontSize: 30,
    fontWeight: 'bold',
  },
  progressSection: {
    marginTop: 16,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#4b5563',
    fontSize: 14,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 999,
  },
  section: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  dailyChoiceCard: {
    borderRadius: 16,
    padding: 24,
  },
  dailyChoiceScenario: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  choicesContainer: {
    marginTop: 16,
    gap: 12,
  },
  choiceButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  choiceText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
  answeredContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  answeredText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  xpRewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  xpRewardText: {
    color: '#fde047',
    fontSize: 14,
    fontWeight: '600',
  },
  noChoiceCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
  },
  noChoiceText: {
    color: '#6b7280',
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
