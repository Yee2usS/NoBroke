/**
 * Fonctionnalités à venir - Premium et Pro
 * Les feature_id servent d'identifiants pour les votes
 */
export interface UpcomingFeature {
  id: string;
  title: string;
  description: string;
}

export interface FeatureTier {
  tier: 'premium' | 'pro';
  price: string;
  features: UpcomingFeature[];
}

export const UPCOMING_FEATURES: FeatureTier[] = [
  {
    tier: 'premium',
    price: '9,99 €/mois',
    features: [
      {
        id: 'premium-1',
        title: 'Historique et analytics de la cagnotte',
        description: 'Graphiques d\'évolution (mensuel, trimestriel), catégorisation des dépenses, comparaison mois précédent / objectifs, export PDF pour déclarations',
      },
      {
        id: 'premium-2',
        title: 'Simulateurs avancés',
        description: 'Simulateur retraite, impôts, immobilier. Scénarios multiples (optimiste / pessimiste / réaliste)',
      },
      {
        id: 'premium-3',
        title: 'Objectifs d\'épargne personnalisés',
        description: 'Définir des objectifs (vacances, voiture, apport), suivi de progression avec notifications, conseils adaptés',
      },
      {
        id: 'premium-4',
        title: 'Choix du Jour : mode « défi »',
        description: 'Choix plus difficiles avec bonus XP, thèmes avancés (investissement, fiscalité, immobilier), historique et statistiques',
      },
      {
        id: 'premium-5',
        title: 'Badges exclusifs et collection',
        description: 'Badges Premium, page collection avec rareté et progression, partage sur les réseaux sociaux',
      },
      {
        id: 'premium-6',
        title: 'Rappels et habitudes',
        description: 'Rappels personnalisés, suivi d\'habitudes (épargne mensuelle, dépenses), intégration avec le streak',
      },
      {
        id: 'premium-7',
        title: 'Mode hors ligne enrichi',
        description: 'Téléchargement de modules pour lecture offline, quiz hors ligne avec synchronisation au retour',
      },
    ],
  },
  {
    tier: 'pro',
    price: '19,99 €/mois',
    features: [
      {
        id: 'pro-1',
        title: 'Agent IA copilote (Claude)',
        description: 'Questions sur tes finances, analyse de ta cagnotte, explications personnalisées, plan d\'action mensuel',
      },
      {
        id: 'pro-2',
        title: 'Bilans trimestriels automatiques',
        description: 'Rapport PDF : évolution cagnotte, modules, badges. Comparaison avec la communauté (anonyme)',
      },
      {
        id: 'pro-3',
        title: 'Coaching IA personnalisé',
        description: 'Plan d\'apprentissage selon tes objectifs, priorisation des modules, suivi et rappels',
      },
      {
        id: 'pro-4',
        title: 'Communauté Pro',
        description: 'Salon Pro, sessions live (webinaires, Q&A), réseau entre membres Pro',
      },
      {
        id: 'pro-5',
        title: 'Comparaison anonyme',
        description: '« Tu es dans le top X % des épargnants », benchmarks par âge / profil',
      },
      {
        id: 'pro-6',
        title: 'Support prioritaire',
        description: 'Canal dédié (chat, email), réponse sous 24–48 h, aide à la configuration',
      },
      {
        id: 'pro-7',
        title: 'Accès anticipé',
        description: 'Nouveaux modules en avant-première, nouvelles features en beta, influence sur la roadmap',
      },
    ],
  },
];
