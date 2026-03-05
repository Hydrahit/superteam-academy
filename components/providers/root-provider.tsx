'use client';

import React, { useEffect } from 'react';
import { Web3Provider } from './web3-provider';
import { checkPluginHealth } from '@/lib/health-check';
import { motion, AnimatePresence } from 'framer-motion';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Run health check on mount
    checkPluginHealth();
  }, []);

  return (
    <Web3Provider>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Web3Provider>
  );
};
