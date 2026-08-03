'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Input } from '@vega3d/ui';

export default function LoginPage() {
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aqui viria a chamada axios.post('/v1/auth/login')
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email ou Nome de Usuário
        </label>
        <div className="mt-1">
          <Input 
            required 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            placeholder="ex: johndoe ou john@email.com" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Senha
        </label>
        <div className="mt-1">
          <Input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900 dark:text-slate-300">
            Lembrar de mim
          </label>
        </div>

        <div className="text-sm">
          <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Esqueceu a senha?
          </Link>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
      
      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Não tem uma conta?{' '}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          Cadastre-se grátis
        </Link>
      </div>
    </form>
  );
}
