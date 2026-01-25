# 🚀 Guide de Démarrage Rapide NoBroke

## Installation Express (5 minutes)

### 1️⃣ Installation des dépendances

```bash
npm install
```

### 2️⃣ Configuration Supabase

Créez un fichier `.env` à la racine :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
```

### 3️⃣ Lancer l'application

```bash
npm start
```

Scannez le QR code avec **Expo Go** sur votre téléphone.

## 📱 Commandes Utiles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre Expo |
| `npm run ios` | Lance sur iOS |
| `npm run android` | Lance sur Android |
| `npm run web` | Lance sur navigateur |
| `npm run lint` | Vérification du code |
| `npm run type-check` | Vérification TypeScript |

## 🗄️ Configuration Base de Données

Allez sur **Supabase** → **SQL Editor** et exécutez les scripts SQL du README.md (section "Configuration de la base de données").

Les tables à créer :
- ✅ `users`
- ✅ `user_progress`
- ✅ `modules`
- ✅ `user_modules`
- ✅ `badges`
- ✅ `user_badges`
- ✅ `daily_choices`
- ✅ `user_daily_choices`

## 🎯 Structure Rapide

```
src/
├── components/   → Composants UI (Button, Card, etc.)
├── screens/      → Écrans (Home, Learn, Profile, etc.)
├── navigation/   → Navigation (Stack + Tab)
├── store/        → Zustand stores (user, game)
├── services/     → Supabase client
├── hooks/        → Custom hooks
├── utils/        → Constantes et helpers
└── types/        → Types TypeScript
```

## 💡 Prochaines Étapes

1. Configurez votre projet Supabase
2. Créez les tables de base de données
3. Ajoutez des modules de test
4. Testez l'application avec Expo Go

## ⚡ Troubleshooting Rapide

**Problème** : L'app ne démarre pas
```bash
npx expo start -c
```

**Problème** : Erreur Supabase
→ Vérifiez vos clés dans `.env`

**Problème** : TypeScript errors
```bash
npm run type-check
```

## 📞 Besoin d'aide ?

Consultez le [README.md](./README.md) complet pour plus de détails.

---

Bon développement ! 💪
