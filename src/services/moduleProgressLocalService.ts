import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_PREFIX = 'nobroke_module_progress_';

export interface LocalModuleProgress {
  completed: boolean;
  score: number;
  completedAt?: string;
}

/**
 * Sauvegarde la progression d'un module (pour IDs custom type module-1-1)
 * car user_progress ne supporte que les UUIDs
 */
export const saveLocalModuleProgress = async (
  userId: string,
  moduleId: string,
  completed: boolean,
  score: number
): Promise<void> => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${userId}`;
    const existing = await getLocalModuleProgress(userId);
    existing[moduleId] = {
      completed,
      score,
      completedAt: completed ? new Date().toISOString() : undefined,
    };
    await AsyncStorage.setItem(key, JSON.stringify(existing));
  } catch (error) {
    console.error('Erreur saveLocalModuleProgress:', error);
  }
};

/**
 * Récupère la progression locale des modules pour un utilisateur
 */
export const getLocalModuleProgress = async (
  userId: string
): Promise<Record<string, LocalModuleProgress>> => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${userId}`;
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (error) {
    console.error('Erreur getLocalModuleProgress:', error);
    return {};
  }
};
