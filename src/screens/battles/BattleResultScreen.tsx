import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { getBattleById } from '@/services/battleService';

type BattleResultRoute = { BattleResult: { battleId: string } };

const BattleResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<BattleResultRoute, 'BattleResult'>>();
  const { battleId } = route.params;
  const { user } = useUserStore();

  const [battle, setBattle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBattleById(battleId).then((res) => {
      setBattle(res.battle || null);
      setLoading(false);
    });
  }, [battleId]);

  if (loading || !battle) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const isWinner = battle.winner_id === user?.id;
  const isDraw = !battle.winner_id;
  const challenger = battle.challenger;
  const opponent = battle.opponent;
  const challengerName = (challenger?.username || challenger) ?? 'Challenger';
  const opponentName = (opponent?.username || opponent) ?? 'Opponent';

  const renderScore = () => {
    if (battle.battle_type === 'quiz') {
      return (
        <View style={styles.scores}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreName}>{challengerName}</Text>
            <Text style={styles.scoreValue}>{battle.challenger_score ?? '—'}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreName}>{opponentName}</Text>
            <Text style={styles.scoreValue}>{battle.opponent_score ?? '—'}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.scores}>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreName}>{challengerName}</Text>
          <Text style={styles.scoreValue}>{battle.challenger_wallet_final ?? '—'} €</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreName}>{opponentName}</Text>
          <Text style={styles.scoreValue}>{battle.opponent_wallet_final ?? '—'} €</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isWinner ? ['#10b981', '#059669'] : isDraw ? ['#6366f1', '#8b5cf6'] : ['#64748b', '#475569']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{isWinner ? '🏆' : isDraw ? '🤝' : '😔'}</Text>
        </View>
        <Text style={styles.title}>
          {isWinner ? 'Tu as gagné !' : isDraw ? 'Égalité !' : 'Tu as perdu'}
        </Text>
        <Text style={styles.subtitle}>
          {battle.battle_type === 'quiz' ? 'Quiz' : 'Duel cagnotte'}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {renderScore()}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Battles')}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.backGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.backText}>Retour aux défis</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    paddingTop: 64,
    paddingBottom: 48,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: { fontSize: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)' },
  content: { flex: 1, padding: 24 },
  scores: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  scoreName: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  scoreValue: { fontSize: 16, fontWeight: '700', color: '#6366f1' },
  footer: { padding: 20 },
  backBtn: { borderRadius: 14, overflow: 'hidden' },
  backGradient: { paddingVertical: 16, alignItems: 'center' },
  backText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default BattleResultScreen;
