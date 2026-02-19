-- =====================================
-- SETUP EMAIL AUTOMATIQUE AVEC RESEND
-- =====================================

-- 1. Activer l'extension HTTP pour appeler des APIs externes
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- 2. Créer la fonction qui envoie l'email via Resend
CREATE OR REPLACE FUNCTION send_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
  resend_api_key TEXT := 're_dfGnGWzn_2R98skUy2vcA5FajAVdFRhhG'; -- ⚠️ À REMPLACER par une variable d'environnement en production
  email_html TEXT;
BEGIN
  -- Template HTML de l'email (version compacte)
  email_html := '<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:Inter,-apple-system,sans-serif;background-color:#f3f4f6">
    <table style="width:100%;border-collapse:collapse">
        <tr>
            <td style="padding:40px 20px">
                <table style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.1);overflow:hidden">
                    <tr>
                        <td style="background:linear-gradient(135deg,#3B82F6 0%,#8B5CF6 100%);padding:40px 30px;text-align:center">
                            <img src="https://nobroke.app/logo.png" alt="NoBroke" style="height:100px;width:auto;margin:0 0 20px">
                            <h1 style="margin:0;color:#fff;font-size:32px;font-weight:900">Bienvenue sur NoBroke !</h1>
                            <p style="margin:10px 0 0;color:#E0E7FF;font-size:16px">Tu es désormais sur la liste d''attente</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:40px 30px">
                            <p style="margin:0 0 20px;color:#1F2937;font-size:16px;line-height:1.6">Hey 👋</p>
                            <p style="margin:0 0 20px;color:#1F2937;font-size:16px;line-height:1.6">Merci de rejoindre l''aventure NoBroke ! Tu fais maintenant partie des <strong>premiers inscrits</strong> qui vont transformer leur relation à l''argent.</p>
                            <p style="margin:0 0 30px;color:#1F2937;font-size:16px;line-height:1.6"><strong style="color:#3B82F6">300 000€</strong>, c''est le montant moyen qu''un Français perd sur sa vie par manque d''éducation financière. Avec NoBroke, on va changer ça. Ensemble.</p>
                            <table style="width:100%;background-color:#F3F4F6;border-radius:12px;border-left:4px solid #8B5CF6;padding:20px;margin:0 0 30px">
                                <tr>
                                    <td>
                                        <h3 style="margin:0 0 12px;color:#1F2937 !important;font-size:18px;font-weight:700">✨ Ce qui t''attend</h3>
                                        <ul style="margin:0;padding:0 0 0 20px;color:#1F2937 !important;font-size:14px;line-height:1.8">
                                            <li style="color:#1F2937 !important">Accès anticipé à la <strong>bêta fermée</strong> (début 2026)</li>
                                            <li style="color:#1F2937 !important">La possibilité de façonner l''application grâce à tes précieux retours</li>
                                            <li style="color:#1F2937 !important">Des modules d''apprentissage gamifiées</li>
                                            <li style="color:#1F2937 !important">Quiz personnalisés selon ton niveau</li>
                                            <li style="color:#1F2937 !important">Simulations et choix quotidiens</li>
                                            <li style="color:#1F2937 !important">Une communauté privée</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:0 0 30px;color:#1F2937;font-size:16px;line-height:1.6">On te tiendra informé de l''avancement par email (<strong>1 email/mois max</strong>, promis 🔒).</p>
                            <table style="width:100%;margin:0 0 30px">
                                <tr>
                                    <td style="text-align:center">
                                        <a href="https://www.linkedin.com/company/nobroke/" style="display:inline-block;background:linear-gradient(135deg,#3B82F6 0%,#8B5CF6 100%);color:#fff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 32px;border-radius:12px;box-shadow:0 4px 12px rgba(59,130,246,0.3)">📱 Suis-nous sur LinkedIn</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:0 0 10px;color:#6B7280;font-size:14px;line-height:1.6">En attendant, si tu as des questions ou des suggestions, réponds directement à cet email. On lit tout ! 💬</p>
                            <p style="margin:0;color:#1F2937;font-size:16px;line-height:1.6">À très vite,<br><strong style="background:linear-gradient(135deg,#3B82F6 0%,#8B5CF6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent">L''équipe NoBroke</strong> 🚀</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:30px;background:#F9FAFB;text-align:center">
                            <p style="margin:0 0 12px;color:#6B7280;font-size:12px">Tu reçois cet email car tu t''es inscrit sur <a href="https://nobroke.app" style="color:#3B82F6;text-decoration:none">nobroke.app</a></p>
                            <p style="margin:0 0 12px;color:#9CA3AF;font-size:11px">
                                <a href="https://nobroke.app/politique-confidentialite.html" style="color:#6B7280;text-decoration:underline">Politique de confidentialité</a> • 
                                <a href="https://nobroke.app/cgu.html" style="color:#6B7280;text-decoration:underline">CGU</a> • 
                                <a href="https://nobroke.app/mentions-legales.html" style="color:#6B7280;text-decoration:underline">Mentions légales</a>
                            </p>
                            <p style="margin:0;color:#9CA3AF;font-size:11px">© 2026 NoBroke. Tous droits réservés.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';

  -- Appel API Resend
  PERFORM extensions.http((
    'POST',
    'https://api.resend.com/emails',
    ARRAY[
      extensions.http_header('Authorization', 'Bearer ' || resend_api_key),
      extensions.http_header('Content-Type', 'application/json')
    ],
    'application/json',
    json_build_object(
      'from', 'NoBroke <contact@nobroke.app>',
      'to', ARRAY[NEW.email],
      'subject', '🎉 Bienvenue sur NoBroke !',
      'html', email_html
    )::text
  )::extensions.http_request);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Créer le trigger qui déclenche l'envoi d'email
DROP TRIGGER IF EXISTS on_waitlist_insert ON waitlist;

CREATE TRIGGER on_waitlist_insert
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION send_welcome_email();

-- =====================================
-- TEST
-- =====================================
-- Pour tester, insère un email (remplace par ton vrai email) :
-- INSERT INTO waitlist (email) VALUES ('ton-email@exemple.com');

-- =====================================
-- NOTES IMPORTANTES
-- =====================================
-- ⚠️ SÉCURITÉ : En production, stocke la clé API dans un secret Supabase :
-- 1. Va dans Supabase Dashboard > Project Settings > API
-- 2. Ajoute un secret : RESEND_API_KEY = ta_clé
-- 3. Remplace dans le code : resend_api_key TEXT := current_setting('app.resend_api_key');

-- ⚠️ DOMAINE EMAIL : Par défaut, Resend utilise onboarding@resend.dev
-- Pour utiliser ton propre domaine (hello@nobroke.app) :
-- 1. Va sur Resend Dashboard > Domains
-- 2. Ajoute nobroke.app
-- 3. Configure les DNS (SPF, DKIM, DMARC)
-- 4. Change 'from' dans le code ci-dessus
