'use client';

import * as React from 'react';
import { WorkspaceMainArea } from '@/features/workspace/WorkspaceMainArea';
import { WorkspaceTabs } from '@/shared/components/workspace/WorkspaceTabs';
import { FileManager } from '@/features/files/FileManager';
import { useWorkspaceStore } from '@/shared/stores/useWorkspaceStore';

export default function ProjectWorkspacePage({ params }: { params: { id: string } }) {
  const { activeTabId } = useWorkspaceStore();

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-slate-950">
      
      {/* Top Tabs */}
      <WorkspaceTabs />

      {/* Dynamic Content based on Active Tab */}
      <div className="flex-1 relative overflow-hidden">
        {activeTabId === 'main' && <WorkspaceMainArea />}
        {activeTabId?.startsWith('file-') && (
          <div className="absolute inset-0 bg-white dark:bg-slate-900 overflow-auto p-4">
             <FileManager projectId={params.id} />
          </div>
        )}
        {!activeTabId && (
          <div className="flex items-center justify-center h-full text-slate-500">
            Nenhuma aba aberta. Selecione um arquivo no Explorer ou pressione Cmd+K.
          </div>
        )}
      </div>

    </div>
  );
}
