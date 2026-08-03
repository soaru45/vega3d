import { create } from 'zustand';

export interface TabItem {
  id: string;
  title: string;
  type: 'file' | 'tool' | '3d';
}

interface WorkspaceState {
  isSidebarOpen: boolean;
  isRightPanelOpen: boolean;
  sidebarWidth: number;
  rightPanelWidth: number;
  activeFileId: string | null;
  tabs: TabItem[];
  activeTabId: string | null;
  isSearchOpen: boolean;
  
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  setSidebarWidth: (w: number) => void;
  setRightPanelWidth: (w: number) => void;
  setActiveFile: (id: string | null) => void;
  
  openTab: (tab: TabItem) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  
  setSearchOpen: (open: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  isSidebarOpen: true,
  isRightPanelOpen: true,
  sidebarWidth: 20,
  rightPanelWidth: 25,
  activeFileId: null,
  tabs: [{ id: 'main', title: 'Viewport 3D', type: '3d' }],
  activeTabId: 'main',
  isSearchOpen: false,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleRightPanel: () => set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
  setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),
  setRightPanelWidth: (rightPanelWidth) => set({ rightPanelWidth }),
  setActiveFile: (activeFileId) => set({ activeFileId }),

  openTab: (tab) => set((state) => {
    if (!state.tabs.find(t => t.id === tab.id)) {
      return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }
    return { activeTabId: tab.id };
  }),
  closeTab: (id) => set((state) => {
    const newTabs = state.tabs.filter(t => t.id !== id);
    return { 
      tabs: newTabs, 
      activeTabId: state.activeTabId === id ? (newTabs[newTabs.length - 1]?.id || null) : state.activeTabId 
    };
  }),
  setActiveTab: (activeTabId) => set({ activeTabId }),
  
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
}));
