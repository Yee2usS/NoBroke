import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { calculateLevel, calculateXP } from '@/data/quizQuestions';

interface ResultScreenProps {
  navigation: any;
  route: any;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const { score, totalQuestions, profileData } = route.params;

  const level = calculateLevel(score);
  const xp = calculateXP(score);
  const percentage = Math.round((score / totalQuestions) * 100);

  // Animations
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: 300,
        useNativeDriver: true,
        damping: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        delay: 300,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getResultMessage = () => {
    if (percentage >= 80) return {
      title: "Excellent ! 🎉",
      message: "Tu as une excellente base financière !",
      emoji: "🏆"
    };
    if (percentage >= 60) return {
      title: "Très bien ! 👏",
      message: "Tu as de bonnes connaissances !",
      emoji: "⭐"
    };
    if (percentage >= 40) return {
      title: "Pas mal ! 💪",
      message: "Tu es sur la bonne voie !",
      emoji: "📈"
    };
    return {
      title: "C'est un début ! 🌱",
      message: "Tu vas apprendre plein de choses !",
      emoji: "🎯"
    };
  };

  const result = getResultMessage();

  const handleContinue = () => {
    navigation.navigate('Avatar', {
      level,
      xp,
      profileData,
    });
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#a855f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Result Card */}
        <Animated.View style={[
          styles.resultCard,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }
        ]}>
          <Text style={styles.resultEmoji}>{result.emoji}</Text>
          
          <Text style={styles.resultTitle}>{result.title}</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>

          {/* Score */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Ton score</Text>
            <Text style={styles.scoreValue}>
              {score}/{totalQuestions}
            </Text>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
          </View>

          {/* Rewards */}
          <View style={styles.rewardsContainer}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>⭐</Text>
              <Text style={styles.rewardLabel}>Niveau de départ</Text>
              <Text style={styles.rewardValue}>Niveau {level}</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>💎</Text>
              <Text style={styles.rewardLabel}>XP de départ</Text>
              <Text style={styles.rewardValue}>{xp} XP</Text>
            </View>
          </View>

          {/* Explanation */}
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {level === 1 && "Tu commences niveau 1 ! Parfait pour découvrir les bases."}
              {level === 10 && "Tu commences niveau 10 ! Tu connais déjà les fondamentaux."}
              {level === 20 && "Tu commences niveau 20 ! Tu as un bon niveau intermédiaire."}
              {level === 30 && "Tu commences niveau 30 ! Tu es déjà expert en finance !"}
            </Text>
          </View>
        </Animated.View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            Créer mon profil 👤
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  scorePercentage: {
    fontSize: 20,
    fontWeight: '600',
    color: '#a855f7',
  },
  rewardsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    width: '100%',
  },
  rewardItem: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  rewardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  rewardLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  explanationBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  explanationText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
});

export default ResultScreen;
