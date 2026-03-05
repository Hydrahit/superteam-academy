#!/bin/bash

echo "🧠 WIRING UP THE NERVOUS SYSTEM (INTERACTIVITY & ROUTING)..."

# 1. Install react-hot-toast for global notifications
npm install react-hot-toast

# 2. Injecting Toaster into the Root Layout
echo "✍️ Updating app/[locale]/layout.tsx..."
cat << 'EOF' > app/\[locale\]/layout.tsx
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast'; // Injecting Toast

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Superteam Academy | Level Up on Solana",
  description: "Elite Web3 Gamified Learning Experience",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${syne.variable} ${mono.variable} antialiased bg-[#0a0a0a] text-white`}>
        <NextIntlClientProvider messages={messages}>
          <RootProvider>
            {children}
            {/* Global Notification System */}
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } }} />
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
EOF

# 3. Create the Interactive Auth Button
echo "✍️ Writing components/ui/AuthButton.tsx..."
cat << 'EOF' > components/ui/AuthButton.tsx
'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

export const AuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Connecting to Google...');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`, { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      onClick={handleLogin} 
      disabled={isLoading} 
      className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
    >
      <LogIn size={16} /> {isLoading ? 'CONNECTING...' : 'LOGIN WITH GOOGLE'}
    </motion.button>
  );
};
EOF

# 4. Create the Interactive Complete Lesson Button
echo "✍️ Writing components/ui/CompleteButton.tsx..."
cat << 'EOF' > components/ui/CompleteButton.tsx
'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';

export const CompleteButton = ({ lessonId, xp }: { lessonId: string, xp: number }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const supabase = createClientComponentClient();

  const completeLesson = async () => {
    setIsCompleting(true);
    const toastId = toast.loading('Verifying completion...');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Please log in to claim XP.");

      const { data, error } = await supabase.rpc('complete_lesson', {
        p_user_id: session.user.id, p_lesson_id: lessonId, p_xp_reward: xp
      });

      if (error) throw error;
      
      if (data?.success) {
        toast.success(`+${xp} XP Earned! Level ${data.level}`, { id: toastId, icon: '⚡' });
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#14F195', '#9945FF'] });
      } else {
        toast('Already completed!', { id: toastId, icon: 'ℹ️' });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      onClick={completeLesson} 
      disabled={isCompleting} 
      className="flex items-center gap-2 px-8 py-4 bg-[#14F195] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(20,241,149,0.3)] disabled:opacity-50 transition-all"
    >
      <CheckCircle2 size={20} /> {isCompleting ? 'VERIFYING...' : 'COMPLETE & CLAIM XP'}
    </motion.button>
  );
};
EOF

# 5. Make CourseRow fully navigable
echo "✍️ Updating components/ui/CourseRow.tsx..."
cat << 'EOF' > components/ui/CourseRow.tsx
'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="relative flex-none w-[320px] h-[180px] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:border-[#14F195]/50 transition-colors"
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black to-transparent z-10">
              <h3 className="text-white font-bold text-lg font-syne leading-tight">{course.title}</h3>
            </div>
            
            {/* Quick Info Popup on Hover */}
            <div className="absolute inset-0 bg-[#0C0C10]/95 p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-between backdrop-blur-sm">
               <div>
                 <p className="text-sm text-neutral-300 line-clamp-2">{course.desc}</p>
                 <span className="flex items-center gap-1 text-[#14F195] font-bold mt-3 text-xs uppercase tracking-widest"><Zap size={14}/> +{course.xp} XP</span>
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

echo "✅ INTERACTIVITY SUCCESSFULLY INJECTED!"
echo "🚀 Next step: Run 'npm run dev' to test the new tactile buttons."