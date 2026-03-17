-- ==========================================
-- FIX : Recherche d'amis par pseudo
-- ==========================================
-- La politique actuelle ne permet de voir que son propre profil.
-- On ajoute une politique pour que les utilisateurs connectés
-- puissent lire les profils des autres (recherche amis).
-- ==========================================

-- Supprimer l'ancienne politique restrictive
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Nouvelle politique : tout utilisateur connecté peut lire les profils
-- (nécessaire pour la recherche d'amis par pseudo)
CREATE POLICY "Authenticated users can view profiles"
  ON profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);
