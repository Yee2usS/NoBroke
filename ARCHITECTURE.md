# 🏗️ Architecture NoBroke

## Vue d'Ensemble

NoBroke suit une architecture **modulaire** et **scalable** basée sur les best practices React Native.

## 🎯 Principes Architecturaux

### 1. Séparation des Responsabilités

- **UI** : Composants React purs (screens + components)
- **État** : Zustand stores centralisés
- **Logique Métier** : Services et hooks personnalisés
- **Navigation** : React Navigation isolée
- **Data** : Supabase backend

### 2. Flux de Données

```
Supabase (Backend)
    ↓
Services (supabase.ts)
    ↓
Stores (Zustand)
    ↓
Hooks (useSupabase, etc.)
    ↓
Screens & Components
```

### 3. Gestion d'État

Deux stores principaux :

#### `useUserStore`
- Profil utilisateur
- Progression (XP, niveau, streak)
- Authentification

#### `useGameStore`
- Modules éducatifs
- Badges
- Choix du jour
- Actions de jeu

## 📂 Structure Détaillée

```
src/
├── components/           # Composants réutilisables
│   ├── Button.tsx       # Bouton avec variantes
│   ├── Card.tsx         # Container card
│   └── ProgressBar.tsx  # Barre de progression
│
├── screens/             # Écrans de l'app
│   ├── HomeScreen.tsx        # Dashboard principal
│   ├── LearnScreen.tsx       # Liste modules
│   ├── BadgesScreen.tsx      # Collection badges
│   ├── ProfileScreen.tsx     # Profil utilisateur
│   └── OnboardingScreen.tsx  # Écran d'accueil
│
├── navigation/          # Configuration navigation
│   ├── index.tsx            # Provider principal
│   ├── RootNavigator.tsx    # Stack Navigator
│   └── TabNavigator.tsx     # Bottom Tabs
│
├── hooks/               # Custom hooks
│   └── useSupabase.ts       # Auth & session
│
├── services/            # Services externes
│   └── supabase.ts          # Client Supabase
│
├── store/               # État global
│   ├── useUserStore.ts      # Store utilisateur
│   └── useGameStore.ts      # Store jeu
│
├── utils/               # Utilitaires
│   └── constants.ts         # Constantes app
│
└── types/               # Types TypeScript
    └── index.ts             # Types centralisés
```

## 🔄 Cycle de Vie

### 1. Démarrage de l'App

```
App.tsx
  → useSupabase() vérifie session
  → Charge données utilisateur
  → Navigation → RootNavigator
    → TabNavigator (si connecté)
    → OnboardingScreen (si nouveau)
```

### 2. Navigation Flow

```
RootNavigator (Stack)
  ├── OnboardingScreen
  └── Main (TabNavigator)
      ├── Home
      ├── Learn
      ├── Badges
      └── Profile
```

### 3. Data Flow Exemple : Compléter un Module

```
1. User clique sur module (LearnScreen)
2. Appelle gameStore.completeModule(id)
3. Store → Service Supabase
4. Supabase met à jour DB
5. Store rafraîchit données locales
6. UI se met à jour automatiquement
```

## 🎨 Styling

### NativeWind (Tailwind CSS)

Classes Tailwind directement dans JSX :

```tsx
<View className="flex-1 bg-white p-6">
  <Text className="text-2xl font-bold text-gray-800">
    Titre
  </Text>
</View>
```

### Theme Configuration

Couleurs définies dans `tailwind.config.js` :

- `primary-500` : #6366f1
- `success` : #10b981
- `warning` : #f59e0b
- `error` : #ef4444

## 🗄️ Modèle de Données

### Users
```
id, email, username, avatar_url, created_at, updated_at
```

### User Progress
```
user_id, level, xp, streak_days, total_modules_completed
```

### Modules
```
id, title, category, difficulty, xp_reward, duration, is_locked
```

### Badges
```
id, name, rarity, icon, category, requirement_description
```

## 🔐 Sécurité

### Row Level Security (RLS)

À configurer sur Supabase pour :
- Users peuvent lire/modifier leurs propres données
- Modules/Badges : lecture publique
- User_modules/badges : écriture seulement par owner

### Variables d'Environnement

Jamais committer `.env` :
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## 📊 Performance

### Optimisations

1. **useMemo** pour calculs coûteux
2. **useCallback** pour fonctions
3. **React.memo** pour composants lourds
4. **FlatList** pour listes longues (futures itérations)
5. **Reanimated** pour animations natives

### Lazy Loading

Modules chargés à la demande via `fetchModules()`.

## 🧪 Testing (Futur)

Structure prévue :
```
__tests__/
├── components/
├── screens/
├── hooks/
└── utils/
```

## 🚀 Évolution Future

### Phase 2
- [ ] Quiz interactifs
- [ ] Animations avancées
- [ ] Mode sombre
- [ ] Notifications push

### Phase 3
- [ ] Système de coaching IA
- [ ] Partage social
- [ ] Leaderboards
- [ ] Défis communautaires

## 📝 Conventions de Code

### Naming
- Components : `PascalCase`
- Hooks : `useCamelCase`
- Utils : `camelCase`
- Constants : `UPPER_SNAKE_CASE`

### Fichiers
- Un composant = un fichier
- Index exports pour dossiers
- Types co-localisés si spécifiques

### Comments
- En français
- JSDoc pour fonctions publiques
- Inline pour logique complexe

---

**Dernière mise à jour** : Janvier 2026
