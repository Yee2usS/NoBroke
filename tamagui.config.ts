import { getDefaultTamaguiConfig } from '@tamagui/config-default';
import { createFont, createTamagui } from 'tamagui';
import { Platform } from 'react-native';

const platform = Platform.OS === 'web' ? 'web' : 'native';
const defaultConfig = getDefaultTamaguiConfig(platform);

// Étendre les fonts avec des tailles $2 à $10 (config-default n'a que $1)
const headingFont = createFont({
  family: 'Heading',
  size: { 1: 15, 2: 13, 3: 14, 4: 16, 5: 18, 6: 20, 7: 24, 8: 28, 9: 32, 10: 40 },
  lineHeight: { 1: 15, 2: 18, 3: 20, 4: 22, 5: 24, 6: 26, 7: 30, 8: 34, 9: 38, 10: 46 },
  transform: {},
  weight: { 1: '400' },
  color: { 1: '$color' },
  letterSpacing: { 1: 0 },
});

const bodyFont = createFont({
  family: 'System',
  size: { 1: 15, 2: 13, 3: 14, 4: 16, 5: 18, 6: 20, 7: 24, 8: 28, 9: 32, 10: 40 },
  lineHeight: { 1: 15, 2: 18, 3: 20, 4: 22, 5: 24, 6: 26, 7: 30, 8: 34, 9: 38, 10: 46 },
  transform: {},
  weight: { 1: '400' },
  color: { 1: '$color' },
  letterSpacing: { 1: 0 },
});

export const config = createTamagui({
  ...defaultConfig,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
