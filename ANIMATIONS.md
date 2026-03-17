# Animation Standards — Expo React Native

## Stack obligatoire
- react-native-reanimated v3
- react-native-gesture-handler
- NativeWind pour le style

## Patterns de base

### Press feedback sur cards/boutons
```tsx
const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(scale.value) }]
}));
// onPressIn: scale.value = 0.96
// onPressOut: scale.value = 1
```

### Apparition d'éléments (FadeInDown)
```tsx
import { FadeInDown } from 'react-native-reanimated';
<Animated.View entering={FadeInDown.delay(index * 80).springify()}>
```

### Stagger liste de cards
Utiliser .delay(index * 80) sur chaque item

### Bottom sheet natif
```bash
npx expo install @gorhom/bottom-sheet
```

### Navigation transitions
Utiliser expo-router avec les animations natives iOS/Android

## Règles
- Jamais de setTimeout pour les animations
- Toujours useSharedValue + useAnimatedStyle
- Spring par défaut, jamais linear
- Durées max 350ms sur mobile
```

---

## 🏆 Références visuelles à donner à Cursor pour React Native

Ces repos GitHub sont en or — dis à Cursor `@` de les lire :

- **Expo Router examples** : patterns de navigation animée
- **William Candillon** (YouTube/GitHub) : animations React Native premium, ses snippets sont le gold standard
- **https://reactiive.io** : composants animés RN avec code source

---

## 💬 Prompt type à utiliser maintenant
```
Je travaille sur une app Expo React Native avec NativeWind.
Stack : react-native-reanimated v3 + react-native-gesture-handler.

Redesigne ce composant [colle ton code] en suivant ces règles :
- Press feedback avec useSharedValue + withSpring (scale 0.96)
- Apparition avec FadeInDown.springify() au mount
- Style via NativeWind uniquement (pas de StyleSheet)
- Inspiré de ce screenshot [image]

Ne pas utiliser : Framer Motion, shadcn, CSS, StyleSheet