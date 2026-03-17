import { supabase } from './supabase';
import { canAccessPremiumContent } from './subscriptionService';

export interface CommunityTopic {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  is_general: boolean;
  created_by: string | null;
  created_at: string;
  message_count?: number;
}

export interface CommunityMessage {
  id: string;
  topic_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: { id: string; username: string };
}

/**
 * Vérifie si l'utilisateur peut accéder à la communauté (Premium ou Pro)
 */
export const canAccessCommunity = async (userId: string): Promise<boolean> => {
  return canAccessPremiumContent(userId);
};

/**
 * Récupère la liste des topics
 */
export const getTopics = async (
  userId: string
): Promise<{ success: boolean; topics?: CommunityTopic[]; error?: string }> => {
  try {
    const canAccess = await canAccessCommunity(userId);
    if (!canAccess) {
      return { success: false, error: 'Réservé aux membres Premium et Pro' };
    }

    const { data: topics, error } = await supabase
      .from('community_topics')
      .select('*')
      .order('is_general', { ascending: false })
      .order('title', { ascending: true });

    if (error) throw error;

    // Compter les messages par topic
    const topicsWithCount = await Promise.all(
      (topics || []).map(async (t) => {
        const { count } = await supabase
          .from('community_messages')
          .select('*', { count: 'exact', head: true })
          .eq('topic_id', t.id);
        return { ...t, message_count: count ?? 0 };
      })
    );

    return { success: true, topics: topicsWithCount };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

/**
 * Récupère les messages d'un topic
 */
export const getTopicMessages = async (
  topicId: string,
  userId: string,
  limit = 50
): Promise<{ success: boolean; messages?: CommunityMessage[]; error?: string }> => {
  try {
    const canAccess = await canAccessCommunity(userId);
    if (!canAccess) {
      return { success: false, error: 'Réservé aux membres Premium et Pro' };
    }

    const { data: messages, error } = await supabase
      .from('community_messages')
      .select('*')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;

    const userIds = [...new Set((messages || []).map((m: any) => m.user_id))];
    let profilesMap: Record<string, { id: string; username: string }> = {};

    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds);
      (profiles || []).forEach((p: any) => {
        profilesMap[p.id] = p;
      });
    }

    const enriched = (messages || []).map((m: any) => ({
      ...m,
      author: profilesMap[m.user_id],
    }));

    return { success: true, messages: enriched };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

/**
 * Envoie un message dans un topic
 */
export const sendMessage = async (
  topicId: string,
  userId: string,
  content: string
): Promise<{ success: boolean; message?: CommunityMessage; error?: string }> => {
  try {
    const canAccess = await canAccessCommunity(userId);
    if (!canAccess) {
      return { success: false, error: 'Réservé aux membres Premium et Pro' };
    }

    const trimmed = content.trim();
    if (!trimmed) return { success: false, error: 'Message vide' };

    const { data, error } = await supabase
      .from('community_messages')
      .insert({
        topic_id: topicId,
        user_id: userId,
        content: trimmed,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: { ...data, author: { id: userId, username: '' } },
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};
