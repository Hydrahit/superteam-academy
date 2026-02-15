// lib/services/learning-progress.ts

/**
 * LEARNING PROGRESS SERVICE
 * 
 * Manages user progress, XP, streaks, and completion tracking
 * Includes achievement unlocking logic
 */

import { 
  CourseProgress, 
  StreakData, 
  LeaderboardEntry, 
  User,
  Achievement,
} from '@/lib/types/domain';

/**
 * Interface for Learning Progress Service
 * Both Mock and OnChain implementations use this contract
 */
export interface ILearningProgressService {
  /** Get user profile with all stats */
  getUserProfile(userId: string): Promise<User>;
  
  /** Get progress for a specific course */
  getProgress(userId: string, courseId: string): Promise<CourseProgress | null>;
  
  /** Mark a lesson as complete and award XP */
  completeLesson(userId: string, courseId: string, lessonId: string): Promise<void>;
  
  /** Get user's total XP */
  getXP(userId: string): Promise<number>;
  
  /** Get streak data */
  getStreak(userId: string): Promise<StreakData>;
  
  /** Get leaderboard rankings */
  getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]>;
  
  /** Check and unlock achievements */
  checkAchievements(userId: string): Promise<Achievement[]>;
  
  /** Update user's daily streak */
  updateStreak(userId: string): Promise<StreakData>;
}

/**
 * MOCK IMPLEMENTATION
 * 
 * Uses in-memory storage for development
 * Perfect for UI development without blockchain
 */
export class MockLearningProgressService implements ILearningProgressService {
  private users = new Map<string, User>();
  private progress = new Map<string, CourseProgress>();
  private streaks = new Map<string, StreakData>();
  
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUserProfile(userId: string): Promise<User> {
    await this.delay();
    
    if (!this.users.has(userId)) {
      const newUser: User = {
        id: userId,
        username: `Dev-${userId.substring(0, 4)}`,
        totalXp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: new Date().toISOString(),
        completedCourses: [],
        completedLessons: [],
        earnedCredentials: [],
        achievements: [],
        preferredLanguage: 'en',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.users.set(userId, newUser);
    }
    
    return this.users.get(userId)!;
  }

  async getProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
    await this.delay();
    const key = `${userId}-${courseId}`;
    return this.progress.get(key) || null;
  }

  async completeLesson(userId: string, courseId: string, lessonId: string): Promise<void> {
    await this.delay();
    const key = `${userId}-${courseId}`;
    
    // 1. Update Progress
    let userProgress = this.progress.get(key);
    
    if (!userProgress) {
      userProgress = {
        userId,
        courseId,
        percentComplete: 0,
        completedLessonIds: [],
        startedAt: new Date().toISOString(),
        status: 'in_progress',
        xpEarned: 0,
      };
    }

    // Idempotency check
    if (!userProgress.completedLessonIds.includes(lessonId)) {
      userProgress.completedLessonIds.push(lessonId);
      userProgress.lastAccessedLessonId = lessonId;
      userProgress.xpEarned += 50; // Mock XP per lesson
      this.progress.set(key, userProgress);
      
      // 2. Award XP & Update User
      const user = await this.getUserProfile(userId);
      user.totalXp += 50;
      user.level = Math.floor(Math.sqrt(user.totalXp / 100));
      user.lastActivityDate = new Date().toISOString();
      user.completedLessons.push(lessonId);
      
      // 3. Update streak
      await this.updateStreak(userId);
      
      // 4. Check for new achievements
      const newAchievements = await this.checkAchievements(userId);
      if (newAchievements.length > 0) {
        user.achievements.push(...newAchievements);
      }
      
      this.users.set(userId, user);
    }
  }

  async getXP(userId: string): Promise<number> {
    const user = await this.getUserProfile(userId);
    return user.totalXp;
  }

  async getStreak(userId: string): Promise<StreakData> {
    await this.delay();
    
    if (!this.streaks.has(userId)) {
      const streakData: StreakData = {
        currentStreak: 0,
        longestStreak: 0,
        lastCheckIn: new Date().toISOString(),
        history: [],
      };
      this.streaks.set(userId, streakData);
    }
    
    return this.streaks.get(userId)!;
  }

  async updateStreak(userId: string): Promise<StreakData> {
    const user = await this.getUserProfile(userId);
    let streakData = await this.getStreak(userId);
    
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = new Date(user.lastActivityDate).toISOString().split('T')[0];
    
    // Check if activity is today
    if (!streakData.history.includes(today)) {
      streakData.history.push(today);
      
      // Check if streak continues
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastActivity === yesterdayStr || lastActivity === today) {
        // Streak continues
        streakData.currentStreak++;
      } else {
        // Streak broken, start new
        streakData.currentStreak = 1;
      }
      
      // Update longest streak
      if (streakData.currentStreak > streakData.longestStreak) {
        streakData.longestStreak = streakData.currentStreak;
      }
      
      streakData.lastCheckIn = new Date().toISOString();
      this.streaks.set(userId, streakData);
      
      // Update user
      user.currentStreak = streakData.currentStreak;
      user.longestStreak = streakData.longestStreak;
      this.users.set(userId, user);
    }
    
