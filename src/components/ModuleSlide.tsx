import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Slide } from '@/types/module.types';

interface ModuleSlideProps {
  slide: Slide;
  index: number;
  total: number;
}

/**
 * Component pour afficher une slide de module
 */
const ModuleSlide: React.FC<ModuleSlideProps> = ({ slide, index, total }) => {
  const getSlideIcon = () => {
    switch (slide.type) {
      case 'definition':
        return '📖';
      case 'why':
        return '🤔';
      case 'how':
        return '⚙️';
      case 'example':
        return '💡';
      case 'action':
        return '✅';
      default:
        return '📄';
    }
  };

  const getSlideColor = () => {
    switch (slide.type) {
      case 'definition':
        return '#3B82F6'; // Blue
      case 'why':
        return '#8B5CF6'; // Purple
      case 'how':
        return '#10B981'; // Green
      case 'example':
        return '#F59E0B'; // Amber
      case 'action':
        return '#EF4444'; // Red
      default:
        return '#6366f1';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: getSlideColor() }]}>
        <Text style={styles.slideIcon}>{getSlideIcon()}</Text>
        <View style={styles.headerTextContainer}>
          <Text style={styles.slideNumber}>
            Slide {index + 1}/{total}
          </Text>
          <Text style={styles.slideTitle}>{slide.title}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{slide.content}</Text>
      </View>

      {/* Image (if provided) */}
      {slide.imageUrl && (
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>📷 Image à venir</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  slideIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  slideNumber: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
    fontWeight: '600',
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 28,
  },
  contentBox: {
    padding: 24,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
  imageContainer: {
    marginHorizontal: 24,
    marginTop: 12,
    padding: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default ModuleSlide;
