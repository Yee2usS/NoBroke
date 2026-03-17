import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  difficulty,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (index: number) => {
    if (showResult) return;

    setSelectedIndex(index);
    setShowResult(true);

    const isCorrect = index === correctAnswer;

    setTimeout(() => {
      onAnswer(index, isCorrect);
    }, 700);
  };

  const getDifficultyConfig = () => {
    switch (difficulty) {
      case 'easy':
        return { label: 'Facile', color: '#34d399', bg: 'rgba(52,211,153,0.2)' };
      case 'medium':
        return { label: 'Moyen', color: '#fbbf24', bg: 'rgba(251,191,36,0.2)' };
      case 'hard':
        return { label: 'Difficile', color: '#f87171', bg: 'rgba(248,113,113,0.2)' };
      default:
        return { label: '', color: '#6b7280', bg: 'rgba(107,114,128,0.2)' };
    }
  };

  const diff = getDifficultyConfig();

  return (
    <View style={styles.container}>
      {/* Badge difficulté */}
      <View style={[styles.diffBadge, { backgroundColor: diff.bg, borderColor: diff.color }]}>
        <Text style={[styles.diffText, { color: diff.color }]}>{diff.label}</Text>
      </View>

      {/* Question */}
      <Text style={styles.question}>{question}</Text>

      {/* Options */}
      <View style={styles.options}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === correctAnswer;
          const showCorrect = showResult && isCorrectOption;
          const showIncorrect = showResult && isSelected && !isCorrectOption;

          let optionStyle = styles.option;
          if (showCorrect) optionStyle = [styles.option, styles.optionCorrect];
          else if (showIncorrect) optionStyle = [styles.option, styles.optionIncorrect];
          else if (isSelected) optionStyle = [styles.option, styles.optionSelected];

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleSelectOption(index)}
              disabled={showResult}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionText,
                  (showCorrect || showIncorrect) && styles.optionTextResult,
                ]}>
                  {option}
                </Text>
                {showCorrect && (
                  <View style={styles.resultIcon}>
                    <Ionicons name="checkmark-circle" size={22} color="#34d399" />
                  </View>
                )}
                {showIncorrect && (
                  <View style={styles.resultIcon}>
                    <Ionicons name="close-circle" size={22} color="#f87171" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },

  diffBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  diffText: { fontSize: 12, fontWeight: '700' },

  question: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 30,
    marginBottom: 28,
  },

  options: { gap: 12 },
  option: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  optionSelected: {
    backgroundColor: 'rgba(129,140,248,0.15)',
    borderColor: '#818cf8',
  },
  optionCorrect: {
    backgroundColor: 'rgba(52,211,153,0.2)',
    borderColor: '#34d399',
  },
  optionIncorrect: {
    backgroundColor: 'rgba(248,113,113,0.2)',
    borderColor: '#f87171',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    flex: 1,
    lineHeight: 22,
  },
  optionTextResult: { fontWeight: '600' },
  resultIcon: { marginLeft: 12 },
});

export default QuizQuestion;
