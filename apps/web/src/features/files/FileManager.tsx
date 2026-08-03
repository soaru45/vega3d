'use client';

import * as React from 'react';
import { Search, Folder as FolderIcon, File as FileIcon, MoreVertical, Plus } from 'lucide-react';
import { Input, Button } from '@vega3d/ui';
import { AdvancedDropzone } from '@/shared/components/uploads/AdvancedDropzone';

export function FileManager({ projectId }: { projectId: string }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Gerenciador de Arquivos</h3>
        <div className="w-64">
          <Input placeholder="Buscar arquivos..." type="search" />
        </div>
      </div>
      
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <AdvancedDropzone projectId={projectId} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 rounded-tl-md">Nome</th>
              <th className="px-4 py-3">Tamanho</th>
              <th className="px-4 py-3">Modificado em</th>
              <th className="px-4 py-3 rounded-tr-md text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <td className="px-4 py-3 flex items-center gap-3 font-medium text-slate-900 dark:text-slate-100">
                <FolderIcon className="w-5 h-5 text-blue-500" /> Referências
              </td>
              <td className="px-4 py-3 text-slate-500">-</td>
              <td className="px-4 py-3 text-slate-500">Hoje, 14:30</td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
              </td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <td className="px-4 py-3 flex items-center gap-3 font-medium text-slate-900 dark:text-slate-100">
                <FileIcon className="w-5 h-5 text-orange-500" /> modelo_base.obj
              </td>
              <td className="px-4 py-3 text-slate-500">12.4 MB</td>
              <td className="px-4 py-3 text-slate-500">Ontem, 09:15</td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
