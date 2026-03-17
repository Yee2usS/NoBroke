import { Module } from '@/types/module.types';

// Zone 2 : Forêt de l'Épargne — modules 4 à 12
export const MODULES_ZONE2_EXTRA: Module[] = [
  {
    id: 'module-2-4',
    zone: 2,
    title: 'Le Livret A en détail',
    description: 'Tout savoir sur le placement préféré des Français',
    isPremium: false,
    levelRequired: 14,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🏦',
    orderInZone: 4,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Le Livret A : c\'est quoi exactement ?',
          content: `Le **Livret A** est le placement réglementé le plus populaire de France, disponible dans toutes les banques.

**Caractéristiques** :
- Taux d'intérêt fixé par l'État (révisé 2 fois par an)
- Plafond de dépôt : **22 950€** (hors intérêts)
- Intérêts **totalement exonérés** d'impôts et de prélèvements sociaux
- Disponibilité immédiate : tu retires quand tu veux
- Un seul Livret A par personne en France

**Taux actuel** : 1,5% (depuis février 2026)

**Pour qui** : parfait pour le fonds d'urgence et les projets à court terme (< 3 ans).`,
        },
        {
          type: 'why',
          title: 'Pourquoi le Livret A est incontournable',
          content: `✅ **Sécurité totale** : garanti par l'État, risque zéro de perte
✅ **Disponibilité immédiate** : retrait en 24-48h, parfait pour les urgences
✅ **0% d'impôts** : contrairement aux placements financiers classiques
✅ **Simple et universel** : disponible dans n'importe quelle banque
✅ **Base de toute stratégie d'épargne** : c'est la fondation avant tout investissement

**Limite principale** : le taux ne bat pas toujours l'inflation. C'est un outil de sécurité, pas d'enrichissement.`,
        },
        {
          type: 'how',
          title: 'Optimiser son utilisation',
          content: `**Étape 1** : Utilise-le pour ton fonds d'urgence
3 à 6 mois de dépenses → sur Livret A, disponible immédiatement.

**Étape 2** : Utilise-le pour tes projets < 3 ans
Voyage, voiture, apport immobilier... l'argent doit être sécurisé et accessible.

**Étape 3** : Vise le plafond progressivement
22 950€ = objectif long terme. Commence par 1 000€, puis augmente.

**Étape 4** : Optimise les versements
Les intérêts sont calculés par quinzaine. Verse en début de quinzaine (1er ou 16 du mois) pour maximiser.

**Étape 5** : Ne le laisse pas dépasser son plafond
Au-delà de 22 950€, ouvre un LDDS (Livret Développement Durable et Solidaire).`,
        },
        {
          type: 'example',
          title: 'Stratégie Livret A de Julie',
          content: `**Julie, 25 ans, épargne mensuelle : 250€**

**Répartition sur Livret A** :
- Fonds d'urgence cible : 6 000€ (3 mois de dépenses)
- Projet voyage Japon : 2 000€
- Apport immobilier futur : 14 950€ (max plafond)

**Stratégie** :
- Phase 1 (6 mois) : 250€/mois → fonds urgence 1 500€ ✅
- Phase 2 (6 mois) : 250€/mois → fonds urgence complet 6 000€
- Phase 3 : 150€/mois sur Livret A + 100€/mois sur PEA

**Intérêts générés à 2,4%** :
- Sur 6 000€ : 144€/an nets d'impôts
- Sur 22 950€ : 550€/an nets d'impôts`,
        },
        {
          type: 'action',
          title: 'Optimise ton Livret A maintenant',
          content: `🎯 **Cette semaine** :

**Étape 1** : Vérifie que tu as un Livret A ouvert
Si non : ouvre-en un dans ta banque (5 minutes en ligne).

**Étape 2** : Calcule ton objectif de fonds d'urgence
Dépenses mensuelles × 3 = minimum sur Livret A.

**Étape 3** : Mets en place un virement automatique
Le jour de ta paie → vers ton Livret A.

**Étape 4** : Vérifie que ton taux est bien à jour
Le taux réglementé s'applique automatiquement.

💡 **Astuce timing** : verse entre le 1er et le 15 du mois (les intérêts sont calculés par quinzaine du 1 et du 16). Un versement le 17 attend la quinzaine du 1er mois suivant !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Quel est le plafond du Livret A ?',
          choices: ['10 000€', '15 000€', '22 950€', '50 000€'],
          correctIndex: 2,
          explanation: 'Le plafond du Livret A est de 22 950€ par personne. Au-delà, il faut utiliser d\'autres placements comme le LDDS ou le PEL.',
        },
        {
          question: 'Les intérêts du Livret A sont-ils imposables ?',
          choices: ['Oui, à 30%', 'Oui, à 12,8%', 'Non, totalement exonérés', 'Seulement au-delà de 1 000€'],
          correctIndex: 2,
          explanation: 'Les intérêts du Livret A sont totalement exonérés d\'impôts et de prélèvements sociaux. C\'est un avantage fiscal majeur.',
        },
        {
          question: 'Pour quoi le Livret A est-il IDÉAL ?',
          choices: ['Devenir millionnaire', 'Battre l\'inflation', 'Fonds d\'urgence et projets < 3 ans', 'Retraite à long terme'],
          correctIndex: 2,
          explanation: 'Le Livret A est idéal pour l\'épargne de précaution (fonds d\'urgence) et les projets à court terme, grâce à sa disponibilité immédiate et sa sécurité.',
        },
      ],
    },
  },

  {
    id: 'module-2-5',
    zone: 2,
    title: 'Le LEP : l\'épargne des gagnants',
    description: 'Le placement le plus rentable de France... que personne ne connaît',
    isPremium: false,
    levelRequired: 15,
    xpReward: 50,
    estimatedDuration: 7,
    icon: '💎',
    orderInZone: 5,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Qu\'est-ce que le LEP ?',
          content: `Le **LEP** (Livret d'Épargne Populaire) est le placement réglementé le plus rentable de France, réservé aux personnes ayant des revenus modestes.

**Caractéristiques** :
- Taux d'intérêt : **3,5%** (supérieur au Livret A à 2,4%)
- Plafond : **10 000€**
- Intérêts **100% exonérés** d'impôts
- Disponibilité immédiate
- Réservé sous condition de revenus

**Condition d'accès** : revenu fiscal de référence < 21 393€ (1 part fiscale, 2023)
→ Environ 60% des Français sont éligibles mais beaucoup ne le savent pas !`,
        },
        {
          type: 'why',
          title: 'Pourquoi le LEP est sous-utilisé ?',
          content: `✅ **Meilleur taux garanti de France** : 3,5% vs 2,4% Livret A → +45% de rendement
✅ **0% d'impôts** : mieux que n'importe quel compte épargne bancaire
✅ **Sécurité maximale** : garanti par l'État

**Le problème** : seuls 8 millions de LEP sont ouverts alors que 18 millions de personnes sont éligibles. 10 millions de personnes passent à côté sans le savoir !

**Gain concret** :
- 10 000€ sur Livret A (2,4%) = 240€/an
- 10 000€ sur LEP (3,5%) = 350€/an
- **Différence** : +110€/an pour la même somme

**Chiffre choc** : en ne connaissant pas le LEP, des millions de Français laissent en moyenne 50 à 100€/an sur la table.`,
        },
        {
          type: 'how',
          title: 'Comment ouvrir et utiliser son LEP',
          content: `**Étape 1** : Vérifie ton éligibilité
Ton revenu fiscal de référence est sur ta dernière déclaration d'impôts (case RFR). Si < 21 393€ (1 part), tu es éligible.

**Étape 2** : Ouvre un LEP dans ta banque
Demande directement à ta banque ou en ligne. Ils vérifient ton éligibilité automatiquement avec les impôts.

**Étape 3** : Stratégie d'utilisation
- Priorité 1 : remplis ton LEP (10 000€) avant le Livret A
- Il rapporte plus pour le même risque

**Étape 4** : Vérification annuelle
Si tes revenus augmentent et dépassent le plafond, tu peux conserver le LEP ouvert mais ne plus y verser.

**Étape 5** : Combine avec le Livret A
LEP (10 000€) + Livret A (22 950€) = 32 950€ totalement défiscalisés.`,
        },
        {
          type: 'example',
          title: 'Antoine découvre le LEP',
          content: `**Antoine, 26 ans, CDI à 1 600€ net/mois**
Revenu fiscal de référence : 18 500€ → Éligible LEP ✅

**Avant** :
- 8 000€ sur Livret A à 2,4%
- Intérêts annuels : 192€

**Après** :
- 8 000€ transférés sur LEP à 3,5%
- Intérêts annuels : 280€
- **Gain annuel** : +88€ pour 0 effort

**Quand Antoine atteint 10 000€ sur LEP** :
- LEP plein : 350€/an
- Livret A pour le reste
- Total intérêts défiscalisés : 350€ + Livret A

**Démarche** : appel de 5 minutes à sa banque.
**Gain total sur 5 ans** : +440€ par rapport au seul Livret A.`,
        },
        {
          type: 'action',
          title: 'Ouvre ton LEP cette semaine',
          content: `🎯 **Action immédiate** :

**Étape 1** : Récupère ta dernière déclaration d'impôts
Cherche "revenu fiscal de référence" (RFR).

**Étape 2** : Vérifie si RFR < 21 393€ (1 part fiscale)
Si oui : tu es éligible → ouvre ton LEP sans attendre !

**Étape 3** : Appelle ta banque ou va dans l'app
Demande l'ouverture d'un Livret d'Épargne Populaire.

**Étape 4** : Si tu as déjà un Livret A avec des fonds
Transfère jusqu'à 10 000€ du Livret A vers le LEP.

💡 **Si tu n'es pas éligible** : le Livret A + LDDS restent les meilleures options sécurisées.

⚠️ **Maximum** : 1 LEP par personne.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Quel est le taux d\'intérêt du LEP ?',
          choices: ['2,4%', '3,5%', '1%', '5%'],
          correctIndex: 1,
          explanation: 'Le LEP est à 3,5%, contre 2,4% pour le Livret A. C\'est le placement réglementé le plus rentable de France.',
        },
        {
          question: 'Qui peut ouvrir un LEP ?',
          choices: ['Tout le monde', 'Seulement les étudiants', 'Les personnes sous un plafond de revenu fiscal', 'Seulement les retraités'],
          correctIndex: 2,
          explanation: 'Le LEP est réservé aux personnes dont le revenu fiscal de référence est inférieur à un plafond (environ 21 393€ pour 1 part). Environ 60% des Français sont éligibles.',
        },
        {
          question: 'Quel est le plafond du LEP ?',
          choices: ['5 000€', '10 000€', '22 950€', '50 000€'],
          correctIndex: 1,
          explanation: 'Le plafond du LEP est de 10 000€. Au-delà, tu continues sur Livret A ou LDDS.',
        },
      ],
    },
  },

  {
    id: 'module-2-6',
    zone: 2,
    title: 'L\'assurance-vie expliquée',
    description: 'Le placement préféré des Français riches... accessible à tous',
    isPremium: false,
    levelRequired: 16,
    xpReward: 60,
    estimatedDuration: 12,
    icon: '🛡️',
    orderInZone: 6,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'L\'assurance-vie : bien plus qu\'une assurance',
          content: `Malgré son nom, l'**assurance-vie** est avant tout une **enveloppe d'investissement** avec des avantages fiscaux majeurs.

**Ce que c'est vraiment** :
Une enveloppe qui peut contenir différents supports :
- **Fonds en euros** : capital garanti, rendement modeste (2-4%/an)
- **Unités de compte (UC)** : fonds d'investissement, actions, immobilier → rendement variable, non garanti

**Avantages clés** :
- Fiscalité avantageuse après 8 ans
- Transmission optimisée (jusqu'à 152 500€ exonérés par bénéficiaire)
- Aucun plafond de versement
- Disponibilité des fonds à tout moment (avec implications fiscales)`,
        },
        {
          type: 'why',
          title: 'Pourquoi ouvrir une assurance-vie ?',
          content: `✅ **Fiscalité attractive après 8 ans** : abattement de 4 600€/an (9 200€ pour un couple) sur les gains
✅ **Outil de transmission** : permet de transmettre jusqu'à 152 500€ par bénéficiaire hors succession
✅ **Flexibilité** : tu gardes accès à ton argent, contrairement à un PER
✅ **Diversification** : accès à des centaines de supports d'investissement
✅ **Aucun plafond** : contrairement au PEA ou aux livrets

**Pour qui** : idéal pour l'épargne moyen/long terme (5 ans minimum), la retraite, et la transmission patrimoniale.`,
        },
        {
          type: 'how',
          title: 'Comment choisir et utiliser une assurance-vie',
          content: `**Étape 1** : Choisir le bon contrat
- Évite les contrats bancaires (frais élevés)
- Privilégie les contrats en ligne : Linxea, Lucya Cardif, Fortuneo
- Critères : frais sur versements (idéal : 0%), frais de gestion (<1%/an)

**Étape 2** : Définir ta répartition
- Prudent : 80% fonds euros + 20% UC
- Équilibré : 50% fonds euros + 50% UC
- Dynamique : 20% fonds euros + 80% UC

**Étape 3** : Verser régulièrement
Versement programmé mensuel pour lisser les performances.

**Étape 4** : Ne pas toucher pendant 8 ans
La fiscalité est maximale avant 8 ans.

**Étape 5** : Désigner les bénéficiaires`,
        },
        {
          type: 'example',
          title: 'Paul optimise sa transmission avec l\'assurance-vie',
          content: `**Paul, 35 ans** — ouvre une assurance-vie pour sa retraite et sa famille.

**Contrat choisi** : Linxea Spirit 2
- Frais sur versements : 0%
- Frais de gestion fonds euros : 0,5%/an
- Frais UC : 0,5%/an

**Répartition** :
- 70% fonds euros (sécurité) : ~3%/an
- 30% ETF World (croissance) : ~7%/an moyen

**Versement** : 200€/mois pendant 25 ans

**À 60 ans (dans 25 ans)** :
- Capital estimé : ~125 000€
- Rachat après 8 ans → abattement 4 600€/an sur les gains

**Transmission** :
- Bénéficiaire : sa compagne
- Exonération : 152 500€ hors succession`,
        },
        {
          type: 'action',
          title: 'Ouvre ton assurance-vie',
          content: `🎯 **Plan d'action** :

**Étape 1** : Tu as déjà ton fonds d'urgence (Livret A) ?
Si non → commence par là avant l'assurance-vie.

**Étape 2** : Compare les contrats en ligne
- Linxea Spirit 2
- Lucya Cardif (BforBank)
- Fortuneo Vie
Critère clé : 0% de frais sur versements.

**Étape 3** : Ouvre avec un premier versement (100€ suffit)

**Étape 4** : Mets en place un virement mensuel automatique

**Étape 5** : Désigne tes bénéficiaires (très important !)

💡 **Règle d'or** : ouvre-la le plus tôt possible. L'horloge des 8 ans commence à l'ouverture, pas au versement. Ouvre avec 100€ maintenant si besoin.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Qu\'est-ce qu\'un "fonds en euros" dans une assurance-vie ?',
          choices: ['Un fonds investi en actions européennes', 'Un support à capital garanti avec rendement modeste', 'Un fonds sans risque mais sans rendement', 'La monnaie utilisée dans le contrat'],
          correctIndex: 1,
          explanation: 'Le fonds en euros est un support à capital garanti. Tu ne peux pas perdre ta mise de départ, mais le rendement est modeste (2-4%/an).',
        },
        {
          question: 'Quand la fiscalité de l\'assurance-vie devient-elle la plus avantageuse ?',
          choices: ['Immédiatement', 'Après 3 ans', 'Après 8 ans', 'À la retraite'],
          correctIndex: 2,
          explanation: 'Après 8 ans, tu bénéficies d\'un abattement annuel de 4 600€ (9 200€ pour un couple) sur les gains lors des retraits.',
        },
        {
          question: 'Quel est l\'avantage de l\'assurance-vie pour la transmission ?',
          choices: ['Les héritiers ne paient jamais d\'impôts', 'Jusqu\'à 152 500€ par bénéficiaire transmis hors succession', 'L\'argent double automatiquement', 'Aucun avantage spécifique'],
          correctIndex: 1,
          explanation: 'L\'assurance-vie permet de transmettre jusqu\'à 152 500€ par bénéficiaire en dehors de la succession classique, avec une fiscalité très avantageuse.',
        },
      ],
    },
  },

  {
    id: 'module-2-7',
    zone: 2,
    title: 'Épargner pour ses objectifs',
    description: 'La méthode pour atteindre vacances, voiture, appart et tous tes projets',
    isPremium: false,
    levelRequired: 17,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🎯',
    orderInZone: 7,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'L\'épargne orientée objectifs',
          content: `L'**épargne orientée objectifs** consiste à épargner avec un but précis plutôt que de "mettre de côté sans raison".

**Pourquoi c'est différent** :
- Épargne vague : "Je mets 100€/mois de côté"
- Épargne orientée : "Je mets 150€/mois pour payer mes vacances au Japon en juillet 2026"

**Types d'objectifs** :
- **Court terme (< 1 an)** : vacances, cadeau, appareil électronique
- **Moyen terme (1-5 ans)** : voiture, apport immobilier, formation
- **Long terme (> 5 ans)** : retraite, résidence principale, liberté financière

**Règle clé** : chaque objectif a son propre compte/pot dédié.`,
        },
        {
          type: 'why',
          title: 'Pourquoi les objectifs concrets motivent plus',
          content: `✅ **Motivation X3** : épargner pour "les vacances au Japon" est 3x plus motivant qu'"épargner en général"
✅ **Montant clair** : tu sais exactement combien mettre de côté chaque mois
✅ **Prévention des piochages** : difficile de puiser dans "mon appart à Paris" pour acheter des vêtements
✅ **Satisfaction à l'arrivée** : atteindre un objectif concret est une victoire émotionnelle

**Chiffre choc** : les personnes avec des objectifs financiers écrits épargnent en moyenne 2,5x plus que celles sans objectifs définis.`,
        },
        {
          type: 'how',
          title: 'Créer et suivre ses objectifs d\'épargne',
          content: `**Étape 1** : Définis tes objectifs SMART
- Spécifique : "Vacances Japon" et non "voyage"
- Mesurable : 2 500€
- Atteignable : avec ton budget actuel
- Réaliste : en combien de mois ?
- Temporel : date limite précise

**Étape 2** : Calcule le versement mensuel nécessaire
Montant cible / Nombre de mois = versement mensuel

**Étape 3** : Ouvre un compte dédié pour chaque objectif
- Livret A : fonds d'urgence
- Sous-compte Revolut "Pot" : vacances
- Sous-compte "Pot" : apport immobilier

**Étape 4** : Automatise les virements

**Étape 5** : Suis l'avancement visuellement (graphique, thermomètre)`,
        },
        {
          type: 'example',
          title: 'Marine gère 4 objectifs simultanément',
          content: `**Marine, 29 ans** — épargne mensuelle disponible : 450€

**Ses 4 objectifs** :
- Fonds d'urgence : 6 000€ → 3 800€ atteint → 100€/mois encore 22 mois
- Vacances New York (décembre) : 1 800€ → 0€ → 200€/mois × 9 mois
- Nouvelle voiture (dans 2 ans) : 5 000€ → 0€ → 100€/mois × 50 mois
- Apport immobilier (5 ans) : 30 000€ → 0€ → 50€/mois (complété par investissement)

**Total allocation mensuelle** : 450€

**Outil utilisé** : 4 Pots Revolut
**Résultat** : chaque euro est fléché, 0 culpabilité lors des dépenses.`,
        },
        {
          type: 'action',
          title: 'Définis tes 3 prochains objectifs',
          content: `🎯 **Exercice maintenant** :

**Étape 1** : Écris 3 objectifs financiers concrets
- Objectif 1 (court terme) : _______€ dans _____ mois
- Objectif 2 (moyen terme) : _______€ dans _____ mois
- Objectif 3 (long terme) : _______€ dans _____ ans

**Étape 2** : Pour chacun, calcule le versement mensuel
Montant / Durée en mois = _______€/mois

**Étape 3** : Vérifie que la somme est dans ton budget d'épargne

**Étape 4** : Crée un compte/pot dédié pour chacun

**Étape 5** : Programme les virements automatiques

💡 **Visualise** : colle une photo de ton objectif (la plage, la voiture) dans ton portefeuille ou en fond d'écran. La visualisation amplifie la motivation.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Qu\'est-ce qu\'un objectif SMART ?',
          choices: ['Un objectif élevé et ambitieux', 'Un objectif Spécifique, Mesurable, Atteignable, Réaliste, Temporel', 'Un objectif approuvé par un conseiller financier', 'Un objectif sur smartphone'],
          correctIndex: 1,
          explanation: 'SMART = Spécifique, Mesurable, Atteignable, Réaliste, Temporel. "Économiser 2 500€ pour le Japon d\'ici juillet 2026" est SMART.',
        },
        {
          question: 'Tu veux 3 000€ dans 15 mois. Combien mettre de côté par mois ?',
          choices: ['150€', '200€', '250€', '300€'],
          correctIndex: 1,
          explanation: '3 000€ / 15 mois = 200€/mois. Le calcul est simple : montant cible divisé par le nombre de mois.',
        },
        {
          question: 'Pourquoi créer un compte dédié par objectif ?',
          choices: ['Pour payer moins d\'impôts', 'Pour éviter de piocher dans une épargne dédiée à autre chose', 'C\'est obligatoire par la loi', 'Pour obtenir un meilleur taux'],
          correctIndex: 1,
          explanation: 'Un compte dédié crée une barrière psychologique. Il est beaucoup plus difficile de dépenser l\'argent de "mes vacances" que l\'argent d\'un compte générique.',
        },
      ],
    },
  },

  {
    id: 'module-2-8',
    zone: 2,
    title: 'Les intérêts composés',
    description: 'La 8ème merveille du monde selon Einstein',
    isPremium: false,
    levelRequired: 18,
    xpReward: 60,
    estimatedDuration: 10,
    icon: '🌱',
    orderInZone: 8,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'La magie des intérêts composés',
          content: `Les **intérêts composés** sont des intérêts qui s'appliquent non seulement sur le capital initial, mais aussi sur les intérêts déjà accumulés.

**Intérêts simples** : tu gagnes des intérêts uniquement sur ton capital de départ.
**Intérêts composés** : tu gagnes des intérêts sur ton capital + sur les intérêts précédents.

**Exemple simple** :
1 000€ à 10%/an pendant 10 ans :
- Intérêts simples : 1 000€ + (100€ × 10) = 2 000€
- Intérêts composés : 1 000€ × (1,10)^10 = **2 593€**

**La différence** : 593€ générés sans rien faire, juste par la magie de la capitalisation !

**Albert Einstein** aurait dit : "Les intérêts composés sont la 8ème merveille du monde."`,
        },
        {
          type: 'why',
          title: 'Pourquoi commencer le plus tôt possible',
          content: `✅ **L'effet boule de neige** : plus tu attends, plus tu rates d'années de croissance exponentielle
✅ **Le temps est ton meilleur allié** : 10 ans de plus font une différence astronomique
✅ **Le coût de l'attente est énorme**

**Comparaison choc** :
- Alice investit 200€/mois de 25 à 35 ans (10 ans) puis arrête
- Bob investit 200€/mois de 35 à 65 ans (30 ans)
- À 65 ans, avec 7%/an :
  - Alice : **~338 000€** (pour 24 000€ versés)
  - Bob : **~243 000€** (pour 72 000€ versés)

**Alice a investi 3x MOINS et a plus à la fin** ! Tout ça grâce aux 10 ans d'avance.`,
        },
        {
          type: 'how',
          title: 'Comment profiter des intérêts composés',
          content: `**Étape 1** : Commencer le plus tôt possible
Même 50€/mois à 20 ans vaut mieux que 200€/mois à 40 ans.

**Étape 2** : Réinvestir tous les gains
Ne jamais retirer les intérêts ou dividendes → les laisser se composer.

**Étape 3** : Être régulier
Versements mensuels réguliers → lissage et capitalisation continue.

**Étape 4** : Minimiser les frais
Des frais de 1%/an vs 0,2%/an sur 30 ans : différence de 20-30% du capital final !

**Étape 5** : Choisir les bons placements
- Court terme : Livret A, LEP (intérêts composés mais faibles)
- Long terme : PEA, assurance-vie avec ETF (rendements plus élevés)`,
        },
        {
          type: 'example',
          title: 'Le calculateur d\'intérêts composés',
          content: `**Scénario 1 : 100€/mois pendant 30 ans à 7%/an**
- Versé : 36 000€
- Capital final : **121 997€**
- Gains générés : 85 997€ (dont 80% = intérêts composés !)

**Scénario 2 : 200€/mois pendant 20 ans à 7%/an**
- Versé : 48 000€
- Capital final : **104 492€**

**Scénario 3 : 500€/mois pendant 10 ans à 7%/an**
- Versé : 60 000€
- Capital final : **86 786€**

**Conclusion** : 100€/mois pendant 30 ans bat 500€/mois pendant 10 ans !
Le temps > le montant. Commencer tôt est l'optimisation numéro 1.`,
        },
        {
          type: 'action',
          title: 'Calcule ton futur patrimoine',
          content: `🎯 **Exercice** :

**Étape 1** : Va sur un calculateur d'intérêts composés en ligne
Cherche "compound interest calculator" ou "calculateur intérêts composés".

**Étape 2** : Entre tes données
- Montant initial : ton épargne actuelle
- Versement mensuel : ce que tu peux verser
- Taux annuel : 7% (moyenne historique long terme des marchés)
- Durée : jusqu'à ta retraite

**Étape 3** : Observe le résultat et ajuste

**Étape 4** : Réponds à la question : "Combien dois-je verser maintenant pour avoir X€ à 60 ans ?"

💡 **La règle des 72** : divise 72 par ton taux de rendement = nombre d'années pour doubler ton capital. À 7%/an → ton capital double tous les 10,3 ans !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Que sont les intérêts composés ?',
          choices: ['Des intérêts très élevés', 'Des intérêts calculés sur le capital + les intérêts déjà accumulés', 'Des intérêts garantis par l\'État', 'Des intérêts sans impôts'],
          correctIndex: 1,
          explanation: 'Les intérêts composés s\'appliquent sur le capital initial ET sur les intérêts déjà générés. C\'est ce mécanisme d\'accumulation qui crée la croissance exponentielle.',
        },
        {
          question: 'Selon la règle des 72, en combien d\'années double un capital à 7%/an ?',
          choices: ['5 ans', '7 ans', '10 ans', '14 ans'],
          correctIndex: 2,
          explanation: '72 / 7 = 10,3 ans. La règle des 72 dit : divise 72 par le taux annuel pour obtenir le nombre d\'années pour doubler ton capital.',
        },
        {
          question: 'Alice investit 10 ans tôt puis arrête. Bob investit 30 ans. Qui a plus à la fin ?',
          choices: ['Bob, car il a investi plus longtemps', 'Alice, grâce aux intérêts composés', 'Ils ont le même montant', 'Ça dépend des marchés'],
          correctIndex: 1,
          explanation: 'Les intérêts composés donnent un avantage décisif à celui qui commence tôt. Alice, qui commence 10 ans plus tôt, se retrouve avec plus malgré moins de versements.',
        },
      ],
    },
  },

  {
    id: 'module-2-9',
    zone: 2,
    title: 'Combien dois-je épargner ?',
    description: 'Trouve ton taux d\'épargne idéal selon ta situation',
    isPremium: true,
    levelRequired: 19,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🧮',
    orderInZone: 9,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Le taux d\'épargne : c\'est quoi ?',
          content: `Le **taux d\'épargne** est le pourcentage de tes revenus nets que tu mets de côté.

**Formule** :
Taux d'épargne = (Revenus - Dépenses) / Revenus × 100

**Exemple** :
- Revenus : 2 000€/mois
- Dépenses : 1 600€/mois
- Épargne : 400€/mois
- Taux d'épargne : 400 / 2 000 × 100 = **20%**

**Les grandes catégories** :
- < 5% : danger, très peu de marge
- 5-10% : plancher minimum
- 10-20% : bien, bonne base
- 20-30% : très bien, tu construis
- > 30% : excellent, tu accélères vers la liberté`,
        },
        {
          type: 'why',
          title: 'Pourquoi le taux d\'épargne change tout',
          content: `✅ **Il détermine la vitesse vers la liberté financière**
✅ **C'est un indicateur de santé financière global**
✅ **Il est indépendant du revenu** : on peut être riche et avoir un taux de 2%

**Tableau choc : années pour atteindre la liberté selon le taux d'épargne**
- Taux 5% → 66 ans de travail
- Taux 10% → 51 ans de travail
- Taux 20% → 37 ans de travail
- Taux 30% → 28 ans de travail
- Taux 50% → 17 ans de travail
- Taux 75% → 7 ans de travail !

**Chiffre clé** : passer de 10% à 20% d'épargne réduit le temps de travail de 14 ans !`,
        },
        {
          type: 'how',
          title: 'Augmenter son taux d\'épargne progressivement',
          content: `**Étape 1** : Calcule ton taux actuel
Épargne mensuelle / Revenus nets × 100

**Étape 2** : Fixe un objectif réaliste
Si tu es à 5%, vise 15% dans 6 mois (pas 50% demain).

**Étape 3** : La stratégie "Pay Yourself First"
Vire l'épargne automatiquement le jour de la paie AVANT de dépenser.
Ce qui reste est ton budget.

**Étape 4** : Augmente à chaque augmentation de salaire
Nouvelle paie +100€/mois → mets 50€ en épargne + 50€ pour toi.

**Étape 5** : Augmente progressivement (+1% chaque trimestre)
De 10% à 20% en un an, presque imperceptible.`,
        },
        {
          type: 'example',
          title: 'Progression du taux d\'épargne de Maxime',
          content: `**Maxime, 24 ans, 1 800€ net/mois**

**Janvier** : Taux = 5% (90€/mois)
- Dépenses : 1 710€ — trop serré

**Mars** : Audit dépenses → trouve 150€ de gaspillage
Taux = 13% (240€/mois)
- 150€ sur Livret A
- 90€ en épargne "objectifs"

**Juillet** : Augmentation de salaire +150€ net
- 75€ de plus en épargne → taux = 17% (315€/mois)
- 75€ pour lui

**Décembre** : Taux = 20% (360€/mois)
- Livret A : 3 000€ (fonds urgence en cours)
- PEA : 500€ (premiers investissements)
**Épargne annuelle** : 4 320€`,
        },
        {
          type: 'action',
          title: 'Calcule et améliore ton taux',
          content: `🎯 **Maintenant** :

**Étape 1** : Calcule ton taux d'épargne actuel
(Revenus - Dépenses) / Revenus × 100 = _______%

**Étape 2** : Situe-toi dans les catégories
< 5% / 5-10% / 10-20% / 20-30% / >30%

**Étape 3** : Fixe ton objectif à 3 mois
+5 points de taux d'épargne = objectif raisonnable

**Étape 4** : Identifie comment y arriver
- Réduire une catégorie de dépenses ?
- Augmenter ses revenus (formation, négociation) ?
- Les deux ?

**Étape 5** : Programme le virement automatique épargne

💡 **Règle d'or** : ton taux d'épargne est l'indicateur financier le plus important à suivre. Bien plus que le montant absolu épargné.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Si tu gagnes 2 500€ et dépenses 2 000€, quel est ton taux d\'épargne ?',
          choices: ['10%', '20%', '25%', '80%'],
          correctIndex: 1,
          explanation: '500€ épargnés / 2 500€ de revenus × 100 = 20% de taux d\'épargne.',
        },
        {
          question: 'Quelle est la stratégie "Pay Yourself First" ?',
          choices: ['Se payer en premier avec son salaire', 'Virer l\'épargne automatiquement AVANT de dépenser', 'Dépenser d\'abord et épargner le reste', 'Ne dépenser que pour soi-même'],
          correctIndex: 1,
          explanation: '"Pay yourself first" = virer l\'épargne automatiquement le jour de la paie, AVANT toute dépense. Ce qui reste est le budget disponible.',
        },
        {
          question: 'Passer de 10% à 20% d\'épargne réduit le nombre d\'années de travail de...',
          choices: ['5 ans', '10 ans', '14 ans', '20 ans'],
          correctIndex: 2,
          explanation: 'À 10% d\'épargne : 51 ans de travail. À 20% : 37 ans. Soit 14 ans de gagnés en doublant son taux d\'épargne.',
        },
      ],
    },
  },

  {
    id: 'module-2-10',
    zone: 2,
    title: 'Épargne vs Inflation',
    description: 'Comment protéger ton pouvoir d\'achat quand les prix montent',
    isPremium: true,
    levelRequired: 20,
    xpReward: 60,
    estimatedDuration: 9,
    icon: '📈',
    orderInZone: 10,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'L\'inflation : l\'ennemi silencieux de l\'épargne',
          content: `L'**inflation** est la hausse générale et durable des prix, qui réduit le pouvoir d'achat de ton argent au fil du temps.

**Exemple concret** :
- Un panier de courses à 100€ en 2020
- Le même panier à 112€ en 2024 (inflation ~3%/an)
- Ton argent vaut moins sans que tu t'en rendes compte

**Taux d'inflation** :
- Zone euro cible : 2%/an
- Période 2021-2023 : jusqu'à 6-10%/an en France

**Le problème de l'épargne statique** :
10 000€ sous le matelas perd en pouvoir d'achat chaque année :
- À 2%/an : vaut 8 200€ en pouvoir d'achat dans 10 ans
- À 3%/an : vaut 7 400€ en pouvoir d'achat dans 10 ans`,
        },
        {
          type: 'why',
          title: 'Pourquoi ton Livret A ne suffit pas toujours',
          content: `✅ **Le rendement réel** = taux nominal - inflation
- Livret A à 2,4% avec inflation à 3% = rendement réel **-0,6%**
- Tu perds du pouvoir d'achat même en épargnant !

✅ **Seuls les actifs "réels" battent l'inflation sur le long terme** :
- Actions / ETF : +7%/an en moyenne historique → rendement réel +5%
- Immobilier : +3-4%/an → rendement réel +1-2%
- Or : protection contre l'inflation, mais volatile

**Chiffre choc** : 1 000€ laissés sur un compte courant (0,01%) pendant 20 ans avec 3%/an d'inflation ne vaut plus que **540€ en pouvoir d'achat réel**.`,
        },
        {
          type: 'how',
          title: 'Protéger son épargne contre l\'inflation',
          content: `**Stratégie selon la durée** :

**Court terme (< 2 ans)** : Livret A, LEP
Même si le rendement réel est faible, c'est la sécurité et la disponibilité qui prime.

**Moyen terme (2-7 ans)** : Assurance-vie fonds euros + UC
Diversification qui vise à battre l'inflation.

**Long terme (> 7 ans)** : PEA, ETF, immobilier
Seuls les actifs risqués battent durablement l'inflation.

**La règle d'or** :
- Fonds urgence (3-6 mois) → Livret A/LEP (sécurité avant tout)
- Reste → placements qui battent l'inflation selon ta durée

**Diversification** :
Ne pas mettre tous ses œufs dans le même panier.`,
        },
        {
          type: 'example',
          title: 'Claire protège son patrimoine à 30 ans',
          content: `**Claire, 30 ans** — patrimoine de 25 000€

**Allocation anti-inflation** :
- Fonds d'urgence (6 000€) → Livret A : sécurité absolue
- Projet achat (10 000€, horizon 4 ans) → Assurance-vie équilibrée
- Retraite (9 000€, horizon 30 ans) → PEA avec ETF World

**Rendements estimés** :
- Livret A (6 000€ × 2,4%) : 144€/an
- AV équilibrée (10 000€ × ~4%) : 400€/an
- ETF World (9 000€ × ~7%) : 630€/an

**Total gains estimés** : ~1 174€/an
**Inflation protégée sur la majorité** ✅

**Comparaison tout en Livret A** :
- 25 000€ × 2,4% = 600€/an
- Avec inflation 3% : perte réelle sur les 19 000€ non investis`,
        },
        {
          type: 'action',
          title: 'Évalue et ajuste ton allocation',
          content: `🎯 **Ton audit anti-inflation** :

**Étape 1** : Calcule ton "taux de rendement réel" actuel
Taux moyen de ton épargne - taux d'inflation = rendement réel
(> 0 = tu bats l'inflation / < 0 = tu perds)

**Étape 2** : Identifie tes horizons de placement
- Court terme : livrets réglementés ✅
- Moyen terme : assurance-vie ✅
- Long terme : PEA/ETF à créer ?

**Étape 3** : Si tu n'as pas encore de PEA
C'est le prochain niveau à franchir (Zone 4 de NoBroke).

**Étape 4** : Ne touche pas au fonds d'urgence
Il reste en Livret A, même si le rendement réel est négatif. La sécurité passe avant.

💡 **Règle simple** : argent dont tu n'auras pas besoin avant 7 ans → investis-le. Argent dont tu pourrais avoir besoin → Livret A/LEP.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Qu\'est-ce que le rendement réel d\'un placement ?',
          choices: ['Le taux affiché par la banque', 'Le taux nominal moins l\'inflation', 'Les intérêts après impôts', 'Le taux garanti par l\'État'],
          correctIndex: 1,
          explanation: 'Rendement réel = taux nominal - inflation. Si ton Livret A rapporte 2,4% et l\'inflation est à 3%, ton rendement réel est -0,6%.',
        },
        {
          question: 'Quel type de placement bat durablement l\'inflation sur le long terme ?',
          choices: ['Compte courant', 'Livret A', 'Matelas', 'Actions / ETF diversifiés'],
          correctIndex: 3,
          explanation: 'Les actions et ETF diversifiés rapportent en moyenne 7%/an historiquement, bien au-dessus de l\'inflation à 2-3%/an. Mais ce rendement n\'est pas garanti à court terme.',
        },
        {
          question: 'Pour l\'argent dont tu auras besoin dans 1 an, le meilleur placement est...',
          choices: ['ETF World (potentiellement -30%)', 'Livret A (sécurité et disponibilité)', 'Cryptomonnaies', 'Actions individuelles'],
          correctIndex: 1,
          explanation: 'Pour de l\'argent à utiliser dans moins de 2 ans, la sécurité prime. Le Livret A ou LEP sont parfaits : capital garanti et disponible immédiatement.',
        },
      ],
    },
  },

  {
    id: 'module-2-11',
    zone: 2,
    title: 'Construire sa richesse progressivement',
    description: 'La stratégie complète pour passer de 0 à l\'indépendance financière',
    isPremium: true,
    levelRequired: 21,
    xpReward: 75,
    estimatedDuration: 12,
    icon: '🏗️',
    orderInZone: 11,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'La pyramide de la richesse',
          content: `Construire sa richesse ne se fait pas d'un coup. Il existe une **ordre logique et progressif**.

**La pyramide de richesse** (de la base au sommet) :

**Niveau 1 - Fondation** : Pas de dettes dangereuses + budget maîtrisé
**Niveau 2 - Sécurité** : Fonds d'urgence (3-6 mois de dépenses)
**Niveau 3 - Épargne réglementée** : Livret A, LEP, LDDS remplis
**Niveau 4 - Investissement long terme** : PEA, assurance-vie avec UC
**Niveau 5 - Immobilier** : résidence principale ou investissement locatif
**Niveau 6 - Accélération** : revenus passifs, optimisation fiscale, diversification avancée

**Règle clé** : ne passe jamais au niveau supérieur sans avoir sécurisé le niveau inférieur.`,
        },
        {
          type: 'why',
          title: 'Pourquoi l\'ordre est crucial',
          content: `✅ **Investir sans fonds d'urgence** = risque de devoir vendre en urgence (souvent à perte)
✅ **Investir avec des dettes à taux élevé** = perdre de l'argent (ta dette coûte plus que ton investissement)
✅ **Sauter des étapes** = fragilité de toute la structure

**Analogie** : construire une maison sans fondations solides. Elle peut tenir un moment, mais s'effondre au premier choc.

**Chiffre choc** : 40% des personnes qui investissent en bourse sans fonds d'urgence ont dû vendre leurs investissements à perte lors d'une urgence.`,
        },
        {
          type: 'how',
          title: 'Les étapes concrètes et les délais',
          content: `**Niveau 1 (Mois 1-3)** : Maîtrise ton budget
- Budget mensuel établi
- Pas de découvert
- Dépenses non essentielles optimisées

**Niveau 2 (Mois 3-12)** : Fonds d'urgence
- Objectif : 3 mois de dépenses sur Livret A
- Virement automatique mensuel

**Niveau 3 (Mois 6-24)** : Épargne réglementée
- Livret A + LEP progressivement remplis

**Niveau 4 (Mois 12+)** : Investissement long terme
- Ouverture PEA
- 50-200€/mois en ETF World

**Niveau 5 (Années 5-10)** : Immobilier
- Apport constitué
- Premier achat immobilier ou investissement locatif`,
        },
        {
          type: 'example',
          title: 'La trajectoire de Sonia sur 10 ans',
          content: `**Sonia, 25 ans, 1 900€ net/mois, épargne mensuelle : 300€**

**Année 1** (Niveau 1-2) :
- Budget maîtrisé ✅
- Fonds d'urgence : 3 600€ sur Livret A ✅

**Année 2-3** (Niveau 3) :
- LEP à 5 000€ ✅
- Livret A à 8 000€ ✅

**Année 3-5** (Niveau 4) :
- PEA ouvert, 150€/mois en ETF World
- Assurance-vie : 100€/mois
- Patrimoine investi : ~8 000€

**Année 5-10** (Niveau 5) :
- Apport immobilier constitué : 30 000€
- PEA : ~25 000€
- Achat résidence principale ✅

**À 35 ans** :
Patrimoine net estimé : **~75 000€**`,
        },
        {
          type: 'action',
          title: 'Évalue ton niveau actuel',
          content: `🎯 **Diagnostic personnel** :

**Niveau 1** ✅ ou ❌ : Budget maîtrisé, pas de découvert régulier ?
**Niveau 2** ✅ ou ❌ : Fonds d'urgence ≥ 3 mois de dépenses ?
**Niveau 3** ✅ ou ❌ : Livret A et/ou LEP ouverts et alimentés ?
**Niveau 4** ✅ ou ❌ : PEA ou assurance-vie avec investissement ?
**Niveau 5** ✅ ou ❌ : Immobilier acquis ou en cours ?

**Identifie ton niveau actuel et concentre-toi sur lui.**
Ne saute pas d'étape, même si le niveau suivant semble plus excitant.

💡 **Ta prochaine action concrète** :
Si niveau 1-2 : fonds d'urgence d'abord
Si niveau 3 : ouvre un PEA (Module Zone 4)
Si niveau 4 : commence à regarder l'immobilier (Module Zone 4-5)`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Quelle est la première étape de la pyramide de richesse ?',
          choices: ['Investir en bourse', 'Acheter de l\'immobilier', 'Maîtriser son budget et éliminer les dettes dangereuses', 'Ouvrir une assurance-vie'],
          correctIndex: 2,
          explanation: 'La fondation de la pyramide est un budget maîtrisé sans dettes dangereuses. Sans cette base, toute la structure est fragile.',
        },
        {
          question: 'Pourquoi faut-il avoir un fonds d\'urgence AVANT d\'investir en bourse ?',
          choices: ['C\'est la loi', 'Pour éviter de devoir vendre ses investissements à perte en cas d\'urgence', 'Les investissements nécessitent un minimum de garantie', 'Le Livret A rapporte plus que la bourse'],
          correctIndex: 1,
          explanation: 'Sans fonds d\'urgence, la moindre dépense imprévue peut forcer à vendre des investissements, parfois au pire moment (lors d\'une baisse des marchés).',
        },
        {
          question: 'Dans quel ordre doit-on investir ?',
          choices: ['Bourse → Immobilier → Fonds urgence', 'Fonds urgence → Livrets → PEA/Assurance-vie → Immobilier', 'Immobilier en premier car c\'est sûr', 'Tout en même temps pour diversifier'],
          correctIndex: 1,
          explanation: 'L\'ordre logique : sécurité d\'abord (fonds urgence), puis optimisation fiscale (livrets réglementés), puis investissement long terme (PEA), puis immobilier.',
        },
      ],
    },
  },

  {
    id: 'module-2-12',
    zone: 2,
    title: 'Le PEL : Plan Épargne Logement',
    description: 'Tout savoir sur ce placement pour préparer ton achat immobilier',
    isPremium: true,
    levelRequired: 22,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🏠',
    orderInZone: 12,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Qu\'est-ce que le PEL ?',
          content: `Le **PEL** (Plan Épargne Logement) est un produit d'épargne réglementé conçu pour préparer un achat immobilier.

**Caractéristiques** :
- Taux d'intérêt : **1%** pour les PEL ouverts depuis janvier 2024 (contre 2-3% pour les plus anciens)
- Plafond de dépôt : **61 200€**
- Durée minimale : 4 ans pour toucher les avantages
- Versement minimum : 540€/an (45€/mois)
- Durée maximale : 10 ans (puis continue à produire des intérêts sans nouveaux versements)

**Avantage principal** : donne accès à un prêt immobilier à taux préférentiel après 4 ans.

**Fiscalité** : intérêts imposables après 12 ans (flat tax 30%).`,
        },
        {
          type: 'why',
          title: 'Dans quel cas le PEL vaut-il le coup ?',
          content: `✅ **Si tu as un PEL ancien (> 2016)** : taux de 2-2,5%, intérêts non imposables → excellent, garde-le précieusement !
✅ **Pour préparer un achat immobilier avec un projet défini**
✅ **Pour accéder au prêt PEL** : taux garanti à l'avance, intéressant si les taux montent

**Quand le PEL est moins intéressant** :
- Taux actuel (1%) inférieur au Livret A (2,4%)
- Moins flexible que le Livret A (blocage des fonds)
- Intérêts fiscalisés

**Conclusion** : si tu as déjà un Livret A et LEP bien remplis et un projet immobilier dans 4-10 ans → le PEL peut compléter ta stratégie.`,
        },
        {
          type: 'how',
          title: 'Optimiser son PEL',
          content: `**Si tu as déjà un PEL ancien (ouvert avant 2023)** :
- Ne le ferme JAMAIS si le taux est > 2%
- Continue de le alimenter au minimum (540€/an)
- C'est un trésor qui ne se refait plus

**Si tu envisages d'ouvrir un PEL nouveau (2024)** :
- Taux à 1% → moins attractif que Livret A
- N'ouvre que si tu as un projet immobilier dans 4-10 ans
- Et seulement après avoir maximisé Livret A et LEP

**Calcul du prêt PEL** :
Le montant du prêt obtenu dépend des "droits à prêt" accumulés :
Droits à prêt = Intérêts capitalisés × 2,5

**Pour un prêt PEL maximal de 92 000€** :
Il faut atteindre 36 800€ de droits à prêt.`,
        },
        {
          type: 'example',
          title: 'Deux situations différentes',
          content: `**CAS 1 - Lucas, PEL ouvert en 2015 à 2%** :
- Capital : 35 000€
- Intérêts non imposables
- Intérêts annuels : 700€
**→ Conseil : NE PAS FERMER. C'est un placement exceptionnel plus disponible.**

**CAS 2 - Emma, projet achat immobilier dans 6 ans** :
- Elle a déjà : Livret A (10 000€) + LEP (8 000€)
- Elle envisage d'ouvrir un PEL en 2024 (taux 1%)

**Comparaison** :
- Option PEL : 1% → 5 000€ en 6 ans = 300€ d'intérêts
- Option Livret A : 2,4% → 5 000€ en 6 ans = 720€ d'intérêts

**→ Pour Emma : le Livret A est plus rentable. Le PEL n'est intéressant que pour accéder au prêt.**`,
        },
        {
          type: 'action',
          title: 'Décide si le PEL est fait pour toi',
          content: `🎯 **Checklist PEL** :

**Question 1** : As-tu déjà un PEL ouvert ?
- Oui, avant 2016 : GARDE-LE précieusement, il est en or
- Oui, récent (2023-2024) : maintiens le versement minimum
- Non : vas à la question 2

**Question 2** : As-tu déjà maximisé Livret A + LEP ?
- Non : commence par là, ils sont plus rentables actuellement
- Oui : vas à la question 3

**Question 3** : As-tu un projet immobilier dans 4-10 ans ?
- Non : préfère l'assurance-vie ou PEA
- Oui : le PEL peut être pertinent pour accéder au prêt PEL

💡 **Règle** : avec un taux PEL à 1%, maximise d'abord Livret A (2,4%) et LEP (3,5%) avant d'alimenter un PEL récent.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Quel est le taux des PEL ouverts en 2024 ?',
          choices: ['2,4%', '1%', '3,5%', '0,5%'],
          correctIndex: 1,
          explanation: 'Les PEL ouverts depuis janvier 2024 ont un taux de 1%, inférieur au Livret A (2,4%). Les PEL anciens (avant 2016) avaient des taux bien plus élevés.',
        },
        {
          question: 'Que faut-il faire avec un PEL ancien ouvert en 2015 à 2,5% ?',
          choices: ['Le fermer pour ouvrir un Livret A', 'L\'oublier', 'Le conserver précieusement car ce taux n\'est plus accessible', 'Tout retirer pour investir en bourse'],
          correctIndex: 2,
          explanation: 'Un PEL ancien à 2,5% avec intérêts non imposables est un vrai trésor. Ce taux n\'est plus disponible. Il faut absolument le conserver.',
        },
        {
          question: 'Quelle est la durée minimale pour accéder aux avantages du PEL ?',
          choices: ['1 an', '2 ans', '4 ans', '10 ans'],
          correctIndex: 2,
          explanation: 'Le PEL doit être conservé au moins 4 ans pour bénéficier du prêt immobilier et des avantages associés.',
        },
      ],
    },
  },
];
