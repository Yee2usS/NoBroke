/**
 * Scénarios quotidiens pour le "Choix du Jour"
 * 7 scénarios en rotation pour le MVP
 */

export interface DailyScenario {
  id: string;
  date: string; // YYYY-MM-DD
  situation: string;
  choices: {
    text: string;
    consequences: {
      money: number; // argent virtuel
      xp: number;
      stats?: {
        discipline?: number;
        creativity?: number;
        prudence?: number;
      };
    };
    explanation: string;
  }[];
  lesson: {
    title: string;
    content: string;
    tips: string[];
  };
}

/**
 * 7 scénarios quotidiens en français
 */
export const DAILY_SCENARIOS: DailyScenario[] = [
  // Scénario 1 : Les Soldes
  {
    id: 'scenario-1-soldes',
    date: '',
    situation:
      "C'est les soldes ! Ton magasin préféré affiche -50% sur tout. Tu as économisé 300€ ce mois-ci pour ton projet de vacances. En passant devant, tu vois ce manteau que tu veux depuis 3 mois à 150€ au lieu de 300€.",
    choices: [
      {
        text: "J'achète le manteau, c'est une super affaire !",
        consequences: {
          money: -150,
          xp: 10,
          stats: { discipline: -5, creativity: 0, prudence: -5 },
        },
        explanation:
          "Même à -50%, c'est 150€ qui partent de ton épargne. Les soldes créent souvent un sentiment d'urgence artificiel. Si tu en avais vraiment besoin, tu l'aurais acheté avant.",
      },
      {
        text: "Je l'achète mais je compense en réduisant d'autres dépenses",
        consequences: {
          money: -150,
          xp: 25,
          stats: { discipline: 5, creativity: 5, prudence: 0 },
        },
        explanation:
          "Bon compromis ! Tu profites de la promo mais tu ajustes ton budget. C'est une approche équilibrée qui montre de la maturité financière.",
      },
      {
        text: 'Je réfléchis 24h avant de décider',
        consequences: {
          money: 0,
          xp: 30,
          stats: { discipline: 10, creativity: 0, prudence: 10 },
        },
        explanation:
          "Excellente stratégie ! La règle des 24h évite 80% des achats impulsifs. Si tu le veux toujours demain, c'est que c'était un vrai besoin.",
      },
      {
        text: "Je passe mon chemin, j'ai un objectif d'épargne",
        consequences: {
          money: 0,
          xp: 35,
          stats: { discipline: 15, creativity: 0, prudence: 10 },
        },
        explanation:
          'Bravo ! Tu résistes aux pièges marketing et tu restes focus sur ton objectif. Tes vacances de rêve seront ta vraie récompense.',
      },
    ],
    lesson: {
      title: 'Les Soldes : Opportunité ou Piège ?',
      content:
        "Les soldes sont un levier marketing puissant. Les enseignes créent un sentiment d'urgence pour nous pousser à l'achat impulsif. En réalité, un produit soldé n'est une bonne affaire QUE si tu en avais besoin avant les soldes.\n\nLa vraie question n'est pas 'Combien j'économise ?' mais 'Combien je dépense ?'. Une remise de 50% sur un achat non nécessaire, c'est 50% de trop.\n\nLes études montrent que 70% des achats en soldes sont des achats impulsifs non planifiés. C'est là que ton budget part en fumée.",
      tips: [
        'Règle des 24h : Attends toujours 24h avant un achat > 50€',
        'Liste pré-soldes : Note ce dont tu as besoin AVANT les soldes',
        "Budget soldes : Fixe une limite AVANT d'entrer dans le magasin",
      ],
    },
  },

  // Scénario 2 : Invitation Restaurant
  {
    id: 'scenario-2-restaurant',
    date: '',
    situation:
      "Tes amis t'invitent dans un restaurant chic pour fêter un anniversaire. Le menu moyen est à 45€/personne. Tu as prévu 200€ pour tes sorties du mois et tu as déjà dépensé 120€.",
    choices: [
      {
        text: "J'y vais, je verrai après pour le budget",
        consequences: {
          money: -45,
          xp: 10,
          stats: { discipline: -10, creativity: 0, prudence: -5 },
        },
        explanation:
          "Tu dépasses ton budget sorties. Même si c'est pour une bonne raison, cumuler les dépassements mène au découvert.",
      },
      {
        text: "Je propose une alternative moins chère",
        consequences: {
          money: -25,
          xp: 30,
          stats: { discipline: 10, creativity: 15, prudence: 10 },
        },
        explanation:
          "Super ! Tu gardes le lien social sans exploser ton budget. Un pique-nique, un brunch maison... être créatif, c'est aussi ça la finance !",
      },
      {
        text: "J'y vais mais je prends un menu moins cher",
        consequences: {
          money: -30,
          xp: 25,
          stats: { discipline: 5, creativity: 5, prudence: 5 },
        },
        explanation:
          "Compromis intelligent ! Tu es présent pour ton ami tout en maîtrisant ta dépense. Tu peux profiter sans culpabiliser.",
      },
      {
        text: 'Je décline poliment et explique ma situation',
        consequences: {
          money: 0,
          xp: 35,
          stats: { discipline: 15, creativity: 0, prudence: 15 },
        },
        explanation:
          "Courage financier ! Assumer ses limites budgétaires n'est pas un échec, c'est de la maturité. Tes vrais amis comprendront.",
      },
    ],
    lesson: {
      title: 'Budget Social : Profiter Sans Se Ruiner',
      content:
        "Les sorties entre amis sont importantes pour notre bien-être, mais elles ne doivent pas nous mettre en difficulté financière. La pression sociale est l'une des principales causes de dépassement budgétaire chez les 18-35 ans.\n\nUn budget 'sorties' bien géré, c'est 10-15% de tes revenus maximum. Au-delà, tu sacrifies ton épargne ou tes projets futurs.\n\nLa bonne nouvelle ? Il existe mille façons de passer du bon temps sans se ruiner : soirées jeux, randos, pique-niques, cinéma en matinée...",
      tips: [
        "Communique tes limites : Tes amis comprendront si tu es honnête",
        "Sois créatif : Propose des alternatives fun et économiques",
        "Planifie tes sorties : Réserve ton budget pour les événements importants",
      ],
    },
  },

  // Scénario 3 : Prime Annuelle
  {
    id: 'scenario-3-prime',
    date: '',
    situation:
      'Tu reçois ta prime annuelle de 1000€ ! Tu avais prévu de rembourser ton crédit conso (500€) et tu as envie de te faire plaisir avec le reste.',
    choices: [
      {
        text: 'Je dépense tout en loisirs, je le mérite !',
        consequences: {
          money: -1000,
          xp: 5,
          stats: { discipline: -15, creativity: 5, prudence: -15 },
        },
        explanation:
          "Aïe ! Tu passes à côté d'une opportunité en or. Ta prime aurait pu réduire ton crédit et donc tes intérêts futurs. Le plaisir immédiat coûte cher sur le long terme.",
      },
      {
        text: 'Je rembourse le crédit (500€) et épargne le reste (500€)',
        consequences: {
          money: 0,
          xp: 40,
          stats: { discipline: 20, creativity: 0, prudence: 20 },
        },
        explanation:
          "Champion ! Tu rembourses ta dette (= économies d'intérêts) ET tu renforces ton épargne. C'est la stratégie optimale pour ta santé financière.",
      },
      {
        text: 'Je garde tout en épargne de sécurité',
        consequences: {
          money: 1000,
          xp: 30,
          stats: { discipline: 10, creativity: 0, prudence: 15 },
        },
        explanation:
          "Bon réflexe de prudence, mais tu paies toujours les intérêts de ton crédit. Rembourser une dette, c'est aussi de l'épargne (tu économises les intérêts).",
      },
      {
        text: "50% crédit, 30% épargne, 20% plaisir",
        consequences: {
          money: 300,
          xp: 35,
          stats: { discipline: 15, creativity: 10, prudence: 10 },
        },
        explanation:
          "Équilibre parfait ! Tu gères tes priorités financières (dette + épargne) tout en t'accordant un plaisir mérité. C'est durable.",
      },
    ],
    lesson: {
      title: 'Rentrée d\'Argent : Le Piège de la "Fausse Richesse"',
      content:
        "Recevoir une grosse somme d'un coup (prime, héritage, remboursement d'impôts) crée une illusion de richesse. Notre cerveau nous pousse à dépenser car 'on a les moyens'.\n\nEn réalité, c'est LE moment stratégique pour améliorer ta situation financière : rembourser des dettes, créer/renforcer ton épargne de sécurité, ou investir.\n\nLa règle des 3 tiers est efficace : 1/3 dettes/épargne, 1/3 projets, 1/3 plaisir. Tu avances financièrement tout en te faisant plaisir.",
      tips: [
        "Rembourse d'abord tes dettes à taux élevés (crédit conso, cartes)",
        "Constitue 3-6 mois de dépenses en épargne de sécurité",
        "Autorise-toi 10-20% de plaisir sans culpabiliser",
      ],
    },
  },

  // Scénario 4 : Abonnement Streaming
  {
    id: 'scenario-4-streaming',
    date: '',
    situation:
      'Tu as déjà Netflix (13€/mois) et Spotify (10€/mois). Une nouvelle plateforme de séries sort avec du contenu exclusif à 9€/mois. Tes amis en parlent tous.',
    choices: [
      {
        text: "Je m'abonne, c'est seulement 9€",
        consequences: {
          money: -9,
          xp: 5,
          stats: { discipline: -10, creativity: 0, prudence: -10 },
        },
        explanation:
          '"Seulement 9€" qui s\'ajoutent à 23€... soit 32€/mois = 384€/an ! Les petits abonnements cumulés sont des vampires de budget silencieux.',
      },
      {
        text: "J'alterne : je résilie Netflix ce mois-ci",
        consequences: {
          money: 0,
          xp: 30,
          stats: { discipline: 15, creativity: 10, prudence: 10 },
        },
        explanation:
          "Intelligent ! Tu profites des nouveautés sans augmenter ton budget. L'alternance d'abonnements, c'est malin et économique.",
      },
      {
        text: "Je partage l'abonnement avec des amis",
        consequences: {
          money: -3,
          xp: 35,
          stats: { discipline: 10, creativity: 20, prudence: 15 },
        },
        explanation:
          "Créatif et économique ! Diviser les coûts entre amis/famille, c'est légal et ça réduit drastiquement la dépense. Win-win.",
      },
      {
        text: "Je n'en prends pas, j'ai déjà assez de contenu",
        consequences: {
          money: 0,
          xp: 40,
          stats: { discipline: 20, creativity: 0, prudence: 20 },
        },
        explanation:
          "Excellent discernement ! Le FOMO (Fear Of Missing Out) nous pousse à accumuler les abos. En réalité, tu as déjà plus de contenu que de temps pour le regarder.",
      },
    ],
    lesson: {
      title: "Abonnements : L'Argent qui Disparaît Sans Qu'on s'en Rende Compte",
      content:
        "Les abonnements sont la nouvelle norme de consommation. Problème : on les oublie. Le Français moyen a 12 abonnements actifs et en a oublié 3 qu'il paie toujours !\n\nUn abonnement de 10€/mois, c'est 120€/an. Quatre abonnements ? 480€ qui partent automatiquement. C'est l'équivalent d'un iPhone tous les 2 ans.\n\nLa règle d'or : audite tes abonnements tous les 3 mois. Demande-toi : 'Si je devais me réabonner aujourd'hui, est-ce que je le ferais ?'",
      tips: [
        'Audit trimestriel : Liste TOUS tes abonnements et évalue leur utilité',
        'Stratégie rotation : Alterne les plateformes selon les nouveautés',
        "Partage malin : Divise les coûts avec famille/amis (si c'est autorisé)",
      ],
    },
  },

  // Scénario 5 : Découvert Bancaire
  {
    id: 'scenario-5-decouvert',
    date: '',
    situation:
      'Il est le 25 du mois et tu es à découvert de -80€. Des frais de 20€ vont tomber demain. Tu as 100€ en liquide chez toi, économisés pour un concert dans 5 jours.',
    choices: [
      {
        text: 'Je laisse le découvert, je verrai après',
        consequences: {
          money: -20,
          xp: 0,
          stats: { discipline: -15, creativity: 0, prudence: -20 },
        },
        explanation:
          "Mauvais calcul ! Les frais de découvert sont extrêmement élevés (jusqu'à 8€/jour + agios). C'est de l'argent jeté par les fenêtres.",
      },
      {
        text: "Je dépose l'argent liquide pour éviter les frais",
        consequences: {
          money: 20,
          xp: 35,
          stats: { discipline: 15, creativity: 0, prudence: 20 },
        },
        explanation:
          "Excellent réflexe ! Économiser 20€ de frais, c'est comme gagner 20€. Tu pourras récupérer l'argent avant le concert.",
      },
      {
        text: "J'appelle ma banque pour négocier un délai",
        consequences: {
          money: 0,
          xp: 30,
          stats: { discipline: 10, creativity: 15, prudence: 15 },
        },
        explanation:
          "Bonne initiative ! Beaucoup ne savent pas que les banques peuvent faire des gestes commerciaux. Un appel peut éviter des frais inutiles.",
      },
      {
        text: "Je vends un objet inutile en ligne rapidement",
        consequences: {
          money: 50,
          xp: 40,
          stats: { discipline: 10, creativity: 20, prudence: 10 },
        },
        explanation:
          "Solution créative ! Tu transformes un actif dormant en liquidités ET tu évites les frais. C'est du win-win-win.",
      },
    ],
    lesson: {
      title: 'Découvert Bancaire : Le Crédit le Plus Cher du Marché',
      content:
        "Le découvert bancaire est un piège financier méconnu. Les taux peuvent atteindre 15-20% par an, PLUS les frais fixes de 8€ par opération en découvert, PLUS les commissions d'intervention...\n\nUn découvert de 100€ pendant 10 jours peut coûter 30-50€ ! C'est plus cher qu'un crédit conso. Les banques adorent les découverts : ils leur rapportent des milliards.\n\nLa solution ? Un matelas de sécurité, même petit (200-300€), et une vigilance constante sur ton solde. Les apps bancaires permettent des alertes en temps réel.",
      tips: [
        "Alerte SMS/App : Active les notifications dès que tu passes sous 100€",
        "Matelas 200€ : Garde toujours ce minimum, c'est ton pare-chocs",
        "Négociation : Appelle ta banque dès le premier découvert, ils peuvent aider",
      ],
    },
  },

  // Scénario 6 : Achat Impulsif
  {
    id: 'scenario-6-impulsif',
    date: '',
    situation:
      "En scrollant Instagram, tu vois une pub pour des écouteurs sans fil avec réduction flash -30% (89€ au lieu de 129€). L'offre expire dans 2h. Tu as des écouteurs qui fonctionnent encore.",
    choices: [
      {
        text: "J'achète immédiatement, c'est une promo !",
        consequences: {
          money: -89,
          xp: 5,
          stats: { discipline: -15, creativity: 0, prudence: -10 },
        },
        explanation:
          "Piège classique de l'urgence artificielle ! Tu dépenses 89€ pour remplacer quelque chose qui fonctionne. C'est la définition de l'achat impulsif.",
      },
      {
        text: 'Je ferme Instagram et je passe à autre chose',
        consequences: {
          money: 0,
          xp: 40,
          stats: { discipline: 20, creativity: 0, prudence: 20 },
        },
        explanation:
          "Bravo ! Tu reconnais la manipulation marketing et tu agis en conséquence. 80% des achats impulsifs sont déclenchés par les réseaux sociaux.",
      },
      {
        text: "Je sauvegarde le lien et j'attends 48h",
        consequences: {
          money: 0,
          xp: 35,
          stats: { discipline: 15, creativity: 10, prudence: 15 },
        },
        explanation:
          "Stratégie anti-impulsion efficace ! Si tu en as encore envie dans 48h, c'est peut-être un vrai besoin. Spoiler : dans 90% des cas, tu auras oublié.",
      },
      {
        text: "Je compare d'abord les prix sur d'autres sites",
        consequences: {
          money: 0,
          xp: 30,
          stats: { discipline: 10, creativity: 15, prudence: 20 },
        },
        explanation:
          "Bon réflexe ! Les 'promos flash' ne sont pas toujours les meilleurs prix. La comparaison révèle souvent que le produit est au même prix ailleurs sans pression temporelle.",
      },
    ],
    lesson: {
      title: 'Achat Impulsif : Comment les Marques Hackent Ton Cerveau',
      content:
        "Les techniques de marketing d'urgence (compte à rebours, stock limité, promo flash) exploitent nos biais cognitifs. Notre cerveau déteste perdre une opportunité (FOMO) plus qu'il n'aime gagner quelque chose.\n\nRésultat : on achète sans réfléchir. Les études montrent que 40% des achats en ligne sont impulsifs, représentant des milliards d'euros de dépenses non planifiées.\n\nLa parade ? La règle des 48h pour tout achat > 30€. Si l'envie persiste après 48h, c'est probablement un achat justifié. Sinon, tu viens d'économiser de l'argent.",
      tips: [
        "Règle 48h : Tout achat > 30€ doit attendre 48 heures",
        "Désactive les notifications shopping : Moins de tentations = moins de dépenses",
        "Liste de souhaits : Note tes envies au lieu d'acheter, puis révise mensuellement",
      ],
    },
  },

  // Scénario 7 : Investissement Opportunité
  {
    id: 'scenario-7-investissement',
    date: '',
    situation:
      "Un ami proche te propose d'investir 500€ dans son projet de startup. Il promet x3 en 6 mois. Ça a l'air sérieux mais tu n'as pas de détails précis. C'est 25% de ton épargne.",
    choices: [
      {
        text: "J'investis, je fais confiance à mon ami",
        consequences: {
          money: -500,
          xp: 5,
          stats: { discipline: -10, creativity: 5, prudence: -20 },
        },
        explanation:
          "Dangereux ! Investir sans business plan ni garantie, c'est du jeu, pas de l'investissement. 70% des startups échouent. Ton amitié peut aussi en souffrir.",
      },
      {
        text: "Je demande un business plan détaillé avant de décider",
        consequences: {
          money: 0,
          xp: 40,
          stats: { discipline: 15, creativity: 10, prudence: 25 },
        },
        explanation:
          "Approche professionnelle ! Un vrai entrepreneur comprendra. Si ça l'ennuie, c'est un red flag. Ne mélange JAMAIS amitié et argent sans cadre clair.",
      },
      {
        text: 'Je propose un prêt remboursable au lieu d\'un investissement',
        consequences: {
          money: 0,
          xp: 30,
          stats: { discipline: 10, creativity: 15, prudence: 20 },
        },
        explanation:
          "Compromis malin ! Tu aides ton ami sans prendre le risque total. Établis un contrat écrit avec échéances claires pour protéger votre relation.",
      },
      {
        text: 'Je refuse poliment, je ne mélange pas amitié et argent',
        consequences: {
          money: 0,
          xp: 35,
          stats: { discipline: 20, creativity: 0, prudence: 25 },
        },
        explanation:
          "Sagesse ! 'Ne prête/n'investis que ce que tu es prêt à perdre' est une règle d'or. Préserver l'amitié vaut plus que l'argent potentiel.",
      },
    ],
    lesson: {
      title: 'Investissement Risqué : Quand l\'Opportunité Cache un Piège',
      content:
        "Les 'opportunités en or' se présentent souvent sous pression ('c'est maintenant ou jamais !') et avec des promesses de rendements élevés. C'est le cocktail parfait du piège financier.\n\nLa règle de l'investissement sain : rendement proportionnel au risque. Si quelqu'un promet x3 en 6 mois sans risque, c'est mathématiquement impossible (ou illégal).\n\nN'investis JAMAIS plus de 10% de ton épargne dans un projet à haut risque. Et surtout, ne mélange jamais relations personnelles et investissement sans cadre juridique clair.",
      tips: [
        "Règle 10% : Maximum 10% de ton épargne dans des investissements risqués",
        "Due diligence : Toujours demander business plan, preuves, références",
        "Contrat écrit : TOUJOURS, même (surtout !) avec des amis/famille",
      ],
    },
  },
];

/**
 * Récupère un scénario basé sur la date du jour
 * Rotation sur 7 jours pour le MVP
 */
export const getScenarioForDate = (date: Date): DailyScenario => {
  const dayOfWeek = date.getDay(); // 0 = Dimanche, 6 = Samedi
  const scenarioIndex = dayOfWeek; // Utilise directement le jour de la semaine
  const scenario = { ...DAILY_SCENARIOS[scenarioIndex] };
  
  // Met à jour la date
  scenario.date = date.toISOString().split('T')[0]; // YYYY-MM-DD
  
  return scenario;
};

/**
 * Calcule le temps restant jusqu'à minuit
 */
export const getTimeUntilMidnight = (): { hours: number; minutes: number } => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { hours, minutes };
};
