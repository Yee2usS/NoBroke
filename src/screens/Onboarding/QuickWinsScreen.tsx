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
import {
  QUICK_WINS_OBJECTIVES,
  QUICK_WINS_ACTIONS,
  QuickWinsData,
  QuickWinsObjectiveId,
  QuickWinsActionId,
} from '@/data/quickWinsData';

const { width, height } = Dimensions.get('window');

interface QuickWinsScreenProps {
  navigation: any;
  route: any;
}

const QuickWinsScreen: React.FC<QuickWinsScreenProps> = ({ navigation, route }) => {
  const { score, totalQuestions, profileData } = route.params;

  const [step, setStep] = useState(1);
  const [objectives, setObjectives] = useState<QuickWinsObjectiveId[]>([]);
  const [hasIdeas, setHasIdeas] = useState<boolean | null>(null);
  const [selectedActions, setSelectedActions] = useState<QuickWinsActionId[]>([]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleObjective = (id: QuickWinsObjectiveId) => {
    setObjectives((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const toggleAction = (id: QuickWinsActionId) => {
    setSelectedActions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const canContinueStep1 = objectives.length > 0;
  const canContinueStep2 = hasIdeas !== null;
  const canContinueStep3 = hasIdeas === false || hasIdeas === true;

  const handleContinueStep1 = () => {
    if (!canContinueStep1) return;
    setStep(2);
  };

  const handleContinueStep2 = () => {
    if (!canContinueStep2) return;
    if (hasIdeas === false) {
      goToResult();
    } else {
      setStep(3);
    }
  };

  const handleContinueStep3 = () => {
    if (!canContinueStep3) return;
    goToResult();
  };

  const goToResult = () => {
    const quickWinsData: QuickWinsData = {
      objectives,
      hasIdeas: hasIdeas ?? false,
      selectedActions: hasIdeas ? selectedActions : [],
    };
    navigation.navigate('Result', {
      score,
      totalQuestions,
      profileData,
      quickWinsData,
    });
  };

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, [step]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.orb, { width: 220, height: 220, top: -70, right: -70, backgroundColor: 'rgba(99,102,241,0.2)' }]} />
      <View style={[styles.orb, { width: 160, height: 160, bottom: height * 0.3, left: -50, backgroundColor: 'rgba(168,85,247,0.15)' }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>Étape {step}/3</Text>
            </View>
            <Text style={styles.title}>Tes objectifs</Text>
            <Text style={styles.subtitle}>
              {step === 1 && 'On personnalise ton parcours'}
              {step === 2 && 'Pour t\'aider au mieux'}
              {step === 3 && 'Des idées concrètes à appliquer'}
            </Text>
          </View>

          {/* Step 1: Objectifs */}
          {step === 1 && (
            <View style={styles.stepContent}>
              <Text style={styles.question}>Tu souhaites :</Text>
              <View style={styles.optionsRow}>
                {QUICK_WINS_OBJECTIVES.map((obj) => {
                  const selected = objectives.includes(obj.id);
                  return (
                    <TouchableOpacity
                      key={obj.id}
                      style={[styles.optionCard, selected && styles.optionCardSelected]}
                      onPress={() => toggleObjective(obj.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.optionEmoji}>{obj.emoji}</Text>
                      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                        {obj.label}
                      </Text>
                      {selected && (
                        <Ionicons name="checkmark-circle" size={24} color="#6366f1" style={styles.optionCheck} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={styles.hint}>Tu peux sélectionner les deux</Text>
              <TouchableOpacity
                style={[styles.btn, !canContinueStep1 && styles.btnDisabled]}
                onPress={handleContinueStep1}
                disabled={!canContinueStep1}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={canContinueStep1 ? ['#6366f1', '#8b5cf6'] : ['#4b5563', '#4b5563']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>Continuer</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: As-tu des idées ? */}
          {step === 2 && (
            <View style={styles.stepContent}>
              <Text style={styles.question}>As-tu déjà une idée de comment t'y prendre ?</Text>
              <View style={styles.yesNoRow}>
                <TouchableOpacity
                  style={[styles.yesNoCard, hasIdeas === true && styles.yesNoCardSelected]}
                  onPress={() => setHasIdeas(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.yesNoEmoji}>💡</Text>
                  <Text style={[styles.yesNoLabel, hasIdeas === true && styles.yesNoLabelSelected]}>
                    Oui
                  </Text>
                  <Text style={styles.yesNoSub}>J'ai des pistes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.yesNoCard, hasIdeas === false && styles.yesNoCardSelected]}
                  onPress={() => setHasIdeas(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.yesNoEmoji}>🚀</Text>
                  <Text style={[styles.yesNoLabel, hasIdeas === false && styles.yesNoLabelSelected]}>
                    Non
                  </Text>
                  <Text style={styles.yesNoSub}>Je suis là pour ça</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.btn, !canContinueStep2 && styles.btnDisabled]}
                onPress={handleContinueStep2}
                disabled={!canContinueStep2}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={canContinueStep2 ? ['#6366f1', '#8b5cf6'] : ['#4b5563', '#4b5563']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>
                    {hasIdeas === false ? 'C\'est parti !' : 'Voir les idées'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 3: Idées concrètes */}
          {step === 3 && (
            <View style={styles.stepContent}>
              <Text style={styles.question}>Idées concrètes à appliquer dès maintenant :</Text>
              <View style={styles.actionsList}>
                {QUICK_WINS_ACTIONS.map((action) => {
                  const selected = selectedActions.includes(action.id);
                  return (
                    <TouchableOpacity
                      key={action.id}
                      style={[styles.actionCard, selected && styles.actionCardSelected]}
                      onPress={() => toggleAction(action.id)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.actionCheck, selected && styles.actionCheckSelected]}>
                        {selected && <Ionicons name="checkmark" size={16} color="#fff" />}
                      </View>
                      <Text style={[styles.actionLabel, selected && styles.actionLabelSelected]}>
                        {action.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={[styles.btn, !canContinueStep3 && styles.btnDisabled]}
                onPress={handleContinueStep3}
                disabled={!canContinueStep3}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={canContinueStep3 ? ['#6366f1', '#8b5cf6'] : ['#4b5563', '#4b5563']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>Voir mon récap</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 999 },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(99,102,241,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 16,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a78bfa',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  stepContent: {},
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsRow: {
    gap: 12,
    marginBottom: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  optionEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  optionLabelSelected: {
    color: '#ffffff',
  },
  optionCheck: {
    marginLeft: 8,
  },
  hint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 24,
  },
  yesNoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  yesNoCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  yesNoCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  yesNoEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  yesNoLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  yesNoLabelSelected: {
    color: '#ffffff',
  },
  yesNoSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  actionsList: {
    gap: 12,
    marginBottom: 28,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  actionCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  actionCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionCheckSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  actionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  actionLabelSelected: {
    color: '#ffffff',
  },
  btn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default QuickWinsScreen;
