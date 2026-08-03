'use client';

import * as React from 'react';
import { Send, Sparkles, AlertCircle, ImageIcon, X } from 'lucide-react';
import { Button, Input } from '@vega3d/ui';
import { useAiStore } from '@/shared/stores/useAiStore';
import { useViewerStore } from '@/shared/stores/useViewerStore';

export function AiPromptBuilder({ projectId }: { projectId: string }) {
  const [prompt, setPrompt] = React.useState('');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const { activeGeneration, startGeneration } = useAiStore();
  const isGenerating = !!activeGeneration;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating || (!prompt.trim() && !imageFile)) return;
    
    // Pass prompt and projectId to the store action
    startGeneration(prompt, projectId);
    setPrompt('');
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
      {isGenerating && (
        <div className="absolute -top-10 left-0 right-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs px-3 py-1.5 rounded-md flex items-center justify-between border border-indigo-100 dark:border-indigo-800 animate-pulse">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Gerando modelo 3D...</span>
        </div>
      )}

      {imageFile && (
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
            <ImageIcon className="w-3 h-3 text-indigo-500" />
            <span className="truncate max-w-[180px]">{imageFile.name}</span>
          </div>
          <button type="button" onClick={() => setImageFile(null)} className="text-slate-400 hover:text-red-500">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      <div className="relative flex items-center">
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isGenerating}
          className="absolute left-2 p-1.5 text-slate-400 hover:text-indigo-500 transition-colors disabled:opacity-50"
          title="Upload de Imagem (Image to 3D)"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp"
          onChange={handleImageChange}
        />

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={imageFile ? "Descreva detalhes (opcional)..." : "Ex: Um dragão vermelho low poly..."}
          disabled={isGenerating}
          className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 transition-shadow"
        />
        
        <button
          type="submit"
          disabled={isGenerating || (!prompt.trim() && !imageFile)}
          className="absolute right-1.5 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between px-1 mt-1">
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">VEGA COPILOT V1</span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">1 CRÉDITO</span>
      </div>
    </form>
  );
}
