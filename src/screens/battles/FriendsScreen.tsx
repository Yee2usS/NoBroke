import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { useFriendsStore } from '@/store/useFriendsStore';

const FriendsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useUserStore();
  const {
    friends,
    pendingRequests,
    searchResults,
    loading,
    fetchFriends,
    fetchPendingRequests,
    searchUsers,
    sendRequest,
    acceptRequest,
    rejectRequest,
    clearSearch,
  } = useFriendsStore();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchFriends(user.id);
      fetchPendingRequests(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (user?.id && searchQuery.length >= 2) searchUsers(user.id, searchQuery);
      else clearSearch();
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const handleAddFriend = async (addresseeId: string) => {
    if (!user?.id) return;
    const ok = await sendRequest(user.id, addresseeId);
    if (ok) {
      Alert.alert('Demande envoyée', 'Ton ami recevra ta demande.');
      setSearchQuery('');
      clearSearch();
    } else {
      Alert.alert('Erreur', 'Impossible d\'envoyer la demande.');
    }
  };

  const handleAccept = async (requestId: string) => {
    if (!user?.id) return;
    const ok = await acceptRequest(requestId, user.id);
    if (ok) {
      fetchFriends(user.id);
      fetchPendingRequests(user.id);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!user?.id) return;
    await rejectRequest(requestId, user.id);
  };

  const getFriendDisplay = (fr: any) => {
    const other = fr.requester_id === user?.id ? fr.addressee : fr.requester;
    return (typeof other === 'object' ? other?.username : null) || 'Ami';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes amis</Text>
        <Text style={styles.headerSubtitle}>Ajoute des amis pour les défier</Text>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher par pseudo..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résultats</Text>
            {searchResults.map((u) => (
              <View key={u.id} style={styles.row}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{u.username[0]?.toUpperCase() || '?'}</Text>
                </View>
                <Text style={styles.rowName}>{u.username}</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => handleAddFriend(u.id)}
                >
                  <Text style={styles.addBtnText}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {pendingRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Demandes reçues</Text>
            {pendingRequests.map((req) => {
              const requester = (req as any).requester;
              const name = typeof requester === 'object' ? requester?.username : 'Quelqu\'un';
              return (
                <View key={req.id} style={styles.row}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{name[0]?.toUpperCase() || '?'}</Text>
                  </View>
                  <Text style={styles.rowName}>{name}</Text>
                  <View style={styles.requestActions}>
                    <TouchableOpacity
                      style={[styles.addBtn, { backgroundColor: '#10b981' }]}
                      onPress={() => handleAccept(req.id)}
                    >
                      <Text style={styles.addBtnText}>Accepter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.addBtn, { backgroundColor: '#ef4444', marginLeft: 8 }]}
                      onPress={() => handleReject(req.id)}
                    >
                      <Text style={styles.addBtnText}>Refuser</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes amis ({friends.length})</Text>
          {friends.length === 0 && !searchQuery && (
            <Text style={styles.emptyText}>Aucun ami pour l'instant. Recherche par pseudo ou attends des demandes.</Text>
          )}
          {friends.map((fr) => (
            <TouchableOpacity
              key={fr.id}
              style={styles.row}
              onPress={() => navigation.navigate('CreateBattle', { friendId: fr.requester_id === user?.id ? fr.addressee_id : fr.requester_id })}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getFriendDisplay(fr)[0]?.toUpperCase() || '?'}</Text>
              </View>
              <Text style={styles.rowName}>{getFriendDisplay(fr)}</Text>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: { position: 'absolute', top: 48, left: 20, zIndex: 1 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 16 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#fff',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 48 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  rowName: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1e293b' },
  addBtn: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  requestActions: { flexDirection: 'row' },
  emptyText: { fontSize: 14, color: '#94a3b8', paddingVertical: 16 },
});

export default FriendsScreen;
