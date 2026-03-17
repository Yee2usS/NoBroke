import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDailyChoice } from '@/hooks/useDailyChoice';
import { RootStackParamList } from '@/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const DailyChoiceWidget: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { todayChoice, hasCompletedToday, loading } = useDailyChoice();

  const handlePress = () => {
    navigation.navigate('DailyChoice');
  };

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!todayChoice) {
    return null;
  }

  const title = todayChoice.lesson?.title || 'Choix du Jour';
  const description = todayChoice.situation?.substring(0, 100) || '';

  const accentColor = hasCompletedToday ? '#64748b' : '#4f46e5';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.85}
      disabled={hasCompletedToday}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: hasCompletedToday ? 'rgba(100,116,139,0.12)' : 'rgba(79,70,229,0.12)' }]}>
            <Ionicons name="sparkles" size={18} color={accentColor} />
          </View>
          <Text style={[styles.badge, { color: accentColor }]}>CHOIX DU JOUR</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {description}
          {description.length >= 100 ? '…' : ''}
        </Text>

        <View style={styles.ctaRow}>
          {hasCompletedToday ? (
            <View style={styles.completedBtn}>
              <Ionicons name="checkmark-circle" size={18} color="#64748b" />
              <Text style={styles.completedText}>Complété</Text>
            </View>
          ) : (
            <View style={styles.ctaBtn}>
              <Text style={styles.ctaText}>Relever le défi</Text>
              <Ionicons name="arrow-forward" size={16} color="#4f46e5" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadingWrap: {
    padding: 32,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  accentBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingLeft: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 24,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
    marginBottom: 16,
  },
  ctaRow: {
    alignItems: 'stretch',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(79,70,229,0.08)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  ctaText: {
    color: '#4f46e5',
    fontSize: 15,
    fontWeight: '700',
  },
  completedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  completedText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default DailyChoiceWidget;
