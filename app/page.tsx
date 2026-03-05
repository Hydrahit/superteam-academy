
import Link from 'next/link';
import { ArrowRight, Code, Shield, Trophy } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white font-['Bricolage_Grotesque'] overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00E5FF]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00FF94]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#060608]/50 backdrop-blur-md">
        <div className="font-['Syne'] font-bold text-2xl tracking-tighter text-[#00E5FF]">SUPERTEAM</div>
        <Link 
          href="/dashboard" 
          className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold transition-all"
        >
          Enter App
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
          <span className="text-xs font-['JetBrains_Mono'] tracking-widest uppercase text-white/60">Solana LMS 2.0 is Live</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-['Syne'] font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-8">
          Master Solana. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF94]">
            Build the Future.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 font-light">
          The ultimate platform to level up your Web3 development skills. Earn XP, climb the global leaderboard, and prove your knowledge on-chain.
        </p>

        <Link 
          href="/dashboard" 
          className="group relative px-8 py-4 bg-[#00FF94] text-black font-bold rounded-2xl text-lg hover:scale-105 transition-all flex items-center gap-3 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
        </Link>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-32 text-left">
          {[
            { icon: Code, title: "Interactive Coding", desc: "Write, test, and deploy Solana programs directly in your browser." },
            { icon: Shield, title: "On-Chain Verification", desc: "Your progress is secured and verified using Ed25519 signatures." },
            { icon: Trophy, title: "Global Leaderboard", desc: "Compete with developers worldwide and showcase your true rank." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <feature.icon className="w-10 h-10 text-[#00E5FF] mb-6" />
              <h3 className="text-xl font-bold font-['Syne'] mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
