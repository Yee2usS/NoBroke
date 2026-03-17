import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/services/supabase';
import { useUserStore } from '@/store/useUserStore';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: any;
}

// Bulles flottantes en arrière-plan (même principe que WelcomeScreen)
const FloatingOrb: React.FC<{
  size: number;
  top: number;
  left: number;
  delay: number;
  color: string;
}> = ({ size, top, left, delay, color }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 3500, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 3500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2, top, left, backgroundColor: color, transform: [{ translateY }] },
      ]}
    />
  );
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [emailFocused, setEmailFocused]     = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { setUser } = useUserStore();

  // Animations d'entrée
  const logoAnim   = useRef(new Animated.Value(0)).current;
  const formAnim   = useRef(new Animated.Value(40)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.spring(logoAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 7 }),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(formAnim, { toValue: 0, useNativeDriver: true, tension: 70, friction: 8 }),
      ]),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Oups !', 'Remplis tous les champs pour continuer');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) setUser(profile);
      }
    } catch (error: any) {
      Alert.alert('Connexion impossible', error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoScale = logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  const logoOpacity = logoAnim;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Fond dégradé sombre */}
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes flottantes */}
      <FloatingOrb size={220} top={-60}  left={-80}          delay={0}    color="rgba(99,102,241,0.25)" />
      <FloatingOrb size={160} top={height * 0.55} left={width - 100} delay={800}  color="rgba(168,85,247,0.2)" />
      <FloatingOrb size={100} top={height * 0.3}  left={width * 0.6}  delay={400}  color="rgba(59,130,246,0.15)" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo animé */}
        <Animated.View style={[styles.logoBlock, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          {/* Anneau lumineux autour du diamant */}
          <View style={styles.logoRing}>
            <LinearGradient
              colors={['#818cf8', '#a855f7', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradientCircle}
            >
              {/* Icône fintech : graphe de croissance */}
              <Ionicons name="trending-up" size={34} color="#ffffff" />
            </LinearGradient>
          </View>
          <Text style={styles.appName}>NoBroke</Text>
          <Text style={styles.tagline}>Apprends la finance, deviens libre</Text>
        </Animated.View>

        {/* Formulaire */}
        <Animated.View
          style={[
            styles.card,
            { opacity: formOpacity, transform: [{ translateY: formAnim }] },
          ]}
        >
          {/* Titre carte */}
          <Text style={styles.cardTitle}>Connexion</Text>
          <Text style={styles.cardSub}>Heureux de te revoir 👋</Text>

          {/* Email */}
          <View style={styles.fieldWrapper}>
            <View style={[styles.inputRow, emailFocused && styles.inputRowFocused]}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={emailFocused ? '#818cf8' : '#6b7280'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="ton@email.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>
          </View>

          {/* Mot de passe */}
          <View style={styles.fieldWrapper}>
            <View style={[styles.inputRow, passwordFocused && styles.inputRowFocused]}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={passwordFocused ? '#818cf8' : '#6b7280'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity onPress={() => setShowPass((v) => !v)} style={styles.eyeBtn}>
                <Ionicons
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bouton connexion */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
            style={styles.btnWrapper}
          >
            <LinearGradient
              colors={loading ? ['#4b5563', '#4b5563'] : ['#6366f1', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              {loading ? (
                <Text style={styles.btnText}>Connexion…</Text>
              ) : (
                <>
                  <Text style={styles.btnText}>Se connecter</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Séparateur */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Lien inscription */}
          <TouchableOpacity
            style={styles.signupRow}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.signupText}>Pas encore de compte ? </Text>
            <Text style={styles.signupLink}>Créer un compte →</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Mention bas de page */}
        <Text style={styles.footerNote}>
          🔒 Connexion sécurisée · Données chiffrées
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  orb: {
    position: 'absolute',
    opacity: 0.8,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 56,
  },

  // Logo
  logoBlock: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoRing: {
    padding: 4,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(129,140,248,0.4)',
    marginBottom: 18,
    shadowColor: '#818cf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
  },
  logoGradientCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.3,
  },

  // Carte
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    // Effet verre dépoli
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 28,
  },

  // Champs
  fieldWrapper: { marginBottom: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    height: 52,
  },
  inputRowFocused: {
    borderColor: '#818cf8',
    backgroundColor: 'rgba(129,140,248,0.1)',
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#ffffff',
    height: '100%',
  },
  eyeBtn: { padding: 4 },

  // Bouton
  btnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Séparateur
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
  },

  // Inscription
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: { fontSize: 14, color: 'rgba(255,255,255,0.45)' },
  signupLink: { fontSize: 14, color: '#818cf8', fontWeight: '700' },

  footerNote: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
    color: 'rgba(255,255,255,0.25)',
  },
});

export default LoginScreen;
