-- ==========================================
-- BADGES NIVEAUX + CAGNOTTE
-- ==========================================
-- Badges attribués automatiquement selon :
-- - Niveau atteint (XP)
-- - Montant de cagnotte atteint (Choix du Jour)
-- ==========================================

-- Badges par niveau
INSERT INTO badges (name, description, icon, rarity, unlock_condition) VALUES
  ('Apprenti', 'Atteins le niveau 5', '🌱', 'common', '{"type": "level", "value": 5}'),
  ('Élève', 'Atteins le niveau 10', '📖', 'common', '{"type": "level", "value": 10}'),
  ('Progressiste', 'Atteins le niveau 15', '📈', 'rare', '{"type": "level", "value": 15}'),
  ('Assidu', 'Atteins le niveau 20', '⭐', 'rare', '{"type": "level", "value": 20}'),
  ('Expert', 'Atteins le niveau 25', '🎓', 'epic', '{"type": "level", "value": 25}'),
  ('Vétéran', 'Atteins le niveau 30', '🏅', 'epic', '{"type": "level", "value": 30}'),
  ('Maître', 'Atteins le niveau 40', '👑', 'legendary', '{"type": "level", "value": 40}'),
  ('Légende', 'Atteins le niveau 50', '💎', 'legendary', '{"type": "level", "value": 50}')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  rarity = EXCLUDED.rarity,
  unlock_condition = EXCLUDED.unlock_condition;

-- Badges par montant de cagnotte (Choix du Jour)
INSERT INTO badges (name, description, icon, rarity, unlock_condition) VALUES
  ('Premier gain', 'Atteins 2 500 € dans ta cagnotte', '💰', 'common', '{"type": "wallet", "value": 2500}'),
  ('Épargnant', 'Atteins 3 000 € dans ta cagnotte', '🏦', 'common', '{"type": "wallet", "value": 3000}'),
  ('Cagnotte d''or', 'Atteins 5 000 € dans ta cagnotte', '🪙', 'rare', '{"type": "wallet", "value": 5000}'),
  ('Trésorier', 'Atteins 7 500 € dans ta cagnotte', '💵', 'epic', '{"type": "wallet", "value": 7500}'),
  ('Magnat', 'Atteins 10 000 € dans ta cagnotte', '🏆', 'legendary', '{"type": "wallet", "value": 10000}')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  rarity = EXCLUDED.rarity,
  unlock_condition = EXCLUDED.unlock_condition;
