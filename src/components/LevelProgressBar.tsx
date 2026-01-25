import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

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
 * Barre de progression du niveau avec animation
 */
const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  currentLevel,
  currentXP,
  xpForNextLevel,
  progressPercentage,
  showLabel = true,
  height = 12,
  animated = true,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.spring(progressAnim, {
        toValue: progressPercentage,
        useNativeDriver: false,
        damping: 15,
        stiffness: 100,
      }).start();
    } else {
      progressAnim.setValue(progressPercentage);
    }
  }, [progressPercentage, animated]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Label */}
      {showLabel && (
        <View style={styles.labelContainer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Niv. {currentLevel}</Text>
          </View>
          <Text style={styles.xpText}>
            {currentXP} / {xpForNextLevel} XP
          </Text>
        </View>
      )}

      {/* Barre de progression */}
      <View style={[styles.progressBar, { height }]}>
        <Animated.View style={[styles.progressFill, { height, width: animatedWidth }]} />
        
        {/* Étincelles (optionnel) */}
        {progressPercentage > 90 && (
          <View style={styles.sparkles}>
            <Text style={styles.sparkle}>✨</Text>
          </View>
        )}
      </View>

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
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  xpText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    backgroundColor: '#6366f1',
    borderRadius: 999,
    position: 'relative',
  },
  sparkles: {
    position: 'absolute',
    right: 8,
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
    fontWeight: '600',
    marginTop: 4,
  },
});

export default LevelProgressBar;
