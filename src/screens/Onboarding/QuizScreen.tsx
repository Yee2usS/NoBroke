import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import QuizQuestion from '@/components/QuizQuestion';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

const { width, height } = Dimensions.get('window');

interface QuizScreenProps {
  navigation: any;
  route: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation, route }) => {
  const { profileData } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (selectedIndex: number, isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 700);
    } else {
      setTimeout(() => {
        navigation.navigate('QuickWins', {
          score: newScore,
          totalQuestions: QUIZ_QUESTIONS.length,
          profileData,
        });
      }, 700);
    }
  };

  // Animation de transition entre questions
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [currentQuestionIndex]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes */}
      <View style={[styles.orb, { width: 220, height: 220, top: -70, right: -70, backgroundColor: 'rgba(99,102,241,0.2)' }]} />
      <View style={[styles.orb, { width: 160, height: 160, bottom: height * 0.2, left: -50, backgroundColor: 'rgba(168,85,247,0.15)' }]} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.progressBlock}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
          </Text>
        </View>

        <View style={styles.scoreBadge}>
          <Ionicons name="trophy" size={16} color="#fbbf24" style={{ marginRight: 4 }} />
          <Text style={styles.scoreValue}>{score}/{currentQuestionIndex || 1}</Text>
        </View>
      </View>

      {/* Question */}
      <Animated.View style={[styles.questionWrap, { opacity: fadeAnim }]}>
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          difficulty={currentQuestion.difficulty}
          onAnswer={handleAnswer}
        />
      </Animated.View>

      {/* Skip */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => {
          navigation.navigate('QuickWins', {
            score,
            totalQuestions: currentQuestionIndex + 1,
            profileData,
          });
        }}
      >
        <Text style={styles.skipText}>Passer le quiz</Text>
        <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.4)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 999 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
  },
  progressBlock: { flex: 1 },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#818cf8',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '600',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },

  questionWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingBottom: 48,
    gap: 6,
  },
  skipText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
  },
});

export default QuizScreen;
