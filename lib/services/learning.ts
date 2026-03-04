import { UserProfile, Course, Enrollment, Achievement } from '../types/domain';

export class LearningProgressService {
  static calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100));
  }

  async getXpBalance(walletPubkey: string): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(2450), 400));
  }

  async getUserProfile(walletPubkey: string): Promise<UserProfile> {
    const xp = await this.getXpBalance(walletPubkey);
    return {
      id: walletPubkey,
      username: 'SolanaBuilder_99',
      totalXp: xp,
      level: LearningProgressService.calculateLevel(xp),
      streak: { current: 12, highest: 21, lastActive: new Date().toISOString() },
      joinDate: '2025-10-01',
    };
  }

  async getActiveEnrollments(walletPubkey: string): Promise<{ course: Course; enrollment: Enrollment }[]> {
    return [{
      course: {
        id: 'course_1', slug: 'anchor-dev', title: 'Anchor Development',
        description: 'Master the Anchor framework for Solana programs.',
        track: 'Programs', difficulty: 'Intermediate', estimatedHours: 18, totalXp: 900, totalLessons: 18
      },
      enrollment: {
        courseId: 'course_1', progressBitmap: 255, completedLessons: 8, isCompleted: false, lastAccessed: new Date().toISOString()
      }
    }];
  }

  async getCredentials(walletPubkey: string): Promise<Achievement[]> {
    return [{
      id: 'nft_1', typeId: 'type_1', title: 'First Steps',
      description: 'Completed your first lesson.',
      imageUrl: '/badges/first-steps.png', earnedAt: '2025-10-02'
    }];
  }
}

export const learningService = new LearningProgressService();
