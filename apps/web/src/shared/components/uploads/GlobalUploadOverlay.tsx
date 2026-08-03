'use client';

import * as React from 'react';
import { useUploadStore, UploadTask } from '@/shared/stores/useUploadStore';
import { X, ChevronDown, ChevronUp, File, Pause, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

export function GlobalUploadOverlay() {
  const { queue, isOpen, toggleOverlay, updateStatus } = useUploadStore();

  if (queue.length === 0) return null;

  const totalUploading = queue.filter(q => q.status === 'UPLOADING').length;
  const isMinimized = !isOpen;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300">
      
      {/* Header */}
      <div 
        className="bg-slate-900 dark:bg-slate-950 text-white px-4 py-3 flex items-center justify-between cursor-pointer"
        onClick={toggleOverlay}
      >
        <div className="font-medium text-sm">
          {totalUploading > 0 
            ? `Fazendo upload de ${totalUploading} ite${totalUploading > 1 ? 'ns' : 'm'}` 
            : 'Uploads pausados/concluídos'}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <button className="hover:text-white transition-colors">
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Lista de Fila (Expansível) */}
      {!isMinimized && (
        <div className="max-h-80 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-900/50">
          {queue.map(task => (
            <div key={task.id} className="p-3 mb-2 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 flex items-start gap-3">
              <File className="w-8 h-8 text-indigo-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate" title={task.filename}>
                  {task.filename}
                </p>
                <div className="flex items-center justify-between mt-1 mb-2">
                  <span className="text-xs text-slate-500">
                    {formatBytes(task.uploadedSize)} / {formatBytes(task.totalSize)}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {task.progress}%
                  </span>
                </div>
                
                {/* Barra de Progresso Real */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      task.status === 'FAILED' ? 'bg-red-500' : 
                      task.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`} 
                    style={{ width: `${task.progress}%` }} 
                  />
                </div>
              </div>

              {/* Botões de Ação por Arquivo */}
              <div className="flex flex-col items-center gap-2 ml-2">
                {task.status === 'UPLOADING' && (
                  <button onClick={() => updateStatus(task.id, 'PAUSED')} className="text-slate-400 hover:text-amber-500">
                    <Pause className="w-4 h-4" />
                  </button>
                )}
                {task.status === 'PAUSED' && (
                  <button onClick={() => updateStatus(task.id, 'UPLOADING')} className="text-slate-400 hover:text-indigo-500">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                {task.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {task.status === 'FAILED' && <AlertCircle className="w-4 h-4 text-red-500" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
