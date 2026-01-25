# 🤝 Guide de Contribution NoBroke

Merci de vouloir contribuer à NoBroke ! Ce guide vous aidera à démarrer.

## 🚀 Démarrage Rapide

1. **Fork** le repository
2. **Clone** votre fork : `git clone <votre-fork-url>`
3. **Installez** les dépendances : `npm install`
4. **Créez une branche** : `git checkout -b feature/ma-feature`
5. **Développez** votre feature
6. **Testez** vos changements
7. **Commit** : `git commit -m "feat: description"`
8. **Push** : `git push origin feature/ma-feature`
9. **Pull Request** vers `main`

## 📝 Conventions de Code

### Commits (Conventional Commits)

Format : `type(scope): description`

**Types** :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage (pas de changement de code)
- `refactor` : Refactoring
- `test` : Ajout de tests
- `chore` : Tâches de maintenance

**Exemples** :
```bash
feat(modules): ajouter filtrage par catégorie
fix(auth): corriger erreur de connexion
docs(readme): mettre à jour instructions
```

### Code Style

- **TypeScript strict** obligatoire
- **Components fonctionnels** uniquement
- **Hooks** pour la logique
- **NativeWind** pour le styling
- **Comments** en français
- **Props interfaces** pour tous les composants

### Exemple de Composant

```typescript
import React from 'react';
import { View, Text } from 'react-native';

interface MonComposantProps {
  title: string;
  onPress?: () => void;
}

/**
 * Description du composant
 */
const MonComposant: React.FC<MonComposantProps> = ({ title, onPress }) => {
  return (
    <View className="p-4 bg-white rounded-xl">
      <Text className="text-lg font-bold">{title}</Text>
    </View>
  );
};

export default MonComposant;
```

## 🎯 Checklist avant PR

- [ ] Code conforme au style guide
- [ ] TypeScript sans erreurs (`npm run type-check`)
- [ ] ESLint passé (`npm run lint`)
- [ ] Testé sur iOS et/ou Android
- [ ] Documentation mise à jour si nécessaire
- [ ] Commits bien formatés

## 🧪 Tests

```bash
# Vérifier les types
npm run type-check

# Linter
npm run lint

# Tests (quand disponibles)
npm test
```

## 📁 Structure des Fichiers

```
src/
├── components/        # Composants UI réutilisables
├── screens/          # Écrans de l'app
├── navigation/       # Configuration navigation
├── hooks/            # Custom hooks
├── services/         # Services API (Supabase)
├── store/            # Zustand stores
├── utils/            # Utilitaires
└── types/            # Types TypeScript
```

## 🎨 Design Guidelines

- **Mobile-first** : toujours penser mobile
- **Accessibilité** : textes lisibles, contraste suffisant
- **Performance** : optimiser les rendus
- **Cohérence** : utiliser les couleurs du theme

### Couleurs

```typescript
primary: '#6366f1'     // Indigo
success: '#10b981'     // Vert
warning: '#f59e0b'     // Orange
error: '#ef4444'       // Rouge
```

## 🐛 Signaler un Bug

Créez une issue avec :
- **Titre clair**
- **Description** du problème
- **Étapes** pour reproduire
- **Comportement attendu**
- **Screenshots** si pertinent
- **Environnement** (iOS/Android, version)

## ✨ Proposer une Feature

Créez une issue avec :
- **Titre** de la feature
- **Contexte** : pourquoi cette feature ?
- **Solution proposée** : comment l'implémenter ?
- **Alternatives** envisagées
- **Mockups** si applicable

## 🚫 Ce qu'il ne faut PAS faire

- ❌ Committer le fichier `.env`
- ❌ Ajouter des dépendances sans discussion
- ❌ Modifier les fichiers de config sans raison
- ❌ Ignorer les erreurs TypeScript
- ❌ Coder en anglais (comments en français)
- ❌ Push directement sur `main`

## 📚 Ressources

- [Documentation React Native](https://reactnative.dev/)
- [Documentation Expo](https://docs.expo.dev/)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation NativeWind](https://www.nativewind.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🙋 Questions ?

- Ouvrez une **Discussion** sur GitHub
- Consultez la **Documentation** (README.md, ARCHITECTURE.md)
- Contactez l'équipe

## 🎉 Remerciements

Merci pour votre contribution à NoBroke ! Ensemble, aidons les gens à maîtriser leurs finances. 💰

---

**Happy Coding!** 🚀
