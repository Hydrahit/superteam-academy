import HeroSection from './components/HeroSection';
import EcosystemStrip from './components/EcosystemStrip';
import BentoFeatures from './components/BentoFeatures';
import CoursesGrid from './components/CoursesGrid';
import LevelProgression from './components/LevelProgression';
import HowItWorks from './components/HowItWorks';
import LiveStats from './components/LiveStats';
import CallToAction from './components/CallToAction';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-[#14F195] selection:text-neutral-950 overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9945FF]/20 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#14F195]/10 blur-[150px] pointer-events-none z-0" />
      
      <div className="relative z-10">
        <HeroSection />
        <EcosystemStrip />
        <BentoFeatures />
        <CoursesGrid />
        <LevelProgression />
        <HowItWorks />
        <LiveStats />
        <CallToAction />
      </div>
    </main>
  );
}
