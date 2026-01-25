/**
 * Calculateur XP/Niveaux pour NoBroke
 * Gère la progression exponentielle sur 50 niveaux
 */

// Types XP
export interface XPAction {
  type: 'module' | 'daily_choice' | 'quiz' | 'streak_7' | 'invite_friend';
  xpGained: number;
}

export interface LevelInfo {
  currentLevel: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  xpToNextLevel: number;
  progressPercentage: number;
}

// Constantes XP
export const XP_REWARDS = {
  MODULE_COMPLETE: 50,
  DAILY_CHOICE: 30,
  QUIZ_SUCCESS: 20,
  STREAK_7_DAYS: 100,
  INVITE_FRIEND: 200,
} as const;

export const MAX_LEVEL = 50;
export const BASE_XP = 100;
export const XP_MULTIPLIER = 1.15;

/**
 * Calcule l'XP requis pour atteindre un niveau spécifique
 * Formule exponentielle : BASE_XP * (MULTIPLIER ^ (level - 1))
 */
export const getXPForLevel = (level: number): number => {
  if (level < 1 || level > MAX_LEVEL) {
    throw new Error(`Le niveau doit être entre 1 et ${MAX_LEVEL}`);
  }
  
  if (level === 1) return 0;
  
  // Calcul exponentiel arrondi
  return Math.round(BASE_XP * Math.pow(XP_MULTIPLIER, level - 2));
};

/**
 * Calcule l'XP total cumulé nécessaire pour atteindre un niveau
 */
export const getTotalXPForLevel = (level: number): number => {
  if (level === 1) return 0;
  
  let totalXP = 0;
  for (let i = 2; i <= level; i++) {
    totalXP += getXPForLevel(i);
  }
  return totalXP;
};

/**
 * Détermine le niveau actuel en fonction de l'XP total
 */
export const getLevelFromXP = (totalXP: number): number => {
  if (totalXP < 0) return 1;
  
  for (let level = MAX_LEVEL; level >= 1; level--) {
    if (totalXP >= getTotalXPForLevel(level)) {
      return level;
    }
  }
  return 1;
};

/**
 * Calcule les informations détaillées du niveau actuel
 */
export const calculateLevelInfo = (totalXP: number): LevelInfo => {
  const currentLevel = getLevelFromXP(totalXP);
  
  // XP déjà accumulé pour le niveau actuel
  const xpForCurrentLevel = getTotalXPForLevel(currentLevel);
  
  // XP total nécessaire pour atteindre le prochain niveau
  const xpForNextLevel = currentLevel === MAX_LEVEL 
    ? xpForCurrentLevel 
    : getTotalXPForLevel(currentLevel + 1);
  
  // XP dans le niveau actuel
  const currentXP = totalXP - xpForCurrentLevel;
  
  // XP nécessaire pour passer au niveau suivant
  const xpToNextLevel = xpForNextLevel - totalXP;
  
  // Progression en pourcentage
  const xpRequiredForLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = currentLevel === MAX_LEVEL 
    ? 100 
    : Math.round((currentXP / xpRequiredForLevel) * 100);
  
  return {
    currentLevel,
    currentXP,
    xpForCurrentLevel,
    xpForNextLevel,
    xpToNextLevel: Math.max(0, xpToNextLevel),
    progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
  };
};

/**
 * Calcule la nouvelle progression après avoir gagné des XP
 */
export const addXP = (currentTotalXP: number, xpToAdd: number): {
  newTotalXP: number;
  oldLevel: number;
  newLevel: number;
  leveledUp: boolean;
  levelsGained: number;
} => {
  const oldLevel = getLevelFromXP(currentTotalXP);
  const newTotalXP = currentTotalXP + xpToAdd;
  const newLevel = getLevelFromXP(newTotalXP);
  
  return {
    newTotalXP,
    oldLevel,
    newLevel,
    leveledUp: newLevel > oldLevel,
    levelsGained: newLevel - oldLevel,
  };
};

/**
 * Retourne l'XP gagné pour une action spécifique
 */
export const getXPReward = (actionType: XPAction['type']): number => {
  const rewards: Record<XPAction['type'], number> = {
    module: XP_REWARDS.MODULE_COMPLETE,
    daily_choice: XP_REWARDS.DAILY_CHOICE,
    quiz: XP_REWARDS.QUIZ_SUCCESS,
    streak_7: XP_REWARDS.STREAK_7_DAYS,
    invite_friend: XP_REWARDS.INVITE_FRIEND,
  };
  
  return rewards[actionType];
};

/**
 * Génère un tableau des seuils XP pour tous les niveaux
 * Utile pour afficher la roadmap des niveaux
 */
export const generateXPTable = (): Array<{ level: number; xpRequired: number; totalXP: number }> => {
  const table = [];
  
  for (let level = 1; level <= MAX_LEVEL; level++) {
    table.push({
      level,
      xpRequired: getXPForLevel(level),
      totalXP: getTotalXPForLevel(level),
    });
  }
  
  return table;
};
