import { Zone } from '@/types/module.types';

/**
 * Les 5 zones de progression de NoBroke
 * Chaque zone représente une thématique financière
 */
export const ZONES: Zone[] = [
  {
    id: 1,
    name: 'Village des Fauchés',
    description: 'Maîtrise les bases du budget et prends le contrôle de tes finances',
    levelRequired: 1,
    color: '#10B981', // Emerald green
    icon: '🏘️',
  },
  {
    id: 2,
    name: "Forêt de l'Épargne",
    description: 'Apprends à économiser efficacement et construis ton matelas de sécurité',
    levelRequired: 11,
    color: '#3B82F6', // Blue
    icon: '🌲',
  },
  {
    id: 3,
    name: 'Montagnes de la Dette',
    description: 'Comprends le crédit et gère tes dettes intelligemment',
    levelRequired: 21,
    color: '#F59E0B', // Amber
    icon: '⛰️',
  },
  {
    id: 4,
    name: "Ville de l'Investissement",
    description: 'Découvre les investissements et fais travailler ton argent',
    levelRequired: 31,
    color: '#8B5CF6', // Purple
    icon: '🏙️',
  },
  {
    id: 5,
    name: 'Château Liberté Financière',
    description: 'Atteins l\'indépendance financière et sécurise ton avenir',
    levelRequired: 41,
    color: '#EC4899', // Pink
    icon: '🏰',
  },
];

/**
 * Récupère une zone par son ID
 */
export const getZoneById = (zoneId: number): Zone | undefined => {
  return ZONES.find((zone) => zone.id === zoneId);
};

/**
 * Vérifie si un utilisateur peut accéder à une zone
 */
export const canAccessZone = (userLevel: number, zoneId: number): boolean => {
  const zone = getZoneById(zoneId);
  if (!zone) return false;
  return userLevel >= zone.levelRequired;
};
