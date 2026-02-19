import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useUserStore } from '@/store/useUserStore';

/**
 * Hook personnalisé pour gérer l'authentification Supabase
 * Utilise la nouvelle structure DB (profiles au lieu de users + user_progress)
 */
export const useSupabase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, setProgress, logout } = useUserStore();

  useEffect(() => {
    // Vérifier la session au montage
    checkUser();

    // Écouter les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          logout();
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        await loadUserData(session.user.id);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      // Charger les données utilisateur depuis profiles
      // Dans le nouveau schema, profiles contient à la fois user data et progress
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Séparer user et progress pour le store
      const userData = {
        id: profileData.id,
        email: profileData.email,
        username: profileData.username,
        avatar_url: profileData.avatar_url,
        onboarding_completed: profileData.onboarding_completed,
        created_at: profileData.created_at,
        updated_at: profileData.updated_at,
      };

      const progressData = {
        id: profileData.id, // Même ID que le profil
        user_id: profileData.id,
        level: profileData.level || 1,
        xp: profileData.xp || 0,
        streak: profileData.streak || 0,
        last_visit: profileData.last_visit || new Date().toISOString(),
        created_at: profileData.created_at,
      };

      setUser(userData);
      setProgress(progressData);
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateur:', error);
    }
  };

  return { isLoading };
};
