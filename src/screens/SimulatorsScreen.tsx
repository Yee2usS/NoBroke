import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ─── Types ─────────────────────────────────────────────────────────────────

type SimulatorId = 'savings' | 'credit' | 'budget' | 'investment';

interface Simulator {
  id: SimulatorId;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  gradient: [string, string];
}

// ─── Config des simulateurs ─────────────────────────────────────────────────

const SIMULATORS: Simulator[] = [
  {
    id: 'savings',
    icon: '🏦',
    title: 'Épargne',
    subtitle: 'Intérêts composés',
    color: '#10b981',
    gradient: ['#10b981', '#059669'],
  },
  {
    id: 'credit',
    icon: '💳',
    title: 'Crédit',
    subtitle: 'Mensualité et coût total',
    color: '#ef4444',
    gradient: ['#ef4444', '#dc2626'],
  },
  {
    id: 'budget',
    icon: '📊',
    title: 'Budget 50/30/20',
    subtitle: 'Répartition de tes revenus',
    color: '#f59e0b',
    gradient: ['#f59e0b', '#d97706'],
  },
  {
    id: 'investment',
    icon: '📈',
    title: 'Investissement',
    subtitle: 'Croissance d\'un portefeuille',
    color: '#8b5cf6',
    gradient: ['#8b5cf6', '#7c3aed'],
  },
];

// ─── Fonctions de calcul ────────────────────────────────────────────────────

const formatEuro = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} M€`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} k€`;
  return `${n.toFixed(0)} €`;
};

const parseSafe = (v: string): number => {
  const n = parseFloat(v.replace(',', '.'));
  return isNaN(n) || n < 0 ? 0 : n;
};

const calcSavings = (capital: number, monthly: number, rate: number, years: number) => {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) {
    const total = capital + monthly * n;
    return { total, interests: 0, invested: total };
  }
  const futureCapital = capital * Math.pow(1 + r, n);
  const futureMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r);
  const total = futureCapital + futureMonthly;
  const invested = capital + monthly * n;
  return { total, interests: total - invested, invested };
};

const calcCredit = (amount: number, rate: number, months: number) => {
  if (amount <= 0 || months <= 0) return { monthly: 0, total: 0, interests: 0 };
  const r = rate / 100 / 12;
  if (r === 0) {
    const monthly = amount / months;
    return { monthly, total: amount, interests: 0 };
  }
  const monthly = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = monthly * months;
  return { monthly, total, interests: total - amount };
};

const calcBudget = (income: number) => ({
  needs: income * 0.5,
  wants: income * 0.3,
  savings: income * 0.2,
});

const calcInvestment = (initial: number, monthly: number, rate: number, years: number) => {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) {
    const total = initial + monthly * n;
    return { total, gain: 0, invested: total };
  }
  const futureInitial = initial * Math.pow(1 + r, n);
  const futureMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r);
  const total = futureInitial + futureMonthly;
  const invested = initial + monthly * n;
  return { total, gain: total - invested, invested };
};

// ─── Composants des simulateurs ─────────────────────────────────────────────

