import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QuizQuestion from '@/components/QuizQuestion';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

interface QuizScreenProps {
  navigation: any;
  route: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation, route }) => {
  const { profileData } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (selectedIndex: number, isCorrect: boolean) => {
    // Enregistrer la réponse
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    // Passer à la question suivante ou terminer
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1500);
    } else {
      // Quiz terminé
      setTimeout(() => {
        navigation.navigate('Result', {
          score: newScore,
          totalQuestions: QUIZ_QUESTIONS.length,
          profileData,
        });
      }, 1500);
    }
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#a855f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}
          </Text>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}/{currentQuestionIndex}</Text>
        </View>
      </View>

      {/* Question actuelle */}
      <View style={styles.questionContainer}>
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          difficulty={currentQuestion.difficulty}
          onAnswer={handleAnswer}
        />
      </View>

      {/* Skip Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => {
            navigation.navigate('Result', {
              score,
              totalQuestions: currentQuestionIndex + 1,
              profileData,
            });
          }}
        >
          <Text style={styles.skipText}>Passer le quiz</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 999,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#e0e7ff',
    fontSize: 10,
    fontWeight: '600',
  },
  scoreValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default QuizScreen;
