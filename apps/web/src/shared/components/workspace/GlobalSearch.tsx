'use client';

import * as React from 'react';
import { useWorkspaceStore } from '@/shared/stores/useWorkspaceStore';
import { Search, File, Folder, Box } from 'lucide-react';

export function GlobalSearch() {
  const { isSearchOpen, setSearchOpen } = useWorkspaceStore();
  const [query, setQuery] = React.useState('');

  // Atalho Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSearchOpen(false)} />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            className="w-full bg-transparent border-0 focus:ring-0 px-3 py-1 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            placeholder="Buscar arquivos, pastas ou modelos... (ex: textura_armadura)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {query.length > 1 ? (
          <div className="max-h-80 overflow-y-auto p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Resultados simulados</div>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors">
              <Box className="w-4 h-4 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Armadura_Gold_LOD0.obj</p>
                <p className="text-xs text-slate-500">Projeto: Cavaleiro Medieval</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors">
              <File className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">textura_diffuse.png</p>
                <p className="text-xs text-slate-500">Projeto: Cavaleiro Medieval / Texturas</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="p-12 text-center text-sm text-slate-500">
            Comece a digitar para pesquisar em todo o workspace.
          </div>
        )}
      </div>
    </div>
  );
}
