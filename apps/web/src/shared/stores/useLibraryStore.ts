import { create } from 'zustand';

interface LibraryState {
  viewMode: 'grid' | 'list';
  activeFilter: 'all' | 'images' | 'models' | 'favorites' | 'trash';
  selectedIds: Set<string>;
  previewAssetId: string | null;
  
  setViewMode: (mode: 'grid' | 'list') => void;
  setActiveFilter: (filter: 'all' | 'images' | 'models' | 'favorites' | 'trash') => void;
  
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  selectAll: (ids: string[]) => void;
  
  setPreviewAsset: (id: string | null) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  viewMode: 'grid',
  activeFilter: 'all',
  selectedIds: new Set(),
  previewAssetId: null,

  setViewMode: (viewMode) => set({ viewMode }),
  setActiveFilter: (activeFilter) => set({ activeFilter, selectedIds: new Set() }),

  toggleSelection: (id) => set((state) => {
    const newSet = new Set(state.selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    return { selectedIds: newSet };
  }),
  clearSelection: () => set({ selectedIds: newSet() }),
  selectAll: (ids) => set({ selectedIds: new Set(ids) }),

  setPreviewAsset: (previewAssetId) => set({ previewAssetId }),
}));
