import { create } from 'zustand';

interface ActiveGeneration {
  id: string;
  prompt: string;
  progress: number;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  modelUrl?: string;
}

interface AiState {
  activeGeneration: ActiveGeneration | null;
  
  startGeneration: (id: string, prompt: string) => void;
  updateGeneration: (progress: number, status: ActiveGeneration['status'], modelUrl?: string) => void;
  clearGeneration: () => void;
}

export const useAiStore = create<AiState>((set) => ({
  activeGeneration: null,

  startGeneration: (id, prompt) => set({ 
    activeGeneration: { id, prompt, progress: 0, status: 'QUEUED' } 
  }),
  
  updateGeneration: (progress, status, modelUrl) => set((state) => ({
    activeGeneration: state.activeGeneration 
      ? { ...state.activeGeneration, progress, status, modelUrl } 
      : null
  })),

  clearGeneration: () => set({ activeGeneration: null }),
}));
