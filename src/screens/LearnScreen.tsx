import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useGameStore } from '@/store/useGameStore';
import { Module } from '@/types';
import { DIFFICULTY_LEVELS, MODULE_CATEGORIES } from '@/utils/constants';

const LearnScreen: React.FC = () => {
  const { modules, userModules, fetchModules, fetchUserModules, isLoading } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchModules();
    fetchUserModules();
  }, []);

  const filteredModules = selectedCategory === 'all'
    ? modules
    : modules.filter(m => m.category === selectedCategory);

  const categories = ['all', ...Object.keys(MODULE_CATEGORIES)];

  const getModuleProgress = (moduleId: string) => {
    const userModule = userModules.find(um => um.module_id === moduleId);
    return userModule?.progress_percentage || 0;
  };

  const isModuleCompleted = (moduleId: string) => {
    const userModule = userModules.find(um => um.module_id === moduleId);
    return userModule?.completed || false;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          📚 Modules d'Apprentissage
        </Text>
        <Text style={styles.headerSubtitle}>
          {modules.length} modules disponibles
        </Text>
      </View>

      {/* Categories Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                isSelected && styles.categoryButtonActive
              ]}
            >
              <Text style={[
                styles.categoryText,
                isSelected && styles.categoryTextActive
              ]}>
                {category === 'all' 
                  ? 'Tous' 
                  : MODULE_CATEGORIES[category as keyof typeof MODULE_CATEGORIES]
                }
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modules List */}
      <ScrollView style={styles.modulesList} contentContainerStyle={styles.modulesContent}>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : filteredModules.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Aucun module disponible</Text>
          </View>
        ) : (
          filteredModules.map((module) => {
            const progress = getModuleProgress(module.id);
            const completed = isModuleCompleted(module.id);
            const difficulty = DIFFICULTY_LEVELS[module.difficulty];

            return (
              <TouchableOpacity
                key={module.id}
                style={[
                  styles.moduleCard,
                  module.is_locked && styles.moduleCardLocked
                ]}
                disabled={module.is_locked}
              >
                <View style={styles.moduleContent}>
                  <View style={styles.moduleHeader}>
                    <View style={styles.moduleTitleRow}>
                      <Text style={styles.moduleIcon}>{module.icon}</Text>
                      <View style={styles.moduleTitleContainer}>
                        <Text style={styles.moduleTitle}>
                          {module.title}
                        </Text>
                      </View>
                      {completed && (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.moduleDescription}>
                      {module.description}
                    </Text>
                  </View>

                  <View style={styles.moduleFooter}>
                    <View style={styles.moduleMetaRow}>
                      <View style={[
                        styles.difficultyBadge,
                        { backgroundColor: difficulty.color + '20' }
                      ]}>
                        <Text style={[
                          styles.difficultyText,
                          { color: difficulty.color }
                        ]}>
                          {difficulty.label}
                        </Text>
                      </View>
                      <Text style={styles.metaText}>
                        ⏱️ {module.duration_minutes} min
                      </Text>
                      <Text style={styles.xpText}>
                        +{module.xp_reward} XP
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  {progress > 0 && !completed && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill,
                            { width: `${progress}%` }
                          ]}
                        />
                      </View>
                    </View>
                  )}

                  {module.is_locked && (
                    <View style={styles.lockIcon}>
                      <Text style={styles.lockEmoji}>🔒</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
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
    paddingBottom: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#c7d2fe',
    fontSize: 16,
  },
  categoriesScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoriesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    fontWeight: '600',
    color: '#4b5563',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  modulesList: {
    flex: 1,
  },
  modulesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    color: '#6b7280',
  },
  moduleCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  moduleCardLocked: {
    opacity: 0.5,
  },
  moduleContent: {
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  moduleHeader: {
    marginBottom: 12,
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  moduleIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  moduleTitleContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  completedBadge: {
    backgroundColor: '#10b981',
    borderRadius: 999,
    padding: 4,
  },
  completedText: {
    color: '#ffffff',
    fontSize: 12,
  },
  moduleDescription: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 12,
  },
  moduleFooter: {
    marginTop: 8,
  },
  moduleMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metaText: {
    color: '#6b7280',
    fontSize: 14,
  },
  xpText: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 999,
  },
  lockIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  lockEmoji: {
    fontSize: 28,
  },
});

export default LearnScreen;
