import { supabase } from '@/src/infrastructure/supabase/client';
import { AuthOrchestrator } from './AuthOrchestrator';

export class BrainBridge {
  /**
   * Securely bridges the frontend action to the Database RPC.
   * This is the ONLY way to update XP in the system.
   */
  static async secureCompleteLesson(payload: {
    userId: string;
    lessonId: string;
    difficulty: number;
    auth: { wallet: string; sig: string; nonce: string };
  }) {
    // 1. Cryptographic Gateway Verification (Lead Architect Requirement)
    const isVerified = AuthOrchestrator.verifyWalletSignature(
      payload.auth.wallet,
      payload.auth.sig,
      payload.auth.nonce
    );

    if (!isVerified) {
      throw new Error("SECURE_BRIDGE_VIOLATION: Invalid Cryptographic Signature");
    }

    // 2. Trigger the Atomic SQL Function (The Fortress)
    // We use Supabase RPC to call 'complete_lesson_atomic'
    const { data, error } = await supabase.rpc('complete_lesson_atomic', {
      p_user_id: payload.userId,
      p_lesson_id: payload.lessonId,
      p_difficulty: payload.difficulty,
      p_base_xp: 100
    });

    if (error) {
      console.error("Database Bridge Error:", error.message);
      return { success: false, error: error.message };
    }

    // data returns the reward amount calculated by the DB logic
    return { 
      success: true, 
      xpEarned: data,
      message: data > 0 ? "XP_AWARDED_SUCCESSFULLY" : "LESSON_ALREADY_COMPLETED"
    };
  }
}