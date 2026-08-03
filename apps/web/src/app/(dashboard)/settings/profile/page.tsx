'use client';

import * as React from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@vega3d/ui';

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil Público</CardTitle>
          <CardDescription>Informações visíveis para a comunidade Vega3D.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 text-2xl font-bold">
              J
            </div>
            <Button variant="outline">Alterar Avatar</Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
              <Input className="mt-1" defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
              <Input className="mt-1" defaultValue="johndoe" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Biografia</label>
            <textarea 
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
              rows={3}
              defaultValue="Criador de mundos 3D."
            />
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-900/50 justify-end">
          <Button>Salvar Alterações</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
