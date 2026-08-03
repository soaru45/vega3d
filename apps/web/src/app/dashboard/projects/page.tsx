'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search, Star, MoreVertical, Clock } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@vega3d/ui';

export default function ProjectsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Projetos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie seus workspaces de geração 3D.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Buscar projetos..." className="pl-9" />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Novo Projeto
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {/* Placeholder Project Card 1 */}
        <Card className="group hover:border-indigo-500/50 transition-colors cursor-pointer flex flex-col h-full">
          <div className="aspect-video w-full bg-slate-100 dark:bg-slate-900 rounded-t-lg border-b border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/50 dark:bg-black/50 backdrop-blur text-yellow-500 hover:text-yellow-600 hover:bg-white dark:hover:bg-slate-800">
                <Star className="w-4 h-4 fill-current" />
              </Button>
            </div>
            <div className="w-16 h-16 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
               <span className="text-2xl">⚔️</span>
            </div>
          </div>
          <CardHeader className="pb-3 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Cavaleiro Medieval</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">Personagem lowpoly com armadura dourada.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardFooter className="pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 p-4 mt-auto">
             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3 h-3" /> Atualizado há 2h
             </div>
             <Link href="/projects/proj_123">
               <Button variant="secondary" size="sm">Abrir</Button>
             </Link>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
