# 📚 Système de Modules NoBroke

## Vue d'ensemble

Le système de modules de NoBroke est organisé en **5 zones thématiques** progressives, contenant au total **59 modules** d'éducation financière.

---

## 🗺️ Les 5 Zones

### Zone 1 : Village des Fauchés 🏘️ (Niveau 1-10)
**Thématique** : Budget & Fondations
- **Modules** : 8 (5 gratuits, 3 premium)
- **Couleur** : Vert (#10B981)
- **Focus** : Maîtriser les bases du budget, tracker ses dépenses, règle 50/30/20

### Zone 2 : Forêt de l'Épargne 🌲 (Niveau 11-20)
**Thématique** : Épargne & Sécurité
- **Modules** : 8 (5 gratuits, 3 premium)
- **Couleur** : Bleu (#3B82F6)
- **Focus** : Fonds d'urgence, livrets, épargne automatique

### Zone 3 : Montagnes de la Dette ⛰️ (Niveau 21-30)
**Thématique** : Crédit & Dette
- **Modules** : 8 (5 gratuits, 3 premium)
- **Couleur** : Ambre (#F59E0B)
- **Focus** : Comprendre le crédit, cartes de crédit, remboursement

### Zone 4 : Ville de l'Investissement 🏙️ (Niveau 31-40)
**Thématique** : Investissements
- **Modules** : 15 (8 gratuits, 7 premium)
- **Couleur** : Violet (#8B5CF6)
- **Focus** : Actions, ETF, assurance-vie, immobilier

### Zone 5 : Château Liberté Financière 🏰 (Niveau 41-50)
**Thématique** : Liberté Financière
- **Modules** : 20 (9 gratuits, 11 premium)
- **Couleur** : Rose (#EC4899)
- **Focus** : Indépendance financière, retraite, stratégies avancées

---

## 📊 Structure d'un Module

Chaque module contient :

### 1. Métadonnées
```typescript
{
  id: string;              // Identifiant unique
  zone: number;            // Zone 1-5
  title: string;           // Titre du module
  description: string;     // Description courte
  isPremium: boolean;      // Gratuit ou Premium
  levelRequired: number;   // Niveau requis pour débloquer
  xpReward: number;        // XP gagnés à la complétion (50 par défaut)
  estimatedDuration: number; // Durée en minutes
  icon: string;            // Emoji
  orderInZone: number;     // Ordre dans la zone
}
```

### 2. Contenu Pédagogique (5 slides)
Chaque module contient **5 slides** avec des types spécifiques :

- **definition** 📖 : Définition des concepts
- **why** ❓ : Pourquoi c'est important
- **how** 🛠️ : Comment faire concrètement
- **example** 💡 : Exemples pratiques
- **action** 🎯 : Actions à faire immédiatement

### 3. Quiz (3 questions)
- 3 questions à choix multiples
- 4 réponses possibles
- 1 seule réponse correcte
- Explication détaillée pour chaque question

---

## 🎓 Modules MVP (15 créés)

### Zone 1 : Village des Fauchés
1. ✅ **C'est quoi un budget ?** (Niveau 1)
2. ✅ **Tracker ses dépenses** (Niveau 2)
3. ✅ **La règle 50/30/20** (Niveau 3)

### Zone 2 : Forêt de l'Épargne
4. ✅ **Le fonds d'urgence** (Niveau 11)
5. ✅ **Les types de comptes épargne** (Niveau 12)
6. ✅ **L'épargne automatique** (Niveau 13)

### Zone 3 : Montagnes de la Dette
7. ✅ **Comprendre le crédit** (Niveau 21)
8. ⏳ **Carte de crédit : Mode d'emploi** (Niveau 22) - Placeholder
9. ⏳ **Rembourser ses dettes** (Niveau 23) - Placeholder

### Zone 4 : Ville de l'Investissement
10. ✅ **Introduction aux investissements** (Niveau 31)
11. ⏳ **Les ETF pour débutants** (Niveau 32) - Placeholder

### Zone 5 : Château Liberté Financière
12. ✅ **La liberté financière** (Niveau 41)
13. ⏳ **Préparer sa retraite** (Niveau 42) - Placeholder

---

## 🔐 Système de Verrouillage

### Verrouillage par Niveau
Un module est **verrouillé** si :
```
userLevel < module.levelRequired
```

### Verrouillage Premium
Un module premium est verrouillé si :
```
module.isPremium && user.subscription_tier === 'free'
```

---

## 🎯 Système de Progression

### Complétion d'un Module

1. **Lecture des slides** (5 slides)
2. **Quiz de validation** (3 questions)
3. **Score minimum** : Pas de minimum requis (pour MVP)
4. **Récompenses** :
   - ✅ **+50 XP** automatiquement
   - ✅ Mise à jour du niveau si seuil atteint
   - ✅ Badge éventuel (à implémenter)

### Stockage Supabase

Table `user_progress` :
```sql
{
  user_id: UUID,
  module_id: STRING,
  completed: BOOLEAN,
  score: INTEGER (0-3),
  completed_at: TIMESTAMPTZ
}
```

---

## 🚀 Utilisation dans le Code

### 1. Hook `useModules`

```typescript
import { useModules } from '@/hooks/useModules';

const MyComponent = () => {
  const { modules, loading, getModulesByZone, completeModule } = useModules();

  // Récupérer les modules d'une zone
  const zone1Modules = getModulesByZone(1);

  // Compléter un module
  const handleComplete = async (moduleId: string, score: number) => {
    const result = await completeModule(moduleId, score);
    if (result?.success) {
      console.log('Module complété !');
    }
  };

  return (
    // ...
  );
};
```

### 2. Service `moduleService`

```typescript
import { getModules, canAccessModule, completeModule } from '@/services/moduleService';

// Récupérer tous les modules
const result = await getModules(userId, userLevel, subscriptionTier);

// Vérifier l'accès
const accessCheck = await canAccessModule(userId, moduleId);

// Compléter
const completion = await completeModule(userId, moduleId, quizScore);
```

### 3. Données statiques

```typescript
import { ZONES } from '@/data/zones';
import { MODULES, getModuleById } from '@/data/modulesData';

// Récupérer une zone
const zone1 = ZONES.find(z => z.id === 1);

// Récupérer un module
const module = getModuleById('module-1-1');
```

---

## 📱 Écrans à Créer (Prochaine Étape)

### 1. `LearnScreen.tsx` (Catalogue)
- Liste des 5 zones
- Progression globale
- Filtres (gratuit/premium, complété/non complété)

### 2. `ZoneDetailScreen.tsx`
- Liste des modules de la zone
- Carte visuelle de progression
- Icônes de verrouillage

### 3. `ModuleDetailScreen.tsx`
- Affichage des slides (swiper horizontal)
- Navigation slide par slide
- Bouton "Passer au quiz"

### 4. `ModuleQuizScreen.tsx`
- 3 questions successives
- Animation de feedback (correct/incorrect)
- Score final
- Bouton "Terminer" → Récompenses

### 5. `ModuleCompletionModal.tsx`
- Animation de célébration
- Affichage des XP gagnés
- Level up si applicable
- Badge débloqué si applicable

---

## 🎨 Design Guidelines

### Couleurs par Zone
- Zone 1 : `#10B981` (Emerald green)
- Zone 2 : `#3B82F6` (Blue)
- Zone 3 : `#F59E0B` (Amber)
- Zone 4 : `#8B5CF6` (Purple)
- Zone 5 : `#EC4899` (Pink)

### Icônes
- Module verrouillé : 🔒
- Module en cours : ⏳
- Module complété : ✅
- Module premium : 💎

### États visuels
- **Locked** : Opacité 50%, filtre gris
- **Premium Locked** : Badge "Premium" + 💎
- **Completed** : Checkmark vert
- **In Progress** : Barre de progression

---

## 📈 Statistiques Disponibles

Via `getUserModuleStats()` :
- **totalModules** : 59 (pour MVP : 15)
- **completedModules** : Nombre de modules terminés
- **progressPercentage** : % de complétion globale
- **totalXPEarned** : XP gagnés via modules
- **averageScore** : Score moyen aux quiz

---

## 🔮 Roadmap

### MVP (Actuel)
- ✅ 12 modules complets + 3 placeholders
- ✅ Système de progression
- ✅ Intégration XP
- ⏳ Écrans UI à créer

### Phase 2 (Post-MVP)
- 🔲 Compléter les 44 modules restants
- 🔲 Système de badges lié aux modules
- 🔲 Recommandations personnalisées
- 🔲 Mode hors-ligne (cache local)

### Phase 3 (Avancé)
- 🔲 Modules adaptatifs selon profil
- 🔲 Quiz personnalisés
- 🔲 Certificats de complétion
- 🔲 Communauté & discussions

---

## 🐛 Notes Techniques

### Performance
- Les modules sont chargés depuis `modulesData.ts` (local)
- La progression est fetch depuis Supabase
- Cache possible pour optimiser

### Flexibilité
- Facile d'ajouter de nouveaux modules
- Structure modulaire (1 module = 1 objet)
- Types TypeScript stricts

### Évolutivité
- Possibilité de migrer vers Supabase pour le contenu (si > 100 modules)
- Structure JSONB compatible avec la DB

---

## 📚 Ressources

- **Types** : `src/types/module.types.ts`
- **Données** : `src/data/modulesData.ts`, `src/data/zones.ts`
- **Service** : `src/services/moduleService.ts`
- **Hook** : `src/hooks/useModules.ts`

---

**Statut** : ✅ Structure complète créée | ⏳ Écrans UI à développer
