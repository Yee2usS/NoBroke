# Génération de contenu pédagogique par IA (Claude)

Les contenus des modules (cours, quiz) peuvent être générés par Claude avec un **prompt directeur** intégré au code, qui fixe le rôle, le public et les règles de fond.

## Idée générale

- **Prompt directeur** : défini dans le code (`src/content/prompts/directorPrompt.ts`). Exemple de rôle : *« Tu es un conseiller en gestion de patrimoine sénior, chargé de générer du contenu pédagogique pour un public de particuliers… »*.
- **Schémas** : le format de sortie (slides + quiz) est décrit dans `src/content/schemas/contentSchemas.ts` pour que Claude renvoie du JSON exploitable.
- **Génération** : un script Node en local (ou plus tard une Edge Function) appelle l’API Anthropic avec ce système + une requête par module (titre, thème, etc.).

La clé API **ne doit jamais** être dans l’app (pas dans le bundle). Elle est utilisée uniquement :
- en local dans le script (fichier `.env`), ou
- côté serveur (ex. Supabase Edge Function) si tu veux générer à la volée plus tard.

## Fichiers concernés

| Fichier | Rôle |
|--------|------|
| `src/content/prompts/directorPrompt.ts` | Prompt système (rôle conseiller patrimoine, public particuliers, ton, règles) |
| `src/content/schemas/contentSchemas.ts` | Description du JSON attendu (slides, quiz) |
| `src/content/contentGenerationPrompts.ts` | Construction du message utilisateur (titre, description, thème) |
| `src/content/parseGeneratedContent.ts` | Extraction et parsing du JSON depuis la réponse Claude |
| `scripts/generateModuleContent.ts` | Script Node qui appelle Claude et affiche le contenu généré |

## Utilisation du script en local

### 1. Clé API

- Crée un fichier `.env` à la racine du projet (s’il n’existe pas).
- Ajoute une ligne :  
  `ANTHROPIC_API_KEY=ta_cle_anthropic`
- Ne commite pas `.env` (il doit être dans `.gitignore`).

### 2. Dépendances

```bash
npm install --save-dev dotenv tsx
```

### 3. Lancer la génération

Depuis la racine du projet :

```bash
npm run generate:module -- "Titre du module"
```

Ou avec `npx tsx` :

```bash
npx tsx scripts/generateModuleContent.ts "Titre du module"
```

Avec une description optionnelle :

```bash
npm run generate:module -- "C'est quoi un budget ?" "Découvrir les bases du budget et pourquoi c'est essentiel"
```

Le script :
- utilise le prompt directeur + le format défini dans le code ;
- appelle l’API Claude ;
- affiche le JSON généré (slides + questions) et un extrait prêt à coller dans `src/data/modulesData.ts`.

### 4. Intégrer dans l’app

- Copie le bloc `content` + `quiz` affiché par le script dans l’objet du module correspondant dans `modulesData.ts`.
- Vérifie les types (slides : `definition` | `why` | `how` | `example` | `action` ; quiz : 3 questions, 4 choix, `correctIndex` 0–3).

## Adapter le prompt directeur

Tu peux modifier le rôle, le public ou les consignes dans `src/content/prompts/directorPrompt.ts` :

- **Rôle** : conseiller en gestion de patrimoine, niveau sénior, etc.
- **Public** : particuliers, niveau débutant, objectifs (budget, épargne, éviter les pièges…).
- **Règles** : ton pédagogique, pas de jargon, conformité droit français, pas de conseil en investissement personnalisé, pas de pub pour des marques, etc.

Toute génération lancée ensuite avec le script utilisera automatiquement ce prompt.

## Évolution possible : génération côté serveur

Pour générer du contenu à la volée (sans passer par le script local), tu peux :

1. Créer une **Supabase Edge Function** (ou autre backend) qui reçoit titre / description / thème.
2. Dans cette fonction, importer (ou recopier) le prompt directeur et les schémas, appeler l’API Anthropic avec la clé stockée en variable d’environnement du projet Supabase.
3. Renvoyer le JSON (slides + questions) à l’app.
4. Côté app : appeler cette fonction au lieu de lire uniquement `modulesData.ts`, et éventuellement mettre en cache le résultat (AsyncStorage ou Supabase).

Le même prompt directeur et les mêmes formats de sortie restent la source de vérité dans le code.
