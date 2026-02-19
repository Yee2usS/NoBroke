# 📧 Email de Bienvenue NoBroke

## 📁 Fichier
`email-template.html` - Template d'email de confirmation pour la waitlist

## 🎨 Design
- ✅ Header avec gradient bleu-violet NoBroke
- ✅ Message de bienvenue chaleureux
- ✅ Liste des fonctionnalités à venir
- ✅ CTA vers LinkedIn
- ✅ Footer avec infos légales
- ✅ 100% responsive (mobile-friendly)

## 🚀 Comment l'utiliser ?

### Option 1 : Manuellement (pour tester)
1. Ouvre `email-template.html` dans ton navigateur
2. Copie tout le HTML
3. Colle dans ton client email (Gmail, Outlook, etc.)
4. Envoie à tes premiers inscrits !

### Option 2 : Automatiquement avec Supabase
Tu peux créer un **Trigger Supabase** pour envoyer cet email automatiquement :

#### A. Via Supabase Edge Functions (Recommandé)

1. **Crée une Edge Function Supabase** :
```bash
npx supabase functions new send-welcome-email
```

2. **Code de la fonction** (`supabase/functions/send-welcome-email/index.ts`) :
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { email } = await req.json()
  
  const emailHtml = `<!-- Colle ici le contenu de email-template.html -->`
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'NoBroke <hello@nobroke.app>',
      to: [email],
      subject: '🎉 Bienvenue sur NoBroke !',
      html: emailHtml,
    }),
  })

  return new Response(JSON.stringify(await res.json()), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

3. **Trigger automatique** (dans Supabase SQL Editor) :
```sql
CREATE OR REPLACE FUNCTION trigger_welcome_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/send-welcome-email',
    body := json_build_object('email', NEW.email)::text,
    headers := json_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    )::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_waitlist_signup
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION trigger_welcome_email();
```

#### B. Via un service email tiers

**Services recommandés** :
- **Resend** (https://resend.com) - 3000 emails/mois gratuits, super dev-friendly
- **Brevo** (ex-Sendinblue) - 300 emails/jour gratuits
- **Mailgun** - 5000 emails/mois gratuits (3 premiers mois)

### Option 3 : Zapier/Make.com (No-Code)

1. **Trigger** : Nouvelle ligne dans Supabase `waitlist`
2. **Action** : Envoyer email avec Gmail/Outlook
3. **Template** : Colle le HTML de `email-template.html`

## ✏️ Personnalisation

### Modifier les couleurs
Cherche et remplace dans le HTML :
- Bleu primaire : `#3B82F6`
- Violet secondaire : `#8B5CF6`
- Or accent : `#FBBF24`

### Ajouter le prénom
Si tu collectes le prénom, remplace :
```html
Hey 👋
```
Par :
```html
Hey {{prenom}} 👋
```

### Modifier les liens
- LinkedIn : `https://www.linkedin.com/company/nobroke/`
- Landing page : `https://nobroke.app`

## 📊 Tracking (Optionnel)

Pour tracker les ouvertures d'emails, ajoute un pixel invisible :
```html
<img src="https://ton-analytics.com/track?email={{email}}" width="1" height="1" alt="" />
```

## ✅ Checklist avant envoi

- [ ] Tester l'email sur Gmail
- [ ] Tester l'email sur Outlook
- [ ] Tester sur mobile (iOS + Android)
- [ ] Vérifier tous les liens
- [ ] Vérifier les fautes d'orthographe
- [ ] Remplacer les placeholders (URLs, etc.)

## 🧪 Outils de test

- **Litmus** : https://litmus.com (payant mais complet)
- **Email on Acid** : https://www.emailonacid.com
- **Mail Tester** : https://www.mail-tester.com (gratuit)

## 📈 Bonnes pratiques

✅ **DO** :
- Personnalise avec le prénom si possible
- Garde le message court et chaleureux
- Ajoute une vraie valeur (infos exclusives)
- Facilite la désabonnement (footer)

❌ **DON'T** :
- Ne spam pas (max 1 email/mois)
- N'envoie pas depuis gmail.com (mauvais pour la délivrabilité)
- N'oublie pas les mentions légales (RGPD)

## 🚀 MVP Rapide

Pour l'instant, tu peux :
1. Copier/coller ce template dans Gmail
2. Créer un **Google Sheet** avec tes inscrits
3. Utiliser **Gmail + Google Sheets + Apps Script** pour auto-send

Script Apps Script simple :
```javascript
function sendWelcomeEmails() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const email = data[i][0]; // Colonne A
    const sent = data[i][1];  // Colonne B
    
    if (!sent) {
      MailApp.sendEmail({
        to: email,
        subject: '🎉 Bienvenue sur NoBroke !',
        htmlBody: `<!-- Ton HTML ici -->`
      });
      
      sheet.getRange(i + 1, 2).setValue('✅ Envoyé');
    }
  }
}
```

---

**Besoin d'aide pour setup ? Dis-moi quelle option tu préfères ! 😊**
