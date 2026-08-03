'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Input } from '@vega3d/ui';

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Email enviado!</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          Verifique sua caixa de entrada para redefinir sua senha.
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">Voltar ao Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <div className="text-center mb-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Insira seu email e enviaremos um link de recuperação.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <Input type="email" required className="mt-1" placeholder="john@exemplo.com" />
      </div>

      <Button type="submit" className="w-full">
        Enviar Link de Recuperação
      </Button>
      
      <div className="text-center text-sm">
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}
