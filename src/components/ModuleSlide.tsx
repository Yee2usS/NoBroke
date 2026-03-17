import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Slide } from '@/types/module.types';

const { width } = Dimensions.get('window');

interface ModuleSlideProps {
  slide: Slide;
  index: number;
  total: number;
}

// Configuration visuelle par type de slide
const SLIDE_CONFIG = {
  definition: {
    gradient: ['#6366F1', '#4F46E5'] as [string, string],
    icon: '📖',
    label: 'DÉFINITION',
    accent: '#6366F1',
    bg: '#EEF2FF',
    textAccent: '#4338CA',
  },
  why: {
    gradient: ['#8B5CF6', '#7C3AED'] as [string, string],
    icon: '🤔',
    label: 'POURQUOI ?',
    accent: '#8B5CF6',
    bg: '#F5F3FF',
    textAccent: '#6D28D9',
  },
  how: {
    gradient: ['#10B981', '#059669'] as [string, string],
    icon: '⚙️',
    label: 'COMMENT ?',
    accent: '#10B981',
    bg: '#ECFDF5',
    textAccent: '#047857',
  },
  example: {
    gradient: ['#F59E0B', '#D97706'] as [string, string],
    icon: '💡',
    label: 'EXEMPLE',
    accent: '#F59E0B',
    bg: '#FFFBEB',
    textAccent: '#B45309',
  },
  action: {
    gradient: ['#EF4444', '#DC2626'] as [string, string],
    icon: '🎯',
    label: 'PASSAGE À L\'ACTION',
    accent: '#EF4444',
    bg: '#FEF2F2',
    textAccent: '#B91C1C',
  },
};

// Rendu inline du texte avec gras (**...**)
function InlineText({
  text,
  style,
  boldStyle,
}: {
  text: string;
  style?: any;
  boldStyle?: any;
}) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          <Text key={i}>{part}</Text>
        ) : (
          <Text key={i} style={[boldStyle || styles.defaultBold]}>
            {part}
          </Text>
        )
      )}
    </Text>
  );
}

// Rendu structuré du contenu selon le type
function renderContent(content: string, config: typeof SLIDE_CONFIG.definition) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // — Étape numérotée : **Étape N** ou **Étape N** : titre
    if (/^\*\*Étape\s+\d+/.test(trimmed)) {
      const match = trimmed.match(/^\*\*Étape\s+(\d+)\*\*\s*:?\s*(.*)/);
      const stepNum = match?.[1] ?? '';
      const stepTitle = match?.[2]?.replace(/\*\*/g, '') ?? '';

      const subItems: string[] = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('  - '))) {
        subItems.push(lines[i].replace(/^\s*- /, '').trim());
        i++;
      }

      elements.push(
        <View key={`step-${i}`} style={styles.stepCard}>
          <View style={[styles.stepBadge, { backgroundColor: config.accent }]}>
            <Text style={styles.stepBadgeText}>{stepNum}</Text>
          </View>
          <View style={styles.stepBody}>
            {stepTitle ? (
              <Text style={[styles.stepTitle, { color: config.textAccent }]}>{stepTitle}</Text>
            ) : null}
            {subItems.map((item, j) => (
              <View key={j} style={styles.subItem}>
                <Text style={[styles.subItemDot, { color: config.accent }]}>›</Text>
                <InlineText
                  text={item}
                  style={styles.subItemText}
                  boldStyle={{ fontWeight: '700', color: config.textAccent }}
                />
              </View>
            ))}
          </View>
        </View>
      );
      continue;
    }

    // — Liste numérotée 1. 2. 3.
    if (/^\d+\.\s/.test(trimmed)) {
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      const num = numMatch?.[1] ?? '';
      const text = numMatch?.[2] ?? '';
      elements.push(
        <View key={`num-${i}`} style={[styles.numberedItem, { backgroundColor: config.bg }]}>
          <View style={[styles.numberedBadge, { backgroundColor: config.accent }]}>
            <Text style={styles.numberedBadgeText}>{num}</Text>
          </View>
          <InlineText
            text={text}
            style={styles.numberedText}
            boldStyle={{ fontWeight: '700', color: config.textAccent }}
          />
        </View>
      );
      i++;
      continue;
    }

    // — Checkitem ✅ ...
    if (trimmed.startsWith('✅ ')) {
      const text = trimmed.slice(2);
      elements.push(
        <View key={`check-${i}`} style={[styles.checkItem, { backgroundColor: config.bg }]}>
          <View style={[styles.checkIcon, { backgroundColor: config.accent }]}>
            <Text style={styles.checkIconText}>✓</Text>
          </View>
          <InlineText
            text={text}
            style={styles.checkText}
            boldStyle={{ fontWeight: '700', color: config.textAccent }}
          />
        </View>
      );
      i++;
      continue;
    }

    // — Ligne budget : "- Poste : montant€"
    if (/^-\s.+:\s*\d[\d\s]*€/.test(trimmed)) {
      const text = trimmed.slice(2).trim();
      const colonIdx = text.lastIndexOf(':');
      const label = colonIdx >= 0 ? text.slice(0, colonIdx).trim() : text;
      const amount = colonIdx >= 0 ? text.slice(colonIdx + 1).trim() : '';
      elements.push(
        <View key={`budget-${i}`} style={styles.budgetLine}>
          <Text style={styles.budgetLabel}>{label}</Text>
          <Text style={[styles.budgetAmount, { color: config.textAccent }]}>{amount}</Text>
        </View>
      );
      i++;
      continue;
    }

    // — Liste à tirets classique
    if (trimmed.startsWith('- ')) {
      const text = trimmed.slice(2);
      elements.push(
        <View key={`list-${i}`} style={styles.bulletItem}>
          <View style={[styles.bullet, { backgroundColor: config.accent }]} />
          <InlineText
            text={text}
            style={styles.bulletText}
            boldStyle={{ fontWeight: '700', color: config.textAccent }}
          />
        </View>
      );
      i++;
      continue;
    }

    // — Titre de section **Titre** seul ou **Titre** (xxx€)
    if (/^\*\*[^*]+\*\*\s*[:(]?$/.test(trimmed) || /^\*\*[^*]+\*\*\s*\([\d\s€]+\)/.test(trimmed)) {
      const clean = trimmed.replace(/\*\*/g, '');
      elements.push(
        <Text key={`section-${i}`} style={[styles.sectionTitle, { color: config.textAccent }]}>
          {clean}
        </Text>
      );
      i++;
      continue;
    }

    // — Stat choc (ligne courte avec %)
    if (trimmed.match(/\d+%/) && trimmed.length < 120 && !trimmed.startsWith('💡')) {
      elements.push(
        <LinearGradient
          key={`stat-${i}`}
          colors={config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statBox}
        >
          <Text style={styles.statText}>📊 {trimmed.replace(/\*\*/g, '')}</Text>
        </LinearGradient>
      );
      i++;
      continue;
    }

    // — Astuce / Action 💡📝💰
    if (trimmed.startsWith('💡') || trimmed.startsWith('📝') || trimmed.startsWith('💰') || trimmed.startsWith('⚠️')) {
      elements.push(
        <View key={`tip-${i}`} style={[styles.tipBox, { borderColor: config.accent, backgroundColor: config.bg }]}>
          <InlineText
            text={trimmed}
            style={styles.tipText}
            boldStyle={{ fontWeight: '700', color: config.textAccent }}
          />
        </View>
      );
      i++;
      continue;
    }

    // — Équation / formule (contient = et symboles)
    if (trimmed.includes(' = ') && trimmed.length < 80) {
      elements.push(
        <View key={`formula-${i}`} style={[styles.formulaBox, { borderColor: config.accent, backgroundColor: config.bg }]}>
          <Text style={[styles.formulaText, { color: config.textAccent }]}>
            {trimmed.replace(/\*\*/g, '')}
          </Text>
        </View>
      );
      i++;
      continue;
    }

    // — Texte normal
    elements.push(
      <InlineText
        key={`text-${i}`}
        text={trimmed}
        style={styles.bodyText}
        boldStyle={[styles.bodyBold, { color: config.textAccent }]}
      />
    );
    i++;
  }

  return elements;
}

