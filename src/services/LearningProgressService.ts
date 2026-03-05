export class LearningProgressService {
  static calculateLevel(xp: number): number { return Math.max(1, Math.floor(Math.sqrt(xp / 100))); }
  async getXpBalance(wallet: string) { return 2450; }
  async getStreakData(wallet: string) { return { currentStreak: 7 }; }
}
export const progressService = new LearningProgressService();