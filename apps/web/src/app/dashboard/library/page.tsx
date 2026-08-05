import * as React from "react";
import { Folder, Search, Filter, MoreVertical, Cuboid, Download, Trash, Share2 } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#141414]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Biblioteca de Assets</h1>
          <p className="text-sm text-slate-400 mt-1">Gerencie seus modelos 3D, texturas e materiais renderizados.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar asset..." 
              className="bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-64 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      {/* Grid de Pastas (Simulação de sistema de arquivos) */}
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Pastas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <FolderCard name="Personagens Sci-Fi" count="12 assets" size="1.2 GB" />
        <FolderCard name="Armas e Equipamentos" count="45 assets" size="3.4 GB" />
        <FolderCard name="Ambientes / Props" count="8 assets" size="800 MB" />
        <FolderCard name="Testes de Retopologia" count="3 assets" size="120 MB" />
      </div>

      {/* Lista de Arquivos Recentes */}
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Assets Recentes</h3>
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-3 text-xs font-semibold text-slate-400">Nome do Asset</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-400">Polígonos</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-400">Tamanho</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-400">Data</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-400 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AssetRow name="Cyber_Helmet_v2.glb" poly="45K Tris" size="12.4 MB" date="Hoje, 14:32" />
            <AssetRow name="SciFi_Rifle_Base.glb" poly="12K Tris" size="4.1 MB" date="Ontem, 09:15" />
            <AssetRow name="Astronaut_Rigged.fbx" poly="60K Tris" size="28.9 MB" date="02 Ago, 2026" />
            <AssetRow name="Alien_Flora_01.obj" poly="8K Tris" size="2.2 MB" date="01 Ago, 2026" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FolderCard({ name, count, size }: { name: string, count: string, size: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl hover:border-indigo-500/50 hover:bg-white/[0.02] transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
          <Folder className="w-6 h-6 fill-indigo-500/20" />
        </div>
        <button className="text-slate-500 hover:text-white p-1">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <h4 className="text-sm font-semibold text-slate-200 mb-1">{name}</h4>
      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
        <span>{count}</span>
        <span>{size}</span>
      </div>
    </div>
  );
}

function AssetRow({ name, poly, size, date }: { name: string, poly: string, size: string, date: string }) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Cuboid className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-sm font-medium text-slate-200">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-400">{poly}</td>
      <td className="px-6 py-4 text-sm text-slate-400">{size}</td>
      <td className="px-6 py-4 text-sm text-slate-400">{date}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded" title="Compartilhar">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded" title="Download">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded" title="Excluir">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
