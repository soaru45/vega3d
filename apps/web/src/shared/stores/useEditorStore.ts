import { create } from 'zustand';

type TransformMode = 'translate' | 'rotate' | 'scale';

interface EditorState {
  isEditMode: boolean;
  transformMode: TransformMode;
  selectedMeshId: string | null;
  
  toggleEditMode: () => void;
  setTransformMode: (mode: TransformMode) => void;
  setSelectedMesh: (id: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isEditMode: false,
  transformMode: 'translate',
  selectedMeshId: null,

  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode, selectedMeshId: null })),
  setTransformMode: (transformMode) => set({ transformMode }),
  setSelectedMesh: (selectedMeshId) => set({ selectedMeshId })
}));
