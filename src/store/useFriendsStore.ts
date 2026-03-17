import { create } from 'zustand';
import {
  getFriends,
  getPendingRequests,
  searchUsersByUsername,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from '@/services/friendService';
import type { FriendRequest } from '@/types/battle.types';

interface FriendUser {
  id: string;
  username: string;
  avatar_url?: string;
}

interface FriendsState {
  friends: FriendRequest[];
  pendingRequests: FriendRequest[];
  searchResults: FriendUser[];
  loading: boolean;
  error: string | null;
  fetchFriends: (userId: string) => Promise<void>;
  fetchPendingRequests: (userId: string) => Promise<void>;
  searchUsers: (currentUserId: string, query: string) => Promise<void>;
  sendRequest: (requesterId: string, addresseeId: string) => Promise<boolean>;
  acceptRequest: (requestId: string, userId: string) => Promise<boolean>;
  rejectRequest: (requestId: string, userId: string) => Promise<boolean>;
  removeFriendAction: (userId: string, friendId: string) => Promise<boolean>;
  getFriendProfile: (userId: string, otherUserId: string) => FriendUser | null;
  clearSearch: () => void;
}

export const useFriendsStore = create<FriendsState>((set, get) => ({
  friends: [],
  pendingRequests: [],
  searchResults: [],
  loading: false,
  error: null,

  fetchFriends: async (userId) => {
    set({ loading: true, error: null });
    const res = await getFriends(userId);
    set({
      friends: res.friends || [],
      loading: false,
      error: res.success ? null : res.error || null,
    });
  },

  fetchPendingRequests: async (userId) => {
    const res = await getPendingRequests(userId);
    set({ pendingRequests: res.requests || [] });
  },

  searchUsers: async (currentUserId, query) => {
    if (!query || query.length < 2) {
      set({ searchResults: [] });
      return;
    }
    const res = await searchUsersByUsername(currentUserId, query);
    set({ searchResults: res.users || [] });
  },

  sendRequest: async (requesterId, addresseeId) => {
    set({ error: null });
    const res = await sendFriendRequest(requesterId, addresseeId);
    if (!res.success) set({ error: res.error || null });
    return res.success;
  },

  acceptRequest: async (requestId, userId) => {
    const res = await acceptFriendRequest(requestId, userId);
    if (res.success) {
      const { pendingRequests } = get();
      set({ pendingRequests: pendingRequests.filter((r) => r.id !== requestId) });
    }
    return res.success;
  },

  rejectRequest: async (requestId, userId) => {
    const res = await rejectFriendRequest(requestId, userId);
    if (res.success) {
      const { pendingRequests } = get();
      set({ pendingRequests: pendingRequests.filter((r) => r.id !== requestId) });
    }
    return res.success;
  },

  removeFriendAction: async (userId, friendId) => {
    const res = await removeFriend(userId, friendId);
    if (res.success) {
      const { friends } = get();
      set({
        friends: friends.filter(
          (f) =>
            (f.requester_id === friendId && f.addressee_id === userId) ||
            (f.addressee_id === friendId && f.requester_id === userId)
        ),
      });
    }
    return res.success;
  },

  getFriendProfile: (userId, otherUserId) => {
    const { friends } = get();
    const fr = friends.find(
      (f) =>
        (f.requester_id === otherUserId && f.addressee_id === userId) ||
        (f.addressee_id === otherUserId && f.requester_id === userId)
    );
    if (!fr) return null;
    const profile = fr.requester_id === otherUserId ? fr.requester : fr.addressee;
    return profile ? { id: profile.id, username: profile.username, avatar_url: profile.avatar_url } : null;
  },

  clearSearch: () => set({ searchResults: [] }),
}));