    return streakData;
  }

  async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]> {
    await this.delay();
    
    const allUsers = Array.from(this.users.values());
    
    return allUsers
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, 100) // Top 100
      .map((u, index) => ({
        rank: index + 1,
        userId: u.id,
        username: u.username || 'Anonymous',
        totalXp: u.totalXp,
        level: u.level,
        avatarUrl: u.avatarUrl,
        completedCourses: u.completedCourses.length,
        achievements: u.achievements.length,
      }));
  }

  async checkAchievements(userId: string): Promise<Achievement[]> {
    const user = await this.getUserProfile(userId);
    const newAchievements: Achievement[] = [];
    
    // Define achievements to check
    const achievementChecks = [
      {
        id: 'first-lesson',
        title: 'First Steps',
        description: 'Complete your first lesson',
        category: 'lessons' as const,
        iconUrl: '/achievements/first-lesson.png',
        xpReward: 10,
        criteria: { type: 'lessons' as const, target: 1, description: 'Complete 1 lesson' },
        check: () => user.completedLessons.length >= 1,
      },
      {
        id: 'lesson-5',
        title: 'Getting Started',
        description: 'Complete 5 lessons',
        category: 'lessons' as const,
        iconUrl: '/achievements/lesson-5.png',
        xpReward: 25,
        criteria: { type: 'lessons' as const, target: 5, description: 'Complete 5 lessons' },
        check: () => user.completedLessons.length >= 5,
      },
      {
        id: 'lesson-10',
        title: 'Dedicated Learner',
        description: 'Complete 10 lessons',
        category: 'lessons' as const,
        iconUrl: '/achievements/lesson-10.png',
        xpReward: 50,
        criteria: { type: 'lessons' as const, target: 10, description: 'Complete 10 lessons' },
        check: () => user.completedLessons.length >= 10,
      },
      {
        id: 'first-course',
        title: 'Course Complete',
        description: 'Complete your first course',
        category: 'courses' as const,
        iconUrl: '/achievements/first-course.png',
        xpReward: 100,
        criteria: { type: 'courses' as const, target: 1, description: 'Complete 1 course' },
        check: () => user.completedCourses.length >= 1,
      },
      {
        id: 'xp-100',
        title: 'XP Hunter',
        description: 'Earn 100 XP',
        category: 'xp' as const,
        iconUrl: '/achievements/xp-100.png',
        xpReward: 10,
        criteria: { type: 'xp' as const, target: 100, description: 'Earn 100 XP' },
        check: () => user.totalXp >= 100,
      },
      {
        id: 'xp-500',
        title: 'XP Master',
        description: 'Earn 500 XP',
        category: 'xp' as const,
        iconUrl: '/achievements/xp-500.png',
        xpReward: 50,
        criteria: { type: 'xp' as const, target: 500, description: 'Earn 500 XP' },
        check: () => user.totalXp >= 500,
      },
      {
        id: 'streak-3',
        title: 'On Fire',
        description: 'Maintain a 3-day streak',
        category: 'streak' as const,
        iconUrl: '/achievements/streak-3.png',
        xpReward: 25,
        criteria: { type: 'streak' as const, target: 3, description: 'Maintain 3-day streak' },
        check: () => user.currentStreak >= 3,
      },
      {
        id: 'streak-7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        category: 'streak' as const,
        iconUrl: '/achievements/streak-7.png',
        xpReward: 75,
        criteria: { type: 'streak' as const, target: 7, description: 'Maintain 7-day streak' },
        check: () => user.currentStreak >= 7,
      },
    ];
    
    // Check which achievements should be unlocked
    for (const achievement of achievementChecks) {
      // Skip if already unlocked
      if (user.achievements.some(a => a.id === achievement.id)) {
        continue;
      }
      
      // Check if criteria met
      if (achievement.check()) {
        const unlockedAchievement: Achievement = {
          ...achievement,
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
        };
        
        newAchievements.push(unlockedAchievement);
        
        // Award XP for achievement
        user.totalXp += achievement.xpReward;
        user.level = Math.floor(Math.sqrt(user.totalXp / 100));
      }
    }
    
    if (newAchievements.length > 0) {
      this.users.set(userId, user);
    }
    
    return newAchievements;
  }
}
