'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, Zap, X } from 'lucide-react';
import { Button } from '@vega3d/ui';

export function SecretAdminOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Core initialized.', '[AUTH] Bypassing restrictions...']);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on F2
      if (e.key === 'F2') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `> ${msg}`]);
  };

  const handleInjectCredits = () => {
    addLog('[API] POST /admin/inject-credits -> SUCCESS');
    addLog('[WALLET] +999,999 credits added.');
  };

  const handleForcePro = () => {
    addLog('[API] PATCH /admin/force-tier -> SUCCESS');
    addLog('[ACCOUNT] Tier upgraded to MAX TIER.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none p-4"
        >
          {/* Backdrop blur just for the modal area */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto" onClick={() => setIsOpen(false)} />
          
          <div 
            className="relative w-full max-w-2xl glass-panel bg-black/80 border border-neon-blue/50 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neon-blue/20 bg-neon-blue/5">
              <div className="flex items-center gap-2 text-neon-blue font-mono font-bold tracking-widest">
                <ShieldAlert className="w-5 h-5" />
                GOD MODE OVERLAY
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Controls */}
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={handleInjectCredits}
                  className="bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/50 h-14 justify-start px-4 font-mono transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  <Cpu className="w-5 h-5 mr-3" />
                  [INJETAR CRÉDITOS INF]
                </Button>
                
                <Button 
                  onClick={handleForcePro}
                  className="bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/50 h-14 justify-start px-4 font-mono transition-all hover:shadow-[0_0_15px_rgba(176,38,255,0.4)]"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  [FORÇAR CONTA MAX]
                </Button>
              </div>

              {/* Terminal Logs */}
              <div className="bg-black/90 border border-white/10 rounded-lg p-4 font-mono text-xs text-green-400 h-48 overflow-y-auto shadow-inner flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  <Terminal className="w-4 h-4" /> root@vega3d-core:~#
                </div>
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    key={i}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
