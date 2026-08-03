'use client';

import * as React from 'react';
import { Layers, Box, HardDrive, Coins } from 'lucide-react';
import { StatCard } from '@/shared/components/widgets/StatCard';
import { ActivityTimeline } from '@/shared/components/widgets/ActivityTimeline';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent } from '@vega3d/ui';

// Mocks simulando retorno do backend
const MOCK_SUMMARY = {
  totalProjects: 12,
  modelsCreated: 45,
  storageUsed: 2147483648, // 2GB em bytes
  storageLimit: 5368709120, // 5GB em bytes
  credits: 80,
};

const MOCK_ACTIVITIES = [
  { id: '1', type: 'project' as const, action: 'MODEL_GENERATED', date: new Date().toISOString(), details: 'Cavaleiro Medieval' },
  { id: '2', type: 'project' as const, action: 'FILE_UPLOADED', date: new Date(Date.now() - 3600000).toISOString(), details: 'textura.png' },
  { id: '3', type: 'audit' as const, action: 'USER_LOGGED_IN', date: new Date(Date.now() - 86400000).toISOString() },
];

export default function DashboardOverviewPage() {
  const { user } = useAuthStore();
  
  // Formatadores
  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb > 1024) return (mb / 1024).toFixed(2) + ' GB';
    return mb.toFixed(0) + ' MB';
  };
  
  const storagePercentage = (MOCK_SUMMARY.storageUsed / MOCK_SUMMARY.storageLimit) * 100;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Saudação */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Olá, {user?.name?.split(' ')[0] || 'Criador'} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Bem-vindo de volta ao seu painel. Veja o que está acontecendo hoje.
        </p>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total de Projetos" 
          value={MOCK_SUMMARY.totalProjects} 
          icon={<Layers className="w-5 h-5" />} 
          trend={{ value: '2 novos', isPositive: true }} 
        />
        <StatCard 
          title="Modelos Gerados" 
          value={MOCK_SUMMARY.modelsCreated} 
          icon={<Box className="w-5 h-5" />} 
        />
        <StatCard 
          title="Créditos Disponíveis" 
          value={MOCK_SUMMARY.credits} 
          icon={<Coins className="w-5 h-5" />} 
          description="Renova em 15 dias"
        />
        <StatCard 
          title="Armazenamento" 
          value={formatBytes(MOCK_SUMMARY.storageUsed)} 
          icon={<HardDrive className="w-5 h-5" />} 
          description={`De ${formatBytes(MOCK_SUMMARY.storageLimit)}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Painel Central Maior - Resumo / Gráfico */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Uso de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="font-medium">Armazenamento em Nuvem</span>
                   <span className="text-slate-500">{storagePercentage.toFixed(1)}% utilizado</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                   <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${storagePercentage}%` }}></div>
                 </div>
               </div>
               
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="font-medium">Cota de Créditos de IA</span>
                   <span className="text-slate-500">{MOCK_SUMMARY.credits}/100</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                   <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${MOCK_SUMMARY.credits}%` }}></div>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Sidebar Direita - Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline items={MOCK_ACTIVITIES} />
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}
