import { supabase } from './supabase';
import type { FriendRequest } from '@/types/battle.types';

/**
 * Service pour gérer les amis
 */

export const searchUsersByUsername = async (
  currentUserId: string,
  query: string
): Promise<{ success: boolean; users?: { id: string; username: string; avatar_url?: string }[]; error?: string }> => {
  if (!query || query.length < 2) {
    return { success: true, users: [] };
  }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .neq('id', currentUserId)
      .ilike('username', `%${query}%`)
      .limit(10);

    if (error) throw error;
    return { success: true, users: data || [] };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const sendFriendRequest = async (
  requesterId: string,
  addresseeId: string
): Promise<{ success: boolean; error?: string }> => {
  if (requesterId === addresseeId) return { success: false, error: 'Impossible de t\'ajouter toi-même' };
  try {
    const { error } = await supabase.from('friend_requests').insert({
      requester_id: requesterId,
      addressee_id: addresseeId,
      status: 'pending',
    });
    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    if (e.code === '23505') return { success: false, error: 'Demande déjà envoyée' };
    return { success: false, error: e.message };
  }
};

export const acceptFriendRequest = async (
  requestId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: req, error: fetchErr } = await supabase
      .from('friend_requests')
      .select('*')
      .eq('id', requestId)
      .eq('addressee_id', userId)
      .eq('status', 'pending')
      .single();

    if (fetchErr || !req) return { success: false, error: 'Demande introuvable' };

    const { error } = await supabase
      .from('friend_requests')
      .update({ status: 'accepted', updated_at: new Date().toISOString() })
      .eq('id', requestId);

    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const rejectFriendRequest = async (
  requestId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('friend_requests')
      .update({ status: 'rejected', updated_at: new Date().toISOString() })
      .eq('id', requestId)
      .eq('addressee_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const getFriends = async (userId: string): Promise<{ success: boolean; friends?: FriendRequest[]; error?: string }> => {
  try {
    const { data: rows, error } = await supabase
      .from('friend_requests')
      .select('id, requester_id, addressee_id, status, created_at')
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
      .eq('status', 'accepted')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const ids = new Set<string>();
    (rows || []).forEach((r: any) => {
      ids.add(r.requester_id);
      ids.add(r.addressee_id);
    });
    ids.delete(userId);

    let profilesMap: Record<string, { id: string; username: string; avatar_url?: string }> = {};
    if (ids.size > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', Array.from(ids));
      (profiles || []).forEach((p: any) => {
        profilesMap[p.id] = p;
      });
    }

    const friends = (rows || []).map((r: any) => ({
      ...r,
      requester: profilesMap[r.requester_id],
      addressee: profilesMap[r.addressee_id],
    }));

    return { success: true, friends };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const getPendingRequests = async (
  userId: string
): Promise<{ success: boolean; requests?: FriendRequest[]; error?: string }> => {
  try {
    const { data: rows, error } = await supabase
      .from('friend_requests')
      .select('id, requester_id, addressee_id, status, created_at')
      .eq('addressee_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const requesterIds = [...new Set((rows || []).map((r: any) => r.requester_id))];
    let profilesMap: Record<string, { id: string; username: string; avatar_url?: string }> = {};
    if (requesterIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', requesterIds);
      (profiles || []).forEach((p: any) => {
        profilesMap[p.id] = p;
      });
    }

    const requests = (rows || []).map((r: any) => ({
      ...r,
      requester: profilesMap[r.requester_id],
    }));

    return { success: true, requests };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const removeFriend = async (
  userId: string,
  friendId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: rows } = await supabase
      .from('friend_requests')
      .select('id')
      .eq('status', 'accepted')
      .or(`and(requester_id.eq.${userId},addressee_id.eq.${friendId}),and(requester_id.eq.${friendId},addressee_id.eq.${userId})`);

    if (!rows?.length) return { success: false, error: 'Amitié introuvable' };

    const { error } = await supabase.from('friend_requests').delete().eq('id', rows[0].id);
    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};
