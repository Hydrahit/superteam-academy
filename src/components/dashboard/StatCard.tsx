'use client';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
  accentColor?: string;
}

export const StatCard = ({ title, value, icon: Icon, description, className, accentColor = "#14F195" }: StatCardProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative overflow-hidden bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between backdrop-blur-md",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Icon size={80} style={{ color: accentColor }} />
      </div>
      
      <div>
        <p className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest mb-1">{title}</p>
        <h2 className="text-4xl font-syne font-black text-white italic tracking-tighter">{value}</h2>
      </div>

      {description && (
        <p className="text-xs text-neutral-500 font-medium mt-4">{description}</p>
      )}
    </motion.div>
  );
};