const ModuleSlide: React.FC<ModuleSlideProps> = ({ slide, index, total }) => {
  const config = SLIDE_CONFIG[slide.type] ?? SLIDE_CONFIG.definition;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header gradient */}
      <LinearGradient colors={config.gradient} style={styles.header}>
        {/* Cercles décoratifs */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <View style={styles.headerTop}>
          <View style={styles.labelBadge}>
            <Text style={styles.labelText}>{config.label}</Text>
          </View>
          <Text style={styles.slideCounter}>
            {index + 1} / {total}
          </Text>
        </View>

        <View style={styles.headerMain}>
          <View style={styles.iconCircle}>
            <Text style={styles.headerIcon}>{config.icon}</Text>
          </View>
          <Text style={styles.slideTitle}>{slide.title}</Text>
        </View>
      </LinearGradient>

      {/* Contenu structuré */}
      <View style={styles.contentArea}>{renderContent(slide.content, config)}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // ── Header ──────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  decorCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.10)',
    top: -30,
    right: -20,
  },
  decorCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -10,
    left: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  labelBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1.2,
  },
  slideCounter: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  headerMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerIcon: {
    fontSize: 26,
  },
  slideTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 27,
    paddingTop: 4,
  },

  // ── Content area ────────────────────────────────────
  contentArea: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },

  // — Texte normal
  bodyText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
  },
  bodyBold: {
    fontWeight: '700',
  },
  defaultBold: {
    fontWeight: '700',
  },

  // — Titre de section
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 2,
    letterSpacing: 0.3,
  },

  // — Étapes
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginVertical: 2,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  stepBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  stepBody: {
    flex: 1,
    gap: 4,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  subItem: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
    marginTop: 2,
  },
  subItemDot: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  subItemText: {
    flex: 1,
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },

  // — Liste numérotée
  numberedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 12,
    padding: 12,
    marginVertical: 2,
  },
  numberedBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  numberedBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  numberedText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    paddingTop: 2,
  },

  // — Checkitem
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 12,
    padding: 12,
    marginVertical: 2,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  checkIconText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  checkText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },

  // — Bullet list
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: 3,
  },
  bullet: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginTop: 8,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },

  // — Budget lines
  budgetLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  budgetLabel: {
    fontSize: 13,
    color: '#4B5563',
    flex: 1,
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: '700',
  },

  // — Stat box
  statBox: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
  },

  // — Astuce
  tipBox: {
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 14,
    marginVertical: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },

  // — Formule
  formulaBox: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    alignItems: 'center',
  },
  formulaText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ModuleSlide;
