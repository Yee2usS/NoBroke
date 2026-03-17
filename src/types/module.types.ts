/**
 * Types pour le système de Modules de NoBroke
 */

export type SlideType = 'definition' | 'why' | 'how' | 'example' | 'action';

export interface Slide {
  type: SlideType;
  title: string;
  content: string; // Support Markdown
  imageUrl?: string;
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleContent {
  slides: Slide[];
}

export interface ModuleQuiz {
  questions: QuizQuestion[];
}

export interface Zone {
  id: number;
  name: string;
  description: string;
  levelRequired: number;
  color: string; // Couleur du gradient
  icon: string; // Emoji
}

export interface Module {
  id: string;
  zone: number;
  title: string;
  description: string;
  isPremium: boolean;
  levelRequired: number;
  xpReward: number;
  estimatedDuration: number; // minutes
  icon: string; // emoji
  orderInZone: number;
  content: ModuleContent;
  quiz: ModuleQuiz;
}

export interface UserModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number; // Score du quiz /3
  completedAt?: string;
}

export type LockReason =
  | 'zone_level'    // La zone entière est inaccessible (niveau insuffisant)
  | 'sequential'    // Le module précédent n'est pas encore complété
  | 'premium';      // Contenu réservé aux abonnés premium

export interface ModuleWithProgress extends Module {
  progress?: UserModuleProgress;
  locked: boolean;         // Verrouillé par niveau de zone ou module précédent
  premiumLocked: boolean;  // Verrouillé par abonnement premium
  lockReason?: LockReason; // Raison précise du verrouillage
}

export interface ModuleCompletionResult {
  success: boolean;
  xpGained: number;
  leveledUp: boolean;
  newLevel?: number;
  newTotalXP?: number;
  badgeUnlocked?: {
    id: string;
    name: string;
    icon: string;
  };
  error?: string;
}
