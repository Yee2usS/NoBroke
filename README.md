# 💰 NoBroke - Application d'Éducation Financière

NoBroke est une application mobile d'éducation financière gamifiée construite avec React Native et Supabase. Elle permet aux utilisateurs d'apprendre les bases de la finance personnelle de manière ludique et engageante.

## 🚀 Stack Technique

- **Frontend**: React Native (Expo SDK 51)
- **State Management**: Zustand
- **Navigation**: React Navigation v6
- **Styling**: NativeWind (Tailwind CSS)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Animations**: React Native Reanimated
- **Language**: TypeScript

## ✨ Fonctionnalités Principales

- 🎮 Système XP et Niveaux (1-50)
- 📚 59 Modules éducatifs
- 🏆 Collection de Badges (4 raretés)
- 🔥 Streak quotidien
- ⭐ Choix du Jour
- 📝 Quiz d'onboarding
- 👤 Profil utilisateur personnalisé

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18 ou supérieur)
- **npm** ou **yarn**
- **Expo CLI** : `npm install -g expo-cli`
- **Expo Go** sur votre téléphone (iOS/Android)
- **Compte Supabase** (gratuit)

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo-url>
cd NoBrokeAPP
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration de Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez votre **URL** et **Anon Key** dans les paramètres du projet
4. Créez un fichier `.env` à la racine du projet :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key-ici
```

### 4. Configuration de la base de données

Exécutez les migrations SQL suivantes dans l'éditeur SQL de Supabase :

#### Créer la table `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Créer la table `user_progress`

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  xp_to_next_level INTEGER DEFAULT 100,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  total_modules_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
```

#### Créer la table `modules`

```sql
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  xp_reward INTEGER DEFAULT 50,
  duration_minutes INTEGER DEFAULT 10,
  order_index INTEGER NOT NULL,
  is_locked BOOLEAN DEFAULT FALSE,
  required_level INTEGER DEFAULT 1,
  icon TEXT DEFAULT '📚',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Créer la table `user_modules`

```sql
CREATE TABLE user_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);
```

#### Créer la table `badges`

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  icon TEXT DEFAULT '🏆',
  category TEXT,
  requirement_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Créer la table `user_badges`

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);
```

#### Créer la table `daily_choices`

```sql
CREATE TABLE daily_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,
  scenario TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  correct_option TEXT CHECK (correct_option IN ('a', 'b')),
  explanation TEXT,
  xp_reward INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Créer la table `user_daily_choices`

```sql
CREATE TABLE user_daily_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  daily_choice_id UUID REFERENCES daily_choices(id) ON DELETE CASCADE,
  selected_option TEXT CHECK (selected_option IN ('a', 'b')),
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, daily_choice_id)
);
```

## 🚀 Lancement de l'application

### Démarrer le serveur de développement

```bash
npm start
# ou
yarn start
# ou
npx expo start
```

### Lancer sur iOS

```bash
npm run ios
# ou
yarn ios
# ou appuyez sur 'i' dans le terminal Expo
```

### Lancer sur Android

```bash
npm run android
# ou
yarn android
# ou appuyez sur 'a' dans le terminal Expo
```

### Lancer sur le web

```bash
npm run web
# ou
yarn web
# ou appuyez sur 'w' dans le terminal Expo
```

### Scanner avec Expo Go

1. Installez **Expo Go** sur votre téléphone
2. Scannez le QR code affiché dans le terminal
   - iOS : utilisez l'appareil photo
   - Android : utilisez l'app Expo Go

## 📁 Structure du Projet

```
NoBrokeAPP/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ProgressBar.tsx
│   ├── screens/             # Écrans de l'application
│   │   ├── HomeScreen.tsx
│   │   ├── LearnScreen.tsx
│   │   ├── BadgesScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── OnboardingScreen.tsx
│   ├── navigation/          # Configuration de la navigation
│   │   ├── index.tsx
│   │   ├── RootNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── hooks/               # Custom hooks
│   │   └── useSupabase.ts
│   ├── services/            # Services API
│   │   └── supabase.ts
│   ├── store/               # Zustand stores
│   │   ├── useUserStore.ts
│   │   └── useGameStore.ts
│   ├── utils/               # Utilitaires
│   │   └── constants.ts
│   └── types/               # Types TypeScript
│       └── index.ts
├── App.tsx                  # Point d'entrée
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── README.md
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont configurées dans `tailwind.config.js` et `src/utils/constants.ts` :

- **Primary** : `#6366f1` (Indigo)
- **Success** : `#10b981` (Vert)
- **Warning** : `#f59e0b` (Orange)
- **Error** : `#ef4444` (Rouge)

### Système XP

Le calcul de l'XP est configurable dans `src/utils/constants.ts` :

- `XP_PER_LEVEL` : XP de base par niveau (100)
- `MAX_LEVEL` : Niveau maximum (50)
- `XP_MULTIPLIER_PER_LEVEL` : Multiplicateur (1.1)

## 🧪 Tests

```bash
npm test
# ou
yarn test
```

## 📝 Scripts Disponibles

- `npm start` : Démarre le serveur Expo
- `npm run android` : Lance l'app sur Android
- `npm run ios` : Lance l'app sur iOS
- `npm run web` : Lance l'app sur le web
- `npm run lint` : Vérifie le code avec ESLint
- `npm run type-check` : Vérifie les types TypeScript

## 🔐 Sécurité

- Ne commitez **JAMAIS** votre fichier `.env`
- Gardez vos clés Supabase privées
- Utilisez Row Level Security (RLS) sur Supabase

## 🐛 Résolution de Problèmes

### L'app ne démarre pas

```bash
# Nettoyer le cache
npx expo start -c

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### Erreur de connexion Supabase

- Vérifiez que vos variables d'environnement sont correctes
- Assurez-vous que votre projet Supabase est actif
- Vérifiez que les tables sont créées

### Erreur NativeWind

```bash
# Rebuild
npx expo start -c
```

## 📚 Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Navigation](https://reactnavigation.org/)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation NativeWind](https://www.nativewind.dev/)
- [Documentation Zustand](https://zustand-demo.pmnd.rs/)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

- Votre Nom - Développeur Principal

## 🙏 Remerciements

- Merci à la communauté Expo
- Merci à l'équipe Supabase
- Merci à tous les contributeurs

---

**NoBroke** - Votre parcours vers l'indépendance financière 💰
