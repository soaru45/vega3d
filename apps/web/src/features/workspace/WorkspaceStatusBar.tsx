'use client';

import * as React from 'react';
import { CheckCircle2, Cloud } from 'lucide-react';

export function WorkspaceStatusBar() {
  return (
    <footer className="h-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 z-30 relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span>Salvo automaticamente</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Cloud className="w-3.5 h-3.5" />
          <span>Backend Conectado</span>
        </div>
        <span>Vega3D v1.0.0</span>
      </div>
    </footer>
  );
}
