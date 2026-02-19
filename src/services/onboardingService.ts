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
 * MISE À JOUR : Utilise 'profiles' au lieu de 'users'
 */
export const saveProfileData = async (
  userId: string,
  profileData: ProfileData
): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
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
 * MISE À JOUR : Utilise 'profiles' au lieu de 'user_progress'
 */
export const saveQuizResults = async (
  userId: string,
  result: QuizResult
): Promise<void> => {
  // Mettre à jour le niveau et XP dans profiles
  const { error: progressError } = await supabase
    .from('profiles')
    .update({
      level: result.level,
      xp: result.xp,
    })
    .eq('id', userId);

  if (progressError) throw progressError;
};

/**
 * Finaliser l'onboarding
 * MISE À JOUR : Utilise 'profiles' au lieu de 'users'
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
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
};
