import { supabase } from './supabase';

/**
 * Service pour gérer l'onboarding des utilisateurs
 */

export interface ProfileData {
  age: string;
  income: string;
  objective: string;
}

export interface QuizResult {
  score: number;
  level: number;
  xp: number;
}

/**
 * Sauvegarder les données de profil
 */
export const saveProfileData = async (
  userId: string,
  profileData: ProfileData
): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .update({
      age_range: profileData.age,
      income_range: profileData.income,
      financial_objective: profileData.objective,
    })
    .eq('id', userId);

  if (error) throw error;
};

/**
 * Sauvegarder les résultats du quiz et attribuer le niveau
 */
export const saveQuizResults = async (
  userId: string,
  result: QuizResult
): Promise<void> => {
  // Mettre à jour la progression
  const { error: progressError } = await supabase
    .from('user_progress')
    .update({
      level: result.level,
      xp: result.xp,
    })
    .eq('user_id', userId);

  if (progressError) throw progressError;
};

/**
 * Finaliser l'onboarding
 */
export const completeOnboarding = async (
  userId: string,
  username?: string,
  avatarUrl?: string
): Promise<void> => {
  const updates: any = {
    onboarding_completed: true,
  };

  if (username) updates.username = username;
  if (avatarUrl) updates.avatar_url = avatarUrl;

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
};
