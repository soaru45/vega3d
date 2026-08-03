'use client';

import * as React from 'react';
import { WorkspaceSidebar } from '@/features/workspace/WorkspaceSidebar';
import { WorkspaceRightPanel } from '@/features/workspace/WorkspaceRightPanel';
import { WorkspaceStatusBar } from '@/features/workspace/WorkspaceStatusBar';
import { SplitPanels } from '@/shared/components/workspace/SplitPanels';
import { GlobalSearch } from '@/shared/components/workspace/GlobalSearch';
import { GlobalUploadOverlay } from '@/shared/components/uploads/GlobalUploadOverlay';
import { useWorkspaceStore } from '@/shared/stores/useWorkspaceStore';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSearchOpen } = useWorkspaceStore();
  
  // Odiamos padding do Dashboard Root, então forçamos tela cheia na Viewport
  return (
    <div className="fixed inset-0 pt-16 z-40 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden">
      
      {/* Search Modal Global Injetado */}
      <GlobalSearch />
      
      {/* Sistema Inteligente de Upload Global */}
      <GlobalUploadOverlay />

      {/* Main Resizable Area */}
      <div className="flex-1 flex overflow-hidden">
        <SplitPanels 
          leftPanel={<WorkspaceSidebar />}
          centerPanel={children}
          rightPanel={<WorkspaceRightPanel />}
        />
      </div>

      {/* Footer / Status Bar - Fixo */}
      <div className="h-6 flex-shrink-0 z-50">
        <WorkspaceStatusBar />
      </div>
      
    </div>
  );
}
