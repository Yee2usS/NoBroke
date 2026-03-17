-- Table pour les votes sur les fonctionnalités à venir
CREATE TABLE IF NOT EXISTS feature_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature_id)
);

CREATE INDEX IF NOT EXISTS idx_feature_votes_feature ON feature_votes(feature_id);
CREATE INDEX IF NOT EXISTS idx_feature_votes_user ON feature_votes(user_id);

-- RLS
ALTER TABLE feature_votes ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir tous les votes (pour les compteurs)
CREATE POLICY "feature_votes_select" ON feature_votes
  FOR SELECT USING (true);

-- Les utilisateurs authentifiés peuvent insérer leur propre vote
CREATE POLICY "feature_votes_insert" ON feature_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leur propre vote (pour "dévoter")
CREATE POLICY "feature_votes_delete" ON feature_votes
  FOR DELETE USING (auth.uid() = user_id);
