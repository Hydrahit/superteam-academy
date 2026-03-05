export class LearningProgressService {
  static calculateLevel(xp: number): number { 
    return Math.max(1, Math.floor(Math.sqrt(xp / 100))); 
  }

  async getXpBalance(wallet: string): Promise<number> {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem(`xp_${wallet}`) || '0', 10);
  }

  async getStreakData(wallet: string): Promise<{ currentStreak: number }> {
    if (typeof window === 'undefined') return { currentStreak: 0 };
    const data = localStorage.getItem(`streak_${wallet}`);
    return data ? JSON.parse(data) : { currentStreak: 0 };
  }

  async completeLesson(wallet: string, courseId: string, lessonIndex: number) {
    const currentXp = await this.getXpBalance(wallet);
    const newXp = currentXp + 100;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(`xp_${wallet}`, newXp.toString());
      localStorage.setItem(`streak_${wallet}`, JSON.stringify({ currentStreak: 7 })); // Mock streak
    }
    
    return { success: true, newXp, newLevel: LearningProgressService.calculateLevel(newXp) };
  }
}

// Critical Fix: Explicitly exporting the instance
export const progressService = new LearningProgressService();