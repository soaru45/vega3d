import * as React from 'react';
import { Activity, LogIn, Upload, Plus } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'audit' | 'project';
  action: string;
  date: string;
  details?: string | null;
}

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  const getIcon = (action: string) => {
    if (action.includes('LOGIN')) return <LogIn className="w-4 h-4 text-blue-500" />;
    if (action.includes('UPLOAD')) return <Upload className="w-4 h-4 text-emerald-500" />;
    if (action.includes('CREATED')) return <Plus className="w-4 h-4 text-indigo-500" />;
    return <Activity className="w-4 h-4 text-slate-500" />;
  };

  const formatMessage = (action: string, details?: string | null) => {
    switch (action) {
      case 'USER_LOGGED_IN': return 'Você fez login';
      case 'PROJECT_CREATED': return `Projeto criado: ${details || 'Sem nome'}`;
      case 'FILE_UPLOADED': return `Arquivo enviado para o projeto: ${details}`;
      default: return action;
    }
  };

  return (
    <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-6 py-2">
      {items.map((item) => (
        <div key={item.id} className="relative pl-6">
          <div className="absolute -left-3.5 top-1 w-7 h-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center">
             {getIcon(item.action)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {formatMessage(item.action, item.details)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {new Date(item.date).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
