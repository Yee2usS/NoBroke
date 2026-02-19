# 📧 Setup Email Automatique - NoBroke

## ✅ Ce qui a été créé

- **Template email** : `email-template.html` (design complet)
- **Script SQL** : `database/setup-emails.sql` (automatisation Supabase)
- **Clé API Resend** : `re_dfGnGWzn_2R98skUy2vcA5FajAVdFRhhG` ⚠️ CONFIDENTIEL

---

## 🚀 Installation (5 minutes)

### **Étape 1 : Exécuter le script SQL**

1. Va sur **[Supabase SQL Editor](https://supabase.com/dashboard/project/nujtymqdzhwmucfkuhgt/sql/new)**
2. Copie tout le contenu de `database/setup-emails.sql`
3. Colle dans l'éditeur
4. Clique sur **"Run"** (en bas à droite)

✅ **C'est fait !** Les emails seront maintenant envoyés automatiquement à chaque inscription !

---

### **Étape 2 : Tester**

#### Test depuis Supabase :
```sql
-- Remplace par ton email pour tester
INSERT INTO waitlist (email) VALUES ('ton-email@exemple.com');
```

#### Test depuis ta landing page :
1. Va sur https://nobroke.app
2. Inscris-toi avec ton email
3. Vérifie ta boîte mail ! 📬

---

## 🔒 Sécurité (À faire plus tard)

⚠️ Pour l'instant, ta clé API est **en dur** dans le SQL (pas grave pour MVP).

**En production**, stocke-la dans un secret Supabase :

1. **Va dans Supabase Dashboard** :
   👉 Project Settings > Secrets

2. **Ajoute un secret** :
   - Key : `RESEND_API_KEY`
   - Value : `re_dfGnGWzn_2R98skUy2vcA5FajAVdFRhhG`

3. **Modifie le code SQL** (ligne 14) :
```sql
-- Avant :
resend_api_key TEXT := 're_dfGnGWzn_...';

-- Après :
resend_api_key TEXT := current_setting('app.resend_api_key', true);
```

---

## 📨 Personnaliser l'email expéditeur

### Par défaut :
**From** : `NoBroke <onboarding@resend.dev>`

### Pour utiliser ton propre domaine (hello@nobroke.app) :

1. **Va sur [Resend Dashboard](https://resend.com/domains)**
2. Clique sur **"Add Domain"**
3. Entre `nobroke.app`
4. **Configure les DNS** chez ton registrar :
   - SPF : `v=spf1 include:resend.com ~all`
   - DKIM : (fourni par Resend)
   - DMARC : `v=DMARC1; p=none`

5. **Modifie le SQL** (ligne 79) :
```sql
'from', 'NoBroke <hello@nobroke.app>',
```

---

## 📊 Statistiques

### Voir les emails envoyés :
1. Va sur **[Resend Dashboard](https://resend.com/emails)**
2. Tu verras :
   - ✅ Emails envoyés
   - 📊 Taux d'ouverture
   - 🔗 Clics sur les liens
   - ❌ Bounces/erreurs

---

## 🧪 Troubleshooting

### L'email n'arrive pas ?

1. **Vérifie les spams** 📬
2. **Regarde les logs Supabase** :
   ```sql
   SELECT * FROM pg_stat_statements 
   WHERE query LIKE '%send_welcome_email%';
   ```
3. **Vérifie Resend Dashboard** : regarde les erreurs

### L'extension `http` n'existe pas ?

Si tu as l'erreur `extension "http" does not exist` :
1. Va dans Supabase Dashboard > Extensions
2. Recherche "http"
3. Clique sur "Enable"
4. Réexécute le script SQL

---

## 🎨 Modifier le template

### Pour changer le contenu de l'email :

1. **Édite** `email-template.html`
2. **Teste** dans ton navigateur
3. **Compresse le HTML** sur https://www.willpeavy.com/tools/minifier/
4. **Remplace** dans `setup-emails.sql` (ligne 17)
5. **Réexécute** le script SQL dans Supabase

**Astuce** : Utilise des single quotes `'` échappées : `''`

---

## 💡 Améliorations futures

### 1. Ajouter le prénom
Si tu collectes le prénom, modifie la table :
```sql
ALTER TABLE waitlist ADD COLUMN first_name TEXT;
```

Puis utilise-le dans l'email :
```sql
email_html := replace(email_html, 'Hey 👋', 'Hey ' || NEW.first_name || ' 👋');
```

### 2. Séquence d'emails
Tu peux créer plusieurs triggers :
- J+0 : Email de bienvenue
- J+3 : Rappel des features
- J+7 : Demande de feedback
- J+14 : Annonce de la bêta

### 3. Tracking avancé
Ajoute des paramètres UTM :
```
https://nobroke.app?utm_source=email&utm_campaign=welcome
```

---

## ✅ Checklist

- [x] Compte Resend créé
- [x] Clé API récupérée
- [ ] Script SQL exécuté dans Supabase
- [ ] Email de test envoyé et reçu
- [ ] Template email personnalisé (optionnel)
- [ ] Domaine email configuré (optionnel, pour plus tard)

---

## 📞 Support

- **Resend Docs** : https://resend.com/docs
- **Supabase Triggers** : https://supabase.com/docs/guides/database/postgres/triggers

---

**Prêt à tester ? Exécute le script SQL dans Supabase et inscris-toi sur ta landing ! 🚀**
