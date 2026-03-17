/**
 * Données pour l'onboarding Quick Wins
 */

export const QUICK_WINS_OBJECTIVES = [
  { id: 'economiser', label: 'Économiser davantage', emoji: '💰' },
  { id: 'gagner_plus', label: 'Apprendre à gagner plus', emoji: '📈' },
] as const;

export const QUICK_WINS_ACTIONS = [
  { id: 'resilier_abo', label: 'Résilier 1 abonnement inutile' },
  { id: 'ouvrir_livret', label: 'Ouvrir un Livret A (ou LEP si éligible)' },
  { id: 'virement_auto', label: 'Mettre en place un virement automatique vers l\'épargne' },
  { id: 'budget_503020', label: 'Faire un budget 50/30/20 sur le mois dernier' },
] as const;

export type QuickWinsObjectiveId = (typeof QUICK_WINS_OBJECTIVES)[number]['id'];
export type QuickWinsActionId = (typeof QUICK_WINS_ACTIONS)[number]['id'];

export interface QuickWinsData {
  objectives: QuickWinsObjectiveId[];
  hasIdeas: boolean;
  selectedActions: QuickWinsActionId[];
}
