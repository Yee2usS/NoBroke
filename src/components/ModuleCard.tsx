import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ModuleWithProgress } from '@/types/module.types';
import { ZONES } from '@/data/zones';

interface ModuleCardProps {
  module: ModuleWithProgress;
  onPress: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onPress }) => {
  const isCompleted  = module.progress?.completed;
  const isInProgress = !!module.progress && !module.progress.completed;

  const getStatusInfo = () => {
    // ⭐ Verrouillé par premium — toujours prioritaire visuellement
    if (module.premiumLocked) {
      return {
        type: 'premium-locked' as const,
        badge: 'PREMIUM',
        badgeColor: '#b45309',
        badgeBg: '#fef3c7',
        iconBg: '#fde68a',
        disabled: true,
      };
    }

    // 🔒 Zone verrouillée par niveau
    if (module.locked && module.lockReason === 'zone_level') {
      const zone = ZONES.find((z) => z.id === module.zone);
      return {
        type: 'level-locked' as const,
        badge: `NIV. ${zone?.levelRequired ?? module.levelRequired}`,
        badgeColor: '#64748b',
        badgeBg: '#f1f5f9',
        iconBg: '#e2e8f0',
        disabled: true,
      };
    }

    // 🔗 Module précédent non complété — verrouillage séquentiel
    if (module.locked && module.lockReason === 'sequential') {
      return {
        type: 'sequential-locked' as const,
        badge: null,
        badgeColor: '#94a3b8',
        badgeBg: '#f8fafc',
        iconBg: '#e2e8f0',
        disabled: true,
      };
    }

    // Fallback générique locked
    if (module.locked) {
      return {
        type: 'level-locked' as const,
        badge: null,
        badgeColor: '#64748b',
        badgeBg: '#f1f5f9',
        iconBg: '#e2e8f0',
        disabled: true,
      };
    }

    // ✅ Complété
    if (isCompleted) {
      return {
        type: 'completed' as const,
        badge: 'COMPLÉTÉ',
        badgeColor: '#059669',
        badgeBg: '#d1fae5',
        iconBg: '#d1fae5',
        disabled: false,
      };
    }

    // 🔵 En cours
    if (isInProgress) {
      return {
        type: 'in-progress' as const,
        badge: 'EN COURS',
        badgeColor: '#2563eb',
        badgeBg: '#dbeafe',
        iconBg: '#dbeafe',
        disabled: false,
      };
    }

    // ▶️ Disponible
    return {
      type: 'available' as const,
      badge: null,
      badgeColor: '#6366f1',
      badgeBg: '#e0e7ff',
      iconBg: '#e0e7ff',
      disabled: false,
    };
  };

  const status = getStatusInfo();
  const isLevelLocked      = status.type === 'level-locked';
  const isSequentialLocked = status.type === 'sequential-locked';
  const isPremiumLocked    = status.type === 'premium-locked';
  const isAnyLocked        = isLevelLocked || isSequentialLocked || isPremiumLocked;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        (isLevelLocked || isSequentialLocked) && styles.containerLevelLocked,
        isPremiumLocked && styles.containerPremiumLocked,
      ]}
      onPress={onPress}
      disabled={status.disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Icône */}
        <View style={[styles.iconCircle, { backgroundColor: status.iconBg }]}>
          <Text style={[styles.icon, isAnyLocked && styles.iconLocked]}>
            {module.icon}
          </Text>
        </View>

        {/* Texte */}
        <View style={styles.textBlock}>
          {/* Ligne badge + durée */}
          <View style={styles.badgeRow}>
            {status.badge && (
              <View style={[styles.badge, { backgroundColor: status.badgeBg }]}>
                {/* Icône dans le badge */}
                {isLevelLocked && (
                  <Ionicons name="lock-closed" size={11} color={status.badgeColor} style={styles.badgeIcon} />
                )}
                {isPremiumLocked && (
                  <Text style={styles.starIcon}>⭐</Text>
                )}
                {status.type === 'completed' && (
                  <Ionicons name="checkmark-circle" size={12} color={status.badgeColor} style={styles.badgeIcon} />
                )}
                {status.type === 'in-progress' && (
                  <Ionicons name="time-outline" size={12} color={status.badgeColor} style={styles.badgeIcon} />
                )}
                <Text style={[styles.badgeText, { color: status.badgeColor }]}>
                  {status.badge}
                </Text>
              </View>
            )}
            <Text style={[styles.duration, isAnyLocked && styles.durationLocked]}>
              • {module.estimatedDuration} min
            </Text>
          </View>

          {/* Titre */}
          <Text
            style={[styles.title, isLevelLocked && styles.titleLevelLocked, isPremiumLocked && styles.titlePremiumLocked]}
            numberOfLines={2}
          >
            {module.title}
          </Text>

          {/* Description */}
          <Text
            style={[styles.description, isAnyLocked && styles.descriptionLocked]}
            numberOfLines={2}
          >
            {module.description}
          </Text>

          {/* Hint pour verrouillage séquentiel */}
          {isSequentialLocked && (
            <Text style={styles.sequentialHint}>Complète le module précédent</Text>
          )}

          {/* Hint pour verrouillage premium */}
          {isPremiumLocked && (
            <Text style={styles.premiumHint}>
              {module.locked
                ? `Premium requis · Niv. ${ZONES.find((z) => z.id === module.zone)?.levelRequired ?? module.levelRequired} nécessaire`
                : 'Passe en Premium pour débloquer'}
            </Text>
          )}
        </View>

        {/* Droite */}
        <View style={styles.rightContent}>
          {status.type === 'completed' && (
            <Ionicons name="checkmark-circle" size={28} color="#10b981" />
          )}
          {status.type === 'in-progress' && (
            <Text style={styles.percentText}>
              {Math.round(((module.progress?.score ?? 0) / 3) * 100)}%
            </Text>
          )}
          {(isLevelLocked || isSequentialLocked) && (
            <View style={styles.levelLockBadge}>
              <Ionicons name="lock-closed" size={16} color="#94a3b8" />
            </View>
          )}
          {isPremiumLocked && (
            <View style={styles.premiumLockBadge}>
              <Text style={styles.premiumLockStar}>⭐</Text>
            </View>
          )}
          {status.type === 'available' && (
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

  // 🔒 Verrou niveau — fond gris froid, opacity réduite
  containerLevelLocked: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    opacity: 0.75,
  },

  // ⭐ Verrou premium — fond chaud doré, bien visible
  containerPremiumLocked: {
    backgroundColor: '#fffbeb',
    borderColor: '#fcd34d',
    borderWidth: 1.5,
    opacity: 1,
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
    opacity: 0.6,
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
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  badgeIcon: {
    marginRight: 2,
  },
  starIcon: {
    fontSize: 10,
    marginRight: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
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
  titleLevelLocked: {
    color: '#94a3b8',
  },
  titlePremiumLocked: {
    color: '#78350f',
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  descriptionLocked: {
    color: '#94a3b8',
  },
  sequentialHint: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 4,
    fontStyle: 'italic',
  },
  premiumHint: {
    fontSize: 11,
    color: '#b45309',
    fontWeight: '600',
    marginTop: 4,
  },

  // Droite
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  levelLockBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumLockBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fde68a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumLockStar: {
    fontSize: 16,
  },
});

export default ModuleCard;
