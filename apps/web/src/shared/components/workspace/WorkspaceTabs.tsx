'use client';

import * as React from 'react';
import { useWorkspaceStore, TabItem } from '@/shared/stores/useWorkspaceStore';
import { Box, FileImage, Settings2, X } from 'lucide-react';

export function WorkspaceTabs() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useWorkspaceStore();

  const getIcon = (type: TabItem['type']) => {
    switch (type) {
      case '3d': return <Box className="w-3.5 h-3.5" />;
      case 'file': return <FileImage className="w-3.5 h-3.5" />;
      case 'tool': return <Settings2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex items-center w-full h-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center h-full px-4 min-w-[120px] max-w-[200px] border-r border-slate-200 dark:border-slate-800 cursor-pointer transition-colors ${
              isActive 
                ? 'bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 border-t-2 border-t-indigo-500' 
                : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-t-2 border-t-transparent'
            }`}
          >
            <span className="mr-2 opacity-70">{getIcon(tab.type)}</span>
            <span className="text-sm font-medium truncate flex-1">{tab.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className={`ml-2 p-0.5 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ${isActive ? 'opacity-100' : ''}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
