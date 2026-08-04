import * as React from 'react';
import { Hexagon, Maximize, MousePointer2, Focus, Video } from 'lucide-react';

export function Viewport3D() {
  return (
    <div className="flex-1 relative bg-[#141414] overflow-hidden flex items-center justify-center">
      
      {/* Centro: Estado vazio */}
      <div className="flex flex-col items-center justify-center opacity-60">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 relative z-10 shadow-lg border border-yellow-300/30">
            <span className="text-3xl font-black text-[#141414]">V</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Pronto para um novo modelo 3D?</h1>
        <p className="text-sm text-slate-400">Gere 3D instantaneamente a partir de imagem ou texto</p>
      </div>

      {/* Controles Flutuantes da Câmera (Direita) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        
        {/* Cubo de visualização (simulação) */}
        <div className="w-14 h-14 mb-4 relative cursor-pointer group">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Eixos XYZ mockup */}
            <div className="w-8 h-px bg-red-500 absolute rotate-45 group-hover:scale-110 transition-transform origin-left"></div>
            <div className="w-8 h-px bg-green-500 absolute -rotate-45 group-hover:scale-110 transition-transform origin-left"></div>
            <div className="w-px h-8 bg-blue-500 absolute -translate-y-4 group-hover:scale-110 transition-transform origin-bottom"></div>
            <div className="w-3 h-3 rounded-full bg-white/20 backdrop-blur border border-white/40 absolute z-10"></div>
          </div>
        </div>

        {/* Ferramentas */}
        <div className="bg-[#1a1b1e]/80 backdrop-blur-sm border border-white/5 rounded-full p-1.5 flex flex-col gap-1 shadow-xl">
          <ToolButton icon={<Focus className="w-4 h-4" />} />
          <ToolButton icon={<Video className="w-4 h-4" />} />
          <ToolButton icon={<MousePointer2 className="w-4 h-4" />} />
          <div className="h-px w-6 bg-white/10 mx-auto my-1"></div>
          <ToolButton icon={<span className="font-bold text-xs">#</span>} />
          <ToolButton icon={<span className="font-bold text-xs">?</span>} />
        </div>
        
      </div>
      
    </div>
  );
}

function ToolButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
      {icon}
    </button>
  );
}
