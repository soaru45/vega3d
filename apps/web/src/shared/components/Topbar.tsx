import * as React from 'react';
import Link from 'next/link';
import { Bell, Globe, Sparkles, Hexagon } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-white/5 bg-[#141414] px-4 md:px-6">
      
      {/* Esquerda: Logo e Navegação */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Hexagon className="h-4 w-4 text-white fill-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white uppercase">Vega 3D</span>
        </Link>

        {/* Separator */}
        <div className="h-4 w-px bg-white/10 hidden md:block"></div>

        {/* Links Principais */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-yellow-400 flex items-center gap-1">
            Espaço 3D
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </Link>
          <Link href="/dashboard/home" className="text-slate-400 hover:text-white transition-colors">Início</Link>
          <Link href="/dashboard/library" className="text-slate-400 hover:text-white transition-colors">Ativos</Link>
          <Link href="/dashboard/affiliates" className="text-slate-400 hover:text-white transition-colors">Programa de afiliados</Link>
          <Link href="/dashboard/creators" className="text-slate-400 hover:text-white transition-colors">Programa de Criador</Link>
        </nav>
      </div>

      {/* Direita: Ações e Perfil */}
      <div className="flex items-center gap-4">
        
        {/* DCC Bridge */}
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          DCC Bridge
        </button>

        {/* Moedas */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10">
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-[10px] font-bold text-black">V</span>
          </div>
          <span className="text-xs font-medium text-yellow-500">120</span>
        </div>

        {/* Botão Upgrade */}
        <button className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold transition-colors">
          🚀 Upgrade
        </button>

        {/* Ícones Menores */}
        <div className="flex items-center gap-3 ml-2">
          <button className="text-slate-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-[#141414]"></span>
          </button>
          
          <button className="text-slate-400 hover:text-white hidden sm:block">
            <Globe className="w-5 h-5" />
          </button>
          
          {/* Avatar Placeholder */}
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 overflow-hidden ml-1 flex items-center justify-center border border-white/20 cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </header>
  );
}
