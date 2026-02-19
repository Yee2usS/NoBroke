/**
 * Schémas et instructions de format pour la génération de contenu par l'IA.
 * Utilisés dans les prompts pour obtenir du JSON valide (slides, quiz).
 */

import type { SlideType } from '@/types/module.types';

export const SLIDES_JSON_FORMAT = `
Tu dois répondre UNIQUEMENT par un objet JSON valide, sans texte avant ou après.

Format des slides :
{
  "slides": [
    {
      "type": "definition" | "why" | "how" | "example" | "action",
      "title": "Titre court de la slide",
      "content": "Contenu en Markdown (listes, **gras**, emojis si pertinent). Pas d'imageUrl sauf si demandé."
    }
  ]
}

Règles :
- Entre 4 et 6 slides par module.
- Enchaînement type : definition → why → how → example → action.
- content : texte en français, Markdown autorisé, pas de retour à la ligne inutile (utilise \\n si besoin).
`;

export const QUIZ_JSON_FORMAT = `
Tu dois répondre UNIQUEMENT par un objet JSON valide, sans texte avant ou après.

Format du quiz :
{
  "questions": [
    {
      "question": "Énoncé de la question (une phrase claire)",
      "choices": ["Choix A", "Choix B", "Choix C", "Choix D"],
      "correctIndex": 0,
      "explanation": "Explication courte et pédagogique de la bonne réponse (1-2 phrases)."
    }
  ]
}

Règles :
- Exactement 3 questions.
- 4 choix par question. correctIndex est l'index (0 à 3) de la bonne réponse.
- Les mauvaises réponses doivent être plausibles pour éviter le hasard.
- explanation : en français, bienveillant, sans jargon.
`;

export const FULL_MODULE_CONTENT_JSON_FORMAT = `
Tu dois répondre UNIQUEMENT par un objet JSON valide, sans texte avant ou après.

{
  "slides": [
    {
      "type": "definition" | "why" | "how" | "example" | "action",
      "title": "Titre de la slide",
      "content": "Contenu en Markdown"
    }
  ],
  "questions": [
    {
      "question": "Énoncé de la question",
      "choices": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Explication courte"
    }
  ]
}

- slides : 4 à 6 slides. Types dans l'ordre : definition → why → how → example → action.
- questions : exactement 3. Chaque question a 4 choices, correctIndex (0-3), et explanation.
`;

export type GeneratedSlide = {
  type: SlideType;
  title: string;
  content: string;
  imageUrl?: string;
};

export type GeneratedQuizQuestion = {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type GeneratedModuleContent = {
  slides: GeneratedSlide[];
  questions: GeneratedQuizQuestion[];
};
