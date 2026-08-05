import * as React from 'react';
import { useState, useRef } from 'react';
import { Image as ImageIcon, Box, Type, PlaySquare, UploadCloud, ChevronDown, Check, Coins, Globe, Loader2, Key } from 'lucide-react';
import { useWorkspaceStore } from '@/shared/stores/useWorkspaceStore';

export function GenerationPanel() {
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [modelType, setModelType] = useState<'hd' | 'smart'>('hd');
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [partsToggle, setPartsToggle] = useState(false);
  const [texture8k, setTexture8k] = useState(false);
  
  // States for forms
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Global state
  const { isGenerating, setIsGenerating, setModelUrl, setProgress, setAnalysisText } = useWorkspaceStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      alert("Por favor, insira sua Chave do Gemini (Gemini API Key) nas configurações.");
      setSettingsOpen(true);
      return;
    }

    if (activeTab === 'image' && !selectedFile) {
      alert("Por favor, faça o upload de uma imagem primeiro.");
      return;
    }

    setIsGenerating(true);
    setModelUrl(null);
    setProgress(0);
    setAnalysisText("Iniciando varredura geométrica e de materiais...\n");

    try {
      // Import dynamic to avoid Next.js client-side errors if any
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      // O usuário paga o Gemini Pro, então vamos usar o modelo Pro super avançado
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const promptText = `
Você é o Arquiteto 3D Chefe de um estúdio de jogos AAA (como Rockstar para o GTA 6).
Sua tarefa é analisar a imagem enviada com atenção a geometria, física, texturas (PBR) e materiais.
Descreva como seria a modelagem 3D perfeita para este objeto no jogo (ex: contagem de polígonos, reflexividade, rugosidade, estilo).
No FINAL da sua resposta, classifique o objeto em APENAS UMA dessas categorias EXATAMENTE como escrito, dentro de colchetes:
[VEHICLE], [CHARACTER], [OBJECT], [FURNITURE] ou [NATURE].
      `;

      let imageParts: any = [];
      if (activeTab === 'image' && selectedFile) {
        // Convert File to Base64
        const fileToGenerativePart = async (file: File) => {
          return new Promise((resolve, reject) => {
             const reader = new FileReader();
             reader.onloadend = () => resolve({
                inlineData: { data: (reader.result as string).split(',')[1], mimeType: file.type }
             });
             reader.onerror = reject;
             reader.readAsDataURL(file);
          });
        };
        const part = await fileToGenerativePart(selectedFile);
        imageParts.push(part);
      }

      setProgress(20);

      // Call Gemini API Stream
      const result = await model.generateContentStream([promptText, ...imageParts]);

      let fullText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setAnalysisText("Iniciando varredura geométrica e de materiais...\n\n" + fullText);
        setProgress(Math.min(90, 20 + Math.floor(fullText.length / 20))); // Fake progress increment
      }

      setProgress(100);

      // Determine the 3D model based on the keyword
      let finalModel = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'; // Default
      
      if (fullText.includes('[VEHICLE]')) finalModel = 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/ToyCar/glTF-Binary/ToyCar.glb';
      else if (fullText.includes('[FURNITURE]')) finalModel = 'https://modelviewer.dev/shared-assets/models/Chair.glb';
      else if (fullText.includes('[OBJECT]')) finalModel = 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';
      
      setModelUrl(finalModel);
      setIsGenerating(false);

    } catch (err: any) {
      console.error(err);
      alert('Erro na IA do Gemini: ' + err.message);
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] flex-shrink-0 flex bg-tripo-panel border-r border-white/5 overflow-hidden shadow-2xl relative z-10 m-2 rounded-xl h-[calc(100vh-80px)]">
      
      {/* Side Vertical Tabs */}
      <div className="w-[60px] min-w-[60px] bg-tripo-tab border-r border-white/5 flex flex-col items-center py-4 gap-6 shrink-0">
        <button 
          onClick={() => setActiveTab('image')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'image' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-lg transition-colors ${activeTab === 'image' ? 'bg-indigo-500/20 text-indigo-400' : ''}`}>
            <ImageIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Imagem</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('text')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'text' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-lg transition-colors ${activeTab === 'text' ? 'bg-indigo-500/20 text-indigo-400' : ''}`}>
            <Type className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Texto</span>
        </button>

        <div className="w-8 h-px bg-white/10 my-1"></div>
        
        <button className="flex flex-col items-center gap-1.5 text-slate-600 cursor-not-allowed" title="Em breve">
          <div className="p-2 rounded-lg">
            <Box className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Modelo</span>
        </button>
        
        <button className="flex flex-col items-center gap-1.5 text-slate-600 cursor-not-allowed" title="Em breve">
          <div className="p-2 rounded-lg">
            <PlaySquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium leading-none">Animar</span>
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col h-full bg-tripo-panel relative min-w-0">
        
        {/* Header Title */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-2 shrink-0">
          <SparkleIcon />
          <h2 className="text-sm font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">Gerar modelo</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-24 custom-scrollbar">
          
          {/* HD / Smart Toggle */}
          <div className="flex bg-black/40 rounded-full p-1 mb-5 border border-white/5 shrink-0">
            <button 
              onClick={() => setModelType('hd')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${modelType === 'hd' ? 'bg-[#333] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Modelo HD
            </button>
            <button 
              onClick={() => setModelType('smart')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1 ${modelType === 'smart' ? 'bg-[#333] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Malha Smart ⚡
            </button>
          </div>

          {/* Dynamic Area: Image Upload or Text Prompt */}
          <div className="shrink-0 mb-6">
            {activeTab === 'image' ? (
              <div 
                onClick={handleUploadClick}
                className={`border bg-indigo-500/5 rounded-xl p-1 group cursor-pointer transition-colors ${selectedFile ? 'border-indigo-500' : 'border-indigo-500/30 hover:border-indigo-500/50'}`}
              >
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  hidden 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleFileChange} 
                />

                <div className="flex items-center gap-1 p-2 mb-2">
                  <button className="p-1.5 rounded bg-white/5 text-white"><ImageIcon className="w-4 h-4" /></button>
                </div>
                
                <div className="border-2 border-dashed border-white/10 mx-2 mb-2 rounded-lg h-32 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors relative overflow-hidden px-2 text-center">
                   {selectedFile ? (
                     <>
                        <Check className="w-6 h-6 text-green-400 mb-2" />
                        <span className="text-sm font-medium text-white truncate w-full">{selectedFile.name}</span>
                        <span className="text-[10px] text-green-400 mt-1">Pronto para gerar</span>
                     </>
                   ) : (
                     <>
                        <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                        <span className="text-sm font-medium text-white">Upload</span>
                        <span className="text-[10px] text-slate-500 mt-1 max-w-[140px] leading-tight">JPG, PNG, WEBP, Tamanho &lt; 20MB</span>
                     </>
                   )}
                </div>

                <div className="w-full py-2 text-xs font-semibold text-tripo-yellow flex items-center justify-center gap-1 hover:text-yellow-400 transition-colors">
                  Gerar a partir da imagem &gt;
                </div>
              </div>
            ) : (
              <div className="border border-indigo-500/30 bg-indigo-500/5 rounded-xl p-3 flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-300">Prompt do Modelo</label>
                <textarea 
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 resize-none h-28 focus:outline-none focus:border-indigo-500 transition-colors custom-scrollbar"
                  placeholder="Descreva o objeto 3D detalhadamente..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Configurações gerais */}
          <div className="mb-6 shrink-0">
            <h3 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Configurações gerais</h3>
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-[#222] border border-white/5 hover:bg-[#2a2a2a] transition-colors"
            >
              <span className="text-sm text-slate-200 font-medium">Chave do Gemini</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
            </button>
            {settingsOpen && (
              <div className="p-4 bg-[#111] border border-t-0 border-white/5 rounded-b-lg -mt-1 flex flex-col gap-3">
                <label className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Gemini API Key (Google AI Studio)
                </label>
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-black border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-tripo-yellow transition-colors"
                />
                <p className="text-[10px] text-slate-500 leading-tight">A IA do Gemini vai analisar a sua foto e arquitetar a complexidade do modelo 3D!</p>
              </div>
            )}
          </div>

          {/* Apenas para assinantes */}
          <div className="shrink-0">
            <div className="flex items-center gap-2 mb-3">
               <div className="w-2 h-2 rounded-full bg-tripo-yellow shadow-[0_0_8px_rgba(255,200,0,0.8)]"></div>
               <h3 className="text-xs font-semibold text-tripo-yellow uppercase tracking-wider">Apenas Assinantes</h3>
            </div>

            <div className="space-y-4">
              {/* Gerar em Partes */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-200">Gerar em Partes</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 font-bold uppercase tracking-wider">New</span>
                  </div>
                </div>
                <Toggle checked={partsToggle} onChange={() => setPartsToggle(!partsToggle)} />
              </div>

              {/* Textura 8K */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-slate-200">Textura 8K</span>
                    <span className="text-slate-500 text-xs cursor-help">ⓘ</span>
                  </div>
                </div>
                <Toggle checked={texture8k} onChange={() => setTexture8k(!texture8k)} />
              </div>

              {/* Privacidade */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-slate-200">Privacidade</span>
                </div>
                <button className="flex items-center gap-1 text-sm text-slate-300 hover:text-white bg-black/40 px-2 py-1 rounded border border-white/5">
                  <Globe className="w-3.5 h-3.5" />
                  Público
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Fixed Button */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#151515] via-[#151515] to-transparent pt-10 pointer-events-none">
           <button 
             onClick={handleGenerate}
             disabled={isGenerating}
             className="w-full flex items-center justify-center gap-2 bg-tripo-yellow hover:bg-[#e5b400] disabled:bg-tripo-yellow/50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-full shadow-[0_0_20px_rgba(255,200,0,0.15)] transition-all transform active:scale-95 pointer-events-auto"
           >
             {isGenerating ? (
               <>
                 <Loader2 className="w-5 h-5 animate-spin" />
                 Gerando modelo na IA...
               </>
             ) : (
               <>
                 Gerar modelo
                 <div className="flex items-center bg-black/15 px-1.5 py-0.5 rounded-full ml-1 backdrop-blur-sm">
                   <Coins className="w-3.5 h-3.5 mr-1" />
                   <span className="text-sm">55</span>
                 </div>
               </>
             )}
           </button>
        </div>

      </div>
    </aside>
  );
}

// Helper components
function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 shrink-0"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={`w-10 h-5 rounded-full relative transition-colors border border-white/5 shrink-0 ${checked ? 'bg-[#FFC800]' : 'bg-[#333]'}`}
    >
      <div className={`absolute top-[1px] w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}
