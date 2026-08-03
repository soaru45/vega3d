import { create } from 'zustand';

interface ModelMetadata {
  vertices: number;
  faces: number;
  meshes: number;
  size: [number, number, number]; // width, height, depth bounds
}

interface ViewerState {
  // Configurações da Cena
  showGrid: boolean;
  showAxes: boolean;
  wireframeMode: boolean;
  backgroundColor: string;
  environmentIntensity: number;
  
  // Status do Modelo Carregado
  isModelLoading: boolean;
  modelError: string | null;
  activeModelUrl: string | null;
  modelMetadata: ModelMetadata | null;

  // Actions
  toggleGrid: () => void;
  toggleAxes: () => void;
  toggleWireframe: () => void;
  setBackgroundColor: (color: string) => void;
  
  loadModel: (url: string) => void;
  setModelLoading: (loading: boolean) => void;
  setModelError: (error: string | null) => void;
  setModelMetadata: (metadata: ModelMetadata) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  showGrid: true,
  showAxes: true,
  wireframeMode: false,
  backgroundColor: '#1e293b', // default slate-800
  environmentIntensity: 1.0,

  isModelLoading: false,
  modelError: null,
  activeModelUrl: null,
  modelMetadata: null,

  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleAxes: () => set((state) => ({ showAxes: !state.showAxes })),
  toggleWireframe: () => set((state) => ({ wireframeMode: !state.wireframeMode })),
  setBackgroundColor: (color) => set({ backgroundColor: color }),

  loadModel: (url) => set({ activeModelUrl: url, isModelLoading: true, modelError: null, modelMetadata: null }),
  setModelLoading: (loading) => set({ isModelLoading: loading }),
  setModelError: (error) => set({ modelError: error, isModelLoading: false }),
  setModelMetadata: (metadata) => set({ modelMetadata: metadata, isModelLoading: false })
}));
