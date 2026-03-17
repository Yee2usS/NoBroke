-- ==========================================
-- ESPACE COMMUNAUTAIRE (Premium / Pro)
-- ==========================================
-- Topics de discussion + conversation générale
-- ==========================================

-- Topics (sujets de discussion)
CREATE TABLE IF NOT EXISTS community_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  is_general BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_community_topics_slug ON community_topics(slug);
CREATE INDEX IF NOT EXISTS idx_community_topics_general ON community_topics(is_general);

-- Messages
CREATE TABLE IF NOT EXISTS community_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID NOT NULL REFERENCES community_topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_community_messages_topic ON community_messages(topic_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_user ON community_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_created ON community_messages(topic_id, created_at DESC);

-- RLS
ALTER TABLE community_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;

-- Seuls Premium et Pro peuvent accéder
DROP POLICY IF EXISTS "Premium Pro can view topics" ON community_topics;
CREATE POLICY "Premium Pro can view topics"
  ON community_topics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND subscription_tier IN ('premium', 'pro')
    )
  );

DROP POLICY IF EXISTS "Premium Pro can insert topics" ON community_topics;
CREATE POLICY "Premium Pro can insert topics"
  ON community_topics FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND subscription_tier IN ('premium', 'pro')
    )
  );

DROP POLICY IF EXISTS "Premium Pro can view messages" ON community_messages;
CREATE POLICY "Premium Pro can view messages"
  ON community_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND subscription_tier IN ('premium', 'pro')
    )
  );

DROP POLICY IF EXISTS "Premium Pro can insert messages" ON community_messages;
CREATE POLICY "Premium Pro can insert messages"
  ON community_messages FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND subscription_tier IN ('premium', 'pro')
    )
  );

-- Topic général par défaut
INSERT INTO community_topics (title, description, slug, is_general) VALUES
  ('Conversation générale', 'Échange libre sur la finance et NoBroke', 'general', true)
ON CONFLICT (slug) DO NOTHING;

-- Topics de base
INSERT INTO community_topics (title, description, slug) VALUES
  ('Épargne', 'Conseils et astuces pour mieux épargner', 'epargne'),
  ('Investissement', 'Discussions sur les placements', 'investissement'),
  ('Budget', 'Gestion du budget au quotidien', 'budget'),
  ('Dettes', 'Remboursement et stratégies', 'dettes')
ON CONFLICT (slug) DO NOTHING;
