# 🚀 Landing Page NoBroke

Landing page moderne et responsive pour NoBroke avec waitlist intégrée.

## 📁 Structure

```
landing/
├── index.html      # Page principale
├── styles.css      # Styles (responsive)
├── script.js       # JavaScript (formulaire waitlist)
└── README.md       # Ce fichier
```

## ✨ Fonctionnalités

- ✅ Design moderne et attractif
- ✅ 100% responsive (mobile, tablet, desktop)
- ✅ Animations fluides au scroll
- ✅ Formulaire waitlist fonctionnel
- ✅ SEO optimisé
- ✅ Performance optimisée
- ✅ Aucune dépendance externe (vanilla JS)

## 🚀 Déploiement rapide

### Option 1: Vercel (Recommandé)

1. Crée un compte sur [vercel.com](https://vercel.com)
2. Installe Vercel CLI :
```bash
npm install -g vercel
```

3. Déploie :
```bash
cd landing
vercel
```

4. Ton site sera en ligne en quelques secondes ! 🎉

### Option 2: Netlify

1. Crée un compte sur [netlify.com](https://netlify.com)
2. Drag & drop le dossier `landing/` dans Netlify
3. Ton site est en ligne ! 🚀

Ou via CLI :
```bash
npm install -g netlify-cli
cd landing
netlify deploy --prod
```

### Option 3: GitHub Pages

1. Crée un repo GitHub
2. Push le contenu du dossier `landing/`
3. Active GitHub Pages dans Settings > Pages
4. Ton site sera sur `https://username.github.io/repo-name`

### Option 4: Serveur classique (OVH, etc.)

1. Upload les fichiers via FTP
2. Point ton domaine vers le dossier

## 📧 Configuration de la Waitlist

Par défaut, les emails sont stockés en **localStorage** (pour démo).

### Pour collecter vraiment les emails :

#### Option A: Google Sheets (Gratuit, facile)

1. Crée un Google Sheet
2. Créer un Apps Script :
   - Extensions > Apps Script
   - Colle ce code :

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.email]);
  return ContentService.createTextOutput(JSON.stringify({success: true}));
}
```

3. Déployer > Nouvelle version > Web app
4. Copie l'URL et remplace dans `script.js` ligne 28

#### Option B: Zapier/Make.com (No-code)

1. Crée un webhook sur Zapier/Make
2. Connecte-le à Google Sheets, Notion, Airtable, etc.
3. Remplace l'URL du webhook dans `script.js` ligne 45

#### Option C: Service dédié

- [ConvertKit](https://convertkit.com) (free jusqu'à 1000)
- [Mailchimp](https://mailchimp.com) (free jusqu'à 500)
- [EmailOctopus](https://emailoctopus.com) (free jusqu'à 2500)

#### Option D: API Backend custom

Si tu as déjà un backend Supabase :

```javascript
// Dans script.js, remplace la ligne 28 par :
const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email, created_at: new Date().toISOString() }]);
```

Et crée la table dans Supabase :
```sql
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## 🎨 Personnalisation

### Couleurs

Édite les variables CSS dans `styles.css` :

```css
:root {
    --primary: #6366f1;      /* Couleur principale */
    --secondary: #8b5cf6;    /* Couleur secondaire */
    --accent: #10b981;       /* Couleur accent */
}
```

### Contenu

Édite directement `index.html` pour modifier :
- Textes
- Features
- Tarifs
- Sections

### Images

Pour ajouter des vraies images :

1. Crée un dossier `images/`
2. Ajoute tes images
3. Remplace le mockup par :

```html
<img src="images/app-screenshot.png" alt="NoBroke App">
```

## 📊 Analytics

### Google Analytics

Ajoute avant `</head>` dans `index.html` :

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

### Plausible (Privacy-friendly)

```html
<script defer data-domain="nobroke.com" src="https://plausible.io/js/script.js"></script>
```

## 🔗 Domaine personnalisé

### Sur Vercel

1. Va dans Settings > Domains
2. Ajoute ton domaine
3. Configure les DNS selon les instructions

### Sur Netlify

1. Domain settings > Add custom domain
2. Configure les DNS

## 🐛 Problèmes courants

### Le formulaire ne fonctionne pas

- Vérifie la console du navigateur (F12)
- Vérifie que l'URL de l'API est correcte
- Vérifie les CORS si tu utilises une API externe

### Les animations ne marchent pas

- Vérifie que `script.js` est bien chargé
- Ouvre la console pour voir les erreurs

## 📱 Tester en local

Utilise un serveur local :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve

# Avec PHP
php -S localhost:8000
```

Puis ouvre `http://localhost:8000`

## 🚀 Améliorations futures

- [ ] Ajouter des témoignages
- [ ] Intégrer une vidéo de démo
- [ ] Ajouter un blog
- [ ] Multi-langue (EN, ES)
- [ ] Mode sombre
- [ ] Chatbot de support

## 💜 Support

Questions ? Contact : [ton-email@exemple.com]

## 📄 Licence

Propriétaire - NoBroke © 2026
