import { supabase } from "@/infrastructure/supabase/client";

export interface ProgressionResult {
  success: boolean;
  newXp: number;
  newLevel: number;
  error?: string;
}

export class SupabaseProgressService {
  /**
   * Submits proof of lesson completion to the backend.
   * NEVER sends raw XP amounts from the client.
   */
  static async completeLesson(
    walletAddress: string,
    lessonId: string,
    proofTxId?: string,
  ): Promise<ProgressionResult> {
    try {
      // Calling the secure PostgreSQL RPC
      const { data, error } = await supabase.rpc("verify_and_reward_lesson", {
        p_wallet: walletAddress,
        p_lesson_id: lessonId,
        p_proof_tx: proofTxId || null,
      });

      if (error) throw new Error(error.message);

      return {
        success: true,
        newXp: data.total_xp,
        newLevel: data.current_level,
      };
    } catch (error: any) {
      return { success: false, newXp: 0, newLevel: 0, error: error.message };
    }
  }

  /**
   * Fetches the current synchronized state directly from the DB
   */
  static async getUserState(walletAddress: string) {
    const { data, error } = await supabase.rpc("get_user_stats", {
      p_wallet: walletAddress,
    });
    if (error) throw error;
    return data;
  }
}
