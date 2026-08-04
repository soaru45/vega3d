import { create } from 'zustand';

interface WorkspaceState {
  modelUrl: string | null;
  isGenerating: boolean;
  progress: number;
  taskId: string | null;
  
  setModelUrl: (url: string | null) => void;
  setIsGenerating: (status: boolean) => void;
  setProgress: (progress: number) => void;
  setTaskId: (id: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  modelUrl: null,
  isGenerating: false,
  progress: 0,
  taskId: null,
  
  setModelUrl: (url) => set({ modelUrl: url }),
  setIsGenerating: (status) => set({ isGenerating: status }),
  setProgress: (progress) => set({ progress }),
  setTaskId: (id) => set({ taskId: id }),
}));
