export type AuthStage = 'unauthenticated' | 'wallet_only' | 'google_only' | 'fully_linked';

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl?: string;
  totalXp: number;
  level: number;
  streak: { current: number; highest: number; lastActive: string; };
  joinDate: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  track: 'Fundamentals' | 'DeFi' | 'Security' | 'Full Stack';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedHours: number;
  totalXp: number;
  totalLessons: number;
}

export interface Enrollment {
  courseId: string;
  progressBitmap: number;
  completedLessons: number;
  isCompleted: boolean;
  lastAccessed: string;
}

export interface Achievement {
  id: string;
  typeId: string;
  title: string;
  description: string;
  imageUrl: string;
  earnedAt: string;
}
