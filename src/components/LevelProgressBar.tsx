import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LevelProgressBarProps {
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  progressPercentage: number;
  showLabel?: boolean;
  height?: number;
  animated?: boolean;
}

/**
 * Barre de progression du niveau avec animation et gradient
 * Style moderne : Gradient Bleu → Violet
 */
const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  currentLevel,
  currentXP,
  xpForNextLevel,
  progressPercentage,
  showLabel = true,
  height = 14,
  animated = true,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      // Animation de la barre
      Animated.spring(progressAnim, {
        toValue: progressPercentage,
        useNativeDriver: false,
        damping: 15,
        stiffness: 90,
        mass: 1,
      }).start();

      // Animation de pulsation si proche de 100%
      if (progressPercentage > 90) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.05,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    } else {
      progressAnim.setValue(progressPercentage);
    }
  }, [progressPercentage, animated]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  // Formater les nombres avec des virgules (1,234)
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {showLabel && (
        <View style={styles.labelContainer}>
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.levelBadge}
          >
            <Text style={styles.levelText}>Niveau {currentLevel}</Text>
          </LinearGradient>
          <Text style={styles.xpText}>
            {formatNumber(currentXP)} / {formatNumber(xpForNextLevel)} XP
          </Text>
        </View>
      )}

      {/* Barre de progression */}
      <Animated.View
        style={[
          styles.progressBarContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <View style={[styles.progressBar, { height }]}>
          <Animated.View style={[styles.progressFillContainer, { width: animatedWidth }]}>
            <LinearGradient
              colors={['#3B82F6', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { height }]}
            >
              {/* Effet brillant */}
              <View style={styles.shimmer} />
            </LinearGradient>
          </Animated.View>

          {/* Étincelles si proche de 100% */}
          {progressPercentage > 90 && (
            <View style={styles.sparkles}>
              <Text style={styles.sparkle}>✨</Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Pourcentage */}
      {showLabel && (
        <Text style={styles.percentageText}>{Math.round(progressPercentage)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  xpText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressFillContainer: {
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    borderRadius: 999,
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 999,
  },
  sparkles: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  sparkle: {
    fontSize: 16,
  },
  percentageText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
});

export default LevelProgressBar;
