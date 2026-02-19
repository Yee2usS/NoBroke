-- ==========================================
-- NOBROKE MVP - SCHEMA SQL COMPLET
-- ==========================================
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- ==========================================

-- Extension UUID (si pas déjà activée)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TABLE PROFILES
-- ==========================================
-- Remplace la table "users" pour plus de clarté avec Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0 NOT NULL CHECK (xp >= 0),
  level INTEGER DEFAULT 1 NOT NULL CHECK (level >= 1 AND level <= 50),
  streak INTEGER DEFAULT 0 NOT NULL CHECK (streak >= 0),
  last_visit TIMESTAMPTZ DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  quiz_score INTEGER CHECK (quiz_score >= 0 AND quiz_score <= 10),
  age_range TEXT,
  income_range TEXT,
  financial_objective TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_profiles_level ON profiles(level);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON profiles(xp);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription ON profiles(subscription_tier);

-- ==========================================
-- 2. TABLE MODULES
-- ==========================================
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone INTEGER NOT NULL CHECK (zone >= 1 AND zone <= 5),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content JSONB NOT NULL, -- Structure: [{slide_number, title, content, image_url}]
  quiz_questions JSONB NOT NULL, -- Structure: [{question, options[], correct_index, explanation}]
  is_premium BOOLEAN DEFAULT FALSE,
  level_required INTEGER DEFAULT 1 CHECK (level_required >= 1 AND level_required <= 50),
  xp_reward INTEGER DEFAULT 50 CHECK (xp_reward >= 0),
  order_in_zone INTEGER NOT NULL,
  estimated_duration INTEGER DEFAULT 10, -- minutes
  icon TEXT DEFAULT '📚',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(zone, order_in_zone)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_modules_zone ON modules(zone);
CREATE INDEX IF NOT EXISTS idx_modules_level ON modules(level_required);
CREATE INDEX IF NOT EXISTS idx_modules_premium ON modules(is_premium);
CREATE INDEX IF NOT EXISTS idx_modules_zone_order ON modules(zone, order_in_zone);

-- ==========================================
-- 3. TABLE USER_PROGRESS
-- ==========================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER CHECK (score >= 0 AND score <= 3), -- Score quiz /3
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module ON user_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(user_id, completed);

-- ==========================================
-- 4. TABLE BADGES
-- ==========================================
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT DEFAULT '🏆',
  rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  unlock_condition JSONB NOT NULL, -- Structure: {type, value} ex: {type: "modules_completed", value: 10}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_badges_rarity ON badges(rarity);

-- ==========================================
-- 5. TABLE USER_BADGES
-- ==========================================
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge ON user_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_unlocked ON user_badges(unlocked_at);

-- ==========================================
-- 6. TABLE DAILY_CHOICES
-- ==========================================
CREATE TABLE IF NOT EXISTS daily_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  scenario JSONB NOT NULL, -- Structure: {situation, choices: [{text, xp_reward, explanation}], correct_index}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_daily_choices_date ON daily_choices(date DESC);

