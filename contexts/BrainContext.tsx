'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalState {
  userXp: number;
  level: number;
  isLinked: boolean;
}

const BrainContext = createContext<any>(null);

export function BrainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>({
    userXp: 0,
    level: 1,
    isLinked: false
  });

  // Level Logic: Level = floor(sqrt(xp / 100))
  const updateXp = (newXp: number) => {
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) || 1;
    setState(prev => ({ ...prev, userXp: newXp, level: newLevel }));
  };

  return (
    <BrainContext.Provider value={{ ...state, updateXp }}>
      {children}
    </BrainContext.Provider>
  );
}

export const useBrain = () => useContext(BrainContext);
