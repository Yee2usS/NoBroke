import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
    if (showResult) return; // Empêcher de répondre 2 fois

    setSelectedIndex(index);
    setShowResult(true);

    const isCorrect = index === correctAnswer;

    // Appeler le callback après un délai
    setTimeout(() => {
      onAnswer(index, isCorrect);
    }, 1500);
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'easy':
        return 'Facile';
      case 'medium':
        return 'Moyen';
      case 'hard':
        return 'Difficile';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      {/* Difficulty Badge */}
      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
        <Text style={styles.difficultyText}>{getDifficultyLabel()}</Text>
      </View>

      {/* Question */}
      <Text style={styles.question}>{question}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === correctAnswer;
          const showCorrect = showResult && isCorrectOption;
          const showIncorrect = showResult && isSelected && !isCorrectOption;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
                showCorrect && styles.optionButtonCorrect,
                showIncorrect && styles.optionButtonIncorrect,
              ]}
              onPress={() => handleSelectOption(index)}
              disabled={showResult}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionText,
                    (isSelected || showCorrect || showIncorrect) && styles.optionTextBold,
                  ]}
                >
                  {option}
                </Text>
                {showCorrect && <Text style={styles.resultEmoji}>✅</Text>}
                {showIncorrect && <Text style={styles.resultEmoji}>❌</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 20,
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 32,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#ffffff',
  },
  optionButtonCorrect: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  optionButtonIncorrect: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  optionTextBold: {
    fontWeight: '600',
  },
  resultEmoji: {
    fontSize: 24,
    marginLeft: 12,
  },
});

export default QuizQuestion;
