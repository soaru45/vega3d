'use client';

import * as React from 'react';
import { UploadCloud } from 'lucide-react';
import { useUploadStore } from '@/shared/stores/useUploadStore';
import { Button } from '@vega3d/ui';

export function AdvancedDropzone({ projectId }: { projectId: string }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const { addTask } = useUploadStore();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      // Cria a tarefa na fila (o backend geraria o ID real via /initialize)
      const mockId = Math.random().toString(36).substring(7);
      
      addTask({
        id: mockId,
        filename: file.name,
        totalSize: file.size,
        uploadedSize: 0,
        progress: 0,
        status: 'UPLOADING',
        file: file,
      });

      // Em produção real:
      // 1. const { uploadId } = await axios.post('/uploads/initialize', { filename, size, projectId })
      // 2. sliceFileIntoChunks(file)
      // 3. await Promise.all(chunks.map(chunk => axios.post(`/uploads/chunk/${uploadId}`)))
      
      // Mock de Upload Assíncrono para UX visível
      simulateUploadProgress(mockId, file.size);
    });
  };

  const simulateUploadProgress = (taskId: string, total: number) => {
    let current = 0;
    const interval = setInterval(() => {
      current += total / 10;
      if (current >= total) {
        current = total;
        clearInterval(interval);
        useUploadStore.getState().updateStatus(taskId, 'COMPLETED');
      }
      useUploadStore.getState().updateProgress(taskId, current);
    }, 500);
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.02]' 
          : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4">
        <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-indigo-600' : 'text-slate-400'}`} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        Arraste arquivos aqui
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
        Suporta modelos 3D (.glb, .obj, .fbx), Texturas (.png, .jpg) e Pacotes (.zip). O sistema fatiará arquivos pesados automaticamente.
      </p>
      
      <div className="flex justify-center">
        <label htmlFor="file-upload" className="cursor-pointer">
          <Button type="button" onClick={() => document.getElementById('file-upload')?.click()}>
            Selecionar Arquivos
          </Button>
          <input 
            id="file-upload" 
            type="file" 
            multiple 
            className="hidden" 
            onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))} 
          />
        </label>
      </div>
    </div>
  );
}
