'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import LessonSidebar from '@/components/courses/LessonSidebar';
import QuizModal from '@/components/courses/QuizModal';
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle } from 'lucide-react';

interface LessonData {
  id: string;
  title: string;
  content: string;
  order: number;
  duration: number;
  videoUrl?: string;
  completed: boolean;
  quiz: {
    id: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
  } | null;
}

interface CourseData {
  title: string;
  slug: string;
  lessons: {
    id: string;
    title: string;
    order: number;
    duration: number;
    completed: boolean;
  }[];
}

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/courses/${slug}/lessons/${lessonId}`).then((r) => r.json()),
      fetch(`/api/courses/${slug}`).then((r) => r.json()),
    ])
      .then(([lessonData, courseData]) => {
        setLesson(lessonData.lesson || null);
        setCourse(courseData.course || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, lessonId]);

  const handleComplete = async () => {
    if (!session || !lesson) return;
    setCompleting(true);
    try {
      const res = await fetch(`/api/courses/${slug}/lessons/${lessonId}/complete`, { method: 'POST' });
      if (res.ok) {
        setLesson((prev) => prev ? { ...prev, completed: true } : prev);
        if (course) {
          setCourse((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              lessons: prev.lessons.map((l) => l.id === lessonId ? { ...l, completed: true } : l),
            };
          });
        }
      }
    } finally {
      setCompleting(false);
    }
  };

  const handleQuizComplete = async (score: number, total: number) => {
    if (score >= total * 0.7) {
      await handleComplete();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="w-80 border-r border-white/10 animate-pulse bg-white/[0.02]" />
        <div className="flex-1 p-12 animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded-lg w-1/2" />
          <div className="h-4 bg-white/10 rounded-lg w-3/4" />
          <div className="h-64 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40 text-lg">Lesson not found.</p>
      </div>
    );
  }

  const currentIdx = course.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? course.lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < course.lessons.length - 1 ? course.lessons[currentIdx + 1] : null;

  return (
    <div className="flex min-h-screen">
      <LessonSidebar
        courseSlug={slug}
        courseTitle={course.title}
        lessons={course.lessons}
        currentLessonId={lessonId}
      />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-white/30 font-mono">Lesson {lesson.order}</span>
            {lesson.completed && (
              <span className="flex items-center gap-1 text-xs text-[#00C896]">
                <CheckCircle className="w-3.5 h-3.5" /> Completed
              </span>
            )}
          </div>

          <h1 className="text-3xl font-display font-bold text-white mb-8">{lesson.title}</h1>

          {lesson.videoUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black">
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <article className="prose prose-invert prose-lg max-w-none mb-12 text-white/70 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </article>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-12">
            {lesson.quiz && !lesson.completed && (
              <button
                onClick={() => setQuizOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#00C896] text-white font-bold hover:opacity-90 transition-opacity"
              >
                <HelpCircle className="w-5 h-5" /> Take Quiz
              </button>
            )}
            {!lesson.completed && !lesson.quiz && (
              <button
                onClick={handleComplete}
                disabled={completing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C896] text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" /> {completing ? 'Marking...' : 'Mark as Complete'}
              </button>
            )}
          </div>

          {/* Prev/Next nav */}
          <div className="flex justify-between pt-8 border-t border-white/10">
            {prevLesson ? (
              <button
                onClick={() => router.push(`/courses/${slug}/lessons/${prevLesson.id}`)}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <p className="text-xs text-white/30">Previous</p>
                  <p className="text-sm font-medium">{prevLesson.title}</p>
                </div>
              </button>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <button
                onClick={() => router.push(`/courses/${slug}/lessons/${nextLesson.id}`)}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs text-white/30">Next</p>
                  <p className="text-sm font-medium">{nextLesson.title}</p>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </main>

      {lesson.quiz && (
        <QuizModal
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          questions={lesson.quiz.questions}
          lessonTitle={lesson.title}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
