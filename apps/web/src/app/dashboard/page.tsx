import * as React from "react";
import Link from "next/link";
import { Activity, Cuboid, TrendingUp, Users, Download, ArrowRight } from "lucide-react";

export default function DashboardOverviewPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#141414]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Bem-vindo de volta, Engenheiro. Aqui está o resumo das suas instâncias.</p>
        </div>
        <Link 
          href="/dashboard/workspace" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
        >
          <Cuboid className="w-4 h-4" />
          Novo Modelo 3D
        </Link>
      </div>

      {/* Métricas Globais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Modelos Gerados" value="1,248" trend="+12%" icon={<Cuboid className="text-indigo-400" />} />
        <MetricCard title="Uso de API" value="45.2K req" trend="+5%" icon={<Activity className="text-green-400" />} />
        <MetricCard title="Créditos V-Coins" value="120" trend="-30" icon={<TrendingUp className="text-yellow-400" />} />
        <MetricCard title="Bandwidth S3" value="14.2 GB" trend="+2.1 GB" icon={<Download className="text-blue-400" />} />
      </div>

      {/* Gráficos e Projetos Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white">Atividade da Rede Neural</h3>
            <select className="bg-[#141414] border border-white/10 text-xs text-slate-300 rounded px-2 py-1">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-white/5 rounded-lg bg-white/[0.02]">
            <p className="text-slate-500 text-sm">Integração com Recharts pendente. Exibindo placeholder.</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white">Gerações Recentes</h3>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            <RecentItem name="Cyberpunk Helmet" status="completed" time="2 min ago" />
            <RecentItem name="Low-poly Tree" status="processing" time="15 min ago" />
            <RecentItem name="Sci-Fi Rifle" status="completed" time="2 horas ago" />
            <RecentItem name="Medieval Chair" status="failed" time="Ontem" />
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl flex items-center justify-between group hover:border-white/10 transition-colors">
      <div>
        <p className="text-xs font-medium text-slate-400 mb-1">{title}</p>
        <h2 className="text-2xl font-bold text-white">{value}</h2>
        <p className={`text-[10px] mt-1 font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend} este mês
        </p>
      </div>
      <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
  );
}

function RecentItem({ name, status, time }: { name: string, status: string, time: string }) {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400',
    processing: 'bg-yellow-500/20 text-yellow-400',
    failed: 'bg-red-500/20 text-red-400',
  };
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
          <Cuboid className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">{name}</p>
          <p className="text-[10px] text-slate-500">{time}</p>
        </div>
      </div>
      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColors[status]}`}>
        {status}
      </div>
    </div>
  );
}
