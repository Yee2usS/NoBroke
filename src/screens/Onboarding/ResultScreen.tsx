import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { calculateLevel, calculateXP } from '@/data/quizQuestions';
import {
  QUICK_WINS_OBJECTIVES,
  QUICK_WINS_ACTIONS,
  QuickWinsData,
} from '@/data/quickWinsData';

const { width, height } = Dimensions.get('window');

interface ResultScreenProps {
  navigation: any;
  route: any;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const { score, totalQuestions, profileData, quickWinsData } = route.params;

  const level = calculateLevel(score);
  const xp = calculateXP(score);
  const percentage = Math.round((score / totalQuestions) * 100);

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getResultConfig = () => {
    if (percentage >= 80)
      return { title: 'Excellent !', message: 'Tu as une excellente base financière !', icon: 'trophy' as const, color: '#fbbf24' };
    if (percentage >= 60)
      return { title: 'Très bien !', message: 'Tu as de bonnes connaissances !', icon: 'star' as const, color: '#a78bfa' };
    if (percentage >= 40)
      return { title: 'Pas mal !', message: 'Tu es sur la bonne voie !', icon: 'trending-up' as const, color: '#34d399' };
    return { title: "C'est un début !", message: 'Tu vas apprendre plein de choses !', icon: 'flag' as const, color: '#818cf8' };
  };

  const result = getResultConfig();

  const handleContinue = () => {
    navigation.navigate('Avatar', { level, xp, profileData, quickWinsData: quickWinsData ?? null });
  };

  const getObjectivesLabels = () => {
    if (!quickWinsData?.objectives?.length) return [];
    return quickWinsData.objectives.map(
      (id) => QUICK_WINS_OBJECTIVES.find((o) => o.id === id)?.label
    ).filter(Boolean) as string[];
  };

  const getActionsLabels = () => {
    if (!quickWinsData?.selectedActions?.length) return [];
    return quickWinsData.selectedActions.map(
      (id) => QUICK_WINS_ACTIONS.find((a) => a.id === id)?.label
    ).filter(Boolean) as string[];
  };

  const levelMessage =
    level === 1 && "Tu commences niveau 1 ! Parfait pour découvrir les bases de la finance."
    || level === 11 && "Tu commences niveau 11 ! Tu connais déjà les fondamentaux — Zone 2 débloquée !"
    || level === 21 && "Tu commences niveau 21 ! Très bon niveau intermédiaire — Zone 3 débloquée !"
    || level === 31 && "Tu commences niveau 31 ! Tu es déjà expert en finance — Zone 4 débloquée !";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes */}
      <View style={[styles.orb, { width: 240, height: 240, top: -80, left: -60, backgroundColor: 'rgba(99,102,241,0.2)' }]} />
      <View style={[styles.orb, { width: 180, height: 180, bottom: height * 0.15, right: -50, backgroundColor: 'rgba(168,85,247,0.15)' }]} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.card,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Icône résultat */}
          <View style={[styles.iconWrap, { borderColor: result.color }]}>
            <LinearGradient
              colors={['#818cf8', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <Ionicons name={result.icon} size={40} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>{result.title}</Text>
          <Text style={styles.subtitle}>{result.message}</Text>

          {/* Score */}
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Ton score</Text>
            <Text style={styles.scoreValue}>{score}/{totalQuestions}</Text>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{percentage}%</Text>
            </View>
          </View>

          {/* Récompenses */}
          <View style={styles.rewardsRow}>
            <View style={styles.rewardCard}>
              <Ionicons name="star" size={22} color="#fbbf24" style={{ marginBottom: 6 }} />
              <Text style={styles.rewardLabel}>Niveau de départ</Text>
              <Text style={styles.rewardValue}>Niveau {level}</Text>
            </View>
            <View style={styles.rewardCard}>
              <Ionicons name="diamond" size={22} color="#818cf8" style={{ marginBottom: 6 }} />
              <Text style={styles.rewardLabel}>XP de départ</Text>
              <Text style={styles.rewardValue}>{xp} XP</Text>
            </View>
          </View>

          {/* Message zone débloquée */}
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{levelMessage}</Text>
          </View>

          {/* Section Tes objectifs (Quick Wins) */}
          {quickWinsData && (
            <View style={styles.objectivesBox}>
              <View style={styles.objectivesHeader}>
                <Ionicons name="flag" size={20} color="#a78bfa" />
                <Text style={styles.objectivesTitle}>Tes objectifs</Text>
              </View>
              {getObjectivesLabels().length > 0 && (
                <View style={styles.objectivesList}>
                  {getObjectivesLabels().map((label, i) => (
                    <Text key={i} style={styles.objectiveItem}>• {label}</Text>
                  ))}
                </View>
              )}
              {quickWinsData.hasIdeas && getActionsLabels().length > 0 ? (
                <View style={styles.actionsList}>
                  <Text style={styles.actionsTitle}>Idées à appliquer :</Text>
                  {getActionsLabels().map((label, i) => (
                    <Text key={i} style={styles.actionItem}>✓ {label}</Text>
                  ))}
                </View>
              ) : quickWinsData.hasIdeas === false ? (
                <Text style={styles.accompagnementText}>
                  💡 On va t'accompagner pas à pas
                </Text>
              ) : null}
            </View>
          )}
        </Animated.View>

        {/* Bouton */}
        <TouchableOpacity onPress={handleContinue} activeOpacity={0.85} style={styles.btnWrap}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Créer mon profil</Text>
            <Ionicons name="person-add" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 999 },

  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },

  iconWrap: {
    marginBottom: 20,
    padding: 4,
    borderRadius: 50,
    borderWidth: 2,
    shadowColor: '#818cf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 24,
  },

  scoreBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 6,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 44,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
  },
  percentBadge: {
    marginTop: 8,
    backgroundColor: 'rgba(129,140,248,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  percentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#a78bfa',
  },

  rewardsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 20,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  rewardLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 4,
    fontWeight: '600',
  },
  rewardValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  messageBox: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderRadius: 14,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.25)',
  },
  messageText: {
    fontSize: 14,
    color: '#fcd34d',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },

  objectivesBox: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'rgba(129,140,248,0.12)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.25)',
  },
  objectivesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  objectivesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#a78bfa',
  },
  objectivesList: {
    marginBottom: 8,
  },
  objectiveItem: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
  },
  actionsList: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  actionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 6,
  },
  actionItem: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
  accompagnementText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontStyle: 'italic',
    marginTop: 4,
  },

  btnWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 18,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});

export default ResultScreen;
