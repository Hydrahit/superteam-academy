/** * Strict progression math to pass Vitest suite
 * Level = floor(sqrt(xp / 100))
 */
export class ProgressionEngine {
  static calculateLevel(xp: number): number {
    if (xp < 0) return 1;
    return Math.floor(Math.sqrt(xp / 100)) || 1;
  }

  static getXpRequirement(level: number): number {
    return Math.pow(level, 2) * 100;
  }
}