const InputField: React.FC<{
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  suffix?: string;
  placeholder?: string;
  fullWidth?: boolean;
}> = ({ label, value, onChangeText, suffix = '', placeholder = '0', fullWidth = false }) => (
  <View style={[inputStyles.container, fullWidth && inputStyles.containerFullWidth]}>
    <Text style={inputStyles.label}>{label}</Text>
    <View style={inputStyles.inputRow}>
      <TextInput
        style={inputStyles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
      />
      {suffix ? <Text style={inputStyles.suffix}>{suffix}</Text> : null}
    </View>
  </View>
);

const ResultRow: React.FC<{ label: string; value: string; highlight?: boolean; color?: string }> = ({
  label, value, highlight = false, color,
}) => (
  <View style={resultStyles.row}>
    <Text style={resultStyles.label}>{label}</Text>
    <Text style={[
      resultStyles.value,
      highlight && resultStyles.valueHighlight,
      color ? { color } : null,
    ]}>
      {value}
    </Text>
  </View>
);

const ProgressBar: React.FC<{ percent: number; color: string }> = ({ percent, color }) => (
  <View style={resultStyles.barBg}>
    <View style={[resultStyles.barFill, { width: `${Math.min(percent, 100)}%`, backgroundColor: color }]} />
  </View>
);

// ─── Simulateur Épargne ──────────────────────────────────────────────────────

const SavingsSimulator: React.FC = () => {
  const [capital, setCapital] = useState('1000');
  const [monthly, setMonthly] = useState('200');
  const [rate, setRate] = useState('3');
  const [years, setYears] = useState('10');

  const result = calcSavings(parseSafe(capital), parseSafe(monthly), parseSafe(rate), parseSafe(years));
  const interestPercent = result.total > 0 ? (result.interests / result.total) * 100 : 0;

  return (
    <View>
      <View style={styles.inputsStack}>
        <InputField label="Capital initial" value={capital} onChangeText={setCapital} suffix="€" fullWidth />
        <InputField label="Versement mensuel" value={monthly} onChangeText={setMonthly} suffix="€" fullWidth />
        <InputField label="Taux annuel" value={rate} onChangeText={setRate} suffix="%" fullWidth />
        <InputField label="Durée" value={years} onChangeText={setYears} suffix="ans" fullWidth />
      </View>
      <View style={styles.resultsCard}>
        <ResultRow label="Capital investi" value={formatEuro(result.invested)} />
        <ResultRow label="Intérêts gagnés" value={`+ ${formatEuro(result.interests)}`} color="#10b981" />
        <View style={styles.resultDivider} />
        <ResultRow label="Capital final" value={formatEuro(result.total)} highlight />
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Part des intérêts : {interestPercent.toFixed(0)}%</Text>
          <ProgressBar percent={interestPercent} color="#10b981" />
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Les intérêts composés font boule de neige : plus tu commences tôt, plus l'effet est puissant.
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Simulateur Crédit ───────────────────────────────────────────────────────

const CreditSimulator: React.FC = () => {
  const [amount, setAmount] = useState('15000');
  const [rate, setRate] = useState('4.5');
  const [months, setMonths] = useState('48');

  const result = calcCredit(parseSafe(amount), parseSafe(rate), parseSafe(months));
  const costPercent = result.total > 0 ? (result.interests / result.total) * 100 : 0;

  return (
    <View>
      <View style={styles.inputsStack}>
        <InputField label="Montant emprunté" value={amount} onChangeText={setAmount} suffix="€" fullWidth />
        <InputField label="Taux annuel" value={rate} onChangeText={setRate} suffix="%" fullWidth />
        <InputField label="Durée" value={months} onChangeText={setMonths} suffix="mois" fullWidth />
      </View>
      <View style={styles.resultsCard}>
        <ResultRow label="Mensualité" value={formatEuro(result.monthly)} highlight />
        <View style={styles.resultDivider} />
        <ResultRow label="Montant emprunté" value={formatEuro(parseSafe(amount))} />
        <ResultRow label="Intérêts totaux" value={`+ ${formatEuro(result.interests)}`} color="#ef4444" />
        <ResultRow label="Coût total du crédit" value={formatEuro(result.total)} />
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Coût des intérêts : {costPercent.toFixed(0)}%</Text>
          <ProgressBar percent={costPercent} color="#ef4444" />
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>⚠️</Text>
          <Text style={styles.tipText}>
            Rembourser en avance ou négocier un taux plus bas peut faire économiser plusieurs centaines d'euros.
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Simulateur Budget 50/30/20 ──────────────────────────────────────────────

const BudgetSimulator: React.FC = () => {
  const [income, setIncome] = useState('2500');

  const inc = parseSafe(income);
  const result = calcBudget(inc);

  const SLICES = [
    { label: '🏠 Besoins', subtitle: 'Loyer, courses, transport...', value: result.needs, color: '#3b82f6', percent: 50 },
    { label: '🎉 Envies', subtitle: 'Sorties, shopping, loisirs...', value: result.wants, color: '#f59e0b', percent: 30 },
    { label: '💰 Épargne', subtitle: 'Livret A, investissement...', value: result.savings, color: '#10b981', percent: 20 },
  ];

  return (
    <View>
      <View style={styles.inputsGrid}>
        <InputField label="Revenu mensuel net" value={income} onChangeText={setIncome} suffix="€" placeholder="2500" />
      </View>
      <View style={styles.resultsCard}>
        {SLICES.map((s) => (
          <View key={s.label} style={styles.budgetSlice}>
            <View style={styles.budgetSliceHeader}>
              <Text style={styles.budgetSliceLabel}>{s.label}</Text>
              <Text style={[styles.budgetSliceValue, { color: s.color }]}>{formatEuro(s.value)}</Text>
            </View>
            <Text style={styles.budgetSliceSub}>{s.subtitle}</Text>
            <ProgressBar percent={s.percent} color={s.color} />
            <Text style={styles.budgetSlicePercent}>{s.percent}% du revenu</Text>
          </View>
        ))}
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            La règle 50/30/20 est un point de départ. Adapte-la à ta situation : si ton loyer dépasse 50%, réduis les envies d'abord.
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Profils d'investissement ──────────────────────────────────────────────────

const INVESTMENT_PROFILES = [
  { id: 'prudent' as const, label: 'Prudent', rate: 4, icon: '🛡️', color: '#10b981', desc: 'Obligations, fonds euros' },
  { id: 'equilibre' as const, label: 'Équilibré', rate: 7, icon: '⚖️', color: '#6366f1', desc: 'Mix actions/obligations' },
  { id: 'dynamique' as const, label: 'Dynamique', rate: 10, icon: '🚀', color: '#f59e0b', desc: 'Actions, ETF World' },
] as const;

// ─── Simulateur Investissement ───────────────────────────────────────────────

const InvestmentSimulator: React.FC = () => {
  const [profileId, setProfileId] = useState<'prudent' | 'equilibre' | 'dynamique'>('equilibre');
  const [initial, setInitial] = useState('5000');
  const [monthly, setMonthly] = useState('100');
  const [years, setYears] = useState('20');

  const profile = INVESTMENT_PROFILES.find((p) => p.id === profileId) ?? INVESTMENT_PROFILES[1];
  const result = calcInvestment(parseSafe(initial), parseSafe(monthly), profile.rate, parseSafe(years));
  const gainPercent = result.total > 0 ? (result.gain / result.total) * 100 : 0;

  return (
    <View>
      {/* Profil d'investissement */}
      <Text style={styles.profileSectionLabel}>Profil d'investissement</Text>
      <View style={styles.profileSelector}>
        {INVESTMENT_PROFILES.map((p) => {
          const isSelected = profileId === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              style={[styles.profileCard, isSelected && { borderColor: p.color, borderWidth: 2, backgroundColor: `${p.color}12` }]}
              onPress={() => setProfileId(p.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.profileIcon}>{p.icon}</Text>
              <Text style={[styles.profileLabel, isSelected && { color: p.color, fontWeight: '700' }]}>{p.label}</Text>
              <Text style={[styles.profileRate, { color: p.color }]}>{p.rate}%/an</Text>
              <Text style={styles.profileDesc} numberOfLines={2}>{p.desc}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Montant, versement, durée */}
      <View style={styles.inputsStack}>
        <InputField label="Investissement initial" value={initial} onChangeText={setInitial} suffix="€" fullWidth />
        <InputField label="Versement mensuel" value={monthly} onChangeText={setMonthly} suffix="€" fullWidth />
        <InputField label="Durée" value={years} onChangeText={setYears} suffix="ans" fullWidth />
      </View>

      <View style={styles.resultsCard}>
        <View style={[styles.investmentProfileBadge, { borderLeftColor: profile.color, borderLeftWidth: 4 }]}>
          <Text style={[styles.investmentProfileBadgeText, { color: profile.color }]}>
            {profile.icon} Profil {profile.label} — {profile.rate}%/an
          </Text>
        </View>
        <ResultRow label="Capital investi" value={formatEuro(result.invested)} />
        <ResultRow label="Plus-value estimée" value={`+ ${formatEuro(result.gain)}`} color={profile.color} />
        <View style={styles.resultDivider} />
        <ResultRow label="Valeur finale du portefeuille" value={formatEuro(result.total)} highlight />
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Part de la plus-value : {gainPercent.toFixed(0)}%</Text>
          <ProgressBar percent={gainPercent} color={profile.color} />
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>📌</Text>
          <Text style={styles.tipText}>
            Les rendements passés ne garantissent pas les rendements futurs. Ce simulateur est indicatif.
          </Text>
        </View>
      </View>
    </View>
  );
};

const SIMULATOR_COMPONENTS: Record<SimulatorId, React.FC> = {
  savings: SavingsSimulator,
  credit: CreditSimulator,
  budget: BudgetSimulator,
  investment: InvestmentSimulator,
};

// ─── Écran principal ─────────────────────────────────────────────────────────

const SimulatorsScreen: React.FC = () => {
  const [activeId, setActiveId] = useState<SimulatorId | null>(null);

  const activeSim = activeId ? SIMULATORS.find((s) => s.id === activeId) : null;
  const ActiveComponent = activeId ? SIMULATOR_COMPONENTS[activeId] : null;

  const handleSelect = useCallback((id: SimulatorId) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Simulateurs</Text>
            <Text style={styles.headerSubtitle}>Calcule, anticipe, décide mieux</Text>
          </LinearGradient>

          <View style={styles.content}>
            {/* Grille de cartes */}
            <View style={styles.grid}>
              {SIMULATORS.map((sim) => {
                const isActive = activeId === sim.id;
                return (
                  <TouchableOpacity
                    key={sim.id}
                    style={[styles.simCard, isActive && styles.simCardActive]}
                    onPress={() => handleSelect(sim.id)}
                    activeOpacity={0.8}
                  >
                    {isActive ? (
                      <LinearGradient
                        colors={sim.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.simCardGradient}
                      >
                        <Text style={styles.simCardIconActive}>{sim.icon}</Text>
                        <Text style={styles.simCardTitleActive}>{sim.title}</Text>
                        <Text style={styles.simCardSubActive}>{sim.subtitle}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.simCardInner}>
                        <View style={[styles.simCardIconWrap, { backgroundColor: sim.color + '18' }]}>
                          <Text style={styles.simCardIcon}>{sim.icon}</Text>
                        </View>
                        <Text style={styles.simCardTitle}>{sim.title}</Text>
                        <Text style={styles.simCardSub}>{sim.subtitle}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Calculateur actif */}
            {activeSim && ActiveComponent && (
              <View style={styles.calculatorContainer}>
                <View style={styles.calculatorHeader}>
                  <Text style={styles.calculatorTitle}>
                    {activeSim.icon} {activeSim.title}
                  </Text>
                  <TouchableOpacity onPress={() => setActiveId(null)} style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <ActiveComponent />
              </View>
            )}

            {/* État vide */}
            {!activeId && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>☝️</Text>
                <Text style={styles.emptyText}>
                  Sélectionne un simulateur ci-dessus pour commencer à calculer
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFullWidth: {
    flex: undefined,
    minWidth: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    paddingVertical: 12,
    minHeight: 44,
  },
  suffix: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 4,
  },
});

const resultStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },
  valueHighlight: {
    fontSize: 18,
    color: '#6366f1',
  },
  barBg: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 64,
  },

  /* Header */
  header: {
    paddingTop: 64,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* Grille des cartes */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  simCard: {
    width: '47.5%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  simCardActive: {
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  simCardInner: {
    padding: 16,
  },
  simCardGradient: {
    padding: 16,
    minHeight: 100,
    justifyContent: 'center',
  },
  simCardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  simCardIcon: {
    fontSize: 22,
  },
  simCardIconActive: {
    fontSize: 28,
    marginBottom: 6,
  },
  simCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  simCardTitleActive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  simCardSub: {
    fontSize: 11,
    color: '#94a3b8',
  },
  simCardSubActive: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },

  /* Calculateur */
  calculatorContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  calculatorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '700',
  },

  /* Grille inputs (horizontal) */
  inputsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  /* Champs empilés verticalement (plus lisibles) */
  inputsStack: {
    flexDirection: 'column',
    gap: 14,
    marginBottom: 20,
  },

  /* Résultats */
  resultsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 16,
  },
  resultDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  barContainer: {
    marginTop: 12,
    gap: 6,
  },
  barLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },

  /* Budget slices */
  budgetSlice: {
    marginBottom: 16,
  },
  budgetSliceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  budgetSliceLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  budgetSliceValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  budgetSliceSub: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 6,
  },
  budgetSlicePercent: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },

  /* Profils investissement */
  profileSectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 10,
  },
  profileSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  profileCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  profileIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  profileLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
  },
  profileRate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileDesc: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 13,
  },
  investmentProfileBadge: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  investmentProfileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* Tip */
  tip: {
    flexDirection: 'row',
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    gap: 8,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#166534',
    lineHeight: 18,
  },

  /* État vide */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default SimulatorsScreen;
