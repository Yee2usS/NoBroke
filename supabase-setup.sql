-- ==========================================
-- NoBroke - Script de Configuration Supabase
-- ==========================================
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- pour créer toutes les tables nécessaires

-- 1. TABLE USERS
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  age_range TEXT,
  income_range TEXT,
  financial_objective TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE USER_PROGRESS
-- ==========================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  xp_to_next_level INTEGER DEFAULT 100,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  total_modules_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 3. TABLE MODULES
-- ==========================================
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  xp_reward INTEGER DEFAULT 50,
  duration_minutes INTEGER DEFAULT 10,
  order_index INTEGER NOT NULL,
  is_locked BOOLEAN DEFAULT FALSE,
  required_level INTEGER DEFAULT 1,
  icon TEXT DEFAULT '📚',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE USER_MODULES
-- ==========================================
CREATE TABLE IF NOT EXISTS user_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- 5. TABLE BADGES
-- ==========================================
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  icon TEXT DEFAULT '🏆',
  category TEXT,
  requirement_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE USER_BADGES
-- ==========================================
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- 7. TABLE DAILY_CHOICES
-- ==========================================
CREATE TABLE IF NOT EXISTS daily_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,
  scenario TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  correct_option TEXT CHECK (correct_option IN ('a', 'b')),
  explanation TEXT,
  xp_reward INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLE USER_DAILY_CHOICES
-- ==========================================
CREATE TABLE IF NOT EXISTS user_daily_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  daily_choice_id UUID REFERENCES daily_choices(id) ON DELETE CASCADE,
  selected_option TEXT CHECK (selected_option IN ('a', 'b')),
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, daily_choice_id)
);

-- ==========================================
-- INDEXES pour Performance
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_modules_user_id ON user_modules(user_id);
CREATE INDEX IF NOT EXISTS idx_user_modules_module_id ON user_modules(module_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_choices_date ON daily_choices(date);
CREATE INDEX IF NOT EXISTS idx_modules_category ON modules(category);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(order_index);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_choices ENABLE ROW LEVEL SECURITY;

-- Users: utilisateurs peuvent lire et modifier leurs propres données
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- User Progress: utilisateurs peuvent gérer leur propre progression
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Modules: utilisateurs peuvent gérer leurs modules
CREATE POLICY "Users can view own modules" ON user_modules
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own modules" ON user_modules
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own modules" ON user_modules
  FOR UPDATE USING (auth.uid() = user_id);

-- User Badges: utilisateurs peuvent voir leurs badges
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);

-- User Daily Choices: utilisateurs peuvent gérer leurs réponses
CREATE POLICY "Users can view own choices" ON user_daily_choices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own choices" ON user_daily_choices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Modules publics (lecture pour tous)
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Modules are public" ON modules
  FOR SELECT USING (true);

-- Badges publics (lecture pour tous)
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are public" ON badges
  FOR SELECT USING (true);

-- Daily Choices publics (lecture pour tous)
ALTER TABLE daily_choices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily choices are public" ON daily_choices
  FOR SELECT USING (true);

-- ==========================================
-- FUNCTIONS & TRIGGERS
-- ==========================================

-- Function pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger sur users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur user_progress
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- DONNÉES DE TEST (SEED)
-- ==========================================

-- Modules de test
INSERT INTO modules (title, description, category, difficulty, xp_reward, duration_minutes, order_index, is_locked, required_level, icon) VALUES
('Introduction aux Finances', 'Découvrez les bases de la gestion financière personnelle', 'basics', 'beginner', 50, 10, 1, false, 1, '💰'),
('Créer un Budget', 'Apprenez à créer et suivre votre budget mensuel', 'budget', 'beginner', 75, 15, 2, false, 1, '📊'),
('Épargne d''Urgence', 'Pourquoi et comment constituer un fonds d''urgence', 'savings', 'beginner', 100, 12, 3, false, 2, '🏦'),
('Comprendre les Intérêts', 'Intérêts simples vs composés : la magie de l''argent', 'basics', 'intermediate', 125, 20, 4, false, 3, '📈'),
('Investir pour Débutants', 'Les bases de l''investissement et les différents types', 'investment', 'intermediate', 150, 25, 5, false, 5, '💎'),
('Gérer ses Dettes', 'Stratégies pour rembourser ses dettes efficacement', 'debt', 'intermediate', 100, 18, 6, false, 4, '💳'),
('Planifier sa Retraite', 'Commencer à préparer sa retraite dès maintenant', 'retirement', 'advanced', 200, 30, 7, true, 10, '🎯'),
('Optimiser ses Impôts', 'Comprendre et optimiser sa situation fiscale', 'taxes', 'advanced', 175, 22, 8, true, 8, '📋')
ON CONFLICT DO NOTHING;

-- Badges de test
INSERT INTO badges (name, description, rarity, icon, category, requirement_description) VALUES
('Premier Pas', 'Complétez votre premier module', 'common', '🎓', 'progression', 'Terminer 1 module'),
('Série de 3', 'Maintenez une série de 3 jours consécutifs', 'common', '🔥', 'streak', 'Streak de 3 jours'),
('Apprenti Financier', 'Atteignez le niveau 5', 'rare', '⭐', 'level', 'Atteindre le niveau 5'),
('Expert en Budget', 'Complétez tous les modules de budget', 'rare', '💰', 'category', 'Terminer catégorie Budget'),
('Série de 7', 'Une semaine complète d''apprentissage', 'epic', '🔥', 'streak', 'Streak de 7 jours'),
('Niveau 10', 'Vous êtes à mi-chemin vers le sommet', 'epic', '🏆', 'level', 'Atteindre le niveau 10'),
('Maître des Finances', 'Complétez tous les modules disponibles', 'legendary', '👑', 'completion', 'Terminer tous les modules'),
('Série Légendaire', 'Un mois complet sans interruption', 'legendary', '🔥', 'streak', 'Streak de 30 jours')
ON CONFLICT DO NOTHING;

-- Choix du jour (exemple)
INSERT INTO daily_choices (date, scenario, option_a, option_b, correct_option, explanation, xp_reward) VALUES
(CURRENT_DATE, 'Vous recevez une prime de 1000€. Que faites-vous ?', 'Je dépense tout en shopping', 'J''en épargne au moins 50%', 'b', 'Épargner une partie de vos revenus exceptionnels est essentiel pour construire votre sécurité financière.', 20)
ON CONFLICT DO NOTHING;

-- ==========================================
-- VÉRIFICATION
-- ==========================================

-- Vérifier que tout est créé
SELECT 
  'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'modules', COUNT(*) FROM modules
UNION ALL
SELECT 'badges', COUNT(*) FROM badges
UNION ALL
SELECT 'daily_choices', COUNT(*) FROM daily_choices;

-- ==========================================
-- FIN DU SCRIPT
-- ==========================================
-- ✅ Configuration terminée !
-- Vous pouvez maintenant utiliser l'application NoBroke
