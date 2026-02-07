# 🚀 Déploiement Ultra-Rapide (5 minutes)

## ⚡ Option 1: Vercel (Le plus rapide)

### Méthode A: Via le site (Drag & Drop)

1. Va sur [vercel.com](https://vercel.com)
2. Clique sur "New Project"
3. **Drag & drop le dossier `landing/`** directement sur la page
4. Clique sur "Deploy"
5. ✅ **C'est en ligne !** Tu as maintenant une URL type `nobroke-xxx.vercel.app`

### Méthode B: Via CLI (Plus pro)

```bash
# 1. Installe Vercel CLI
npm install -g vercel

# 2. Va dans le dossier landing
cd landing

# 3. Déploie
vercel

# 4. Suis les instructions (appuie sur Enter pour tout accepter)
# ✅ Ton site est en ligne !
```

Pour mettre à jour :
```bash
vercel --prod
```

---

## 🎨 Option 2: Netlify (Aussi rapide)

### Méthode A: Drag & Drop

1. Va sur [netlify.com](https://netlify.com)
2. Scroll jusqu'à "Want to deploy a new site without connecting to Git?"
3. **Drag & drop le dossier `landing/`**
4. ✅ **C'est en ligne !**

### Méthode B: Via CLI

```bash
# 1. Installe Netlify CLI
npm install -g netlify-cli

# 2. Va dans le dossier landing
cd landing

# 3. Déploie
netlify deploy --prod

# Sélectionne "Create & configure a new site"
# Drag = ./
# ✅ Ton site est en ligne !
```

---

## 🔗 Ajouter ton domaine personnalisé

### Sur Vercel

1. Va dans ton projet > Settings > Domains
2. Ajoute `www.nobroke.fr` (ou ton domaine)
3. Configure les DNS chez ton registrar (OVH, Gandi, etc.) :
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

### Sur Netlify

1. Domain settings > Add custom domain
2. Configure les DNS :
   - Type: `CNAME`
   - Name: `www`
   - Value: Fourni par Netlify

⏱️ Attends 5-30 minutes pour la propagation DNS.

---

## 📧 Connecter la Waitlist (IMPORTANT !)

Par défaut, les emails sont stockés en **localStorage** (pas persistant).

### Solution Rapide: Google Sheets (5 min)

1. **Crée un Google Sheet** : [sheets.google.com](https://sheets.google.com)
2. Nomme-le "NoBroke Waitlist"
3. Ajoute ces colonnes : `Date` | `Email`
4. **Extensions** > **Apps Script**
5. Colle ce code :

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.email]);
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

6. **Déployer** > **Nouvelle version** > **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. **Copie l'URL du Web App** (ressemble à `https://script.google.com/macros/s/...`)

8. **Édite `script.js`** (ligne ~28) :

```javascript
// Remplace cette section :
const response = await fetch('TON_URL_GOOGLE_APPS_SCRIPT', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        email: email, 
        timestamp: new Date().toISOString() 
    }),
});
```

9. **Redéploie** sur Vercel/Netlify

✅ **Les emails arrivent maintenant dans ton Google Sheet !**

---

### Alternative: Zapier/Make.com (No-code)

1. Crée un compte sur [zapier.com](https://zapier.com) ou [make.com](https://make.com)
2. Crée un nouveau Zap/Scenario
3. Trigger: **Webhook** (Catch Hook)
4. Copie l'URL du webhook
5. Action: **Google Sheets** > Add Row (ou Notion, Airtable, etc.)
6. Dans `script.js`, remplace l'URL à la ligne 45
7. Teste en soumettant le formulaire

---

## 📊 Ajouter Google Analytics (Optionnel)

1. Crée une propriété sur [analytics.google.com](https://analytics.google.com)
2. Copie ton **Measurement ID** (G-XXXXXXXXXX)
3. Ajoute avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Redéploie

---

## ✅ Checklist avant le lancement

- [ ] Site déployé sur Vercel/Netlify
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Waitlist connectée à Google Sheets ou service email
- [ ] Google Analytics ajouté (optionnel)
- [ ] Testé sur mobile (Chrome DevTools > Toggle Device)
- [ ] Testé le formulaire waitlist (vérifie que les emails arrivent)
- [ ] Vérifié tous les liens
- [ ] Partagé sur les réseaux sociaux 🎉

---

## 🐛 Problèmes courants

### "Failed to fetch" lors de la soumission

- Vérifie que l'URL du webhook/Apps Script est correcte
- Vérifie que le Web App est déployé en "Anyone"
- Essaie avec `mode: 'no-cors'` dans le fetch

### Le site ne se charge pas

- Vérifie que tous les fichiers sont dans le même dossier
- Vérifie la console du navigateur (F12)

### Les emails n'arrivent pas

- Vérifie la console du navigateur
- Vérifie que le Google Apps Script est déployé
- Teste l'URL du webhook directement avec Postman

---

## 📞 Support

Besoin d'aide ? Contacte-moi : [ton-email]

---

**Bonne chance pour le lancement ! 🚀💜**
