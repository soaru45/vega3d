import * as React from 'react';
import { Users, Database, Sparkles, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Visão Geral do Sistema</h1>
        <p className="text-slate-500 text-sm mt-1">Bem-vindo ao centro de controle Vega3D.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Usuários" value="1,248" trend="+12%" icon={<Users className="w-5 h-5 text-blue-500" />} />
        <StatCard title="Gerações IA (Hoje)" value="3,490" trend="+5%" icon={<Sparkles className="w-5 h-5 text-indigo-500" />} />
        <StatCard title="Armazenamento (S3)" value="12.4 TB" trend="+800 GB" icon={<Database className="w-5 h-5 text-emerald-500" />} />
        <StatCard title="Custo de API (Estimado)" value="$420.50" trend="Estável" icon={<Activity className="w-5 h-5 text-orange-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Uso da Inteligência Artificial</h3>
          <div className="flex items-center justify-center h-64 text-slate-400 text-sm border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
            [Gráfico de Linha de Requisições Aqui]
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Últimos Erros (Dead Letters)</h3>
          <ul className="space-y-4">
             <li className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
               <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0" />
               <div>
                 <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Tripo3D API Timeout</p>
                 <p className="text-xs text-slate-500">Há 5 minutos - Job ID abc-123</p>
               </div>
             </li>
             <li className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
               <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0" />
               <div>
                 <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Falha ao subir para S3</p>
                 <p className="text-xs text-slate-500">Há 45 minutos - Upload Limit Exceeded</p>
               </div>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
        <p className="text-xs font-medium text-emerald-500 mt-1">{trend}</p>
      </div>
    </div>
  );
}
