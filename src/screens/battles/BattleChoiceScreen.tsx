import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import {
  getBattleById,
  getScenarioForBattle,
  getRandomScenario,
  submitBattleChoiceResult,
} from '@/services/battleService';

type BattleChoiceRoute = { BattleChoice: { battleId: string } };

const BATTLE_WALLET_START = 2000;

const BattleChoiceScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<BattleChoiceRoute, 'BattleChoice'>>();
  const { battleId } = route.params;
  const { user } = useUserStore();

  const [battle, setBattle] = useState<any>(null);
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [wallet, setWallet] = useState(BATTLE_WALLET_START);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getBattleById(battleId);
      setBattle(res.battle);
      if (res.battle?.scenario_id) {
        setScenario(getScenarioForBattle(res.battle.scenario_id));
      } else {
        setScenario(getRandomScenario());
      }
      setLoading(false);
    })();
  }, [battleId]);

  const handleSelectChoice = (index: number) => {
    if (showResult) return;
    setSelectedIndex(index);
  };

  const handleConfirm = async () => {
    if (selectedIndex === null || !scenario || !user?.id) return;

    const choice = scenario.choices[selectedIndex];
    const newWallet = wallet + (choice.consequences?.money ?? 0);
    setWallet(newWallet);
    setResult({
      choice: choice.text,
      money: choice.consequences?.money ?? 0,
      explanation: choice.explanation,
    });
    setShowResult(true);
  };

  const handleFinish = async () => {
    if (!user?.id) return;
    setSubmitting(true);
    const res = await submitBattleChoiceResult(battleId, user.id, wallet);
    setSubmitting(false);
    if (res.success) {
      navigation.replace('BattleResult', { battleId });
    }
  };

  if (loading || !scenario) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Battle Cagnotte</Text>
        <View style={styles.walletBadge}>
          <Text style={styles.walletText}>{wallet} €</Text>
        </View>
      </View>

      {!showResult ? (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.situationCard}>
            <Text style={styles.situationTitle}>Situation</Text>
            <Text style={styles.situationText}>{scenario.situation}</Text>
          </View>

          <Text style={styles.choicesTitle}>Ton choix :</Text>
          {scenario.choices.map((c: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.choice, selectedIndex === index && styles.choiceSelected]}
              onPress={() => handleSelectChoice(index)}
            >
              <Text style={styles.choiceText}>{c.text}</Text>
            </TouchableOpacity>
          ))}

          {selectedIndex !== null && (
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Valider mon choix</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Résultat</Text>
            <Text style={styles.resultChoice}>{result?.choice}</Text>
            <Text style={[styles.resultMoney, { color: (result?.money ?? 0) >= 0 ? '#10b981' : '#ef4444' }]}>
              {(result?.money ?? 0) >= 0 ? '+' : ''}{result?.money} €
            </Text>
            <Text style={styles.resultWallet}>Cagnotte finale : {wallet} €</Text>
            <Text style={styles.resultExplanation}>{result?.explanation}</Text>
          </View>

          <TouchableOpacity
            style={styles.finishBtn}
            onPress={handleFinish}
            disabled={submitting}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.finishGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.finishText}>Voir le résultat du duel</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backBtn: { marginRight: 12 },
  backText: { fontSize: 24, color: '#6366f1' },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1e293b' },
  walletBadge: {
    backgroundColor: '#10b98120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  walletText: { fontSize: 14, fontWeight: '700', color: '#10b981' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 48 },
  situationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  situationTitle: { fontSize: 12, fontWeight: '700', color: '#94a3b8', marginBottom: 8 },
  situationText: { fontSize: 15, color: '#1e293b', lineHeight: 24 },
  choicesTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  choice: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  choiceSelected: { borderColor: '#6366f1', backgroundColor: '#6366f108' },
  choiceText: { fontSize: 15, color: '#1e293b' },
  confirmBtn: {
    marginTop: 24,
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  resultTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  resultChoice: { fontSize: 15, color: '#64748b', marginBottom: 8 },
  resultMoney: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  resultWallet: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 12 },
  resultExplanation: { fontSize: 14, color: '#64748b', lineHeight: 22 },
  finishBtn: { borderRadius: 14, overflow: 'hidden' },
  finishGradient: { paddingVertical: 16, alignItems: 'center' },
  finishText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default BattleChoiceScreen;
