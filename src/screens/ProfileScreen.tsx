import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/services/supabase';

const ProfileScreen: React.FC = () => {
  const { user, progress, logout } = useUserStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
  };

  const stats = [
    { label: 'Niveau', value: progress?.level || 1, icon: '⭐' },
    { label: 'XP Total', value: progress?.xp || 0, icon: '💎' },
    { label: 'Série', value: `${progress?.streak_days || 0} jours`, icon: '🔥' },
    { label: 'Modules', value: progress?.total_modules_completed || 0, icon: '📚' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username?.[0]?.toUpperCase() || '👤'}
            </Text>
          </View>
          <Text style={styles.username}>
            {user?.username || 'Utilisateur'}
          </Text>
          <Text style={styles.email}>
            {user?.email || 'email@example.com'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>
              Statistiques
            </Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <View style={styles.statCard}>
                    <Text style={styles.statIcon}>{stat.icon}</Text>
                    <Text style={styles.statLabel}>
                      {stat.label}
                    </Text>
                    <Text style={styles.statValue}>
                      {stat.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>
            Paramètres
          </Text>
          
          <View style={styles.settingsCard}>
            <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingRow}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Text style={styles.settingChevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingRow}>
                <Text style={styles.settingIcon}>🌙</Text>
                <Text style={styles.settingLabel}>Mode Sombre</Text>
              </View>
              <Text style={styles.settingChevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingRow}>
                <Text style={styles.settingIcon}>🌍</Text>
                <Text style={styles.settingLabel}>Langue</Text>
              </View>
              <Text style={styles.settingChevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingRow}>
                <Text style={styles.settingIcon}>ℹ️</Text>
                <Text style={styles.settingLabel}>À propos</Text>
              </View>
              <Text style={styles.settingChevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>
              Déconnexion
            </Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            NoBroke v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 48,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    backgroundColor: '#ffffff',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 48,
  },
  username: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#c7d2fe',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    marginHorizontal: 24,
    marginTop: -32,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  statIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  statLabel: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#1f2937',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  settingsTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  settingLabel: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
  settingChevron: {
    color: '#9ca3af',
    fontSize: 24,
  },
  logoutContainer: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});

export default ProfileScreen;
