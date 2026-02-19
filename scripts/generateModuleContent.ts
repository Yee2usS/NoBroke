/**
 * Script pour générer le contenu d'un module (slides + quiz) via l'API Claude.
 * À exécuter en local avec ANTHROPIC_API_KEY dans .env (jamais commiter la clé).
 *
 * Usage (depuis la racine du projet) :
 *   npx tsx scripts/generateModuleContent.ts "Titre du module"
 *   npx tsx scripts/generateModuleContent.ts "C'est quoi un budget ?" "Découvrir les bases du budget"
 */

import 'dotenv/config';
import {
  getSystemPrompt,
  buildFullModuleContentUserPrompt,
} from '../src/content/contentGenerationPrompts';
import { parseGeneratedModuleContent } from '../src/content/parseGeneratedContent';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-20250514';

async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API Anthropic: ${response.status} ${err}`);
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text?: string }>;
  };
  const textBlock = data.content?.find((c) => c.type === 'text');
  if (!textBlock?.text) {
    throw new Error('Réponse Claude sans bloc text');
  }
  return textBlock.text;
}

function toModuleDataSnippet(parsed: ReturnType<typeof parseGeneratedModuleContent>) {
  const slidesJson = JSON.stringify(parsed.slides, null, 2)
    .split('\n')
    .map((line) => '      ' + line)
    .join('\n');
  const questionsJson = JSON.stringify(parsed.questions, null, 2)
    .split('\n')
    .map((line) => '      ' + line)
    .join('\n');
  return `
    content: {
      slides: ${slidesJson},
    },
    quiz: {
      questions: ${questionsJson},
    },
`;
}

async function main() {
  const title = process.argv[2] || "C'est quoi un budget ?";
  const description = process.argv[3] || '';

  if (!ANTHROPIC_API_KEY) {
    console.error('Erreur: ANTHROPIC_API_KEY manquante. Ajoute-la dans .env à la racine du projet.');
    process.exit(1);
  }

  console.log('Génération du contenu pour le module:', title);
  if (description) console.log('Description:', description);
  console.log('Appel à Claude...');

  const systemPrompt = getSystemPrompt();
  const userPrompt = buildFullModuleContentUserPrompt({
    title,
    description: description || undefined,
    theme: 'Finances personnelles / Budget',
  });

  const rawResponse = await callClaude(systemPrompt, userPrompt);
  const parsed = parseGeneratedModuleContent(rawResponse);

  console.log('\n--- Contenu généré ---');
  console.log('Slides:', parsed.slides.length);
  console.log('Questions:', parsed.questions.length);
  console.log('\n--- Extrait pour modulesData.ts ---');
  console.log(toModuleDataSnippet(parsed));
  console.log('\n--- JSON complet (pour copier-coller) ---');
  console.log(JSON.stringify(parsed, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
