import { create } from 'zustand';

export interface UploadTask {
  id: string; // uploadJobId
  filename: string;
  totalSize: number;
  uploadedSize: number;
  progress: number;
  status: 'PENDING' | 'UPLOADING' | 'PAUSED' | 'COMPLETED' | 'FAILED';
  file?: File; // Referência local no browser
}

interface UploadState {
  queue: UploadTask[];
  isOpen: boolean;
  
  toggleOverlay: () => void;
  addTask: (task: UploadTask) => void;
  updateProgress: (id: string, uploadedSize: number) => void;
  updateStatus: (id: string, status: UploadTask['status']) => void;
  removeTask: (id: string) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  queue: [],
  isOpen: false,

  toggleOverlay: () => set((state) => ({ isOpen: !state.isOpen })),
  
  addTask: (task) => set((state) => {
    // Abre o overlay automaticamente ao iniciar um novo upload
    return { queue: [task, ...state.queue], isOpen: true };
  }),

  updateProgress: (id, uploadedSize) => set((state) => ({
    queue: state.queue.map(task => 
      task.id === id 
        ? { ...task, uploadedSize, progress: Math.min(100, Math.round((uploadedSize / task.totalSize) * 100)) } 
        : task
    )
  })),

  updateStatus: (id, status) => set((state) => ({
    queue: state.queue.map(task => 
      task.id === id ? { ...task, status } : task
    )
  })),

  removeTask: (id) => set((state) => ({
    queue: state.queue.filter(task => task.id !== id)
  }))
}));
