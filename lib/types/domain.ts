// lib/types/domain.ts

/**
 * SUPERTEAM ACADEMY - DOMAIN TYPES
 * 
 * Complete type definitions for the learning platform
 * Includes: Users, Courses, Lessons, Progress, Achievements, Credentials
 */

/**
 * Supported difficulty levels for courses and lessons
 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Supported languages for i18n
 */
export type Locale = 'en' | 'pt-br' | 'es';

/**
 * Lesson types
 */
export type LessonType = 'reading' | 'video' | 'challenge';

/**
 * Achievement categories
 */
export type AchievementCategory = 
  | 'courses'      // Complete X courses
  | 'lessons'      // Complete X lessons
  | 'xp'           // Earn X XP
  | 'streak'       // Maintain X day streak
  | 'speed'        // Complete course in X time
  | 'perfect'      // Complete without errors
  | 'social';      // Share/refer achievements

/**
 * Core User entity with gamification stats
 */
export interface User {
  id: string;                       // Wallet Public Key
  username?: string;
  email?: string;
  avatarUrl?: string;
  totalXp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;        // ISO Date
  completedCourses: string[];       // Course IDs
  completedLessons: string[];       // Lesson IDs
  earnedCredentials: Credential[];  // NFT credentials
  achievements: Achievement[];      // Unlocked achievements
  preferredLanguage: Locale;
  createdAt: string;
  updatedAt: string;
}

/**
 * Course entity - represents a complete learning module
 */
export interface Course {
  id: string;
  slug: string;
  title: string;                    // Translatable
  description: string;              // Translatable
  difficulty: Difficulty;
  durationMinutes: number;
  xpReward: number;
  modules: CourseModule[];
  coverImageUrl: string;
  language: Locale;
  prerequisites: string[];          // Course IDs
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Course module - groups related lessons
 */
export interface CourseModule {
  id: string;
  title: string;                    // Translatable
  description?: string;
  lessons: Lesson[];
  order: number;
}

/**
 * Lesson entity - individual learning unit
 */
export interface Lesson {
  id: string;
  title: string;                    // Translatable
  type: LessonType;
  contentMarkdown: string;          // Translatable
  xpReward: number;
  estimatedMinutes: number;
  order: number;
  
  // Challenge-specific fields
  starterCode?: string;
  solution?: string;
  testCases?: TestCase[];
  language?: string;                // Programming language (typescript, rust, etc.)
  
  // Video-specific fields
  videoUrl?: string;
  videoDuration?: number;
  
  // Metadata
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Test case for code challenges
 */
export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;                // Hidden test cases for validation
  description?: string;
}

/**
 * User progress for a specific course
 */
export interface CourseProgress {
  userId: string;
  courseId: string;
  percentComplete: number;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  startedAt: string;
  completedAt?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  xpEarned: number;
}

/**
 * User's daily activity streak data
 */
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string;              // ISO Date
  history: string[];                // Array of ISO dates with activity
  streakStartDate?: string;
}

/**
 * Leaderboard entry for rankings
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  totalXp: number;
  level: number;
  completedCourses: number;
  achievements: number;
}

/**
 * Achievement entity - gamification badges
 */
export interface Achievement {
  id: string;
  title: string;                    // Translatable
  description: string;              // Translatable
  category: AchievementCategory;
  iconUrl: string;
  xpReward: number;
  
  // Unlock criteria
  criteria: AchievementCriteria;
  
  // User-specific data
  isUnlocked?: boolean;
  unlockedAt?: string;              // ISO Date
  progress?: number;                // 0-100 for multi-step achievements
}

/**
 * Achievement unlock criteria
 */
export interface AchievementCriteria {
  type: AchievementCategory;
  target: number;                   // e.g., complete 5 courses, earn 1000 XP
  description: string;
}

/**
 * On-chain credential (NFT)
 */
export interface Credential {
  id: string;
  mintAddress: string;              // Solana NFT mint address
  courseId: string;
  courseName: string;
  issuedAt: string;                 // ISO Date
  metadataUri: string;              // IPFS or Arweave URI
  imageUri: string;
  attributes: CredentialAttribute[];
}

/**
 * NFT metadata attributes
 */
export interface CredentialAttribute {
  trait_type: string;
  value: string | number;
}

/**
 * Analytics event for tracking user behavior
 */
export interface AnalyticsEvent {
  event: string;
  userId?: string;
  properties: Record<string, any>;
  timestamp: string;
}

/**
 * Code submission for challenges
 */
export interface CodeSubmission {
  id: string;
  userId: string;
  lessonId: string;
  code: string;
  language: string;
  submittedAt: string;
  result?: SubmissionResult;
}

/**
 * Code submission result
 */
export interface SubmissionResult {
  success: boolean;
  passedTests: number;
  totalTests: number;
  executionTime: number;            // milliseconds
  errors?: string[];
  output?: string;
}

/**
 * User preferences
 */
export interface UserPreferences {
  userId: string;
  language: Locale;
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  soundEffects: boolean;
  autoSave: boolean;
}

/**
 * Course statistics
 */
export interface CourseStats {
  courseId: string;
  totalEnrollments: number;
  totalCompletions: number;
  averageRating: number;
  averageCompletionTime: number;   // minutes
  completionRate: number;           // percentage
}

/**
 * Platform statistics
 */
export interface PlatformStats {
  totalUsers: number;
  totalCourses: number;
  totalLessons: number;
  totalXpAwarded: number;
  totalCredentialsIssued: number;
  activeUsersToday: number;
  activeUsersThisWeek: number;
}
