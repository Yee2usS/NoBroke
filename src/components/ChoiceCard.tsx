import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

interface ChoiceCardProps {
  text: string;
  index: number;
  selected: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
  showConsequences?: boolean;
  consequences?: {
    money: number;
    xp: number;
  };
}

/**
 * Card pour afficher un choix du "Choix du Jour"
 */
const ChoiceCard: React.FC<ChoiceCardProps> = ({
  text,
  index,
  selected,
  disabled,
  onSelect,
  showConsequences = false,
  consequences,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: selected ? 1.03 : 1,
        useNativeDriver: true,
        friction: 3,
      }).start();
    }
  };

  const handlePress = () => {
    if (!disabled) {
      onSelect(index);
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          useNativeDriver: true,
          friction: 3,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.03,
          useNativeDriver: true,
          friction: 5,
        }),
      ]).start();
    }
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <Animated.View
      style={[
        styles.container,
        selected && styles.selectedContainer,
        disabled && styles.disabledContainer,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.9}
      >
        {/* Badge lettre */}
        <View style={[styles.badge, selected && styles.selectedBadge]}>
          <Text style={[styles.badgeText, selected && styles.selectedBadgeText]}>
            {letters[index]}
          </Text>
        </View>

        {/* Texte du choix */}
        <Text
          style={[
            styles.choiceText,
            selected && styles.selectedText,
            disabled && styles.disabledText,
          ]}
        >
          {text}
        </Text>

        {/* Conséquences (si sélectionné et showConsequences) */}
        {selected && showConsequences && consequences && (
          <View style={styles.consequencesContainer}>
            <View style={styles.consequenceItem}>
              <Text style={[styles.consequenceValue, consequences.money >= 0 ? styles.positive : styles.negative]}>
                {consequences.money >= 0 ? '+' : ''}
                {consequences.money}€
              </Text>
            </View>
            <View style={styles.consequenceItem}>
              <Text style={styles.xpValue}>+{consequences.xp} XP</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 64) / 2; // 2 cards par ligne avec padding

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  selectedContainer: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  touchable: {
    padding: 16,
    minHeight: 140,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadge: {
    backgroundColor: '#3B82F6',
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  selectedBadgeText: {
    color: '#ffffff',
  },
  choiceText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginTop: 40,
    fontWeight: '500',
  },
  selectedText: {
    color: '#1e40af',
    fontWeight: '600',
  },
  disabledText: {
    color: '#9ca3af',
  },
  consequencesContainer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  consequenceItem: {
    flex: 1,
  },
  consequenceValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
  xpValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
});

export default ChoiceCard;
