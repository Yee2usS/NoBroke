import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { YStack, Text } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ModuleWithProgress } from '@/types/module.types';
import { ZONES } from '@/data/zones';

const ISLAND_SIZE = 80;
const SPRING_CONFIG = { damping: 15, stiffness: 400 };

interface ModuleIslandProps {
  module: ModuleWithProgress;
  onPress: () => void;
  side: 'left' | 'right';
}

/**
 * Îlot circulaire style Duolingo pour un module
 * Tamagui + Reanimated : scale 0.96 au tap
 */
const ModuleIsland: React.FC<ModuleIslandProps> = ({ module, onPress, side }) => {
  const scale = useSharedValue(1);

  const isCompleted = module.progress?.completed;
  const isInProgress = !!module.progress && !module.progress.completed;
  const isLocked = module.locked;
  const isPremiumLocked = module.premiumLocked;

  const zone = ZONES.find((z) => z.id === module.zone);
  const zoneColor = zone?.color ?? '#10b981';

  const getIslandConfig = () => {
    if (isPremiumLocked) {
      return {
        bg: ['#fbbf24', '#f59e0b'],
        icon: 'star' as const,
        disabled: true,
      };
    }
    if (isLocked) {
      return {
        bg: ['#94a3b8', '#64748b'],
        icon: 'lock-closed' as const,
        disabled: true,
      };
    }
    if (isCompleted) {
      return {
        bg: ['#22c55e', '#16a34a'],
        icon: 'checkmark' as const,
        disabled: false,
      };
    }
    if (isInProgress) {
      return {
        bg: [zoneColor, zoneColor],
        icon: 'play' as const,
        disabled: false,
      };
    }
    return {
      bg: [zoneColor, zoneColor],
      icon: 'play' as const,
      disabled: false,
    };
  };

  const config = getIslandConfig();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, SPRING_CONFIG) }],
  }));

  const handlePressIn = useCallback(() => {
    if (!config.disabled) {
      scale.value = 0.96;
    }
  }, [config.disabled, scale]);

  const handlePressOut = useCallback(() => {
    scale.value = 1;
  }, [scale]);

  const renderIcon = () => {
    if (config.icon === 'checkmark') {
      return <Ionicons name="checkmark" size={40} color="#fff" />;
    }
    if (config.icon === 'play') {
      return <Ionicons name="play" size={34} color="#fff" />;
    }
    if (config.icon === 'lock-closed') {
      return <Ionicons name="lock-closed" size={32} color="#fff" />;
    }
    return <Text fontSize={32}>⭐</Text>;
  };

  return (
    <YStack
      alignItems="center"
      width={130}
      alignSelf={side === 'right' ? 'flex-end' : 'flex-start'}
    >
      <Pressable
        onPress={onPress}
        disabled={config.disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={config.bg as [string, string]}
            style={{
              width: ISLAND_SIZE,
              height: ISLAND_SIZE,
              borderRadius: ISLAND_SIZE / 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: 'rgba(255,255,255,0.6)',
            }}
          >
            {renderIcon()}
          </LinearGradient>
        </Animated.View>
      </Pressable>
      <Text
        fontSize={14}
        fontWeight="600"
        color="#334155"
        textAlign="center"
        maxWidth={120}
        lineHeight={18}
        marginTop={8}
        numberOfLines={2}
      >
        {module.title}
      </Text>
    </YStack>
  );
};

export default ModuleIsland;
export { ISLAND_SIZE };
