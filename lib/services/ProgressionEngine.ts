export class ProgressionEngine {
  private static BASE_XP = 100;

  /**
   * Formula: XP = sum(Difficulty * Base) + StreakMultiplier
   */
  static calculateReward(difficulty: number, streak: number): number {
    const streakBonus = streak >= 7 ? 1.5 : (streak >= 3 ? 1.2 : 1);
    const xp = (difficulty * this.BASE_XP) * streakBonus;
    return Math.floor(xp);
  }

  static getLevel(totalXp: number): number {
    // Inverse of our level formula
    return Math.floor(Math.sqrt(totalXp / 100)) || 1;
  }
}