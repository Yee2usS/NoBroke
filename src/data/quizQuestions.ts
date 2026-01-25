// Questions du quiz d'onboarding NoBroke
// 10 questions de difficulté progressive

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // FACILE (1-3)
  {
    id: 1,
    question: "C'est quoi un budget ?",
    options: [
      "Une liste de courses",
      "Un plan pour gérer ses revenus et dépenses",
      "Un compte bancaire",
      "Un prêt bancaire"
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Un budget est un plan qui permet de gérer ses revenus et ses dépenses pour atteindre ses objectifs financiers."
  },
  {
    id: 2,
    question: "Qu'est-ce que l'épargne ?",
    options: [
      "Dépenser tout son argent",
      "Mettre de l'argent de côté",
      "Emprunter de l'argent",
      "Investir en bourse"
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "L'épargne consiste à mettre de l'argent de côté pour se constituer une réserve financière."
  },
  {
    id: 3,
    question: "Qu'est-ce qu'un crédit ?",
    options: [
      "De l'argent qu'on donne",
      "De l'argent qu'on emprunte et qu'on doit rembourser",
      "Un compte d'épargne",
      "Un investissement"
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Un crédit est de l'argent emprunté qu'il faudra rembourser avec des intérêts."
  },

  // MOYEN (4-6)
  {
    id: 4,
    question: "Quelle est la règle des 50/30/20 ?",
    options: [
      "50% épargne, 30% loisirs, 20% besoins",
      "50% besoins, 30% envies, 20% épargne",
      "50% loisirs, 30% épargne, 20% besoins",
      "50% investissement, 30% besoins, 20% loisirs"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "La règle 50/30/20 conseille d'allouer 50% aux besoins essentiels, 30% aux envies et 20% à l'épargne."
  },
  {
    id: 5,
    question: "Quelle différence entre PEA et Compte-Titres Ordinaire (CTO) ?",
    options: [
      "Aucune différence",
      "Le PEA a des avantages fiscaux mais est limité aux actions européennes",
      "Le CTO est toujours plus rentable",
      "Le PEA ne peut contenir que des cryptos"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "Le PEA offre des avantages fiscaux mais est limité aux actions européennes, tandis que le CTO permet d'investir dans tous les actifs."
  },
  {
    id: 6,
    question: "Qu'est-ce qu'un taux d'intérêt composé ?",
    options: [
      "Un taux qui reste fixe",
      "Un taux qui change chaque mois",
      "Des intérêts calculés sur le capital + les intérêts déjà gagnés",
      "Un taux négatif"
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "Les intérêts composés sont calculés sur le capital initial plus les intérêts déjà accumulés, créant un effet boule de neige."
  },

  // DIFFICILE (7-10)
  {
    id: 7,
    question: "Quel est le plafond annuel de versement sur un Livret A ?",
    options: [
      "10 000€",
      "15 300€",
      "22 950€",
      "Aucun plafond"
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: "Le plafond du Livret A est de 22 950€ (hors intérêts capitalisés)."
  },
  {
    id: 8,
    question: "Qu'est-ce que le SRD en bourse ?",
    options: [
      "Service de Règlement Différé",
      "Système de Remboursement de Dettes",
      "Stock de Réserve Disponible",
      "Société de Revenu Diversifié"
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: "Le SRD (Service de Règlement Différé) permet d'acheter des actions en les payant à la fin du mois."
  },
  {
    id: 9,
    question: "L'IFI (Impôt sur la Fortune Immobilière) s'applique à partir de quel seuil ?",
    options: [
      "500 000€",
      "800 000€",
      "1 300 000€",
      "2 000 000€"
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: "L'IFI s'applique à partir d'un patrimoine immobilier net taxable de 1 300 000€."
  },
  {
    id: 10,
    question: "Quel est le taux de prélèvement forfaitaire unique (PFU ou flat tax) sur les revenus de capitaux mobiliers ?",
    options: [
      "12,8%",
      "17,2%",
      "30%",
      "45%"
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: "Le PFU est de 30% (12,8% d'impôt + 17,2% de prélèvements sociaux) sur les revenus de capitaux mobiliers."
  }
];

// Calcul du niveau en fonction du score
export const calculateLevel = (score: number): number => {
  if (score <= 3) return 1;
  if (score <= 6) return 10;
  if (score <= 8) return 20;
  return 30;
};

// Calcul des XP en fonction du score
export const calculateXP = (score: number): number => {
  return score * 50; // 50 XP par bonne réponse
};
