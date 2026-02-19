import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '@/types';
import { useModules } from '@/hooks/useModules';
import { useXP } from '@/hooks/useXP';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ModuleQuizRouteProp = RouteProp<{ ModuleQuiz: { moduleId: string } }, 'ModuleQuiz'>;

/**
 * Écran de quiz pour valider un module
 */
const ModuleQuizScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ModuleQuizRouteProp>();
  const { moduleId } = route.params;
  const { getModule, completeModule } = useModules();
  const { refreshLevelInfo } = useXP();

  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    setLoading(true);
    const moduleData = await getModule(moduleId);
    setModule(moduleData);
    setLoading(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !module) return;

    const question = module.quiz.questions[currentQuestion];
    const correct = selectedAnswer === question.correctIndex;

    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }

    setShowFeedback(true);

    // Animation feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    // Reset animations
    fadeAnim.setValue(0);

    if (currentQuestion < module.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Fin du quiz
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = async () => {
    if (!module) return;

    setIsSubmitting(true);

    try {
      const finalScore = isCorrect ? score + 1 : score; // Include last answer
      const result = await completeModule(moduleId, finalScore);

      if (result?.success) {
        await refreshLevelInfo();
        setShowCompletionModal(true);
      }
    } catch (error) {
      console.error('Erreur completion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setShowCompletionModal(false);
    navigation.goBack();
    navigation.goBack(); // Return to modules list
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement du quiz...</Text>
      </View>
    );
  }

  if (!module) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Quiz introuvable</Text>
      </View>
    );
  }

  const question = module.quiz.questions[currentQuestion];
  const totalQuestions = module.quiz.questions.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Text style={styles.backIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz - {module.title}</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestion + 1}/{totalQuestions}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <View style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Choices */}
        <View style={styles.choicesContainer}>
          {question.choices.map((choice, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctIndex;
            const showCorrect = showFeedback && isCorrectAnswer;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <Animated.View
                key={index}
                style={[
                  { transform: [{ scale: isSelected && !showFeedback ? scaleAnim : 1 }] },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.choiceButton,
                    isSelected && !showFeedback && styles.choiceSelected,
                    showCorrect && styles.choiceCorrect,
                    showIncorrect && styles.choiceIncorrect,
                  ]}
                  onPress={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  activeOpacity={0.8}
                >
                  <View style={styles.choiceContent}>
                    <View
                      style={[
                        styles.choiceRadio,
                        isSelected && !showFeedback && styles.choiceRadioSelected,
                        showCorrect && styles.choiceRadioCorrect,
                        showIncorrect && styles.choiceRadioIncorrect,
                      ]}
                    >
                      {showCorrect && <Text style={styles.checkmark}>✓</Text>}
                      {showIncorrect && <Text style={styles.crossmark}>✗</Text>}
                    </View>
                    <Text
                      style={[
                        styles.choiceText,
                        (showCorrect || showIncorrect) && styles.choiceTextBold,
                      ]}
                    >
                      {choice}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <Animated.View style={[styles.feedbackCard, { opacity: fadeAnim }]}>
            <View
              style={[
                styles.feedbackHeader,
                isCorrect ? styles.feedbackHeaderCorrect : styles.feedbackHeaderIncorrect,
              ]}
            >
              <Text style={styles.feedbackIcon}>{isCorrect ? '✅' : '❌'}</Text>
              <Text style={styles.feedbackTitle}>
                {isCorrect ? 'Bravo !' : 'Pas tout à fait...'}
              </Text>
            </View>
            <Text style={styles.feedbackText}>{question.explanation}</Text>
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {!showFeedback && selectedAnswer !== null && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>Valider</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {showFeedback && !isSubmitting && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < totalQuestions - 1 ? 'Question suivante →' : 'Terminer le quiz'}
            </Text>
          </TouchableOpacity>
        )}

        {isSubmitting && (
          <View style={styles.submittingContainer}>
            <ActivityIndicator color="#6366f1" />
            <Text style={styles.submittingText}>Enregistrement...</Text>
          </View>
        )}
      </View>

      {/* Completion Modal */}
      <Modal visible={showCompletionModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.modalGradient}
            >
              <Text style={styles.modalIcon}>🎉</Text>
              <Text style={styles.modalTitle}>Module complété !</Text>
              <Text style={styles.modalScore}>
                Score : {score}/{totalQuestions}
              </Text>
              <Text style={styles.modalXP}>+{module.xpReward} XP gagnés</Text>

              <TouchableOpacity style={styles.modalButton} onPress={handleFinish}>
                <Text style={styles.modalButtonText}>Génial ! 🚀</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
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
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    fontSize: 28,
    color: '#6366f1',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: 28,
  },
  choicesContainer: {
    gap: 12,
  },
  choiceButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  choiceSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  choiceCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#d1fae5',
  },
  choiceIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  choiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  choiceRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceRadioSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#6366f1',
  },
  choiceRadioCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  choiceRadioIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  crossmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  choiceText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  choiceTextBold: {
    fontWeight: '600',
  },
  feedbackCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  feedbackHeaderCorrect: {
    backgroundColor: '#d1fae5',
  },
  feedbackHeaderIncorrect: {
    backgroundColor: '#fee2e2',
  },
  feedbackIcon: {
    fontSize: 24,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  feedbackText: {
    padding: 16,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nextButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  submittingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  submittingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  modalGradient: {
    padding: 32,
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  modalScore: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: '600',
  },
  modalXP: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBBF24',
    marginBottom: 32,
  },
  modalButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
});

export default ModuleQuizScreen;
