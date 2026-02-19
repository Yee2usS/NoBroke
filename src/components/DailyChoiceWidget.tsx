import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDailyChoice } from '@/hooks/useDailyChoice';
import { RootStackParamList } from '@/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Widget "Choix du Jour" pour le Dashboard
 * Design selon mockup : gradient violet-bleu, titre + description, CTA blanc
 */
const DailyChoiceWidget: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { todayChoice, hasCompletedToday, loading } = useDailyChoice();

  const handlePress = () => {
    navigation.navigate('DailyChoice');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!todayChoice) {
    return null;
  }

  const title = todayChoice.lesson?.title || 'Choix du Jour';
  const description = todayChoice.situation?.substring(0, 120) || '';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
      disabled={hasCompletedToday}
    >
      <LinearGradient
        colors={
          hasCompletedToday ? ['#9ca3af', '#6b7280'] : ['#8B5CF6', '#6366f1']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {/* Header: Icon + CHOIX DU JOUR */}
        <View style={styles.header}>
          <Text style={styles.icon}>✨</Text>
          <Text style={styles.title}>CHOIX DU JOUR</Text>
        </View>

        {/* Titre du scénario */}
        <Text style={styles.scenarioTitle} numberOfLines={2}>
          {title}
        </Text>

        {/* Description / situation */}
        <Text style={styles.description} numberOfLines={2}>
          {description}
          {description.length >= 120 ? '…' : ''}
        </Text>

        {/* CTA */}
        <View style={styles.ctaWrapper}>
          {hasCompletedToday ? (
            <View style={styles.completedButton}>
              <Text style={styles.completedText}>✅ Complété</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={handlePress}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaText}>Relever le défi</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  icon: {
    fontSize: 18,
    color: '#ffffff',
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  ctaText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  completedText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DailyChoiceWidget;
