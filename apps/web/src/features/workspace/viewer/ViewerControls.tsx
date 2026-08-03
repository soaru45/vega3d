'use client';

import * as React from 'react';
import { useViewerStore } from '@/shared/stores/useViewerStore';
import { useEditorStore } from '@/shared/stores/useEditorStore';
import { Grid, Box, Monitor, Move3d, Move, RotateCcw, Scaling } from 'lucide-react';

export function ViewerControls() {
  const { showGrid, showAxes, wireframeMode, toggleGrid, toggleAxes, toggleWireframe, setBackgroundColor } = useViewerStore();
  const { isEditMode, toggleEditMode, transformMode, setTransformMode } = useEditorStore();

  return (
    <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
      
      {/* Botão Principal de Edição */}
      <button 
        onClick={toggleEditMode}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${isEditMode ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
      >
        <Move3d className="w-4 h-4" /> {isEditMode ? 'Edit Mode ON' : 'Edit Mode OFF'}
      </button>

      {isEditMode && (
        <div className="flex items-center gap-1 ml-1 mr-1 px-1 border-l border-r border-slate-200 dark:border-slate-700">
          <button onClick={() => setTransformMode('translate')} className={`p-1.5 rounded ${transformMode === 'translate' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500'}`}><Move className="w-4 h-4" /></button>
          <button onClick={() => setTransformMode('rotate')} className={`p-1.5 rounded ${transformMode === 'rotate' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500'}`}><RotateCcw className="w-4 h-4" /></button>
          <button onClick={() => setTransformMode('scale')} className={`p-1.5 rounded ${transformMode === 'scale' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500'}`}><Scaling className="w-4 h-4" /></button>
        </div>
      )}

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

      <button onClick={toggleGrid} className={`p-2 rounded-md ${showGrid ? 'text-indigo-600' : 'text-slate-500'}`}><Grid className="w-4 h-4" /></button>
      <button onClick={toggleAxes} className={`p-2 rounded-md ${showAxes ? 'text-indigo-600' : 'text-slate-500'}`}><Box className="w-4 h-4" /></button>
      <button onClick={toggleWireframe} className={`p-2 rounded-md ${wireframeMode ? 'text-indigo-600' : 'text-slate-500'}`}><Monitor className="w-4 h-4" /></button>

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

      <button onClick={() => setBackgroundColor('#ffffff')} className="w-6 h-6 rounded-full bg-white border border-slate-300 ml-1" />
      <button onClick={() => setBackgroundColor('#1e293b')} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 ml-1" />
      <button onClick={() => setBackgroundColor('#000000')} className="w-6 h-6 rounded-full bg-black border border-slate-800 ml-1 mr-1" />
    </div>
  );
}
