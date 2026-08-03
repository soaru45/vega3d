'use client';

import * as React from 'react';
import { useLibraryStore } from '@/shared/stores/useLibraryStore';
import { Folder, Image as ImageIcon, Box, Star, Trash2, LayoutGrid, List } from 'lucide-react';
import { Button } from '@vega3d/ui';

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  const { activeFilter, setActiveFilter, viewMode, setViewMode } = useLibraryStore();

  const navItems = [
    { id: 'all', label: 'Todos os Assets', icon: Folder },
    { id: 'images', label: 'Imagens e Texturas', icon: ImageIcon },
    { id: 'models', label: 'Modelos 3D', icon: Box },
    { id: 'favorites', label: 'Favoritos', icon: Star },
    { id: 'trash', label: 'Lixeira', icon: Trash2 },
  ] as const;

  return (
    <div className="flex h-[calc(100vh-4rem)] pt-16 bg-slate-50 dark:bg-slate-950">
      
      {/* Sidebar de Navegação */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Biblioteca</h2>
          <p className="text-xs text-slate-500 mt-1">Meus assets globais</p>
        </div>
        
        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                activeFilter === item.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeFilter === item.id ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header Superior da Biblioteca */}
        <header className="h-14 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-medium text-slate-900 dark:text-slate-100 capitalize">
              {navItems.find(i => i.id === activeFilter)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <List className="w-4 h-4" />
               </button>
             </div>
             <Button>Importar Assets</Button>
          </div>
        </header>
        
        {/* Children (Grid/List View) */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
           {children}
        </div>
      </main>

    </div>
  );
}
