import { Module } from '@/types/module.types';

// Zone 3 : Montagnes de la Dette — modules complets (3-2, 3-3) + nouveaux (3-4 à 3-12)
export const MODULES_ZONE3_EXTRA: Module[] = [
  {
    id: 'module-3-2',
    zone: 3,
    title: "Carte de crédit : Mode d'emploi",
    description: "Utilise ta carte de crédit intelligemment sans tomber dans le piège",
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
          title: 'Carte de débit vs carte de crédit',
          content: `**Carte de débit** : débite ton compte immédiatement (ou sous 24-48h).
C'est la carte bancaire standard en France.

**Carte de crédit** : tu dépenses MAINTENANT, la banque te prête l'argent, tu rembourses plus tard.

**Modes de remboursement** :
- **Débit différé** : toutes les dépenses du mois débitées en une fois (le 5 du mois suivant)
- **Crédit revolving** : minimum mensuel à rembourser, le reste génère des intérêts (12-20%/an !)
- **Débit immédiat** : classique, débit instantané

**En France**, la plupart des cartes "à débit différé" ne sont PAS de vraies cartes de crédit. Les cartes de crédit revolving (American Express, Cetelem...) sont les plus dangereuses.`,
        },
        {
          type: 'why',
          title: 'Avantages et pièges des cartes de crédit',
          content: `**Avantages** :
✅ Protection acheteur sur certains achats
✅ Programmes de cashback ou points
✅ Utile pour la location de voiture (caution)
✅ Gestion des flux de trésorerie

**Les pièges** :
⚠️ **Crédit revolving** : payer le minimum chaque mois = payer des intérêts à 20%/an
⚠️ **Fausse impression de richesse** : tu dépenses l'argent de demain
⚠️ **Frais cachés** : retrait cash, dépassement, frais de change
⚠️ **Dépenses augmentées** : psychologiquement, payer par carte = dépenser plus

**Chiffre choc** : Une dette de 1 000€ sur carte de crédit revolving à 18%/an, en payant seulement le minimum (30€/mois), prend 4 ans à rembourser et coûte 430€ d'intérêts !`,
        },
        {
          type: 'how',
          title: 'Utiliser une carte de crédit intelligemment',
          content: `**Règle 1** : Toujours rembourser en TOTALITÉ chaque mois
Jamais de solde reporté = 0€ d'intérêts.

**Règle 2** : Ne jamais retirer du cash avec une carte de crédit
Les frais sont immédiats et les intérêts commencent instantanément.

**Règle 3** : Traite-la comme de l'argent réel
Ne dépense que ce que tu as déjà sur ton compte.

**Règle 4** : Vérifie ton relevé chaque mois
Erreurs, fraudes, abonnements oubliés...

**Règle 5** : Profite des avantages sans les pièges
Cashback, points, protection achat → si tu rembourses en totalité chaque mois.`,
        },
        {
          type: 'example',
          title: 'Le piège du minimum mensuel',
          content: `**Situation** : Marie a 2 500€ de dettes sur sa carte revolving à 18%/an.

**Si elle paie seulement le minimum (50€/mois)** :
- Durée de remboursement : **72 mois (6 ans)**
- Intérêts payés : **1 100€**
- Total payé : 3 600€ pour 2 500€ de dettes !

**Si elle paie 200€/mois** :
- Durée : **15 mois**
- Intérêts payés : **290€**
- Économie : **810€** et 4,5 ans de gagnés

**Si elle avait utilisé son Livret A (épargne de précaution)** :
- Durée : immédiat
- Coût total : 0€ d'intérêts
- Son épargne se reconstituait ensuite à 2,4% au lieu de perdre 18%`,
        },
        {
          type: 'action',
          title: 'Audite ta situation carte de crédit',
          content: `🎯 **Vérifications immédiates** :

**Étape 1** : Identifie le type de chaque carte bancaire que tu as
- Débit immédiat, débit différé ou revolving ?

**Étape 2** : Si tu as une carte revolving avec un solde impayé
- Calcule les intérêts que tu paies (regarde le TAEG sur ton contrat)
- Établis un plan de remboursement accéléré

**Étape 3** : Si tu n'as pas de dette
- Vérifie que tu rembourses bien en totalité chaque mois
- Active les alertes de dépenses sur ton app bancaire

💡 **Test simple** : as-tu des intérêts débités sur ta carte ? Si oui, tu paies trop cher. Contacte la banque pour un plan de remboursement ou utilise ton épargne.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quel est le danger principal d'une carte de crédit revolving ?",
          choices: ['Les frais d\'abonnement élevés', 'Les intérêts très élevés (12-20%/an) si tu ne rembourses pas en totalité', 'Le plafond de dépenses trop bas', 'La difficulté à l\'utiliser en ligne'],
          correctIndex: 1,
          explanation: "Le crédit revolving génère des intérêts de 12 à 20%/an sur le solde non remboursé. Payer le minimum chaque mois peut transformer 1 000€ de dettes en 1 430€ remboursés.",
        },
        {
          question: "La règle d'or pour utiliser une carte de crédit sans risque est...",
          choices: ['Payer le minimum chaque mois', 'Toujours rembourser la totalité du solde chaque mois', 'Ne jamais l\'utiliser', 'L\'utiliser uniquement pour les grosses dépenses'],
          correctIndex: 1,
          explanation: "En remboursant la totalité chaque mois, tu ne paies aucun intérêt. La carte devient un outil de gestion de trésorerie gratuit, parfois même rentable (cashback).",
        },
        {
          question: "Pourquoi ne jamais retirer du cash avec une carte de crédit ?",
          choices: ['C\'est interdit', 'Les frais sont immédiats et les intérêts commencent instantanément (pas de période de grâce)', 'Les distributeurs ne l\'acceptent pas', 'C\'est limité à 20€'],
          correctIndex: 1,
          explanation: "Le retrait cash avec une carte de crédit déclenche immédiatement des frais fixes + des intérêts, sans la période de grâce habituellement accordée sur les achats.",
        },
      ],
    },
  },

  {
    id: 'module-3-3',
    zone: 3,
    title: 'Rembourser ses dettes',
    description: "Stratégies pour sortir de l'endettement rapidement",
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
          title: 'Les deux grandes méthodes de remboursement',
          content: `Il existe deux stratégies principales pour rembourser plusieurs dettes simultanément :

**Méthode 1 : L'Avalanche (mathématiquement optimale)**
Rembourse d'abord la dette au TAUX D'INTÉRÊT LE PLUS ÉLEVÉ.
- Minimums sur toutes les dettes
- Tout le surplus sur la dette la plus coûteuse
- Puis on passe à la suivante
→ Économise le plus d'intérêts sur le long terme.

**Méthode 2 : La Boule de Neige (psychologiquement motivante)**
Rembourse d'abord la dette AU MONTANT LE PLUS PETIT.
- Minimums sur toutes les dettes
- Tout le surplus sur la plus petite dette
- Victoires rapides = motivation maximale
→ Idéale si tu manques de motivation ou de discipline.`,
        },
        {
          type: 'why',
          title: 'Pourquoi sortir des dettes est urgent',
          content: `✅ **Les dettes coûtent de l'argent chaque jour** : chaque euro de dette te coûte des intérêts
✅ **Effet de levier inversé** : une dette à 15% est comme un investissement à -15%
✅ **Libération mentale** : le stress des dettes est destructeur pour la santé et les décisions
✅ **Accélération de la richesse** : sans dettes → 100% de l'épargne crée de la richesse

**Ordre de priorité des dettes** :
1. Dettes à taux > 10% : urgence absolue (crédit revolving, découvert)
2. Dettes à taux 5-10% : traiter rapidement
3. Dettes à taux < 5% : remboursement normal (crédit immobilier)

**Règle** : rembourser une dette à 15% = rendement garanti de 15%.`,
        },
        {
          type: 'how',
          title: 'Mettre en place ton plan de remboursement',
          content: `**Étape 1** : Liste toutes tes dettes
Créancier | Montant restant | Taux | Minimum mensuel

**Étape 2** : Calcule ton "surplus mensuel"
Ce que tu peux ajouter au-delà des minimums.

**Étape 3** : Choisis ta méthode
- Tu te connais discipliné : Avalanche (économise plus)
- Tu as besoin de victoires rapides : Boule de Neige

**Étape 4** : Focus sur UNE seule dette à la fois
Tout le surplus sur cette dette cible.

**Étape 5** : Quand une dette est remboursée
Récupère son paiement minimum et l'ajoute au surplus de la prochaine.
(C'est pourquoi ça s'appelle "boule de neige" : l'effet s'accélère !)`,
        },
        {
          type: 'example',
          title: 'Tom liquide 6 200€ de dettes en 18 mois',
          content: `**Situation de Tom** — surplus mensuel disponible : 300€

**Dettes** :
- Carte revolving : 800€ à 18% (minimum : 25€)
- Crédit à la consommation : 2 400€ à 12% (minimum : 80€)
- Prêt entre amis : 3 000€ à 0% (minimum : 100€)

**Tom choisit l'Avalanche** (taux le plus élevé d'abord) :

**Phase 1** : Focus revolving 18%
- Minimums : 80€ + 100€ = 180€
- Surplus sur revolving : 300€ - 180€ = 120€ + 25€ min = 145€/mois
- Remboursement revolving : 800€ / 145€ ≈ **6 mois** ✅

**Phase 2** : Focus crédit conso 12%
- Nouveau surplus : 300€ - 180€ + 145€ = 265€/mois
- 2 400€ / 265€ ≈ **10 mois** ✅

**Phase 3** : Prêt ami
- Nouveau surplus : 300€ + 265€ = 565€/mois
- 3 000€ / 565€ ≈ **5 mois** ✅

**Total : 21 mois** pour tout rembourser.`,
        },
        {
          type: 'action',
          title: 'Lance ton plan de remboursement',
          content: `🎯 **Dès aujourd'hui** :

**Étape 1** : Fais le tableau de toutes tes dettes
Créancier | Montant | Taux | Minimum mensuel

**Étape 2** : Calcule ton surplus (budget - dépenses - minimums)

**Étape 3** : Choisis ta méthode
Avalanche (taux le plus élevé) ou Boule de Neige (montant le plus petit) ?

**Étape 4** : Calcule ta date de liberté
Utilise unemo.de/payoff-calculator ou un tableur simple.

**Étape 5** : Mets en place les paiements automatiques

💡 **Cherche des sources supplémentaires** : peut-on vendre quelque chose, faire du freelance, négocier une hausse de salaire ? Chaque 100€ supplémentaire raccourcit la durée.

⚠️ **Ne crée aucune nouvelle dette pendant cette période !**`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Dans la méthode Avalanche, on cible d'abord...",
          choices: ['La dette avec le montant le plus élevé', 'La dette avec le taux d\'intérêt le plus élevé', 'La dette la plus ancienne', 'La dette avec le créancier le plus pressant'],
          correctIndex: 1,
          explanation: "La méthode Avalanche cible d'abord la dette au taux le plus élevé, car elle coûte le plus cher chaque mois. C'est la stratégie qui économise le plus d'argent.",
        },
        {
          question: "Quel est l'avantage de la méthode Boule de Neige vs Avalanche ?",
          choices: ['Elle économise plus d\'argent', 'Elle est plus rapide', 'Elle génère des victoires rapides qui maintiennent la motivation', 'Elle est recommandée par les banques'],
          correctIndex: 2,
          explanation: "La Boule de Neige procure des victoires rapides en liquidant d'abord les petites dettes. C'est psychologiquement motivant, même si elle coûte légèrement plus en intérêts.",
        },
        {
          question: "Rembourser une dette à 15%/an équivaut à...",
          choices: ['Perdre 15%/an', 'Un rendement garanti de 15%', 'Rien de spécial financièrement', 'Payer plus d\'impôts'],
          correctIndex: 1,
          explanation: "Rembourser une dette à 15% est comme obtenir un rendement de 15% garanti sur l'investissement. Aucun placement ne garantit ce rendement sans risque.",
        },
      ],
    },
  },
];
