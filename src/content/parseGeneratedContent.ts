import type { GeneratedModuleContent } from './schemas/contentSchemas';

/**
 * Extrait un objet JSON de la réponse Claude (parfois entourée de \`\`\`json ... \`\`\`)
 */
export function extractJsonFromResponse(text: string): string {
  const trimmed = text.trim();
  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  return trimmed;
}

/**
 * Parse la réponse brute de Claude en contenu module (slides + questions)
 */
export function parseGeneratedModuleContent(responseText: string): GeneratedModuleContent {
  const jsonStr = extractJsonFromResponse(responseText);
  const parsed = JSON.parse(jsonStr) as GeneratedModuleContent;

  if (!parsed.slides || !Array.isArray(parsed.slides)) {
    throw new Error('Réponse invalide : "slides" doit être un tableau');
  }
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error('Réponse invalide : "questions" doit être un tableau');
  }

  return parsed;
}
