import { Hero } from '@/src/components/ui/Hero';
import { CourseCard } from '@/src/components/ui/CourseCard';

export default function CoursesPage() {
  const trending = [
    { title: "Solana 101: The Kernel", difficulty: "Beginner", xp: 100, tags: ["SVM", "BASICS"] },
    { title: "Rust for Rustaceans", difficulty: "Intermediate", xp: 250, tags: ["RUST", "MEMORY"] },
    { title: "Anchor Framework Masterclass", difficulty: "Pro", xp: 500, tags: ["SMART-CONTRACTS", "SECURITY"] }
  ];

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <Hero />
      <div className="px-12 -mt-20 relative z-30 pb-20">
        <h2 className="text-sm font-mono font-bold uppercase tracking-[0.5em] text-white/40 mb-8">
          Trending_Now
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {trending.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </div>
    </main>
  );
}
