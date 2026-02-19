import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '@/types';
import { useModules } from '@/hooks/useModules';
import { getZoneById } from '@/data/zones';
import ModuleSlide from '@/components/ModuleSlide';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ModuleDetailRouteProp = RouteProp<{ ModuleDetail: { moduleId: string } }, 'ModuleDetail'>;

const { width } = Dimensions.get('window');

/**
 * Écran de détail d'un module avec slides
 */
const ModuleDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ModuleDetailRouteProp>();
  const { moduleId } = route.params;
  const { getModule } = useModules();

  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    setLoading(true);
    const moduleData = await getModule(moduleId);
    setModule(moduleData);
    setLoading(false);
  };

  const handleNext = () => {
    if (currentSlide < module.content.slides.length - 1) {
      const nextIndex = currentSlide + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentSlide(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const prevIndex = currentSlide - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentSlide(prevIndex);
    }
  };

  const handleStartQuiz = () => {
    navigation.navigate('ModuleQuiz' as any, { moduleId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement du module...</Text>
      </View>
    );
  }

  if (!module) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Module introuvable</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const zone = getZoneById(module.zone);
  const totalSlides = module.content.slides.length;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={zone ? [zone.color, zone.color + 'DD'] : ['#6366f1', '#6366f1DD']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Text style={styles.backIconText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.moduleTitle} numberOfLines={2}>
            {module.icon} {module.title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>⏱️ {module.estimatedDuration} min</Text>
            <Text style={styles.metaText}>✨ +{module.xpReward} XP</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Slides (Horizontal FlatList) */}
      <FlatList
        ref={flatListRef}
        data={module.content.slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ width }}>
            <ModuleSlide slide={item} index={index} total={totalSlides} />
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
        scrollEventThrottle={16}
      />

      {/* Navigation Footer */}
      <View style={styles.footer}>
        {/* Progress Dots */}
        <View style={styles.dotsContainer}>
          {module.content.slides.map((_: any, index: number) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {currentSlide > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>← Précédent</Text>
            </TouchableOpacity>
          )}

          {!isLastSlide && (
            <TouchableOpacity
              style={[styles.navButton, styles.navButtonPrimary]}
              onPress={handleNext}
            >
              <Text style={styles.navButtonTextPrimary}>Suivant →</Text>
            </TouchableOpacity>
          )}

          {isLastSlide && (
            <TouchableOpacity style={styles.quizButton} onPress={handleStartQuiz}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.quizButtonGradient}
              >
                <Text style={styles.quizButtonText}>🎯 Passer au quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  backIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    fontSize: 28,
    color: '#ffffff',
  },
  headerContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaText: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#6366f1',
    width: 24,
  },
  dotInactive: {
    backgroundColor: '#d1d5db',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  navButtonPrimary: {
    backgroundColor: '#6366f1',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  navButtonTextPrimary: {
    color: '#ffffff',
  },
  quizButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quizButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ModuleDetailScreen;