-- ==========================================
-- 7. TABLE USER_CHOICES
-- ==========================================
CREATE TABLE IF NOT EXISTS user_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  daily_choice_id UUID NOT NULL REFERENCES daily_choices(id) ON DELETE CASCADE,
  choice_index INTEGER NOT NULL CHECK (choice_index >= 0 AND choice_index <= 3),
  consequences JSONB, -- Structure: {is_correct, explanation, xp_gained}
  xp_gained INTEGER DEFAULT 0 CHECK (xp_gained >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, daily_choice_id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_user_choices_user ON user_choices(user_id);
CREATE INDEX IF NOT EXISTS idx_user_choices_date ON user_choices(created_at DESC);

-- ==========================================
-- 8. TABLE XP_HISTORY
-- ==========================================
CREATE TABLE IF NOT EXISTS xp_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('module_complete', 'daily_choice', 'quiz_success', 'streak_7', 'invite_friend', 'level_up')),
  xp_gained INTEGER NOT NULL,
  total_xp INTEGER NOT NULL, -- Snapshot du total XP après action
  level INTEGER NOT NULL, -- Snapshot du niveau après action
  metadata JSONB, -- Données additionnelles (module_id, badge_id, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_xp_history_user ON xp_history(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_action ON xp_history(action);
CREATE INDEX IF NOT EXISTS idx_xp_history_created ON xp_history(user_id, created_at DESC);

-- ==========================================
-- TRIGGERS
-- ==========================================

-- Trigger pour mettre à jour updated_at sur profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, onboarding_completed, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    FALSE,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger qui s'exécute après la création d'un utilisateur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- POLICIES - PROFILES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ==========================================
-- POLICIES - MODULES
-- ==========================================

DROP POLICY IF EXISTS "Anyone can view modules" ON modules;
CREATE POLICY "Anyone can view modules"
  ON modules FOR SELECT
  USING (true); -- Tous peuvent voir les modules (pour le catalogue)

-- ==========================================
-- POLICIES - USER_PROGRESS
-- ==========================================

DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ==========================================
-- POLICIES - BADGES
-- ==========================================

DROP POLICY IF EXISTS "Anyone can view badges" ON badges;
CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  USING (true); -- Tous peuvent voir les badges disponibles

-- ==========================================
-- POLICIES - USER_BADGES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own badges" ON user_badges;
CREATE POLICY "Users can insert own badges"
  ON user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- POLICIES - DAILY_CHOICES
-- ==========================================

DROP POLICY IF EXISTS "Anyone can view daily choices" ON daily_choices;
CREATE POLICY "Anyone can view daily choices"
  ON daily_choices FOR SELECT
  USING (true); -- Tous peuvent voir le choix du jour

-- ==========================================
-- POLICIES - USER_CHOICES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own choices" ON user_choices;
CREATE POLICY "Users can view own choices"
  ON user_choices FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own choices" ON user_choices;
CREATE POLICY "Users can insert own choices"
  ON user_choices FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- POLICIES - XP_HISTORY
-- ==========================================

DROP POLICY IF EXISTS "Users can view own xp history" ON xp_history;
CREATE POLICY "Users can view own xp history"
  ON xp_history FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own xp history" ON xp_history;
CREATE POLICY "Users can insert own xp history"
  ON xp_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- DONNÉES DE TEST (OPTIONNEL)
-- ==========================================

-- Badge Exemple : Premier Module
INSERT INTO badges (name, description, icon, rarity, unlock_condition) 
VALUES 
  ('Premier Pas', 'Complétez votre premier module', '🎯', 'common', '{"type": "modules_completed", "value": 1}'),
  ('Marathonien', 'Complétez 10 modules', '🏃', 'rare', '{"type": "modules_completed", "value": 10}'),
  ('Série Dorée', 'Maintenez une série de 7 jours', '🔥', 'epic', '{"type": "streak", "value": 7}'),
  ('Maître Financier', 'Atteignez le niveau 50', '👑', 'legendary', '{"type": "level", "value": 50}')
ON CONFLICT (name) DO NOTHING;

-- Choix du Jour Exemple
INSERT INTO daily_choices (date, scenario)
VALUES (
  CURRENT_DATE,
  '{
    "situation": "Vous recevez 500€ de prime. Que faites-vous ?",
    "choices": [
      {"text": "Je le dépense immédiatement", "xp_reward": 10, "explanation": "Pas optimal ! Mieux vaut épargner ou investir."},
      {"text": "Je mets 70% en épargne", "xp_reward": 30, "explanation": "Excellent choix ! L''épargne est clé."},
      {"text": "Je rembourse mes dettes", "xp_reward": 30, "explanation": "Très bon choix ! Les dettes coûtent cher."},
      {"text": "J''investis tout en crypto", "xp_reward": 5, "explanation": "Trop risqué sans diversification."}
    ],
    "correct_index": 1
  }'::jsonb
)
ON CONFLICT (date) DO NOTHING;

-- ==========================================
-- FIN DU SCHEMA
-- ==========================================

-- Vérification finale
SELECT 'Schema NoBroke créé avec succès ! ✅' AS status;
