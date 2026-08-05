'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { MousePointer2, Focus, Video, Loader2, Download, Maximize2, Move, Rotate3D, Grid3x3 } from 'lucide-react';
import { useWorkspaceStore } from '@/shared/stores/useWorkspaceStore';

export function Viewport3D() {
  const { isGenerating, progress, modelUrl, analysisText } = useWorkspaceStore();
  const [modelViewerLoaded, setModelViewerLoaded] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the analysis console
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [analysisText]);

  const handleDownload = async () => {
    if (!modelUrl) return;
    try {
      const response = await fetch(modelUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'modelo_gerado.glb';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // Fallback in case of CORS
      window.open(modelUrl, '_blank');
    }
  };

  return (
    <div className="flex-1 relative bg-tripo-bg overflow-hidden flex items-center justify-center min-w-0">
      
      <Script 
        type="module" 
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        onReady={() => setModelViewerLoaded(true)}
      />
      
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6">
          <Loader2 className="w-12 h-12 text-tripo-yellow animate-spin mb-6" />
          <h2 className="text-xl font-bold text-white mb-2">Processando Modelo na IA</h2>
          <p className="text-sm text-slate-400 mb-6 text-center">Isso pode levar de 1 a 3 minutos dependendo da complexidade.</p>
          
          <div className="w-full bg-black/50 rounded-full h-3 border border-white/10 overflow-hidden">
            <div 
              className="bg-tripo-yellow h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono text-tripo-yellow mt-2">{progress}%</span>
        </div>
      ) : modelUrl && modelViewerLoaded ? (
        <div className="w-full h-full">
           {/* @ts-ignore - model-viewer is a web component */}
          <model-viewer
            src={modelUrl}
            auto-rotate
            camera-controls
            shadow-intensity="1"
            shadow-softness="1"
            exposure="1"
            environment-image="neutral"
            style={{ width: '100%', height: '100%', outline: 'none' }}
          >
            <div slot="poster" className="flex items-center justify-center w-full h-full text-slate-500">
              Carregando visualizador 3D...
            </div>
          {/* @ts-ignore */}
          </model-viewer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center opacity-60">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-tripo-yellow/20 blur-xl rounded-full"></div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-[#e5b400] relative z-10 shadow-lg border border-yellow-300/30">
              <span className="text-3xl font-black text-black">V</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Pronto para um novo modelo 3D?</h1>
          <p className="text-sm text-slate-400">Gere 3D instantaneamente a partir de imagem ou texto</p>
        </div>
      )}

      {/* Console do Arquiteto (Gemini) */}
      {isGenerating && analysisText && (
        <div className="absolute inset-x-8 bottom-8 top-1/2 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-tripo-yellow/30 shadow-[0_0_30px_rgba(202,240,15,0.1)] flex flex-col z-20 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <div className="w-2 h-2 rounded-full bg-tripo-yellow animate-pulse" />
            <h3 className="text-tripo-yellow text-sm font-bold tracking-widest uppercase">Gemini Vision - Análise AAA</h3>
          </div>
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
          >
            <p className="text-green-400 font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed">
              {analysisText}
              <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
            </p>
          </div>
        </div>
      )}

      {/* Controles Flutuantes da Câmera (Direita) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10 pointer-events-none">
        
        {/* Ferramentas */}
        <div className="bg-[#1a1b1e]/80 backdrop-blur-sm border border-white/5 rounded-full p-1.5 flex flex-col gap-1 shadow-xl pointer-events-auto">
          {modelUrl && (
            <button onClick={handleDownload} className="w-9 h-9 rounded-full flex items-center justify-center text-tripo-yellow hover:bg-white/10 hover:text-yellow-300 transition-colors tooltip-trigger group relative">
              <Download className="w-4 h-4" />
            </button>
          )}
          <ToolButton icon={<Focus className="w-4 h-4" />} title="Focar Modelo" />
          <ToolButton icon={<Video className="w-4 h-4" />} title="Criar Vídeo" />
          <ToolButton icon={<MousePointer2 className="w-4 h-4" />} title="Inspecionar Malha" />
          <div className="h-px w-6 bg-white/10 mx-auto my-1"></div>
          <ToolButton icon={<span className="font-bold text-xs">#</span>} title="Wireframe" />
          <ToolButton icon={<span className="font-bold text-xs">?</span>} title="Ajuda" />
        </div>
      </div>
      
    </div>
  );
}

function ToolButton({ icon, title }: { icon: React.ReactNode, title?: string }) {
  return (
    <button title={title} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
      {icon}
    </button>
  );
}
