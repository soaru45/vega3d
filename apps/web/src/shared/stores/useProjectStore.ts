import { create } from 'zustand';

interface Project {
  id: string;
  name: string;
  isFavorite: boolean;
  updatedAt: string;
}

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  toggleFavorite: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  toggleFavorite: (id) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ),
    })),
}));
