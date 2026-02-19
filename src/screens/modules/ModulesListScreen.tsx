import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types';
import { useModules } from '@/hooks/useModules';
import { useUserStore } from '@/store/useUserStore';
import { useSubscription } from '@/hooks/useSubscription';
import { ZONES } from '@/data/zones';
import ZoneSection from '@/components/ZoneSection';
import PaywallModal from '@/components/PaywallModal';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ModulesListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { progress } = useUserStore();
  const { modules, loading, stats, getModulesByZone } = useModules();
  const { canAccessPremium } = useSubscription();
  const [expandedZones, setExpandedZones] = useState<number[]>([1]);
  const [paywallVisible, setPaywallVisible] = useState(false);

  const totalModules = stats?.totalModules ?? modules.length;
  const completedCount = stats?.completedModules ?? 0;

  const toggleZone = (zoneId: number) => {
    if (expandedZones.includes(zoneId)) {
      setExpandedZones(expandedZones.filter((id) => id !== zoneId));
    } else {
      setExpandedZones([...expandedZones, zoneId]);
    }
  };

  const handleModulePress = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);

    if (module?.isPremium && !canAccessPremium) {
      setPaywallVisible(true);
      return;
    }

    navigation.navigate('ModuleDetail' as any, { moduleId });
  };

  const handleUpgrade = () => {
    setPaywallVisible(false);
    navigation.navigate('Subscription' as any);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs' as any);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement des modules...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={handleBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Tous les modules</Text>
          <Text style={styles.headerSubtitle}>
            {totalModules} MODULES DISPONIBLES
          </Text>
        </View>

        <TouchableOpacity
          style={styles.headerRight}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="search" size={22} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Zones List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {ZONES.map((zone) => (
          <ZoneSection
            key={zone.id}
            zone={zone}
            modules={getModulesByZone(zone.id)}
            expanded={expandedZones.includes(zone.id)}
            onToggle={() => toggleZone(zone.id)}
            onModulePress={handleModulePress}
            userLevel={progress?.level || 1}
          />
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <PaywallModal
        visible={paywallVisible}
        onClose={() => setPaywallVisible(false)}
        onUpgrade={handleUpgrade}
        title="Module Premium"
        message="Ce module est réservé aux abonnés Premium"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default ModulesListScreen;
