import { supabase } from './supabase';
import { awardXP } from './xpService';
import { getScenarioForDate, DailyScenario } from '@/data/dailyScenarios';
import { getUserSubscription, getSubscriptionLimits } from './subscriptionService';

/**
 * Service pour gérer le "Choix du Jour"
 */

export interface DailyChoiceFromDB {
  id: string;
  date: string;
  scenario: any; // JSONB
  created_at: string;
}

export interface UserChoiceResult {
  success: boolean;
  consequences: {
    money: number;
    xp: number;
    stats?: {
      discipline?: number;
      creativity?: number;
      prudence?: number;
    };
  };
  explanation: string;
  lesson: DailyScenario['lesson'];
  error?: string;
}

/**
 * Récupère le choix du jour pour un utilisateur
 * Crée automatiquement un nouveau choix si nécessaire
 */
export const getTodayChoice = async (
  userId: string
): Promise<{
  success: boolean;
  dailyChoice: DailyChoiceFromDB | null;
  scenario: DailyScenario | null;
  hasCompleted: boolean;
  userChoice: any | null;
  dailyChoicesCount: number;
  dailyChoicesLimit: number;
  canPlayToday: boolean;
  error?: string;
}> => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // 0. Récupérer les limites selon l'abonnement
    const subscriptionResult = await getUserSubscription(userId);
    const tier = subscriptionResult.subscription?.tier || 'free';
    const limits = getSubscriptionLimits(tier);

    // Compter les choix faits aujourd'hui
    const { data: todayChoices, error: countError } = await supabase
      .from('user_choices')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`);

    if (countError) throw countError;

    const dailyChoicesCount = todayChoices?.length || 0;
    const canPlayToday = dailyChoicesCount < limits.dailyChoicesPerDay;

    // 1. Vérifier s'il existe déjà un choix pour aujourd'hui
    let { data: existingChoice, error: fetchError } = await supabase
      .from('daily_choices')
      .select('*')
      .eq('date', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // 2. Si pas de choix aujourd'hui, en créer un
    if (!existingChoice) {
      const scenarioData = getScenarioForDate(new Date());
      
      const { data: newChoice, error: insertError } = await supabase
        .from('daily_choices')
        .insert({
          date: today,
          scenario: scenarioData,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      existingChoice = newChoice;
    }

    // 3. Vérifier si l'utilisateur a déjà fait son choix aujourd'hui
    const { data: userChoice, error: userChoiceError } = await supabase
      .from('user_choices')
      .select('*')
      .eq('user_id', userId)
      .eq('daily_choice_id', existingChoice.id)
      .maybeSingle();

    if (userChoiceError && userChoiceError.code !== 'PGRST116') {
      throw userChoiceError;
    }

    // 4. Parser le scénario depuis JSONB
    const scenario = existingChoice.scenario as DailyScenario;

    return {
      success: true,
      dailyChoice: existingChoice,
      scenario,
      hasCompleted: !!userChoice,
      userChoice,
      dailyChoicesCount,
      dailyChoicesLimit: limits.dailyChoicesPerDay,
      canPlayToday,
    };
  } catch (error: any) {
    console.error('Erreur getTodayChoice:', error);
    return {
      success: false,
      dailyChoice: null,
      scenario: null,
      hasCompleted: false,
      userChoice: null,
      dailyChoicesCount: 0,
      dailyChoicesLimit: 1,
      canPlayToday: false,
      error: error.message,
    };
  }
};

/**
 * Soumet le choix de l'utilisateur
 */
export const submitChoice = async (
  userId: string,
  dailyChoiceId: string,
  choiceIndex: number
): Promise<UserChoiceResult> => {
  try {
    // 1. Récupérer le daily_choice
    const { data: dailyChoice, error: fetchError } = await supabase
      .from('daily_choices')
      .select('*')
      .eq('id', dailyChoiceId)
      .single();

    if (fetchError) throw fetchError;
    if (!dailyChoice) throw new Error('Choix du jour introuvable');

    // 2. Parser le scénario et récupérer les conséquences
    const scenario = dailyChoice.scenario as DailyScenario;
    
    if (!scenario || !scenario.choices || !Array.isArray(scenario.choices)) {
      throw new Error('Scénario mal formé');
    }
    
    const selectedChoice = scenario.choices[choiceIndex];

    if (!selectedChoice) {
      throw new Error('Index de choix invalide');
    }

    if (!selectedChoice.consequences) {
      throw new Error('Conséquences manquantes pour ce choix');
    }

    const consequences = selectedChoice.consequences;
    const explanation = selectedChoice.explanation;
    const lesson = scenario.lesson;

    // 3. Enregistrer le choix de l'utilisateur
    const { error: insertError } = await supabase.from('user_choices').insert({
      user_id: userId,
      daily_choice_id: dailyChoiceId,
      choice_index: choiceIndex,
      consequences: consequences,
      xp_gained: consequences.xp,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      // Si erreur UNIQUE constraint (déjà fait aujourd'hui)
      if (insertError.code === '23505') {
        throw new Error('Tu as déjà fait ton choix aujourd\'hui !');
      }
      throw insertError;
    }

    // 4. Attribuer les XP via xpService
    if (consequences.xp > 0) {
      await awardXP(userId, 'daily_choice');
    }

    // 5. Pour le MVP, virtualMoney et stats sont gérés localement dans le store
    // TODO: Ajouter colonnes virtual_money, discipline, creativity, prudence dans profiles

    return {
      success: true,
      consequences,
      explanation,
      lesson,
    };
  } catch (error: any) {
    console.error('Erreur submitChoice:', error);
    return {
      success: false,
      consequences: { money: 0, xp: 0 },
      explanation: '',
      lesson: { title: '', content: '', tips: [] },
      error: error.message,
    };
  }
};

/**
 * Récupère l'historique des choix d'un utilisateur (derniers 7 jours)
 */
export const getUserChoiceHistory = async (
  userId: string,
  limit: number = 7
): Promise<{
  success: boolean;
  history: any[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('user_choices')
      .select('*, daily_choices(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      history: data || [],
    };
  } catch (error: any) {
    console.error('Erreur getUserChoiceHistory:', error);
    return {
      success: false,
      history: [],
      error: error.message,
    };
  }
};

/**
 * Calcule les stats totales de l'utilisateur depuis ses choix
 */
export const calculateUserStats = (history: any[]): {
  totalMoney: number;
  discipline: number;
  creativity: number;
  prudence: number;
} => {
  const stats = {
    totalMoney: 0,
    discipline: 0,
    creativity: 0,
    prudence: 0,
  };

  history.forEach((choice) => {
    if (choice.consequences) {
      const consequences = choice.consequences;
      stats.totalMoney += consequences.money || 0;
      
      if (consequences.stats) {
        stats.discipline += consequences.stats.discipline || 0;
        stats.creativity += consequences.stats.creativity || 0;
        stats.prudence += consequences.stats.prudence || 0;
      }
    }
  });

  return stats;
};
