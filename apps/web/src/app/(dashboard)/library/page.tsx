'use client';

import * as React from 'react';
import { useLibraryStore } from '@/shared/stores/useLibraryStore';
import { AssetCard } from '@/shared/components/library/AssetCard';
import { AssetPreviewModal } from '@/shared/components/library/AssetPreviewModal';

const MOCK_ASSETS = [
  { id: 'asset-1', name: 'Armadura_Gold_LOD0.glb', type: 'MODEL3D' as const, isFavorite: true, size: '12.4 MB' },
  { id: 'asset-2', name: 'Textura_Metal_Diffuse.png', type: 'IMAGE' as const, isFavorite: false, size: '4.1 MB', thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&h=200&fit=crop' },
  { id: 'asset-3', name: 'Pedra_Vulcanica.obj', type: 'MODEL3D' as const, isFavorite: false, size: '8.2 MB' },
  { id: 'asset-4', name: 'HDRI_Studio.png', type: 'IMAGE' as const, isFavorite: true, size: '15.6 MB', thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&h=200&fit=crop' },
];

export default function LibraryPage() {
  const { viewMode, activeFilter, selectedIds, clearSelection } = useLibraryStore();

  // Em produção, isso viria da rota GET /v1/library/assets?filter=activeFilter

  return (
    <>
      {/* Banner Superior se houver itens selecionados */}
      {selectedIds.size > 0 && (
        <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
            {selectedIds.size} item(s) selecionado(s)
          </span>
          <div className="flex items-center gap-3">
             <button onClick={clearSelection} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Limpar seleção</button>
             <button className="text-sm px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm">Mover para Pastas</button>
             <button className="text-sm px-3 py-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800 rounded shadow-sm">Excluir</button>
          </div>
        </div>
      )}

      {/* Grid ou List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {MOCK_ASSETS.map(asset => <AssetCard key={asset.id} {...asset} />)}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          {MOCK_ASSETS.map(asset => <AssetCard key={asset.id} {...asset} />)}
        </div>
      )}

      <AssetPreviewModal />
    </>
  );
}
