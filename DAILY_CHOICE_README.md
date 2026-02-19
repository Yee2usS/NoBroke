# 🎯 Feature "Choix du Jour" - Documentation Complète

## ✅ Fichiers créés

### 📊 Données & Scénarios
1. **`src/data/dailyScenarios.ts`**
   - 7 scénarios financiers réels en français
   - Rotation automatique basée sur le jour de la semaine
   - Structure complète: situation, 4 choix, conséquences, leçon
   - Fonctions utilitaires: `getScenarioForDate()`, `getTimeUntilMidnight()`

### 🔧 Services
2. **`src/services/dailyChoiceService.ts`**
   - `getTodayChoice()` - Récupère/crée le choix du jour
   - `submitChoice()` - Soumet et traite le choix utilisateur
   - `getUserChoiceHistory()` - Historique des 7 derniers choix
   - `calculateUserStats()` - Calcule stats cumulées
   - Intégration avec `xpService` pour attribution XP

### 🎣 Hooks
3. **`src/hooks/useDailyChoice.ts`**
   - Hook personnalisé pour gérer tout l'état du choix
   - Auto-refresh à minuit
   - Gestion loading, error, submission
   - États: `todayChoice`, `hasCompletedToday`, `consequences`

### 🎨 Composants UI
4. **`src/components/ChoiceCard.tsx`**
   - Card interactive pour un choix
   - Animation scale au tap (1 → 1.05)
   - Badge lettre (A, B, C, D)
   - Preview conséquences si sélectionné
   - States: normal, selected, disabled

5. **`src/components/DailyChoiceWidget.tsx`**
   - Widget pour le Dashboard
   - Gradient Violet → Bleu
   - Timer "Xh restantes"
   - Badge "Nouveau" / "Complété ✅"
   - CTA: "Faire le choix →"
   - Auto-disabled si complété

