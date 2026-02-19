import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ModuleWithProgress } from '@/types/module.types';

interface ModuleCardProps {
  module: ModuleWithProgress;
  onPress: () => void;
}

/**
 * Carte d'affichage d'un module
 * Design mockup : badges COMPLÉTÉ / EN COURS / VERROUILLÉ
 */
const ModuleCard: React.FC<ModuleCardProps> = ({ module, onPress }) => {
  const isCompleted = module.progress?.completed;
  const isInProgress =
    !!module.progress && !module.progress.completed;
  const isLocked = module.locked || module.premiumLocked;

  const getStatusInfo = () => {
    if (module.locked) {
      return {
        badge: 'VERROUILLÉ',
        badgeColor: '#94a3b8',
        badgeBg: '#f1f5f9',
        iconBg: '#e2e8f0',
        rightContent: 'lock' as const,
        disabled: true,
      };
    }
    if (module.premiumLocked) {
      return {
        badge: 'VERROUILLÉ',
        badgeColor: '#94a3b8',
        badgeBg: '#f1f5f9',
        iconBg: '#e2e8f0',
        rightContent: 'lock' as const,
        disabled: true,
      };
    }
    if (isCompleted) {
      return {
        badge: 'COMPLÉTÉ',
        badgeColor: '#059669',
        badgeBg: '#d1fae5',
        iconBg: '#d1fae5',
        rightContent: 'checkmark' as const,
        rightValue: null,
        disabled: false,
      };
    }
    if (isInProgress) {
      const score = module.progress?.score ?? 0;
      const prog = Math.round((score / 3) * 100);
      return {
        badge: 'EN COURS',
        badgeColor: '#2563eb',
        badgeBg: '#dbeafe',
        iconBg: '#dbeafe',
        rightContent: 'percent' as const,
        rightValue: prog,
        disabled: false,
      };
    }
    return {
      badge: null,
      badgeColor: '#6366f1',
      badgeBg: '#e0e7ff',
      iconBg: '#e0e7ff',
      rightContent: 'play' as const,
      rightValue: null,
      disabled: false,
    };
  };

  const status = getStatusInfo();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isLocked && styles.containerLocked,
      ]}
      onPress={onPress}
      disabled={status.disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconCircle, { backgroundColor: status.iconBg }]}>
          <Text style={[styles.icon, isLocked && styles.iconLocked]}>
            {module.icon}
          </Text>
        </View>

        {/* Text content */}
        <View style={styles.textBlock}>
          {/* Badge row */}
          <View style={styles.badgeRow}>
            {status.badge && (
              <View style={[styles.badge, { backgroundColor: status.badgeBg }]}>
                {status.badge === 'COMPLÉTÉ' && (
                  <Ionicons
                    name="checkmark-circle"
                    size={12}
                    color={status.badgeColor}
                    style={styles.badgeIcon}
                  />
                )}
                {status.badge === 'EN COURS' && (
                  <Ionicons
                    name="time-outline"
                    size={12}
                    color={status.badgeColor}
                    style={styles.badgeIcon}
                  />
                )}
                {status.badge === 'VERROUILLÉ' && (
                  <Ionicons
                    name="lock-closed"
                    size={12}
                    color={status.badgeColor}
                    style={styles.badgeIcon}
                  />
                )}
                <Text
                  style={[
                    styles.badgeText,
                    { color: status.badgeColor },
                    isLocked && styles.badgeTextLocked,
                  ]}
                >
                  {status.badge}
                </Text>
              </View>
            )}
            <Text style={[styles.duration, isLocked && styles.durationLocked]}>
              • {module.estimatedDuration} min
            </Text>
          </View>

          {/* Title */}
          <Text
            style={[styles.title, isLocked && styles.titleLocked]}
            numberOfLines={2}
          >
            {module.title}
          </Text>

          {/* Description */}
          <Text
            style={[styles.description, isLocked && styles.descriptionLocked]}
            numberOfLines={2}
          >
            {module.description}
          </Text>
        </View>

        {/* Right content */}
        <View style={styles.rightContent}>
          {status.rightContent === 'checkmark' && (
            <Ionicons name="checkmark-circle" size={28} color="#10b981" />
          )}
          {status.rightContent === 'percent' && status.rightValue !== null && (
            <Text style={styles.percentText}>{status.rightValue}%</Text>
          )}
          {status.rightContent === 'lock' && (
            <Ionicons name="lock-closed" size={24} color="#94a3b8" />
          )}
          {status.rightContent === 'play' && !status.badge && (
            <Ionicons name="play-circle" size={28} color="#6366f1" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  containerLocked: {
    backgroundColor: '#f8fafc',
    opacity: 0.9,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  iconLocked: {
    opacity: 0.7,
  },
  textBlock: {
    flex: 1,
    marginRight: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextLocked: {
    color: '#94a3b8',
  },
  duration: {
    fontSize: 12,
    color: '#64748b',
  },
  durationLocked: {
    color: '#94a3b8',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  titleLocked: {
    color: '#64748b',
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  descriptionLocked: {
    color: '#94a3b8',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  percentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
});

export default ModuleCard;
