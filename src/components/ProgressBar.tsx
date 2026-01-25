import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * Composant ProgressBar pour afficher la progression
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
  height = 'md',
  color = '#6366f1',
}) => {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  const getHeightStyle = () => {
    if (height === 'sm') return styles.heightSm;
    if (height === 'lg') return styles.heightLg;
    return styles.heightMd;
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>Progression</Text>
          <Text style={styles.label}>
            {current} / {total}
          </Text>
        </View>
      )}
      <View style={[styles.barBackground, getHeightStyle()]}>
        <View
          style={[
            styles.barFill,
            getHeightStyle(),
            { width: `${percentage}%`, backgroundColor: color }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#4b5563',
    fontSize: 14,
  },
  barBackground: {
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: 999,
  },
  heightSm: {
    height: 8,
  },
  heightMd: {
    height: 12,
  },
  heightLg: {
    height: 16,
  },
});

export default ProgressBar;
