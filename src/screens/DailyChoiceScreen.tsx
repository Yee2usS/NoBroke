import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDailyChoice } from '@/hooks/useDailyChoice';
import { useXP } from '@/hooks/useXP'; // 🆕 Ajout
import ChoiceCard from '@/components/ChoiceCard';

type ScreenStep = 'loading' | 'selection' | 'consequences' | 'lesson';

/**
 * Écran principal du "Choix du Jour"
 */
const DailyChoiceScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    todayChoice,
    hasCompletedToday,
    selectedChoiceIndex: savedChoiceIndex,
    consequences: savedConsequences,
    loading,
    isSubmitting,
    submitChoice,
  } = useDailyChoice();
  
  const { refreshLevelInfo } = useXP(); // 🆕 Hook pour rafraîchir les XP

  const [currentStep, setCurrentStep] = useState<ScreenStep>('loading');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [localConsequences, setLocalConsequences] = useState<any>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moneyCountAnim = useRef(new Animated.Value(0)).current;
  const xpCountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading && todayChoice) {
      if (hasCompletedToday && savedChoiceIndex !== null && savedConsequences) {
        // Si déjà complété, aller directement aux conséquences
        setSelectedIndex(savedChoiceIndex);
        setLocalConsequences(savedConsequences);
        setCurrentStep('consequences');
      } else {
        setCurrentStep('selection');
      }
      
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, todayChoice, hasCompletedToday, savedChoiceIndex]);

  const handleSelectChoice = (index: number) => {
    if (!hasCompletedToday) {
      setSelectedIndex(index);
    }
  };

  const handleConfirmChoice = async () => {
    if (selectedIndex === null || !todayChoice) return;

    const result = await submitChoice(selectedIndex);
    
    if (result) {
      setLocalConsequences(result);
      setCurrentStep('consequences');
      
      // 🆕 Rafraîchir les données XP depuis Supabase
      await refreshLevelInfo();
      
      // Animer les compteurs
      Animated.parallel([
        Animated.timing(moneyCountAnim, {
          toValue: result.consequences.money,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(xpCountAnim, {
          toValue: result.consequences.xp,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleContinueToLesson = () => {
    setCurrentStep('lesson');
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  if (loading || currentStep === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement du choix du jour...</Text>
      </View>
    );
  }

  if (!todayChoice) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aucun choix disponible pour aujourd'hui</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#6366f1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Text style={styles.backIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choix du Jour 🎯</Text>
      </LinearGradient>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* ÉTAPE 1: SÉLECTION */}
        {currentStep === 'selection' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Situation */}
            <View style={styles.situationCard}>
              <Text style={styles.situationTitle}>Situation</Text>
              <Text style={styles.situationText}>{todayChoice.situation}</Text>
            </View>

            {/* Choix */}
            <View style={styles.choicesContainer}>
              <Text style={styles.choicesTitle}>Que fais-tu ? 🤔</Text>
              <View style={styles.choicesGrid}>
                {todayChoice.choices.map((choice, index) => (
                  <ChoiceCard
                    key={index}
                    text={choice.text}
                    index={index}
                    selected={selectedIndex === index}
                    disabled={hasCompletedToday}
                    onSelect={handleSelectChoice}
                  />
                ))}
              </View>
            </View>

            {/* Bouton Confirmer */}
            {selectedIndex !== null && !hasCompletedToday && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmChoice}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={['#3B82F6', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmGradient}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.confirmText}>Confirmer mon choix</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}

        {/* ÉTAPE 2: CONSÉQUENCES */}
        {currentStep === 'consequences' && localConsequences && selectedIndex !== null && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.consequencesContainer}>
              <Text style={styles.consequencesTitle}>Résultat de ton choix</Text>

              {/* Ton choix */}
              <View style={styles.yourChoiceCard}>
                <Text style={styles.yourChoiceLabel}>Tu as choisi :</Text>
                <Text style={styles.yourChoiceText}>
                  {todayChoice.choices[selectedIndex].text}
                </Text>
              </View>

              {/* Compteurs animés */}
              <View style={styles.countersContainer}>
                {/* Argent */}
                <View style={styles.counterCard}>
                  <Text style={styles.counterLabel}>Argent</Text>
                  <Animated.Text
                    style={[
                      styles.counterValue,
                      localConsequences.consequences.money >= 0 ? styles.positive : styles.negative,
                    ]}
                  >
                    {localConsequences.consequences.money >= 0 ? '+' : ''}
                    {localConsequences.consequences.money}€
                  </Animated.Text>
                </View>

                {/* XP */}
                <View style={styles.counterCard}>
                  <Text style={styles.counterLabel}>Expérience</Text>
                  <Animated.Text style={styles.counterValueXP}>
                    +{localConsequences.consequences.xp} XP
                  </Animated.Text>
                </View>
              </View>

              {/* Stats (si présentes) */}
              {localConsequences.consequences.stats && (
                <View style={styles.statsContainer}>
                  <Text style={styles.statsTitle}>Impact sur tes stats :</Text>
                  <View style={styles.statsGrid}>
                    {Object.entries(localConsequences.consequences.stats).map(([key, value]: [string, any]) => {
                      if (value === 0) return null;
                      const labels: Record<string, string> = {
                        discipline: '🎯 Discipline',
                        creativity: '💡 Créativité',
                        prudence: '🛡️ Prudence',
                      };
                      return (
                        <View key={key} style={styles.statItem}>
                          <Text style={styles.statLabel}>{labels[key]}</Text>
                          <Text
                            style={[
                              styles.statValue,
                              value >= 0 ? styles.positive : styles.negative,
                            ]}
                          >
                            {value >= 0 ? '+' : ''}
                            {value}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Explication */}
              <View style={styles.explanationCard}>
                <Text style={styles.explanationTitle}>💬 Explication</Text>
                <Text style={styles.explanationText}>
                  {localConsequences.explanation}
                </Text>
              </View>

              {/* Bouton continuer */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinueToLesson}
              >
                <Text style={styles.continueButtonText}>
                  Voir la leçon 📚
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* ÉTAPE 3: LEÇON */}
        {currentStep === 'lesson' && localConsequences && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.lessonContainer}>
              <Text style={styles.lessonTitle}>{localConsequences.lesson.title}</Text>

              <Text style={styles.lessonContent}>{localConsequences.lesson.content}</Text>

              {/* Tips */}
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>💡 Conseils pratiques</Text>
                {localConsequences.lesson.tips.map((tip: string, index: number) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>

              {/* Bouton terminer */}
              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.finishGradient}
                >
                  <Text style={styles.finishButtonText}>✅ J'ai compris !</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    fontSize: 28,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  situationCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  situationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 12,
  },
  situationText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  choicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  choicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  choicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  confirmButton: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  consequencesContainer: {
    padding: 20,
  },
  consequencesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  yourChoiceCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  yourChoiceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  yourChoiceText: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: '600',
  },
  countersContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  counterCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  counterValueXP: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#374151',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  explanationCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    color: '#78350f',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lessonContainer: {
    padding: 20,
  },
  lessonTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    lineHeight: 34,
  },
  lessonContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
    marginBottom: 24,
  },
  tipsContainer: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#059669',
    marginRight: 8,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#065f46',
    lineHeight: 22,
  },
  finishButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  finishGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default DailyChoiceScreen;
