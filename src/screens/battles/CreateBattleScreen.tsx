import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { useFriendsStore } from '@/store/useFriendsStore';
import { useBattlesStore } from '@/store/useBattlesStore';
import { getFreeModules } from '@/data/modulesData';
import { DAILY_SCENARIOS } from '@/data/dailyScenarios';

type CreateBattleRoute = { CreateBattle: { friendId?: string } };

const CreateBattleScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<CreateBattleRoute, 'CreateBattle'>>();
  const { user } = useUserStore();
  const { friends, fetchFriends, getFriendProfile } = useFriendsStore();
  const { createBattleAction } = useBattlesStore();

  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(route.params?.friendId || null);
  const [battleType, setBattleType] = useState<'quiz' | 'choice'>('quiz');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.id) fetchFriends(user.id);
  }, [user?.id]);

  useEffect(() => {
    if (route.params?.friendId) setSelectedFriendId(route.params.friendId);
  }, [route.params?.friendId]);

  const freeModules = getFreeModules().slice(0, 15);

  const handleCreate = async () => {
    if (!user?.id || !selectedFriendId) {
      Alert.alert('Erreur', 'Choisis un ami.');
      return;
    }
    if (battleType === 'quiz' && !selectedModuleId) {
      Alert.alert('Erreur', 'Choisis un module pour le quiz.');
      return;
    }

    setSubmitting(true);
    const scenarioId = battleType === 'choice' ? (selectedScenarioId || DAILY_SCENARIOS[0].id) : undefined;
    const res = await createBattleAction(
      user.id,
      selectedFriendId,
      battleType,
      battleType === 'quiz' ? selectedModuleId || undefined : undefined,
      scenarioId
    );
    setSubmitting(false);

    if (res.success) {
      Alert.alert('Défi envoyé !', 'Ton ami va recevoir ta demande.');
      navigation.goBack();
    } else {
      Alert.alert('Erreur', res.error || 'Impossible de créer le défi.');
    }
  };

  const friendProfile = selectedFriendId && user?.id ? getFriendProfile(user.id, selectedFriendId) : null;
  const friendName = friendProfile?.username || (selectedFriendId ? 'Ami' : 'Choisir un ami');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouveau défi</Text>
        <Text style={styles.headerSubtitle}>Défie un ami !</Text>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Friends')}
        >
          <Text style={styles.cardLabel}>Ami</Text>
          <View style={styles.cardValue}>
            <Text style={styles.cardText}>{friendName}</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de défi</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[styles.typeBtn, battleType === 'quiz' && styles.typeBtnActive]}
              onPress={() => setBattleType('quiz')}
            >
              <Text style={styles.typeIcon}>📝</Text>
              <Text style={[styles.typeText, battleType === 'quiz' && styles.typeTextActive]}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeBtn, battleType === 'choice' && styles.typeBtnActive]}
              onPress={() => setBattleType('choice')}
            >
              <Text style={styles.typeIcon}>💰</Text>
              <Text style={[styles.typeText, battleType === 'choice' && styles.typeTextActive]}>Cagnotte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {battleType === 'quiz' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Module</Text>
            <View style={styles.moduleGrid}>
              {freeModules.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.moduleChip, selectedModuleId === m.id && styles.moduleChipActive]}
                  onPress={() => setSelectedModuleId(m.id)}
                >
                  <Text style={styles.moduleIcon}>{m.icon}</Text>
                  <Text style={[styles.moduleTitle, selectedModuleId === m.id && styles.moduleTitleActive]} numberOfLines={2}>
                    {m.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {battleType === 'choice' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scénario (optionnel)</Text>
            <Text style={styles.sectionSub}>Par défaut : scénario aléatoire</Text>
            <View style={styles.scenarioList}>
              {DAILY_SCENARIOS.slice(0, 5).map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.scenarioChip, selectedScenarioId === s.id && styles.moduleChipActive]}
                  onPress={() => setSelectedScenarioId(selectedScenarioId === s.id ? null : s.id)}
                >
                  <Text style={styles.scenarioText} numberOfLines={1}>{s.situation.slice(0, 50)}...</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitBtn, (!selectedFriendId || (battleType === 'quiz' && !selectedModuleId)) && styles.submitBtnDisabled]}
          onPress={handleCreate}
          disabled={!selectedFriendId || (battleType === 'quiz' && !selectedModuleId) || submitting}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.submitGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Envoyer le défi</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: { position: 'absolute', top: 48, left: 20, zIndex: 1 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 48 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 6 },
  cardValue: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardText: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  sectionSub: { fontSize: 12, color: '#94a3b8', marginBottom: 12 },
  typeRow: { flexDirection: 'row', gap: 12 },
  typeBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  typeBtnActive: { borderColor: '#6366f1', backgroundColor: '#6366f110' },
  typeIcon: { fontSize: 28, marginBottom: 6 },
  typeText: { fontSize: 14, fontWeight: '700', color: '#64748b' },
  typeTextActive: { color: '#6366f1' },
  moduleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  moduleChip: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  moduleChipActive: { borderColor: '#6366f1', backgroundColor: '#6366f110' },
  moduleIcon: { fontSize: 24, marginBottom: 4 },
  moduleTitle: { fontSize: 12, fontWeight: '600', color: '#1e293b' },
  moduleTitleActive: { color: '#6366f1' },
  scenarioList: { gap: 8 },
  scenarioChip: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scenarioText: { fontSize: 13, color: '#64748b' },
  submitBtn: { marginTop: 16 },
  submitBtnDisabled: { opacity: 0.5 },
  submitGradient: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default CreateBattleScreen;
