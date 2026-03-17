import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { useWalletStore } from '@/store/useWalletStore';
import { getWalletLeaderboard, type LeaderboardEntry } from '@/services/leaderboardService';

const LeaderboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useUserStore();
  const { balance } = useWalletStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = async () => {
    const res = await getWalletLeaderboard(50);
    if (res.success && res.entries) {
      setEntries(res.entries);
    }
  };

  useEffect(() => {
    fetchLeaderboard().finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  };

  const currentUserRank = entries.findIndex((e) => e.id === user?.id) + 1;

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { backgroundColor: '#fbbf24', color: '#fff' };
    if (rank === 2) return { backgroundColor: '#94a3b8', color: '#fff' };
    if (rank === 3) return { backgroundColor: '#b45309', color: '#fff' };
    return { backgroundColor: '#e2e8f0', color: '#64748b' };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#4f46e5', '#6366f1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Classement</Text>
        <Text style={styles.headerSubtitle}>Cagnotte · Choix du Jour</Text>

        {/* Ma position */}
        <View style={styles.myRankCard}>
          <View style={styles.myRankLeft}>
            <View style={[styles.rankBadge, getRankStyle(currentUserRank || 999)]}>
              <Text style={[styles.rankBadgeText, { color: getRankStyle(currentUserRank || 999).color }]}>
                #{currentUserRank || '—'}
              </Text>
            </View>
            <Text style={styles.myRankName}>{user?.username || 'Toi'}</Text>
          </View>
          <Text style={styles.myRankBalance}>{balance.toLocaleString('fr-FR')} €</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
      >
        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color="#6366f1" />
          </View>
        ) : entries.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="trophy-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyText}>Aucun classement pour l'instant</Text>
            <Text style={styles.emptySub}>Fais des Choix du Jour pour apparaître !</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {entries.map((entry) => {
              const isCurrentUser = entry.id === user?.id;
              return (
                <View
                  key={entry.id}
                  style={[styles.row, isCurrentUser && styles.rowHighlight]}
                >
                  <View style={[styles.rankBadge, getRankStyle(entry.rank)]}>
                    <Text style={[styles.rankBadgeText, { color: getRankStyle(entry.rank).color }]}>
                      #{entry.rank}
                    </Text>
                  </View>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {(entry.username || '?')[0].toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={[styles.rowName, isCurrentUser && styles.rowNameHighlight]}
                    numberOfLines={1}
                  >
                    {entry.username}
                    {isCurrentUser && ' (toi)'}
                  </Text>
                  <Text style={styles.rowBalance}>
                    {entry.wallet_balance.toLocaleString('fr-FR')} €
                  </Text>
                </View>
              );
            })}
          </View>
        )}
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
  headerSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 16 },
  myRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    padding: 14,
  },
  myRankLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  myRankName: { fontSize: 16, fontWeight: '700', color: '#fff' },
  myRankBalance: { fontSize: 18, fontWeight: '800', color: '#fff' },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeText: { fontSize: 12, fontWeight: '800' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 48 },
  loadingWrap: { paddingVertical: 48, alignItems: 'center' },
  emptyWrap: { paddingVertical: 48, alignItems: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#64748b', marginTop: 12 },
  emptySub: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  list: { gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowHighlight: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  rowName: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1e293b', marginLeft: 12 },
  rowNameHighlight: { color: '#6366f1', fontWeight: '700' },
  rowBalance: { fontSize: 15, fontWeight: '700', color: '#10b981' },
});

export default LeaderboardScreen;
