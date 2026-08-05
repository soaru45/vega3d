'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Users, Database, Sparkles, Activity, AlertTriangle, Zap, Server, ShieldCheck, Clock } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

export default function AdminDashboardPage() {
  const [liveUsers, setLiveUsers] = useState(0);
  const [generationsCount, setGenerationsCount] = useState(0);
  const [logs, setLogs] = useState<{ id: string; msg: string; time: string; type: 'info'|'warn'|'error' }[]>([]);
  
  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

    socket.on('connect', () => {
      setLogs(prev => [{ id: Date.now().toString(), msg: 'Conectado ao Node.js Master', time: new Date().toLocaleTimeString(), type: 'info' }, ...prev]);
    });

    socket.on('generation-progress-', (data) => {
      setGenerationsCount(prev => prev + 1);
      setLogs(prev => [{ id: Date.now().toString(), msg: `Geração ${data.status} - ${data.progress}%`, time: new Date().toLocaleTimeString(), type: 'info' }, ...prev].slice(0, 50));
    });

    socket.on('generation-complete-', (data) => {
      setLogs(prev => [{ id: Date.now().toString(), msg: `Worker finalizou e enviou ao S3. URL: ${data.modelUrl.substring(0,20)}...`, time: new Date().toLocaleTimeString(), type: 'info' }, ...prev].slice(0, 50));
    });

    // Simulando flutuação de usuários online
    const interval = setInterval(() => {
      setLiveUsers(Math.floor(Math.random() * 50) + 1200);
    }, 5000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            God Mode 
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-500 border border-red-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Live
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Monitoramento global de infraestrutura, billing e workers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <GodStatCard title="Usuários Ativos" value={liveUsers.toString()} icon={<Users className="w-5 h-5 text-indigo-400" />} />
        <GodStatCard title="Filas de IA" value={generationsCount.toString()} subtitle="Jobs processados nesta sessão" icon={<Sparkles className="w-5 h-5 text-yellow-400" />} />
        <GodStatCard title="Uso S3" value="14.2 TB" subtitle="2,481,200 objetos" icon={<Database className="w-5 h-5 text-emerald-400" />} />
        <GodStatCard title="Carga Geral (CPU)" value="34%" subtitle="Clusters Saudáveis" icon={<Activity className="w-5 h-5 text-red-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Console Ao Vivo */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-xl flex flex-col min-h-[400px] overflow-hidden relative">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> Terminal de Eventos do Gateway
            </h3>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-black/40">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">Aguardando eventos do WebSocket...</div>
            ) : (
              logs.map(log => (
                <div key={log.id} className={`mb-1 flex items-start gap-3 ${log.type === 'error' ? 'text-red-400' : log.type === 'warn' ? 'text-yellow-400' : 'text-slate-300'}`}>
                  <span className="text-slate-600 shrink-0">[{log.time}]</span>
                  <span>{log.msg}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status da Infraestrutura */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <Server className="w-4 h-4 text-indigo-400" /> Status dos Serviços
          </h3>
          
          <div className="space-y-4">
            <ServiceStatus name="API NestJS" status="online" uptime="99.9%" />
            <ServiceStatus name="Python Workers (TripoSR)" status="online" uptime="98.5%" />
            <ServiceStatus name="Redis (BullMQ)" status="online" uptime="100%" />
            <ServiceStatus name="Postgres (Prisma)" status="online" uptime="99.9%" />
            <ServiceStatus name="Stripe Webhooks" status="degraded" uptime="95.0%" />
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <button className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg text-sm font-semibold transition-all">
              Executar Purge no Redis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GodStatCard({ title, value, subtitle, icon }: { title: string, value: string, subtitle?: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="relative z-10">
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        {subtitle && <p className="text-[10px] font-medium text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function ServiceStatus({ name, status, uptime }: { name: string, status: 'online' | 'degraded' | 'offline', uptime: string }) {
  const colors = {
    online: 'bg-green-500',
    degraded: 'bg-yellow-500',
    offline: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${colors[status]} shadow-[0_0_8px_currentColor]`} />
        <span className="text-sm font-medium text-slate-300">{name}</span>
      </div>
      <span className="text-xs font-mono text-slate-500">{uptime}</span>
    </div>
  );
}
