import { supabase } from './supabase';
import type { Battle, BattleType } from '@/types/battle.types';
import { getModuleById } from '@/data/modulesData';
import { DAILY_SCENARIOS } from '@/data/dailyScenarios';

/**
 * Service pour gérer les battles entre amis
 */

const BATTLE_EXPIRY_HOURS = 24;

export const createBattle = async (
  challengerId: string,
  opponentId: string,
  battleType: BattleType,
  moduleId?: string,
  scenarioId?: string
): Promise<{ success: boolean; battle?: Battle; error?: string }> => {
  if (challengerId === opponentId) return { success: false, error: 'Impossible de te défier toi-même' };

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + BATTLE_EXPIRY_HOURS);

  try {
    const { data, error } = await supabase
      .from('battles')
      .insert({
        challenger_id: challengerId,
        opponent_id: opponentId,
        battle_type: battleType,
        status: 'pending',
        module_id: moduleId || null,
        scenario_id: scenarioId || null,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, battle: data };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const acceptBattle = async (
  battleId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: battle, error: fetchErr } = await supabase
      .from('battles')
      .select('*')
      .eq('id', battleId)
      .eq('opponent_id', userId)
      .eq('status', 'pending')
      .single();

    if (fetchErr || !battle) return { success: false, error: 'Défi introuvable ou expiré' };

    const { error } = await supabase
      .from('battles')
      .update({ status: 'accepted' })
      .eq('id', battleId);

    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const rejectBattle = async (
  battleId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('battles')
      .update({ status: 'rejected' })
      .eq('id', battleId)
      .eq('opponent_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const getBattlesForUser = async (
  userId: string
): Promise<{ success: boolean; battles?: Battle[]; error?: string }> => {
  try {
    const { data: rows, error } = await supabase
      .from('battles')
      .select('*')
      .or(`challenger_id.eq.${userId},opponent_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    const ids = new Set<string>();
    (rows || []).forEach((b: any) => {
      ids.add(b.challenger_id);
      ids.add(b.opponent_id);
    });
    let profilesMap: Record<string, { id: string; username: string }> = {};
    if (ids.size > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', Array.from(ids));
      (profiles || []).forEach((p: any) => {
        profilesMap[p.id] = p;
      });
    }

    const battles = (rows || []).map((b: any) => ({
      ...b,
      challenger: profilesMap[b.challenger_id],
      opponent: profilesMap[b.opponent_id],
    }));

    return { success: true, battles };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const submitBattleQuizResult = async (
  battleId: string,
  userId: string,
  score: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: battle, error: fetchErr } = await supabase
      .from('battles')
      .select('*')
      .eq('id', battleId)
      .single();

    if (fetchErr || !battle) return { success: false, error: 'Battle introuvable' };
    if (battle.battle_type !== 'quiz') return { success: false, error: 'Type de battle incorrect' };
    if (battle.challenger_id !== userId && battle.opponent_id !== userId) {
      return { success: false, error: 'Tu ne participes pas à cette battle' };
    }

    const isChallenger = battle.challenger_id === userId;
    const updates: Record<string, any> = isChallenger
      ? { challenger_score: score }
      : { opponent_score: score };

    const { error: updateErr } = await supabase.from('battles').update(updates).eq('id', battleId);
    if (updateErr) throw updateErr;

    await supabase.from('battle_results').upsert(
      {
        battle_id: battleId,
        user_id: userId,
        score,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'battle_id,user_id' }
    );

    const { data: updated } = await supabase.from('battles').select('*').eq('id', battleId).single();
    if (updated?.challenger_score != null && updated?.opponent_score != null) {
      const winner =
        updated.challenger_score > updated.opponent_score
          ? battle.challenger_id
          : updated.opponent_score > updated.challenger_score
            ? battle.opponent_id
            : null;
      await supabase
        .from('battles')
        .update({ status: 'completed', winner_id: winner, completed_at: new Date().toISOString() })
        .eq('id', battleId);
    } else {
      await supabase.from('battles').update({ status: 'in_progress' }).eq('id', battleId);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const submitBattleChoiceResult = async (
  battleId: string,
  userId: string,
  walletFinal: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: battle, error: fetchErr } = await supabase
      .from('battles')
      .select('*')
      .eq('id', battleId)
      .single();

    if (fetchErr || !battle) return { success: false, error: 'Battle introuvable' };
    if (battle.battle_type !== 'choice') return { success: false, error: 'Type de battle incorrect' };
    if (battle.challenger_id !== userId && battle.opponent_id !== userId) {
      return { success: false, error: 'Tu ne participes pas à cette battle' };
    }

    const isChallenger = battle.challenger_id === userId;
    const updates: Record<string, any> = isChallenger
      ? { challenger_wallet_final: walletFinal }
      : { opponent_wallet_final: walletFinal };

    const { error: updateErr } = await supabase.from('battles').update(updates).eq('id', battleId);
    if (updateErr) throw updateErr;

    await supabase.from('battle_results').upsert(
      {
        battle_id: battleId,
        user_id: userId,
        wallet_start: 2000,
        wallet_final: walletFinal,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'battle_id,user_id' }
    );

    const { data: updated } = await supabase.from('battles').select('*').eq('id', battleId).single();
    if (updated?.challenger_wallet_final != null && updated?.opponent_wallet_final != null) {
      const c = updated.challenger_wallet_final;
      const o = updated.opponent_wallet_final;
      const winner = c > o ? battle.challenger_id : o > c ? battle.opponent_id : null;
      await supabase
        .from('battles')
        .update({ status: 'completed', winner_id: winner, completed_at: new Date().toISOString() })
        .eq('id', battleId);
    } else {
      await supabase.from('battles').update({ status: 'in_progress' }).eq('id', battleId);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const getBattleById = async (
  battleId: string
): Promise<{ success: boolean; battle?: Battle; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .eq('id', battleId)
      .single();

    if (error) throw error;
    if (!data) return { success: false };

    const ids = [data.challenger_id, data.opponent_id];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, username')
      .in('id', ids);
    const profilesMap: Record<string, any> = {};
    (profiles || []).forEach((p: any) => {
      profilesMap[p.id] = p;
    });

    const battle = {
      ...data,
      challenger: profilesMap[data.challenger_id],
      opponent: profilesMap[data.opponent_id],
    };

    return { success: true, battle };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

export const getModuleForBattle = (moduleId: string) => {
  const mod = getModuleById(moduleId);
  return mod;
};

export const getScenarioForBattle = (scenarioId: string) => {
  return DAILY_SCENARIOS.find((s) => s.id === scenarioId) || DAILY_SCENARIOS[0];
};

export const getRandomScenario = () => {
  return DAILY_SCENARIOS[Math.floor(Math.random() * DAILY_SCENARIOS.length)];
};
