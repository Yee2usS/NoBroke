import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/services/supabase';

interface OnboardingScreenProps {
  navigation: any;
}

// Questions du quiz d'onboarding
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Quel est ton objectif financier principal ?',
    options: [
      { text: '💰 Économiser pour un projet', xp: 20 },
      { text: '📈 Apprendre à investir', xp: 20 },
      { text: '🏠 Devenir propriétaire', xp: 20 },
      { text: '🎯 Créer mon entreprise', xp: 20 },
    ],
  },
  {
    id: 2,
    question: 'Comment gères-tu ton argent actuellement ?',
    options: [
      { text: '📊 J\'utilise un budget', xp: 30 },
      { text: '💳 Je dépense au feeling', xp: 10 },
      { text: '🤷 Je ne sais pas trop', xp: 15 },
      { text: '💼 J\'ai un plan financier', xp: 40 },
    ],
  },
  {
    id: 3,
    question: 'Tu reçois 1000€. Que fais-tu ?',
    options: [
      { text: '🛍️ Je dépense tout en shopping', xp: 5 },
      { text: '💎 J\'en épargne au moins 50%', xp: 50 },
      { text: '🎉 Je fais une grosse fête', xp: 5 },
      { text: '📚 J\'investis dans ma formation', xp: 40 },
    ],
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { user, setUser, setProgress } = useUserStore();

  const handleAnswer = (optionIndex: number, xp: number) => {
    const newAnswers = [...answers, optionIndex];
    const newTotalXP = totalXP + xp;

    setAnswers(newAnswers);
    setTotalXP(newTotalXP);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeOnboarding(newTotalXP);
    }
  };

  const completeOnboarding = async (finalXP: number) => {
    try {
      if (!user) return;

      // Mettre à jour le profil utilisateur
      const { error: userError } = await supabase
        .from('users')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (userError) throw userError;

      // Mettre à jour la progression avec les XP du quiz
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .update({ xp: finalXP })
        .eq('user_id', user.id)
        .select()
        .single();

      if (progressError) throw progressError;

      // Mettre à jour le store
      setUser({ ...user, onboarding_completed: true });
      if (progressData) {
        setProgress(progressData);
      }

      Alert.alert(
        'Bravo ! 🎉',
        `Tu as gagné ${finalXP} XP ! Bienvenue dans NoBroke !`,
        [
          {
            text: 'Commencer',
            onPress: () => navigation.replace('MainTabs'),
          },
        ]
      );
    } catch (error: any) {
      console.error('Onboarding error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue. Réessaye.');
    }
  };

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <LinearGradient
      colors={['#6366f1', '#a855f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
          </Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.question}>{question.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(index, option.xp)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{option.text}</Text>
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>+{option.xp} XP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current XP */}
        <View style={styles.xpContainer}>
          <Text style={styles.currentXP}>
            XP actuel : {totalXP} 💎
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },
  progressContainer: {
    marginBottom: 48,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 999,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  xpBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  xpText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  xpContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  currentXP: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
