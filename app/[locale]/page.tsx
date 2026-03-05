import { Navbar } from '@/src/components/layout/Navbar';
import { FeaturedHero } from '@/src/components/ui/FeaturedHero';
import { HorizontalRow } from '@/src/components/ui/HorizontalRow';
import { BentoStats } from '@/src/components/ui/BentoStats';

const MOCK_TRENDING = [
  { id: '1', title: 'Solana 101: The Kernel', difficulty: 'Beginner', xp: 100, duration: '2 Hrs' },
  { id: '2', title: 'Token Program Deep Dive', difficulty: 'Intermediate', xp: 300, duration: '4 Hrs' },
  { id: '3', title: 'Building a DEX UI', difficulty: 'Intermediate', xp: 250, duration: '3 Hrs' },
  { id: '4', title: 'Intro to Cryptography', difficulty: 'Beginner', xp: 150, duration: '1.5 Hrs' },
  { id: '5', title: 'NFT Minting Engine', difficulty: 'Intermediate', xp: 400, duration: '5 Hrs' },
];

const MOCK_PRO = [
  { id: '6', title: 'Anchor Framework Mastery', difficulty: 'Pro', xp: 800, duration: '8 Hrs' },
  { id: '7', title: 'Advanced SVM Internals', difficulty: 'Pro', xp: 1200, duration: '10 Hrs' },
  { id: '8', title: 'Security & Auditing', difficulty: 'Pro', xp: 1000, duration: '6 Hrs' },
  { id: '9', title: 'Cross-Program Invocations', difficulty: 'Pro', xp: 600, duration: '4 Hrs' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060608] selection:bg-[#14F195]/30">
      <Navbar />
      <FeaturedHero />
      
      <div className="relative z-20 -mt-10 bg-gradient-to-b from-transparent via-[#060608] to-[#060608]">
        <HorizontalRow title="Trending_Now" courses={MOCK_TRENDING} />
        <BentoStats />
        <HorizontalRow title="Pro_Architect_Path" courses={MOCK_PRO} />
      </div>
    </main>
  );
}
