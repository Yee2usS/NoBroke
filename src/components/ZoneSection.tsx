import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Zone } from '@/types/module.types';
import { ModuleWithProgress } from '@/types/module.types';
import ModuleCard from './ModuleCard';

interface ZoneSectionProps {
  zone: Zone;
  modules: ModuleWithProgress[];
  expanded: boolean;
  onToggle: () => void;
  onModulePress: (moduleId: string) => void;
  userLevel: number;
}

/**
 * Section accordion pour une zone de modules
 * Design mockup : gradient violet-bleu, ZONE X, chevron, locked
 */
const ZoneSection: React.FC<ZoneSectionProps> = ({
  zone,
  modules,
  expanded,
  onToggle,
  onModulePress,
  userLevel,
}) => {
  const isLocked = userLevel < zone.levelRequired;

  return (
    <View style={styles.container}>
      {/* Zone Header */}
      <TouchableOpacity
        style={[styles.header, isLocked && styles.headerLocked]}
        onPress={onToggle}
        activeOpacity={0.9}
      >
        {isLocked ? (
          <View style={styles.lockedHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleLocked}>
                <Text style={styles.zoneIcon}>{zone.icon}</Text>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.zoneLabelLocked}>ZONE {zone.id}</Text>
                <Text style={styles.zoneNameLocked}>{zone.name}</Text>
              </View>
            </View>
            <Ionicons name="lock-closed" size={22} color="#94a3b8" />
          </View>
        ) : (
          <LinearGradient
            colors={['#8B5CF6', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <Text style={styles.zoneIcon}>{zone.icon}</Text>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.zoneLabel}>ZONE {zone.id}</Text>
                <Text style={styles.zoneName}>{zone.name}</Text>
              </View>
            </View>
            <Text style={styles.chevron}>{expanded ? '⌄' : '>'}</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>

      {/* Modules List (Collapsible) */}
      {expanded && !isLocked && (
        <View style={styles.modulesList}>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onPress={() => onModulePress(module.id)}
            />
          ))}
        </View>
      )}

      {expanded && isLocked && (
        <View style={styles.lockedMessage}>
          <Ionicons name="lock-closed" size={24} color="#94a3b8" />
          <Text style={styles.lockedMessageText}>
            Atteins le niveau {zone.levelRequired} pour débloquer cette zone
          </Text>
          <Text style={styles.lockedMessageSubtext}>
            Tu es niveau {userLevel}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerLocked: {
    opacity: 1,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  lockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconCircleLocked: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  zoneIcon: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  zoneLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  zoneNameLocked: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748b',
  },
  zoneLabelLocked: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  chevron: {
    fontSize: 24,
    color: '#ffffff',
    marginLeft: 8,
  },
  modulesList: {
    marginTop: 16,
    paddingLeft: 4,
  },
  lockedMessage: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  lockedMessageText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  lockedMessageSubtext: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
});

export default ZoneSection;