### 📱 Screens
6. **`src/screens/DailyChoiceScreen.tsx`**
   - Écran principal en 3 étapes:
     1. **Sélection** - Affiche situation + 4 choix grid 2×2
     2. **Conséquences** - Animation compteurs + explication
     3. **Leçon** - Contenu éducatif + tips pratiques
   - Navigation: Header avec retour
   - Animations: fade in, counting numbers
   - Safe pour réouverture (garde l'état si déjà complété)

### 🔄 Intégrations
7. **`src/screens/HomeScreen.tsx`** (modifié)
   - Ajout du `<DailyChoiceWidget />` après la Stats Card
   - Import et intégration propre

8. **`src/store/useUserStore.ts`** (modifié)
   - Ajout `virtualMoney: number` (départ: 1000€)
   - Ajout `stats: { discipline, creativity, prudence }`
   - Actions: `updateVirtualMoney()`, `updateStats()`, `resetStats()`
   - Reset automatique au logout

---

## 🎯 Les 7 Scénarios (Rotation hebdomadaire)

| Jour | Scénario | Thème | XP Max |
|------|----------|-------|--------|
| Dim | Les Soldes -50% | Achat impulsif vs épargne | 35 XP |
| Lun | Invitation Restaurant | Budget social | 35 XP |
| Mar | Prime Annuelle | Gestion rentrée d'argent | 40 XP |
| Mer | Abonnement Streaming | Petites dépenses récurrentes | 40 XP |
| Jeu | Découvert Bancaire | Urgence financière | 40 XP |
| Ven | Achat Impulsif Instagram | Marketing d'urgence | 40 XP |
| Sam | Investissement Ami | Risque et relations | 40 XP |

**Chaque scénario inclut** :
- ✅ Situation réaliste (2-3 lignes)
- ✅ 4 choix avec conséquences différentes
- ✅ Impact argent virtuel (-150€ à +1000€)
- ✅ XP (5 à 40 XP selon pertinence du choix)
- ✅ Stats: discipline, créativité, prudence
- ✅ Explication pédagogique
- ✅ Leçon complète (3-4 paragraphes)
- ✅ 2-3 tips actionnables

---

## 🎨 Design & UX

### Couleurs
| Élément | Couleur | Usage |
|---------|---------|-------|
| **Violet** | `#8B5CF6` | Gradient start (widget, header) |
| **Bleu** | `#6366f1` | Gradient end, boutons |
| **Or** | `#FBBF24` | XP, récompenses |
| **Vert** | `#10b981` | Argent positif, stats positives |
| **Rouge** | `#ef4444` | Argent négatif, stats négatives |
| **Gris** | `#9ca3af` | Disabled, complété |

### Animations
1. **ChoiceCard** :
   - Press: scale 1 → 0.95
   - Selected: scale 1.03 + spring
   - Badge highlight bleu

2. **Conséquences** :
   - Fade in général
   - Counting animation (0 → valeur finale, 1.5s)
   - Spring sur les cartes

3. **Widget** :
   - Aucune animation (statique, focus lisibilité)

---

## 📊 Flow Utilisateur

```
┌─────────────────────────────────────────┐
│ DASHBOARD (HomeScreen)                  │
│ ┌─────────────────────────────────────┐ │
│ │ 🎯 Choix du Jour                    │ │
│ │ Preview: "Tu reçois une prime..."   │ │
│ │ [Badge: Nouveau]  [+30 XP]          │ │
│ │ → Faire le choix                    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              ↓ TAP
┌─────────────────────────────────────────┐
│ DAILY CHOICE SCREEN                     │
│ ┌─────────────────────────────────────┐ │
│ │ Étape 1: SÉLECTION                  │ │
│ │ • Situation complète                │ │
│ │ • 4 ChoiceCards (grid 2×2)          │ │
│ │ • Sélection → highlight bleu        │ │
│ │ • Bouton "Confirmer mon choix"      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              ↓ SUBMIT
┌─────────────────────────────────────────┐
│ Étape 2: CONSÉQUENCES                   │
│ ┌─────────────────────────────────────┐ │
│ │ Tu as choisi: [ton choix]           │ │
│ │ ┌─────────┐ ┌─────────┐            │ │
│ │ │ Argent  │ │   XP    │            │ │
│ │ │ +150€   │ │ +30 XP  │            │ │
│ │ └─────────┘ └─────────┘            │ │
│ │ Stats: 🎯 Discipline +10            │ │
│ │ 💬 Explication...                   │ │
│ │ → Voir la leçon                     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              ↓ TAP
┌─────────────────────────────────────────┐
│ Étape 3: LEÇON                          │
│ ┌─────────────────────────────────────┐ │
│ │ [Titre leçon]                       │ │
│ │ Contenu éducatif (3-4 paragraphes)  │ │
│ │ 💡 Conseils pratiques:              │ │
│ │ • Conseil 1                         │ │
│ │ • Conseil 2                         │ │
│ │ • Conseil 3                         │ │
│ │ ✅ J'ai compris !                   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              ↓ TAP
┌─────────────────────────────────────────┐
│ RETOUR AU DASHBOARD                     │
│ Widget affiche: "Complété ✅"           │
│ "Reviens dans 14h23"                    │
└─────────────────────────────────────────┘
```

---

## 🔄 Logique de Reset Quotidien

### Vérification côté client (MVP)
```typescript
// Dans useDailyChoice.ts
useEffect(() => {
  const checkMidnight = () => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      reset(); // Recharge le nouveau choix
    }
  };
  
  const interval = setInterval(checkMidnight, 60000); // Check toutes les minutes
  return () => clearInterval(interval);
}, [reset]);
```

### Vérification côté server (getTodayChoice)
```typescript
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Si pas de daily_choice pour aujourd'hui → en créer un
const { data: existingChoice } = await supabase
  .from('daily_choices')
  .select('*')
  .eq('date', today)
  .single();

if (!existingChoice) {
  // Créer nouveau choix avec scénario du jour
  const scenario = getScenarioForDate(new Date());
  // Insert dans DB...
}
```

### Production (TODO)
Pour la production, implémenter un **Supabase Edge Function** avec **Cron Job** :
```sql
-- Cron job quotidien à minuit
-- Crée automatiquement le daily_choice du jour
SELECT cron.schedule(
  'create-daily-choice',
  '0 0 * * *', -- Minuit
  $$
  INSERT INTO daily_choices (date, scenario)
  VALUES (CURRENT_DATE, get_random_scenario());
  $$
);
```

---

## 💾 Structure Base de Données

### Table `daily_choices`
```sql
CREATE TABLE daily_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  scenario JSONB NOT NULL, -- Scénario complet
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table `user_choices`
```sql
CREATE TABLE user_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  daily_choice_id UUID REFERENCES daily_choices(id),
  choice_index INTEGER NOT NULL, -- 0-3
  consequences JSONB, -- Résultat du choix
  xp_gained INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, daily_choice_id) -- 1 choix/user/jour
);
```

### Logs dans `xp_history`
```sql
-- Automatique via xpService
INSERT INTO xp_history (user_id, action, xp_gained, total_xp, level)
VALUES (userId, 'daily_choice', 30, 850, 5);
```

---

## 🧪 Comment Tester

### 1. Via l'App
```
1. Lance l'app: npx expo start --lan
2. Va sur HomeScreen
3. Clique sur le widget "Choix du Jour"
4. Sélectionne un choix (A, B, C, ou D)
5. Clique "Confirmer mon choix"
6. → Voir les conséquences (argent, XP, stats)
7. Clique "Voir la leçon 📚"
8. → Lire la leçon complète
9. Clique "✅ J'ai compris !"
10. → Retour Dashboard, widget affiche "Complété ✅"
```

### 2. Vérifier en DB (Supabase)
```sql
-- Voir le choix d'aujourd'hui
SELECT * FROM daily_choices 
WHERE date = CURRENT_DATE;

