'use client';

import * as React from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@vega3d/ui';
import { Laptop, Smartphone } from 'lucide-react';

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      
      {/* Alterar Senha */}
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Mantenha sua conta segura trocando a senha periodicamente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Senha Atual</label>
            <Input type="password" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nova Senha</label>
            <Input type="password" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirmar Nova Senha</label>
            <Input type="password" className="mt-1" />
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-900/50 justify-end">
          <Button>Atualizar Senha</Button>
        </CardFooter>
      </Card>

      {/* Sessões Ativas */}
      <Card>
        <CardHeader>
          <CardTitle>Sessões Ativas</CardTitle>
          <CardDescription>Gerencie onde você está conectado atualmente.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            
            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <Laptop className="w-6 h-6 text-indigo-500" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">Windows • Chrome</p>
                  <p className="text-xs text-slate-500">São Paulo, BR • IP: 177.34.xxx.xxx</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Sessão Atual</span>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="flex items-center gap-4">
                <Smartphone className="w-6 h-6 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">iPhone 14 Pro • Safari</p>
                  <p className="text-xs text-slate-500">Ontem às 18:30 • IP: 189.22.xxx.xxx</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                Revogar
              </Button>
            </div>

          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-900/50">
          <Button variant="outline" className="text-red-500 hover:text-red-600">
            Encerrar todas as outras sessões
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
}
