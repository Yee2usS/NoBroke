import {
  getXPForLevel,
  getTotalXPForLevel,
  getLevelFromXP,
  calculateLevelInfo,
  addXP,
  getXPReward,
  XP_REWARDS,
  MAX_LEVEL,
  BASE_XP,
} from '../xpCalculator';

describe('XP Calculator', () => {
  describe('getXPForLevel', () => {
    it('devrait retourner 0 XP pour le niveau 1', () => {
      expect(getXPForLevel(1)).toBe(0);
    });

    it('devrait retourner BASE_XP pour le niveau 2', () => {
      expect(getXPForLevel(2)).toBe(BASE_XP);
    });

    it('devrait calculer correctement l\'XP pour le niveau 10', () => {
      const xp = getXPForLevel(10);
      expect(xp).toBeGreaterThan(BASE_XP);
      expect(xp).toBeLessThan(1000);
    });

    it('devrait calculer correctement l\'XP pour le niveau 50', () => {
      const xp = getXPForLevel(50);
      expect(xp).toBeGreaterThan(4000);
      expect(xp).toBeLessThan(6000);
    });

    it('devrait lancer une erreur pour un niveau invalide', () => {
      expect(() => getXPForLevel(0)).toThrow();
      expect(() => getXPForLevel(51)).toThrow();
      expect(() => getXPForLevel(-1)).toThrow();
    });
  });

  describe('getTotalXPForLevel', () => {
    it('devrait retourner 0 pour le niveau 1', () => {
      expect(getTotalXPForLevel(1)).toBe(0);
    });

    it('devrait retourner BASE_XP pour le niveau 2', () => {
      expect(getTotalXPForLevel(2)).toBe(BASE_XP);
    });

    it('devrait calculer correctement l\'XP cumulé', () => {
      const level5XP = getTotalXPForLevel(5);
      const level4XP = getTotalXPForLevel(4);
      const level5Required = getXPForLevel(5);

      expect(level5XP).toBe(level4XP + level5Required);
    });
  });

  describe('getLevelFromXP', () => {
    it('devrait retourner niveau 1 pour 0 XP', () => {
      expect(getLevelFromXP(0)).toBe(1);
    });

    it('devrait retourner niveau 1 pour des XP < BASE_XP', () => {
      expect(getLevelFromXP(50)).toBe(1);
      expect(getLevelFromXP(99)).toBe(1);
    });

    it('devrait retourner niveau 2 pour BASE_XP', () => {
      expect(getLevelFromXP(BASE_XP)).toBe(2);
    });

    it('devrait retourner le bon niveau pour des XP quelconques', () => {
      const level10XP = getTotalXPForLevel(10);
      expect(getLevelFromXP(level10XP)).toBe(10);
      expect(getLevelFromXP(level10XP + 1)).toBe(10);
    });

    it('devrait gérer les XP négatifs', () => {
      expect(getLevelFromXP(-100)).toBe(1);
    });
  });

  describe('calculateLevelInfo', () => {
    it('devrait calculer correctement les infos pour niveau 1', () => {
      const info = calculateLevelInfo(0);

      expect(info.currentLevel).toBe(1);
      expect(info.currentXP).toBe(0);
      expect(info.xpForCurrentLevel).toBe(0);
      expect(info.xpForNextLevel).toBe(BASE_XP);
      expect(info.xpToNextLevel).toBe(BASE_XP);
      expect(info.progressPercentage).toBe(0);
    });

    it('devrait calculer correctement les infos pour niveau 2', () => {
      const info = calculateLevelInfo(BASE_XP);

      expect(info.currentLevel).toBe(2);
      expect(info.currentXP).toBe(0);
      expect(info.progressPercentage).toBe(0);
    });

    it('devrait calculer correctement le pourcentage de progression', () => {
      const level2XP = getTotalXPForLevel(2);
      const level3XP = getTotalXPForLevel(3);
      const midXP = level2XP + (level3XP - level2XP) / 2;

      const info = calculateLevelInfo(midXP);

      expect(info.currentLevel).toBe(2);
      expect(info.progressPercentage).toBeGreaterThanOrEqual(45);
      expect(info.progressPercentage).toBeLessThanOrEqual(55);
    });

    it('devrait gérer le niveau maximum', () => {
      const maxLevelXP = getTotalXPForLevel(MAX_LEVEL) + 1000;
      const info = calculateLevelInfo(maxLevelXP);

      expect(info.currentLevel).toBe(MAX_LEVEL);
      expect(info.progressPercentage).toBe(100);
      expect(info.xpToNextLevel).toBe(0);
    });
  });

  describe('addXP', () => {
    it('devrait ajouter des XP sans level up', () => {
      const result = addXP(50, 30);

      expect(result.newTotalXP).toBe(80);
      expect(result.oldLevel).toBe(1);
      expect(result.newLevel).toBe(1);
      expect(result.leveledUp).toBe(false);
      expect(result.levelsGained).toBe(0);
    });

    it('devrait détecter un level up', () => {
      const result = addXP(50, 100);

      expect(result.newTotalXP).toBe(150);
      expect(result.oldLevel).toBe(1);
      expect(result.newLevel).toBe(2);
      expect(result.leveledUp).toBe(true);
      expect(result.levelsGained).toBe(1);
    });

    it('devrait gérer plusieurs niveaux gagnés d\'un coup', () => {
      const result = addXP(0, 500);

      expect(result.leveledUp).toBe(true);
      expect(result.levelsGained).toBeGreaterThan(1);
    });
  });

  describe('getXPReward', () => {
    it('devrait retourner les bonnes récompenses', () => {
      expect(getXPReward('module')).toBe(XP_REWARDS.MODULE_COMPLETE);
      expect(getXPReward('daily_choice')).toBe(XP_REWARDS.DAILY_CHOICE);
      expect(getXPReward('quiz')).toBe(XP_REWARDS.QUIZ_SUCCESS);
      expect(getXPReward('streak_7')).toBe(XP_REWARDS.STREAK_7_DAYS);
      expect(getXPReward('invite_friend')).toBe(XP_REWARDS.INVITE_FRIEND);
    });
  });
});
