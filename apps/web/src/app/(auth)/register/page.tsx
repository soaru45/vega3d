'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Input } from '@vega3d/ui';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function RegisterPage() {
  const [password, setPassword] = React.useState('');
  
  // Regras visuais mockadas de Força de Senha
  const isLengthOk = password.length >= 8;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome Completo</label>
        <Input required className="mt-1" placeholder="John Doe" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <Input type="email" required className="mt-1" placeholder="john@exemplo.com" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
        <Input 
          type="password" 
          required 
          className="mt-1" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Validação de Força de Senha Visual */}
        <div className="mt-2 space-y-1 text-xs">
           <div className={`flex items-center gap-1 ${isLengthOk ? 'text-green-600' : 'text-slate-500'}`}>
              {isLengthOk ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Mínimo 8 caracteres
           </div>
           <div className={`flex items-center gap-1 ${hasSpecial ? 'text-green-600' : 'text-slate-500'}`}>
              {hasSpecial ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Um caractere especial
           </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirmar Senha</label>
        <Input type="password" required className="mt-1" />
      </div>

      <Button type="submit" className="w-full">
        Criar Conta
      </Button>
      
      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Já possui conta?{' '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          Fazer login
        </Link>
      </div>
    </form>
  );
}
