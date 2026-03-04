export const ACHIEVEMENT_TYPES = {
  STREAK_7: { id: 'streak_7', title: 'Week Warrior', xp: 100, icon: '🔥' },
  FIRST_COURSE: { id: 'first_course', title: 'First Steps', xp: 250, icon: '🎓' },
  RUST_ROOKIE: { id: 'rust_rookie', title: 'Rust Rookie', xp: 500, icon: '🦀' }
};

export function checkAchievements(userData: any) {
  const earned = [];
  if (userData.streak >= 7) earned.push(ACHIEVEMENT_TYPES.STREAK_7);
  if (userData.completedCourses >= 1) earned.push(ACHIEVEMENT_TYPES.FIRST_COURSE);
  return earned;
}
