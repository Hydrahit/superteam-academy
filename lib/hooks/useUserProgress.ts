'use client';
import { useState, useEffect } from 'react';
import { xpToLevel } from '@/lib/utils/progression';

export function useUserProgress(initialXp: number = 0) {
  const [xp, setXp] = useState(initialXp);
  const [level, setLevel] = useState(xpToLevel(initialXp));

  const addXp = (amount: number) => {
    setXp((prev) => {
      const newXp = prev + amount;
      const newLevel = xpToLevel(newXp);
      if (newLevel > level) {
        console.log("🎊 Level Up! New Level:", newLevel);
        // Trigger Level-Up Animation/NFT Minting here
      }
      setLevel(newLevel);
      return newXp;
    });
  };

  return { xp, level, addXp };
}
