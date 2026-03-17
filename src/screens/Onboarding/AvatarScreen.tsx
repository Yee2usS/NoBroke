import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@/store/useUserStore';
import { completeOnboarding, saveProfileData } from '@/services/onboardingService';
import { saveQuizResults } from '@/services/onboardingService';

const { width, height } = Dimensions.get('window');
const ONBOARDING_TIMEOUT_MS = 15000;

interface AvatarScreenProps {
  navigation: any;
  route: any;
}

const AvatarScreen: React.FC<AvatarScreenProps> = ({ navigation, route }) => {
  const { level, xp, profileData, quickWinsData } = route.params;
  const { user, setUser, setProgress } = useUserStore();

  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // Sur web, useNativeDriver: true n'est pas supporté → fallback JS
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver, tension: 70, friction: 8 }),
    ]).start();
  }, []);

  const handleComplete = async () => {
    if (!username.trim()) {
      Alert.alert('Oups !', 'Entre un pseudo pour continuer');
      return;
    }

    if (!user?.id) {
      Alert.alert('Erreur', 'Utilisateur non connecté');
      return;
    }

    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Délai dépassé',
        "La connexion prend trop de temps. Vérifie ta connexion internet et réessaye. Si le problème persiste, essaie sur l'app mobile."
      );
    }, ONBOARDING_TIMEOUT_MS);

    try {
      if (profileData?.age && profileData?.income && profileData?.objective) {
        await saveProfileData(user.id, profileData, quickWinsData ?? undefined);
      }
      await saveQuizResults(user.id, { score: 0, level, xp });
      await completeOnboarding(user.id, username.trim());

      clearTimeout(timeoutId);

      setUser({
        ...user,
        username: username.trim(),
        onboarding_completed: true,
      });

      setProgress({
        id: user.id,
        user_id: user.id,
        level,
        xp,
        xp_to_next_level: 500,
        streak: 0,
        last_visit: new Date().toISOString(),
        total_modules_completed: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      Alert.alert(
        'Bienvenue sur NoBroke !',
        `Tu commences niveau ${level} avec ${xp} XP !`,
        [{ text: 'Commencer' }]
      );
    } catch (error: any) {
      console.error('Erreur finalisation onboarding:', error);
      const msg = error?.message || String(error);
      Alert.alert(
        'Erreur',
        msg.includes('fetch') || msg.includes('network')
          ? "Problème de connexion. Vérifie ton internet et réessaye."
          : "Impossible de finaliser l'onboarding. Réessaye."
      );
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#1a1040', '#24243e']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbes */}
      <View style={[styles.orb, { width: 220, height: 220, top: -70, right: -70, backgroundColor: 'rgba(99,102,241,0.2)' }]} />
      <View style={[styles.orb, { width: 170, height: 170, bottom: height * 0.2, left: -50, backgroundColor: 'rgba(168,85,247,0.15)' }]} />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.avatarPlaceholder}>
            <LinearGradient
              colors={['#818cf8', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <Ionicons name="person" size={48} color="rgba(255,255,255,0.9)" />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Crée ton profil</Text>
          <Text style={styles.subtitle}>Choisis un pseudo pour commencer ton aventure</Text>
        </Animated.View>

        {/* Carte formulaire */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Pseudo */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Ton pseudo</Text>
            <View style={[styles.inputRow, inputFocused && styles.inputRowFocused]}>
              <Ionicons
                name="at"
                size={18}
                color={inputFocused ? '#818cf8' : 'rgba(255,255,255,0.4)'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Ex: MaxTheMoney"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
              />
            </View>
            <Text style={styles.charCount}>{username.length}/20 caractères</Text>
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Ionicons name="bulb-outline" size={18} color="#fbbf24" style={{ marginRight: 8 }} />
            <Text style={styles.infoText}>
              Tu pourras ajouter une photo de profil plus tard dans les paramètres
            </Text>
          </View>

          {/* Stats départ */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Ton profil de départ</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons name="star" size={22} color="#fbbf24" style={{ marginBottom: 6 }} />
                <Text style={styles.statLabel}>Niveau</Text>
                <Text style={styles.statValue}>{level}</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="diamond" size={22} color="#818cf8" style={{ marginBottom: 6 }} />
                <Text style={styles.statLabel}>XP</Text>
                <Text style={styles.statValue}>{xp}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Bouton */}
        <TouchableOpacity
          onPress={handleComplete}
          disabled={loading || !username.trim()}
          activeOpacity={0.85}
          style={styles.btnWrap}
        >
          <LinearGradient
            colors={loading || !username.trim() ? ['#374151', '#374151'] : ['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btn}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.btnText}>Commencer l'aventure</Text>
                <Ionicons name="rocket" size={18} color="#fff" style={{ marginLeft: 8 }} />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 999 },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },

  header: { alignItems: 'center', marginBottom: 24 },
  avatarPlaceholder: {
    marginBottom: 18,
    shadowColor: '#818cf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(129,140,248,0.4)',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },

  fieldWrap: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10,
  },
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
    backgroundColor: 'rgba(129,140,248,0.12)',
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    height: '100%',
    fontWeight: '600',
  },
  charCount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 6,
    textAlign: 'right',
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.2)',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#fcd34d',
    lineHeight: 19,
  },

  statsSection: {},
  statsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },

  btnWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 18,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});

export default AvatarScreen;
