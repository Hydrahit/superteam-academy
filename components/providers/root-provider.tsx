'use client';

import React, { useEffect, useState } from 'react';
import { Web3Provider } from './web3-provider';
import { motion, AnimatePresence } from 'framer-motion';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🚀 [SYSTEM]: Interactivity Unlocked. RootProvider Mounted.");
  }, []);

  // Avoid Hydration Mismatch: Don't render interactive shells until mounted
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <Web3Provider>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Web3Provider>
  );
};
