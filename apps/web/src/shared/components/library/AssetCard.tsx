'use client';

import * as React from 'react';
import { Star, Image as ImageIcon, Box, MoreVertical, CheckCircle2 } from 'lucide-react';
import { useLibraryStore } from '@/shared/stores/useLibraryStore';

interface AssetCardProps {
  id: string;
  name: string;
  type: 'IMAGE' | 'MODEL3D' | 'TEXTURE' | 'OTHER';
  isFavorite: boolean;
  thumbnailUrl?: string;
  size: string;
}

export function AssetCard({ id, name, type, isFavorite, thumbnailUrl, size }: AssetCardProps) {
  const { viewMode, selectedIds, toggleSelection, setPreviewAsset } = useLibraryStore();
  const isSelected = selectedIds.has(id);

  const getIcon = () => {
    if (type === 'MODEL3D') return <Box className="w-8 h-8 text-indigo-500" />;
    return <ImageIcon className="w-8 h-8 text-emerald-500" />;
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => toggleSelection(id)}
        onDoubleClick={() => setPreviewAsset(id)}
        className={`flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 cursor-pointer transition-colors ${
          isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
             {thumbnailUrl ? <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover rounded" /> : getIcon()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{name}</p>
            <p className="text-xs text-slate-500">{size}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={(e) => { e.stopPropagation(); }} className="text-slate-400 hover:text-yellow-500">
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  // Grid Mode
  return (
    <div 
      onClick={() => toggleSelection(id)}
      onDoubleClick={() => setPreviewAsset(id)}
      className={`group relative rounded-xl border cursor-pointer transition-all ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500 shadow-md' 
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="absolute top-2 left-2 z-10">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
          isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 opacity-0 group-hover:opacity-100'
        }`}>
          {isSelected && <CheckCircle2 className="w-4 h-4" />}
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 rounded-md bg-white/80 dark:bg-slate-900/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-slate-500 hover:text-yellow-500 shadow-sm border border-slate-200 dark:border-slate-800">
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
        </button>
      </div>

      <div className="aspect-square rounded-t-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          getIcon()
        )}
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{size} • {type}</p>
      </div>
    </div>
  );
}
