import * as React from "react";
import Link from "next/link";
import { Home, Folder, Cuboid, Settings, Zap, Key, Activity } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-white/5 flex flex-col gap-1">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enterprise Workspace</h3>
        <p className="text-[10px] text-slate-400">Plano Pro • 120 V-Coins</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link href="/dashboard/workspace" className="flex items-center gap-3 px-3 py-2 rounded-lg text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
          <Cuboid className="w-4 h-4" />
          <span className="text-sm font-medium">Motor de Geração 3D</span>
          <Zap className="w-3 h-3 text-yellow-500 ml-auto" />
        </Link>
        <Link href="/dashboard/library" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
          <Folder className="w-4 h-4" />
          <span className="text-sm font-medium">Biblioteca de Assets</span>
        </Link>
        
        <div className="my-4 border-t border-white/5 mx-2"></div>
        <div className="px-3 mb-2">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gestão</h4>
        </div>

        <Link href="/dashboard/api-keys" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
          <Key className="w-4 h-4" />
          <span className="text-sm font-medium">API Keys & Webhooks</span>
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Configurações</span>
        </Link>

        <div className="my-4 border-t border-white/5 mx-2"></div>
        <div className="px-3 mb-2">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Administração</h4>
        </div>
        
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group">
          <Activity className="w-4 h-4 group-hover:animate-pulse" />
          <span className="text-sm font-medium">Painel Admin (God Mode)</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-white/5">
        <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
           Sair
        </button>
      </div>
    </aside>
  );
}
