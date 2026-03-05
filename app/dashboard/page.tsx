'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Zap, Trophy, Flame, Wallet, ArrowRight, Activity } from 'lucide-react';

// Core AURA Components
import { PlatformLayout } from '@/layouts/PlatformLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

// Auth Hook (Vitest compliant)
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, isLinked, authStage } = useAuth();
  
  // Safe translation fallback
  let t;
  try {
    t = useTranslations('Dashboard');
  } catch (e) {
    t = (key: string) => key; // Fallback to key name if provider is missing
  }

  // Animation variants for smooth staggered loading
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Mocked stats (To be replaced with your SupabaseProgressService later)
  const stats = [
    { label: t('totalXp'), value: "2,450", icon: Zap, color: "text-[#00E5FF]" },
    { label: t('globalRank'), value: "#142", icon: Trophy, color: "text-[#00FF94]" },
    { label: t('streak'), value: "7 Days", icon: Flame, color: "text-semantic-warning" }
  ];

  return (
    <PlatformLayout>
      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-section"
        >
          <div>
            <p className="text-secondary font-['JetBrains_Mono'] text-[13px] uppercase tracking-wider mb-2">
              {t('greeting')}
            </p>
            <h1 className="text-4xl md:text-5xl font-['Syne'] font-bold text-white tracking-tight">
              {user?.email ? user.email.split('@')[0] : 'Scholar'}
            </h1>
          </div>
          
          <div className="flex items-center">
            {isLinked ? (
              <Badge variant="success" className="gap-2 py-1.5 px-3">
                <Wallet className="w-4 h-4" /> {t('walletLinked')}
              </Badge>
            ) : (
              <Button variant="secondary" className="gap-2 shadow-aura-card">
                <Wallet className="w-4 h-4 text-accent" /> {t('linkWalletCta')}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Global Security Warning (Only shows if wallet isn't linked) */}
        {!isLinked && authStage !== 'loading' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <Alert type="warning" title="Security Notice">
              Your account is not bound to a Solana wallet. On-chain XP and credentials cannot be issued until you verify your Ed25519 signature.
            </Alert>
          </motion.div>
        )}

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-base mb-section"
        >
          {/* Key Stats Cards */}
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVars}>
              <Card className="hover:bg-white/5 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <stat.icon className={`w-16 h-16 ${stat.color}`} />
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <span className="text-secondary text-[13px] font-semibold tracking-wide uppercase">
                    {stat.label}
                  </span>
                  <span className="text-3xl font-['JetBrains_Mono'] font-bold text-primary">
                    {stat.value}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-Column Layout for Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-base">
          
          {/* Left Column: Active Course (Spans 2 cols) */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <h2 className="text-xl font-['Syne'] font-bold mb-4 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5 text-accent" /> {t('continueLearning')}
            </h2>
            <Card className="flex flex-col md:flex-row gap-6 items-center bg-gradient-to-br from-surface to-canvas">
              <div className="w-full md:w-1/3 aspect-video bg-black/20 radius-continuous border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/10" />
                <Zap className="w-10 h-10 text-accent" />
              </div>
              <div className="flex-1 flex flex-col items-start w-full">
                <Badge variant="outline" className="mb-3">Module 3</Badge>
                <h3 className="text-2xl font-bold font-['Syne'] mb-2">{t('courseName')}</h3>
                <p className="text-secondary text-[15px] mb-6 line-clamp-2">
                  {t('resumePath')}
                </p>
                <Button className="w-full md:w-auto gap-2">
                  Resume Lesson <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Activity Feed */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-['Syne'] font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" /> {t('recentActivity')}
            </h2>
            <Card className="h-full min-h-[300px] flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-50">
                <Trophy className="w-12 h-12 text-secondary mb-4" />
                <p className="text-[14px] text-secondary">{t('noActivity')}</p>
              </div>
            </Card>
          </motion.div>
          
        </div>
      </div>
    </PlatformLayout>
  );
}

// Temporary icon component since BookOpen isn't imported from lucide-react in the top block to save space
function BookOpenIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
