import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import {
  getTopics,
  canAccessCommunity,
  type CommunityTopic,
} from '@/services/communityService';

const CommunityScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useUserStore();
  const [topics, setTopics] = useState<CommunityTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const load = async () => {
    if (!user?.id) return;
    const access = await canAccessCommunity(user.id);
    setHasAccess(access);
    if (!access) {
      setLoading(false);
      return;
    }
    const res = await getTopics(user.id);
    if (res.success && res.topics) setTopics(res.topics);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user?.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleTopicPress = (topic: CommunityTopic) => {
    if (!hasAccess) {
      navigation.navigate('Subscription');
      return;
    }
    navigation.navigate('CommunityTopic', { topicId: topic.id, title: topic.title });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#0d9488', '#14b8a6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communauté</Text>
        <Text style={styles.headerSubtitle}>
          {hasAccess ? 'Échange avec les membres Premium' : 'Réservé Premium & Pro'}
        </Text>
      </LinearGradient>

      {hasAccess === false && (
        <View style={styles.paywall}>
          <View style={styles.paywallIcon}>
            <Ionicons name="lock-closed" size={48} color="#94a3b8" />
          </View>
          <Text style={styles.paywallTitle}>Espace réservé</Text>
          <Text style={styles.paywallText}>
            Rejoins Premium ou Pro pour accéder à la communauté : topics de discussion et conversation générale.
          </Text>
          <TouchableOpacity
            style={styles.paywallBtn}
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.8}
          >
            <Text style={styles.paywallBtnText}>Passer à Premium</Text>
          </TouchableOpacity>
        </View>
      )}

      {hasAccess && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#14b8a6" />
          }
        >
          {loading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color="#14b8a6" />
            </View>
          ) : (
            <View style={styles.topicsList}>
              {topics.map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  style={styles.topicCard}
                  onPress={() => handleTopicPress(topic)}
                  activeOpacity={0.85}
                >
                  <View style={styles.topicLeft}>
                    <View style={[styles.topicIcon, topic.is_general && styles.topicIconGeneral]}>
                      <Ionicons
                        name={topic.is_general ? 'chatbubbles' : 'chatbox-ellipses'}
                        size={24}
                        color="#14b8a6"
                      />
                    </View>
                    <View style={styles.topicText}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      {topic.description && (
                        <Text style={styles.topicDesc} numberOfLines={2}>
                          {topic.description}
                        </Text>
                      )}
                      <Text style={styles.topicMeta}>
                        {topic.message_count ?? 0} message{(topic.message_count ?? 0) > 1 ? 's' : ''}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
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
  headerSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  paywall: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paywallIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paywallTitle: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  paywallText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  paywallBtn: {
    backgroundColor: '#14b8a6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  paywallBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 48 },
  loadingWrap: { paddingVertical: 48, alignItems: 'center' },
  topicsList: { gap: 12 },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  topicLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(20,184,166,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicIconGeneral: { backgroundColor: 'rgba(20,184,166,0.25)' },
  topicText: { flex: 1 },
  topicTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  topicDesc: { fontSize: 13, color: '#64748b', marginBottom: 4 },
  topicMeta: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
});

export default CommunityScreen;
