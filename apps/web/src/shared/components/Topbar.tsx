'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@vega3d/ui';

export function Topbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-950/75 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-slate-500"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex flex-1 items-center justify-end gap-4">
        {/* Futuro Breadcrumb e Search Bar podem entrar aqui */}
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* Avatar Placeholder */}
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700 ml-4 flex items-center justify-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
