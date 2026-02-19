# 🎨 Configuration BIMI pour NoBroke

## Qu'est-ce que BIMI ?

**BIMI** (Brand Indicators for Message Identification) permet d'afficher ton logo vérifié dans les clients email (Gmail, Yahoo, Fastmail, etc.) à côté de tes emails.

---

## ✅ Prérequis

Avant de configurer BIMI, assure-toi que :

1. ✅ **SPF** est configuré (déjà fait via Resend)
2. ✅ **DKIM** est configuré (déjà fait via Resend)  
3. ✅ **DMARC** est configuré avec `p=quarantine` ou `p=reject` (voir ci-dessous)

---

## 🔧 Étape 1 : Configurer DMARC (si pas déjà fait)

BIMI **nécessite** une politique DMARC stricte.

### Ajoute cet enregistrement DNS dans ton registrar :

```
Type: TXT
Name: _dmarc.nobroke.app
Value: v=DMARC1; p=quarantine; rua=mailto:contact@nobroke.app; pct=100; adkim=s; aspf=s
TTL: 3600
```

**Explication** :
- `p=quarantine` : Les emails non authentifiés vont en spam (minimum requis pour BIMI)
- `rua=mailto:contact@nobroke.app` : Rapports DMARC envoyés à cette adresse
- `adkim=s; aspf=s` : Mode strict pour SPF et DKIM

---

## 🎨 Étape 2 : Héberger le logo BIMI

### Déploie le logo sur nobroke.app

Le fichier `logo-bimi.svg` est déjà créé dans `landing/`.

**Déploie-le sur Vercel** :

```bash
cd landing
npx vercel --prod --yes
```

✅ Vérifie que le logo est accessible : **https://nobroke.app/logo-bimi.svg**

---

## 📝 Étape 3 : Ajouter l'enregistrement DNS BIMI

Dans les DNS de **nobroke.app** (chez ton registrar), ajoute :

```
Type: TXT
Name: default._bimi.nobroke.app
Value: v=BIMI1; l=https://nobroke.app/logo-bimi.svg;
TTL: 3600
```

**Note** : Si tu utilises un sous-domaine pour l'envoi (ex: `mail.nobroke.app`), remplace par :
```
Name: default._bimi.mail.nobroke.app
```

---

## ✅ Étape 4 : Vérifier la configuration

### 1. Vérifie les enregistrements DNS

Utilise ces outils :

- **MXToolbox BIMI** : https://mxtoolbox.com/bimi.aspx
  - Entre `nobroke.app`
  - Vérifie que BIMI, SPF, DKIM, DMARC sont valides ✅

- **BIMI Inspector** : https://bimigroup.org/bimi-generator/
  - Entre `contact@nobroke.app`
  - Vérifie que le logo s'affiche

### 2. Envoie un email de test

1. Inscris-toi sur ta waitlist avec une adresse **Gmail**
2. Attends 24-48h que Gmail valide BIMI
3. Le logo devrait apparaître à côté de l'email ! 🎉

---

## 📋 Récapitulatif des enregistrements DNS

Voici les **3 enregistrements DNS** à ajouter :

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | `_dmarc.nobroke.app` | `v=DMARC1; p=quarantine; rua=mailto:contact@nobroke.app; pct=100; adkim=s; aspf=s` | 3600 |
| TXT | `default._bimi.nobroke.app` | `v=BIMI1; l=https://nobroke.app/logo-bimi.svg;` | 3600 |
| MX | `nobroke.app` | `inbound-smtp.eu-west-1.amazonaws.com` (déjà configuré) | 60 |

---

## 🎯 VMC (Optionnel - Pour le badge vérifié)

Pour avoir le **badge bleu "vérifié"** Gmail, tu dois acheter un **VMC** (Verified Mark Certificate) :

- **Prix** : ~1000-1500€/an
- **Fournisseurs** : DigiCert, Entrust, Sectigo
- **Nécessaire ?** Non pour commencer. BIMI fonctionne sans VMC, mais sans le badge bleu.

**Attends d'avoir un volume d'emails important avant d'investir dans un VMC !**

---

## 🐛 Dépannage

### Le logo ne s'affiche pas ?

1. **Attends 24-48h** : Gmail et Yahoo mettent du temps à valider BIMI
2. **Vérifie DMARC** : Doit être en `p=quarantine` ou `p=reject`
3. **Vérifie le SVG** : Doit être accessible en HTTPS et respecter le format BIMI
4. **Vérifie SPF/DKIM** : Doivent être valides (via MXToolbox)

### Le SVG ne charge pas ?

Vérifie que :
- L'URL est en **HTTPS** (pas HTTP)
- Le SVG est au format **Tiny PS** (déjà fait dans `logo-bimi.svg`)
- Le fichier est accessible publiquement (pas de 404)

---

## 📚 Ressources

- BIMI Group (officiel) : https://bimigroup.org
- MXToolbox BIMI : https://mxtoolbox.com/bimi.aspx
- Resend Docs : https://resend.com/docs/dashboard/domains/bimi

---

**C'est tout ! Une fois les DNS configurés et propagés, ton logo apparaîtra dans Gmail ! 🎉**
