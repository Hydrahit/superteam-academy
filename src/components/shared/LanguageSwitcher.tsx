'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import '@/src/i18n/config';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex gap-2 bg-[#0C0C10]/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
      {['en', 'es', 'pt'].map((lng) => (
        <button
          key={lng}
          onClick={() => toggleLang(lng)}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all ${
            i18n.language === lng 
            ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
            : 'text-white/40 hover:text-white/80'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};