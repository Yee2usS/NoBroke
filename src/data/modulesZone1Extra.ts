import { Module } from '@/types/module.types';

// Zone 1 : Village des Fauchés — modules 4 à 12
export const MODULES_ZONE1_EXTRA: Module[] = [
  {
    id: 'module-1-4',
    zone: 1,
    title: 'Dépenses fixes vs variables',
    description: 'Comprends la différence et reprends le contrôle de chaque euro',
    isPremium: false,
    levelRequired: 4,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🔀',
    orderInZone: 4,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Deux types de dépenses',
          content: `**Dépenses fixes** : montant identique chaque mois, impossible à éviter à court terme.
- Loyer / crédit immobilier
- Assurances (voiture, habitation, santé)
- Abonnements téléphone, internet
- Remboursements de crédits

**Dépenses variables** : montant qui change selon tes choix et habitudes.
- Courses alimentaires
- Sorties / restaurants
- Shopping vêtements
- Transport (carburant, transports en commun)
- Loisirs

**La clé** : les fixes se négocient rarement, les variables se réduisent facilement.`,
        },
        {
          type: 'why',
          title: 'Pourquoi cette distinction est cruciale ?',
          content: `✅ **Anticiper tes charges incompressibles** : tu sais exactement combien tu dois avoir sur ton compte chaque mois
✅ **Identifier où agir** : inutile de chercher à réduire ton loyer ce mois-ci, mais tes sorties restaurants oui
✅ **Éviter les mauvaises surprises** : 70% des découverts viennent d'un mauvais suivi des fixes
✅ **Planifier tes économies** : revenus - fixes = budget réel pour le reste

**Chiffre choc** : En moyenne, les Français sous-estiment leurs dépenses fixes de 200€/mois !`,
        },
        {
          type: 'how',
          title: 'Comment les identifier et les classer ?',
          content: `**Étape 1** : Liste tes fixes
Consulte tes 3 derniers relevés bancaires. Surligne tous les montants identiques ou récurrents.

**Étape 2** : Calcule ton "plancher mensuel"
Fixes totaux = _______€ → c'est le minimum vital à avoir en compte

**Étape 3** : Calcule ton budget libre
Revenus - Fixes = Budget libre pour variables + épargne

**Étape 4** : Classe tes variables par catégorie
- Alimentaire
- Transport
- Loisirs & sorties
- Shopping
- Divers

**Étape 5** : Fixe un plafond à chaque catégorie variable`,
        },
        {
          type: 'example',
          title: 'Léa, 26 ans, 1 900€ net/mois',
          content: `**Revenus** : 1 900€

**Dépenses fixes** (950€)
- Loyer : 650€
- Assurance habitation : 15€
- Mutuelle : 35€
- Téléphone : 20€
- Internet : 25€
- Netflix + Spotify : 20€
- Crédit voiture : 185€

**Plancher mensuel** : 950€
**Budget libre** : 1 900€ - 950€ = 950€

**Répartition des 950€ libres** :
- Courses : 300€
- Transports : 80€
- Sorties : 150€
- Shopping : 120€
- Épargne : 300€ 🎉`,
        },
        {
          type: 'action',
          title: 'Classe tes propres dépenses',
          content: `🎯 **Exercice maintenant** :

**Étape 1** : Ouvre ton application bancaire
**Étape 2** : Regarde le mois dernier et classe chaque dépense
- Fixe (F) ou Variable (V)
**Étape 3** : Additionne tes fixes → c'est ton plancher
**Étape 4** : Calcule ton budget libre

💡 **Astuce** : Crée deux colonnes dans un tableau Google Sheets ou une note.

⚠️ **Piège courant** : Les abonnements oubliés (streaming, app, gym...) sont des fixes ! Fais la liste complète.

Dans le prochain module, on voit comment **couper les dépenses inutiles** sans se priver !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Ton loyer est une dépense...',
          choices: ['Variable car tu peux déménager', 'Fixe car identique chaque mois', 'Ni fixe ni variable', 'Ça dépend du mois'],
          correctIndex: 1,
          explanation: 'Le loyer est une dépense fixe : même montant chaque mois, impossible à modifier à court terme.',
        },
        {
          question: 'Tu gagnes 2 000€ et tes fixes sont 800€. Ton budget libre est de...',
          choices: ['800€', '2 000€', '1 200€', '1 800€'],
          correctIndex: 2,
          explanation: '2 000€ - 800€ = 1 200€ de budget libre pour tes variables et ton épargne.',
        },
        {
          question: 'Quel levier est le plus facile pour économiser rapidement ?',
          choices: ['Réduire son loyer', 'Réduire ses dépenses variables', 'Changer de mutuelle', 'Résilier son abonnement internet'],
          correctIndex: 1,
          explanation: 'Les dépenses variables (sorties, shopping, courses) sont les plus faciles à réduire immédiatement, contrairement aux fixes.',
        },
      ],
    },
  },

  {
    id: 'module-1-5',
    zone: 1,
    title: 'Couper ses dépenses sans se priver',
    description: 'Les vraies techniques pour dépenser moins en vivant mieux',
    isPremium: false,
    levelRequired: 5,
    xpReward: 50,
    estimatedDuration: 9,
    icon: '✂️',
    orderInZone: 5,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Se priver vs Optimiser',
          content: `Il y a une grande différence entre **se priver** et **optimiser**.

**Se priver** : supprimer ce qu'on aime, souffrir, craquer au bout de 2 semaines.

**Optimiser** : obtenir la même satisfaction pour moins cher.

**L'objectif** n'est pas de vivre comme un moine, mais d'éliminer les dépenses qui ne t'apportent aucune satisfaction réelle.

**Règle d'or** : avant chaque achat, demande-toi "est-ce que ça m'apporte vraiment de la valeur ?" Si la réponse est non ou "bof", c'est une piste d'économie.`,
        },
        {
          type: 'why',
          title: 'Pourquoi on dépense trop sans s\'en rendre compte ?',
          content: `✅ **Les achats impulsifs** : 40% de nos achats ne sont pas planifiés
✅ **Les petites sommes qui s'accumulent** : 3€ de café × 20 jours = 60€/mois = 720€/an
✅ **Les abonnements fantômes** : services qu'on n'utilise plus mais qu'on paie encore
✅ **Le marketing** : promotions, soldes, "dernier article"...

**Chiffre choc** : En cherchant 30 minutes ses abonnements, un Français moyen trouve en moyenne 4 abonnements inutilisés pour un total de 45€/mois !`,
        },
        {
          type: 'how',
          title: '6 techniques concrètes pour réduire',
          content: `**Étape 1** : La règle des 72h
Pour tout achat > 50€, attends 72h avant d'acheter. 80% des envies passent.

**Étape 2** : Fais une liste avant les courses
Et n'achète QUE ce qui est dessus. Économie moyenne : 30% du ticket.

**Étape 3** : Audite tes abonnements
Liste tous tes prélèvements automatiques, résilie ce que tu n'utilises plus.

**Étape 4** : Cuisine plus souvent
1 repas cuisiné = 3-4€ vs 12-15€ au restaurant ou en livraison.

**Étape 5** : Compare avant d'acheter
Utilise Google Shopping ou Camelcamelcamel pour les prix Amazon.

**Étape 6** : Négocie tes contrats
Téléphone, internet, assurances : appelle et demande un meilleur tarif.`,
        },
        {
          type: 'example',
          title: 'Thomas économise 350€/mois sans se priver',
          content: `**Thomas, 28 ans, avant le bilan** :
Dépenses mensuelles : 1 700€

**Ce qu'il a trouvé** :
- Abonnements inutilisés : 45€/mois (gym jamais utilisé, app payante oubliée)
- Café quotidien au bar : 60€/mois → remplacé par thermos maison : 8€/mois
- Livraisons repas x4/semaine : 200€/mois → réduit à x1 : 50€/mois
- Achats impulsifs Amazon : 120€/mois → règle 72h → 30€/mois
- Forfait téléphone négocié : 35€ → 20€/mois

**Économies sans se priver** : 352€/mois
**Nouvelles dépenses** : 1 348€/mois
**Impact annuel** : +4 224€ d'épargne 🎉`,
        },
        {
          type: 'action',
          title: 'Ton audit dépenses en 20 minutes',
          content: `🎯 **Fais-le maintenant** :

**Étape 1** : Ouvre ton relevé du mois dernier
**Étape 2** : Surligne en rouge tout ce que tu regrettes d'avoir acheté
**Étape 3** : Identifie tes "cafés" (petites dépenses quotidiennes qui s'accumulent)
**Étape 4** : Liste tes abonnements et coche ceux utilisés moins d'une fois par semaine
**Étape 5** : Calcule le total de tes "rouge + abonnements inutiles"

💡 **Objectif** : trouver au moins 100€ à économiser sans aucun sacrifice réel.

⚠️ **Ne supprime pas ce qui te fait vraiment plaisir** ! L'objectif est d'optimiser, pas de souffrir.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'La règle des 72h consiste à...',
          choices: ['Ne pas dépenser pendant 3 jours', 'Attendre 72h avant tout achat non planifié', 'Comparer 72 prix avant d\'acheter', 'Économiser 72€ par mois'],
          correctIndex: 1,
          explanation: 'En attendant 72h avant un achat impulsif, 80% des envies passent. C\'est l\'outil anti-impulsion le plus efficace.',
        },
        {
          question: 'Un café à 3€ par jour ouvré (20 jours/mois) représente par an...',
          choices: ['360€', '720€', '1 080€', '60€'],
          correctIndex: 1,
          explanation: '3€ × 20 jours × 12 mois = 720€/an. Les petites dépenses quotidiennes ont un impact massif sur le long terme.',
        },
        {
          question: 'Quelle est la différence entre se priver et optimiser ?',
          choices: ['Aucune différence', 'Optimiser = supprimer tout plaisir', 'Optimiser = même satisfaction pour moins cher', 'Se priver = économiser plus'],
          correctIndex: 2,
          explanation: 'Optimiser, c\'est obtenir la même satisfaction pour moins cher (ex : thermos vs café du bar). Se priver, c\'est souffrir — inefficace sur le long terme.',
        },
      ],
    },
  },

  {
    id: 'module-1-6',
    zone: 1,
    title: 'Les abonnements cachés',
    description: 'Traque et supprime les prélèvements qui vident ton compte en silence',
    isPremium: false,
    levelRequired: 6,
    xpReward: 50,
    estimatedDuration: 7,
    icon: '🔍',
    orderInZone: 6,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Qu\'est-ce qu\'un abonnement caché ?',
          content: `Un **abonnement caché** (ou "abonnement fantôme") est un prélèvement automatique régulier pour un service que tu utilises peu ou pas du tout.

**Types d'abonnements courants** :
- Streaming : Netflix, Prime, Disney+, Canal+, Spotify, Deezer
- Applications : jeux, productivité, santé, fitness
- Abonnements physiques : box, magazines, clubs
- Services : cloud, outils en ligne, VPN
- Assurances inutiles : protection achat, garanties étendues

**Le piège** : on s'abonne facilement (souvent avec un essai gratuit) et on oublie de résilier.

**En France**, un foyer paie en moyenne **150€/mois** en abonnements !`,
        },
        {
          type: 'why',
          title: 'Pourquoi c\'est un problème majeur ?',
          content: `✅ **L'effet "latte"** : chaque abonnement semble petit (8€, 15€, 20€) mais l'addition est énorme
✅ **L'oubli organisé** : les entreprises savent que tu oublies — leur modèle repose là-dessus
✅ **La résiliation compliquée** : certains services font tout pour que tu ne partes pas
✅ **La duplication** : combien de fois paies-tu pour deux services similaires ?

**Chiffre choc** : 84% des gens sous-estiment leurs dépenses d'abonnements. En moyenne, ils pensent payer 86€/mois... alors qu'ils paient 219€/mois !`,
        },
        {
          type: 'how',
          title: 'Comment traquer tous tes abonnements',
          content: `**Étape 1** : Consulte tes relevés bancaires des 3 derniers mois
Cherche tous les prélèvements récurrents (hebdo, mensuel, trimestriel, annuel).

**Étape 2** : Fais la liste complète
Pour chaque abonnement : nom, montant, fréquence, date de résiliation.

**Étape 3** : Évalue chaque abonnement
- Utilisé plus d'une fois par semaine ? → Garde
- Utilisé moins d'une fois par semaine ? → À questionner
- Pas utilisé depuis +1 mois ? → Résilie immédiatement

**Étape 4** : Vérifie les doublons
Tu paies Spotify ET Deezer ? Tu utilises vraiment Disney+ ET Netflix ?

**Étape 5** : Résilie sans attendre`,
        },
        {
          type: 'example',
          title: 'L\'audit abonnements de Sarah',
          content: `**Sarah, 30 ans — avant l'audit** :

**Abonnements trouvés** :
- Netflix : 17€
- Disney+ : 9€
- Prime Video : 7€ (inclus dans Amazon Prime à 69€/an)
- Canal+ : 35€
- Spotify : 11€
- Deezer : 11€ (elle avait oublié !)
- Salle de sport : 40€ (pas allée depuis 3 mois)
- Box cosmétique : 25€ (stockage en cours)
- Application fitness : 8€ (elle utilise YouTube gratuit)
- Cloud 2To : 10€ (son téléphone stocke tout)

**Total mensuel** : 173€

**Après résiliation des inutiles** :
- Netflix : 17€ ✅
- Spotify : 11€ ✅
- Amazon Prime : 6€/mois ✅

**Économie** : 139€/mois = **1 668€/an** 🎉`,
        },
        {
          type: 'action',
          title: 'Ton audit abonnements en 15 minutes',
          content: `🎯 **Action immédiate** :

**Étape 1** : Ouvre tes relevés bancaires (3 derniers mois)
**Étape 2** : Note tous les prélèvements récurrents dans une liste
**Étape 3** : Pour chacun, réponds honnêtement : "L'ai-je utilisé cette semaine ?"
**Étape 4** : Résilie sur-le-champ tout ce que tu n'utilises pas

💡 **Outils gratuits pour t'aider** :
- Bankin' ou Linxo analysent automatiquement tes abonnements
- Ton application bancaire a souvent un onglet "abonnements"

⚠️ **Attention aux abonnements annuels** ! Ils apparaissent une fois par an et se font facilement oublier.

**Objectif minimum** : trouver 50€/mois d'abonnements inutilisés.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'En moyenne, combien un foyer français dépense-t-il en abonnements par mois ?',
          choices: ['50€', '86€', '219€', '350€'],
          correctIndex: 2,
          explanation: 'Les Français dépensent en moyenne 219€/mois en abonnements, mais pensent n\'en payer que 86€. L\'écart est énorme !',
        },
        {
          question: 'Quel critère utiliser pour garder un abonnement ?',
          choices: ['Je le paie depuis longtemps', 'Je l\'utilise plus d\'une fois par semaine', 'Il est pas cher', 'J\'en ai besoin "au cas où"'],
          correctIndex: 1,
          explanation: 'Un abonnement utile est utilisé régulièrement. Si tu ne l\'utilises pas au moins une fois par semaine, il ne vaut probablement pas ce qu\'il coûte.',
        },
        {
          question: 'Que faire si tu trouves deux abonnements de streaming similaires ?',
          choices: ['Garder les deux par sécurité', 'Résilier celui que tu utilises le moins', 'Ne rien faire', 'Prendre un 3ème pour comparer'],
          correctIndex: 1,
          explanation: 'Les doublons sont des gaspillages purs. Garde uniquement le service que tu utilises le plus et résilie l\'autre immédiatement.',
        },
      ],
    },
  },

  {
    id: 'module-1-7',
    zone: 1,
    title: 'Gérer les fins de mois difficiles',
    description: 'Les stratégies pour ne plus jamais être à découvert',
    isPremium: false,
    levelRequired: 7,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '📉',
    orderInZone: 7,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Pourquoi la fin de mois est difficile ?',
          content: `La **fin de mois difficile** est le symptôme d'un déséquilibre entre revenus et dépenses sur le mois.

**Causes principales** :
- Pas de budget défini → dépenses non contrôlées
- Dépenses imprévues non anticipées (voiture, médecin, réparations)
- Dépenses de début de mois trop élevées (loyer + charges en même temps)
- Timing des prélèvements mal géré
- Pas de matelas de sécurité

**Le cercle vicieux** : fin de mois difficile → découvert → frais d'agios → encore moins d'argent → mois suivant encore plus difficile.

**La solution** : anticiper, pas subir.`,
        },
        {
          type: 'why',
          title: 'L\'impact réel des découverts',
          content: `✅ **Coût direct** : les agios bancaires coûtent 12-16%/an — plus cher que beaucoup de crédits
✅ **Stress financier** : 1 Français sur 3 se dit stressé par l'argent chaque fin de mois
✅ **Décisions irrationnelles** : le stress financier réduit la capacité à prendre de bonnes décisions
✅ **Spirale négative** : un découvert entraîne souvent des frais qui creusent encore plus

**Chiffre choc** : Un découvert de 500€ pendant 15 jours à 12%/an coûte environ 2,50€ en agios. Mais répété chaque mois, c'est 30€/an en frais inutiles — sans compter le stress.`,
        },
        {
          type: 'how',
          title: '5 stratégies pour ne plus être à découvert',
          content: `**Étape 1** : Crée un "coussin de sécurité"
Laisse 300-500€ en permanence sur ton compte courant comme tampon.

**Étape 2** : Synchronise tes prélèvements avec ta paie
Demande à ta banque de décaler tes prélèvements au 5-6 du mois (après la paie).

**Étape 3** : Anticipe les dépenses irrégulières
Voiture, vêtements, vacances, cadeaux → divise le budget annuel par 12 et mets ce montant de côté chaque mois.

**Étape 4** : Fais un "budget prévisionnel"
En début de mois, estime toutes tes dépenses avant qu'elles arrivent.

**Étape 5** : Crée un fonds d'urgence
3 mois de dépenses sur un livret séparé (voir module Fonds d'urgence).`,
        },
        {
          type: 'example',
          title: 'Comment Karim a arrêté d\'être à découvert',
          content: `**Karim, 24 ans** — à découvert chaque fin de mois depuis 2 ans.

**Le problème identifié** :
- Paie le 28 du mois
- Loyer prélevé le 1er : 700€
- EDF, téléphone, internet prélevés les 3-5 : 120€
- Il lui restait donc 1 080€ pour tout le mois dès le 5

**Les dépenses imprévues non anticipées** :
- Pneu crevé en mars : 180€
- Cadeau anniversaire en juin : 80€
- Médecin + médicaments : 60€

**Solution mise en place** :
- Coussin permanent de 400€ sur le compte courant
- Épargne "imprévus" : 50€/mois sur livret séparé
- Budget prévisionnel fait le 28 de chaque mois

**Résultat** : 0 découvert depuis 6 mois ✅`,
        },
        {
          type: 'action',
          title: 'Ton plan anti-découvert',
          content: `🎯 **Cette semaine** :

**Étape 1** : Identifie la cause principale de tes fins de mois difficiles
- Dépenses variables trop élevées ?
- Imprévus fréquents ?
- Mauvais timing de prélèvements ?

**Étape 2** : Mets en place le coussin de sécurité
Objectif : 300€ en permanence sur ton compte courant.

**Étape 3** : Crée une catégorie "Imprévus"
Mets 50€/mois de côté sur un livret séparé.

**Étape 4** : Fais ton budget prévisionnel du mois
Avant la fin du mois, estime toutes tes dépenses du mois suivant.

💡 **Astuce** : Règle une alerte sur ton appli bancaire à 500€ — tu reçois une notification quand tu approches de la zone de danger.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Qu\'est-ce qu\'un "coussin de sécurité" sur compte courant ?',
          choices: ['Un crédit revolving', 'Un montant minimum permanent pour éviter le découvert', 'Un fonds d\'urgence sur livret', 'Une autorisation de découvert'],
          correctIndex: 1,
          explanation: 'Le coussin de sécurité (300-500€ minimum sur le compte courant) absorbe les petits imprévus et évite les agios.',
        },
        {
          question: 'Quelle est la meilleure façon d\'anticiper une dépense annuelle (ex: cadeau Noël 400€) ?',
          choices: ['Mettre 400€ de côté en novembre', 'Payer avec un crédit', 'Économiser 33€/mois tout l\'année', 'Ne rien faire et improviser'],
          correctIndex: 2,
          explanation: '400€ / 12 mois = 33€/mois à mettre de côté. En lissant les grosses dépenses sur 12 mois, tu ne les "ressens" plus.',
        },
        {
          question: 'Quel est le coût réel d\'un découvert bancaire ?',
          choices: ['Gratuit', 'Environ 12-16%/an en agios', '1% par mois', 'Ça dépend de ta banque, souvent 0€'],
          correctIndex: 1,
          explanation: 'Les agios bancaires coûtent 12 à 16% par an, ce qui est plus cher que beaucoup de crédits à la consommation.',
        },
      ],
    },
  },

  {
    id: 'module-1-8',
    zone: 1,
    title: 'Budget couple et coloc',
    description: 'Gérer l\'argent à deux sans conflits ni inégalités',
    isPremium: false,
    levelRequired: 8,
    xpReward: 50,
    estimatedDuration: 9,
    icon: '👫',
    orderInZone: 8,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Les 3 modèles de gestion à deux',
          content: `Quand on vit à deux, trois modèles existent :

**Modèle 1 : Compte commun total**
Tous les revenus sur un compte commun, toutes les dépenses payées depuis ce compte.
→ Simple, transparent, mais perte d'autonomie.

**Modèle 2 : Comptes séparés + pot commun**
Chacun garde son compte + verse une part dans un compte commun pour les charges communes.
→ Le plus utilisé en France, équilibré.

**Modèle 3 : Comptes totalement séparés**
Chacun paie ses propres dépenses, les charges communes sont divisées au moment.
→ Autonomie maximale, mais plus complexe.

**Aucun modèle n'est parfait** : l'essentiel est que les deux personnes soient d'accord.`,
        },
        {
          type: 'why',
          title: 'Pourquoi en parler ouvertement ?',
          content: `✅ **L'argent est la 1ère cause de conflit en couple** : 70% des couples se disputent à cause de l'argent
✅ **Les inégalités de revenus créent des tensions** : si l'un gagne le double, partager 50/50 les charges est injuste
✅ **Les habitudes différentes créent des conflits** : l'un épargne, l'autre dépense librement
✅ **La transparence renforce la confiance** : parler d'argent c'est construire un projet commun

**Chiffre choc** : 60% des couples n'ont jamais parlé concrètement de leurs objectifs financiers ensemble.`,
        },
        {
          type: 'how',
          title: 'Mettre en place le modèle "pot commun"',
          content: `**Étape 1** : Calculez vos revenus nets respectifs
- Personne A : 2 200€
- Personne B : 1 600€
- Total : 3 800€

**Étape 2** : Listez toutes les charges communes
Loyer, électricité, internet, courses, sorties en couple...
Exemple : 1 500€/mois de charges communes

**Étape 3** : Calculez la contribution proportionnelle
- Part dans le foyer : A = 58%, B = 42%
- Contribution A : 870€ / Contribution B : 630€

**Étape 4** : Ouvrez un compte commun
Chacun vire sa contribution le jour de la paie.

**Étape 5** : Gardez votre argent personnel libre
Ce qui reste appartient à chacun, sans jugement.`,
        },
        {
          type: 'example',
          title: 'Clara et Mehdi organisent leurs finances',
          content: `**Clara** : 2 400€ net/mois
**Mehdi** : 1 800€ net/mois
**Total foyer** : 4 200€

**Charges communes identifiées** :
- Loyer : 900€
- Courses : 400€
- EDF + internet : 80€
- Sorties en couple : 200€
- Épargne commune (vacances) : 200€
**Total commun** : 1 780€

**Contribution proportionnelle** :
- Clara (57%) : 1 015€ → Compte commun
- Mehdi (43%) : 765€ → Compte commun

**Argent personnel restant** :
- Clara : 1 385€ → 100% libre
- Mehdi : 1 035€ → 100% libre

**Résultat** : plus de tensions sur "qui paye quoi" ✅`,
        },
        {
          type: 'action',
          title: 'Organisez votre budget commun',
          content: `🎯 **À faire ensemble cette semaine** :

**Étape 1** : Parlez-en ouvertement
Chacun dit ses revenus nets, ses dettes, ses objectifs.

**Étape 2** : Listez toutes vos charges communes

**Étape 3** : Choisissez votre modèle (50/50 ou proportionnel)

**Étape 4** : Ouvrez un compte commun si besoin
Ou désignez l'un d'entre vous comme "trésorier des charges communes".

**Étape 5** : Fixez une réunion budget mensuelle
15 minutes par mois pour faire le point ensemble.

💡 **Astuce coloc** : même logique ! Calculez les charges communes, divisez proportionnellement aux revenus, utilisez une cagnotte commune (Lydia, Splitwise).`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Qu\'est-ce que le modèle "pot commun" ?',
          choices: ['Mettre tout l\'argent ensemble', 'Garder des comptes séparés + un compte pour les charges communes', 'Partager uniquement le loyer', 'Ne rien partager'],
          correctIndex: 1,
          explanation: 'Le pot commun = chacun garde son compte personnel ET verse une contribution dans un compte commun pour les charges partagées.',
        },
        {
          question: 'Si A gagne 3 000€ et B gagne 1 000€, et les charges communes sont 1 200€, combien doit verser B ?',
          choices: ['600€ (50/50)', '300€ (25% du foyer)', '400€', '200€'],
          correctIndex: 1,
          explanation: 'B représente 25% des revenus du foyer (1000/4000). Sa contribution proportionnelle est donc 25% × 1200€ = 300€.',
        },
        {
          question: 'Quelle est la 1ère cause de conflits dans les couples ?',
          choices: ['La belle-famille', 'L\'argent', 'Les tâches ménagères', 'Les sorties'],
          correctIndex: 1,
          explanation: 'L\'argent est la première cause de conflit en couple selon toutes les études. Parler finances ouvertement est essentiel.',
        },
      ],
    },
  },

  {
    id: 'module-1-9',
    zone: 1,
    title: 'Les pièges de la consommation',
    description: 'Comprends comment le marketing influence tes achats et résiste',
    isPremium: false,
    levelRequired: 9,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🕸️',
    orderInZone: 9,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Les biais cognitifs qui vident ton compte',
          content: `Les entreprises connaissent ta psychologie mieux que toi. Elles utilisent des **biais cognitifs** pour te faire dépenser plus.

**Biais courants** :
- **Effet d'ancrage** : un article à 200€ "réduit" à 80€ semble une affaire, même si 80€ c'est cher.
- **Peur de manquer (FOMO)** : "Offre valable 24h" → stress et achat impulsif.
- **Effet de dotation** : une fois en main, tu veux garder l'objet (essai gratuit → abonnement).
- **Biais social** : "Bestseller" ou "10 000 avis" → tu suis la foule.
- **Prix psychologique** : 9,99€ semble bien moins que 10€ dans notre cerveau.`,
        },
        {
          type: 'why',
          title: 'Pourquoi c\'est important de le savoir ?',
          content: `✅ **Connaître le piège, c'est y résister** : dès que tu identifies le biais, il perd de son pouvoir
✅ **Les soldes ne sont pas toujours des économies** : 60% des achats en solde ne l'auraient pas été sinon
✅ **Le marketing est partout** : chaque rayon de supermarché est conçu pour maximiser tes achats
✅ **Les réseaux sociaux amplifient tout** : publicités ciblées, influenceurs, hauls...

**Chiffre choc** : 40% de nos achats sont des achats d'impulsion, non planifiés. Maîtriser ses biais peut réduire ses dépenses de 20% sans effort.`,
        },
        {
          type: 'how',
          title: '6 défenses contre les pièges marketing',
          content: `**Étape 1** : Fais une liste de courses et tiens-y toi
Le supermarché est conçu pour te faire dévier. Ta liste est ta boussole.

**Étape 2** : Désactive les notifications des apps shopping
Zalando, Amazon, ASOS... chaque notif est une invitation à dépenser.

**Étape 3** : Bloque les publicités
Extension uBlock Origin sur navigateur, abonnement sans pub sur YouTube.

**Étape 4** : Pose-toi 3 questions avant d'acheter
- Est-ce que j'en ai vraiment besoin ?
- Est-ce que ça m'apportera de la satisfaction dans 1 mois ?
- Ai-je déjà quelque chose de similaire ?

**Étape 5** : Ne fais pas tes courses le ventre vide
Tu achèteras 30% de moins.

**Étape 6** : Évite les "window shopping" en ligne`,
        },
        {
          type: 'example',
          title: 'Déchiffrer une page de vente',
          content: `**Exemple d'une fiche produit Amazon** :
"~~Prix habituel : 89,99€~~ → Aujourd'hui : 34,99€ (-61%) — Plus que 3 en stock !"

**Les pièges identifiés** :
- **Ancrage** : 89,99€ jamais vendu à ce prix, inventé pour valoriser la "réduction"
- **Urgence** : "plus que 3 en stock" → FOMO activé
- **Prix psychologique** : 34,99€ au lieu de 35€

**Comment réagir** :
- Chercher le prix sur CamelCamelCamel (historique des prix Amazon)
- Attendre 72h avant d'acheter
- Se demander : "En avais-je besoin avant de voir cette annonce ?"

**Dans ce cas précis** : le produit était à 35€ toute l'année. La "promo" est bidon.`,
        },
        {
          type: 'action',
          title: 'Deviens un consommateur conscient',
          content: `🎯 **Dès aujourd'hui** :

**Étape 1** : Désabonne-toi de toutes les newsletters shopping
(cherche "se désabonner" dans tes emails)

**Étape 2** : Désactive les notifications des apps e-commerce
**Étape 3** : Installe CamelCamelCamel pour vérifier les vraies promo Amazon
**Étape 4** : Crée une liste "envies" pour les achats > 30€
Tu y ajoutes l'article et tu attends 2 semaines. Si tu le veux encore, tu l'achètes.

💡 **Le test ultime avant d'acheter** : "Est-ce que j'achèterais ce produit si je n'avais pas vu la pub ?" Si non → tu te fais manipuler.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'L\'effet d\'ancrage consiste à...',
          choices: ['Ancrer tes achats dans ton budget', 'Utiliser un prix élevé de référence pour faire paraître une réduction attractive', 'Mémoriser les prix', 'Comparer avec les concurrents'],
          correctIndex: 1,
          explanation: 'L\'effet d\'ancrage utilise un "prix de référence" souvent gonflé pour que la réduction semble énorme, même si le prix final reste élevé.',
        },
        {
          question: 'Quelle part de nos achats sont des achats d\'impulsion ?',
          choices: ['5%', '15%', '40%', '70%'],
          correctIndex: 2,
          explanation: '40% de nos achats ne sont pas planifiés. Comprendre et résister aux déclencheurs d\'impulsion peut réduire tes dépenses de 20%.',
        },
        {
          question: 'La meilleure façon de résister à une "offre limitée 24h" est de...',
          choices: ['Acheter rapidement avant la fin', 'Attendre que l\'offre expire', 'Vérifier si l\'offre revient régulièrement', 'En acheter deux pour économiser'],
          correctIndex: 2,
          explanation: 'Les "offres limitées" reviennent presque toujours. Attendre permet souvent de retrouver le même prix quelques jours plus tard, sans la pression artificielle.',
        },
      ],
    },
  },

  {
    id: 'module-1-10',
    zone: 1,
    title: 'Négocier téléphone et internet',
    description: 'Divise tes factures télécoms par 2 en 30 minutes d\'appel',
    isPremium: true,
    levelRequired: 10,
    xpReward: 50,
    estimatedDuration: 7,
    icon: '📞',
    orderInZone: 10,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Pourquoi les opérateurs surpaient-ils leurs anciens clients ?',
          content: `Les opérateurs télécom utilisent un modèle simple : **offrir des prix attractifs pour attirer les nouveaux clients, et facturer plus cher les fidèles**.

**Le phénomène de la "taxe à la fidélité"** :
- Nouveau client chez Orange : 15€/mois la première année
- Même client 3 ans plus tard : 35-50€/mois
- Le service fourni est identique

**Pourquoi ça marche** : la plupart des gens ne pensent pas à renégocier. Les opérateurs misent sur ton inertie.

**La bonne nouvelle** : un simple appel suffit dans 80% des cas pour obtenir une offre équivalente aux nouvelles souscriptions.`,
        },
        {
          type: 'why',
          title: 'Combien tu peux économiser ?',
          content: `✅ **Forfait mobile** : économie moyenne de 15-20€/mois en changeant ou négociant
✅ **Forfait internet (box)** : économie moyenne de 20-30€/mois
✅ **Assurance mobile** : souvent inutile (garantie constructeur 2 ans + assurance habitation couvre déjà)

**Total potentiel** : 35-50€/mois économisés = **420 à 600€/an**

**Chiffre choc** : Un Français paie en moyenne son forfait mobile 3 ans sans jamais renégocier. Résultat : il surpaye en moyenne 250€ sur la période par rapport aux offres disponibles.`,
        },
        {
          type: 'how',
          title: 'Script pour négocier en 5 minutes',
          content: `**Étape 1** : Prépare-toi
Cherche sur le site de l'opérateur l'offre actuelle pour les nouveaux clients.

**Étape 2** : Appelle le service fidélité (pas le standard)
Dis exactement : "Je suis client depuis X ans, je vois que vous proposez [offre] à [prix] aux nouveaux clients. Je souhaite bénéficier du même tarif, sinon je vais devoir résilier."

**Étape 3** : Ne cède pas au premier refus
Ils ont souvent 2-3 offres de rétention. Insiste poliment.

**Étape 4** : Si refus, compare les concurrents
Free, Red, Bouygues, SFR... et prépare le portage de numéro.

**Étape 5** : Résiliation si pas d'accord
Le portage de numéro est gratuit et se fait en 24h.`,
        },
        {
          type: 'example',
          title: 'Arnaud économise 43€/mois en un appel',
          content: `**Arnaud, client SFR depuis 4 ans** :
Forfait mobile : 45€/mois (30Go)
Box internet : 39€/mois

**Après négociation** :

**Forfait mobile** :
- Il appelle SFR fidélité
- Cite l'offre RED à 15€/mois (100Go)
- Obtient : 20€/mois pour 80Go ✅

**Box internet** :
- Cite l'offre Free à 30€/mois
- Obtient : 25€/mois pendant 2 ans ✅

**Économie totale** : 39€/mois = **468€/an**

Durée de l'appel : 22 minutes.
Taux horaire implicite : 1 270€/h 😄`,
        },
        {
          type: 'action',
          title: 'Négocie tes contrats cette semaine',
          content: `🎯 **Plan d'action** :

**Étape 1** : Regarde tes factures actuelles (mobile + box)

**Étape 2** : Cherche les meilleures offres du moment
- Comparateurs : Meilleurmobile.com, Frandroid.com
- Sites des concurrents : Free, RED by SFR, Bouygues, Orange

**Étape 3** : Appelle le service fidélité de ton opérateur
Numéro général → service client → fidélité / rétention

**Étape 4** : Utilise le script : "Je vois que vous proposez X à Y€ pour les nouveaux clients, je souhaite en bénéficier sinon je résilie."

💡 **Les meilleures périodes pour négocier** : janvier et septembre (rentrée des offres).

⚠️ **Attention** : vérifie la date de fin de ton engagement avant de résilier.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Quelle est la "taxe à la fidélité" en télécom ?',
          choices: ['Une récompense pour les anciens clients', 'Les anciens clients paient plus cher que les nouveaux pour le même service', 'Des frais de résiliation', 'Un bonus de fidélité'],
          correctIndex: 1,
          explanation: 'Les opérateurs proposent des offres attractives aux nouveaux clients mais augmentent progressivement les tarifs des anciens clients qui ne renégocient pas.',
        },
        {
          question: 'Quelle phrase utiliser pour négocier avec son opérateur ?',
          choices: ['Je vais vous quitter si vous n\'êtes pas gentil', 'Je vois que vous proposez [offre] à [prix] aux nouveaux clients, je souhaite en bénéficier', 'Donnez-moi une réduction sinon je vous dénonce', 'J\'ai un problème technique'],
          correctIndex: 1,
          explanation: 'Mentionner une offre concurrente spécifique et menacer poliment de partir sont les deux leviers les plus efficaces pour obtenir une réduction.',
        },
        {
          question: 'Combien peut-on économiser en renégociant ses contrats télécoms ?',
          choices: ['5€/mois', '10-15€/mois', '35-50€/mois', '100€/mois'],
          correctIndex: 2,
          explanation: 'En renégociant forfait mobile ET box internet, l\'économie moyenne est de 35 à 50€/mois, soit 420 à 600€/an.',
        },
      ],
    },
  },

  {
    id: 'module-1-11',
    zone: 1,
    title: 'La méthode des enveloppes',
    description: 'La technique old school qui marche encore mieux que les apps',
    isPremium: true,
    levelRequired: 11,
    xpReward: 50,
    estimatedDuration: 7,
    icon: '✉️',
    orderInZone: 11,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'C\'est quoi la méthode des enveloppes ?',
          content: `La **méthode des enveloppes** est un système budgétaire qui consiste à allouer physiquement (ou virtuellement) de l'argent dans des "enveloppes" dédiées à chaque catégorie de dépenses.

**Principe** : chaque enveloppe a un budget maximum. Quand l'enveloppe est vide, on ne dépense plus dans cette catégorie.

**Enveloppes typiques** :
- Courses alimentaires
- Sorties / restaurants
- Transports
- Shopping / vêtements
- Loisirs
- Imprévus

**Versions** :
- **Physique** : billets dans des enveloppes en papier
- **Digitale** : sous-comptes ou apps comme YNAB, Budgea`,
        },
        {
          type: 'why',
          title: 'Pourquoi ça marche si bien ?',
          content: `✅ **Rend l'argent concret** : voir l'enveloppe se vider est plus parlant que des chiffres sur un écran
✅ **Élimine les dépassements** : impossible de dépenser plus que ce que contient l'enveloppe
✅ **Supprime la culpabilité** : si l'enveloppe "sorties" est pleine, tu peux sortir sans hésiter
✅ **Force les arbitrages** : si tu veux plus de shopping, tu vires depuis sorties → décision consciente

**Chiffre choc** : les personnes utilisant la méthode des enveloppes économisent en moyenne 20% de plus par mois que celles qui ne budgétisent pas.`,
        },
        {
          type: 'how',
          title: 'Mettre en place tes enveloppes',
          content: `**Étape 1** : Identifie tes catégories de dépenses variables
(les fixes ne nécessitent pas d'enveloppe, ils sont automatiques)

**Étape 2** : Définis un budget mensuel pour chaque catégorie
Basé sur tes dépenses habituelles et ton budget libre.

**Étape 3** : Choisis ta méthode
- Physique : retire du cash, mets dans des enveloppes
- Digitale : crée des sous-comptes sur Lydia/Revolut ou utilise YNAB

**Étape 4** : Alimente les enveloppes le jour de ta paie
Virement automatique vers les sous-comptes ou retrait cash.

**Étape 5** : Respecte la règle
Quand c'est vide, c'est vide. Pas de crédit inter-enveloppes sauf exception consciente.`,
        },
        {
          type: 'example',
          title: 'Le système d\'enveloppes de Lucie',
          content: `**Lucie, 27 ans** — budget libre mensuel : 1 100€

**Ses enveloppes** :
- Courses : 280€
- Sorties & restaurants : 150€
- Transports (carburant) : 120€
- Shopping & vêtements : 80€
- Loisirs (cinéma, sport) : 70€
- Imprévus : 100€
- Épargne voyage : 150€
- Épargne générale : 150€

**Total** : 1 100€ ✅

**Résultat après 3 mois** :
- Elle a identifié qu'elle dépasse toujours en "sorties"
- Elle a réduit son shopping pour renflouer les sorties
- 0 découvert, 450€ épargnés en 3 mois`,
        },
        {
          type: 'action',
          title: 'Crée ton système d\'enveloppes',
          content: `🎯 **Cette semaine** :

**Étape 1** : Calcule ton budget libre (revenus - dépenses fixes)

**Étape 2** : Liste tes catégories variables (4 à 8 maxi)

**Étape 3** : Attribue un budget à chaque catégorie
La somme doit égaler ton budget libre (inclus une enveloppe épargne).

**Étape 4** : Choisis ta méthode
- Débutant : papier et billets, très concret
- Digital : Revolut (sous-comptes "Pots"), N26, ou YNAB

**Étape 5** : Le jour de ta prochaine paie, fais l'allocation

💡 **Règle d'or** : l'enveloppe "épargne" se remplit EN PREMIER, pas avec ce qu'il reste.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Quel est le principe fondamental de la méthode des enveloppes ?',
          choices: ['Mettre tout son argent en espèces', 'Allouer un budget maximum à chaque catégorie de dépenses', 'Épargner 50% de son salaire', 'Avoir plusieurs comptes bancaires'],
          correctIndex: 1,
          explanation: 'La méthode des enveloppes consiste à allouer un budget fixe à chaque catégorie. Quand l\'enveloppe est vide, on ne dépense plus dans cette catégorie.',
        },
        {
          question: 'Quelle catégorie doit-on remplir EN PREMIER ?',
          choices: ['Courses alimentaires', 'Loyer', 'Épargne', 'Loisirs'],
          correctIndex: 2,
          explanation: 'L\'épargne doit être la première enveloppe remplie — principe "pay yourself first". L\'argent restant est ce que tu peux dépenser, pas l\'inverse.',
        },
        {
          question: 'Quel outil digital permet de créer des "enveloppes virtuelles" facilement ?',
          choices: ['PayPal', 'Revolut (Pots) ou N26', 'Virement bancaire classique', 'Apple Pay'],
          correctIndex: 1,
          explanation: 'Revolut et N26 proposent des fonctionnalités de "pots" ou sous-comptes virtuels qui permettent d\'appliquer la méthode des enveloppes digitalement.',
        },
      ],
    },
  },

  {
    id: 'module-1-12',
    zone: 1,
    title: 'Ton bilan financier annuel',
    description: 'Fais le point une fois par an et construis ta feuille de route',
    isPremium: true,
    levelRequired: 12,
    xpReward: 75,
    estimatedDuration: 10,
    icon: '📊',
    orderInZone: 12,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Qu\'est-ce qu\'un bilan financier personnel ?',
          content: `Un **bilan financier personnel** est un état des lieux complet de ta situation financière à un instant T.

**Il comprend deux parties** :

**1. Le patrimoine (actif - passif)**
- Actif : ce que tu possèdes (comptes, livrets, investissements, immobilier)
- Passif : ce que tu dois (crédits, découverts, dettes)
- **Patrimoine net = Actif - Passif**

**2. Les flux (revenus - dépenses)**
- Revenus annuels totaux
- Dépenses annuelles totales
- Taux d'épargne = (Revenus - Dépenses) / Revenus × 100

**Fréquence recommandée** : une fois par an, idéalement en janvier ou en anniversaire.`,
        },
        {
          type: 'why',
          title: 'Pourquoi faire ce bilan chaque année ?',
          content: `✅ **Mesure ta progression** : est-ce que ton patrimoine net augmente ?
✅ **Identifie les fuites** : tes dépenses ont-elles augmenté sans que tu t'en rendes compte ?
✅ **Fixe des objectifs** : sans point de départ, impossible de mesurer l'avancée
✅ **Te motive** : voir son patrimoine net augmenter de 5 000€ en un an, c'est hyper motivant
✅ **Anticipe les grandes décisions** : achat immobilier, changement de vie...

**Chiffre choc** : moins de 10% des Français font un bilan financier annuel. Pourtant, ceux qui le font épargnent en moyenne 40% de plus.`,
        },
        {
          type: 'how',
          title: 'Comment faire ton bilan en 1h',
          content: `**Étape 1** : Calcule ton actif total
- Compte courant + livrets + épargne : _______€
- Investissements (PEA, assurance-vie) : _______€
- Immobilier (valeur estimée) : _______€
- Autres (voiture, objets de valeur) : _______€

**Étape 2** : Calcule ton passif total
- Crédit immobilier restant : _______€
- Crédit auto restant : _______€
- Autres dettes : _______€

**Étape 3** : Patrimoine net = Actif - Passif

**Étape 4** : Calcule ton taux d'épargne annuel
(Revenus annuels - Dépenses annuelles) / Revenus annuels × 100

**Étape 5** : Compare avec l'année précédente et fixe les objectifs N+1`,
        },
        {
          type: 'example',
          title: 'Le bilan de Romain, 32 ans',
          content: `**ACTIF** :
- Compte courant : 1 200€
- Livret A : 8 000€
- PEA : 12 500€
- Voiture (estimée) : 8 000€
**Total actif : 29 700€**

**PASSIF** :
- Crédit auto restant : 5 500€
**Total passif : 5 500€**

**Patrimoine net : 24 200€**

**Flux annuels** :
- Revenus nets : 31 200€ (2 600€/mois)
- Dépenses : 25 200€ (2 100€/mois)
- Épargne : 6 000€/an
- Taux d'épargne : **19%** ✅

**Évolution vs N-1** :
Patrimoine net N-1 : 17 500€
**Progression : +6 700€** 🎉`,
        },
        {
          type: 'action',
          title: 'Fais ton premier bilan aujourd\'hui',
          content: `🎯 **Prends 1h ce week-end** :

**Étape 1** : Crée un tableur (Google Sheets)
Colonnes : Actif | Passif | Flux

**Étape 2** : Remplis chaque ligne honnêtement
Pas besoin d'être exact au centime, des estimations suffisent.

**Étape 3** : Calcule ton patrimoine net

**Étape 4** : Calcule ton taux d'épargne
Objectif idéal : 20% minimum

**Étape 5** : Fixe 3 objectifs financiers pour l'année à venir
- Objectif épargne : +_______€ de patrimoine net
- Objectif taux d'épargne : _______%
- Objectif spécifique : (rembourser X, créer PEA, etc.)

💡 **Rappel calendrier** : bloque 1h dans ton agenda dans 12 mois exactement pour refaire ce bilan.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Qu\'est-ce que le patrimoine net ?',
          choices: ['Tes revenus annuels', 'Ce que tu possèdes minus ce que tu dois', 'Ton épargne mensuelle', 'Ton salaire net'],
          correctIndex: 1,
          explanation: 'Patrimoine net = Actif (ce que tu possèdes) - Passif (ce que tu dois). C\'est le vrai indicateur de ta richesse.',
        },
        {
          question: 'Quel est le taux d\'épargne minimum recommandé ?',
          choices: ['5%', '10%', '20%', '50%'],
          correctIndex: 2,
          explanation: 'Un taux d\'épargne de 20% minimum est recommandé pour construire un patrimoine solide et atteindre la liberté financière sur le long terme.',
        },
        {
          question: 'À quelle fréquence faire son bilan financier ?',
          choices: ['Chaque semaine', 'Chaque mois', 'Une fois par an', 'Tous les 5 ans'],
          correctIndex: 2,
          explanation: 'Un bilan annuel est idéal : assez fréquent pour corriger le tir, assez espacé pour voir une vraie progression.',
        },
      ],
    },
  },
];
