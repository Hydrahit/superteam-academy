#!/bin/bash

echo "🚀 DEPLOYING ELITE i18n ROUTING ARCHITECTURE..."

# 1. Create the Centralized Navigation Wrapper
echo "✍️ Writing lib/navigation.ts..."
cat << 'EOF' > lib/navigation.ts
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'pt'] as const;

// This creates smart versions of Link and useRouter that ALWAYS remember the user's language
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
EOF

# 2. Update Navbar to use the Elite Router
echo "✍️ Updating components/layout/Navbar.tsx..."
cat << 'EOF' > components/layout/Navbar.tsx
'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Wallet, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
// FIX: Using our smart centralized router instead of next/navigation
import { useRouter } from '@/lib/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { user, bindWallet, isWalletConnected } = useAuth();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  return (
    <motion.nav className={cn(
      "fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300", 
      scrolled ? "bg-[#060608]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="flex items-center gap-6">
        {/* Smart router automatically knows to go to /en or /es */}
        <button onClick={() => router.push('/')} className="text-white/50 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => router.push('/')} className="text-xl font-syne font-black text-white italic tracking-tighter hover:scale-105 transition-transform">
          SUPERTEAM<span className="text-[#14F195]">ACADEMY</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button 
          onClick={bindWallet} 
          className={cn(
            "px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 border transition-all", 
            isWalletConnected 
              ? "bg-[#14F195]/10 border-[#14F195]/50 text-[#14F195]" 
              : "bg-white/5 border-white/20 text-white hover:border-[#14F195] hover:shadow-[0_0_15px_rgba(20,241,149,0.3)]"
          )}
        >
          <Wallet size={14} /> {isWalletConnected ? 'Wallet_Linked' : 'Bind_Wallet'}
        </button>
      </div>
    </motion.nav>
  );
};
EOF

# 3. Update CourseRow to use the Elite Router
echo "✍️ Updating components/ui/CourseRow.tsx..."
cat << 'EOF' > components/ui/CourseRow.tsx
'use client';
import { motion } from 'framer-motion';
// FIX: Using our smart centralized router
import { useRouter } from '@/lib/navigation';
import { PlayCircle, Zap } from 'lucide-react';

export const CourseRow = ({ title, courses }: { title: string, courses: any[] }) => {
  const router = useRouter();

  return (
    <div className="pl-12 py-8 group">
      <h2 className="text-2xl font-syne font-bold text-white mb-6">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {courses.map(course => (
          <motion.div 
            key={course.id} 
            whileHover={{ scale: 1.05, y: -5, zIndex: 10 }} 
            whileTap={{ scale: 0.98 }}
            // FIX: Clean path. The smart router auto-prepends the correct language!
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="relative flex-none w-[320px] h-[180px] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:border-[#14F195]/50 transition-colors"
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black to-transparent z-10">
              <h3 className="text-white font-bold text-lg font-syne leading-tight">{course.title}</h3>
            </div>
            
            <div className="absolute inset-0 bg-[#0C0C10]/95 p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-between backdrop-blur-sm">
               <div>
                 <p className="text-sm text-neutral-300 line-clamp-2">{course.desc || 'Master this course on Solana.'}</p>
                 <span className="flex items-center gap-1 text-[#14F195] font-bold mt-3 text-xs uppercase tracking-widest"><Zap size={14}/> +{course.xp || 500} XP</span>
               </div>
               <button className="w-full py-2 bg-white text-black text-xs font-black uppercase rounded hover:bg-[#14F195] transition-colors flex items-center justify-center gap-2">
                 <PlayCircle size={16} /> Enter Course
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
EOF

# 4. Update CourseCard (If it exists in your catalog)
if [ -f "src/components/catalog/CatalogCard.tsx" ]; then
echo "✍️ Updating src/components/catalog/CatalogCard.tsx..."
cat << 'EOF' > src/components/catalog/CatalogCard.tsx
'use client';
import { motion } from 'framer-motion';
import { Clock, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
// FIX: Using smart Link
import { Link } from '@/lib/navigation';

interface CatalogCardProps {
  slug: string; title: string; difficulty: string; xp: number; duration: string; tags: string[];
}

export const CatalogCard = ({ slug, title, difficulty, xp, duration, tags }: CatalogCardProps) => {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="group flex flex-col justify-between h-[320px] bg-white/5 border border-white/10 rounded-[32px] p-6 hover:bg-white/10 transition-colors backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0"><ArrowUpRight className="text-[#14F195]" size={24} /></div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#14F195]/30 text-[#14F195] bg-[#14F195]/10">{difficulty}</span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-white/50"><Clock size={12} /> {duration}</span>
        </div>
        <h3 className="text-2xl font-syne font-bold text-white leading-tight mb-4">{title}</h3>
      </div>
      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-1 text-[#14F195]"><Zap size={16} className="fill-current" /><span className="font-black italic text-lg">{xp} XP</span></div>
        <Link href={`/courses/${slug}`} className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#14F195] transition-colors">View_Syllabus</Link>
      </div>
    </motion.div>
  );
};
EOF
fi

echo "✅ ELITE ROUTING DEPLOYED SUCCESSFULLY!"