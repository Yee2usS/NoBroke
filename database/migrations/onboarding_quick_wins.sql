-- Ajout de la colonne onboarding_quick_wins pour stocker les réponses Quick Wins
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_quick_wins JSONB;

COMMENT ON COLUMN profiles.onboarding_quick_wins IS 'Objectifs et actions choisies lors de l''onboarding Quick Wins: {objectives: string[], hasIdeas: boolean, selectedActions: string[]}';
