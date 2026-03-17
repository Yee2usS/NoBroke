import { Module } from '@/types/module.types';

export const MODULES_ZONE5: Module[] = [
  {
    "id": "module-5-2",
    "zone": 5,
    "title": "Définir sa liberté financière",
    "description": "C'est quoi exactement et comment calculer ton chiffre cible",
    "isPremium": false,
    "levelRequired": 44,
    "xpReward": 60,
    "estimatedDuration": 10,
    "icon": "🗺️",
    "orderInZone": 2,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "La liberté financière : définition précise",
          "content": "**La liberté financière** est atteinte quand tes revenus passifs couvrent 100% de tes dépenses de vie.\n\n**En d'autres termes** : tu n'as plus besoin de travailler pour vivre. Tu travailles si tu le choisis, pas parce que tu le dois.\n\n**Les niveaux** :\n- Niveau 1 : pas de dettes, fonds d'urgence → Sécurité financière\n- Niveau 2 : revenus passifs couvrent les dépenses essentielles → Indépendance partielle\n- Niveau 3 : revenus passifs = toutes tes dépenses → Liberté financière complète\n- Niveau 4 : revenus passifs >> dépenses → Abondance\n\n**La FIRE community** : Financial Independence Retire Early — mouvement mondial pour atteindre cet objectif le plus tôt possible."
        },
        {
          "type": "why",
          "title": "Pourquoi viser la liberté financière change tout",
          "content": "✅ **Travaille par choix, pas par obligation** : tu gardes ou quittes un job pour les bonnes raisons\n✅ **Résiste aux mauvais patrons** : tu peux dire non sans conséquences financières\n✅ **Exploites tes vraies passions** : temps pour ce qui compte vraiment\n✅ **Prépares ta famille** : transmission, aide financière\n✅ **Résistance aux crises** : chômage, maladie, divorce ne te détruisent pas\n\n**Chiffre choc** : seulement 5% des Français atteignent la liberté financière. La grande majorité dépend entièrement d'un salaire jusqu'à la retraite."
        },
        {
          "type": "how",
          "title": "Calculer ton chiffre cible",
          "content": "**La règle des 4%** (Trinity Study, 1998) :\nTon portefeuille peut financer 4% de sa valeur chaque année indéfiniment (avec 95% de probabilité sur 30 ans).\n\n**Formule** :\nCapital nécessaire = Dépenses annuelles × 25\n\n**Exemples** :\n- Dépenses 1 500€/mois (18 000€/an) → Capital : 450 000€\n- Dépenses 2 000€/mois (24 000€/an) → Capital : 600 000€\n- Dépenses 3 000€/mois (36 000€/an) → Capital : 900 000€\n\n**Conclusion clé** : la liberté financière n'est pas réservée aux millionnaires. Avec un style de vie modeste, elle est accessible à beaucoup plus de gens qu'on ne le croit."
        },
        {
          "type": "example",
          "title": "Le calcul de la LF de Julie",
          "content": "**Julie, 28 ans**\nDépenses actuelles : 1 800€/mois\nDépenses à la retraite anticipée (vie simplifiée) : 1 500€/mois\n\n**Son chiffre cible** :\n1 500€ × 12 × 25 = **450 000€**\n\n**Sa situation actuelle** :\nÉpargne : 15 000€ sur PEA\nÉpargne mensuelle : 600€/mois (en ETF à 7%/an)\n\n**Calcul** :\nAvec 15 000€ de départ et 600€/mois à 7%/an :\nTemps pour atteindre 450 000€ : **25 ans** (à 53 ans) ✅\n\nEn augmentant à 900€/mois : **22 ans** (à 50 ans)"
        },
        {
          "type": "action",
          "title": "Calcule ton chiffre de liberté financière",
          "content": "🎯 **Ton calcul maintenant** :\n\n**Étape 1** : Estime tes dépenses à la liberté financière\n(Pas forcément tes dépenses actuelles — souvent moins si logement payé)\nDépenses mensuelles : ________€\n\n**Étape 2** : Applique la règle des 25\nDépenses annuelles × 25 = ________€ à constituer\n\n**Étape 3** : Calcule combien de temps avec ton épargne actuelle\nUtilise un calculateur d'intérêts composés (7%/an)\n\n**Étape 4** : Identifie les leviers pour accélérer\n- Augmenter l'épargne mensuelle ?\n- Réduire les dépenses cibles ?\n- Augmenter les revenus ?\n\n💡 La LF n'est pas une question de revenu mais de taux d'épargne. Quelqu'un qui gagne 5 000€ et dépense 4 900€ n'est pas en chemin. Quelqu'un qui gagne 2 000€ et épargne 500€ l'est."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Selon la règle des 4%, quel capital faut-il pour vivre de 2 000€/mois ?",
          "choices": [
            "240 000€",
            "480 000€",
            "600 000€",
            "1 000 000€"
          ],
          "correctIndex": 2,
          "explanation": "2 000€/mois = 24 000€/an. 24 000€ × 25 = 600 000€. Avec ce capital, 4% = 24 000€/an peut être retiré indéfiniment."
        },
        {
          "question": "La liberté financière signifie...",
          "choices": [
            "Avoir beaucoup d'argent",
            "Ne jamais travailler",
            "Avoir des revenus passifs couvrant toutes ses dépenses",
            "Être rentier immobilier"
          ],
          "correctIndex": 2,
          "explanation": "La liberté financière = revenus passifs (investissements, loyers...) ≥ dépenses de vie. Tu travailles par choix, pas par obligation."
        },
        {
          "question": "Pourquoi un style de vie modeste accélère la liberté financière ?",
          "choices": [
            "Aucune raison particulière",
            "Il réduit le capital cible ET augmente l'épargne mensuelle en même temps",
            "C'est uniquement une question de revenus",
            "Les frais bancaires sont moins élevés"
          ],
          "correctIndex": 1,
          "explanation": "Vivre modestement réduit les dépenses cibles (capital requis plus petit) ET libère plus d'argent pour épargner chaque mois. Double effet accélérateur."
        }
      ]
    }
  },
  {
    "id": "module-5-3",
    "zone": 5,
    "title": "Les revenus passifs expliqués",
    "description": "Les vraies sources de revenus qui travaillent pendant que tu dors",
    "isPremium": false,
    "levelRequired": 45,
    "xpReward": 60,
    "estimatedDuration": 10,
    "icon": "💸",
    "orderInZone": 3,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "C'est quoi un revenu passif ?",
          "content": "**Un revenu passif** est un revenu généré avec peu ou pas de travail actif continu.\n\n**Vrai passif** :\n- Dividendes d'actions et ETF\n- Intérêts de placements (livrets, obligations)\n- Loyers immobiliers (partiellement — gestion nécessaire)\n- Redevances sur œuvres créatives\n- Revenus de SCPI\n\n**Semi-passif** (nécessite du travail initial) :\n- Créer un produit digital (cours en ligne, e-book)\n- Monétiser un contenu (blog, chaîne YouTube)\n- Business automatisé\n\n**Attention aux faux revenus passifs** :\nLe trading actif, le dropshipping, le MLM = pas vraiment passifs."
        },
        {
          "type": "why",
          "title": "Pourquoi construire des revenus passifs",
          "content": "**Le temps des riches vs le temps des pauvres** :\n- Revenu actif : tu échanges ton temps contre de l'argent. Si tu t'arrêtes, l'argent s'arrête.\n- Revenu passif : ton capital et tes actifs travaillent pour toi 24h/24.\n\n**L'objectif de FIRE** : atteindre le point où les revenus passifs = dépenses → liberté totale.\n\n**Chiffre choc** : le dividende moyen d'un portefeuille d'ETF est de 1,5-2%/an. Sur 500 000€ : 7 500-10 000€/an de dividendes. Sans rien faire !"
        },
        {
          "type": "how",
          "title": "Construire ses premiers revenus passifs",
          "content": "**Niveau débutant** : les livrets (Livret A, LEP)\n- Revenus d'intérêts immédiats, sûrs\n- Limités par le plafond et le faible taux\n\n**Niveau intermédiaire** : dividendes d'ETF\n- Un ETF distribuant verse des dividendes réguliers\n- ETF dividendes élevés : 3-4%/an\n\n**Niveau avancé** : immobilier locatif\n- Loyers mensuels réguliers\n- Effet de levier possible\n\n**Niveau expert** : business automatisé\n- Produits digitaux, SaaS, royalties\n- Nécessite un investissement initial important (temps ou argent)"
        },
        {
          "type": "example",
          "title": "Les revenus passifs de Pierre à 38 ans",
          "content": "**Pierre, 38 ans — situation après 10 ans d'investissement**\n\n**Sources de revenus passifs** :\n- Dividendes PEA (ETF distribuants) : 180€/mois\n  (Portefeuille de 90 000€ × 2,4%/an)\n- Loyers studio locatif : 620€/mois\n  (Après crédit et charges : 95€/mois net)\n- Intérêts livrets : 45€/mois\n  (Livret A 22 950€ × 2,4%)\n\n**Total revenus passifs** : **320€/mois**\n**Progression vers LF** : 320€/1 800€ dépenses = 17,8%\n\n**Objectif** : atteindre 1 800€/mois de revenus passifs dans 12 ans (à 50 ans)."
        },
        {
          "type": "action",
          "title": "Identifie tes premières sources de revenus passifs",
          "content": "🎯 **Par où commencer** :\n\n**Si épargne < 10 000€** :\n- Livret A/LEP maximisés → intérêts réguliers\n- Puis ouvrir PEA avec ETF distribuants\n\n**Si épargne 10 000 - 50 000€** :\n- PEA avec mix ETF capitalisants + distribuants\n- Commencer à regarder l'immobilier locatif\n\n**Si épargne > 50 000€** :\n- Diversifier les sources : ETF + immobilier + SCPI\n- Calculer ton taux de couverture : revenus passifs / dépenses totales\n\n💡 **Le vrai objectif** n'est pas d'avoir le plus de revenus passifs possible, mais de créer suffisamment pour couvrir tes dépenses, libérant ainsi ton temps."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Qu'est-ce qu'un revenu passif ?",
          "choices": [
            "Un salaire élevé",
            "Un revenu généré avec peu ou pas de travail actif continu",
            "Un revenu garanti par l'État",
            "Un revenu sans impôts"
          ],
          "correctIndex": 1,
          "explanation": "Un revenu passif est généré sans échange direct de temps contre argent : dividendes, loyers, intérêts. Ton capital travaille pour toi."
        },
        {
          "question": "Quel est le revenu passif le plus accessible pour un débutant ?",
          "choices": [
            "Créer un business automatisé",
            "Acheter de l'immobilier",
            "Les intérêts d'un Livret A ou LEP",
            "Écrire un livre"
          ],
          "correctIndex": 2,
          "explanation": "Le Livret A et LEP génèrent des intérêts immédiatement dès le premier euro. C'est la forme la plus simple et accessible de revenu passif."
        },
        {
          "question": "Sur 500 000€ en ETF à 2% de dividendes/an, quel est le revenu passif annuel ?",
          "choices": [
            "5 000€",
            "10 000€",
            "25 000€",
            "50 000€"
          ],
          "correctIndex": 1,
          "explanation": "500 000€ × 2%/an = 10 000€/an de dividendes, soit 833€/mois. Sans rien vendre, juste en possédant le portefeuille."
        }
      ]
    }
  },
  {
    "id": "module-5-4",
    "zone": 5,
    "title": "Les SCPI : l'immobilier sans contraintes",
    "description": "Investir dans l'immobilier sans gérer de locataires",
    "isPremium": false,
    "levelRequired": 46,
    "xpReward": 60,
    "estimatedDuration": 10,
    "icon": "🏢",
    "orderInZone": 4,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "C'est quoi une SCPI ?",
          "content": "**SCPI** = Société Civile de Placement Immobilier.\n\nTu investis dans une société qui possède et gère un parc immobilier professionnel (bureaux, commerces, hôpitaux, logistique). Tu reçois des loyers proportionnels à ta part.\n\n**Avantages** :\n- Investir dans l'immobilier dès 200-1 000€\n- Pas de gestion locative (aucun locataire à gérer)\n- Diversification géographique et sectorielle\n- Rendement stable : 4-6%/an en moyenne\n\n**Inconvénients** :\n- Illiquidité (revente peut prendre du temps)\n- Frais d'entrée élevés : 8-12% du montant investi\n- Capital non garanti"
        },
        {
          "type": "why",
          "title": "Pourquoi les SCPI sont intéressantes",
          "content": "**SCPI vs immo locatif direct** :\n- Direct : apport élevé, gestion des locataires, une zone géographique\n- SCPI : accessible dès 200€, aucune gestion, 100+ biens dans toute l'Europe\n\n**Rendement historique** :\n- SCPI de rendement : 4-5%/an distribué + 1-2%/an de valorisation\n- Supérieur au Livret A, avec un risque modéré\n\n**Via assurance-vie** :\nAcheter des SCPI dans une assurance-vie réduit les frais d'entrée et optimise la fiscalité.\n\n**Chiffre choc** : 1€ investi en SCPI en 2000 vaut 2,3€ aujourd'hui (capital + loyers réinvestis)."
        },
        {
          "type": "how",
          "title": "Comment investir en SCPI",
          "content": "**Option 1 : Achat en direct**\n- Achète des parts directement auprès de la SCPI\n- Frais : 8-12%\n- Revenu trimestriel\n- Minimum : 1 000-5 000€\n\n**Option 2 : Via assurance-vie**\n- Frais d'entrée réduits : 0-2%\n- Fiscalité de l'assurance-vie (abattement après 8 ans)\n- Moins de SCPI disponibles\n\n**SCPI réputées** :\n- SCPI de rendement élevé : Primonial, Perial, Corum\n- SCPI diversifiées : Immorente, Épargne Pierre\n\n**Conseil** : en assurance-vie pour la fiscalité, en direct pour la diversification."
        },
        {
          "type": "example",
          "title": "Thomas génère 400€/mois de loyers SCPI",
          "content": "**Thomas investit 100 000€ en SCPI**\n\n**Allocation** :\n- 60 000€ en SCPI de rendement (5,2%/an) via AV\n- 40 000€ en SCPI diversifiées (4,5%/an) en direct\n\n**Revenus annuels** :\n- AV : 60 000€ × 5,2% = 3 120€/an (net avant impôts)\n- Direct : 40 000€ × 4,5% = 1 800€/an\n\n**Total** : 4 920€/an = **410€/mois**\n\n**Fiscalité** :\n- SCPI en AV après 8 ans : abattement 4 600€/an\n- La quasi-totalité des revenus est défiscalisée !\n\n**Coût d'entrée** : frais de 8% sur l'investissement direct (3 200€)"
        },
        {
          "type": "action",
          "title": "Intègre les SCPI dans ton portefeuille",
          "content": "🎯 **Pré-requis** :\n- Fonds d'urgence constitué\n- PEA en place pour les actions\n- Horizon > 8 ans (illiquidité)\n\n**Étape 1** : Ouvre une assurance-vie (si pas encore fait)\n\n**Étape 2** : Recherche des SCPI disponibles dans ton contrat AV\nContraintes : Linxea Spirit 2, Lucya Cardif\n\n**Étape 3** : Commence petit (1 000€)\nEvalue la régularité des dividendes avant d'investir plus.\n\n**Étape 4** : Cible 10-20% de ton portefeuille total en SCPI\nComplément des actions et du fonds euros.\n\n💡 Les SCPI ne sont PAS liquides. N'y mets jamais d'argent dont tu pourrais avoir besoin rapidement."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Qu'est-ce qu'une SCPI ?",
          "choices": [
            "Une action immobilière individuelle",
            "Une société qui possède des biens immobiliers et distribue les loyers aux investisseurs",
            "Un crédit immobilier collectif",
            "Un livret d'épargne immobilier"
          ],
          "correctIndex": 1,
          "explanation": "Une SCPI collecte l'argent de nombreux investisseurs pour acheter des biens immobiliers professionnels. Elle distribue les loyers proportionnellement aux parts détenues."
        },
        {
          "question": "Quel est l'avantage principal des SCPI sur l'immobilier direct ?",
          "choices": [
            "Le rendement est plus élevé",
            "Aucune gestion locative et accessible dès quelques centaines d'euros",
            "Les frais sont nuls",
            "Le capital est garanti"
          ],
          "correctIndex": 1,
          "explanation": "Les SCPI permettent d'investir dans l'immobilier sans gérer de locataires, sans gros apport, et avec une diversification sur des centaines de biens."
        },
        {
          "question": "Pourquoi acheter des SCPI via assurance-vie ?",
          "choices": [
            "Pour avoir plus de SCPI disponibles",
            "Pour réduire les frais d'entrée et optimiser la fiscalité",
            "C'est obligatoire",
            "Pour garantir le capital"
          ],
          "correctIndex": 1,
          "explanation": "En assurance-vie, les frais d'entrée des SCPI passent de 8-12% à 0-2%, et la fiscalité après 8 ans est très avantageuse (abattement 4 600€/an)."
        }
      ]
    }
  },
  {
    "id": "module-5-5",
    "zone": 5,
    "title": "Optimiser ses impôts légalement",
    "description": "Les 5 stratégies utilisées par les Français qui paient peu d'impôts",
    "isPremium": false,
    "levelRequired": 47,
    "xpReward": 75,
    "estimatedDuration": 12,
    "icon": "⚖️",
    "orderInZone": 5,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "L'optimisation fiscale légale",
          "content": "**L'optimisation fiscale légale** (ou ingénierie fiscale) consiste à utiliser les dispositifs légaux prévus par l'État pour réduire sa facture fiscale.\n\n**La différence avec la fraude** :\n- **Fraude** : cacher des revenus, faux documents → illégal, passible de prison\n- **Optimisation** : utiliser les niches fiscales prévues par la loi → légal et encouragé\n\n**Les principales niches fiscales en France** :\n- Déductions pour investissement retraite (PER)\n- Réductions d'impôt sur l'investissement locatif\n- Crédits d'impôt (emploi à domicile, garde d'enfants)\n- Exonérations sur l'épargne (PEA, livrets)\n- Déficit foncier"
        },
        {
          "type": "why",
          "title": "Combien peut-on économiser ?",
          "content": "**Exemple : ménage gagnant 80 000€/an**\n\nSans optimisation :\n- Impôt sur le revenu : ~14 000€/an\n\nAvec optimisation :\n1. PER : 10 000€ versés → économie 3 000€ (TMI 30%)\n2. Emploi à domicile 2h/sem : crédit d'impôt 1 200€\n3. Dons associations : réduction 1 000€ → économie 660€ (66%)\n4. Travaux locatif (déficit foncier) : -2 000€ de revenus imposables → économie 600€\n\n**Total économies** : 5 460€/an\n**Impôt final** : 8 540€ au lieu de 14 000€\n\n**Chiffre choc** : les 10% les plus riches utilisent en moyenne 7 niches fiscales différentes. Les autres, 1,2 en moyenne."
        },
        {
          "type": "how",
          "title": "5 stratégies d'optimisation accessibles à tous",
          "content": "**Stratégie 1 : Maximiser le PER**\nDéduction des versements du revenu imposable.\nÉconomie = versement × TMI\n\n**Stratégie 2 : Emploi à domicile**\nCrédit d'impôt de 50% des dépenses (garde d'enfants, ménage, jardinage).\nMax : 3 000€ de crédit/an.\n\n**Stratégie 3 : Dons à des associations agréées**\nRéduction d'impôt de 66% à 75% du montant donné.\n\n**Stratégie 4 : Déficit foncier (immo locatif)**\nLes travaux sur un bien locatif réduisent ton revenu imposable global.\n\n**Stratégie 5 : Utiliser le quotient familial**\nOptimiser sa déclaration avec enfants à charge, frais réels, etc."
        },
        {
          "type": "example",
          "title": "Sophie économise 4 200€ d'impôts",
          "content": "**Sophie, 35 ans, 55 000€/an, TMI 30%**\n\n**Action 1 : PER**\n- Verse 8 000€ dans son PER\n- Économie : 8 000€ × 30% = **2 400€**\n\n**Action 2 : Garde d'enfants (2 enfants)**\n- Dépenses crèche + périscolaire : 4 000€\n- Crédit d'impôt 50% : **2 000€**\n\n**Action 3 : Dons**\n- Don Croix-Rouge : 200€\n- Réduction : 200€ × 66% = **132€** (et 200€ pour une bonne cause)\n\n**Total économies d'impôts** : 4 532€/an\n\n**Rappel** : le PER est \"épargne reportée\", pas perdue. Elle sera disponible à la retraite."
        },
        {
          "type": "action",
          "title": "Identifie tes niches fiscales disponibles",
          "content": "🎯 **Checklist fiscale** :\n\n✅ As-tu un PER ? (Si TMI ≥ 30%, priorité absolue)\n✅ As-tu des enfants en crèche/garde ? (Crédit d'impôt 50%)\n✅ Emploies-tu quelqu'un à domicile ? (Crédit 50%)\n✅ Fais-tu des dons à des associations ? (Réduction 66-75%)\n✅ As-tu un bien locatif avec travaux ? (Déficit foncier)\n✅ As-tu des frais professionnels élevés ? (Frais réels vs déduction forfaitaire)\n\n💡 **Conseil** : consulte un conseiller en gestion de patrimoine (CGP) si ton revenu est > 60 000€. Le coût (200-500€) est souvent récupéré en quelques mois d'optimisation.\n\n⚠️ Déclare honnêtement. L'optimisation est légale, la fraude est criminelle."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Quelle est la différence entre optimisation fiscale et fraude fiscale ?",
          "choices": [
            "Aucune, c'est la même chose",
            "L'optimisation utilise des dispositifs légaux, la fraude cache des revenus",
            "L'optimisation est réservée aux riches",
            "La fraude est autorisée sous un certain seuil"
          ],
          "correctIndex": 1,
          "explanation": "L'optimisation fiscale utilise les niches légalement créées par l'État (PER, crédit d'impôt, etc.). La fraude cache des revenus et est passible de prison."
        },
        {
          "question": "Un PER versé de 5 000€ avec une TMI de 30% génère une économie d'impôt de...",
          "choices": [
            "1 000€",
            "1 500€",
            "2 000€",
            "5 000€"
          ],
          "correctIndex": 1,
          "explanation": "5 000€ × 30% = 1 500€ d'économie d'impôt immédiate. L'argent n'est pas perdu : il est épargné pour la retraite."
        },
        {
          "question": "Quel est le crédit d'impôt pour les dépenses d'emploi à domicile ?",
          "choices": [
            "10%",
            "25%",
            "50%",
            "75%"
          ],
          "correctIndex": 2,
          "explanation": "Les dépenses d'emploi à domicile (ménage, garde d'enfants, jardinage) donnent droit à un crédit d'impôt de 50% des dépenses, dans la limite de 3 000€ de crédit."
        }
      ]
    }
  },
  {
    "id": "module-5-6",
    "zone": 5,
    "title": "Vivre des intérêts de son capital",
    "description": "Comment calculer le moment où ton argent travaille plus que toi",
    "isPremium": false,
    "levelRequired": 48,
    "xpReward": 60,
    "estimatedDuration": 10,
    "icon": "🌊",
    "orderInZone": 6,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "Le point de bascule : ton argent travaille plus que toi",
          "content": "**Le point de bascule** est atteint quand tes revenus de capital (intérêts, dividendes, loyers) dépassent tes dépenses de vie.\n\n**En pratique** :\n- Tes investissements génèrent X€/mois automatiquement\n- Tes dépenses sont de Y€/mois\n- Si X ≥ Y → tu peux arrêter de travailler\n\n**La règle des 4% en action** :\nSi ton capital génère 4% par an et que tes dépenses représentent 4% de ton capital, tu peux vivre indéfiniment sans travailler (les études montrent une durabilité sur 30 ans).\n\n**La psychologie** : beaucoup de gens atteignent ce point mais continuent de travailler — simplement parce qu'ils le choisissent."
        },
        {
          "type": "why",
          "title": "Pourquoi les retraits à 4% sont durables",
          "content": "**La Trinity Study (1998)** a analysé tous les retraits de 4% d'un portefeuille 60% actions / 40% obligations sur 30 ans depuis 1926.\n\n**Résultat** : dans 95% des cas, le capital dure plus de 30 ans.\nDans 75% des cas, le capital AUGMENTE malgré les retraits !\n\n**Pourquoi** :\n- Les marchés génèrent en moyenne 7-10%/an\n- 4% de retrait laisse 3-6% pour la croissance du capital\n- Même pendant les crises, le capital se reconstitue\n\n**Attention** : la règle des 4% suppose un portefeuille bien diversifié. Pas du cash ou des livrets."
        },
        {
          "type": "how",
          "title": "Calculer son chemin vers le point de bascule",
          "content": "**Étape 1** : Calcule tes dépenses annuelles actuelles\nInclus tout : logement, nourriture, transport, loisirs, santé.\n\n**Étape 2** : Projette tes dépenses à la LF\n(souvent moins : pas de transport pro, logement payé...)\n\n**Étape 3** : Calcule ton capital cible\nDépenses annuelles / 0,04 = capital nécessaire\nOu : dépenses annuelles × 25\n\n**Étape 4** : Calcule le temps pour y arriver\nOutil : networthify.com (calculateur FIRE gratuit)\n\n**Étape 5** : Optimise les leviers\n- Augmenter l'épargne mensuelle\n- Réduire les dépenses cibles\n- Augmenter le rendement (mais pas le risque)"
        },
        {
          "type": "example",
          "title": "Julien atteint le point de bascule à 45 ans",
          "content": "**Julien, 32 ans** — commence à planifier sérieusement.\n\n**Données** :\n- Dépenses actuelles : 2 200€/mois\n- Dépenses projetées LF : 1 800€/mois (logement payé)\n- Capital actuel : 35 000€\n- Épargne mensuelle : 700€/mois\n\n**Capital cible** :\n1 800€ × 12 × 25 = **540 000€**\n\n**Projection à 7%/an** :\n- De 35 000€ + 700€/mois → 540 000€\n- Durée : **13 ans** → Julien atteint 45 ans !\n\n**À 45 ans** :\n- Capital : 540 000€\n- Retrait 4% : 21 600€/an = 1 800€/mois\n- Retraite anticipée à 45 ans ✅"
        },
        {
          "type": "action",
          "title": "Calcule ton point de bascule",
          "content": "🎯 **Utilise networthify.com** (gratuit, en anglais) :\n\n**Remplis** :\n- Annual Income (revenus annuels)\n- Annual Spending (dépenses annuelles)\n- Net Worth (patrimoine actuel)\n- Annual Return Rate : 7% (actions long terme)\n\n**Le résultat** : nombre d'années avant d'atteindre la LF.\n\n**Joue avec les variables** :\n- Si j'économise 100€/mois de plus → gain de X mois ?\n- Si je réduis mes dépenses de 200€/mois → gain de X mois ?\n\n💡 La découverte la plus choquante de cet exercice : même un petit effort supplémentaire d'épargne raccourcit considérablement le chemin."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Selon la règle des 4%, quel % de chances a-t-on que son capital dure 30 ans ?",
          "choices": [
            "50%",
            "75%",
            "95%",
            "100%"
          ],
          "correctIndex": 2,
          "explanation": "La Trinity Study montre que dans 95% des cas historiques, un portefeuille avec 4% de retrait annuel dure 30 ans. Dans 75% des cas, il augmente même malgré les retraits !"
        },
        {
          "question": "Quel est le capital nécessaire pour vivre de 1 500€/mois selon la règle des 25 ?",
          "choices": [
            "225 000€",
            "350 000€",
            "450 000€",
            "600 000€"
          ],
          "correctIndex": 2,
          "explanation": "1 500€/mois = 18 000€/an. 18 000€ × 25 = 450 000€."
        },
        {
          "question": "Qu'est-ce que le \"point de bascule\" en liberté financière ?",
          "choices": [
            "Quand on commence à investir",
            "Quand les revenus passifs dépassent les dépenses",
            "Quand on atteint 1 million d'euros",
            "Quand on arrête de travailler"
          ],
          "correctIndex": 1,
          "explanation": "Le point de bascule = revenus passifs (dividendes, loyers, intérêts) ≥ dépenses de vie. À ce point, le travail devient optionnel."
        }
      ]
    }
  },
  {
    "id": "module-5-7",
    "zone": 5,
    "title": "Stratégies FIRE",
    "description": "Les différentes approches pour atteindre la liberté financière",
    "isPremium": false,
    "levelRequired": 49,
    "xpReward": 60,
    "estimatedDuration": 10,
    "icon": "🔥",
    "orderInZone": 7,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "Les différents types de FIRE",
          "content": "**FIRE** (Financial Independence, Retire Early) englobe plusieurs approches :\n\n**LeanFIRE** : vie très frugale, capital cible bas\n- Dépenses < 1 500€/mois\n- Capital cible : < 450 000€\n- Atteint plus vite mais mode de vie minimaliste\n\n**FatFIRE** : vie confortable sans restrictions\n- Dépenses > 4 000€/mois\n- Capital cible : > 1 200 000€\n- Prend plus longtemps mais aucun compromis\n\n**BaristaFIRE** : mi-temps ou job passion\n- Capital partiel + petits revenus d'activité\n- Compromis entre rapidité et confort\n\n**CoastFIRE** : tu as assez investi pour \"coaster\" jusqu'à la retraite"
        },
        {
          "type": "why",
          "title": "Quelle approche choisir ?",
          "content": "**Le piège du LeanFIRE** :\n- Se priver trop tôt → burnout ou abandon\n- Risque d'un changement de style de vie non voulu à 60 ans\n\n**Le piège du FatFIRE** :\n- Horizon trop lointain → découragement\n- \"Un jour je le ferai\" mais jamais maintenant\n\n**Le juste milieu : BaristaFIRE ou \"Coast\"** :\n- Atteindre la semi-indépendance à 40-45 ans\n- Travailler mi-temps ou dans un domaine passion\n- Capital croît encore sans nouveaux versements\n\n**La vraie question** : quel style de vie te rend heureux MAINTENANT et dans 20 ans ?"
        },
        {
          "type": "how",
          "title": "Construire ton plan FIRE personnel",
          "content": "**Étape 1** : Définis ton style de vie cible\nPas le lifestyle actuel — le lifestyle dans 20 ans si tout se passe bien.\n\n**Étape 2** : Estime tes dépenses cibles\nAvec résidence payée, sans transport professionnel, avec santé.\n\n**Étape 3** : Calcule ton capital cible\nDépenses annuelles × 25 = capital nécessaire.\n\n**Étape 4** : Calcule ton chemin\nCapital actuel + épargne mensuelle → temps pour atteindre la cible.\n\n**Étape 5** : Choisis ton type de FIRE\nLeanFIRE, BaristaFIRE, FatFIRE selon ta personnalité et tes valeurs.\n\n**Étape 6** : Commence maintenant, affine en route"
        },
        {
          "type": "example",
          "title": "Trois parcours différents",
          "content": "**Alice (LeanFIRE)** :\n- 28 ans, 3 500€ nets/mois, épargne 60%\n- Dépenses cibles LF : 1 200€/mois → capital : 360 000€\n- Atteint à **38 ans** grâce à l'épargne intense\n- Mode de vie : minimaliste, van life, pays moins chers\n\n**Bob (FatFIRE)** :\n- 35 ans, 8 000€ nets/mois, épargne 40%\n- Dépenses cibles LF : 5 000€/mois → capital : 1 500 000€\n- Atteint à **52 ans**\n- Mode de vie : voyages, restaurants, pas de compromis\n\n**Clara (BaristaFIRE)** :\n- 30 ans, 4 000€ nets/mois, épargne 35%\n- Dépenses LF : 2 500€/mois → capital : 750 000€ MAIS\n- À 42 ans avec 400 000€, passe au mi-temps passion\n- Capital couvre 60% des dépenses, mi-temps le reste"
        },
        {
          "type": "action",
          "title": "Identifie ton type FIRE",
          "content": "🎯 **Questions pour trouver ton type** :\n\n**LeanFIRE te correspond si** :\n- Tu es minimaliste dans l'âme\n- Les voyages / aventures t'attirent plus que le confort\n- Tu peux réduire tes dépenses sans souffrir\n\n**FatFIRE te correspond si** :\n- Le confort et les bonnes expériences sont importants\n- Tu as un revenu élevé et peux épargner beaucoup\n- Tu acceptes d'attendre plus longtemps\n\n**BaristaFIRE te correspond si** :\n- Tu veux un équilibre entre rapidité et confort\n- Il y a des activités que tu ferais même sans être payé\n- Le mi-temps te convient\n\n💡 Aucun type n'est supérieur. Celui qui te convient est le meilleur."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Qu'est-ce que le \"CoastFIRE\" ?",
          "choices": [
            "Vivre sur la côte",
            "Avoir suffisamment investi pour que les intérêts composés atteignent seuls l'objectif",
            "Partir à la retraite en bord de mer",
            "Investir uniquement en immobilier côtier"
          ],
          "correctIndex": 1,
          "explanation": "CoastFIRE = avoir investi suffisamment tôt pour que les intérêts composés atteignent ton capital cible sans nouveaux versements. Tu travailles pour tes dépenses courantes, pas pour la retraite."
        },
        {
          "question": "Quelle est la différence principale entre LeanFIRE et FatFIRE ?",
          "choices": [
            "LeanFIRE = plus rapide mais style de vie frugal, FatFIRE = plus long mais vie confortable",
            "LeanFIRE est réservé aux jeunes",
            "FatFIRE utilise plus d'investissements risqués",
            "Il n'y a pas de vraie différence"
          ],
          "correctIndex": 0,
          "explanation": "LeanFIRE = dépenses réduites → capital cible bas → atteint plus vite. FatFIRE = pas de compromis sur le style de vie → capital élevé → prend plus de temps."
        },
        {
          "question": "Quel type de FIRE est recommandé si on veut un équilibre entre rapidité et confort ?",
          "choices": [
            "LeanFIRE",
            "FatFIRE",
            "BaristaFIRE",
            "Aucun des trois"
          ],
          "correctIndex": 2,
          "explanation": "BaristaFIRE = atteindre une semi-indépendance avec capital partiel + petits revenus d'activité passion. Bon équilibre entre rapidité et qualité de vie."
        }
      ]
    }
  },
  {
    "id": "module-5-8",
    "zone": 5,
    "title": "Gérer un grand patrimoine",
    "description": "Ce qui change quand ton patrimoine dépasse les 100 000€",
    "isPremium": false,
    "levelRequired": 50,
    "xpReward": 75,
    "estimatedDuration": 12,
    "icon": "🏰",
    "orderInZone": 8,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "Les nouvelles problématiques à partir de 100K€",
          "content": "**Quand ton patrimoine grossit**, de nouvelles questions émergent :\n\n**Questions fiscales** :\n- Impôt sur la fortune immobilière (IFI) : > 1,3M€ de patrimoine immobilier\n- Optimisation de la flat tax\n- Transmission du patrimoine\n\n**Questions de gestion** :\n- Rééquilibrage régulier du portefeuille\n- Concentration des risques (si > 20% dans une seule valeur)\n- Gestion de la psychologie (peur de perdre \"beaucoup\")\n\n**Questions d'organisation** :\n- Choix des enveloppes fiscales optimales\n- Planification successorale\n- Conseil d'un professionnel (CGP)"
        },
        {
          "type": "why",
          "title": "Pourquoi la complexité augmente avec la richesse",
          "content": "**À 10 000€** : Livret A, simple, peu de frais, pas de question fiscale.\n\n**À 100 000€** :\n- Quelle répartition entre PEA / AV / PER / immo ?\n- Comment minimiser les impôts sur les plus-values ?\n- Faut-il un CGP ?\n\n**À 300 000€** :\n- Planification de la transmission (assurance-vie + donation)\n- Stratégie de retrait optimale\n\n**À 1 000 000€+** :\n- Société holding ?\n- Donation de son vivant ?\n- Optimisation IFI ?\n\n**Conclusion** : les stratégies évoluent avec le patrimoine. Ce qui est optimal à 10 000€ ne l'est pas forcément à 500 000€."
        },
        {
          "type": "how",
          "title": "Les bonnes pratiques pour un grand patrimoine",
          "content": "**Règle 1** : Diversification maximale\n- Pas plus de 10-15% dans un seul actif\n- Diversification géographique, sectorielle, en devises\n\n**Règle 2** : Rééquilibrage annuel\n- Si actions ont trop monté → vendre une partie, rééquilibrer\n\n**Règle 3** : Planification successorale\n- Assurance-vie : 152 500€ exonérés par bénéficiaire\n- Donation de son vivant : 100 000€ par enfant tous les 15 ans\n\n**Règle 4** : Conseiller en Gestion de Patrimoine (CGP)\n- À partir de 100-200K€, un CGP indépendant vaut son coût\n\n**Règle 5** : Psychologie\n- Un patrimoine de 500K€ peut baisser de -30% → garder la tête froide"
        },
        {
          "type": "example",
          "title": "Stratégie de Sylvie, patrimoine 400K€",
          "content": "**Sylvie, 52 ans, patrimoine total 400 000€**\n\n**Répartition** :\n- PEA : 120 000€ en ETF World (30%)\n- Assurance-vie (Linxea) : 150 000€ (37,5%)\n  → 60% fonds euros + 40% ETF + SCPI\n- Immobilier locatif : 80 000€ net (valeur vénale - crédit restant) (20%)\n- PER : 30 000€ (7,5%)\n- Livrets (urgence + projets) : 20 000€ (5%)\n\n**Revenus passifs** :\n- Dividendes PEA : 180€/mois\n- Loyers nets : 350€/mois\n- Total : 530€/mois\n\n**Objectif** : atteindre 1 500€/mois de passif dans 8 ans (LF à 60 ans)"
        },
        {
          "type": "action",
          "title": "Évalue tes besoins de conseil",
          "content": "🎯 **Checklist selon ton patrimoine** :\n\n**< 50 000€** :\n- Tu peux gérer seul avec les bases de NoBroke\n- PEA + AV + livrets suffisent\n\n**50 000 - 200 000€** :\n- Considère un bilan patrimonial (1 séance avec un CGP)\n- Optimisation des enveloppes, fiscalité\n\n**> 200 000€** :\n- CGP indépendant recommandé\n- Planification successorale\n- Stratégie de transmission\n\n💡 **Comment trouver un bon CGP** :\n- Inscription ORIAS obligatoire\n- Mode de rémunération transparent (honoraires ou commissions)\n- Évite les CGP liés à un seul établissement (conflit d'intérêt)\n- Recommandation d'un ami de confiance ou notaire"
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "À partir de quel patrimoine immobilier s'applique l'IFI ?",
          "choices": [
            "500 000€",
            "800 000€",
            "1 300 000€",
            "Il n'existe pas en France"
          ],
          "correctIndex": 2,
          "explanation": "L'IFI (Impôt sur la Fortune Immobilière) s'applique quand ton patrimoine immobilier net dépasse 1 300 000€. Seul l'immobilier est concerné, pas les actions."
        },
        {
          "question": "Combien peut-on transmettre à un enfant via donation tous les 15 ans sans droits ?",
          "choices": [
            "50 000€",
            "100 000€",
            "200 000€",
            "500 000€"
          ],
          "correctIndex": 1,
          "explanation": "L'abattement de donation entre parent et enfant est de 100 000€ tous les 15 ans, sans droits de donation. Un outil puissant de transmission progressive."
        },
        {
          "question": "Qu'est-ce qu'un CGP indépendant ?",
          "choices": [
            "Un conseiller bancaire",
            "Un Conseiller en Gestion de Patrimoine non rattaché à un seul établissement",
            "Un expert-comptable",
            "Un agent immobilier"
          ],
          "correctIndex": 1,
          "explanation": "Un CGP indépendant n'est pas lié à une banque ou assurance. Il conseille objectivement selon tes intérêts, même si sa rémunération par commissions doit être déclarée."
        }
      ]
    }
  },
  {
    "id": "module-5-9",
    "zone": 5,
    "title": "Transmettre son patrimoine",
    "description": "Protéger sa famille et optimiser la transmission de sa richesse",
    "isPremium": true,
    "levelRequired": 51,
    "xpReward": 75,
    "estimatedDuration": 12,
    "icon": "🤲",
    "orderInZone": 9,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "Les outils de transmission du patrimoine",
          "content": "**La transmission de patrimoine** permet de transférer sa richesse à ses proches, de son vivant ou au décès, en minimisant les droits de succession.\n\n**Outils principaux** :\n- **Assurance-vie** : 152 500€ par bénéficiaire exonérés hors succession\n- **Donation** : 100 000€ par parent par enfant tous les 15 ans sans droits\n- **Donation-partage** : organise la succession à l'avance\n- **SCI** (Société Civile Immobilière) : pour transmettre de l'immobilier\n- **Testament** : désigne les bénéficiaires\n\n**Sans planification** : droits de succession jusqu'à 45% pour les montants élevés !"
        },
        {
          "type": "why",
          "title": "Pourquoi planifier tôt sa succession",
          "content": "**Sans planification (exemple)** :\n- Tu décèdes avec 500 000€ de patrimoine\n- Ton enfant reçoit 500 000€ - abattement 100 000€ = 400 000€ imposables\n- Droits de succession : ~45 000€\n\n**Avec planification** :\n- 300 000€ en assurance-vie → transmis hors succession (152 500€ exonérés × 2 bénéficiaires)\n- 100 000€ donné de ton vivant → exonéré\n- 100 000€ restants → abattement légal → 0€ de droits\n\n**Résultat** : ton enfant reçoit 500 000€ au lieu de 455 000€.\n**Chiffre choc** : 50 000€ économisés grâce à une simple planification."
        },
        {
          "type": "how",
          "title": "Stratégie de transmission en 5 étapes",
          "content": "**Étape 1** : Désigner des bénéficiaires sur ton assurance-vie\nMet à jour la clause bénéficiaire. Nomme précisément : \"Mon enfant Prénom NOM né le XX/XX/XXXX\".\n\n**Étape 2** : Utilise le plafond de donation régulièrement\n100 000€ / enfant / 15 ans. Commence tôt.\n\n**Étape 3** : Maximise l'assurance-vie\nPour la transmission : 152 500€ × nombre de bénéficiaires exonérés.\n\n**Étape 4** : Anticipe les grosses successions\nAvec un notaire ou CGP pour les patrimoines > 500 000€.\n\n**Étape 5** : Rédige un testament\nMême sans planification complexe, avoir un testament évite les conflits."
        },
        {
          "type": "example",
          "title": "Famille Dupont : transmission optimisée",
          "content": "**Parents Dupont, 65 ans, 800 000€ de patrimoine**\n- 2 enfants : Marie et Paul\n\n**Sans planification** :\n- Droits de succession estimés : 90 000€\n\n**Avec planification mise en place** :\n- Assurance-vie : 300 000€ (150 000€ par enfant, en-deçà de l'exonération) → 0€ de droits\n- Donations de leur vivant : 200 000€ (100K€ × 2 enfants) → 0€ de droits\n- Restant en succession : 300 000€\n  → Abattement 100K€ chacun → 100 000€ imposables\n  → Droits : ~8 000€ par enfant = 16 000€ total\n\n**Économie** : 74 000€ de droits économisés !"
        },
        {
          "type": "action",
          "title": "Prépare ta transmission dès aujourd'hui",
          "content": "🎯 **Actions immédiates** :\n\n**Cette semaine** :\n- Vérifie et met à jour la clause bénéficiaire de ton assurance-vie\n- Si tu n'as pas d'AV → ouvre-en une pour la transmission (même 100€)\n\n**Cette année** :\n- Si enfants/parents : calcule si une donation est pertinente\n- Écris un testament (notaire : 100-200€, indispensable > 50 000€)\n\n**Si patrimoine > 200 000€** :\n- Consultation notaire pour planification successorale\n- CGP pour optimisation globale\n\n💡 **Rappel** : la transmission n'est pas que pour les riches. Même 50 000€ à un enfant peut changer sa vie. Et 5 minutes pour mettre à jour la clause bénéficiaire vaut des dizaines de milliers d'euros."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Combien peut-on transmettre via assurance-vie par bénéficiaire sans droits de succession ?",
          "choices": [
            "50 000€",
            "100 000€",
            "152 500€",
            "300 000€"
          ],
          "correctIndex": 2,
          "explanation": "L'assurance-vie permet de transmettre jusqu'à 152 500€ par bénéficiaire hors succession, donc sans droits de succession. C'est un outil de transmission majeur."
        },
        {
          "question": "Quel est l'abattement de donation entre parent et enfant tous les 15 ans ?",
          "choices": [
            "50 000€",
            "100 000€",
            "200 000€",
            "300 000€"
          ],
          "correctIndex": 1,
          "explanation": "L'abattement de donation entre parent et enfant est de 100 000€ tous les 15 ans. Deux parents peuvent donc donner 200 000€ à chaque enfant sans droits sur cette période."
        },
        {
          "question": "Pourquoi mettre à jour la clause bénéficiaire d'une assurance-vie est crucial ?",
          "choices": [
            "Pour payer moins de frais",
            "Pour s'assurer que le bon bénéficiaire reçoit les fonds hors succession",
            "C'est obligatoire chaque année",
            "Pour améliorer le rendement"
          ],
          "correctIndex": 1,
          "explanation": "La clause bénéficiaire détermine qui reçoit les fonds de l'AV hors succession. Sans mise à jour, l'ex-conjoint ou une personne décédée peut être désigné, créant des situations complexes."
        }
      ]
    }
  },
  {
    "id": "module-5-10",
    "zone": 5,
    "title": "Le mindset de l'abondance",
    "description": "La psychologie des gens riches et comment adopter leur façon de penser",
    "isPremium": true,
    "levelRequired": 52,
    "xpReward": 60,
    "estimatedDuration": 10,
    "icon": "🧠",
    "orderInZone": 10,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "Mindset de rareté vs mindset d'abondance",
          "content": "**Mindset de rareté** (pauvreté) :\n- \"L'argent est rare, je ne peux pas me permettre ça\"\n- \"Il faut dépenser maintenant car on ne sait pas demain\"\n- \"Je ne suis pas fait pour être riche\"\n- \"Les riches ont eu de la chance, pas moi\"\n- Résultat : l'argent file entre les doigts\n\n**Mindset d'abondance** (richesse) :\n- \"L'argent est un outil que je contrôle\"\n- \"Chaque euro épargné est un pas vers la liberté\"\n- \"Je peux apprendre tout ce dont j'ai besoin\"\n- \"Ma situation peut s'améliorer avec les bonnes actions\"\n- Résultat : les décisions financières sont meilleures"
        },
        {
          "type": "why",
          "title": "Pourquoi la psychologie est la clé",
          "content": "**Étude de Stanford sur l'autocontrôle** :\nLes enfants capables de résister à une guimauve (test du marshmallow) ont eu de meilleurs résultats financiers à l'âge adulte. La discipline et la gratification différée sont des compétences.\n\n**Les croyances limitantes sur l'argent** :\n- \"L'argent corrompt les gens\" → l'argent amplifie ce qu'on est\n- \"Je ne mérite pas d'être riche\" → pourquoi pas ?\n- \"C'est trop compliqué\" → tu as appris à conduire, non ?\n\n**Chiffre choc** : selon des études sur les gagnants de loterie, 70% ont perdu leur gain en moins de 7 ans. La richesse sans le mindset adéquat s'évapore."
        },
        {
          "type": "how",
          "title": "5 habitudes pour développer un mindset d'abondance",
          "content": "**Habitude 1** : Traite ton futur toi comme une personne réelle\n\"Pay yourself first\" — ton futur toi mérite d'être payé en premier.\n\n**Habitude 2** : Éduque-toi financièrement continuellement\nLis 1 livre de finances par mois. Les riches lisent en moyenne 4,4 livres/mois.\n\n**Habitude 3** : Entourage-toi de gens avec de bonnes habitudes financières\n\"Tu es la moyenne des 5 personnes avec qui tu passes le plus de temps.\"\n\n**Habitude 4** : Fixe des objectifs financiers écrits\nLes objectifs écrits ont 42% plus de chances d'être atteints.\n\n**Habitude 5** : Célèbre les petites victoires\nChaque 1 000€ d'épargne, chaque dette remboursée mérite d'être célébré."
        },
        {
          "type": "example",
          "title": "La transformation de Marc",
          "content": "**Marc, 30 ans** — avant NoBroke :\n- Pensait \"je suis nul avec l'argent\"\n- Évitait de regarder ses relevés bancaires\n- Dépensait pour \"se faire plaisir tout de suite\"\n- Aucune épargne, découvert chronique\n\n**12 mois plus tard** :\n- A fait l'audit de ses dépenses → trouve 250€/mois de gaspillage\n- A remboursé son crédit revolving de 2 000€\n- Épargne 300€/mois automatiquement\n- Lit 1 livre de finances par mois\n- Patrimoine : 4 200€ (dont 3 000€ PEA)\n\n**Ce qui a changé** :\nPas son salaire (toujours 2 200€). Sa façon de penser et ses habitudes."
        },
        {
          "type": "action",
          "title": "Développe ton mindset financier",
          "content": "🎯 **7 jours de transformation mentale** :\n\n**Jour 1** : Identifie 3 croyances limitantes sur l'argent que tu as\n**Jour 2** : Écris tes 3 objectifs financiers à 5 ans\n**Jour 3** : Calcule ta valeur nette actuelle (actif - passif)\n**Jour 4** : Identifie 1 personne dans ton entourage avec de bonnes habitudes financières\n**Jour 5** : Commande/emprunte 1 livre de finances (ex: \"L'Homme le Plus Riche de Babylone\")\n**Jour 6** : Automatise 1 virement d'épargne\n**Jour 7** : Célèbre une petite victoire financière récente\n\n💡 Le mindset change avec la pratique, pas avec la lecture seule. L'action est la clé."
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Quelle est la principale différence entre le mindset de rareté et d'abondance ?",
          "choices": [
            "Le montant des revenus",
            "La façon de percevoir l'argent et les opportunités",
            "L'âge",
            "Le niveau d'éducation"
          ],
          "correctIndex": 1,
          "explanation": "Le mindset de rareté perçoit l'argent comme limité et stressant. Le mindset d'abondance le voit comme un outil contrôlable. La même situation financière peut être vécue très différemment."
        },
        {
          "question": "Pourquoi 70% des gagnants de loterie perdent leur gain en 7 ans ?",
          "choices": [
            "Ils investissent mal",
            "Ils manquent du mindset et des habitudes pour gérer la richesse",
            "L'État leur reprend",
            "C'est une légende urbaine"
          ],
          "correctIndex": 1,
          "explanation": "La richesse sans les habitudes et la psychologie adéquates s'évapore. Le mindset doit être développé indépendamment du montant d'argent."
        },
        {
          "question": "Quelle habitude des riches est la plus documentée ?",
          "choices": [
            "Travailler 80h par semaine",
            "Lire régulièrement (en moyenne 4,4 livres/mois)",
            "Ne jamais dépenser",
            "Tout investir en immobilier"
          ],
          "correctIndex": 1,
          "explanation": "Les études sur les habitudes des millionnaires montrent une corrélation forte avec la lecture régulière. La majorité lisent 4,4 livres par mois, souvent des livres d'éducation financière."
        }
      ]
    }
  },
  {
    "id": "module-5-11",
    "zone": 5,
    "title": "Ta feuille de route vers la liberté",
    "description": "Le plan personnalisé pour atteindre ton indépendance financière",
    "isPremium": true,
    "levelRequired": 53,
    "xpReward": 100,
    "estimatedDuration": 15,
    "icon": "🚀",
    "orderInZone": 11,
    "content": {
      "slides": [
        {
          "type": "definition",
          "title": "Ce que tu as appris dans NoBroke",
          "content": "**Tu as parcouru 5 zones de la liberté financière** :\n\n**Zone 1 - Budget** : maîtriser ses dépenses, créer son budget, éliminer les gaspillages.\n\n**Zone 2 - Épargne** : fonds d'urgence, livrets réglementés, intérêts composés, épargne automatique.\n\n**Zone 3 - Dette** : TAEG, stratégies de remboursement, crédits intelligents, sortir du rouge.\n\n**Zone 4 - Investissement** : PEA, ETF, DCA, immobilier locatif, diversification.\n\n**Zone 5 - Liberté Financière** : règle des 4%, revenus passifs, stratégies FIRE, succession.\n\n**Tu n'es plus le même qu'au départ.** Tu as les connaissances. Il reste l'action."
        },
        {
          "type": "why",
          "title": "Pourquoi la plupart ne passent jamais à l'action",
          "content": "**Les 5 freins les plus courants** :\n1. \"Je n'ai pas assez d'argent pour commencer\"\n   → Faux : 50€/mois investi pendant 30 ans = 62 000€ à 7%\n\n2. \"C'est trop risqué\"\n   → Le vrai risque : ne pas investir et perdre face à l'inflation\n\n3. \"Je le ferai quand je serai plus riche\"\n   → \"Un jour\" ne vient jamais. Chaque année coûte 14 ans de retraite\n\n4. \"C'est trop compliqué\"\n   → Un ETF World dans un PEA, 100€/mois. C'est tout au début.\n\n5. \"J'ai peur de me tromper\"\n   → L'erreur la plus coûteuse est l'inaction.\n\n**Chiffre choc** : attendre 5 ans pour commencer à investir à 30 ans coûte 3x plus que les 5 ans investis à 25 ans."
        },
        {
          "type": "how",
          "title": "Ta feuille de route personnalisée",
          "content": "**Les 7 étapes universelles de la liberté financière** :\n\n**1. Budget** : suivi mensuel en place, taux d'épargne > 20%\n**2. Fonds d'urgence** : 3-6 mois de dépenses sur Livret A\n**3. Dettes** : remboursement des dettes > 5% (méthode avalanche)\n**4. Livrets** : Livret A + LEP maximisés\n**5. PEA** : ouvert, 100-200€/mois en ETF World\n**6. Assurance-vie** : ouverte, horizon > 8 ans\n**7. Objectif LF** : capital cible calculé, date projetée\n\n**Règle** : termine chaque étape avant de passer à la suivante.\n**Méthode** : une action par semaine. Pas tout en même temps."
        },
        {
          "type": "example",
          "title": "La transformation complète de Léa",
          "content": "**Léa, 26 ans** — au début de NoBroke :\n- 0€ d'épargne\n- 2 500€ de crédit revolving à 18%\n- Découvert chronique\n\n**Étape 1 (Mois 1-3)** :\n- Budget maîtrisé, -200€/mois de gaspillage\n- Découvert résolu\n\n**Étape 2-3 (Mois 3-9)** :\n- Crédit revolving remboursé avec économies\n- Fonds d'urgence : 3 000€ sur Livret A\n\n**Étape 4-5 (Mois 9-18)** :\n- LEP ouvert à 5 000€\n- PEA ouvert, 150€/mois en ETF World\n\n**Léa à 28 ans (2 ans plus tard)** :\n- 0€ de dettes\n- 10 000€ d'épargne de précaution\n- PEA : 4 000€\n- Taux d'épargne : 25%\n- **Date liberté financière estimée** : 52 ans ✅"
        },
        {
          "type": "action",
          "title": "Ton plan d'action pour les 90 prochains jours",
          "content": "🎯 **À faire dans les 90 jours** :\n\n**Semaine 1** : Fais ton bilan (actif - passif, taux d'épargne)\n**Semaine 2** : Audite tes abonnements et dépenses\n**Semaine 3** : Mets en place le budget mensuel\n**Semaine 4** : Ouvre/alimente le Livret A (fonds urgence)\n\n**Mois 2** : Remboursement accéléré des dettes à taux élevé\n**Mois 3** : Ouvre ton PEA + premier achat ETF World\n\n**Ton mantra pour la suite** :\n\"Je prends soin de mon futur moi. Chaque euro épargné aujourd'hui est une heure de liberté demain.\"\n\n**Félicitations** : tu as terminé les 5 zones de NoBroke.\nTu as maintenant les armes pour construire ta liberté financière.\nLa suite dépend de toi. 🚀"
        }
      ]
    },
    "quiz": {
      "questions": [
        {
          "question": "Quelle est la première étape universelle de la liberté financière ?",
          "choices": [
            "Investir en bourse",
            "Maîtriser son budget et créer un taux d'épargne > 20%",
            "Acheter de l'immobilier",
            "Ouvrir un PEA"
          ],
          "correctIndex": 1,
          "explanation": "La fondation de tout est le budget maîtrisé avec un taux d'épargne positif. Sans épargne mensuelle régulière, aucune autre étape n'est possible."
        },
        {
          "question": "Combien coûte financièrement d'attendre 5 ans de plus pour commencer à investir ?",
          "choices": [
            "Rien, ça n'a pas d'impact",
            "On récupère facilement le temps perdu",
            "3x plus d'effort pour le même résultat",
            "Seulement quelques milliers d'euros"
          ],
          "correctIndex": 2,
          "explanation": "Grâce aux intérêts composés, 5 ans investis à 25 ans créent plus de richesse que 5 ans investis à 30 ans. Attendre coûte environ 3x plus d'effort pour compenser."
        },
        {
          "question": "Quelle est l'erreur la plus coûteuse en matière d'investissement ?",
          "choices": [
            "Investir dans les mauvais actifs",
            "Payer trop d'impôts",
            "L'inaction — ne pas commencer",
            "Investir trop en actions"
          ],
          "correctIndex": 2,
          "explanation": "L'inaction est l'erreur la plus coûteuse. Chaque année de retard représente des dizaines de milliers d'euros perdus sur le long terme grâce aux intérêts composés."
        }
      ]
    }
  }
];
