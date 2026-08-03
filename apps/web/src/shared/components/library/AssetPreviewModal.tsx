'use client';

import * as React from 'react';
import { useLibraryStore } from '@/shared/stores/useLibraryStore';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@vega3d/ui';
// Preview 3D Básico isolado (Somente visualização)
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

export function AssetPreviewModal() {
  const { previewAssetId, setPreviewAsset } = useLibraryStore();

  if (!previewAssetId) return null;

  // Em produção, buscaríamos os detalhes via API.
  const is3DModel = previewAssetId.includes('model');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" 
        onClick={() => setPreviewAsset(null)} 
      />
      
      <div className="relative w-full max-w-5xl h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
        
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Visualização de Asset</h3>
            <p className="text-sm text-slate-500">Preview_Asset_{previewAssetId}.glb</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <ExternalLink className="w-4 h-4" /> Abrir no Projeto
            </Button>
            <button 
              onClick={() => setPreviewAsset(null)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          {is3DModel ? (
            <div className="w-full h-full cursor-move">
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                <color attach="background" args={['#1e293b']} />
                <Stage preset="soft" intensity={1} environment="city">
                   {/* Placeholder Mesh - Aqui carregaríamos o useGLTF real do Drei */}
                   <mesh>
                     <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                     <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
                   </mesh>
                </Stage>
                <OrbitControls autoRotate autoRotateSpeed={2} />
              </Canvas>
              <div className="absolute bottom-4 left-4 text-xs font-semibold text-white/50 bg-black/20 px-2 py-1 rounded backdrop-blur">
                Pré-visualização 3D Básica (Auto-rotate)
              </div>
            </div>
          ) : (
            <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000" 
               alt="Preview Imagem" 
               className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
        
      </div>
    </div>
  );
}
