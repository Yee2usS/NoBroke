import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '@/store/useUserStore';
import { completeOnboarding, saveProfileData } from '@/services/onboardingService';
import { saveQuizResults } from '@/services/onboardingService';

interface AvatarScreenProps {
  navigation: any;
  route: any;
}

const AvatarScreen: React.FC<AvatarScreenProps> = ({ navigation, route }) => {
  const { level, xp, profileData } = route.params;
  const { user, setUser, setProgress } = useUserStore();
  
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);

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

    try {
      // 1. Sauvegarder les données de profil
      await saveProfileData(user.id, profileData);

      // 2. Sauvegarder les résultats du quiz (niveau + XP)
      await saveQuizResults(user.id, { score: 0, level, xp });

      // 3. Finaliser l'onboarding avec le pseudo
      await completeOnboarding(user.id, username.trim());

      // 4. Mettre à jour le store local
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
        xp_to_next_level: 100,
        streak: 0, // Corrigé: streak au lieu de streak_days
        last_visit: new Date().toISOString(), // Corrigé: last_visit au lieu de last_activity_date
        total_modules_completed: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      // 5. Rediriger vers l'app
      Alert.alert(
        'Bienvenue sur NoBroke ! 🎉',
        `Tu commences niveau ${level} avec ${xp} XP !`,
        [
          {
            text: 'Commencer',
            onPress: () => {
              // La navigation sera automatique via RootNavigator
              // car onboarding_completed est true
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Erreur finalisation onboarding:', error);
      Alert.alert('Erreur', 'Impossible de finaliser l\'onboarding. Réessaye.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#a855f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👤</Text>
          <Text style={styles.title}>Crée ton profil</Text>
          <Text style={styles.subtitle}>
            Choisis un pseudo pour commencer ton aventure
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Pseudo Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ton pseudo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: MaxTheMoney"
              placeholderTextColor="#9ca3af"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
            />
            <Text style={styles.hint}>
              {username.length}/20 caractères
            </Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoEmoji}>💡</Text>
            <Text style={styles.infoText}>
              Tu pourras ajouter une photo de profil plus tard dans les paramètres
            </Text>
          </View>

          {/* Stats Preview */}
          <View style={styles.statsPreview}>
            <Text style={styles.statsTitle}>Ton profil de départ</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>⭐</Text>
                <Text style={styles.statLabel}>Niveau</Text>
                <Text style={styles.statValue}>{level}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>💎</Text>
                <Text style={styles.statLabel}>XP</Text>
                <Text style={styles.statValue}>{xp}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, loading && styles.continueButtonDisabled]}
          onPress={handleComplete}
          disabled={loading || !username.trim()}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#6366f1" />
          ) : (
            <Text style={styles.continueButtonText}>
              Commencer l'aventure 🚀
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'right',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  infoEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
  statsPreview: {
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  continueButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
});

export default AvatarScreen;
