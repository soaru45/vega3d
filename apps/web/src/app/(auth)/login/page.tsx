'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@vega3d/ui';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        identifier,
        password,
      }, { withCredentials: true });
      
      if (response.status === 200) {
        // Redireciona para o app
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white">Bem-vindo de volta</h3>
        <p className="text-sm text-slate-400 mt-1">Acesse seus projetos em 3D</p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Email ou Usuário
          </label>
          <Input 
            required 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            placeholder="johndoe@email.com" 
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Senha
          </label>
          <Input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-slate-900"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
              Lembrar de mim
            </label>
          </div>

          <Link href="/forgot-password" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0" disabled={loading}>
          {loading ? 'Entrando...' : 'Acessar Plataforma'}
        </Button>
        
        <div className="text-center text-sm text-slate-400 pt-2">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Cadastre-se grátis
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
