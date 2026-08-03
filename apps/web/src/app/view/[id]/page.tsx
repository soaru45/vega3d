import * as React from 'react';
import { Canvas3D } from '@/features/workspace/viewer/Canvas3D';
import { Box } from 'lucide-react';
import Link from 'next/link';

export default function PublicViewerPage({ params }: { params: { id: string } }) {
  // Em produção, buscaria o URL do modelo público baseado no ID
  // Como estamos sem backend rodando, usarei o Viewer vazio/placeholder
  
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-white">
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md z-10 absolute top-0 w-full">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-sm tracking-tight">Vega3D Public Viewer</span>
        </div>
        <Link href="/register" className="text-xs font-medium bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full transition-colors">
          Criar meu próprio 3D
        </Link>
      </header>

      <main className="flex-1 w-full h-full relative">
        <Canvas3D />
      </main>
    </div>
  );
}
