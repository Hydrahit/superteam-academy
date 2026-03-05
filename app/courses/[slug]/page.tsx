import { StickyCourseHeader } from '@/src/components/course/StickyCourseHeader';
import { CurriculumAccordion } from '@/src/components/course/CurriculumAccordion';
import { Clock, ShieldAlert, Zap, ArrowLeft, Trophy, FileCode2 } from 'lucide-react';
import Link from 'next/link';

// Mock Data (In production, fetch via Supabase using the slug)
const COURSE_DATA = {
  title: 'Solana 101: The Kernel',
  slug: 'solana-101',
  description: 'Master the core architecture of the Solana blockchain. Learn about Proof of History, Sealevel runtime, and how to interact with the network using Web3.js.',
  difficulty: 'Beginner',
  duration: '2 Hrs',
  totalXp: 1500,
  prerequisites: ['Basic JavaScript', 'Terminal Navigation'],
  modules: [
    {
      id: 'm1', title: 'The Solana Engine',
      lessons: [
        { id: 'l1', title: 'What is Proof of History?', type: 'video' as const, xp: 100, isLocked: false, isCompleted: true },
        { id: 'l2', title: 'Connecting to Devnet', type: 'code' as const, xp: 200, isLocked: false },
      ]
    },
    {
      id: 'm2', title: 'Writing to the Blockchain',
      lessons: [
        { id: 'l3', title: 'Keypairs & Airdrops', type: 'code' as const, xp: 300, isLocked: true },
        { id: 'l4', title: 'Creating your first Transaction', type: 'code' as const, xp: 400, isLocked: true },
      ]
    },
    {
      id: 'm3', title: 'Proof of Build',
      lessons: [
        { id: 'l5', title: 'Final Challenge: Ping Program', type: 'code' as const, xp: 500, isLocked: true },
      ]
    }
  ]
};

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  // We use COURSE_DATA directly for the mock, but you would normally look it up via params.slug
  const course = COURSE_DATA;

  return (
    <main className="min-h-screen bg-[#060608] pb-32">
      <StickyCourseHeader title={course.title} xp={course.totalXp} slug={course.slug} />

      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#9945FF]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-8 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#14F195]/30 text-[#14F195] bg-[#14F195]/10 flex items-center gap-1">
              <ShieldAlert size={12} /> {course.difficulty}
            </span>
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10 text-neutral-400 bg-white/5 flex items-center gap-1">
              <Clock size={12} /> {course.duration}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-syne font-black text-white leading-tight tracking-tighter mb-6 max-w-4xl">
            {course.title}
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left: Curriculum */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-8">
            <FileCode2 className="text-[#9945FF]" size={28} />
            <h2 className="text-3xl font-syne font-bold text-white">Curriculum</h2>
          </div>
          <CurriculumAccordion modules={course.modules} courseSlug={course.slug} />
        </div>

        {/* Right: Floating Stats & Actions Card */}
        <aside className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-32 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#14F195]/10 border border-[#14F195]/20 mb-6">
            <Trophy size={32} className="text-[#14F195]" />
          </div>
          
          <h3 className="text-2xl font-syne font-bold text-white mb-2">Ready to Build?</h3>
          <p className="text-sm text-neutral-400 mb-8">Complete modules, submit your PR, and earn your on-chain credential.</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Total Reward</span>
              <span className="text-lg font-black italic text-[#FFE500] flex items-center gap-1"><Zap size={16} className="fill-current"/> {course.totalXp} XP</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Modules</span>
              <span className="text-sm font-bold text-white">{course.modules.length} Chapters</span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest mb-3">Prerequisites</h4>
            <div className="flex flex-wrap gap-2">
              {course.prerequisites.map(req => (
                <span key={req} className="px-2 py-1 bg-black/50 border border-white/5 rounded text-[10px] text-neutral-300 font-mono">
                  {req}
                </span>
              ))}
            </div>
          </div>

          <Link href={`/courses/${course.slug}/l1`} className="w-full py-4 bg-[#14F195] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(20,241,149,0.2)] flex items-center justify-center gap-2">
            <Play size={18} className="fill-current" /> Start_Building
          </Link>
        </aside>
      </div>
    </main>
  );
}
