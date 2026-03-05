export class LearningProgressService {
  static calculateLevel(xp: number): number { return Math.max(1, Math.floor(Math.sqrt(xp / 100))); }
  static async getProgress(wallet: string) {
    if (typeof window === 'undefined') return { xp: 0, level: 1, streak: 0 };
    const xp = parseInt(localStorage.getItem(`xp_${wallet}`) || '0');
    return { xp, level: this.calculateLevel(xp), streak: parseInt(localStorage.getItem(`streak_${wallet}`) || '0') };
  }
  static async completeLesson(wallet: string) {
    const current = await this.getProgress(wallet);
    const newXp = current.xp + 100;
    localStorage.setItem(`xp_${wallet}`, newXp.toString());
    localStorage.setItem(`streak_${wallet}`, (current.streak + 1).toString());
    return { success: true, newXp, newLevel: this.calculateLevel(newXp) };
  }
}
