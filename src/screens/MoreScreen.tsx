import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Modal,
  Linking,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { useSubscription } from '@/hooks/useSubscription';
import { useSettingsStore } from '@/store/useSettingsStore';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const FAQ_ITEMS = [
  {
    q: 'Comment fonctionne le système de niveaux ?',
    a: 'Tu gagnes de l\'XP en complétant des modules et des quiz. Chaque 100 XP = 1 niveau. Plus tu progresses, plus tu débloques de contenu.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Oui, toutes tes données sont chiffrées et hébergées chez Supabase (infrastructure sécurisée de niveau entreprise).',
  },
  {
    q: 'Comment fonctionne le streak quotidien ?',
    a: 'Complète au moins un module ou réponds au Choix du Jour chaque jour pour maintenir ta série. Elle repart à zéro si tu rates une journée.',
  },
  {
    q: 'Les modules Premium valent-ils le coup ?',
    a: 'Les modules Premium couvrent les sujets avancés : investissement, fiscalité, immobilier, liberté financière. Idéal si tu veux aller plus loin.',
  },
];

const PLAN_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  free:    { label: 'Gratuit',  color: '#64748b', bg: '#f1f5f9', icon: '🆓' },
  premium: { label: 'Premium',  color: '#f59e0b', bg: '#fef3c7', icon: '⭐' },
  pro:     { label: 'Pro',      color: '#8b5cf6', bg: '#ede9fe', icon: '💎' },
};

const MoreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { subscription, loading } = useSubscription();
  const {
    notificationsEnabled,
    darkMode,
    language,
    setNotifications,
    setDarkMode,
    setLanguage,
  } = useSettingsStore();

  const [faqVisible, setFaqVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const plan = PLAN_CONFIG[subscription] ?? PLAN_CONFIG.free;

  const handleNotificationsToggle = (value: boolean) => {
    setNotifications(value);
    if (value) {
      Alert.alert('Notifications activées ✅', 'Tu recevras des rappels pour garder ta série !');
    }
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    if (value) {
      Alert.alert('Mode sombre 🌙', 'Le mode sombre complet arrive dans la prochaine mise à jour !', [{ text: 'OK' }]);
    }
  };

  const handleLanguage = () => {
    Alert.alert(
      'Langue de l\'application',
      'Choisis ta langue préférée',
      [
        { text: '🇫🇷 Français', onPress: () => setLanguage('fr') },
        { text: '🇬🇧 English (bientôt)', onPress: () => Alert.alert('Bientôt disponible', 'La version anglaise arrive prochainement !') },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Plus</Text>
          <Text style={styles.headerSubtitle}>Paramètres et abonnement</Text>
        </LinearGradient>

        {/* Banner upgrade (si free) */}
        {!loading && subscription === 'free' && (
          <TouchableOpacity
            style={styles.upgradeBanner}
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#f59e0b', '#f97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.upgradeBannerGradient}
            >
              <Text style={styles.upgradeBannerIcon}>⭐</Text>
              <View style={styles.upgradeBannerTexts}>
                <Text style={styles.upgradeBannerTitle}>Passe à Premium !</Text>
                <Text style={styles.upgradeBannerSub}>Débloque tous les modules avancés</Text>
              </View>
              <View style={styles.upgradeBannerBadge}>
                <Text style={styles.upgradeBannerBadgeText}>Voir →</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Section : Espace Économies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Finances</Text>
          <TouchableOpacity
            style={styles.subscriptionCard}
            onPress={() => navigation.navigate('Savings')}
            activeOpacity={0.8}
          >
            <View style={[styles.subscriptionBadge, { backgroundColor: '#10b98120' }]}>
              <Text style={styles.subscriptionBadgeIcon}>💰</Text>
              <Text style={[styles.subscriptionBadgeLabel, { color: '#10b981' }]}>
                Économies
              </Text>
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTitle}>Espace Économies</Text>
              <Text style={styles.subscriptionSub}>
                Suis tes économies réelles (abonnements résiliés, etc.)
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Section : Fonctionnalités à venir */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Roadmap</Text>
          <TouchableOpacity
            style={styles.subscriptionCard}
            onPress={() => navigation.navigate('UpcomingFeatures')}
            activeOpacity={0.8}
          >
            <View style={[styles.subscriptionBadge, { backgroundColor: '#6366f120' }]}>
              <Text style={styles.subscriptionBadgeIcon}>🗳️</Text>
              <Text style={[styles.subscriptionBadgeLabel, { color: '#6366f1' }]}>
                Vote
              </Text>
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTitle}>Fonctionnalités à venir</Text>
              <Text style={styles.subscriptionSub}>
                Vote pour celles que tu veux en priorité
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Section : Communauté */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communauté</Text>
          <TouchableOpacity
            style={styles.subscriptionCard}
            onPress={() => navigation.navigate('Community')}
            activeOpacity={0.8}
          >
            <View style={[styles.subscriptionBadge, { backgroundColor: '#14b8a620' }]}>
              <Text style={styles.subscriptionBadgeIcon}>💬</Text>
              <Text style={[styles.subscriptionBadgeLabel, { color: '#0d9488' }]}>
                Premium
              </Text>
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTitle}>Espace communautaire</Text>
              <Text style={styles.subscriptionSub}>
                Topics & conversation générale · Réservé Premium & Pro
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Section : Classement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classement</Text>
          <TouchableOpacity
            style={styles.subscriptionCard}
            onPress={() => navigation.navigate('Leaderboard')}
            activeOpacity={0.8}
          >
            <View style={[styles.subscriptionBadge, { backgroundColor: '#10b98120' }]}>
              <Text style={styles.subscriptionBadgeIcon}>🏆</Text>
              <Text style={[styles.subscriptionBadgeLabel, { color: '#10b981' }]}>
                Cagnotte
              </Text>
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTitle}>Classement cagnotte</Text>
              <Text style={styles.subscriptionSub}>
                Vois où tu te situes parmi les autres
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Section : Abonnement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mon abonnement</Text>
          <TouchableOpacity
            style={styles.subscriptionCard}
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.8}
          >
            <View style={[styles.subscriptionBadge, { backgroundColor: plan.bg }]}>
              <Text style={styles.subscriptionBadgeIcon}>{plan.icon}</Text>
              <Text style={[styles.subscriptionBadgeLabel, { color: plan.color }]}>
                {plan.label}
              </Text>
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTitle}>Plan {plan.label}</Text>
              <Text style={styles.subscriptionSub}>
                {subscription === 'free'
                  ? 'Accès limité aux modules de base'
                  : subscription === 'premium'
                  ? 'Tous les modules débloqués'
                  : 'Accès complet + fonctionnalités Pro'}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Section : Préférences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.card}>
            {/* Notifications */}
            <View style={[styles.row, styles.rowBorder]}>
              <View style={[styles.iconWrap, { backgroundColor: '#f59e0b20' }]}>
                <Text style={styles.rowIcon}>🔔</Text>
              </View>
              <View style={styles.rowTexts}>
                <Text style={styles.rowTitle}>Notifications</Text>
                <Text style={styles.rowSub}>Rappels et alertes quotidiennes</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: '#e2e8f0', true: '#a5b4fc' }}
                thumbColor={notificationsEnabled ? '#6366f1' : '#94a3b8'}
                ios_backgroundColor="#e2e8f0"
              />
            </View>

            {/* Mode sombre */}
            <View style={[styles.row, styles.rowBorder]}>
              <View style={[styles.iconWrap, { backgroundColor: '#6366f120' }]}>
                <Text style={styles.rowIcon}>🌙</Text>
              </View>
              <View style={styles.rowTexts}>
                <Text style={styles.rowTitle}>Mode Sombre</Text>
                <Text style={styles.rowSub}>Bientôt disponible</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: '#e2e8f0', true: '#a5b4fc' }}
                thumbColor={darkMode ? '#6366f1' : '#94a3b8'}
                ios_backgroundColor="#e2e8f0"
              />
            </View>

            {/* Langue */}
            <TouchableOpacity
              style={styles.row}
              onPress={handleLanguage}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, { backgroundColor: '#10b98120' }]}>
                <Text style={styles.rowIcon}>🌍</Text>
              </View>
              <View style={styles.rowTexts}>
                <Text style={styles.rowTitle}>Langue</Text>
                <Text style={styles.rowSub}>{language === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section : Aide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aide</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.row, styles.rowBorder]}
              onPress={() => setFaqVisible(true)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, { backgroundColor: '#ef444420' }]}>
                <Text style={styles.rowIcon}>❓</Text>
              </View>
              <View style={styles.rowTexts}>
                <Text style={styles.rowTitle}>Aide & Support</Text>
                <Text style={styles.rowSub}>FAQ et nous contacter</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => setAboutVisible(true)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, { backgroundColor: '#64748b20' }]}>
                <Text style={styles.rowIcon}>ℹ️</Text>
              </View>
              <View style={styles.rowTexts}>
                <Text style={styles.rowTitle}>À propos</Text>
                <Text style={styles.rowSub}>Version 1.0.0 (MVP)</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>NoBroke · Éducation financière</Text>
          <Text style={styles.footerSub}>Made with 💙 in France</Text>
        </View>

      </ScrollView>

      {/* Modal FAQ */}
      <Modal visible={faqVisible} animationType="slide" transparent onRequestClose={() => setFaqVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>Aide & Support</Text>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.faqScroll}>
              {FAQ_ITEMS.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.faqItem}
                  onPress={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqHeader}>
                    <Text style={styles.faqQuestion}>{item.q}</Text>
                    <Text style={styles.faqChevron}>{openFaqIndex === i ? '▲' : '▼'}</Text>
                  </View>
                  {openFaqIndex === i && (
                    <Text style={styles.faqAnswer}>{item.a}</Text>
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.modalDivider} />

              <Text style={styles.contactTitle}>Nous contacter</Text>
              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => Linking.openURL('mailto:support@nobroke.app')}
              >
                <Text style={styles.contactIcon}>✉️</Text>
                <Text style={styles.contactText}>support@nobroke.app</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => Linking.openURL('https://nobroke.app')}
              >
                <Text style={styles.contactIcon}>🌐</Text>
                <Text style={styles.contactText}>nobroke.app</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setFaqVisible(false)}>
              <Text style={styles.modalCloseBtnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal À propos */}
      <Modal visible={aboutVisible} animationType="slide" transparent onRequestClose={() => setAboutVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />

            <Text style={styles.aboutIcon}>💰</Text>
            <Text style={styles.aboutName}>NoBroke</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0 · MVP</Text>

            <Text style={styles.aboutDescription}>
              NoBroke est une application d'éducation financière gamifiée. Apprends à gérer ton budget, épargner, investir et atteindre la liberté financière — un module à la fois.
            </Text>

            <View style={styles.modalDivider} />

            <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('https://nobroke.app')}>
              <Text style={styles.contactIcon}>🌐</Text>
              <Text style={styles.contactText}>nobroke.app</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:support@nobroke.app')}>
              <Text style={styles.contactIcon}>✉️</Text>
              <Text style={styles.contactText}>support@nobroke.app</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <Text style={styles.aboutLegal}>
              Fait avec ❤️ pour tous ceux qui veulent reprendre le contrôle de leur argent.
            </Text>

            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setAboutVisible(false)}>
              <Text style={styles.modalCloseBtnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 48,
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

  /* Upgrade banner */
  upgradeBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  upgradeBannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  upgradeBannerIcon: {
    fontSize: 28,
  },
  upgradeBannerTexts: {
    flex: 1,
  },
  upgradeBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  upgradeBannerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  upgradeBannerBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  upgradeBannerBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  /* Section */
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },

  /* Subscription card */
  subscriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  subscriptionBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 72,
  },
  subscriptionBadgeIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  subscriptionBadgeLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  subscriptionSub: {
    fontSize: 12,
    color: '#64748b',
  },

  /* Generic card rows */
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIcon: {
    fontSize: 18,
  },
  rowTexts: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 1,
  },
  rowSub: {
    fontSize: 12,
    color: '#94a3b8',
  },
  chevron: {
    fontSize: 20,
    color: '#cbd5e1',
  },

  /* Footer */
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 4,
  },
  footerSub: {
    fontSize: 12,
    color: '#cbd5e1',
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 16,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 16,
  },

  /* FAQ */
  faqScroll: {
    maxHeight: 420,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 14,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 20,
  },
  faqChevron: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },

  /* Contact */
  contactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  contactIcon: {
    fontSize: 18,
  },
  contactText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },

  /* About */
  aboutIcon: {
    fontSize: 52,
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
  },
  aboutLegal: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  /* Close button */
  modalCloseBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MoreScreen;
