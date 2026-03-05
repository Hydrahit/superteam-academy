const fs = require('fs');
const path = require('path');

console.log('🎬 FORGING AURA COURSE PLAYER: Injecting UI and RPC Integrations...');

const rootDir = process.cwd();

// Ensure directory exists
const courseDir = path.join(rootDir, 'app/courses/[slug]');
if (!fs.existsSync(courseDir)) fs.mkdirSync(courseDir, { recursive: true });

// 1. UPDATE DICTIONARIES FOR COURSE PLAYER
const updateDictionary = (lang, newContent) => {
  const filePath = path.join(rootDir, `messages/${lang}.json`);
  let content = {};
  if (fs.existsSync(filePath)) {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  content["Course"] = { ...(content["Course"] || {}), ...newContent };
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`✅ Updated ${lang}.json dictionary for Course Player`);
};

updateDictionary('en', {
  "curriculum": "Curriculum",
  "completeLesson": "Complete & Claim 100 XP",
  "completing": "Verifying...",
  "successMessage": "XP Claimed Successfully! Level updated.",
  "linkToEarn": "Link Wallet to Earn XP",
  "nextLesson": "Next Lesson",
  "lessonTitle": "Introduction to PDAs",
  "lessonModule": "Module 1: Solana Core"
});

updateDictionary('pt', {
  "curriculum": "Currículo",
  "completeLesson": "Concluir e Resgatar 100 XP",
  "completing": "Verificando...",
  "successMessage": "XP Resgatado com Sucesso! Nível atualizado.",
  "linkToEarn": "Vincule a Carteira para Ganhar XP",
  "nextLesson": "Próxima Lição",
  "lessonTitle": "Introdução aos PDAs",
  "lessonModule": "Módulo 1: Essencial da Solana"
});

// 2. GENERATE COURSE PLAYER PAGE
const pagePath = path.join(courseDir, 'page.tsx');
const pageCode = `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { PlayCircle, CheckCircle2, Lock, Trophy, AlertCircle } from 'lucide-react';

// Core AURA Components
import { PlatformLayout } from '@/layouts/PlatformLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';

// Auth & Backend Services
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseProgressService } from '@/application/services/SupabaseProgressService';

export default function CoursePlayer({ params }: { params: { slug: string } }) {
  const { wallet, isLinked } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Safe translation fallback
  let t;
  try {
    t = useTranslations('Course');
  } catch (e) {
    t = (key: string) => key;
  }

  // Mock Curriculum Data
  const modules = [
    { id: 1, title: "Module 1: Solana Core", lessons: [
      { id: 'intro-to-pdas', title: "Introduction to PDAs", duration: "12 min", status: 'active' },
      { id: 'cpi-basics', title: "Cross-Program Invocations", duration: "18 min", status: 'locked' }
    ]},
    { id: 2, title: "Module 2: Advanced Anchor", lessons: [
      { id: 'anchor-state', title: "State Management", duration: "25 min", status: 'locked' }
    ]}
  ];

  const handleCompleteLesson = async () => {
    if (!isLinked || !wallet) {
      setError("Please link your wallet in the dashboard to earn XP.");
      return;
    }

    setIsCompleting(true);
    setError(null);

    try {
      // 🚀 The Zero-Trust RPC Call
      // We pass the wallet address and the lesson ID (params.slug)
      const result = await SupabaseProgressService.completeLesson(
        wallet.toBase58(), 
        params.slug || 'intro-to-pdas'
      );

      if (result.success) {
        setCompleted(true);
      } else {
        setError(result.error || "Failed to verify lesson completion.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <PlatformLayout>
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pb-32 lg:pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">{t('lessonModule')}</Badge>
              <h1 className="text-3xl md:text-5xl font-['Syne'] font-bold text-white mb-4">
                {t('lessonTitle')}
              </h1>
            </div>

            {/* Video Player Placeholder */}
            <Card noPadding className="aspect-video bg-black/40 border-border/50 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer mb-section">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <PlayCircle className="w-20 h-20 text-accent opacity-80 group-hover:scale-110 transition-transform" />
              <p className="mt-4 text-secondary font-['JetBrains_Mono'] text-sm tracking-widest uppercase">Play Lesson</p>
            </Card>

            {/* Lesson Content (Markdown Placeholder) */}
            <div className="prose prose-invert prose-lg max-w-none text-secondary/80 font-light mb-section">
              <p>Program Derived Addresses (PDAs) are one of the most important concepts in Solana development. They allow programs to control accounts without needing a private key...</p>
              <h3>Why do we need PDAs?</h3>
              <ul>
                <li>Deterministic account derivation</li>
                <li>Cross-Program Invocation (CPI) signing</li>
                <li>Hashmap-like data structures on-chain</li>
              </ul>
            </div>

            {/* Action Bar / Completion Logic */}
            <div className="pt-8 border-t border-white/5 flex flex-col items-start gap-4">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <Alert type="error" title="Verification Failed">{error}</Alert>
                  </motion.div>
                )}
                
                {completed ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                    <Alert type="success" title={t('successMessage')}>
                      <div className="flex items-center gap-4 mt-4">
                        <Button variant="secondary" className="gap-2">
                          {t('nextLesson')} <PlayCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </Alert>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                    <Button 
                      onClick={handleCompleteLesson} 
                      isLoading={isCompleting}
                      disabled={!isLinked}
                      className="w-full md:w-auto gap-2"
                    >
                      {!isLinked ? <Lock className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
                      {!isLinked ? t('linkToEarn') : t('completeLesson')}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>

        {/* Right Sidebar: Curriculum */}
        <div className="w-full lg:w-80 border-l border-white/5 bg-canvas/30 p-6 hidden lg:block overflow-y-auto">
          <h3 className="font-['Syne'] font-bold text-lg mb-6">{t('curriculum')}</h3>
          
          <div className="space-y-8">
            {modules.map((mod) => (
              <div key={mod.id}>
                <h4 className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wider">{mod.title}</h4>
                <div className="space-y-2">
                  {mod.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={\`flex items-center justify-between p-3 radius-continuous border \${
                        lesson.status === 'active' 
                          ? 'bg-accent/10 border-accent/20 text-primary' 
                          : 'bg-transparent border-transparent text-secondary hover:bg-white/5'
                      } cursor-pointer transition-colors\`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        {lesson.status === 'active' ? (
                          <PlayCircle className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 opacity-50 shrink-0" />
                        )}
                        <span className="text-sm truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] opacity-50">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PlatformLayout>
  );
}
`;
fs.writeFileSync(pagePath, pageCode);

console.log('✅ PREMIUM COURSE PLAYER DEPLOYED.');