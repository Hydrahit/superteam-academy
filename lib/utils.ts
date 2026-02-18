// lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format XP with thousands separator
 */
export function formatXP(xp: number): string {
  return xp.toLocaleString('en-US');
}

/**
 * Calculate level from XP (using square root formula)
 * Level 0: 0-99 XP
 * Level 1: 100-399 XP
 * Level 2: 400-899 XP
 * etc.
 * Negative XP is clamped to 0 before calculation.
 */
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100));
}

/**
 * Calculate XP needed for next level
 */
export function xpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel + 1, 2) * 100;
}

/**
 * Calculate progress percentage towards next level
 */
export function levelProgress(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  const currentLevelXp = Math.pow(currentLevel, 2) * 100;
  const nextLevelXp = xpForNextLevel(currentLevel);
  const progressXp = currentXp - currentLevelXp;
  const requiredXp = nextLevelXp - currentLevelXp;

  return Math.min(Math.floor((progressXp / requiredXp) * 100), 100);
}

/**
 * Truncate wallet address for display
 * Example: "Abc123...xyz789"
 */
export function truncateAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2) {
    return address;
  }
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format duration in minutes to human-readable string
 * Example: 120 → "2h", 90 → "1h 30m", 45 → "45m"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Format date to relative time
 * Example: "2 hours ago", "3 days ago"
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

/**
 * Check if a string is a valid Solana address (base58, 32–44 chars)
 */
export function isValidSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

/**
 * Get Tailwind text-color class for a difficulty level
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'text-green-500';
    case 'intermediate':
      return 'text-yellow-500';
    case 'advanced':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

/**
 * Get shadcn Badge variant for a difficulty level
 */
export function getDifficultyVariant(
  difficulty: string
): 'success' | 'warning' | 'destructive' | 'default' {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'destructive';
    default:
      return 'default';
  }
}
