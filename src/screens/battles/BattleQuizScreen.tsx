import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { submitBattleQuizResult } from '@/services/battleService';
import { getModuleById } from '@/data/modulesData';

type BattleQuizRoute = { BattleQuiz: { battleId: string } };

const BattleQuizScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<BattleQuizRoute, 'BattleQuiz'>>();
  const { battleId } = route.params;
  const { user } = useUserStore();

  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [battle, setBattle] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { getBattleById } = await import('@/services/battleService');
      const res = await getBattleById(battleId);
      setBattle(res.battle);
      if (res.battle?.module_id) {
        setModule(getModuleById(res.battle.module_id));
      }
      setLoading(false);
    })();
  }, [battleId]);

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !module) return;
    const question = module.quiz.questions[currentQuestion];
    const correct = selectedAnswer === question.correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < module.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = async () => {
    if (!module || !user?.id) return;
    const finalScore = isCorrect ? score + 1 : score;
    setIsSubmitting(true);
    const res = await submitBattleQuizResult(battleId, user.id, finalScore);
    setIsSubmitting(false);
    if (res.success) {
      navigation.replace('BattleResult', { battleId });
    }
  };

  if (loading || !module) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const question = module.quiz.questions[currentQuestion];
  const totalQuestions = module.quiz.questions.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Battle Quiz - {module.title}</Text>
      </View>

      <View style={styles.progress}>
        <Text style={styles.progressText}>
          Question {currentQuestion + 1}/{totalQuestions}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.choices}>
          {question.choices.map((choice: string, index: number) => {
            const isSelected = selectedAnswer === index;
            const showCorrect = showFeedback && index === question.correctIndex;
            const showIncorrect = showFeedback && isSelected && !isCorrect;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.choice,
                  isSelected && styles.choiceSelected,
                  showCorrect && styles.choiceCorrect,
                  showIncorrect && styles.choiceIncorrect,
                ]}
                onPress={() => handleSelectAnswer(index)}
                disabled={showFeedback}
              >
                <Text style={styles.choiceText}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showFeedback && (
          <View style={styles.feedback}>
            <Text style={styles.feedbackTitle}>{isCorrect ? '✅ Correct !' : '❌ Incorrect'}</Text>
            <Text style={styles.feedbackText}>{question.explanation}</Text>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext} disabled={isSubmitting}>
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.nextText}>
                    {currentQuestion < totalQuestions - 1 ? 'Suivant' : 'Terminer'}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {!showFeedback && selectedAnswer !== null && (
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitAnswer}>
            <Text style={styles.submitText}>Valider</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  backBtn: { marginRight: 12 },
  backText: { fontSize: 24, color: '#6366f1' },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1e293b' },
  progress: { paddingHorizontal: 16, paddingBottom: 16 },
  progressText: { fontSize: 12, color: '#64748b', marginBottom: 6 },
  progressBar: { height: 6, backgroundColor: '#e2e8f0', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#6366f1', borderRadius: 999 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 48 },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: { fontSize: 16, fontWeight: '600', color: '#1e293b', lineHeight: 24 },
  choices: { gap: 12 },
  choice: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  choiceSelected: { borderColor: '#6366f1', backgroundColor: '#6366f108' },
  choiceCorrect: { borderColor: '#10b981', backgroundColor: '#10b98115' },
  choiceIncorrect: { borderColor: '#ef4444', backgroundColor: '#ef444415' },
  choiceText: { fontSize: 15, color: '#1e293b' },
  feedback: { marginTop: 24 },
  feedbackTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  feedbackText: { fontSize: 14, color: '#64748b', lineHeight: 22, marginBottom: 20 },
  nextBtn: { borderRadius: 14, overflow: 'hidden' },
  nextGradient: { paddingVertical: 16, alignItems: 'center' },
  nextText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  submitBtn: {
    marginTop: 24,
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default BattleQuizScreen;
