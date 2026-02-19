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
import Logo from '../../../assets/logo.svg';

const { width } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const bounce1 = useRef(new Animated.Value(0)).current;
  const bounce2 = useRef(new Animated.Value(0)).current;
  const bounce3 = useRef(new Animated.Value(0)).current;
  const bounce4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance: scale + fade in (professional welcome animation)
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating icons bounce with staggered durations (like the mockup)
    const createBounce = (anim: Animated.Value, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      );
    };

    createBounce(bounce1, 3000).start();
    createBounce(bounce2, 4000).start();
    createBounce(bounce3, 5000).start();
    createBounce(bounce4, 3500).start();
  }, []);

  const getBounceTranslate = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12],
    });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f8fafc', '#e2e8f0', '#f1f5f9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Background blur effects */}
      <View style={[styles.blurCircle, styles.blurTopRight]} />
      <View style={[styles.blurCircle, styles.blurBottomLeft]} />

      {/* Floating icon cards */}
      <Animated.View
        style={[
          styles.floatingIcon,
          styles.iconTopLeft,
          {
            transform: [
              { rotate: '-12deg' },
              { translateY: getBounceTranslate(bounce1) },
            ],
          },
        ]}
      >
        <View style={styles.iconCard}>
          <Text style={styles.iconEmoji}>💰</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.floatingIcon,
          styles.iconTopRight,
          {
            transform: [
              { rotate: '12deg' },
              { translateY: getBounceTranslate(bounce2) },
            ],
          },
        ]}
      >
        <View style={styles.iconCard}>
          <Text style={styles.iconEmoji}>📈</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.floatingIcon,
          styles.iconBottomLeft,
          {
            transform: [
              { rotate: '6deg' },
              { translateY: getBounceTranslate(bounce3) },
            ],
          },
        ]}
      >
        <View style={styles.iconCard}>
          <Text style={styles.iconEmoji}>💎</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.floatingIcon,
          styles.iconBottomRight,
          {
            transform: [
              { rotate: '-8deg' },
              { translateY: getBounceTranslate(bounce4) },
            ],
          },
        ]}
      >
        <View style={styles.iconCard}>
          <Text style={styles.iconEmoji}>🏦</Text>
        </View>
      </Animated.View>

      {/* Central content */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoPill,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Logo width={160} height={52} />
        </Animated.View>

        <Text style={styles.subtitle}>
          Apprends la finance,{'\n'}deviens libre financièrement
        </Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureText}>
              Des leçons adaptées à ton niveau
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎮</Text>
            <Text style={styles.featureText}>
              Apprends en t'amusant avec des quiz
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏆</Text>
            <Text style={styles.featureText}>
              Gagne des badges et monte de niveau
            </Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileQuestions')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Commencer mon voyage</Text>
          <Text style={styles.buttonEmoji}>🚀</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Seulement 2 minutes pour démarrer
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  blurCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.3,
  },
  blurTopRight: {
    top: -width * 0.1,
    right: -width * 0.1,
    width: width * 0.65,
    height: width * 0.65,
    backgroundColor: '#6366f1',
  },
  blurBottomLeft: {
    bottom: '20%',
    left: -width * 0.1,
    width: width * 0.72,
    height: width * 0.72,
    backgroundColor: '#a855f7',
  },
  floatingIcon: {
    position: 'absolute',
    zIndex: 10,
  },
  iconCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  iconEmoji: {
    fontSize: 24,
  },
  iconTopLeft: {
    top: '15%',
    left: '10%',
  },
  iconTopRight: {
    top: '20%',
    right: '10%',
  },
  iconBottomLeft: {
    bottom: '35%',
    left: '15%',
  },
  iconBottomRight: {
    bottom: '40%',
    right: '15%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  logoPill: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 26,
    marginTop: -16,
  },
  featuresContainer: {
    gap: 16,
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  buttonEmoji: {
    fontSize: 22,
  },
  footer: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 8,
  },
});

export default WelcomeScreen;
