// Constantes de l'application NoBroke

// XP et Niveaux
export const XP_PER_LEVEL = 100;
export const MAX_LEVEL = 50;
export const XP_MULTIPLIER_PER_LEVEL = 1.1; // Augmentation progressive de l'XP requis

// Calcul de l'XP nécessaire pour un niveau
export const getXPForLevel = (level: number): number => {
  if (level >= MAX_LEVEL) return 0;
  return Math.floor(XP_PER_LEVEL * Math.pow(XP_MULTIPLIER_PER_LEVEL, level - 1));
};

// Calcul du niveau basé sur l'XP total
export const getLevelFromXP = (totalXP: number): number => {
  let level = 1;
  let xpRequired = 0;
  
  while (level < MAX_LEVEL) {
    const nextLevelXP = getXPForLevel(level);
    if (xpRequired + nextLevelXP > totalXP) break;
    xpRequired += nextLevelXP;
    level++;
  }
  
  return level;
};

// Badges
export const BADGE_RARITIES = {
  common: {
    color: '#94a3b8',
    label: 'Commun',
  },
  rare: {
    color: '#3b82f6',
    label: 'Rare',
  },
  epic: {
    color: '#a855f7',
    label: 'Épique',
  },
  legendary: {
    color: '#eab308',
    label: 'Légendaire',
  },
} as const;

// Modules
export const MODULE_CATEGORIES = {
  basics: 'Bases',
  budget: 'Budget',
  savings: 'Épargne',
  investment: 'Investissement',
  debt: 'Dette',
  retirement: 'Retraite',
  taxes: 'Impôts',
  insurance: 'Assurance',
} as const;

export const DIFFICULTY_LEVELS = {
  beginner: {
    color: '#10b981',
    label: 'Débutant',
  },
  intermediate: {
    color: '#f59e0b',
    label: 'Intermédiaire',
  },
  advanced: {
    color: '#ef4444',
    label: 'Avancé',
  },
} as const;

// Streak
export const STREAK_XP_BONUS = 10; // XP bonus par jour de streak
export const MAX_STREAK_BONUS = 100; // XP bonus maximum

// Animation
export const ANIMATION_DURATION = 300;
export const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
};

// Couleurs
export const COLORS = {
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: {
    light: '#ffffff',
    dark: '#0f172a',
  },
  text: {
    light: '#1e293b',
    dark: '#f1f5f9',
  },
} as const;

// Messages
export const MESSAGES = {
  error: {
    network: 'Erreur de connexion. Vérifiez votre connexion internet.',
    generic: 'Une erreur est survenue. Veuillez réessayer.',
    auth: 'Erreur d\'authentification.',
  },
  success: {
    moduleComplete: 'Module terminé ! +{xp} XP',
    levelUp: 'Niveau supérieur ! Vous êtes maintenant niveau {level}',
    badgeEarned: 'Nouveau badge débloqué !',
    streakContinued: 'Série maintenue ! {days} jours',
  },
} as const;
