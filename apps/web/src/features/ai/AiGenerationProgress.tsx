'use client';

import * as React from 'react';
import { useAiStore } from '@/shared/stores/useAiStore';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function AiGenerationProgress() {
  const { activeGeneration } = useAiStore();

  if (!activeGeneration) return null;

  const { prompt, progress, status } = activeGeneration;

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden animate-in slide-in-from-top-10 fade-in duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {status === 'COMPLETED' ? 'Geração Concluída' : 'Gerando Modelo 3D'}
          </span>
          <span className="text-xs font-medium text-slate-500">{progress}%</span>
        </div>
        
        <p className="text-sm text-slate-900 dark:text-slate-100 font-medium truncate mb-3" title={prompt}>
          "{prompt}"
        </p>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
          <div 
            className={`h-full transition-all duration-500 ease-out ${status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          {status === 'PROCESSING' || status === 'QUEUED' ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" /> A IA está esculpindo a geometria...</>
          ) : status === 'COMPLETED' ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Injetando no visualizador...</>
          ) : (
            <span className="text-red-500">Falha ao processar</span>
          )}
        </div>
      </div>
    </div>
  );
}
