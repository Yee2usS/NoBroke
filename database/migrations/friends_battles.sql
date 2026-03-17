-- ==========================================
-- NOBROKE - Friends & Battles
-- ==========================================
-- Exécuter dans Supabase Dashboard → SQL Editor
-- ==========================================

-- 1. TABLE FRIEND_REQUESTS (amis)
CREATE TABLE IF NOT EXISTS friend_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id),
  CHECK (requester_id != addressee_id)
);

CREATE INDEX IF NOT EXISTS idx_friend_requests_requester ON friend_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_addressee ON friend_requests(addressee_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_status ON friend_requests(status);

-- 2. TABLE BATTLES
CREATE TABLE IF NOT EXISTS battles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenger_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opponent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  battle_type TEXT NOT NULL CHECK (battle_type IN ('quiz', 'choice')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'expired', 'rejected')),
  module_id TEXT,
  scenario_id TEXT,
  challenger_score INTEGER,
  opponent_score INTEGER,
  challenger_wallet_final INTEGER,
  opponent_wallet_final INTEGER,
  winner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  CHECK (challenger_id != opponent_id)
);

CREATE INDEX IF NOT EXISTS idx_battles_challenger ON battles(challenger_id);
CREATE INDEX IF NOT EXISTS idx_battles_opponent ON battles(opponent_id);
CREATE INDEX IF NOT EXISTS idx_battles_status ON battles(status);

-- 3. TABLE BATTLE_RESULTS (résultats détaillés par joueur)
CREATE TABLE IF NOT EXISTS battle_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  score INTEGER,
  wallet_start INTEGER DEFAULT 2000,
  wallet_final INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(battle_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_battle_results_battle ON battle_results(battle_id);
CREATE INDEX IF NOT EXISTS idx_battle_results_user ON battle_results(user_id);

-- RLS
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE battle_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own friend requests" ON friend_requests;
CREATE POLICY "Users can manage own friend requests" ON friend_requests
  FOR ALL USING (
    auth.uid() = requester_id OR auth.uid() = addressee_id
  );

DROP POLICY IF EXISTS "Users can manage own battles" ON battles;
CREATE POLICY "Users can manage own battles" ON battles
  FOR ALL USING (
    auth.uid() = challenger_id OR auth.uid() = opponent_id
  );

DROP POLICY IF EXISTS "Users can view own battle results" ON battle_results;
CREATE POLICY "Users can view own battle results" ON battle_results
  FOR ALL USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM battles b WHERE b.id = battle_id AND (b.challenger_id = auth.uid() OR b.opponent_id = auth.uid()))
  );
