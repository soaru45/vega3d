import { create } from 'zustand';

interface WorkspaceState {
  modelUrl: string | null;
  isGenerating: boolean;
  progress: number;
  taskId: string | null;
  analysisText: string;
  
  setModelUrl: (url: string | null) => void;
  setIsGenerating: (status: boolean) => void;
  setProgress: (progress: number) => void;
  setTaskId: (id: string | null) => void;
  setAnalysisText: (text: string) => void;
  appendAnalysisText: (text: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  modelUrl: null,
  isGenerating: false,
  progress: 0,
  taskId: null,
  analysisText: '',
  
  setModelUrl: (url) => set({ modelUrl: url }),
  setIsGenerating: (status) => set({ isGenerating: status }),
  setProgress: (progress) => set({ progress }),
  setTaskId: (id) => set({ taskId: id }),
  setAnalysisText: (text) => set({ analysisText: text }),
  appendAnalysisText: (text) => set((state) => ({ analysisText: state.analysisText + text })),
}));
