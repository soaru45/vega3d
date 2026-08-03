'use client';

import * as React from 'react';
import { UploadCloud } from 'lucide-react';

export function DropzoneUploader() {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20'
          : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
    >
      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
        <UploadCloud className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">Arraste seus arquivos aqui</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
        Suporta PNG, JPG, WEBP para referências. OBJ, FBX, GLB, STL para modelos 3D base.
      </p>
      <button className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors">
        Procurar Arquivos
      </button>
    </div>
  );
}
