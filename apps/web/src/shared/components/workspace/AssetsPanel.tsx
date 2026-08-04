import * as React from 'react';
import { useState } from 'react';
import { LayoutGrid, Star, Filter, UploadCloud, Info } from 'lucide-react';

export function AssetsPanel() {
  const [activeTab, setActiveTab] = useState<'ativos' | 'propriedade'>('ativos');

  return (
    <aside className="w-[320px] min-w-[320px] max-w-[320px] flex-shrink-0 shrink-0 bg-tripo-panel border-l border-white/5 overflow-hidden shadow-2xl relative z-10 m-2 rounded-xl flex flex-col h-[calc(100vh-80px)]">
      
      {/* Top Tabs */}
      <div className="flex bg-tripo-tab border-b border-white/5 shrink-0">
        <button 
          onClick={() => setActiveTab('ativos')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'ativos' ? 'border-white text-white bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <LayoutGrid className="w-4 h-4" />
          Ativos
        </button>
        <button 
          onClick={() => setActiveTab('propriedade')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'propriedade' ? 'border-white text-white bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Star className="w-4 h-4" />
          Propriedade
        </button>
      </div>

      {/* Upgrade Banner */}
      <div className="m-4 bg-[#2A2312] border border-[#FFC800]/30 rounded-xl p-4 flex flex-col gap-3 shrink-0">
        <p className="text-xs text-[#FFC800]/90 font-medium leading-snug">
          Faça upgrade para desbloquear a exportação de modelos 3D, a geração multivista e muito mais. Economize até 50%.
        </p>
        <button className="self-end px-4 py-1.5 bg-tripo-yellow hover:bg-[#e5b400] text-black text-xs font-bold rounded-full transition-colors shadow-lg">
          Upgrade
        </button>
      </div>

      {/* Toolbar */}
      <div className="px-4 pb-3 flex items-center justify-between shrink-0">
        <div className="flex bg-[#222] rounded-lg p-1 border border-white/5">
           <button className="p-1.5 rounded bg-white/10 text-white shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
           <button className="p-1.5 rounded text-slate-400 hover:text-white"><Star className="w-4 h-4" /></button>
           <button className="p-1.5 rounded text-slate-400 hover:text-white"><Filter className="w-4 h-4" /></button>
        </div>
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#2a2a2a] text-xs font-medium text-slate-300 border border-white/5 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          Gerenciar
        </button>
      </div>

      {/* Grid of Assets */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          
          {/* Upload Card */}
          <div className="aspect-square bg-[#222] rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-tripo-yellow/50 hover:bg-[#2a2a2a] transition-colors p-3 text-center group">
             <div className="w-10 h-10 rounded-full bg-tripo-yellow/10 flex items-center justify-center text-tripo-yellow group-hover:scale-110 transition-transform">
               <UploadCloud className="w-5 h-5" />
             </div>
             <span className="text-xs font-semibold text-white">Upload de Modelo</span>
             <span className="text-[9px] text-slate-500 leading-tight">OBJ, FBX, STL, GLB</span>
          </div>

          {/* Asset Mockups */}
          <AssetCard image="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=250&auto=format&fit=crop" />
          <AssetCard image="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=250&auto=format&fit=crop" />
          <AssetCard image="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=250&auto=format&fit=crop" />
          <AssetCard image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=250&auto=format&fit=crop" />
          <AssetCard image="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=250&auto=format&fit=crop" />
          <AssetCard image="https://images.unsplash.com/photo-1531297121226-724d623250cc?q=80&w=250&auto=format&fit=crop" />

        </div>
      </div>
      
    </aside>
  );
}

function AssetCard({ image }: { image: string }) {
  return (
    <div className="aspect-square bg-[#222] rounded-xl border border-white/5 overflow-hidden relative group cursor-pointer">
      <img src={image} alt="Asset" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Info icon */}
      <button className="absolute bottom-2 left-2 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white backdrop-blur transition-colors">
        <Info className="w-3 h-3" />
      </button>
    </div>
  );
}
