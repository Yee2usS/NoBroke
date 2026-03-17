import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { useBattlesStore } from '@/store/useBattlesStore';
import type { Battle } from '@/types/battle.types';

const BattlesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useUserStore();
  const {
    battles,
    loading,
    fetchBattles,
    pendingCount,
    inProgressCount,
  } = useBattlesStore();

  useEffect(() => {
    if (user?.id) fetchBattles(user.id);
  }, [user?.id]);

  const pendingBattles = battles.filter((b) => b.opponent_id === user?.id && b.status === 'pending');
  const toPlayBattles = battles.filter(
    (b) =>
      (b.challenger_id === user?.id || b.opponent_id === user?.id) &&
      (b.status === 'accepted' || b.status === 'in_progress') &&
      ((b.challenger_id === user?.id && b.challenger_score == null) ||
        (b.opponent_id === user?.id && b.opponent_score == null) ||
        (b.battle_type === 'choice' &&
          ((b.challenger_id === user?.id && b.challenger_wallet_final == null) ||
            (b.opponent_id === user?.id && b.opponent_wallet_final == null))))
  );
  const completedBattles = battles.filter((b) => b.status === 'completed');

  const renderBattleCard = (battle: Battle, isPending?: boolean) => {
    const other = battle.challenger_id === user?.id ? battle.opponent : battle.challenger;
    const otherName = (other as any)?.username || 'Adversaire';
    const isChallenger = battle.challenger_id === user?.id;

    return (
      <TouchableOpacity
        key={battle.id}
        style={styles.battleCard}
        onPress={() => {
          if (isPending && !isChallenger) {
            navigation.navigate('BattleDetail', { battleId: battle.id });
          } else if (toPlayBattles.some((tb) => tb.id === battle.id)) {
            navigation.navigate(
              battle.battle_type === 'quiz' ? 'BattleQuiz' : 'BattleChoice',
              { battleId: battle.id }
            );
          } else if (battle.status === 'completed') {
            navigation.navigate('BattleResult', { battleId: battle.id });
          }
        }}
        activeOpacity={0.8}
      >
        <View style={styles.battleCardLeft}>
          <View style={[styles.battleIcon, { backgroundColor: battle.battle_type === 'quiz' ? '#6366f120' : '#10b98120' }]}>
            <Text style={styles.battleIconText}>{battle.battle_type === 'quiz' ? '📝' : '💰'}</Text>
          </View>
          <View>
            <Text style={styles.battleTitle}>
              {battle.battle_type === 'quiz' ? 'Quiz' : 'Choix'} vs {otherName}
            </Text>
            <Text style={styles.battleSub}>
              {battle.status === 'pending' && !isChallenger && 'À accepter'}
              {battle.status === 'pending' && isChallenger && 'En attente'}
              {(battle.status === 'accepted' || battle.status === 'in_progress') && 'À jouer'}
              {battle.status === 'completed' && 'Terminé'}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => user?.id && fetchBattles(user.id)}
            tintColor="#fff"
          />
        }
      >
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Défis</Text>
          <Text style={styles.headerSubtitle}>Battle tes amis !</Text>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation.navigate('CreateBattle')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#fff', '#f0f0ff']}
                style={styles.quickBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="add-circle" size={24} color="#6366f1" />
                <Text style={styles.quickBtnText}>Nouveau défi</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation.navigate('Friends')}
              activeOpacity={0.8}
            >
              <View style={styles.quickBtnPlain}>
                <Ionicons name="people" size={24} color="#6366f1" />
                <Text style={styles.quickBtnText}>Mes amis</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {pendingBattles.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>En attente de ta réponse</Text>
              {pendingBattles.map((b) => renderBattleCard(b, true))}
            </View>
          )}

          {toPlayBattles.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>À jouer</Text>
              {toPlayBattles.map((b) => renderBattleCard(b))}
            </View>
          )}

          {completedBattles.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Historique</Text>
              {completedBattles.slice(0, 10).map((b) => renderBattleCard(b))}
            </View>
          )}

          {battles.length === 0 && !loading && (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>⚔️</Text>
              <Text style={styles.emptyTitle}>Aucun défi</Text>
              <Text style={styles.emptySub}>
                Défie un ami pour un quiz ou un duel de cagnotte !
              </Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => navigation.navigate('CreateBattle')}
              >
                <Text style={styles.emptyBtnText}>Créer un défi</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { paddingBottom: 48 },
  header: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  quickBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  quickBtnPlain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14,
  },
  quickBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
  },
  content: { paddingHorizontal: 20, paddingTop: 24 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 4,
  },
  battleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  battleCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  battleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  battleIconText: { fontSize: 22 },
  battleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  battleSub: {
    fontSize: 12,
    color: '#94a3b8',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyBtn: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default BattlesScreen;
