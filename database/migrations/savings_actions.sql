-- Table pour les actions d'économie réelles de l'utilisateur
-- À exécuter dans Supabase Dashboard → SQL Editor
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS savings_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount_euros DECIMAL(10, 2) NOT NULL CHECK (amount_euros >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_savings_actions_user ON savings_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_actions_created ON savings_actions(created_at DESC);

-- RLS
ALTER TABLE savings_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "savings_actions_select" ON savings_actions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "savings_actions_insert" ON savings_actions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "savings_actions_update" ON savings_actions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "savings_actions_delete" ON savings_actions
  FOR DELETE USING (auth.uid() = user_id);
