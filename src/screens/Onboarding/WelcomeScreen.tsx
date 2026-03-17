import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  // Logo — entrée principale avec spring
  const logoScale   = useRef(new Animated.Value(0.4)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Tagline — glisse depuis le bas
  const taglineY       = useRef(new Animated.Value(24)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // Bouton — apparaît en dernier
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnY       = useRef(new Animated.Value(20)).current;

  // Icônes flottantes
  const b1 = useRef(new Animated.Value(0)).current;
  const b2 = useRef(new Animated.Value(0)).current;
  const b3 = useRef(new Animated.Value(0)).current;
  const b4 = useRef(new Animated.Value(0)).current;
  const b5 = useRef(new Animated.Value(0)).current;
  const b6 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Logo spring in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 40,
        friction: 6,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Tagline (légèrement décalé)
    Animated.parallel([
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        delay: 350,
        useNativeDriver: true,
      }),
      Animated.timing(taglineY, {
        toValue: 0,
        duration: 500,
        delay: 350,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Bouton CTA
    Animated.parallel([
      Animated.timing(btnOpacity, {
        toValue: 1,
        duration: 500,
        delay: 650,
        useNativeDriver: true,
      }),
      Animated.timing(btnY, {
        toValue: 0,
        duration: 500,
        delay: 650,
        useNativeDriver: true,
      }),
    ]).start();

    // Icônes flottantes — boucle infinie avec phases décalées
    const bounce = (anim: Animated.Value, duration: number, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: duration / 2, delay, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
        ])
      ).start();

    bounce(b1, 3200, 0);
    bounce(b2, 4000, 600);
    bounce(b3, 3600, 1200);
    bounce(b4, 4400, 300);
    bounce(b5, 3000, 900);
    bounce(b6, 4800, 1500);
  }, []);

  const floatY = (anim: Animated.Value, amplitude = 14) =>
    anim.interpolate({ inputRange: [0, 1], outputRange: [0, -amplitude] });

  const ICONS = [
    { anim: b1, emoji: '💰', style: { top: '10%',  left: '8%'  }, rotate: '-12deg', size: 28 },
    { anim: b2, emoji: '📈', style: { top: '15%',  right: '8%' }, rotate: '10deg',  size: 26 },
    { anim: b3, emoji: '💎', style: { top: '38%',  left: '5%'  }, rotate: '6deg',   size: 24 },
    { anim: b4, emoji: '🏦', style: { top: '42%',  right: '6%' }, rotate: '-8deg',  size: 26 },
    { anim: b5, emoji: '🪙', style: { bottom: '28%', left: '10%' }, rotate: '8deg', size: 22 },
    { anim: b6, emoji: '📊', style: { bottom: '22%', right: '9%' }, rotate: '-6deg', size: 24 },
  ];

  return (
    <View style={styles.container}>
      {/* Fond dégradé */}
      <LinearGradient
        colors={['#f0f4ff', '#e8eeff', '#f5f0ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes colorés en fond */}
      <View style={styles.orbeTopRight} />
      <View style={styles.orbeBottomLeft} />
      <View style={styles.orbeCenter} />

      {/* Icônes flottantes */}
      {ICONS.map((item, i) => (
        <Animated.View
          key={i}
          style={[
            styles.floatingIcon,
            item.style as any,
            {
              transform: [
                { rotate: item.rotate },
                { translateY: floatY(item.anim) },
              ],
            },
          ]}
        >
          <View style={styles.iconCard}>
            <Text style={{ fontSize: item.size }}>{item.emoji}</Text>
          </View>
        </Animated.View>
      ))}

      {/* Contenu central */}
      <View style={styles.content}>
        {/* Logo animé — centré, grand */}
        <Animated.View
          style={[
            styles.logoWrap,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoRow}>
            <Text style={[styles.logoChar, { color: '#6366f1' }]}>N</Text>
            <Text style={[styles.logoChar, { color: '#1e293b' }]}>oBroke</Text>
            <Text style={[styles.logoChar, { color: '#a855f7' }]}>.</Text>
          </View>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineY }],
            },
          ]}
        >
          Ta liberté financière{'\n'}commence ici.
        </Animated.Text>
      </View>

      {/* Bouton en bas */}
      <Animated.View
        style={[
          styles.bottomZone,
          { opacity: btnOpacity, transform: [{ translateY: btnY }] },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileQuestions')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Commencer mon voyage</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Seulement 2 minutes pour démarrer</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },

  /* Orbes de fond */
  orbeTopRight: {
    position: 'absolute',
    top: -width * 0.15,
    right: -width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: '#6366f1',
    opacity: 0.12,
  },
  orbeBottomLeft: {
    position: 'absolute',
    bottom: height * 0.1,
    left: -width * 0.2,
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.375,
    backgroundColor: '#a855f7',
    opacity: 0.1,
  },
  orbeCenter: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: '#6366f1',
    opacity: 0.06,
  },

  /* Icônes flottantes */
  floatingIcon: {
    position: 'absolute',
    zIndex: 5,
  },
  iconCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 14,
    borderRadius: 18,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.08)',
  },

  /* Contenu central */
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    paddingHorizontal: 32,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoChar: {
    fontSize: 58,
    fontWeight: '800',
    letterSpacing: -2,
  },
  tagline: {
    fontSize: 19,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },

  /* Zone bouton */
  bottomZone: {
    paddingHorizontal: 24,
    paddingBottom: 56,
    zIndex: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonArrow: {
    fontSize: 20,
    color: '#ffffff',
  },
  footer: {
    marginTop: 16,
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
