import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { useSubscription } from '@/hooks/useSubscription';

type NavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Écran "Plus" avec paramètres et abonnement
 */
const MoreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { subscription } = useSubscription();

  const menuItems = [
    {
      id: 'subscription',
      title: 'Abonnement',
      subtitle: `Plan actuel: ${subscription === 'free' ? 'Gratuit' : subscription === 'premium' ? 'Premium' : 'Pro'}`,
      icon: subscription === 'free' ? '🆓' : subscription === 'premium' ? '⭐' : '💎',
      onPress: () => navigation.navigate('Subscription'),
    },
    {
      id: 'profile',
      title: 'Mon profil',
      subtitle: 'Informations personnelles',
      icon: '👤',
      onPress: () => {
        // TODO: Navigate to profile edit screen
      },
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Gérer les alertes',
      icon: '🔔',
      onPress: () => {
        // TODO: Navigate to notifications settings
      },
    },
    {
      id: 'help',
      title: 'Aide & Support',
      subtitle: 'FAQ et contact',
      icon: '❓',
      onPress: () => {
        // TODO: Navigate to help screen
      },
    },
    {
      id: 'about',
      title: 'À propos',
      subtitle: 'Version 1.0.0 (MVP)',
      icon: 'ℹ️',
      onPress: () => {
        // TODO: Navigate to about screen
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Plus</Text>
        <Text style={styles.headerSubtitle}>Paramètres et abonnement</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upgrade Banner (si free) */}
        {subscription === 'free' && (
          <TouchableOpacity
            style={styles.upgradeBanner}
            onPress={() => navigation.navigate('Subscription')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.upgradeBannerGradient}
            >
              <View style={styles.upgradeBannerContent}>
                <Text style={styles.upgradeBannerIcon}>⭐</Text>
                <View style={styles.upgradeBannerText}>
                  <Text style={styles.upgradeBannerTitle}>
                    Passe à Premium !
                  </Text>
                  <Text style={styles.upgradeBannerSubtitle}>
                    Débloque tous les modules et fonctionnalités
                  </Text>
                </View>
                <Text style={styles.upgradeBannerArrow}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemIcon}>{item.icon}</Text>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>NoBroke - Éducation financière</Text>
          <Text style={styles.footerSubtext}>Made with 💜 in France</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#e0e7ff',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  upgradeBanner: {
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  upgradeBannerGradient: {
    padding: 20,
  },
  upgradeBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeBannerIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  upgradeBannerText: {
    flex: 1,
  },
  upgradeBannerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  upgradeBannerSubtitle: {
    color: '#e0e7ff',
    fontSize: 14,
  },
  upgradeBannerArrow: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#9ca3af',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default MoreScreen;
