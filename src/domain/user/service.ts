import { ProgressionEngine } from './progression';

export class LearningService {
  /**
   * Fetches user data and calculates on-chain state
   */
  async getUserState(walletAddress: string) {
    // This will eventually call infrastructure/web3
    const mockXp = 2500; 
    return {
      xp: mockXp,
      level: ProgressionEngine.getLevel(mockXp),
      progress: ProgressionEngine.getProgress(mockXp)
    };
  }
}
