'use client';

import * as React from 'react';
import { useViewerStore } from '@/shared/stores/useViewerStore';
import { useEditorStore } from '@/shared/stores/useEditorStore';
import { AiPromptBuilder } from '../ai/AiPromptBuilder';
import { Layers, Cuboid } from 'lucide-react';

export function WorkspaceRightPanel() {
  const { modelMetadata, activeModelUrl } = useViewerStore();
  const { isEditMode, selectedMeshId, setSelectedMesh } = useEditorStore();

  if (!activeModelUrl) {
    return (
      <div className="w-80 flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4">
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
          <Layers className="w-12 h-12 mb-4 text-slate-400" />
          <p className="text-sm">Nenhum modelo aberto para inspeção.</p>
        </div>
        <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-4">
          <AiPromptBuilder />
        </div>
      </div>
    );
  }

  // MOCK DE HIERARQUIA PARA O SCENE GRAPH BASEADO NOS NÚMEROS DO MODELO
  const meshesMock = Array.from({ length: Math.min(modelMetadata?.meshes || 0, 10) }).map((_, i) => ({
    id: `mesh_mock_${i}`,
    name: `Mesh_0${i + 1}`,
  }));

  return (
    <aside className="w-80 flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl z-20">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex-1 overflow-y-auto">
        <h3 className="font-semibold text-sm mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" /> 
          Scene Graph {isEditMode && <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 rounded">EDIT</span>}
        </h3>
        
        {/* HIERARQUIA DE MALHAS (SCENE GRAPH) */}
        <div className="space-y-1 max-h-[300px] overflow-y-auto mb-4 border border-slate-100 dark:border-slate-800 rounded-md p-2 bg-slate-50 dark:bg-slate-950">
          {meshesMock.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">Nenhuma malha individual detectada.</p>
          ) : (
            meshesMock.map(mesh => (
              <button
                key={mesh.id}
                onClick={() => setSelectedMesh(mesh.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition-colors ${selectedMeshId === mesh.id ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                <Cuboid className="w-3 h-3" />
                {mesh.name}
              </button>
            ))
          )}
        </div>

        <h3 className="font-semibold text-sm mb-3 mt-6 text-slate-900 dark:text-slate-100">Propriedades</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Vértices</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">{modelMetadata?.vertices?.toLocaleString() || 0}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Faces (Tris)</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">{modelMetadata?.faces?.toLocaleString() || 0}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Tamanho</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">
              {modelMetadata?.size?.[0]?.toFixed(2)}x{modelMetadata?.size?.[1]?.toFixed(2)}x{modelMetadata?.size?.[2]?.toFixed(2)}m
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
        <AiPromptBuilder />
      </div>
    </aside>
  );
}