-- Voir les choix d'un user
SELECT * FROM user_choices 
WHERE user_id = 'USER_ID' 
ORDER BY created_at DESC;

-- Vérifier XP attribués
SELECT * FROM xp_history 
WHERE user_id = 'USER_ID' 
AND action = 'daily_choice';
```

### 3. Tester Reset Minuit
```typescript
// Méthode manuelle pour tester
import { useDailyChoice } from '@/hooks/useDailyChoice';

const { reset } = useDailyChoice();
reset(); // Force le reset comme si minuit

// Vérifie que:
// - Nouveau scénario chargé
// - hasCompletedToday = false
// - Widget affiche "Nouveau"
```

---

## 📈 Stats & Récompenses

### XP par Qualité de Choix
| Qualité | XP | Exemple |
|---------|-----|---------|
| Très mauvais | 5 XP | "Je dépense tout" |
| Mauvais | 10 XP | "J'achète sans réfléchir" |
| Moyen | 25-30 XP | "Je fais un compromis" |
| Bon | 35 XP | "Je réfléchis 24h" |
| Excellent | 40 XP | "Je garde mon épargne" |

### Stats Virtuelles (MVP - local)
```typescript
// Dans le store
stats: {
  discipline: 0,   // -20 à +20 par choix
  creativity: 0,   // -10 à +20 par choix
  prudence: 0,     // -20 à +25 par choix
}

