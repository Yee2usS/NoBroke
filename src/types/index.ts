// Types centralisés pour l'application NoBroke

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  onboarding_completed?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  level: number;
  xp: number;
  xp_to_next_level?: number;
  streak: number; // Renommé de streak_days pour correspondre au schema
  last_visit: string; // Renommé de last_activity_date
  total_modules_completed?: number;
  created_at: string;
  updated_at?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp_reward: number;
  duration_minutes: number;
  order_index: number;
  is_locked: boolean;
  required_level: number;
  icon: string;
}

export interface UserModule {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  progress_percentage: number;
  completed_at?: string;
  last_accessed: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: BadgeRarity;
  icon: string;
  category: string;
  requirement_description: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface DailyChoice {
  id: string;
  date: string;
  scenario: string;
  option_a: string;
  option_b: string;
  correct_option: 'a' | 'b';
  explanation: string;
  xp_reward: number;
}

export interface UserDailyChoice {
  id: string;
  user_id: string;
  daily_choice_id: string;
  selected_option: 'a' | 'b';
  is_correct: boolean;
  answered_at: string;
}

export interface OnboardingQuiz {
  id: string;
  question: string;
  options: string[];
  correct_answer_index: number;
  category: string;
}

// Subscription Types
export type SubscriptionTier = 'free' | 'premium' | 'pro';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  icon: string;
  features: string[];
  recommended?: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  ProfileQuestions: undefined;
  Quiz: { profileData: any };
  Result: { score: number; totalQuestions: number; profileData: any };
  Avatar: { level: number; xp: number; profileData: any };
  MainTabs: undefined;
  DailyChoice: undefined;
  ModulesList: undefined;
  ModuleDetail: { moduleId: string };
  ModuleQuiz: { moduleId: string };
  BadgeDetail: { badgeId: string };
  Subscription: undefined;
};

export type TabParamList = {
  Home: undefined;
  Modules: undefined;
  Badges: undefined;
  Profile: undefined;
  More: undefined;
};

// Store Types
export interface UserState {
  user: User | null;
  progress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setProgress: (progress: UserProgress | null) => void;
  updateProgress: (updates: Partial<UserProgress>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export interface GameState {
  modules: Module[];
  userModules: UserModule[];
  badges: Badge[];
  userBadges: UserBadge[];
  dailyChoice: DailyChoice | null;
  hasAnsweredDailyChoice: boolean;
  isLoading: boolean;
  error: string | null;
  fetchModules: () => Promise<void>;
  fetchUserModules: () => Promise<void>;
  fetchBadges: () => Promise<void>;
  fetchUserBadges: () => Promise<void>;
  fetchDailyChoice: () => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  answerDailyChoice: (choiceId: string, selectedOption: 'a' | 'b') => Promise<void>;
}
