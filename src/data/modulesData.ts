import { Module } from '@/types/module.types';
import { MODULES_ZONE1_EXTRA } from './modulesZone1Extra';
import { MODULES_ZONE2_EXTRA } from './modulesZone2Extra';
import { MODULES_ZONE3_EXTRA } from './modulesZone3Extra';
import { MODULES_ZONE3_NEW } from './modulesZone3New';
import { MODULES_ZONE4 } from './modulesZone4';
import { MODULES_ZONE5 } from './modulesZone5';

const BASE_MODULES: Module[] = [
  // ==========================================
  // ZONE 1 : VILLAGE DES FAUCHÉS (Budget)
  // ==========================================
  
  {
    id: 'module-1-1',
    zone: 1,
    title: "C'est quoi un budget ?",
    description: "Découvre les bases du budget et pourquoi c'est essentiel pour gérer ton argent",
    isPremium: false,
    levelRequired: 1,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '📊',
    orderInZone: 1,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Définition du budget',
          content: `Un **budget** est un plan qui compare tes **revenus** (l'argent que tu gagnes) et tes **dépenses** (l'argent que tu dépenses).

C'est comme une carte pour savoir où va ton argent chaque mois.

**Revenus** : Salaire, aides, revenus complémentaires
**Dépenses** : Loyer, nourriture, transports, loisirs

**Un budget équilibré** = Revenus ≥ Dépenses`,
        },
        {
          type: 'why',
          title: 'Pourquoi faire un budget ?',
          content: `Faire un budget te permet de :

✅ **Éviter les fins de mois difficiles** : Tu sais combien il te reste avant la prochaine paie
✅ **Économiser plus facilement** : Tu vois où tu peux réduire tes dépenses
✅ **Atteindre tes objectifs** : Vacances, voiture, appart... tout devient possible
✅ **Réduire le stress financier** : Plus de surprises, tu contrôles ton argent

Sans budget, 70% des Français ne savent pas où va leur argent !`,
        },
        {
          type: 'how',
          title: 'Comment créer ton budget ?',
          content: `**Étape 1** : Liste tous tes revenus du mois
- Salaire net
- Aides (APL, allocations)
- Revenus complémentaires

**Étape 2** : Liste toutes tes dépenses
- Fixes (loyer, abonnements, assurances)
- Variables (courses, sorties, vêtements)

**Étape 3** : Compare
- Si Revenus > Dépenses ✅ : Épargne le reste
- Si Dépenses > Revenus ❌ : Réduis tes dépenses ou augmente tes revenus`,
        },
        {
          type: 'example',
          title: 'Exemple de budget simple',
          content: `**Marie, 25 ans, salaire : 1800€/mois**

**Revenus** : 1800€

**Dépenses fixes** (900€)
- Loyer : 600€
- Assurance : 50€
- Téléphone : 20€
- Électricité : 60€
- Transports : 75€
- Netflix : 15€
- Salle de sport : 80€

**Dépenses variables** (600€)
- Courses : 250€
- Sorties : 150€
- Shopping : 100€
- Loisirs : 100€

**Épargne** : 300€/mois 🎉

Budget équilibré !`,
        },
        {
          type: 'action',
          title: 'À toi de jouer !',
          content: `📝 **Action immédiate** :

1. Ouvre les notes de ton téléphone
2. Écris tes revenus du mois prochain
3. Liste 5 dépenses fixes que tu paies chaque mois
4. Estime combien tu dépenses en variable (courses, sorties)

💡 **Astuce** : Utilise la règle simple :
- Revenus - Dépenses = Ce qu'il te reste
- Si c'est négatif, tu vis au-dessus de tes moyens

Dans le prochain module, on verra comment tracker tes dépenses automatiquement !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Qu'est-ce qu'un budget équilibré ?",
          choices: [
            'Quand tu dépenses tout ton salaire',
            'Quand tes revenus sont égaux ou supérieurs à tes dépenses',
            'Quand tu économises 50% de ton salaire',
            'Quand tu as un crédit',
          ],
          correctIndex: 1,
          explanation: "Un budget équilibré signifie que tes revenus couvrent tes dépenses, et idéalement tu peux même économiser le surplus.",
        },
        {
          question: "Laquelle de ces dépenses est FIXE ?",
          choices: [
            'Les sorties au restaurant',
            'Les vêtements',
            'Le loyer',
            'Les cadeaux',
          ],
          correctIndex: 2,
          explanation: "Le loyer est une dépense fixe car son montant ne change pas d'un mois à l'autre. Les autres sont des dépenses variables.",
        },
        {
          question: "Que faire si tes dépenses dépassent tes revenus ?",
          choices: [
            'Ignorer le problème',
            'Prendre un crédit',
            'Réduire tes dépenses ou augmenter tes revenus',
            'Arrêter de compter',
          ],
          correctIndex: 2,
          explanation: "Si tu dépenses plus que tu gagnes, tu dois soit réduire tes dépenses, soit trouver des revenus complémentaires pour équilibrer ton budget.",
        },
      ],
    },
  },

  {
    id: 'module-1-2',
    zone: 1,
    title: 'Tracker ses dépenses',
    description: "Apprends à suivre tes dépenses facilement avec des apps et des méthodes simples",
    isPremium: false,
    levelRequired: 2,
    xpReward: 50,
    estimatedDuration: 10,
    icon: '📱',
    orderInZone: 2,
    content: {
      slides: [
        {
          type: 'why',
          title: 'Pourquoi tracker tes dépenses ?',
          content: `Tu te demandes souvent "Mais où est passé mon argent ?" 🤔

**Le tracking te permet de** :
- Découvrir tes "fuites d'argent" (ces 5€ par-ci, 10€ par-là qui s'accumulent)
- Identifier les catégories où tu dépenses trop
- Prendre conscience de tes habitudes

**Chiffre choc** : En moyenne, on sous-estime nos dépenses de 30% quand on ne les suit pas !

Tracker, c'est comme mettre des lunettes pour voir où va vraiment ton argent.`,
        },
        {
          type: 'how',
          title: 'Les 3 méthodes pour tracker',
          content: `**1. Méthode papier** 📝
- Carnet + stylo
- Note chaque dépense immédiatement
- Avantage : Aucune tech nécessaire
- Inconvénient : Fastidieux

**2. Tableur Excel/Google Sheets** 📊
- Template gratuit en ligne
- Catégorise tes dépenses
- Avantage : Gratuit, flexible
- Inconvénient : Saisie manuelle

**3. Application mobile** 📱 (RECOMMANDÉ)
- Connexion bancaire automatique
- Catégorisation automatique
- Graphiques et alertes
- Avantage : Automatique et visuel`,
        },
        {
          type: 'example',
          title: 'Apps recommandées (France)',
          content: `**Apps gratuites** :
🥇 **Bankin'** : Agrégateur de comptes, catégorisation auto, gratuit
🥈 **Lydia** : Suivi simple + paiement entre amis
🥉 **Linxo** : Interface claire, alertes personnalisées

**Apps bancaires** :
La plupart des banques ont maintenant des outils de suivi intégrés dans leur app !

**App premium** :
💎 **YNAB (You Need A Budget)** : Méthode complète (14€/mois)

**Notre conseil** : Commence avec Bankin' (gratuit) ou l'app de ta banque.`,
        },
        {
          type: 'how',
          title: 'Comment bien catégoriser ?',
          content: `**Catégories essentielles** :

🏠 **Logement** : Loyer, charges, meubles
🛒 **Alimentation** : Courses, restaurants
🚗 **Transports** : Essence, transports publics, entretien
💡 **Énergie** : Électricité, gaz, internet
👕 **Shopping** : Vêtements, accessoires
🎉 **Loisirs** : Sorties, hobbies, vacances
💊 **Santé** : Médecin, pharmacie
📱 **Abonnements** : Streaming, salle de sport

💡 **Astuce** : Ne crée pas trop de catégories (max 10), sinon tu t'y perdras !`,
        },
        {
          type: 'action',
          title: 'Challenge 7 jours',
          content: `🎯 **Défi** : Tracker TOUTES tes dépenses pendant 7 jours

**Comment faire** :
1. Télécharge Bankin' ou utilise l'app de ta banque
2. Connecte ton compte bancaire
3. Vérifie chaque jour que les dépenses sont bien catégorisées
4. Note aussi tes dépenses en cash manuellement

**Résultat** :
À la fin de la semaine, tu auras un aperçu RÉEL de tes habitudes.

🎁 **Bonus** : Note les 3 dépenses qui t'ont le plus surpris.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Pourquoi est-il important de tracker ses dépenses ?",
          choices: [
            'Pour impressionner ses amis',
            'Pour découvrir où va vraiment notre argent',
            'Parce que c\'est obligatoire',
            'Pour gagner de l\'argent',
          ],
          correctIndex: 1,
          explanation: "Tracker ses dépenses permet de voir précisément où va notre argent et d'identifier les dépenses inutiles.",
        },
        {
          question: "Quelle est la méthode de tracking la plus efficace ?",
          choices: [
            'Se souvenir de tête',
            'Noter une fois par mois',
            'Utiliser une app avec connexion bancaire',
            'Demander à quelqu\'un d\'autre de suivre',
          ],
          correctIndex: 2,
          explanation: "Les apps avec connexion bancaire automatisent le suivi, réduisent les oublis et offrent une vision claire et instantanée.",
        },
        {
          question: "Combien de catégories maximum est-il recommandé d'avoir ?",
          choices: [
            '3 catégories',
            '10 catégories',
            '50 catégories',
            'Pas de limite',
          ],
          correctIndex: 1,
          explanation: "10 catégories maximum est idéal : assez pour avoir du détail, mais pas trop pour ne pas se perdre.",
        },
      ],
    },
  },

  {
    id: 'module-1-3',
    zone: 1,
    title: 'La règle 50/30/20',
    description: "Maîtrise la méthode la plus simple pour gérer ton budget comme un pro",
    isPremium: false,
    levelRequired: 3,
    xpReward: 50,
    estimatedDuration: 12,
    icon: '🎯',
    orderInZone: 3,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi la règle 50/30/20 ?",
          content: `La règle 50/30/20 est une méthode ultra-simple pour répartir ton budget :

**50% : Besoins essentiels** 🏠
Loyer, courses, transports, assurances, factures

**30% : Envies et loisirs** 🎉
Sorties, shopping, restaurants, vacances, hobbies

**20% : Épargne et remboursement de dettes** 💰
Économies, investissements, remboursement de crédits

**Pourquoi ça marche ?**
C'est simple, visuel, et équilibré. Tu profites de la vie TOUT EN économisant.`,
        },
        {
          type: 'how',
          title: 'Comment appliquer la règle ?',
          content: `**Étape 1** : Calcule ton revenu NET mensuel
Exemple : 2000€/mois

**Étape 2** : Applique les pourcentages
- 50% pour les besoins = 1000€
- 30% pour les envies = 600€
- 20% pour l'épargne = 400€

**Étape 3** : Respecte les enveloppes
Une fois que tu as dépensé 1000€ en besoins, stop !
Idem pour les 600€ de loisirs.

**Étape 4** : Automatise ton épargne
Vire les 400€ d'épargne dès le jour de ta paie, avant de dépenser.`,
        },
        {
          type: 'example',
          title: 'Exemple concret : Thomas, 2000€/mois',
          content: `**50% Besoins (1000€)** :
- Loyer : 600€
- Courses : 200€
- Transports : 80€
- Téléphone : 20€
- Assurance : 50€
- Électricité : 50€
= 1000€ ✅

**30% Envies (600€)** :
- Restaurants : 150€
- Sorties : 100€
- Streaming : 30€
- Shopping : 120€
- Sport : 80€
- Cadeaux : 120€
= 600€ ✅

**20% Épargne (400€)** :
- Livret A : 300€
- PEL : 100€
= 400€ ✅

**Total** : 2000€ - Budget parfait !`,
        },
        {
          type: 'how',
          title: 'Adapter la règle à ta situation',
          content: `La règle 50/30/20 n'est **pas gravée dans le marbre**. Adapte-la !

**Si ton loyer est très élevé** (Paris, grandes villes) :
➡️ Règle 60/20/20 : 60% besoins, 20% envies, 20% épargne

**Si tu as des dettes urgentes** :
➡️ Règle 50/20/30 : 50% besoins, 20% envies, 30% remboursement

**Si tu vis chez tes parents** :
➡️ Règle 30/20/50 : 30% besoins, 20% envies, 50% épargne (profite-en !)

**Si tu veux devenir riche rapidement** :
➡️ Règle 50/10/40 : 50% besoins, 10% envies, 40% épargne + investissements

L'important : **Toujours économiser au moins 10%** de tes revenus.`,
        },
        {
          type: 'action',
          title: 'Calcule TON 50/30/20',
          content: `📝 **Action immédiate** :

1. Écris ton revenu NET mensuel : _______€

2. Calcule tes enveloppes :
   - 50% Besoins = _______€
   - 30% Envies = _______€
   - 20% Épargne = _______€

3. Compare avec ta situation actuelle :
   - Dépenses besoins actuelles : _______€
   - Dépenses envies actuelles : _______€
   - Épargne actuelle : _______€

4. **Ajuste** si nécessaire pour respecter la règle

💡 **Astuce** : Si tu n'arrives pas à respecter 20% d'épargne, commence par 10% et augmente progressivement.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Dans la règle 50/30/20, à quoi correspondent les 50% ?",
          choices: [
            'Aux loisirs',
            "À l'épargne",
            'Aux besoins essentiels',
            'Aux investissements',
          ],
          correctIndex: 2,
          explanation: "Les 50% sont dédiés aux besoins essentiels comme le loyer, les courses, les transports et les factures.",
        },
        {
          question: "Quel est le montant d'épargne pour un salaire de 1800€/mois avec la règle 50/30/20 ?",
          choices: [
            '180€',
            '360€',
            '540€',
            '900€',
          ],
          correctIndex: 1,
          explanation: "20% de 1800€ = 360€. C'est le montant recommandé à épargner chaque mois.",
        },
        {
          question: "Que faire si tu ne peux pas respecter la règle 50/30/20 ?",
          choices: [
            'Abandonner complètement',
            "L'adapter à ta situation",
            'Prendre un crédit',
            'Ne rien faire',
          ],
          correctIndex: 1,
          explanation: "La règle 50/30/20 est un guide, pas une obligation. Adapte-la à ta situation (60/20/20, 50/20/30, etc.).",
        },
      ],
    },
  },

  // ==========================================
  // ZONE 2 : FORÊT DE L'ÉPARGNE
  // ==========================================

  {
    id: 'module-2-1',
    zone: 2,
    title: "Le fonds d'urgence",
    description: "Crée ton matelas de sécurité pour faire face aux imprévus sans stress",
    isPremium: false,
    levelRequired: 11,
    xpReward: 50,
    estimatedDuration: 10,
    icon: '🛡️',
    orderInZone: 1,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi un fonds d'urgence ?",
          content: `Un **fonds d'urgence** (ou épargne de précaution) est une réserve d'argent que tu gardes de côté pour les **imprévus** :

🚗 Panne de voiture
🏥 Frais médicaux non remboursés
💻 Ordinateur cassé
😷 Perte d'emploi temporaire
🏠 Réparations urgentes

**Ce n'est PAS** pour :
❌ Les vacances
❌ Un nouvel iPhone
❌ Des sorties

C'est ton **parachute financier**. Sans lui, un imprévu = crédit ou stress.`,
        },
        {
          type: 'why',
          title: 'Combien mettre de côté ?',
          content: `**Objectif minimum** : 3 à 6 mois de dépenses

**Comment calculer** :
1. Additionne tes dépenses mensuelles essentielles (loyer + courses + factures)
2. Multiplie par 3 (minimum) ou 6 (idéal)

**Exemple** :
- Dépenses mensuelles : 1200€
- Fonds d'urgence minimum : 1200€ x 3 = 3600€
- Fonds d'urgence idéal : 1200€ x 6 = 7200€

**Selon ta situation** :
- CDI stable : 3 mois suffit
- Freelance/CDD : 6 mois minimum
- Entrepreneur : 12 mois recommandé`,
        },
        {
          type: 'how',
          title: 'Comment le construire ?',
          content: `**Étape 1** : Fixe ton objectif
Exemple : 3000€ de fonds d'urgence

**Étape 2** : Détermine un montant mensuel
Même 50€/mois, c'est 600€/an !

**Étape 3** : Automatise
Virement automatique le jour de ta paie vers ton Livret A

**Étape 4** : Oublie-le
Fais comme si cet argent n'existait pas

**Timeline réaliste** :
- Avec 100€/mois → 3000€ en 2,5 ans
- Avec 200€/mois → 3000€ en 15 mois
- Avec 500€/mois → 3000€ en 6 mois

**Astuce** : Commence petit, l'important c'est la régularité !`,
        },
        {
          type: 'example',
          title: "Où placer ton fonds d'urgence ?",
          content: `**Critères essentiels** :
✅ Disponible immédiatement (liquidité)
✅ Sans risque
✅ Rémunéré (même un peu)

**Options en France** :

🥇 **Livret A** (RECOMMANDÉ)
- Taux : 3% (2024)
- Plafond : 22 950€
- Retraits gratuits et instantanés
- Aucun risque

🥈 **Livret d'Épargne Populaire (LEP)**
- Taux : 5% (si éligible)
- Plafond : 10 000€
- Conditions de revenus

🥉 **Livret Développement Durable**
- Taux : 3%
- Plafond : 12 000€

❌ **À éviter** :
- Assurance-vie (frais de sortie)
- Bourse (trop risqué)
- Compte courant (0% d'intérêts)`,
        },
        {
          type: 'action',
          title: "Lance ton fonds d'urgence",
          content: `🎯 **Challenge** : Démarre ton fonds d'urgence AUJOURD'HUI

**Action 1** : Calcule ton objectif
Dépenses mensuelles x 3 = _______€

**Action 2** : Détermine ta capacité d'épargne
Je peux mettre de côté : _______€/mois

**Action 3** : Mets en place le virement automatique
- Connecte-toi à ton app bancaire
- Programme un virement récurrent vers ton Livret A
- Le jour de ta paie, automatiquement

**Action 4** : Oublie-le
Ne touche à cet argent QUE pour une vraie urgence.

🎁 **Bonus** : Ajoute les extras (primes, cadeaux d'argent) directement dans ce fonds !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quel est l'objectif minimum d'un fonds d'urgence ?",
          choices: [
            '1 mois de dépenses',
            '3 à 6 mois de dépenses',
            '1 an de dépenses',
            '10 000€ fixe',
          ],
          correctIndex: 1,
          explanation: "Un fonds d'urgence doit couvrir 3 à 6 mois de dépenses essentielles pour te protéger en cas d'imprévu.",
        },
        {
          question: "Où est-il recommandé de placer son fonds d'urgence ?",
          choices: [
            'En bourse',
            'Sous le matelas',
            'Sur un Livret A',
            'Dans une assurance-vie',
          ],
          correctIndex: 2,
          explanation: "Le Livret A est idéal : disponible immédiatement, sans risque, et rémunéré à 3%.",
        },
        {
          question: "Dans quel cas peux-tu utiliser ton fonds d'urgence ?",
          choices: [
            'Pour partir en vacances',
            'Pour acheter le dernier iPhone',
            'Pour réparer ta voiture en panne',
            'Pour offrir un cadeau',
          ],
          correctIndex: 2,
          explanation: "Le fonds d'urgence est réservé aux VRAIS imprévus (panne, frais médicaux, perte d'emploi).",
        },
      ],
    },
  },

  {
    id: 'module-2-2',
    zone: 2,
    title: 'Les types de comptes épargne',
    description: "Découvre les différentes solutions d'épargne et comment les utiliser",
    isPremium: false,
    levelRequired: 12,
    xpReward: 50,
    estimatedDuration: 15,
    icon: '🏦',
    orderInZone: 2,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Le paysage de l\'épargne en France',
          content: `En France, il existe plusieurs types de comptes d'épargne :

**Livrets réglementés** (État) :
- Livret A, LDDS, LEP
- Taux fixés par l'État
- Intérêts nets d'impôts

**Livrets bancaires** :
- Taux fixés par les banques
- Soumis aux prélèvements sociaux

**Assurance-vie** :
- Placement long terme
- Avantages fiscaux après 8 ans

**PEL/CEL** :
- Épargne logement
- Taux réglementés

Chaque produit a un **usage spécifique**. On va les comparer !`,
        },
        {
          type: 'how',
          title: 'Livret A vs LEP vs LDDS',
          content: `**Livret A** 💚
- Taux : 3%
- Plafond : 22 950€
- Pour qui : Tout le monde
- Usage : Épargne de précaution

**LEP (Livret d'Épargne Populaire)** 🏆
- Taux : 5% (exceptionnel !)
- Plafond : 10 000€
- Pour qui : Revenus modestes (< 21 393€/an célibataire)
- Usage : Meilleure épargne disponible si éligible

**LDDS (Livret Développement Durable)** 🌱
- Taux : 3%
- Plafond : 12 000€
- Pour qui : Tout le monde
- Usage : Complément au Livret A

**Conseil** : Maximise d'abord le LEP (si éligible), puis Livret A, puis LDDS.`,
        },
        {
          type: 'example',
          title: 'Exemple : Comment répartir 15 000€ ?',
          content: `**Situation** : Tu as 15 000€ à placer sans risque

**Si tu es éligible au LEP** :
1. LEP : 10 000€ (plafond) à 5% = 500€/an 🏆
2. Livret A : 5 000€ à 3% = 150€/an
**Total intérêts** : 650€/an

**Si tu n'es PAS éligible au LEP** :
1. Livret A : 12 000€ à 3% = 360€/an
2. LDDS : 3 000€ à 3% = 90€/an
**Total intérêts** : 450€/an

**Attention** : Ces chiffres sont NETS d'impôts. C'est rare !

Comparaison : un livret bancaire classique à 2% serait imposé et rapporterait moins.`,
        },
        {
          type: 'how',
          title: "L'assurance-vie (aperçu)",
          content: `**C'est quoi** :
Un contrat d'épargne long terme (8+ ans) avec avantages fiscaux.

**Avantages** :
✅ Pas de plafond
✅ Transmission facilitée
✅ Gestion libre ou pilotée
✅ Exonération d'impôts après 8 ans (jusqu'à 4600€ d'intérêts/an pour un célibataire)

**Inconvénients** :
❌ Argent moins disponible (frais de sortie avant 8 ans)
❌ Risque selon les supports choisis
❌ Complexe pour les débutants

**Quand l'utiliser** :
- Épargne > 5 ans
- Après avoir rempli Livret A + LDDS
- Pour préparer ta retraite

**Note** : On approfondira l'assurance-vie dans la Zone 4 !`,
        },
        {
          type: 'action',
          title: 'Optimise ton épargne',
          content: `🎯 **Action** : Audite tes comptes d'épargne

**Étape 1** : Liste tes comptes actuels
- Livret A : _______€ (plafond 22 950€)
- LDDS : _______€ (plafond 12 000€)
- LEP : _______€ (plafond 10 000€)
- Autres : _______€

**Étape 2** : Vérifie ton éligibilité au LEP
Revenu fiscal de référence < 21 393€ (célibataire) ?
➡️ Si oui, OUVRE-LE immédiatement !

**Étape 3** : Répartis intelligemment
Ordre de remplissage :
1. Fonds d'urgence sur Livret A (3-6 mois de dépenses)
2. LEP (si éligible)
3. Reste du Livret A
4. LDDS

**Étape 4** : Automatise
Virements mensuels automatiques = succès garanti !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quel livret offre le meilleur taux en 2024 ?",
          choices: [
            'Livret A (3%)',
            'LEP (5%)',
            'LDDS (3%)',
            'PEL (2%)',
          ],
          correctIndex: 1,
          explanation: "Le LEP offre 5%, le meilleur taux d'épargne sans risque en France, mais il est réservé aux revenus modestes.",
        },
        {
          question: "Quel est le plafond du Livret A ?",
          choices: [
            '10 000€',
            '12 000€',
            '22 950€',
            'Pas de plafond',
          ],
          correctIndex: 2,
          explanation: "Le Livret A a un plafond de 22 950€. Au-delà, tu dois utiliser d'autres produits d'épargne.",
        },
        {
          question: "Quel est l'avantage principal des livrets réglementés ?",
          choices: [
            'Taux très élevés',
            'Intérêts nets d\'impôts',
            'Risque élevé = gain élevé',
            'Argent bloqué 10 ans',
          ],
          correctIndex: 1,
          explanation: "Les livrets réglementés (Livret A, LDDS, LEP) offrent des intérêts NETS d'impôts, ce qui est rare.",
        },
      ],
    },
  },

  {
    id: 'module-2-3',
    zone: 2,
    title: "L'épargne automatique",
    description: "Mets ton épargne sur pilote automatique et économise sans effort",
    isPremium: false,
    levelRequired: 13,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🤖',
    orderInZone: 3,
    content: {
      slides: [
        {
          type: 'why',
          title: "Pourquoi automatiser son épargne ?",
          content: `**Le problème de l'épargne "manuelle"** :
❌ "J'épargnerai ce qu'il me reste en fin de mois" → Il ne reste jamais rien
❌ Tu oublies de virer
❌ Tu es tenté de dépenser l'argent

**La solution : Automatisation** 🤖
✅ Tu épargnes AVANT de dépenser
✅ Aucun effort mental
✅ Cohérence garantie

**Principe** : "Ce que tu ne vois pas, tu ne dépenses pas"

**Chiffre choc** : Les gens qui automatisent leur épargne économisent **3x plus** que ceux qui le font manuellement.

C'est la différence entre **vouloir** épargner et **vraiment** épargner.`,
        },
        {
          type: 'how',
          title: 'Comment automatiser ?',
          content: `**Méthode simple : Virement automatique**

**Étape 1** : Détermine le montant
Combien peux-tu épargner chaque mois sans te priver ?
Commence petit : même 50€/mois = 600€/an !

**Étape 2** : Choisis la date
➡️ **IDÉAL** : Le jour de ta paie (ou le lendemain)
Pourquoi ? L'argent part avant que tu puisses le dépenser.

**Étape 3** : Paramètre le virement récurrent
- Ouvre ton app bancaire
- Va dans "Virements"
- "Programmer un virement récurrent"
- Compte source : Compte courant
- Compte destination : Livret A/LDDS/LEP
- Montant : _______€
- Fréquence : Mensuel
- Date : Jour de paie

**Étape 4** : Active et oublie`,
        },
        {
          type: 'example',
          title: 'Exemple : Paul automatise 200€/mois',
          content: `**Situation** :
Paul gagne 2000€/mois, payé le 28 du mois.

**Son plan** :
- 28/01 : Paie de 2000€ arrive
- 29/01 : Virement auto de 200€ vers Livret A
- Reste disponible : 1800€ pour le mois

**Résultat** :
Paul considère mentalement qu'il gagne 1800€, pas 2000€.

**Au bout d'1 an** :
- Épargne : 200€ x 12 = 2400€
- Intérêts Livret A (3%) : +72€
- **Total** : 2472€ économisés sans y penser ! 🎉

**Bonus** : Il peut augmenter progressivement (250€, puis 300€...).`,
        },
        {
          type: 'how',
          title: 'Les hacks d\'épargne automatique',
          content: `**1. La méthode "augmentation progressive"**
Augmente ton épargne de 10€ tous les 3 mois.
Début : 100€ → Dans 1 an : 140€
Tu t'adaptes progressivement !

**2. La méthode "arrondi automatique"**
Apps comme Lydia : arrondissent chaque achat à l'euro supérieur et épargnent la différence.
Café à 3,50€ → 4€ débités, 0,50€ épargnés

**3. La méthode "augmentation de salaire"**
À chaque augmentation, épargne 50% du surplus.
Augmentation de 100€ → Épargne +50€/mois

**4. La méthode "épargne surprises"**
Primes, remboursements, cadeaux d'argent → 100% vers l'épargne

**5. La méthode "multi-comptes"**
Crée plusieurs sous-comptes avec objectifs :
- "Vacances 2025" : 100€/mois
- "Voiture" : 150€/mois
- "Fonds urgence" : 200€/mois`,
        },
        {
          type: 'action',
          title: 'Active ton épargne automatique MAINTENANT',
          content: `🎯 **Challenge** : Paramètre ton premier virement automatique dans les 5 prochaines minutes

**Action immédiate** :

1. **Ouvre ton app bancaire** 📱

2. **Détermine le montant** (commence petit !)
   - Débutant : 50€/mois
   - Intermédiaire : 10% de ton salaire
   - Expert : 20% de ton salaire

3. **Paramètre le virement automatique**
   - Date : Jour de paie + 1
   - Destination : Livret A
   - Montant : _______€
   - Fréquence : Mensuel

4. **Active**

5. **Célèbre** 🎉
   Tu viens de transformer ton épargne !

💡 **Astuce** : Mets un rappel dans 3 mois pour augmenter de 10€.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Pourquoi l'épargne automatique est-elle plus efficace ?",
          choices: [
            'Parce que c\'est obligatoire',
            'Parce qu\'on épargne avant de dépenser',
            'Parce que c\'est gratuit',
            'Parce que ça rapporte plus d\'intérêts',
          ],
          correctIndex: 1,
          explanation: "L'épargne automatique fonctionne car elle transfère l'argent AVANT que tu puisses le dépenser, éliminant la tentation.",
        },
        {
          question: "Quel est le meilleur moment pour programmer le virement automatique ?",
          choices: [
            'En fin de mois',
            'Au milieu du mois',
            'Le jour de la paie (ou le lendemain)',
            'Quand on y pense',
          ],
          correctIndex: 2,
          explanation: "Le jour de la paie (ou le lendemain) garantit que l'argent part avant que tu puisses le dépenser.",
        },
        {
          question: "Si Paul épargne 150€/mois pendant 2 ans à 3%/an, combien aura-t-il ?",
          choices: [
            '3000€',
            '3600€',
            '3735€',
            '4000€',
          ],
          correctIndex: 2,
          explanation: "150€ x 24 mois = 3600€ + intérêts composés à 3% ≈ 3735€. L'automatisation rend ce résultat garanti.",
        },
      ],
    },
  },

  // ==========================================
  // ZONE 3 : MONTAGNES DE LA DETTE (Crédit)
  // ==========================================

  {
    id: 'module-3-1',
    zone: 3,
    title: 'Comprendre le crédit',
    description: "Démystifie le crédit : comment ça marche et quand l'utiliser",
    isPremium: false,
    levelRequired: 21,
    xpReward: 50,
    estimatedDuration: 12,
    icon: '💳',
    orderInZone: 1,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi un crédit ?",
          content: `Un **crédit** (ou prêt) est de l'argent qu'une banque te prête, que tu dois rembourser avec des **intérêts**.

**Les acteurs** :
- **Prêteur** : La banque qui te prête l'argent
- **Emprunteur** : Toi, qui empruntes
- **Intérêts** : Le "prix" que tu paies pour emprunter

**Exemple simple** :
Tu empruntes 1000€ à 5% sur 1 an.
→ Tu rembourseras 1050€ au total.
Les 50€ sont les intérêts.

**Principe clé** : Plus tu empruntes longtemps, plus tu paies d'intérêts.`,
        },
        {
          type: 'why',
          title: 'Les types de crédit',
          content: `**1. Crédit immobilier** 🏠
- Pour acheter un logement
- Montant : 50 000€ à 500 000€+
- Durée : 15 à 25 ans
- Taux : 3-4% (2024)

**2. Crédit auto** 🚗
- Pour acheter une voiture
- Montant : 5 000€ à 50 000€
- Durée : 3 à 7 ans
- Taux : 2-7%

**3. Crédit à la consommation** 🛍️
- Pour tout le reste (meubles, électroménager)
- Montant : 200€ à 75 000€
- Durée : 6 mois à 7 ans
- Taux : 3-10%

**4. Crédit renouvelable** (ATTENTION)
- Réserve d'argent disponible
- Taux : 10-20% (TRÈS ÉLEVÉ)
- Piège à éviter !`,
        },
        {
          type: 'how',
          title: 'Comment calculer le coût d\'un crédit ?',
          content: `**Les éléments clés** :

**Capital** : Montant emprunté
**Taux** : Pourcentage d'intérêts (annuel)
**Durée** : Temps de remboursement
**Mensualité** : Ce que tu paies chaque mois
**Coût total** : Capital + tous les intérêts

**Exemple** :
Crédit de 10 000€ à 5% sur 3 ans

- Mensualité : 299€/mois
- Durée : 36 mois
- Total remboursé : 299€ x 36 = 10 764€
- **Coût du crédit** : 10 764€ - 10 000€ = **764€**

**Règle d'or** : Plus la durée est longue, plus tu paies cher !

Même crédit sur 5 ans :
- Mensualité : 189€/mois
- Total : 11 340€
- Coût : 1 340€ (presque le double !)`,
        },
        {
          type: 'example',
          title: 'Crédit : Bon ou mauvais ?',
          content: `**BON crédit** ✅ :
- Investissement qui prend de la valeur
- Crédit immobilier (logement = actif)
- Crédit étudiant (formation = meilleur salaire)
- Taux d'intérêt bas

**MAUVAIS crédit** ❌ :
- Consommation courante (vacances, fringues)
- Crédit renouvelable (taux élevés)
- Pour payer des dettes
- Taux > 10%

**Exemple MAUVAIS** :
Acheter un iPhone à 1200€ en crédit à 12% sur 2 ans.
→ Coût total : 1350€
→ L'iPhone vaut 400€ d'occasion après 2 ans
→ Tu perds 950€ !

**Exemple BON** :
Acheter un appart à 200 000€ à 3,5% sur 20 ans.
→ L'appart vaut 250 000€ dans 20 ans
→ Tu gagnes un actif !`,
        },
        {
          type: 'action',
          title: 'Les règles du crédit responsable',
          content: `🎯 **Les 5 commandements** :

**1. Le taux d'endettement tu respecteras**
Max 33% de tes revenus pour TOUS tes crédits.
Revenus 2000€ → Max 660€/mois de crédits

**2. Le crédit renouvelable tu éviteras**
Taux de 15-20% = ruine garantie

**3. La durée tu minimiseras**
Plus court = moins cher (même si mensualités plus élevées)

**4. Les assurances tu compareras**
L'assurance emprunteur peut coûter cher, compare !

**5. Ta capacité de remboursement tu calculeras AVANT**
Simule avec les outils en ligne (ex: meilleurtaux.com)

💡 **Astuce** : Toujours négocier le taux avec la banque. Une différence de 0,5% = des milliers d'euros sur 20 ans !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Qu'est-ce que le taux d'intérêt d'un crédit ?",
          choices: [
            'Le montant emprunté',
            'Le prix à payer pour emprunter de l\'argent',
            'La durée du remboursement',
            'Le nombre de mensualités',
          ],
          correctIndex: 1,
          explanation: "Le taux d'intérêt représente le coût de l'emprunt, c'est le prix que tu paies à la banque pour te prêter de l'argent.",
        },
        {
          question: "Quel type de crédit faut-il ÉVITER absolument ?",
          choices: [
            'Crédit immobilier',
            'Crédit auto',
            'Crédit renouvelable',
            'Crédit étudiant',
          ],
          correctIndex: 2,
          explanation: "Le crédit renouvelable a des taux très élevés (15-20%) et est un piège financier à éviter.",
        },
        {
          question: "Quel est le taux d'endettement maximum recommandé ?",
          choices: [
            '10%',
            '25%',
            '33%',
            '50%',
          ],
          correctIndex: 2,
          explanation: "Le taux d'endettement maximum est de 33% de tes revenus pour garantir ta capacité de remboursement.",
        },
      ],
    },
  },

  // ==========================================
  // ZONE 4 : VILLE DE L'INVESTISSEMENT
  // ==========================================

  {
    id: 'module-4-1',
    zone: 4,
    title: 'Introduction aux investissements',
    description: "Découvre comment faire travailler ton argent pour toi",
    isPremium: false,
    levelRequired: 31,
    xpReward: 50,
    estimatedDuration: 15,
    icon: '📈',
    orderInZone: 1,
    content: {
      slides: [
        {
          type: 'definition',
          title: "Épargner vs Investir",
          content: `**Épargner** 💰
= Mettre de l'argent de côté sans risque
Exemple : Livret A à 3%

**Investir** 📈
= Placer ton argent pour qu'il rapporte PLUS
Exemple : Actions en bourse

**Différence clé** :
- Épargne = Sécurité, faibles rendements
- Investissement = Risque, rendements potentiels élevés

**Pourquoi investir ?**
Sur 10 ans :
- Livret A à 3% : 10 000€ → 13 439€ (+34%)
- Bourse (CAC 40) à 7%/an : 10 000€ → 19 672€ (+97%)

L'inflation (hausse des prix) grignote ton épargne. Investir la protège !`,
        },
        {
          type: 'why',
          title: 'Les grands types d\'actifs',
          content: `**1. Actions** 📊
- Parts d'entreprises (Apple, LVMH, Total)
- Risque : Moyen à élevé
- Rendement historique : 7-10%/an
- Horizon : 5 ans minimum

**2. Obligations** 📜
- Prêt à une entreprise ou un État
- Risque : Faible à moyen
- Rendement : 2-5%/an
- Horizon : 3-10 ans

**3. Immobilier** 🏠
- Achat de biens locatifs
- Risque : Moyen
- Rendement : 3-8%/an + plus-value
- Horizon : 10-20 ans

**4. ETF (Fonds indiciels)** 🌐
- Panier d'actions diversifié
- Risque : Moyen
- Rendement : 6-8%/an
- Horizon : 5-20 ans

Notre conseil débutant : **ETF** !`,
        },
        {
          type: 'how',
          title: 'Le triangle d\'or de l\'investissement',
          content: `Tout investissement se base sur 3 piliers :

**1. Rentabilité** 💰
Combien tu peux gagner ?

**2. Risque** ⚠️
Combien tu peux perdre ?

**3. Liquidité** 💧
À quelle vitesse tu peux récupérer ton argent ?

**Règle universelle** :
On ne peut PAS avoir les 3 en même temps !

**Exemples** :
- Livret A : Faible rentabilité, risque nul, liquidité totale
- Actions : Forte rentabilité, risque élevé, liquidité moyenne
- Immobilier : Rentabilité correcte, risque moyen, liquidité faible (long à revendre)

**Conseil** : Diversifie pour équilibrer !`,
        },
        {
          type: 'example',
          title: 'Exemple : Portfolio débutant',
          content: `**Profil** : Julie, 28 ans, 10 000€ à investir

**Stratégie équilibrée** :

**1. Fonds d'urgence** (3000€) 🛡️
→ Livret A
But : Sécurité

**2. Épargne court terme** (2000€) 💚
→ LDDS
But : Disponibilité

**3. Investissement moyen terme** (3000€) 📊
→ ETF World (actions monde entier)
But : Croissance sur 5-10 ans

**4. Investissement long terme** (2000€) 🏦
→ Assurance-vie (fonds euros + ETF)
But : Retraite

**Résultat attendu sur 10 ans** :
- Fonds urgence : 3900€ (+30%)
- LDDS : 2600€ (+30%)
- ETF : 6000€ (+100%)
- Assurance-vie : 3500€ (+75%)
= **16 000€** (+60% au total)`,
        },
        {
          type: 'action',
          title: 'Es-tu prêt à investir ?',
          content: `✅ **Checklist avant d'investir** :

**1. Finances saines** :
- [ ] Budget équilibré
- [ ] Pas de dettes (sauf immobilier)
- [ ] Fonds d'urgence de 3-6 mois

**2. Connaissances** :
- [ ] Tu comprends les bases
- [ ] Tu connais ton profil de risque
- [ ] Tu as un horizon de placement clair

**3. Psychologie** :
- [ ] Tu acceptes de perdre temporairement
- [ ] Tu ne toucheras pas cet argent avant 5 ans
- [ ] Tu ne suivras pas les marchés tous les jours

**Si tu coches 7/9** : Tu es prêt !
**Si < 7** : Revois les modules précédents.

**Prochaine étape** : Modules sur la bourse, les ETF, et l'assurance-vie.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quelle est la principale différence entre épargner et investir ?",
          choices: [
            'Le montant minimum',
            'Le niveau de risque',
            'La banque',
            'La couleur du compte',
          ],
          correctIndex: 1,
          explanation: "Épargner = sans risque, faible rendement. Investir = avec risque, rendement potentiel plus élevé.",
        },
        {
          question: "Quel est le rendement historique moyen des actions sur le long terme ?",
          choices: [
            '2-3%/an',
            '7-10%/an',
            '20%/an',
            '50%/an',
          ],
          correctIndex: 1,
          explanation: "Historiquement, les actions rapportent en moyenne 7-10% par an sur le long terme (10+ ans).",
        },
        {
          question: "Quel investissement est recommandé pour les débutants ?",
          choices: [
            'Crypto-monnaies',
            'Actions individuelles',
            'ETF (fonds indiciels)',
            'Options et produits dérivés',
          ],
          correctIndex: 2,
          explanation: "Les ETF sont parfaits pour débuter : diversification automatique, frais bas, simplicité.",
        },
      ],
    },
  },

  // ==========================================
  // ZONE 5 : CHÂTEAU LIBERTÉ FINANCIÈRE
  // ==========================================

  {
    id: 'module-5-1',
    zone: 5,
    title: 'La liberté financière',
    description: "Découvre ce qu'est vraiment l'indépendance financière et comment l'atteindre",
    isPremium: false,
    levelRequired: 41,
    xpReward: 50,
    estimatedDuration: 20,
    icon: '👑',
    orderInZone: 1,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi la liberté financière ?",
          content: `**Liberté financière** = Quand tes **revenus passifs** couvrent tes **dépenses**.

Tu n'as plus BESOIN de travailler pour vivre.

**Revenus passifs** :
Argent qui rentre sans que tu travailles activement :
- Loyers immobiliers
- Dividendes d'actions
- Intérêts d'obligations
- Revenus automatisés (livres, formations en ligne)

**La formule** :
Revenus passifs ≥ Dépenses mensuelles = Liberté ! 🎉

**Exemple** :
- Tes dépenses : 2000€/mois
- Tes revenus passifs : 2500€/mois
→ Tu es financièrement libre !

**Note** : Liberté ≠ Richesse. Tu peux être libre avec 1500€/mois si tes besoins sont de 1200€.`,
        },
        {
          type: 'how',
          title: 'Le nombre magique : 25x',
          content: `**Règle des 4%** (Trinity Study, USA)

Pour être libre financièrement, tu as besoin de :

**Capital = 25 x Dépenses annuelles**

**Pourquoi 25x ?**
Tu peux retirer 4% de ton capital chaque année, indéfiniment, sans le vider.

**Exemples** :
- Dépenses : 1500€/mois (18 000€/an)
→ Capital nécessaire : 18 000€ x 25 = **450 000€**

- Dépenses : 2500€/mois (30 000€/an)
→ Capital nécessaire : 30 000€ x 25 = **750 000€**

- Dépenses : 1000€/mois (12 000€/an)
→ Capital nécessaire : 12 000€ x 25 = **300 000€**

**Conseil** : Plus tu réduis tes dépenses, plus tu atteins la liberté rapidement !`,
        },
        {
          type: 'example',
          title: 'Parcours vers la liberté : 3 stratégies',
          content: `**Stratégie 1 : Coast FI** 🏖️
Objectif : Économiser assez tôt pour que l'investissement grandisse seul.
Exemple : 100 000€ à 30 ans → 800 000€ à 60 ans (7%/an)
Tu peux ralentir ta carrière !

**Stratégie 2 : Barista FI** ☕
Objectif : Revenus passifs couvrent 50% des dépenses, tu travailles à mi-temps.
Exemple : 1000€ de passif, 1000€ de job relax = Liberté partielle

**Stratégie 3 : Fat FI** 💰
Objectif : Revenus passifs bien supérieurs aux dépenses.
Exemple : 5000€ de passif, 2000€ de dépenses = Lifestyle luxueux

**Quelle stratégie te convient ?**
- Jeune et ambitieux : Coast FI
- Équilibre travail/vie : Barista FI
- Confort maximal : Fat FI`,
        },
        {
          type: 'how',
          title: 'Timeline réaliste : Combien de temps ?',
          content: `**Variables** :
1. Ton salaire
2. Ton taux d'épargne
3. Rendement de tes investissements

**Exemple** : Marie, 25 ans
- Salaire net : 2500€/mois
- Dépenses : 1500€/mois
- Épargne : 1000€/mois (40%)
- Rendement : 7%/an

**Objectif** : 450 000€ (25 x 18 000€/an)

**Résultat** : **20 ans**
Marie sera libre à 45 ans !

**Si elle augmente son épargne à 50%** :
→ **15 ans** (libre à 40 ans)

**Calculateur en ligne** :
➡️ networthify.com/calculator/earlyretirement

**Conseil** : Chaque % d'épargne en plus réduit drastiquement la durée !`,
        },
        {
          type: 'action',
          title: 'Calcule TON chemin vers la liberté',
          content: `🎯 **Action** : Définis ton plan

**Étape 1** : Tes dépenses annuelles
Dépenses mensuelles x 12 = _______€/an

**Étape 2** : Ton capital cible
Dépenses annuelles x 25 = _______€

**Étape 3** : Ton épargne mensuelle actuelle
_______€/mois

**Étape 4** : Timeline
Avec un rendement de 7%/an, combien de temps ?
➡️ Utilise un calculateur : networthify.com

**Étape 5** : Optimise
- Réduis tes dépenses (-10% = -25% de temps)
- Augmente tes revenus (formation, side hustle)
- Améliore ton taux d'épargne (objectif 50%)

**Prochaines étapes** :
- Investis intelligemment (ETF, immobilier)
- Suis ta progression annuellement
- Ajuste selon ta vie (famille, projets)

Tu as maintenant une ROADMAP claire ! 🗺️`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Qu'est-ce que la liberté financière ?",
          choices: [
            'Être milliardaire',
            'Gagner 10 000€/mois',
            'Revenus passifs ≥ Dépenses',
            'Ne jamais travailler',
          ],
          correctIndex: 2,
          explanation: "La liberté financière, c'est quand tes revenus passifs couvrent tes dépenses. Tu n'as plus BESOIN de travailler.",
        },
        {
          question: "Selon la règle des 4%, quel capital pour 2000€/mois de dépenses ?",
          choices: [
            '240 000€',
            '480 000€',
            '600 000€',
            '1 000 000€',
          ],
          correctIndex: 2,
          explanation: "2000€/mois = 24 000€/an x 25 = 600 000€ de capital nécessaire.",
        },
        {
          question: "Quelle variable a le PLUS d'impact sur la durée avant liberté ?",
          choices: [
            'Ton âge',
            'Ton taux d\'épargne',
            'Ta ville',
            'Ton prénom',
          ],
          correctIndex: 1,
          explanation: "Le taux d'épargne a l'impact le plus massif. Passer de 30% à 50% réduit la durée de moitié !",
        },
      ],
    },
  },

  // Modules 13-15 : Placeholders (à remplir avec du contenu réel)
  {
    id: 'module-3-2',
    zone: 3,
    title: 'Carte de crédit : Mode d\'emploi',
    description: 'Utilise ta carte de crédit intelligemment sans tomber dans le piège',
    isPremium: false,
    levelRequired: 22,
    xpReward: 50,
    estimatedDuration: 10,
    icon: '💳',
    orderInZone: 2,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Carte de crédit vs débit',
          content: `**À compléter** : Contenu détaillé sur les cartes de crédit`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Placeholder question',
          choices: ['A', 'B', 'C', 'D'],
          correctIndex: 0,
          explanation: 'À compléter',
        },
      ],
    },
  },

  {
    id: 'module-3-3',
    zone: 3,
    title: 'Rembourser ses dettes',
    description: 'Stratégies pour sortir de l\'endettement rapidement',
    isPremium: false,
    levelRequired: 23,
    xpReward: 50,
    estimatedDuration: 12,
    icon: '⚡',
    orderInZone: 3,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Méthodes de remboursement',
          content: `**À compléter** : Méthode boule de neige vs avalanche`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Placeholder question',
          choices: ['A', 'B', 'C', 'D'],
          correctIndex: 0,
          explanation: 'À compléter',
        },
      ],
    },
  },

  {
    id: 'module-4-2',
    zone: 4,
    title: 'Les ETF pour débutants',
    description: 'Investis facilement dans des paniers d\'actions diversifiés',
    isPremium: false,
    levelRequired: 32,
    xpReward: 50,
    estimatedDuration: 15,
    icon: '🌐',
    orderInZone: 2,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Les ETF expliqués',
          content: `**À compléter** : ETF World, S&P 500, etc.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Placeholder question',
          choices: ['A', 'B', 'C', 'D'],
          correctIndex: 0,
          explanation: 'À compléter',
        },
      ],
    },
  },

  {
    id: 'module-5-2',
    zone: 5,
    title: 'Préparer sa retraite',
    description: 'Stratégies pour une retraite confortable et anticipée',
    isPremium: false,
    levelRequired: 42,
    xpReward: 50,
    estimatedDuration: 18,
    icon: '🏖️',
    orderInZone: 2,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Système de retraite en France',
          content: `**À compléter** : Retraite par répartition, PER, etc.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Placeholder question',
          choices: ['A', 'B', 'C', 'D'],
          correctIndex: 0,
          explanation: 'À compléter',
        },
      ],
    },
  },
];

