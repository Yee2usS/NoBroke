import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ProfileQuestionsScreenProps {
  navigation: any;
}

const AGE_RANGES = [
  { label: '18 – 25 ans', value: '18-25' },
  { label: '26 – 35 ans', value: '26-35' },
  { label: '36 – 45 ans', value: '36-45' },
  { label: '46 – 55 ans', value: '46-55' },
  { label: '56+ ans',     value: '56+'   },
];

const INCOME_RANGES = [
  { label: 'Moins de 20 000 €/an', value: '<20k'     },
  { label: '20 000 – 40 000 €/an', value: '20k-40k'  },
  { label: '40 000 – 60 000 €/an', value: '40k-60k'  },
  { label: '60 000 – 100 000 €/an', value: '60k-100k' },
  { label: 'Plus de 100 000 €/an', value: '>100k'    },
];

const OBJECTIVES = [
  { label: 'Économiser pour un projet', value: 'save',       emoji: '💰' },
  { label: 'Apprendre à investir',      value: 'invest',     emoji: '📈' },
  { label: 'Devenir propriétaire',      value: 'property',   emoji: '🏠' },
  { label: 'Créer mon entreprise',      value: 'business',   emoji: '🎯' },
  { label: 'Préparer ma retraite',      value: 'retirement', emoji: '🌴' },
  { label: 'Culture financière',        value: 'knowledge',  emoji: '📚' },
];

// Étapes pour la barre de progression
const STEPS = 3;

const ProfileQuestionsScreen: React.FC<ProfileQuestionsScreenProps> = ({ navigation }) => {
  const [selectedAge,       setSelectedAge]       = useState<string>('');
  const [selectedIncome,    setSelectedIncome]    = useState<string>('');
  const [selectedObjective, setSelectedObjective] = useState<string>('');

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 70, friction: 9 }),
    ]).start();
  }, []);

  const filledSteps = [selectedAge, selectedIncome, selectedObjective].filter(Boolean).length;
  const canContinue = filledSteps === STEPS;

  const handleContinue = () => {
    if (canContinue) {
      navigation.navigate('Quiz', {
        profileData: { age: selectedAge, income: selectedIncome, objective: selectedObjective },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Fond sombre */}
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes */}
      <View style={[styles.orb, { width: 250, height: 250, top: -80, left: -80, backgroundColor: 'rgba(99,102,241,0.18)' }]} />
      <View style={[styles.orb, { width: 180, height: 180, top: height * 0.5, right: -60, backgroundColor: 'rgba(168,85,247,0.15)' }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <LinearGradient
                colors={['#818cf8', '#a855f7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerIconGradient}
              >
                <Ionicons name="person" size={24} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Parlons de toi</Text>
            <Text style={styles.subtitle}>Pour personnaliser ton parcours financier</Text>

            {/* Barre de progression */}
            <View style={styles.progressRow}>
              {Array.from({ length: STEPS }).map((_, i) => (
                <View key={i} style={styles.progressSegment}>
                  <View
                    style={[
                      styles.progressBar,
                      i < filledSteps && styles.progressBarFilled,
                    ]}
                  />
                </View>
              ))}
            </View>
            <Text style={styles.progressText}>{filledSteps}/{STEPS} complété</Text>
          </View>

          {/* Q1 — Âge */}
          <Section
            number={1}
            title="Quel âge as-tu ?"
            icon="calendar-outline"
          >
            <View style={styles.pillsRow}>
              {AGE_RANGES.map((opt) => (
                <Pill
                  key={opt.value}
                  label={opt.label}
                  selected={selectedAge === opt.value}
                  onPress={() => setSelectedAge(opt.value)}
                />
              ))}
            </View>
          </Section>

          {/* Q2 — Revenus */}
          <Section
            number={2}
            title="Tes revenus annuels ?"
            icon="wallet-outline"
          >
            <View style={styles.pillsCol}>
              {INCOME_RANGES.map((opt) => (
                <Pill
                  key={opt.value}
                  label={opt.label}
                  selected={selectedIncome === opt.value}
                  onPress={() => setSelectedIncome(opt.value)}
                  fullWidth
                />
              ))}
            </View>
          </Section>

          {/* Q3 — Objectif */}
          <Section
            number={3}
            title="Ton objectif principal ?"
            icon="flag-outline"
          >
            <View style={styles.goalsGrid}>
              {OBJECTIVES.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.goalCard,
                    selectedObjective === opt.value && styles.goalCardSelected,
                  ]}
                  onPress={() => setSelectedObjective(opt.value)}
                  activeOpacity={0.8}
                >
                  {selectedObjective === opt.value && (
                    <View style={styles.goalCheckmark}>
                      <Ionicons name="checkmark-circle" size={16} color="#818cf8" />
                    </View>
                  )}
                  <Text style={styles.goalEmoji}>{opt.emoji}</Text>
                  <Text style={[
                    styles.goalLabel,
                    selectedObjective === opt.value && styles.goalLabelSelected,
                  ]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Section>

          {/* Bouton */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!canContinue}
            activeOpacity={0.85}
            style={styles.btnWrapper}
          >
            <LinearGradient
              colors={canContinue ? ['#6366f1', '#8b5cf6'] : ['#374151', '#374151']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>
                {canContinue ? 'Commencer le quiz' : `Plus que ${STEPS - filledSteps} réponse${STEPS - filledSteps > 1 ? 's' : ''}`}
              </Text>
              {canContinue && (
                <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// Composant Section réutilisable
const Section: React.FC<{
  number: number;
  title: string;
  icon: any;
  children: React.ReactNode;
}> = ({ number, title, icon, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionNum}>
        <Text style={styles.sectionNumText}>{number}</Text>
      </View>
      <Ionicons name={icon} size={16} color="rgba(255,255,255,0.4)" style={{ marginRight: 6 }} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

// Composant Pill (bouton sélectionnable)
const Pill: React.FC<{
  label: string;
  selected: boolean;
  onPress: () => void;
  fullWidth?: boolean;
}> = ({ label, selected, onPress, fullWidth }) => (
  <TouchableOpacity
    style={[
      styles.pill,
      fullWidth && styles.pillFull,
      selected && styles.pillSelected,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {selected && (
      <Ionicons name="checkmark-circle" size={14} color="#818cf8" style={{ marginRight: 6 }} />
    )}
    <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 999 },

  scroll: { paddingHorizontal: 24, paddingTop: 64, paddingBottom: 32 },

  // Header
  header: { alignItems: 'center', marginBottom: 32 },
  headerIcon: {
    marginBottom: 16,
    shadowColor: '#818cf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  headerIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
    width: '60%',
  },
  progressSegment: { flex: 1 },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  progressBarFilled: {
    backgroundColor: '#818cf8',
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
  },

  // Section
  section: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(129,140,248,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionNumText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#818cf8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },

  // Pills (âge)
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillsCol: { gap: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillFull: { width: '100%' },
  pillSelected: {
    backgroundColor: 'rgba(129,140,248,0.18)',
    borderColor: '#818cf8',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
  },
  pillTextSelected: {
    color: '#e0e7ff',
    fontWeight: '700',
  },

  // Goals grid
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  goalCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  goalCardSelected: {
    backgroundColor: 'rgba(129,140,248,0.18)',
    borderColor: '#818cf8',
  },
  goalCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  goalEmoji: { fontSize: 30, marginBottom: 8 },
  goalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    lineHeight: 16,
  },
  goalLabelSelected: {
    color: '#e0e7ff',
    fontWeight: '700',
  },

  // Bouton
  btnWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default ProfileQuestionsScreen;
