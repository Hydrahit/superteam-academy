import { AuthOrchestrator } from './AuthOrchestrator';
import { ProgressionEngine } from './ProgressionEngine';

export class CoreOrchestrator {
  async processLessonCompletion(userId: string, lessonData: any, auth: any) {
    // 1. Cryptographic Gateway check
    const isOwner = AuthOrchestrator.verifyWalletSignature(auth.wallet, auth.sig, auth.nonce);
    if (!isOwner) throw new Error("UNAUTHORIZED_BRAIN_ACCESS");

    // 2. Calculate Reward
    const reward = ProgressionEngine.calculateReward(lessonData.difficulty, auth.streak);
    
    // 3. Return payload for DB update
    return {
      userId,
      xpEarned: reward,
      timestamp: Date.now()
    };
  }
}