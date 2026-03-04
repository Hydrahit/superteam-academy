import { UserProfile, Course, Enrollment, Achievement } from '../types/domain';

export class LearningProgressService {
  static calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100));
  }

  // Real API Fetch
  async getAllCourses(): Promise<Course[]> {
    const res = await fetch('/api/courses');
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  }

  // Get XP directly from Solana (Stubbed for now, but ready for @solana/web3.js)
  async getXpBalance(walletPubkey: string): Promise<number> {
    console.log(`Fetching Token-2022 balance for ${walletPubkey}`);
    return 2450; 
  }

  async getUserProfile(walletPubkey: string): Promise<UserProfile> {
    const xp = await this.getXpBalance(walletPubkey);
    return {
      id: walletPubkey,
      username: 'Om_Dubey',
      totalXp: xp,
      level: LearningProgressService.calculateLevel(xp),
      streak: { current: 15, highest: 30, lastActive: new Date().toISOString() },
      joinDate: '2026-01-08',
    };
  }
}

export const learningService = new LearningProgressService();
