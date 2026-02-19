/**
 * Construction des prompts utilisateur pour la génération de contenu (slides + quiz).
 * L'appel API (Claude) est fait côté script Node ou Edge Function, pas dans l'app.
 */

import { CONTENT_DIRECTOR_SYSTEM_PROMPT } from './prompts/directorPrompt';
import { FULL_MODULE_CONTENT_JSON_FORMAT } from './schemas/contentSchemas';

export { CONTENT_DIRECTOR_SYSTEM_PROMPT };

export interface GenerateModuleContentInput {
  /** Titre du module (ex. "C'est quoi un budget ?") */
  title: string;
  /** Courte description ou objectif du module */
  description?: string;
  /** Thème ou zone (ex. "Budget", "Épargne") pour contextualiser */
  theme?: string;
}

/**
 * Construit le message système (directeur) pour Claude
 */
export function getSystemPrompt(): string {
  return CONTENT_DIRECTOR_SYSTEM_PROMPT;
}

/**
 * Construit le message utilisateur pour générer tout le contenu d'un module (slides + quiz)
 */
export function buildFullModuleContentUserPrompt(input: GenerateModuleContentInput): string {
  const { title, description, theme } = input;
  const context = [
    `Génère le contenu pédagogique complet d'un module dont le titre est : **${title}**.`,
    description && `Objectif / description : ${description}.`,
    theme && `Thème / zone : ${theme}.`,
  ]
    .filter(Boolean)
    .join('\n');

  return `${context}

${FULL_MODULE_CONTENT_JSON_FORMAT}`;
}
