-- ==========================================
-- CAGNOTTE + CLASSEMENT
-- ==========================================
-- Ajoute wallet_balance dans profiles pour le classement
-- et la synchronisation entre appareils.
-- ==========================================

-- Colonne cagnotte (solde virtuel Choix du Jour)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS wallet_balance INTEGER DEFAULT 2000 NOT NULL CHECK (wallet_balance >= 0);

-- Index pour le classement
CREATE INDEX IF NOT EXISTS idx_profiles_wallet_balance ON profiles(wallet_balance DESC);
