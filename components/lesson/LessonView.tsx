// components/lesson/LessonView.tsx

'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Trophy, Loader2, BookOpen } from 'lucide-react';
import { Lesson } from '@/lib/types/domain';
import { getProgressService, analytics } from '@/lib/services';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserStore } from '@/lib/store/user';
import { CodeEditor } from './CodeEditor';
import { markdownComponents } from './MarkdownComponents';

interface LessonViewProps {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
  onComplete?: () => void;
}

export function LessonView({ lesson, courseId, isCompleted, onComplete }: LessonViewProps) {
  const { connected, publicKey } = useWallet();
  const { user, setUser } = useUserStore();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);
  const [showEditor, setShowEditor] = useState(lesson.type === 'challenge');

  const handleCompleteLesson = async () => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet to complete lessons');
      return;
    }

    try {
      setIsCompleting(true);

      const startTime = Date.now();

      // Call the progress service
      const progressService = getProgressService();
      await progressService.completeLesson(
        publicKey.toBase58(),
        courseId,
        lesson.id
      );

      // Update user profile to reflect new XP
      const updatedUser = await progressService.getUserProfile(publicKey.toBase58());
      setUser(updatedUser);

      // Mark as completed
      setCompleted(true);

      // Track analytics
      analytics.lessonCompleted(
        lesson.id,
        courseId,
        lesson.title,
        Date.now() - startTime,
        lesson.xpReward
      );

      // Check for new achievements
      const newAchievements = await progressService.checkAchievements(publicKey.toBase58());
      if (newAchievements.length > 0) {
        for (const achievement of newAchievements) {
          analytics.achievementUnlocked(
            achievement.id,
            achievement.title,
            achievement.xpReward
          );
        }
        alert(`🎉 New achievement unlocked: ${newAchievements[0].title}!`);
      }

      // Call optional callback
      if (onComplete) {
        onComplete();
      }

      // Show success message
      alert(`🎉 Lesson completed! +${lesson.xpReward} XP earned!`);
    } catch (error) {
      console.error('Failed to complete lesson:', error);
      alert('Failed to complete lesson. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Lesson Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={lesson.type === 'challenge' ? 'warning' : 'secondary'}>
                  {lesson.type}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>{lesson.xpReward} XP</span>
                </div>
                {lesson.estimatedMinutes && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{lesson.estimatedMinutes} min</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {lesson.title}
              </h1>
            </div>
            {completed && (
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lesson Content */}
      <Card>
        <CardContent className="p-8">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {lesson.contentMarkdown}
            </ReactMarkdown>
          </article>
        </CardContent>
      </Card>

      {/* Code Editor (for challenges) */}
      {lesson.type === 'challenge' && lesson.starterCode && lesson.testCases && (
        <CodeEditor
          initialCode={lesson.starterCode}
          language={lesson.language || 'typescript'}
          testCases={lesson.testCases}
          readOnly={false}
        />
      )}

      {/* Complete Lesson Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {completed ? (
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  You've completed this lesson
                </span>
              ) : (
                <span>Mark this lesson as complete to earn {lesson.xpReward} XP</span>
              )}
            </div>
            <Button
              size="lg"
              onClick={handleCompleteLesson}
              disabled={!connected || isCompleting || completed}
              className="gap-2"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : completed ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </>
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  Complete Lesson
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
