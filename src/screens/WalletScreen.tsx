import React, { useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useWalletStore, WalletTransaction } from '@/store/useWalletStore';

const { width } = Dimensions.get('window');
const GRAPH_WIDTH = width - 48;
const GRAPH_HEIGHT = 120;

/**
 * Écran Cagnotte — historique et graphe d'évolution de l'argent virtuel
 */
const WalletScreen: React.FC = () => {
  const navigation = useNavigation();
  const { balance, transactions, initialBalance, resetWallet } = useWalletStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // Calculs globaux
  const totalSpent   = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const totalEarned  = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const evolution    = balance - initialBalance;
  const evolutionPct = initialBalance > 0 ? Math.round((evolution / initialBalance) * 100) : 0;

  // Points pour le graphe SVG-like (barres verticales)
  const graphPoints = useMemo(() => {
    if (transactions.length === 0) return [];
    // Prendre les 14 dernières transactions dans l'ordre chronologique
    const recent = [...transactions].reverse().slice(-14);
    const allBalances = [initialBalance, ...recent.map((t) => t.balanceAfter)];
    const maxVal = Math.max(...allBalances);
    const minVal = Math.min(...allBalances);
    const range  = maxVal - minVal || 1;

    return recent.map((t, i) => ({
      x: (i / Math.max(recent.length - 1, 1)) * GRAPH_WIDTH,
      y: GRAPH_HEIGHT - ((t.balanceAfter - minVal) / range) * GRAPH_HEIGHT,
      balance: t.balanceAfter,
      amount: t.amount,
    }));
  }, [transactions, initialBalance]);

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser la cagnotte ?',
      'Ton historique et ton solde seront remis à zéro (2 000 €). Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Réinitialiser', style: 'destructive', onPress: resetWallet },
      ]
    );
  };

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${amount.toLocaleString('fr-FR')} €`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  };

  const balanceColor = evolution >= 0 ? '#15803d' : '#dc2626';

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <LinearGradient colors={['#065f46', '#059669']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Ma Cagnotte</Text>
          <Text style={styles.headerSub}>Argent virtuel · Choix du Jour</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Leaderboard' as any)}
            style={styles.headerIconBtn}
          >
            <Ionicons name="trophy" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset} style={styles.headerIconBtn}>
            <Ionicons name="refresh" size={20} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* Solde principal */}
          <LinearGradient
            colors={evolution >= 0 ? ['#d1fae5', '#f0fdf4'] : ['#fee2e2', '#fef2f2']}
            style={styles.balanceCard}
          >
            <Text style={styles.balanceLabel}>Solde actuel</Text>
            <Text style={[styles.balanceAmount, { color: evolution >= 0 ? '#065f46' : '#991b1b' }]}>
              {balance.toLocaleString('fr-FR')} €
            </Text>
            <View style={styles.evolutionRow}>
              <Ionicons
                name={evolution >= 0 ? 'trending-up' : 'trending-down'}
                size={16}
                color={balanceColor}
              />
              <Text style={[styles.evolutionText, { color: balanceColor }]}>
                {' '}{formatAmount(evolution)} ({evolutionPct > 0 ? '+' : ''}{evolutionPct}%) depuis le début
              </Text>
            </View>
            <Text style={styles.balanceNote}>
              Solde de départ : {initialBalance.toLocaleString('fr-FR')} €
            </Text>
          </LinearGradient>

          {/* Stats rapides */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { borderColor: '#bbf7d0' }]}>
              <Text style={styles.statIcon}>💹</Text>
              <Text style={styles.statValue}>+{totalEarned.toLocaleString('fr-FR')} €</Text>
              <Text style={styles.statLabel}>Gains</Text>
            </View>
            <View style={[styles.statCard, { borderColor: '#fecaca' }]}>
              <Text style={styles.statIcon}>💸</Text>
              <Text style={[styles.statValue, { color: '#dc2626' }]}>
                {totalSpent.toLocaleString('fr-FR')} €
              </Text>
              <Text style={styles.statLabel}>Dépenses</Text>
            </View>
            <View style={[styles.statCard, { borderColor: '#e0e7ff' }]}>
              <Text style={styles.statIcon}>📋</Text>
              <Text style={styles.statValue}>{transactions.length}</Text>
              <Text style={styles.statLabel}>Choix</Text>
            </View>
          </View>

          {/* Graphe d'évolution */}
          {graphPoints.length > 1 && (
            <View style={styles.graphCard}>
              <Text style={styles.sectionTitle}>Évolution (14 derniers choix)</Text>
              <View style={styles.graphContainer}>
                {/* Ligne de référence départ */}
                <View style={styles.graphBars}>
                  {graphPoints.map((point, i) => {
                    const barHeight = Math.max(4, GRAPH_HEIGHT - point.y);
                    const isPositive = point.amount >= 0;
                    return (
                      <View key={i} style={styles.barWrapper}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: barHeight,
                              backgroundColor: isPositive ? '#34d399' : '#f87171',
                            },
                          ]}
                        />
                      </View>
                    );
                  })}
                </View>
                {/* Labels min/max */}
                <View style={styles.graphLabels}>
                  <Text style={styles.graphLabelText}>
                    {Math.max(...graphPoints.map((p) => p.balance)).toLocaleString('fr-FR')} €
                  </Text>
                  <Text style={styles.graphLabelText}>
                    {Math.min(...graphPoints.map((p) => p.balance)).toLocaleString('fr-FR')} €
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Conseil contextuel */}
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              {evolution >= 0
                ? 'Super gestion ! Tes bons choix financiers font croître ta cagnotte. Continue comme ça !'
                : 'Ta cagnotte diminue. Analyse tes derniers choix et essaie d\'adopter des réflexes plus économes.'}
            </Text>
          </View>

          {/* Historique des transactions */}
          <Text style={styles.sectionTitle}>Historique</Text>

          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏦</Text>
              <Text style={styles.emptyTitle}>Aucune transaction</Text>
              <Text style={styles.emptyText}>
                Fais ton premier Choix du Jour pour voir évoluer ta cagnotte !
              </Text>
            </View>
          ) : (
            transactions.map((t) => (
              <TransactionRow key={t.id} transaction={t} formatAmount={formatAmount} formatDate={formatDate} />
            ))
          )}

          <View style={{ height: 32 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Ligne de transaction
const TransactionRow: React.FC<{
  transaction: WalletTransaction;
  formatAmount: (n: number) => string;
  formatDate: (s: string) => string;
}> = ({ transaction, formatAmount, formatDate }) => {
  const isPositive = transaction.amount >= 0;
  const isNeutral  = transaction.amount === 0;

  return (
    <View style={styles.transactionRow}>
      <View style={[styles.transactionIcon, {
        backgroundColor: isNeutral ? '#f1f5f9' : isPositive ? '#dcfce7' : '#fee2e2',
      }]}>
        <Text style={styles.transactionEmoji}>
          {isNeutral ? '⚖️' : isPositive ? '📈' : '📉'}
        </Text>
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDesc} numberOfLines={2}>
          {transaction.description}
        </Text>
        <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: isNeutral ? '#64748b' : isPositive ? '#15803d' : '#dc2626' },
        ]}>
          {isNeutral ? '0 €' : formatAmount(transaction.amount)}
        </Text>
        <Text style={styles.transactionBalance}>
          {transaction.balanceAfter.toLocaleString('fr-FR')} €
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerActions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  headerIconBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 },

  content: { padding: 16 },

  balanceCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabel: { fontSize: 13, color: '#6b7280', fontWeight: '500', marginBottom: 4 },
  balanceAmount: { fontSize: 44, fontWeight: 'bold', marginBottom: 8 },
  evolutionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  evolutionText: { fontSize: 14, fontWeight: '600' },
  balanceNote: { fontSize: 12, color: '#9ca3af' },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
  statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 2 },

  graphCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  graphContainer: {
    marginTop: 12,
    height: GRAPH_HEIGHT + 20,
  },
  graphBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: GRAPH_HEIGHT,
    gap: 4,
  },
  barWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '80%', borderRadius: 4, minHeight: 4 },
  graphLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  graphLabelText: { fontSize: 11, color: '#94a3b8' },

  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fde68a',
    gap: 10,
    alignItems: 'flex-start',
  },
  tipIcon: { fontSize: 20, marginTop: 2 },
  tipText: { flex: 1, fontSize: 13, color: '#78350f', lineHeight: 20 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },

  emptyState: { alignItems: 'center', paddingVertical: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20 },

  transactionRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionEmoji: { fontSize: 20 },
  transactionInfo: { flex: 1 },
  transactionDesc: { fontSize: 13, color: '#374151', fontWeight: '500', lineHeight: 18 },
  transactionDate: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 15, fontWeight: 'bold' },
  transactionBalance: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
});

export default WalletScreen;