// IDs des placeholders à remplacer par les versions complètes
const PLACEHOLDER_IDS = new Set(['module-3-2', 'module-3-3', 'module-4-2', 'module-5-2']);

// Fusion : base sans les placeholders + nouveaux modules complets
export const MODULES: Module[] = [
  ...BASE_MODULES.filter((m) => !PLACEHOLDER_IDS.has(m.id)),
  ...MODULES_ZONE1_EXTRA,
  ...MODULES_ZONE2_EXTRA,
  ...MODULES_ZONE3_EXTRA,  // Contient les 3-2 et 3-3 complets
  ...MODULES_ZONE3_NEW,
  ...MODULES_ZONE4,        // Contient 4-2 complet + 4-3 à 4-12
  ...MODULES_ZONE5,        // Contient 5-2 complet + 5-3 à 5-11
].sort((a, b) => {
  if (a.zone !== b.zone) return a.zone - b.zone;
  return a.orderInZone - b.orderInZone;
});

/**
 * Récupère un module par son ID
 */
export const getModuleById = (moduleId: string): Module | undefined => {
  return MODULES.find((module) => module.id === moduleId);
};

/**
 * Récupère tous les modules d'une zone
 */
export const getModulesByZone = (zoneId: number): Module[] => {
  return MODULES.filter((module) => module.zone === zoneId).sort(
    (a, b) => a.orderInZone - b.orderInZone
  );
};

/**
 * Récupère tous les modules gratuits
 */
export const getFreeModules = (): Module[] => {
  return MODULES.filter((module) => !module.isPremium);
};

/**
 * Récupère tous les modules premium
 */
export const getPremiumModules = (): Module[] => {
  return MODULES.filter((module) => module.isPremium);
};
