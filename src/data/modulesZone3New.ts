import { Module } from '@/types/module.types';

// Zone 3 : Montagnes de la Dette — modules 4 à 12
export const MODULES_ZONE3_NEW: Module[] = [
  {
    id: 'module-3-4',
    zone: 3,
    title: 'Le TAEG expliqué',
    description: "Comprends le vrai coût d'un crédit en une seule ligne",
    isPremium: false,
    levelRequired: 24,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🔢',
    orderInZone: 4,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'TAEG : le seul chiffre qui compte',
          content: `Le **TAEG** (Taux Annuel Effectif Global) est le taux qui intègre TOUS les coûts d'un crédit.

**Il inclut** :
- Le taux d'intérêt nominal
- Les frais de dossier
- L'assurance emprunteur obligatoire
- Les frais de garantie

**Pourquoi c'est important** :
Un crédit "à 1,5% d'intérêt" peut avoir un TAEG réel de 3-4% une fois tous les frais inclus.

**La loi oblige** chaque établissement à afficher le TAEG. C'est ton outil de comparaison universel.

**Règle** : compare TOUJOURS les TAEG, jamais les taux nominaux seuls.`,
        },
        {
          type: 'why',
          title: 'Pourquoi le TAEG révèle les vraies offres',
          content: `✅ **Les taux nominaux sont trompeurs** : "crédit à 0%" peut avoir un TAEG de 5% (frais cachés)
✅ **Les assurances gonflent le coût** : l'assurance emprunteur peut doubler le coût réel
✅ **Les frais de dossier semblent petits** : mais représentent 0,5-1% du capital
✅ **Seul le TAEG permet une vraie comparaison**

**Exemples réels de TAEG** :
- Crédit revolving : 15-22%
- Crédit à la consommation : 3-8%
- Crédit immobilier : 3,5-4,5% (2024)
- Découvert autorisé : 8-15%`,
        },
        {
          type: 'how',
          title: 'Comment utiliser le TAEG pour comparer',
          content: `**Étape 1** : Demande le TAEG à chaque établissement
C'est une obligation légale sur toute offre de crédit.

**Étape 2** : Compare uniquement les TAEG
Ne te laisse pas distraire par le taux nominal ou les mensualités seules.

**Étape 3** : Calcule le coût total du crédit
Coût total = Mensualité × Nombre de mois - Montant emprunté

**Étape 4** : Méfie-toi des "crédits gratuits"
Un TAEG de 0% est soit faux (frais ailleurs) soit une promotion limitée.

**Étape 5** : Inclure l'assurance dans ta comparaison
L'assurance externe est souvent 2-3x moins chère que celle de la banque.`,
        },
        {
          type: 'example',
          title: 'Deux offres comparées : la surprise',
          content: `**Nina veut emprunter 10 000€ sur 48 mois**

**Offre A (Banque habituelle)** :
- Taux nominal : 3,5%
- Frais de dossier : 300€
- Assurance : 0,30%/mois
- TAEG réel : 5,8%
- Coût total du crédit : **1 280€**

**Offre B (Banque en ligne)** :
- Taux nominal : 4,2%
- Frais de dossier : 0€
- Assurance : 0,15%/mois
- TAEG réel : 4,5%
- Coût total du crédit : **944€**

**Conclusion** : l'offre B au taux nominal plus élevé (4,2% vs 3,5%) est en réalité moins chère grâce au TAEG plus bas.
**Économie : 336€** en prenant l'offre au taux nominal plus élevé !`,
        },
        {
          type: 'action',
          title: 'Applique le TAEG à ta prochaine décision',
          content: `🎯 **Mémo à retenir** :

**Règle 1** : Toujours demander le TAEG avant de signer
**Règle 2** : Comparer les TAEG, pas les taux nominaux
**Règle 3** : Calculer le coût total = mensualité × durée - capital

💡 **Pour ton prochain crédit** :
1. Demande des offres à 3 établissements minimum
2. Mets les TAEG côte à côte dans un tableau
3. Compare les coûts totaux (pas juste les mensualités)
4. Négocie l'assurance (externe souvent 2-3x moins chère)

⚠️ **Attention aux offres "sans intérêt"** : vérifiez toujours le TAEG. Les frais de dossier ou assurances peuvent rendre l'offre bien moins avantageuse qu'annoncé.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Qu'inclut le TAEG qu'un taux nominal simple ne montre pas ?",
          choices: ['Seulement le taux d\'intérêt', 'Tous les frais obligatoires (frais de dossier, assurance, garanties)', 'Le taux d\'inflation', 'Les impôts sur les intérêts'],
          correctIndex: 1,
          explanation: "Le TAEG inclut TOUS les coûts obligatoires : taux nominal + frais de dossier + assurance + garanties. C'est l'indicateur légal permettant de comparer deux crédits honnêtement.",
        },
        {
          question: "Une offre à 3,5% nominal avec TAEG 5,8% vs 4,2% nominal avec TAEG 4,5%. Laquelle est moins chère ?",
          choices: ['La première (3,5% nominal)', 'La deuxième (4,2% nominal)', 'Elles sont identiques', 'Impossible à savoir'],
          correctIndex: 1,
          explanation: "La deuxième offre a un TAEG de 4,5% contre 5,8% pour la première. Le TAEG étant le coût réel total, la deuxième est moins chère malgré un taux nominal plus élevé.",
        },
        {
          question: "Un crédit 'à 0%' peut-il avoir un coût réel ?",
          choices: ['Non, 0% signifie gratuit', 'Oui, via les frais de dossier et assurances obligatoires', 'Non, c\'est interdit par la loi', 'Ça dépend du montant'],
          correctIndex: 1,
          explanation: "Un 'crédit à 0%' peut avoir un TAEG positif si des frais de dossier ou assurances s'y ajoutent. Il faut toujours vérifier le TAEG réel, pas seulement le taux nominal affiché.",
        },
      ],
    },
  },

  {
    id: 'module-3-5',
    zone: 3,
    title: 'Le crédit immobilier',
    description: 'Tout comprendre avant de signer pour 20 ans',
    isPremium: false,
    levelRequired: 25,
    xpReward: 75,
    estimatedDuration: 15,
    icon: '🏡',
    orderInZone: 5,
    content: {
      slides: [
        {
          type: 'definition',
          title: "Anatomie d'un crédit immobilier",
          content: `Le **crédit immobilier** est un emprunt à long terme (15 à 25 ans) pour financer l'achat d'un bien.

**Les composantes** :
- **Capital** : la somme empruntée
- **Taux d'intérêt** (TAEG) : le coût du crédit
- **Durée** : 15, 20 ou 25 ans
- **Mensualité** : capital + intérêts + assurance
- **Apport personnel** : recommandé 10-20% du prix + frais notaire
- **Assurance emprunteur** : obligatoire (décès, invalidité)

**Acteurs** :
- Banque (prêteur)
- Notaire (acte de vente)
- Courtier (aide à trouver le meilleur taux)
- Garantie : caution Crédit Logement ou hypothèque`,
        },
        {
          type: 'why',
          title: 'Pourquoi bien comprendre avant de signer',
          content: `✅ **C'est l'engagement financier le plus long de ta vie** : 20-25 ans de mensualités
✅ **Le coût total peut être énorme** : 300 000€ à 3,5% sur 25 ans → 145 000€ d'intérêts !
✅ **L'assurance représente 30-40% du coût total du crédit**
✅ **Chaque 0,1% de taux économisé = des milliers d'euros**

**Chiffre choc** :
Sur 200 000€ empruntés à 3,5% sur 20 ans :
- Mensualité : 1 159€
- Total remboursé : 278 160€
- Coût du crédit : **78 160€** (soit 39% du capital !)`,
        },
        {
          type: 'how',
          title: '5 leviers pour obtenir le meilleur crédit',
          content: `**Levier 1** : Apport maximum
Chaque tranche de 10% d'apport réduit le taux. Vise 20% minimum.

**Levier 2** : Passer par un courtier
Un courtier négocie avec 10-20 banques simultanément. Gain moyen : 0,3-0,5% de taux.

**Levier 3** : Déléguer l'assurance emprunteur
Tu n'es pas obligé de prendre l'assurance de la banque. Une assurance externe coûte 2 à 3 fois moins cher.

**Levier 4** : Optimiser ta situation bancaire
CDI stable, pas de découvert les 3 derniers mois, pas de crédit en cours.

**Levier 5** : Négocier les frais de dossier
Entre 0 et 1 500€ selon les banques — souvent négociables à 0€.`,
        },
        {
          type: 'example',
          title: 'Antoine économise 22 000€ sur son crédit',
          content: `**Antoine achète un appartement à 250 000€**

**Sans optimisation** :
- Apport : 25 000€ (10%)
- Taux : 3,8% sur 25 ans
- Assurance banque : 0,35%/an
- Mensualité : 1 385€
- Coût total crédit + assurance : **108 500€**

**Avec optimisation** :
- Apport : 50 000€ (20%) → meilleur taux
- Courtier → taux négocié : 3,5% sur 20 ans
- Assurance externe : 0,12%/an
- Mensualité : 1 290€
- Coût total crédit + assurance : **86 400€**

**Économie totale** : 22 100€ 🎉
Investissement temps : 3h avec un courtier.`,
        },
        {
          type: 'action',
          title: 'Prépare ton dossier de crédit idéal',
          content: `🎯 **Checklist avant de chercher un crédit immobilier** :

**12 mois avant** :
- Pas de découvert bancaire
- Épargne régulière visible sur les relevés
- Réduction des crédits en cours
- Constitution de l'apport

**6 mois avant** :
- Simulation avec un courtier (gratuit)
- Comparaison assurance emprunteur externe

**Au moment du crédit** :
- Rassemble : 3 bulletins de salaire, avis d'imposition, 3 relevés bancaires
- Compare minimum 3 offres de banques différentes
- Vérifie le TAEG incluant assurance

💡 **Loi Lemoine (2022)** : tu peux changer d'assurance emprunteur à tout moment, même après signature. Profites-en si tu as une assurance chère !`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Sur 200 000€ à 3,5% sur 20 ans, quel est approximativement le coût des intérêts ?",
          choices: ['20 000€', '50 000€', '78 000€', '120 000€'],
          correctIndex: 2,
          explanation: "Sur 200 000€ à 3,5% sur 20 ans, le coût des intérêts est d'environ 78 000€, soit 39% du capital emprunté. C'est pourquoi négocier le taux est crucial.",
        },
        {
          question: "Pourquoi déléguer l'assurance emprunteur ?",
          choices: ['C\'est obligatoire', 'Une assurance externe coûte 2 à 3 fois moins cher', 'Ça accélère le remboursement', 'C\'est plus simple'],
          correctIndex: 1,
          explanation: "L'assurance de la banque est souvent 2 à 3 fois plus chère qu'une assurance externe. La loi t'autorise à choisir ton assureur, ce qui peut économiser des dizaines de milliers d'euros.",
        },
        {
          question: "Quelle est la première chose à faire pour obtenir le meilleur taux ?",
          choices: ['Avoir le plus grand appartement', 'Maximiser son apport personnel', 'Emprunter sur la plus longue durée', 'Choisir une petite banque locale'],
          correctIndex: 1,
          explanation: "Un apport personnel élevé (20%+) rassure les banques et réduit le risque. Les banques récompensent un bon apport par un meilleur taux d'intérêt.",
        },
      ],
    },
  },

  {
    id: 'module-3-6',
    zone: 3,
    title: 'Crédit auto : acheter ou louer ?',
    description: 'LOA, LLD, crédit classique : le vrai calcul pour ta voiture',
    isPremium: false,
    levelRequired: 26,
    xpReward: 50,
    estimatedDuration: 10,
    icon: '🚗',
    orderInZone: 6,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Les 4 façons de financer une voiture',
          content: `**Option 1 : Achat comptant**
Tu paies la totalité immédiatement. La voiture t'appartient.
0 intérêt. Immobilise du capital.

**Option 2 : Crédit auto classique**
Tu empruntes et rembourses en mensualités. La voiture t'appartient à terme.
TAEG : 3 à 8%/an.

**Option 3 : LOA (Location avec Option d'Achat)**
Tu "loues" avec une option d'achat finale (10-30% de la valeur).
Tu peux racheter ou rendre la voiture.

**Option 4 : LLD (Location Longue Durée)**
Tu loues sans option d'achat. Entretien inclus parfois.
Tu n'es jamais propriétaire.`,
        },
        {
          type: 'why',
          title: 'Pourquoi la voiture est un gouffre financier',
          content: `✅ **La voiture perd de la valeur immédiatement** : -20% dès la sortie du garage, -50% en 3 ans
✅ **C'est le 2ème poste de dépense** pour beaucoup de ménages
✅ **Les coûts cachés s'accumulent** : assurance, carburant, entretien, stationnement

**Coût total annuel d'une voiture à 25 000€** :
- Dépréciation : 3 500€/an
- Assurance : 1 200€/an
- Carburant : 2 000€/an
- Entretien : 800€/an
- Crédit : 2 400€/an
**Total : ~9 900€ soit 825€/mois !**

**Chiffre choc** : Une voiture neuve à 30 000€ en LOA sur 3 ans revient souvent à 40-45 000€ sur la période.`,
        },
        {
          type: 'how',
          title: 'Quel financement choisir ?',
          content: `**Si tu veux le coût total le plus bas** :
Achat comptant d'une voiture d'occasion récente (2-4 ans).
La dépréciation a déjà eu lieu, zéro intérêt.

**Si tu n'as pas de capital disponible** :
Crédit auto classique sur 3-4 ans maximum.
Compare les TAEG, négociez avec ta banque.

**Si tu veux changer de voiture souvent** :
LOA ou LLD — mais c'est le plus cher sur le long terme.

**Si c'est pour le professionnel** :
LLD peut être déductible fiscalement.

**Règle générale** : LOA/LLD = facilité + coût élevé. Achat occasion = économie maximale.`,
        },
        {
          type: 'example',
          title: 'Le vrai coût comparé sur 3 ans',
          content: `**Voiture souhaitée : Toyota Yaris (valeur neuf : 22 000€)**

**Option 1 : LOA sur 36 mois**
- Mensualité : 280€/mois
- Loyer total : 10 080€
- Option d'achat : 7 500€
- Total si rachat : 17 580€ (coût LOA vs achat : +3 580€)

**Option 2 : Crédit classique (TAEG 4,5% / 36 mois)**
- Total remboursé : 23 580€
- Coût du crédit : 1 580€
- Valeur revente à 3 ans : ~14 000€ → coût net : **9 580€**

**Option 3 : Achat occasion (Yaris 2 ans, 35 000km)**
- Prix : 14 500€ comptant
- Valeur revente à 3 ans : 10 000€
- Coût net : **4 500€**

**Verdict** : Option 3 coûte 2x moins cher que la LOA.`,
        },
        {
          type: 'action',
          title: 'Calcule le coût total de ta voiture',
          content: `🎯 **Avant d'acheter ou louer une voiture** :

**Étape 1** : Calcule le coût total de propriété sur 3-5 ans
Prix d'achat - valeur revente + assurance + entretien + carburant + crédit éventuel

**Étape 2** : Compare avec les alternatives
- Voiture plus petite ?
- Occasion récente plutôt que neuf ?
- Covoiturage ou autopartage pour certains trajets ?

**Étape 3** : Si tu choisis un crédit
- Compare les TAEG : ta banque, autres banques, concessionnaire
- Limite la durée à 3-4 ans maximum
- Apport de 20% minimum

💡 **Meilleur achat** : voiture d'occasion de 2-4 ans, achetée au particulier, payée comptant si possible.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quelle option de financement voiture a généralement le coût total le plus bas ?",
          choices: ['LOA sur 36 mois', 'LLD sans option d\'achat', 'Achat d\'une occasion récente comptant', 'Crédit auto sur 5 ans'],
          correctIndex: 2,
          explanation: "L'achat d'une voiture d'occasion récente au comptant est généralement l'option la moins chère : zéro intérêt et la dépréciation initiale est déjà absorbée.",
        },
        {
          question: "Une voiture neuve perd combien de valeur dans les 3 premières années ?",
          choices: ['10%', '25%', '50%', '75%'],
          correctIndex: 2,
          explanation: "Une voiture neuve perd en moyenne 50% de sa valeur en 3 ans. Acheter une voiture de 2-4 ans permet d'éviter cette dépréciation initiale massive.",
        },
        {
          question: "En LOA, à qui appartient la voiture pendant le contrat ?",
          choices: ['À toi', 'À la banque/loueur', 'Aux deux conjointement', 'À personne'],
          correctIndex: 1,
          explanation: "En LOA, la voiture appartient à la banque ou au loueur pendant toute la durée du contrat. Tu la loues — tu ne la possèdes pas avant d'avoir levé l'option d'achat.",
        },
      ],
    },
  },

  {
    id: 'module-3-7',
    zone: 3,
    title: "Le taux d'endettement",
    description: "Comprendre la règle des 35% et tes capacités d'emprunt",
    isPremium: false,
    levelRequired: 27,
    xpReward: 50,
    estimatedDuration: 7,
    icon: '⚖️',
    orderInZone: 7,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi le taux d'endettement ?",
          content: `Le **taux d'endettement** est le rapport entre tes charges de crédit mensuelles et tes revenus nets.

**Formule** :
Taux d'endettement = (Total mensualités crédits / Revenus nets) × 100

**Exemple** :
- Revenus nets : 2 500€/mois
- Crédit immo : 700€/mois
- Crédit auto : 250€/mois
- Total charges : 950€/mois
- Taux d'endettement : 950 / 2 500 × 100 = **38%**

**La règle des 35%** : Les banques françaises n'accordent généralement pas de crédit si le taux d'endettement dépasse 35% (règle du Haut Conseil de Stabilité Financière).`,
        },
        {
          type: 'why',
          title: 'Pourquoi cette limite protège les emprunteurs',
          content: `✅ **Protège contre le surendettement** : au-delà de 35%, le risque d'incident de paiement augmente fortement
✅ **Préserve un "reste à vivre" suffisant** : tu dois pouvoir vivre avec ce qui reste
✅ **Les banques te protègent parfois contre toi-même** : refuser un crédit peut être un service

**Le "reste à vivre"** :
Revenus - Charges crédit = Reste à vivre
- En couple : minimum 1 500-2 000€/mois
- Seul : minimum 900-1 200€/mois

**Chiffre choc** : 15% des Français dépassent le taux d'endettement de 35%.`,
        },
        {
          type: 'how',
          title: "Calculer et optimiser son taux d'endettement",
          content: `**Étape 1** : Calcule ton taux actuel
Total mensualités / Revenus nets × 100 = _____%

**Étape 2** : Si tu veux emprunter, calcule ta capacité résiduelle
Revenus × 35% = charge maximale possible
Charge maximale - charges existantes = mensualité disponible

**Étape 3** : Si ton taux est > 35% et tu veux emprunter
- Rembourse d'abord les petits crédits (libère de la capacité)
- Augmente tes revenus (co-emprunteur, promotion)
- Prolonge la durée (réduit la mensualité mais augmente le coût total)

**Étape 4** : Anticipe les variations
Un crédit sur 20 ans doit tenir même si tes revenus baissent.`,
        },
        {
          type: 'example',
          title: "Camille calcule sa capacité d'emprunt",
          content: `**Camille veut acheter un appartement — revenus : 3 200€/mois**

**Charges actuelles** :
- Crédit auto : 380€/mois
- Taux d'endettement actuel : 380 / 3 200 = 12%

**Calcul de capacité maximale** :
- Capacité max 35% : 3 200 × 35% = 1 120€/mois
- Disponible pour immobilier : 1 120€ - 380€ = **740€/mois**

**Simulation crédit immobilier** :
- Mensualité max : 740€
- Durée : 20 ans, TAEG 3,8%
- Capital empruntable : ~120 000€

**Si elle rembourse d'abord son crédit auto** (dans 18 mois) :
- Capacité : 1 120€/mois
- Capital empruntable : ~195 000€
- Gain d'emprunt : +75 000€ 🎉`,
        },
        {
          type: 'action',
          title: 'Calcule ta situation maintenant',
          content: `🎯 **Ton calcul** :

**Étape 1** : Liste toutes tes mensualités de crédits
(immo, auto, consommation, revolving...)
Total : ________€/mois

**Étape 2** : Note tes revenus nets
________€/mois

**Étape 3** : Taux d'endettement actuel
________ / ________ × 100 = ________%

**Étape 4** : Capacité résiduelle
Revenus × 35% - charges actuelles = ________€/mois disponibles

💡 **Astuce** : Un crédit de 200€/mois remboursé = potentiellement 65 000€ d'emprunt immobilier supplémentaire. Rembourse d'abord les petits crédits si tu veux acheter.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quel est le taux d'endettement maximum généralement accepté par les banques françaises ?",
          choices: ['25%', '30%', '35%', '45%'],
          correctIndex: 2,
          explanation: "Le HCSF fixe la limite à 35% du revenu net mensuel. Au-delà, les banques refusent généralement le crédit pour protéger l'emprunteur contre le surendettement.",
        },
        {
          question: "Tu gagnes 2 000€ nets et as 500€ de mensualités. Ton taux d'endettement est de...",
          choices: ['20%', '25%', '30%', '40%'],
          correctIndex: 1,
          explanation: "500€ / 2 000€ × 100 = 25%. Tu as encore 10 points de marge avant d'atteindre la limite des 35%.",
        },
        {
          question: "Comment augmenter sa capacité d'emprunt immobilier ?",
          choices: ['Prendre un crédit à la consommation en plus', 'Rembourser ses petits crédits existants avant', 'Augmenter la durée de tous ses crédits', 'Changer de banque'],
          correctIndex: 1,
          explanation: "Rembourser les crédits existants libère de la capacité d'endettement. Un crédit auto de 300€/mois remboursé peut permettre d'emprunter 75 000€ de plus pour l'immobilier.",
        },
      ],
    },
  },

  {
    id: 'module-3-8',
    zone: 3,
    title: 'Sortir du découvert',
    description: 'Le plan étape par étape pour quitter le rouge définitivement',
    isPremium: false,
    levelRequired: 28,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '🆘',
    orderInZone: 8,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Le découvert : deux types très différents',
          content: `**Découvert autorisé** :
Ta banque t'autorise contractuellement à être dans le négatif.
- Taux : 8-15%/an
- Frais d'agios calculés sur les jours et montants

**Découvert non autorisé** :
Tu dépasses le plafond ou n'as pas d'autorisation.
- Taux : jusqu'à 22%/an
- Frais d'intervention : 8€ par opération rejetée
- Risque de rejet de prélèvements (loyer, EDF...)

**Le cercle vicieux** :
Découvert → frais → moins d'argent → encore plus découvert → mois suivant encore pire.`,
        },
        {
          type: 'why',
          title: 'Pourquoi le découvert chronique est dangereux',
          content: `✅ **Coût élevé** : agios 15%/an + frais d'intervention drainent l'épargne potentielle
✅ **Impact sur l'accès au crédit** : 3 mois de relevés avec découverts = crédit immobilier refusé
✅ **Stress permanent** : vivre dans le rouge crée une anxiété financière chronique

**Coût réel du découvert chronique** :
- 500€ de découvert pendant 15 jours chaque mois
- Agios + frais divers = ~25€/mois
- **Soit 300€/an** jetés à la poubelle
- Sans compter les prélèvements rejetés (8€ chacun)`,
        },
        {
          type: 'how',
          title: 'Plan de sortie en 3 phases',
          content: `**Phase 1 - Stopper le saignement** :
- Identifie la cause (mauvais timing ? dépenses excessives ? revenus insuffisants ?)
- Appelle ta banque → décale les prélèvements au 5 du mois (après la paie)
- Supprime les dépenses non essentielles ce mois

**Phase 2 - Créer le coussin** :
- Objectif : 300€ de plus que d'habitude sur ton compte
- Méthode : 50€/semaine mis de côté
- Ne le touche JAMAIS sauf vraie urgence

**Phase 3 - Consolider** :
- Budget mensuel établi et suivi
- Virement épargne automatique dès la paie
- Pas de nouveaux crédits tant que situation non stabilisée`,
        },
        {
          type: 'example',
          title: 'Yanis sort du rouge en 8 semaines',
          content: `**Yanis, 27 ans** — découvert chronique de 400-600€ depuis 8 mois.

**Diagnostic** : paie le 28, loyer prélevé le 1er, charges les 3-5. Décalage de 3 jours = découvert structurel.

**Semaine 1** : Appel banque → tous les prélèvements décalés au 5.
→ Découvert structural disparaît.

**Semaines 1-4** : 50€/semaine de côté sur Livret A.
→ Coussin : 200€.

**Semaines 5-8** : Coussin 300€ → transféré sur compte courant.
→ Tampon permanent, zéro découvert.

**Mois 3** : Budget maîtrisé, virement auto 100€/mois épargne.
→ Livret A commence à grossir.

**Résultat** : 0 découvert depuis 2 mois, économies de ~25€/mois d'agios.`,
        },
        {
          type: 'action',
          title: 'Ton plan anti-découvert cette semaine',
          content: `🎯 **Si tu es régulièrement à découvert** :

**Aujourd'hui** :
- Appelle ta banque → décalage des prélèvements au 5 du mois
- Identifie la cause principale

**Cette semaine** :
- Supprime ou reporte toute dépense non essentielle
- Met 50€ de côté sur livret

**Ce mois** :
- Budget écrit et suivi
- Objectif : coussin de 300€ sur compte courant

**À 3 mois** :
- Coussin constitué
- Virement épargne automatique en place

💡 **Alerte bancaire** : règle une notification sur ton app à 500€ — tu reçois un signal quand tu approches de la zone de danger.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quelle est la principale différence entre découvert autorisé et non autorisé ?",
          choices: ['Aucune différence', 'Le découvert non autorisé est gratuit', 'Le découvert non autorisé entraîne des frais encore plus élevés et des rejets de paiement', 'Le découvert autorisé est illimité'],
          correctIndex: 2,
          explanation: "Le découvert non autorisé peut atteindre 22%/an + 8€ par opération rejetée, créant une spirale coûteuse si des prélèvements importants comme le loyer sont rejetés.",
        },
        {
          question: "Quelle est souvent la cause d'un découvert chronique malgré des revenus suffisants ?",
          choices: ['Les revenus sont vraiment trop faibles', 'Le mauvais timing entre prélèvements et date de paie', 'Les banques sont de mauvaise foi', 'C\'est inévitable'],
          correctIndex: 1,
          explanation: "Souvent, le découvert vient d'un décalage : loyer et charges prélevés le 1er-5 du mois, paie arrivant le 28. Un simple décalage des prélèvements résout le problème.",
        },
        {
          question: "Le 'coussin de sécurité' sur compte courant doit être d'environ...",
          choices: ['10€', '50-100€', '300-500€', '2 000€'],
          correctIndex: 2,
          explanation: "Un coussin de 300 à 500€ en permanence absorbe les petits imprévus et évite les agios. C'est la base de toute gestion saine du compte courant.",
        },
      ],
    },
  },

  {
    id: 'module-3-9',
    zone: 3,
    title: 'Les arnaques au crédit',
    description: 'Reconnais et évite les pièges qui coûtent très cher',
    isPremium: true,
    levelRequired: 29,
    xpReward: 50,
    estimatedDuration: 8,
    icon: '⚠️',
    orderInZone: 9,
    content: {
      slides: [
        {
          type: 'definition',
          title: 'Les 5 arnaques les plus courantes',
          content: `**Arnaque 1 : Le crédit revolving camouflé**
Proposé comme "réserve d'argent disponible". TAEG : 20%+.

**Arnaque 2 : Le rachat de crédit frauduleux**
Réduit les mensualités en allongeant tellement la durée que tu paies 50% de plus au total.

**Arnaque 3 : L'assurance crédit inutile**
Assurances "chômage" avec tant d'exclusions qu'elles ne couvrent presque rien.

**Arnaque 4 : Frais à l'avance**
"Je vous prête 5 000€, juste 200€ de frais de dossier à l'avance." C'est illégal et l'argent ne vient jamais.

**Arnaque 5 : Offres sur les réseaux sociaux**
Crédits proposés via Facebook/Instagram par des prêteurs non agréés.`,
        },
        {
          type: 'why',
          title: 'Pourquoi ces arnaques fonctionnent',
          content: `✅ **L'urgence financière** : quand on est dans le besoin, on analyse moins bien
✅ **La complexité volontaire** : contrats incompréhensibles pour masquer les vrais coûts
✅ **Les promesses alléchantes** : "réduis tes mensualités de 40%"
✅ **Le manque d'éducation financière** : on n'apprend pas à lire ces contrats à l'école

**Chiffre choc** :
- 1,8 million de Français en situation de surendettement
- La Banque de France gère ~150 000 dossiers par an
- Une grande partie liée à des crédits coûteux mal compris`,
        },
        {
          type: 'how',
          title: 'Comment se protéger',
          content: `**Règle 1** : Ne jamais payer pour recevoir un crédit
Les frais de dossier légaux se paient APRÈS obtention du crédit, jamais avant.

**Règle 2** : Toujours calculer le coût TOTAL
Mensualité × Nombre de mois = total remboursé. Comparer au capital emprunté.

**Règle 3** : Lire les conditions de l'assurance
Quelles exclusions ? Conditions pour déclencher la garantie ?

**Règle 4** : Prendre 24h avant de signer
Le délai légal de rétractation est de 14 jours pour les crédits.

**Règle 5** : Vérifier l'agrément
ORIAS.fr → registre officiel des intermédiaires bancaires agréés.`,
        },
        {
          type: 'example',
          title: "Décrypter une offre douteuse",
          content: `**L'annonce vue sur Facebook** :
"Besoin d'argent ? Prêt 3 000€ à 5,9% TAEG. Mensualités à partir de 49€/mois. Répondez vite !"

**Les signaux d'alarme** :
- 49€/mois pour 3 000€ → durée ~61 mois → TAEG réel bien plus élevé que 5,9%
- "Répondez vite" → pression artificielle, signe de manipulation
- Formulaire Facebook → pas un établissement agréé
- Demande d'avance de frais → arnaque absolue

**Comment vérifier** :
- ORIAS.fr → l'établissement y est-il inscrit ?
- Calcul : 3 000€ sur 61 mois à 5,9% → mensualité réelle = 56€, pas 49€. Les chiffres ne collent pas.

**Conclusion** : à fuir immédiatement.`,
        },
        {
          type: 'action',
          title: 'Checklist anti-arnaque crédit',
          content: `🎯 **Avant de signer n'importe quel crédit** :

✅ L'établissement est-il sur ORIAS.fr ?
✅ Le TAEG est-il clairement affiché ?
✅ As-tu calculé le coût total (mensualité × durée) ?
✅ As-tu lu toutes les conditions de l'assurance ?
✅ On ne te demande pas de payer AVANT de recevoir l'argent ?
✅ Tu n'es pas sous pression artificielle ?
✅ Tu as attendu 24h avant de décider ?
✅ Tu as comparé avec au moins 2 autres offres ?

💡 **En cas de doute** : contacte la Banque de France (3414, gratuit) ou UFC-Que Choisir.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Un prêteur te demande 150€ AVANT de te donner le crédit. Que fais-tu ?",
          choices: ['Tu paies, c\'est normal', 'Tu refuses — les frais légaux se paient après obtention du prêt', 'Tu négocies à 100€', 'Tu demandes un reçu'],
          correctIndex: 1,
          explanation: "En France, payer des frais avant de recevoir un crédit est illégal. C'est systématiquement le signe d'une arnaque. Aucun établissement légal ne demande cela.",
        },
        {
          question: "Comment vérifier qu'un établissement de crédit est légalement autorisé ?",
          choices: ['Sur son site internet', 'Sur ORIAS.fr', 'Sur les réseaux sociaux', 'Il suffit de lui faire confiance'],
          correctIndex: 1,
          explanation: "ORIAS.fr est le registre officiel obligatoire de tous les intermédiaires financiers légaux. Si l'établissement n'y est pas, c'est un signal d'alarme majeur.",
        },
        {
          question: "Un rachat de crédit réduit ta mensualité de 30% mais allonge la durée de 5 ans. C'est...",
          choices: ['Toujours une bonne affaire', 'Neutre', 'Potentiellement plus coûteux au total selon les frais', 'Obligatoire en cas de difficultés'],
          correctIndex: 2,
          explanation: "Réduire une mensualité en allongeant la durée augmente souvent le coût total. Calcule toujours : mensualité × durée totale avant ET après pour voir si tu économises vraiment.",
        },
      ],
    },
  },

  {
    id: 'module-3-10',
    zone: 3,
    title: 'Négocier son crédit immobilier',
    description: "Les techniques des pros pour économiser des milliers d'euros",
    isPremium: true,
    levelRequired: 30,
    xpReward: 60,
    estimatedDuration: 10,
    icon: '🤝',
    orderInZone: 10,
    content: {
      slides: [
        {
          type: 'definition',
          title: "Ce qui est négociable dans un crédit immobilier",
          content: `Contrairement aux idées reçues, presque tout est négociable :

**Éléments négociables** :
- Le taux d'intérêt nominal
- Les frais de dossier (0 à 1 500€)
- Le taux de l'assurance emprunteur
- La modularité des mensualités
- Les pénalités de remboursement anticipé
- Les conditions de report d'échéances

**Pas négociable** :
- Le taux légal maximum (usure)
- Les frais de notaire (fixés par l'État)`,
        },
        {
          type: 'why',
          title: "Pourquoi négocier vaut des milliers d'euros",
          content: `**Impact d'un taux négocié sur 200 000€ / 20 ans** :
- 4% → total intérêts : 90 880€
- 3,5% → total intérêts : 78 400€
- **Économie 0,5%** : 12 480€ !

**Impact de l'assurance** :
Assurance banque 0,35% vs externe 0,12% sur 200 000€ / 20 ans :
- Banque : 14 000€ d'assurance
- Externe : 4 800€ d'assurance
- **Économie** : 9 200€

**Total possible** : 20 000€+ économisés pour 3h de démarches.`,
        },
        {
          type: 'how',
          title: 'Stratégie de négociation en 5 étapes',
          content: `**Étape 1** : Soigne ton dossier en amont
CDI stable, revenus stables 3 ans, pas de découvert, apport 20%+.

**Étape 2** : Passe par un courtier
Accès à 10-20 banques simultanément. Gratuit pour toi.

**Étape 3** : Obtiens des offres concurrentes
Même si tu veux rester dans ta banque, les offres concurrentes sont ton meilleur levier.

**Étape 4** : Négocie point par point
- Taux (objectif : - 0,2 à 0,4% vs offre initiale)
- Frais de dossier (objectif : 0€)
- Pénalités remboursement anticipé (objectif : 0%)

**Étape 5** : Délègue l'assurance immédiatement`,
        },
        {
          type: 'example',
          title: 'Aline économise 31 000€',
          content: `**Aline, 33 ans, CDI, 35 000€/an — achat 220 000€**

**Offre initiale banque habituelle** :
- Taux : 3,95% sur 20 ans
- Frais dossier : 1 200€
- Assurance : 0,38%/an
- Coût total crédit + assurance : **118 400€**

**Après négociation via courtier** :
- Taux : 3,6% (banque concurrente)
- Frais dossier : 0€
- Assurance externe : 0,12%/an
- Pénalité anticipée : 0%
- Coût total : **87 200€**

**Économie** : 31 200€ sur 20 ans
Investissement temps : 3 heures.
Taux horaire implicite : 10 400€/h !`,
        },
        {
          type: 'action',
          title: 'Plan de négociation de ton crédit',
          content: `🎯 **Avant de signer** :

**Semaine 1** : Prépare ton dossier
3 bulletins salaire + avis imposition + 3 relevés bancaires (sans découvert) + justificatif apport

**Semaine 2** : Contacte un courtier gratuit
Meilleurtaux.com, CAFPI, Empruntis — prise de rendez-vous en ligne

**Semaine 3** : Négocie avec ta banque actuelle
Présente les meilleures offres du courtier comme levier

**Semaine 4** : Compare et signe
TAEG incluant assurance, pénalités de remboursement anticipé

💡 **Rappel** : tu as 10 jours de réflexion légal après réception de l'offre. Utilise-les pour comparer et ne jamais signer sous pression.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Combien peut-on économiser sur l'assurance emprunteur en passant à une externe (0,12% vs 0,35%) sur 200 000€ / 20 ans ?",
          choices: ['1 000€', '5 000€', '9 200€', '20 000€'],
          correctIndex: 2,
          explanation: "Assurance banque 0,35% = 14 000€ sur 20 ans. Assurance externe 0,12% = 4 800€. Économie : 9 200€ uniquement sur l'assurance.",
        },
        {
          question: "Quel est le rôle d'un courtier en crédit immobilier ?",
          choices: ['Il prête lui-même l\'argent', 'Il négocie simultanément avec plusieurs banques pour trouver la meilleure offre', 'Il garantit un taux fixe', 'Il remplace le notaire'],
          correctIndex: 1,
          explanation: "Un courtier contacte et négocie avec 10 à 20 banques en même temps. Il connaît les grilles tarifaires et obtient des conditions préférentielles. Il est gratuit pour l'emprunteur.",
        },
        {
          question: "Quel est le meilleur levier pour négocier un meilleur taux avec ta banque ?",
          choices: ['Être client depuis longtemps', 'Menacer de partir poliment', 'Présenter des offres concrètes de banques concurrentes', 'Augmenter la durée du crédit'],
          correctIndex: 2,
          explanation: "Rien ne vaut une offre concurrente documentée. Ta banque peut difficilement refuser de s'aligner sur un TAEG d'un concurrent sérieux si elle veut te garder comme client.",
        },
      ],
    },
  },

  {
    id: 'module-3-11',
    zone: 3,
    title: 'Le rachat de crédit',
    description: 'Quand et comment regrouper ses crédits intelligemment',
    isPremium: true,
    levelRequired: 31,
    xpReward: 50,
    estimatedDuration: 9,
    icon: '🔄',
    orderInZone: 11,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi un rachat de crédit ?",
          content: `Le **rachat de crédit** consiste à réunir plusieurs crédits en UN seul, avec une mensualité unique.

**Comment ça marche** :
Un nouvel établissement rembourse tous tes crédits existants et te propose un nouveau crédit unique.

**Deux types** :
- **Rachat de crédits à la consommation** : prêts perso, auto, revolving
- **Rachat mixte** : crédit immobilier + crédits consommation

**Ce que ça change** :
- Mensualité souvent réduite (30-50%)
- Un seul créancier
- Gestion simplifiée

**Attention** : la réduction vient souvent d'un allongement de durée → coût total souvent plus élevé.`,
        },
        {
          type: 'why',
          title: 'Dans quel cas le rachat est intéressant',
          content: `**CAS FAVORABLES** :
✅ Taux d'endettement > 35% qui bloque un projet immobilier
✅ Taux actuels bien supérieurs au marché (ex: revolving à 18%)
✅ Urgence : risque de surendettement imminent
✅ Simplification souhaitée

**CAS DÉFAVORABLES** :
❌ Tu allonges la durée et le coût total augmente
❌ Les frais de rachat annulent les économies
❌ Tu refinances uniquement pour "libérer du cash"
❌ Tu es à mi-parcours d'un crédit (intérêts déjà payés en majorité)

**Règle** : calcule TOUJOURS le coût total avant ET après.`,
        },
        {
          type: 'how',
          title: "Comment évaluer un rachat de crédit",
          content: `**Étape 1** : Liste tes crédits actuels
Capital restant | Taux | Mensualité | Durée restante | Coût total restant

**Étape 2** : Calcule le coût total restant actuel
Somme de (mensualités × durées restantes)

**Étape 3** : Demande une simulation de rachat
Capital restant total + frais de rachat → nouveau taux + nouvelle durée

**Étape 4** : Calcule le nouveau coût total
Nouvelles mensualités × nouvelle durée

**Étape 5** : Compare les deux coûts totaux
Coût actuel restant vs coût total nouveau = économie ou surcoût ?`,
        },
        {
          type: 'example',
          title: "Analyse coût-bénéfice d'un rachat",
          content: `**Pedro** — 3 crédits, surplus mensuel : 480€

**Situation actuelle** :
- Crédit auto : 5 000€ restants à 8%, 3 ans → coût restant : 5 640€
- Prêt perso : 8 000€ restants à 6%, 4 ans → coût restant : 9 152€
- Revolving : 2 000€ restants à 18%, 2 ans → coût restant : 2 480€

**Total mensualités : 480€/mois**
**Coût total restant : 17 272€**

**Offre de rachat** :
- Capital : 15 000€ + frais 800€ = 15 800€ emprunté
- Taux : 6,5% sur 6 ans → mensualité : 265€/mois (-45%)
- Coût total : 265€ × 72 mois = **19 080€**

**Analyse** :
- Mensualité allégée de 215€/mois ✅
- Mais coût total 1 808€ DE PLUS ❌
- Pedro garde ses crédits et rembourse rapidement.`,
        },
        {
          type: 'action',
          title: 'Évalue si le rachat est bon pour toi',
          content: `🎯 **Questions à se poser avant un rachat** :

**Question 1** : Ton taux d'endettement dépasse 35% ?
Oui → le rachat peut t'aider à redevenir bancable.

**Question 2** : Tes taux actuels sont > 10% ?
Oui → le rachat à 5-7% peut être vraiment avantageux.

**Question 3** : As-tu calculé le coût total avant/après ?
Ne te fie pas à la mensualité seule.

**Question 4** : Les frais de rachat sont-ils compensés ?
Frais dossier + indemnités < économies d'intérêts ?

💡 **Courtiers spécialisés** : Younited Credit, Meilleurtaux ont des simulateurs gratuits.

⚠️ **Méfie-toi des promesses "rachat facile"** — toujours comparer plusieurs offres.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Quel est le principal risque d'un rachat de crédit ?",
          choices: ['Avoir une seule mensualité', 'Allonger la durée et payer plus au total', 'Perdre sa banque habituelle', 'Devoir changer de voiture'],
          correctIndex: 1,
          explanation: "Le rachat réduit souvent la mensualité en allongeant la durée, ce qui fait payer plus d'intérêts au total. Il faut comparer les coûts totaux, pas seulement les mensualités.",
        },
        {
          question: "Dans quel cas un rachat de crédit est clairement avantageux ?",
          choices: ['Quand on veut libérer du cash', 'Quand le taux d\'endettement est > 35% avec des crédits à taux très élevé', 'Quand on est à mi-chemin du crédit immobilier', 'C\'est toujours avantageux'],
          correctIndex: 1,
          explanation: "Quand le taux d'endettement bloque un projet ET que des crédits revolving à 15-20% peuvent être rachetés à 5-7%, l'économie d'intérêts est réelle.",
        },
        {
          question: "Comment savoir si un rachat est vraiment intéressant ?",
          choices: ['Si la mensualité baisse', 'En comparant le coût total actuel vs le coût total du nouveau crédit', 'Si le conseiller dit que c\'est bien', 'Si la durée est plus courte'],
          correctIndex: 1,
          explanation: "La seule vraie mesure : coût total actuel (mensualités × durées restantes) vs coût total nouveau crédit. Si le total après est plus bas, c'est intéressant.",
        },
      ],
    },
  },

  {
    id: 'module-3-12',
    zone: 3,
    title: 'Le surendettement',
    description: 'Reconnaître les signaux et les solutions légales pour s\'en sortir',
    isPremium: true,
    levelRequired: 32,
    xpReward: 75,
    estimatedDuration: 10,
    icon: '🏳️',
    orderInZone: 12,
    content: {
      slides: [
        {
          type: 'definition',
          title: "C'est quoi le surendettement ?",
          content: `Le **surendettement** est la situation d'une personne physique dans l'impossibilité de faire face à l'ensemble de ses dettes non professionnelles.

**Deux types** :
- **Actif** : dettes contractées de façon déraisonnable
- **Passif** : dettes devenues impossibles à rembourser suite à un accident de vie (chômage, divorce, maladie) — le cas le plus fréquent

**Signaux d'alerte** :
- Tu paies tes crédits avec d'autres crédits
- Des prélèvements sont régulièrement rejetés
- Tu ne peux plus payer les charges essentielles (loyer, électricité)
- Tu as reçu des mises en demeure ou avis d'huissier
- Le stress financier impacte ta santé`,
        },
        {
          type: 'why',
          title: 'Pourquoi agir vite est crucial',
          content: `✅ **Les intérêts s'accumulent** : chaque mois sans solution = dettes qui grossissent
✅ **Les pénalités s'ajoutent** : frais de recouvrement, huissiers, majorations
✅ **Impact sur la vie quotidienne** : difficultés à avoir un logement ou un compte
✅ **Des solutions légales existent** : la Banque de France a un dispositif officiel et gratuit

**Chiffre choc** :
- 150 000 nouveaux dossiers de surendettement par an en France
- **70% dus à des accidents de vie** (chômage, séparation, maladie)
- Ce n'est pas une honte — c'est un problème systémique avec des solutions`,
        },
        {
          type: 'how',
          title: 'La procédure de surendettement Banque de France',
          content: `**Étape 1** : Dépôt de dossier
Rendez-vous Banque de France (gratuit). Formulaire + liste des dettes + revenus.

**Étape 2** : Recevabilité (2-3 mois)
Si recevable → gel immédiat des poursuites et des intérêts.

**Étape 3** : Plan de remboursement amiable
La commission tente un accord entre toi et tes créanciers. Rééchelonnement sur 7 ans max.

**Étape 4** : Si amiable échoue → Plan imposé
La commission impose un plan aux créanciers. Ils n'ont plus le choix.

**Étape 5** : En cas extrême → Rétablissement personnel
Équivalent de la faillite personnelle. Dettes effacées si patrimoine nul.`,
        },
        {
          type: 'example',
          title: "Comment Nadia s'en est sortie",
          content: `**Nadia, 38 ans** — surendettement après divorce et perte d'emploi.

**Situation** :
- Dettes totales : 28 000€
- Revolving × 3 : 8 500€
- Découverts : 2 000€
- Loyer impayé : 2 400€

**Ce qu'elle a fait** :
1. Assistante sociale → orientation Banque de France
2. Dossier déposé en mars
3. Déclaré recevable en mai → gel immédiat de toutes les poursuites
4. Plan sur 7 ans avec taux réduits
5. Maintien dans le logement après accord propriétaire

**3 ans plus tard** :
- 12 000€ remboursés selon le plan
- Nouveau CDI, situation stabilisée
- Sortie du FICP prévue dans 2 ans`,
        },
        {
          type: 'action',
          title: 'Les contacts si tu es en difficulté',
          content: `🎯 **Ne cache pas ta situation — agir tôt est toujours mieux**

**Ressources gratuites** :
- **Banque de France** : 3414 (numéro gratuit) — surendettement
- **Points Conseil Budget** : conseillers financiers gratuits (pointsconseilbudget.fr)
- **CCAS** : aide sociale dans ta ville
- **UFC-Que Choisir** : conseils juridiques

**En cas d'huissier** :
Ne ignore pas les courriers. L'huissier peut souvent négocier un étalement.

**En cas de rejet de prélèvement loyer** :
Contacte immédiatement ton propriétaire — les propriétaires préfèrent un accord amiable.

💡 **Le surendettement n'est pas une honte.** Des solutions légales et gratuites existent. Plus tu agis tôt, plus les solutions sont nombreuses.`,
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "La procédure de surendettement Banque de France est...",
          choices: ['Payante et réservée aux riches', 'Gratuite et accessible à toute personne physique en difficulté', 'Réservée aux entreprises', 'Obligatoire après un découvert'],
          correctIndex: 1,
          explanation: "La procédure est entièrement gratuite. La Banque de France traite ~150 000 dossiers par an. Toute personne physique (non commerçant) peut y avoir recours.",
        },
        {
          question: "Quel est le premier effet d'un dossier déclaré recevable ?",
          choices: ['Toutes les dettes sont effacées', 'Un gel des poursuites et des intérêts', 'La saisie du logement', 'Un prêt d\'urgence de l\'État'],
          correctIndex: 1,
          explanation: "Dès que le dossier est déclaré recevable, toutes les poursuites sont gelées et les intérêts stoppés. C'est un soulagement immédiat pour respirer.",
        },
        {
          question: "Quelle est la cause principale du surendettement en France ?",
          choices: ['Les achats de luxe excessifs', 'Les accidents de vie (chômage, séparation, maladie) — 70% des cas', 'La mauvaise foi des emprunteurs', 'Les impôts trop élevés'],
          correctIndex: 1,
          explanation: "70% des dossiers de surendettement sont liés à des accidents de vie, pas à de l'imprudence. C'est un problème qui peut toucher n'importe qui.",
        },
      ],
    },
  },
];
