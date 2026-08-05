'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Users, Server, Settings, ShieldAlert, ArrowLeft, Hexagon } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: 'Métricas ao Vivo', path: '/admin', icon: Activity },
    { name: 'Usuários', path: '/admin/users', icon: Users },
    { name: 'Nós de Inteligência', path: '/admin/nodes', icon: Server },
    { name: 'Logs de Auditoria', path: '/admin/audit', icon: ShieldAlert },
    { name: 'Configurações Globais', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar God Mode */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-red-900/30 flex flex-col h-full shrink-0 relative overflow-hidden">
        {/* Glow red effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-red-600/10 blur-[100px] pointer-events-none"></div>

        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0 z-10">
          <div className="flex items-center gap-3 text-red-500">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-red-500/10 border border-red-500/20">
              <Hexagon className="w-5 h-5 fill-red-500/20" />
            </div>
            <div>
              <span className="block font-bold tracking-tight leading-tight">VEGA3D</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-red-400">God Mode</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar z-10">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${isActive ? 'bg-red-500/10 text-red-400 font-semibold border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 z-10">
          <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-slate-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao App Normal
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
