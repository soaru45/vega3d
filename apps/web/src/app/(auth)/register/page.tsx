'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@vega3d/ui';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const isLengthOk = password.length >= 8;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLengthOk || !hasSpecial || password !== confirmPassword) {
       setErrorMsg('Verifique se as senhas coincidem e cumprem os requisitos.');
       return;
    }

    setLoading(true);
    setErrorMsg('');
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        setErrorMsg(data.message || 'Erro ao criar conta. Usuário ou Email podem já estar em uso.');
      }
    } catch (err: any) {
      setErrorMsg('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white">Criar Nova Conta</h3>
        <p className="text-sm text-slate-400 mt-1">Gere modelos 3D com IA hoje mesmo</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300">Nome Completo</label>
          <Input 
            required 
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500" 
            placeholder="John Doe" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Usuário</label>
          <Input 
            required 
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500" 
            placeholder="johndoe" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Email</label>
          <Input 
            type="email" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500" 
            placeholder="john@exemplo.com" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Senha</label>
          <Input 
            type="password" 
            required 
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          
          <div className="mt-2 space-y-1 text-xs">
             <div className={`flex items-center gap-1 ${isLengthOk ? 'text-green-400' : 'text-slate-500'}`}>
                {isLengthOk ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Mínimo 8 caracteres
             </div>
             <div className={`flex items-center gap-1 ${hasSpecial ? 'text-green-400' : 'text-slate-500'}`}>
                {hasSpecial ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Um caractere especial
             </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Confirmar Senha</label>
          <Input 
            type="password" 
            required 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="mt-1 bg-black/50 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500" 
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 mt-6" disabled={loading}>
          {loading ? 'Criando Conta...' : 'Começar Gratuitamente'}
        </Button>
        
        <div className="text-center text-sm text-slate-400 pt-2">
          Já possui conta?{' '}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Fazer login
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
