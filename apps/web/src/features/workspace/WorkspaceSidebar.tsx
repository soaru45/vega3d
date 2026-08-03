'use client';

import * as React from 'react';
import { Folder, File, UploadCloud } from 'lucide-react';
import { Button } from '@vega3d/ui';

export function WorkspaceSidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Arquivos do Projeto</h2>
        <Button variant="outline" className="w-full gap-2">
          <UploadCloud className="w-4 h-4" />
          Fazer Upload
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {/* Mocks de Arquivos */}
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md">
            <Folder className="w-4 h-4 text-blue-500" /> Referências
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md">
            <File className="w-4 h-4 text-orange-500" /> cavaleiro_lowpoly.obj
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-md">
            <File className="w-4 h-4" /> textura_base.png
          </button>
        </div>
      </div>
    </aside>
  );
}
