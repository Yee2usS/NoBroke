/**
 * Types pour le système Friends & Battles
 */

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';
export type BattleType = 'quiz' | 'choice';
export type BattleStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'expired' | 'rejected';

export interface FriendRequest {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: FriendRequestStatus;
  created_at: string;
  updated_at: string;
  requester?: { id: string; username: string; avatar_url?: string };
  addressee?: { id: string; username: string; avatar_url?: string };
}

export interface Battle {
  id: string;
  challenger_id: string;
  opponent_id: string;
  battle_type: BattleType;
  status: BattleStatus;
  module_id?: string | null;
  scenario_id?: string | null;
  challenger_score?: number | null;
  opponent_score?: number | null;
  challenger_wallet_final?: number | null;
  opponent_wallet_final?: number | null;
  winner_id?: string | null;
  created_at: string;
  expires_at?: string | null;
  completed_at?: string | null;
  challenger?: { id: string; username: string };
  opponent?: { id: string; username: string };
  module?: { id: string; title: string };
}

export interface BattleResult {
  id: string;
  battle_id: string;
  user_id: string;
  score?: number | null;
  wallet_start: number;
  wallet_final?: number | null;
  completed_at: string;
}
