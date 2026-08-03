import Link from 'next/link';
import { Button } from '@vega3d/ui';
import { Box, Sparkles, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';
import { Hero3D } from '@/shared/components/landing/Hero3D';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 relative overflow-hidden">
      
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 flex items-center justify-between p-6 max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <Box className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold tracking-tight">Vega3D</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="#features" className="hover:text-indigo-600 transition-colors">Recursos</Link>
          <Link href="#showcase" className="hover:text-indigo-600 transition-colors">Showcase</Link>
          <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Preços</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-indigo-600 transition-colors">Entrar</Link>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
            <Link href="/register">Começar Grátis</Link>
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-4">
        <Hero3D />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-100 dark:border-indigo-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Sparkles className="w-4 h-4" />
          O futuro da Geração 3D chegou
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          Transforme sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">imaginação</span> em geometria real.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Plataforma completa de Geração e Edição de ativos 3D impulsionada por IA. Crie, edite e exporte modelos para seus jogos e aplicações em segundos.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-base">
            <Link href="/login">Ir para o Workspace <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-slate-300 dark:border-slate-700">
            <Link href="#features">Descobrir como funciona</Link>
          </Button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetado para Produtividade</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Tudo o que você precisa para gerenciar sua biblioteca 3D num único lugar, rodando direto do seu navegador.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-cyan-500" />}
              title="Múltiplos Motores de IA"
              description="Nossa arquitetura conecta você aos melhores provedores do mercado de forma transparente."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-indigo-500" />}
              title="Editor WebGL Nativo"
              description="Não apenas gere. Edite vértices, mova malhas e aplique texturas dentro do nosso estúdio integrado."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-emerald-500" />}
              title="Ecossistema Global"
              description="Organize seus arquivos em pastas, favorite e colabore em tempo real com sua equipe."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold tracking-tight">Vega3D</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Vega3D Inc. Todos os direitos reservados.</p>
        </div>
      </footer>

    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
