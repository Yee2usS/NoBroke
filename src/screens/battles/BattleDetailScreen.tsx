import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { useBattlesStore } from '@/store/useBattlesStore';
import { getBattleById } from '@/services/battleService';

type BattleDetailRoute = { BattleDetail: { battleId: string } };

const BattleDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<BattleDetailRoute, 'BattleDetail'>>();
  const { battleId } = route.params;
  const { user } = useUserStore();
  const { acceptBattleAction, rejectBattleAction, fetchBattles } = useBattlesStore();

  const [battle, setBattle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(false);

  useEffect(() => {
    getBattleById(battleId).then((res) => {
      setBattle(res.battle || null);
      setLoading(false);
    });
  }, [battleId]);

  const handleAccept = async () => {
    if (!user?.id) return;
    setActioning(true);
    const ok = await acceptBattleAction(battleId, user.id);
    setActioning(false);
    if (ok) {
      fetchBattles(user.id);
      navigation.replace(battle.battle_type === 'quiz' ? 'BattleQuiz' : 'BattleChoice', { battleId });
    } else {
      Alert.alert('Erreur', 'Impossible d\'accepter le défi.');
    }
  };

  const handleReject = async () => {
    if (!user?.id) return;
    setActioning(true);
    await rejectBattleAction(battleId, user.id);
    setActioning(false);
    fetchBattles(user.id);
    navigation.goBack();
  };

  if (loading || !battle) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const challenger = battle.challenger;
  const challengerName = (challenger?.username || challenger) ?? 'Quelqu\'un';

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
        <Text style={styles.title}>{challengerName} te défie !</Text>
        <Text style={styles.subtitle}>
          {battle.battle_type === 'quiz' ? 'Quiz financier' : 'Duel de cagnotte'}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{battle.battle_type === 'quiz' ? '📝' : '💰'}</Text>
        </View>
        <Text style={styles.desc}>
          {battle.battle_type === 'quiz'
            ? 'Réponds aux questions du quiz. Le meilleur score gagne !'
            : 'Fais ton choix. Celui qui garde la plus grosse cagnotte gagne !'}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={handleAccept}
            disabled={actioning}
          >
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {actioning ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Accepter</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={handleReject}
            disabled={actioning}
          >
            <Text style={styles.rejectText}>Refuser</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: { position: 'absolute', top: 48, left: 20, zIndex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)' },
  content: { padding: 24, alignItems: 'center' },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: { fontSize: 40 },
  desc: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  actions: { width: '100%', gap: 12 },
  acceptBtn: { borderRadius: 14, overflow: 'hidden' },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  rejectBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  rejectText: { color: '#ef4444', fontWeight: '600', fontSize: 15 },
});

export default BattleDetailScreen;
