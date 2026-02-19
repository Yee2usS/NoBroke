import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface UpgradeButtonProps {
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'small';
  text?: string;
}

/**
 * Bouton CTA réutilisable pour upgrade Premium/Pro
 */
const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  onPress,
  variant = 'primary',
  text = 'Passer Premium',
}) => {
  const styles = getStyles(variant);

  if (variant === 'secondary') {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#6366f1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = (variant: 'primary' | 'secondary' | 'small') => {
  const isPrimary = variant === 'primary';
  const isSmall = variant === 'small';

  return StyleSheet.create({
    container: {
      borderRadius: isSmall ? 8 : 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    gradient: {
      paddingVertical: isSmall ? 10 : 16,
      paddingHorizontal: isSmall ? 16 : 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: variant === 'secondary' ? '#e0e7ff' : '#8B5CF6',
      paddingVertical: isSmall ? 10 : 16,
      paddingHorizontal: isSmall ? 16 : 32,
      borderRadius: isSmall ? 8 : 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: variant === 'secondary' ? '#4f46e5' : '#ffffff',
      fontSize: isSmall ? 14 : 16,
      fontWeight: 'bold',
    },
  });
};

export default UpgradeButton;
