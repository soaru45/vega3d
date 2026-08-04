import * as React from 'react';
import { useState } from 'react';
import { Image as ImageIcon, Box, Type, PlaySquare, UploadCloud, ChevronDown, Check, Coins, Globe } from 'lucide-react';

export function GenerationPanel() {
  const [activeTab, setActiveTab] = useState<'image' | 'model' | 'text' | 'animate'>('image');
  const [modelType, setModelType] = useState<'hd' | 'smart'>('hd');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [partsToggle, setPartsToggle] = useState(false);
  const [texture8k, setTexture8k] = useState(false);

  return (
    <aside className="w-[340px] flex-shrink-0 flex bg-[#1a1b1e] border-r border-white/5 overflow-hidden shadow-2xl relative z-10 m-2 rounded-xl h-[calc(100vh-80px)]">
      
      {/* Side Vertical Tabs */}
      <div className="w-[60px] bg-[#141414] border-r border-white/5 flex flex-col items-center py-4 gap-6">
        <button 
          onClick={() => setActiveTab('image')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'image' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-lg ${activeTab === 'image' ? 'bg-indigo-500/20 text-indigo-400' : ''}`}>
            <ImageIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Imagem</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('model')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'model' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-lg ${activeTab === 'model' ? 'bg-indigo-500/20 text-indigo-400' : ''}`}>
            <Box className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Modelo</span>
        </button>
        
        <div className="w-8 h-px bg-white/10 my-1"></div>
        
        <button 
          onClick={() => setActiveTab('text')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'text' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-lg ${activeTab === 'text' ? 'bg-indigo-500/20 text-indigo-400' : ''}`}>
            <Type className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Texto</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('animate')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'animate' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-lg ${activeTab === 'animate' ? 'bg-indigo-500/20 text-indigo-400' : ''}`}>
            <PlaySquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Animar</span>
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col h-full bg-[#1a1b1e] relative">
        
        {/* Header Title */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-2">
          <SparkleIcon />
          <h2 className="text-sm font-semibold text-white">Gerar modelo</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-24 custom-scrollbar">
          
          {/* HD / Smart Toggle */}
          <div className="flex bg-black/40 rounded-full p-1 mb-5 border border-white/5">
            <button 
              onClick={() => setModelType('hd')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${modelType === 'hd' ? 'bg-white text-black shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Modelo HD
            </button>
            <button 
              onClick={() => setModelType('smart')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1 ${modelType === 'smart' ? 'bg-white text-black shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Malha Smart ⚡
            </button>
          </div>

          {/* Upload Area */}
          <div className="border border-indigo-500/30 bg-indigo-500/5 rounded-xl p-1 mb-6 group cursor-pointer hover:border-indigo-500/50 transition-colors">
            {/* Top Toolbar in upload */}
            <div className="flex items-center gap-1 p-2 mb-2">
              <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white"><ImageIcon className="w-4 h-4" /></button>
              <button className="p-1.5 rounded hover:bg-white/5 text-slate-400"><Box className="w-4 h-4" /></button>
              <div className="flex-1"></div>
              <button className="p-1.5 rounded hover:bg-white/5 text-slate-400"><Type className="w-4 h-4" /></button>
            </div>
            
            <div className="border-2 border-dashed border-white/10 mx-2 mb-2 rounded-lg h-32 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors relative overflow-hidden">
               <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
               <span className="text-sm font-medium text-white">Upload</span>
               <span className="text-[10px] text-slate-500 mt-1 max-w-[140px] text-center leading-tight">JPG, PNG, WEBP, Tamanho &lt; 20MB</span>
            </div>

            <button className="w-full py-2 text-xs font-semibold text-yellow-500 flex items-center justify-center gap-1 hover:text-yellow-400">
              Gerar imagem para 3D &gt;
            </button>
          </div>

          {/* Configurações gerais */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 mb-2">Configurações gerais</h3>
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-sm text-slate-200 font-medium">Geometria e textura</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
            </button>
            {settingsOpen && (
              <div className="p-3 bg-black/20 border border-t-0 border-white/5 rounded-b-lg -mt-1 text-xs text-slate-400">
                Opções avançadas de malha e topologia seriam inseridas aqui.
              </div>
            )}
          </div>

          {/* Apenas para assinantes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
               <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
               <h3 className="text-xs font-semibold text-yellow-500">Apenas para assinantes</h3>
            </div>

            <div className="space-y-4">
              {/* Gerar em Partes */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-200">Gerar em Partes</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 font-bold uppercase tracking-wider">New</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 cursor-pointer flex items-center gap-1 mt-0.5 hover:text-indigo-300">
                    <SparkleIcon /> Teste da nova função &gt;
                  </span>
                </div>
                <Toggle checked={partsToggle} onChange={() => setPartsToggle(!partsToggle)} />
              </div>

              {/* Textura 8K */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-slate-200">Textura 8K</span>
                    <span className="text-slate-500 text-xs cursor-help">ⓘ</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 cursor-pointer flex items-center gap-1 mt-0.5 hover:text-indigo-300">
                    <SparkleIcon /> Textura 8K (Exclusivo Max) - Teste grátis
                  </span>
                </div>
                <Toggle checked={texture8k} onChange={() => setTexture8k(!texture8k)} />
              </div>

              {/* Privacidade */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-slate-200">Privacidade</span>
                  <span className="text-slate-500 text-xs cursor-help">ⓘ</span>
                </div>
                <button className="flex items-center gap-1 text-sm text-slate-300 hover:text-white">
                  <Globe className="w-3.5 h-3.5" />
                  Público
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Fixed Button */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#1a1b1e] via-[#1a1b1e] to-transparent pt-10">
           <button className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all transform hover:scale-[1.02]">
             Gerar modelo
             <div className="flex items-center bg-black/10 px-1.5 py-0.5 rounded-full ml-1">
               <Coins className="w-3.5 h-3.5 mr-1" />
               <span className="text-sm">55</span>
             </div>
           </button>
        </div>

      </div>
    </aside>
  );
}

// Helper components
function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={`w-9 h-5 rounded-full relative transition-colors border border-white/5 ${checked ? 'bg-indigo-600' : 'bg-white/10'}`}
    >
      <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform ${checked ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
  );
}
