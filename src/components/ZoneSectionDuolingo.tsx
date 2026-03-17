import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { XStack, YStack, Text, Button, Card } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { Zone } from '@/types/module.types';
import { ModuleWithProgress } from '@/types/module.types';
import ModuleIsland from './ModuleIsland';

const { width } = Dimensions.get('window');
const NODE_SPACING = 130;
const PAD = 4;
const ISLAND_WRAP_WIDTH = 130;
const PATH_LEFT = PAD + ISLAND_WRAP_WIDTH / 2;
const PATH_RIGHT = width - PAD - ISLAND_WRAP_WIDTH / 2;
const NODE_TOP = 40;
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

interface ZoneSectionDuolingoProps {
  zone: Zone;
  modules: ModuleWithProgress[];
  expanded: boolean;
  onToggle: () => void;
  onModulePress: (moduleId: string) => void;
  userLevel: number;
}

/**
 * Section zone style Duolingo : header banner + chemin sinueux avec îlots
 * Tamagui + Reanimated : animation fluide au dépliage
 */
const ZoneSectionDuolingo: React.FC<ZoneSectionDuolingoProps> = ({
  zone,
  modules,
  expanded,
  onToggle,
  onModulePress,
  userLevel,
}) => {
  const isLocked = userLevel < zone.levelRequired;
  const expandProgress = useSharedValue(expanded ? 1 : 0);

  useEffect(() => {
    expandProgress.value = withSpring(expanded ? 1 : 0, SPRING_CONFIG);
  }, [expanded, expandProgress]);

  const buildPathD = () => {
    const n = modules.length;
    if (n < 2) return '';
    let d = '';
    for (let i = 0; i < n - 1; i++) {
      const x1 = i % 2 === 0 ? PATH_LEFT : PATH_RIGHT;
      const y1 = NODE_TOP + i * NODE_SPACING;
      const x2 = (i + 1) % 2 === 0 ? PATH_LEFT : PATH_RIGHT;
      const y2 = NODE_TOP + (i + 1) * NODE_SPACING;
      const cpx = (x1 + x2) / 2 + (i % 2 === 0 ? 70 : -70);
      const cpy = (y1 + y2) / 2;
      if (i === 0) d = `M ${x1} ${y1}`;
      d += ` Q ${cpx} ${cpy} ${x2} ${y2}`;
    }
    return d;
  };

  const pathHeight =
    modules.length > 0 ? NODE_TOP + (modules.length - 1) * NODE_SPACING + 100 : 0;

  const pathAnimatedStyle = useAnimatedStyle(() => ({
    opacity: expandProgress.value,
    maxHeight: interpolate(expandProgress.value, [0, 1], [0, pathHeight]),
    overflow: 'hidden' as const,
  }));

  return (
    <YStack marginBottom={24}>
      {/* Header style Duolingo - Card Tamagui */}
      <Button
        unstyled
        onPress={onToggle}
        pressStyle={{ opacity: 0.95 }}
      >
        {isLocked ? (
          <Card
            elevation={0}
            borderWidth={1}
            borderColor="#e2e8f0"
            backgroundColor="#f1f5f9"
            borderRadius={16}
            padding={16}
          >
            <XStack alignItems="center" justifyContent="space-between" flex={1}>
              <XStack alignItems="center" flex={1}>
                <YStack
                  width={48}
                  height={48}
                  borderRadius={12}
                  backgroundColor="#e2e8f0"
                  alignItems="center"
                  justifyContent="center"
                  marginRight={12}
                >
                  <Text fontSize={26}>{zone.icon}</Text>
                </YStack>
                <YStack flex={1}>
                  <Text fontSize={11} fontWeight="700" color="#94a3b8" letterSpacing={0.5}>
                    ZONE {zone.id}
                  </Text>
                  <Text fontSize={18} fontWeight="bold" color="#64748b">
                    {zone.name}
                  </Text>
                </YStack>
              </XStack>
              <Ionicons name="lock-closed" size={22} color="#94a3b8" />
            </XStack>
          </Card>
        ) : (
          <LinearGradient
            colors={[zone.color, zone.color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
              borderRadius: 16,
            }}
          >
            <XStack alignItems="center" flex={1}>
              <YStack
                width={48}
                height={48}
                borderRadius={12}
                backgroundColor="rgba(255,255,255,0.3)"
                alignItems="center"
                justifyContent="center"
                marginRight={12}
              >
                <Text fontSize={26}>{zone.icon}</Text>
              </YStack>
              <YStack flex={1}>
                <Text
                  fontSize={11}
                  fontWeight="800"
                  color="rgba(255,255,255,0.9)"
                  letterSpacing={0.5}
                >
                  ZONE {zone.id}
                </Text>
                <Text fontSize={18} fontWeight="bold" color="#ffffff">
                  {zone.name}
                </Text>
                <Text fontSize={12} color="rgba(255,255,255,0.85)" marginTop={4}>
                  {zone.description}
                </Text>
              </YStack>
            </XStack>
            <XStack
              alignItems="center"
              backgroundColor="rgba(255,255,255,0.25)"
              paddingHorizontal={12}
              paddingVertical={8}
              borderRadius={12}
              borderWidth={1}
              borderColor="rgba(255,255,255,0.4)"
              gap={6}
            >
              <Ionicons name="menu" size={18} color="#fff" />
              <Text color="#fff" fontSize={13} fontWeight="700">
                {expanded ? 'Réduire' : 'Voir'}
              </Text>
            </XStack>
          </LinearGradient>
        )}
      </Button>

      {/* Chemin avec îlots (animation Reanimated) */}
      {!isLocked && modules.length > 0 && (
        <Animated.View style={[pathAnimatedStyle, { marginTop: 12, paddingHorizontal: 4 }]}>
          <YStack position="relative" minHeight={pathHeight}>
            {/* Ligne sinueuse SVG */}
            <YStack
              position="absolute"
              left={0}
              top={0}
              width={width}
              height={pathHeight}
              pointerEvents="none"
            >
              <Svg width={width} height={pathHeight}>
                <Path
                  d={buildPathD()}
                  stroke="#94a3b8"
                  strokeWidth={5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </YStack>

            {/* Îlots */}
            <YStack paddingVertical={8}>
              {modules.map((module, index) => (
                <XStack
                  key={module.id}
                  flexDirection="row"
                  alignItems="flex-start"
                  minHeight={NODE_SPACING}
                  justifyContent={index % 2 === 1 ? 'flex-end' : 'flex-start'}
                >
                  <ModuleIsland
                    module={module}
                    onPress={() => onModulePress(module.id)}
                    side={index % 2 === 0 ? 'left' : 'right'}
                  />
                </XStack>
              ))}
            </YStack>
          </YStack>
        </Animated.View>
      )}

      {/* Message zone verrouillée */}
      {expanded && isLocked && (
        <Card
          elevation={0}
          borderWidth={1}
          borderColor="#e2e8f0"
          backgroundColor="#f8fafc"
          borderRadius={12}
          padding={20}
          marginTop={12}
        >
          <YStack alignItems="center">
            <Ionicons name="lock-closed" size={24} color="#94a3b8" />
            <Text
              fontSize={15}
              color="#64748b"
              fontWeight="600"
              marginTop={12}
              textAlign="center"
            >
              Atteins le niveau {zone.levelRequired} pour débloquer
            </Text>
            <Text fontSize={13} color="#94a3b8" marginTop={4}>
              Tu es niveau {userLevel}
            </Text>
          </YStack>
        </Card>
      )}
    </YStack>
  );
};

export default ZoneSectionDuolingo;
