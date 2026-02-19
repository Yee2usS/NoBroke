# 🎯 CONFIGURATION BIMI - NOBROKE

## ✅ Fichiers créés

1. **`logo-bimi.svg`** : Logo optimisé au format BIMI (SVG Tiny PS)
2. **`BIMI_SETUP.md`** : Guide complet d'installation

---

## 📝 ENREGISTREMENTS DNS À AJOUTER

Va dans ton **registrar de domaine** (ex: OVH, Gandi, Cloudflare, etc.) et ajoute ces **3 enregistrements DNS** :

### 1️⃣ DMARC (Requis pour BIMI)

```
Type: TXT
Nom: _dmarc.nobroke.app
Valeur: v=DMARC1; p=quarantine; rua=mailto:contact@nobroke.app; pct=100; adkim=s; aspf=s
TTL: 3600
```

### 2️⃣ BIMI (Affichage du logo)

```
Type: TXT
Nom: default._bimi.nobroke.app
Valeur: v=BIMI1; l=https://nobroke.app/logo-bimi.svg;
TTL: 3600
```

### 3️⃣ MX (Réception emails - Déjà configuré ✅)

```
Type: MX
Nom: @
Valeur: inbound-smtp.eu-west-1.amazonaws.com
Priorité: 10
TTL: 60
```

---

## 🚀 ÉTAPES SUIVANTES

### 1. Vérifie que le logo est accessible

Ouvre cette URL dans ton navigateur :
👉 **https://nobroke.app/logo-bimi.svg**

✅ Le logo devrait s'afficher !

### 2. Ajoute les enregistrements DNS

Va dans ton **registrar** et ajoute les 2 enregistrements ci-dessus (DMARC + BIMI).

### 3. Attends la propagation DNS

⏳ **30 minutes à 2 heures** pour que les DNS se propagent.

### 4. Vérifie la configuration

Utilise cet outil :
👉 **https://mxtoolbox.com/bimi.aspx**

Entre `nobroke.app` et vérifie que tout est ✅ vert.

### 5. Teste avec Gmail

1. Inscris-toi sur ta waitlist avec une adresse **Gmail**
2. Attends **24-48h** que Gmail valide BIMI
3. Ton logo devrait apparaître à côté de l'email ! 🎉

---

## 📊 RÉSULTAT ATTENDU

Dans Gmail, tes emails ressembleront à ça :

```
┌─────────────────────────────────────┐
│ [LOGO]  NoBroke                     │
│         contact@nobroke.app         │
│                                     │
│ 🎉 Bienvenue sur NoBroke !          │
│                                     │
│ Merci de rejoindre l'aventure...    │
└─────────────────────────────────────┘
```

**[LOGO]** = Ton logo NoBroke en rond, à côté du nom de l'expéditeur !

---

## ⚠️ IMPORTANT

- **BIMI prend 24-48h** pour être validé par Gmail après la config DNS
- **Sans VMC** (~1000€/an), le logo s'affiche mais **sans badge vérifié ✓**
- **Avec VMC**, tu as le badge bleu vérifié (recommandé plus tard quand tu as du volume)

---

## 🔗 LIENS UTILES

- Guide complet : `BIMI_SETUP.md`
- Vérifier BIMI : https://mxtoolbox.com/bimi.aspx
- BIMI Group : https://bimigroup.org
- Logo déployé : https://nobroke.app/logo-bimi.svg

---

**Bon courage ! Si tu as besoin d'aide, ouvre `BIMI_SETUP.md` pour le guide détaillé ! 🚀**
