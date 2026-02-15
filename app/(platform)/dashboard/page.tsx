// app/(platform)/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, BookOpen, Award, Loader2, ArrowRight } from 'lucide-react';
import { useUserStore } from '@/lib/store/user';
import { getCourseService, getProgressService, getAnalyticsService } from '@/lib/services';
import { Course } from '@/lib/types/domain';
import { formatXP, levelProgress, xpForNextLevel, getDifficultyVariant, formatDuration } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const { user, isLoading } = useUserStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    // Redirect if not connected
    if (!connected && !isLoading) {
      router.push('/');
      return;
    }

    // Track page view
    const analytics = getAnalyticsService();
    analytics.pageView('/dashboard', 'Dashboard');

    // Load courses
    async function loadData() {
      try {
        const courseService = getCourseService();
        const allCourses = await courseService.getAllCourses();
        setCourses(allCourses);
      } finally {
        setLoadingCourses(false);
      }
    }

    if (connected) {
      loadData();
    }
  }, [connected, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="container flex min-h-[600px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const progress = levelProgress(user.totalXp);
  const nextLevelXp = xpForNextLevel(user.level);

  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back, {user.username || 'Developer'}!
        </h1>
        <p className="text-muted-foreground">
          Continue your journey to mastering Solana development.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatXP(user.totalXp)}</div>
            <p className="text-xs text-muted-foreground">
              {formatXP(nextLevelXp - user.totalXp)} XP to level {user.level + 1}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {user.level}</div>
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep learning daily!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Available Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Available Courses</h2>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>
          <Link href="/courses">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loadingCourses ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => {
              const isCompleted = user.completedCourses.includes(course.id);
              
              return (
                <Link key={course.id} href={`/courses/${course.slug}`}>
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getDifficultyVariant(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                        {isCompleted && (
                          <Badge variant="success" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                        </span>
                        <Badge variant="secondary" className="gap-1">
                          <Trophy className="h-3 w-3" />
                          {course.xpReward} XP
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Achievements */}
      {user.achievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {user.achievements.slice(-4).reverse().map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 text-4xl">{achievement.iconUrl || '🏆'}</div>
                  <CardTitle className="text-sm">{achievement.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {achievement.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
