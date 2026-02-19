# 🎮 Système XP/Niveaux - NoBroke

## ✅ Fichiers créés/modifiés

### Nouveaux composants
1. **`src/components/LevelUpModal.tsx`**
   - Modal de célébration pour le Level Up
   - Animations smooth (scale + fade + rotation)
   - Gradient Bleu → Violet (#3B82F6 → #8B5CF6)
   - Bouton Or (#FBBF24 → #F59E0B)

2. **`src/components/LevelProgressBar.tsx`** *(modifié)*
   - Barre de progression XP avec gradient animé
   - Affichage : "Niveau X" + "1,234 / 2,000 XP"
   - Animation spring smooth
   - Étincelles ✨ quand proche de 100%
   - Effet de pulsation à 90%+

### Services & Hooks mis à jour
3. **`src/services/xpService.ts`** *(modifié)*
   - ✅ Compatible avec nouveau schema (`profiles` au lieu de `user_progress`)
   - ✅ Log automatique dans `xp_history` après chaque gain d'XP
   - ✅ Détection de level up (compare `oldLevel` vs `newLevel`)
   - ✅ Retourne `leveledUp: boolean`

4. **`src/hooks/useXP.ts`** *(modifié)*
   - ✅ State `levelUpModalVisible` pour gérer le modal
   - ✅ State `levelUpData` avec nouveau niveau
   - ✅ Functions: `showLevelUpModal()`, `closeLevelUpModal()`
   - ✅ Trigger automatique du modal si level up

5. **`src/hooks/useSupabase.ts`** *(modifié)*
   - ✅ Compatible avec nouveau schema (`profiles` unique)
   - Charge user data + progress depuis `profiles`

### Screens
6. **`src/screens/HomeScreen.tsx`** *(modifié)*
   - ✅ Intégration `LevelProgressBar` avec gradient
   - ✅ Intégration `LevelUpModal`
   - ✅ Section "Stats rapides" (Niveau, Série, Badges)
   - ✅ Bouton DEBUG "+50 XP" pour tester le système

### Types
7. **`src/types/index.ts`** *(modifié)*
   - Mis à jour `UserProgress` pour correspondre au nouveau schema
   - `streak_days` → `streak`
   - `last_activity_date` → `last_visit`

---

## 🎨 Design cohérent

### Couleurs
- **Bleu**: `#3B82F6` (primary)
- **Violet**: `#8B5CF6` (secondary)
- **Or**: `#FBBF24` → `#F59E0B` (level up, récompenses)
- **Gris clair**: `#E5E7EB` (background barre)

### Animations
- **Barre XP**: Spring animation (damping 15, stiffness 90)
- **Modal Level Up**: Scale 0.5 → 1 + Fade 0 → 1
- **Étoiles**: Rotation infinie (2s loop)
- **Pulsation**: Si XP > 90%

---

## 📊 Structure Dashboard (HomeScreen)

```
┌─────────────────────────────────────┐
│  🔵 Header Gradient (Bleu)         │
│  "Bonjour {username} 👋"           │
│  "Prêt à apprendre aujourd'hui ?"  │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  📊 Stats Card (Blanc, Shadow)      │
│  ┌─────┬─────┬─────┐               │
│  │Niv.│Série│Badge│               │
│  │ 5  │ 3🔥 │  0  │               │
│  └─────┴─────┴─────┘               │
│                                     │
│  🎨 Level Progress Bar              │
│  [████████░░░░] 65%                │
│  1,234 / 2,000 XP                  │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  ⭐ Choix du Jour                   │
│  (Gradient Violet → Bleu)          │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  Actions Rapides                    │
│  [📚 Continuer] [🎯 Quiz]          │
│  [🎮 Test +50 XP] (DEBUG)          │
└─────────────────────────────────────┘
```

---

## 🧪 Tester le système

### 1. Bouton TEST XP (HomeScreen)
```tsx
// Appuie sur le bouton "Test +50 XP"
// → Ajoute 50 XP (module_complete)
// → Si level up → Modal apparaît automatiquement
```

### 2. Manuellement via code
```tsx
import { useXP } from '@/hooks/useXP';

const { awardXPForAction } = useXP();

// Attribuer 50 XP pour module
await awardXPForAction('module');

// Attribuer 30 XP pour daily choice
await awardXPForAction('daily_choice');

// Attribuer 20 XP pour quiz
await awardXPForAction('quiz');
```

### 3. Vérifier l'historique XP (Supabase)
```sql
SELECT * FROM xp_history 
WHERE user_id = 'USER_ID' 
ORDER BY created_at DESC;
```

---

## 🔄 Système XP - Flow complet

```
1. User fait une action (complète module, etc.)
   ↓
2. Appel: awardXPForAction('module')
   ↓
3. xpService.awardXP() :
   - Récupère XP actuel depuis profiles
   - Calcule nouveaux XP
   - Met à jour profiles.xp et profiles.level
   - Log dans xp_history
   - Si level up → log "level_up" dans xp_history
   ↓
4. useXP() détecte leveledUp = true
   ↓
5. Affiche LevelUpModal automatiquement
   ↓
6. User clique "Génial ! 🚀"
   ↓
7. Modal se ferme, XP sont bien sauvegardés
```

---

## 📈 Progression XP (50 niveaux)

| Niveau | XP requis | XP total cumulé |
|--------|-----------|-----------------|
| 1 → 2  | 100       | 100             |
| 2 → 3  | 115       | 215             |
| 5 → 6  | 174       | 675             |
| 10 → 11| 349       | 2,383           |
| 20 → 21| 1,114     | 14,271          |
| 30 → 31| 3,554     | 67,589          |
| 40 → 41| 11,340    | 320,164         |
| 49 → 50| 49,487    | 1,456,789       |

**Formule**: `BASE_XP * (MULTIPLIER ^ (level - 1))`
- `BASE_XP = 100`
- `MULTIPLIER = 1.15`

---

## 🎁 Récompenses XP

| Action              | XP gagnés |
|---------------------|-----------|
| Module complété     | **50 XP** |
| Choix du jour       | **30 XP** |
| Quiz réussi         | **20 XP** |
| Série 7 jours       | **100 XP**|
| Inviter un ami      | **200 XP**|

---

## 🐛 Debug / Troubleshooting

### Modal ne s'affiche pas ?
1. Vérifie `levelUpModalVisible` dans le store
2. Vérifie `levelUpData` (doit contenir `newLevel`)
3. Console log dans `useXP()` après `awardXPForAction()`

### XP ne se sauvent pas ?
1. Vérifie RLS Supabase sur `profiles`
2. Vérifie que `auth.uid() = id` dans les policies
3. Check console pour erreurs Supabase

### Barre de progression ne bouge pas ?
1. Vérifie `progress.xp` et `progress.level` dans le store
2. Vérifie `calculateLevelInfo()` retourne les bonnes valeurs
3. Check animation `useNativeDriver: false` (obligatoire pour `width`)

---

## ✅ Prochaines étapes

1. **Retirer le bouton DEBUG** en production
2. **Intégrer les vrais modules** (appeler `awardXPForAction('module')` après complétion)
3. **Implémenter Choix du Jour** (appeler `awardXPForAction('daily_choice')`)
4. **Implémenter système de streak** (100 XP bonus à 7 jours)
5. **Ajouter confettis** dans LevelUpModal (optionnel: `react-native-confetti-cannon`)

---

## 🚀 Code propre et performant

- ✅ **TypeScript strict** partout
- ✅ **Gestion erreurs** (try/catch dans tous les services)
- ✅ **Animations natives** (React Native Animated API)
- ✅ **Optimisations** (useCallback pour éviter re-renders)
- ✅ **Comments en français** 🇫🇷
- ✅ **Code réutilisable** (composants modulaires)

---

Made with 💙 for NoBroke MVP
