'use client';

import * as React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useWorkspaceStore } from '@/shared/stores/useWorkspaceStore';

interface SplitPanelsProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function SplitPanels({ leftPanel, centerPanel, rightPanel }: SplitPanelsProps) {
  const { isSidebarOpen, isRightPanelOpen, sidebarWidth, rightPanelWidth, setSidebarWidth, setRightPanelWidth } = useWorkspaceStore();

  return (
    <PanelGroup direction="horizontal" className="h-full w-full">
      {/* Sidebar Panel */}
      {isSidebarOpen && (
        <>
          <Panel 
            defaultSize={sidebarWidth} 
            minSize={15} 
            maxSize={30}
            onResize={(size) => setSidebarWidth(size)}
            className="h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            {leftPanel}
          </Panel>
          <PanelResizeHandle className="w-1 bg-transparent hover:bg-indigo-500 transition-colors cursor-col-resize active:bg-indigo-600" />
        </>
      )}

      {/* Center Panel (Viewport/Main Area) */}
      <Panel className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col min-w-[300px]">
        {centerPanel}
      </Panel>

      {/* Right Panel (Copilot/Properties) */}
      {isRightPanelOpen && (
        <>
          <PanelResizeHandle className="w-1 bg-transparent hover:bg-indigo-500 transition-colors cursor-col-resize active:bg-indigo-600" />
          <Panel 
            defaultSize={rightPanelWidth} 
            minSize={20} 
            maxSize={40}
            onResize={(size) => setRightPanelWidth(size)}
            className="h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            {rightPanel}
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}