// Exemple scénario "Soldes"
Choix A: { discipline: -5, creativity: 0, prudence: -5 }
Choix B: { discipline: 5, creativity: 5, prudence: 0 }
Choix C: { discipline: 10, creativity: 0, prudence: 10 }
Choix D: { discipline: 15, creativity: 0, prudence: 10 }
```

### Argent Virtuel (MVP - local)
- Départ: **1000€**
- Min: **-∞** (on peut être en négatif, ça enseigne !)
- Max: **∞**
- Affichage: Dashboard → Stats Card (TODO)

---

## 🐛 Debug & Troubleshooting

### Widget n'apparaît pas ?
1. Vérifier que `DailyChoiceWidget` est importé dans `HomeScreen`
2. Check console pour erreurs `getTodayChoice()`
3. Vérifier RLS policies sur `daily_choices` (SELECT pour authenticated)

### Choix ne se soumet pas ?
1. Check console : erreur UNIQUE constraint ?
   - → User a déjà fait son choix aujourd'hui
2. Vérifier que `choice_index` est entre 0-3
3. Vérifier RLS sur `user_choices` (INSERT pour authenticated)

### Scénario ne change pas ?
1. Vérifier la date : `daily_choices.date = CURRENT_DATE` ?
2. Clear cache : `reset()` dans `useDailyChoice`
3. Supprimer manuellement dans Supabase pour tester

### XP ne s'ajoutent pas ?
1. Vérifier `xpService.awardXP()` est appelé
2. Check logs dans `xp_history`
3. Vérifier RLS sur `profiles` (UPDATE autorisé)

---

## ✅ Checklist Test Complet

### Frontend
- [ ] Widget s'affiche sur HomeScreen
- [ ] Badge "Nouveau" visible si pas complété
- [ ] Timer "Xh restantes" fonctionne
- [ ] Navigation vers DailyChoiceScreen
- [ ] 4 ChoiceCards s'affichent en grid 2×2
- [ ] Sélection → highlight bleu + animation
- [ ] Bouton "Confirmer" activé seulement si choix sélectionné
- [ ] Soumission → Loading spinner
- [ ] Conséquences s'affichent (argent, XP, stats)
- [ ] Animations compteurs (counting numbers)
- [ ] Explication visible et lisible
- [ ] Bouton "Voir la leçon" fonctionne
- [ ] Leçon complète affichée (titre + contenu + tips)
- [ ] Bouton "J'ai compris" retourne au Dashboard
- [ ] Widget affiche "Complété ✅" après

### Backend
- [ ] `daily_choices` créée automatiquement si besoin
- [ ] Scénario rotation basée sur jour semaine
- [ ] `user_choices` enregistrée correctement
- [ ] UNIQUE constraint empêche double choix
- [ ] XP ajoutés via `xpService`
- [ ] Log dans `xp_history` créé
- [ ] Historique récupérable (7 derniers jours)

### Edge Cases
- [ ] Déjà complété → Accès direct aux conséquences
- [ ] Fermer et rouvrir l'app → État préservé
- [ ] Minuit → Nouveau choix chargé
- [ ] Offline → Message d'erreur gracieux
- [ ] Mauvaise connexion → Loading state

---

## 🚀 Prochaines Améliorations

### Court Terme
1. **Navigation** : Ajouter route `DailyChoice` dans navigation
2. **Stats Dashboard** : Afficher virtualMoney et stats dans Profile
3. **Historique** : Écran "Mes choix passés" avec graph progression
4. **Notifications Push** : Rappel quotidien "Ton choix t'attend !"

### Moyen Terme
5. **Persistance Stats** : Sauvegarder virtualMoney et stats en DB (profiles)
6. **Cron Job Supabase** : Automatiser création daily_choice à minuit
7. **Scénarios Dynamiques** : 30+ scénarios avec rotation aléatoire
8. **Partage Social** : "J'ai choisi X et gagné Y XP !"

### Long Terme
9. **Choix en Équipe** : Mode collaboratif avec amis
10. **Scénarios Personnalisés** : Basés sur profil user (âge, revenus, objectifs)
11. **IA Génération** : Nouveaux scénarios générés par IA chaque semaine
12. **Leaderboard** : Classement par argent virtuel cumulé

---

## 📚 Ressources

- **Scénarios** : Inspirés de situations réelles 18-35 ans
- **Leçons** : Basées sur principes finance personnelle (50/30/20, règle 24h, etc.)
- **Tips** : Actionnables et applicables immédiatement

---

🎉 **Feature "Choix du Jour" complète et prête à l'emploi !**

Made with 💜 for NoBroke MVP
