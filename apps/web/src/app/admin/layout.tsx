'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, LayoutDashboard, Users, Server, Settings, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@vega3d/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Usuários', path: '/admin/users', icon: Users },
    { name: 'Servidores & IA', path: '/admin/servers', icon: Server },
    { name: 'Segurança', path: '/admin/security', icon: ShieldAlert },
    { name: 'Configurações', path: '/admin/settings', icon: Settings },
  ];

  // Em produção, deve haver um AuthGuard validando `role === 'ADMIN'`

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Sidebar Admin */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Box className="w-6 h-6" />
            <span className="font-bold tracking-tight">Vega3D Admin</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" asChild className="w-full justify-start text-slate-500">
            <Link href="/projects"><ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao App</Link>
          </Button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
