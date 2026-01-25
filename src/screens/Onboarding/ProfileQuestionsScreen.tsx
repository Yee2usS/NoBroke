import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileQuestionsScreenProps {
  navigation: any;
}

const ProfileQuestionsScreen: React.FC<ProfileQuestionsScreenProps> = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedIncome, setSelectedIncome] = useState<string>('');
  const [selectedObjective, setSelectedObjective] = useState<string>('');

  const ageRanges = [
    { label: '18-25 ans', value: '18-25' },
    { label: '26-35 ans', value: '26-35' },
    { label: '36-45 ans', value: '36-45' },
    { label: '46-55 ans', value: '46-55' },
    { label: '56+ ans', value: '56+' },
  ];

  const incomeRanges = [
    { label: 'Moins de 20k€/an', value: '<20k' },
    { label: '20k - 40k€/an', value: '20k-40k' },
    { label: '40k - 60k€/an', value: '40k-60k' },
    { label: '60k - 100k€/an', value: '60k-100k' },
    { label: 'Plus de 100k€/an', value: '>100k' },
  ];

  const objectives = [
    { label: '💰 Économiser pour un projet', value: 'save', emoji: '💰' },
    { label: '📈 Apprendre à investir', value: 'invest', emoji: '📈' },
    { label: '🏠 Devenir propriétaire', value: 'property', emoji: '🏠' },
    { label: '🎯 Créer mon entreprise', value: 'business', emoji: '🎯' },
    { label: '🌴 Préparer ma retraite', value: 'retirement', emoji: '🌴' },
    { label: '📚 Culture financière', value: 'knowledge', emoji: '📚' },
  ];

  const canContinue = selectedAge && selectedIncome && selectedObjective;

  const handleContinue = () => {
    if (canContinue) {
      navigation.navigate('Quiz', {
        profileData: {
          age: selectedAge,
          income: selectedIncome,
          objective: selectedObjective,
        },
      });
    }
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#a855f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Parlons de toi 👋</Text>
          <Text style={styles.subtitle}>
            Pour personnaliser ton expérience
          </Text>
        </View>

        {/* Question 1 : Âge */}
        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>Quel âge as-tu ?</Text>
          <View style={styles.optionsContainer}>
            {ageRanges.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  selectedAge === option.value && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedAge(option.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAge === option.value && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 2 : Revenus */}
        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>Tes revenus annuels ?</Text>
          <View style={styles.optionsContainer}>
            {incomeRanges.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  selectedIncome === option.value && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedIncome(option.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedIncome === option.value && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 3 : Objectif */}
        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>Ton objectif principal ?</Text>
          <View style={styles.optionsGrid}>
            {objectives.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.objectiveCard,
                  selectedObjective === option.value && styles.objectiveCardSelected,
                ]}
                onPress={() => setSelectedObjective(option.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.objectiveEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.objectiveText,
                    selectedObjective === option.value && styles.objectiveTextSelected,
                  ]}
                >
                  {option.label.replace(option.emoji + ' ', '')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            Commencer le quiz 🎯
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  questionSection: {
    marginBottom: 32,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#6366f1',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  objectiveCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  objectiveCardSelected: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  objectiveEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  objectiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  objectiveTextSelected: {
    color: '#6366f1',
  },
  continueButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
});

export default ProfileQuestionsScreen;
