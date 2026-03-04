/**
 * progression.ts - The core math of the platform
 * Level = floor(sqrt(xp / 100))
 */
export class ProgressionEngine {
  static getLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100)) || 1;
  }

  static getXpForLevel(level: number): number {
    return Math.pow(level, 2) * 100;
  }

  static getProgress(xp: number) {
    const currentLevel = this.getLevel(xp);
    const nextLevel = currentLevel + 1;
    const minXp = this.getXpForLevel(currentLevel);
    const maxXp = this.getXpForLevel(nextLevel);
    
    return {
      percent: ((xp - minXp) / (maxXp - minXp)) * 100,
      xpToNext: maxXp - xp
    };
  }
}
