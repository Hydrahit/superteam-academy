'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle, Circle, PlayCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  order: number;
  duration: number;
  completed: boolean;
}

interface LessonSidebarProps {
  courseSlug: string;
  courseTitle: string;
  lessons: Lesson[];
  currentLessonId: string;
}

export default function LessonSidebar({ courseSlug, courseTitle, lessons, currentLessonId }: LessonSidebarProps) {
  return (
    <aside className="w-80 shrink-0 border-r border-white/10 bg-white/[0.02] h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-white/10">
        <Link href={`/courses/${courseSlug}`} className="text-xs text-white/40 hover:text-[#00C896] transition-colors">
          &larr; Back to course
        </Link>
        <h2 className="text-lg font-display font-bold text-white mt-2 line-clamp-2">{courseTitle}</h2>
        <p className="text-xs text-white/40 mt-1">
          {lessons.filter((l) => l.completed).length}/{lessons.length} completed
        </p>
      </div>
      <nav className="p-4 space-y-1">
        {lessons.map((lesson) => {
          const isActive = lesson.id === currentLessonId;
          return (
            <Link
              key={lesson.id}
              href={`/courses/${courseSlug}/lessons/${lesson.id}`}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {lesson.completed ? (
                <CheckCircle className="w-5 h-5 text-[#00C896] shrink-0" />
              ) : isActive ? (
                <PlayCircle className="w-5 h-5 text-[#00C896] shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-white/20 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">
                  {lesson.order}. {lesson.title}
                </p>
                <p className="text-xs text-white/30">{lesson.duration} min</p>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
