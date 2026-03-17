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

const { width, height } = Dimensions.get('window');

interface SignupScreenProps {
  navigation: any;
}

const FloatingOrb: React.FC<{
  size: number; top: number; left: number; delay: number; color: string;
}> = ({ size, top, left, delay, color }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -16] });

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2, top, left, backgroundColor: color, transform: [{ translateY }] },
      ]}
    />
  );
};

// Indicateur de force du mot de passe
const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const getStrength = () => {
    if (password.length === 0) return { level: 0, label: '', color: 'transparent' };
    if (password.length < 6)   return { level: 1, label: 'Trop court', color: '#ef4444' };
    if (password.length < 8)   return { level: 2, label: 'Faible', color: '#f97316' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password))
                                return { level: 4, label: 'Fort', color: '#22c55e' };
    return { level: 3, label: 'Moyen', color: '#eab308' };
  };

  const { level, label, color } = getStrength();
  if (level === 0) return null;

  return (
    <View style={styles.strengthRow}>
      {[1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={[
            styles.strengthBar,
            { backgroundColor: i <= level ? color : 'rgba(255,255,255,0.1)' },
          ]}
        />
      ))}
      <Text style={[styles.strengthLabel, { color }]}>{label}</Text>
    </View>
  );
};

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [username, setUsername]               = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading]                 = useState(false);
  const [showPass, setShowPass]               = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);

  const [focused, setFocused] = useState<string | null>(null);

  // Animations d'entrée
  const logoAnim    = useRef(new Animated.Value(0)).current;
  const formAnim    = useRef(new Animated.Value(50)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.spring(logoAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 7 }),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(formAnim, { toValue: 0, useNativeDriver: true, tension: 70, friction: 8 }),
      ]),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Oups !', 'Remplis tous les champs pour continuer');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Mot de passe trop court (min. 6 caractères)');
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { username: username.trim() } },
      });

      if (authError) throw authError;

      if (authData.user) {
        Alert.alert('Bienvenue ! 🎉', "Ton compte est créé. Passons à l'onboarding !");
      }
    } catch (error: any) {
      Alert.alert("Erreur d'inscription", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoScale   = logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  const logoOpacity = logoAnim;

  const inputRow = (isFocused: boolean) => [
    styles.inputRow,
    isFocused && styles.inputRowFocused,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Fond */}
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes */}
      <FloatingOrb size={200} top={-50}           left={width - 130}  delay={0}   color="rgba(168,85,247,0.22)" />
      <FloatingOrb size={140} top={height * 0.6}  left={-60}          delay={700} color="rgba(99,102,241,0.2)"  />
      <FloatingOrb size={90}  top={height * 0.35} left={width * 0.1}  delay={300} color="rgba(59,130,246,0.15)" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo animé */}
        <Animated.View style={[styles.logoBlock, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <View style={styles.logoRing}>
            <LinearGradient
              colors={['#a855f7', '#818cf8', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradientCircle}
            >
              <Ionicons name="rocket" size={32} color="#ffffff" />
            </LinearGradient>
          </View>
          <Text style={styles.appName}>Rejoins NoBroke</Text>
          <Text style={styles.tagline}>Commence ton voyage financier</Text>
        </Animated.View>

        {/* Formulaire */}
        <Animated.View style={[styles.card, { opacity: formOpacity, transform: [{ translateY: formAnim }] }]}>
          <Text style={styles.cardTitle}>Créer un compte</Text>
          <Text style={styles.cardSub}>C'est gratuit et rapide ✨</Text>

          {/* Pseudo */}
          <View style={styles.fieldWrapper}>
            <View style={inputRow(focused === 'username')}>
              <Ionicons name="person-outline" size={18} color={focused === 'username' ? '#a78bfa' : '#6b7280'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ton pseudo"
                placeholderTextColor="#9ca3af"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocused('username')}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldWrapper}>
            <View style={inputRow(focused === 'email')}>
              <Ionicons name="mail-outline" size={18} color={focused === 'email' ? '#a78bfa' : '#6b7280'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ton@email.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Mot de passe */}
          <View style={styles.fieldWrapper}>
            <View style={inputRow(focused === 'password')}>
              <Ionicons name="lock-closed-outline" size={18} color={focused === 'password' ? '#a78bfa' : '#6b7280'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Min. 6 caractères"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
              <TouchableOpacity onPress={() => setShowPass((v) => !v)} style={styles.eyeBtn}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <PasswordStrength password={password} />
          </View>

          {/* Confirmation */}
          <View style={styles.fieldWrapper}>
            <View style={inputRow(focused === 'confirm')}>
              <Ionicons
                name={confirmPassword && confirmPassword === password ? 'checkmark-circle-outline' : 'lock-closed-outline'}
                size={18}
                color={confirmPassword && confirmPassword === password ? '#22c55e' : focused === 'confirm' ? '#a78bfa' : '#6b7280'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirme ton mot de passe"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                onFocus={() => setFocused('confirm')}
                onBlur={() => setFocused(null)}
              />
              <TouchableOpacity onPress={() => setShowConfirm((v) => !v)} style={styles.eyeBtn}>
                <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bouton */}
          <TouchableOpacity onPress={handleSignup} disabled={loading} activeOpacity={0.85} style={styles.btnWrapper}>
            <LinearGradient
              colors={loading ? ['#4b5563', '#4b5563'] : ['#a855f7', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              {loading ? (
                <Text style={styles.btnText}>Création du compte…</Text>
              ) : (
                <>
                  <Text style={styles.btnText}>Créer mon compte</Text>
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

          {/* Lien connexion */}
          <TouchableOpacity style={styles.loginRow} onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
            <Text style={styles.loginText}>Déjà un compte ? </Text>
            <Text style={styles.loginLink}>Se connecter →</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.footerNote}>🔒 Connexion sécurisée · Données chiffrées</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { position: 'absolute', opacity: 0.8 },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 52,
  },

  logoBlock: { alignItems: 'center', marginBottom: 28 },
  logoRing: {
    padding: 4,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(167,139,250,0.4)',
    marginBottom: 16,
    shadowColor: '#a855f7',
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
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.8,
    marginBottom: 5,
  },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.3 },

  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#ffffff', marginBottom: 3 },
  cardSub: { fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 22 },

  fieldWrapper: { marginBottom: 14 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    height: 50,
  },
  inputRowFocused: {
    borderColor: '#a78bfa',
    backgroundColor: 'rgba(167,139,250,0.1)',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#ffffff', height: '100%' },
  eyeBtn: { padding: 4 },

  // Indicateur force
  strengthRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 5 },
  strengthBar: { flex: 1, height: 3, borderRadius: 2 },
  strengthLabel: { fontSize: 11, fontWeight: '600', marginLeft: 4, minWidth: 55 },

  btnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 6,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
  },
  btnText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },

  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 18, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  dividerText: { color: 'rgba(255,255,255,0.35)', fontSize: 13 },

  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 14, color: 'rgba(255,255,255,0.45)' },
  loginLink: { fontSize: 14, color: '#a78bfa', fontWeight: '700' },

  footerNote: { textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)' },
});

export default SignupScreen;
