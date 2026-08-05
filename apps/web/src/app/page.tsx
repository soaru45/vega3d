'use client';

import Link from 'next/link';
import { Button } from '@vega3d/ui';
import { Box, Sparkles, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamic import WebGL to avoid SSR Hydration Errors
const Hero3D = dynamic(() => import('@/shared/components/landing/Hero3D').then((mod) => mod.Hero3D), {
  ssr: false,
});

import { PricingCards } from '@/shared/components/landing/PricingCards';
import { ShowcaseSection } from '@/shared/components/landing/ShowcaseSection';
import { HowItWorks } from '@/shared/components/landing/HowItWorks';
import { ComparisonTable } from '@/shared/components/landing/ComparisonTable';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col font-sans text-white">
      {/* 3D WEBGL CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0 h-[110vh]">
        <Hero3D />
      </div>

      {/* HEADER SPATIAL UI */}
      <header className="absolute top-0 w-full z-50 flex items-center justify-between p-6 max-w-7xl mx-auto left-0 right-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <Box className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
          <span className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Vega3D</span>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300 glass-panel px-8 py-3 rounded-full"
        >
          <Link href="#features" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Engine</Link>
          <Link href="#how-it-works" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Como Funciona</Link>
          <Link href="#showcase" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Galeria</Link>
          <Link href="#pricing" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Preços</Link>
        </motion.nav>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <Link href="/dashboard" className="text-sm font-medium hover:text-white transition-colors">Acessar App (V2)</Link>
          <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
            <Link href="/dashboard">Começar Grátis</Link>
          </Button>
        </motion.div>
      </header>

      {/* Main Hero Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 relative pt-48 pb-32 z-10 min-h-screen">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-sm mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f0ff]" />
          Vega3D Engine v2.0 Online
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl leading-tight"
        >
          Crie Modelos 3D Perfeitos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_30px_rgba(176,38,255,0.4)]">
             com IA
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl font-light leading-relaxed"
        >
          Transforme descrições de texto e referências em assets 3D profissionais prontos para jogos, animações e impressão em menos de 10 segundos.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Button size="lg" className="bg-white text-black hover:bg-slate-200 gap-2 h-14 px-8 rounded-full text-base font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105" asChild>
            <Link href="/dashboard">
              Abrir Dashboard V2 <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 h-14 px-8 rounded-full text-base border-slate-700 bg-black/50 hover:bg-slate-800 text-white backdrop-blur-md transition-all hover:border-slate-500" asChild>
            <Link href="/admin">
              Modo Administrador (God Mode)
            </Link>
          </Button>
        </motion.div>

        {/* Status bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center justify-center gap-8 text-slate-500 text-sm font-mono glass-panel px-6 py-2 rounded-full"
        >
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
             API Status: Operacional
          </div>
          <div className="w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-2">
             <Cpu className="w-4 h-4 text-purple-400" /> 1.2M+ Modelos Gerados
          </div>
        </motion.div>
      </main>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 relative z-10 bg-black/80 backdrop-blur-3xl border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Possibilidades Infinitas</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Potencializado por uma orquestração proprietária dos modelos de IA e WebGL mais avançados do mundo.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-cyan-400" />}
              title="Neural Mesh Engine"
              description="Geração de topologia e mapeamento de textura em tempo real direto no seu navegador sem a necessidade de plugins pesados."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-purple-400" />}
              title="Visualizador Espacial"
              description="Edite e rotacione suas criações em um ambiente totalmente físico com iluminação HDRI e sombras dinâmicas."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-pink-500" />}
              title="Nuvem Orquestrada"
              description="Seus renders são armazenados com segurança, com versionamento e exportação instantânea para qualquer motor gráfico."
            />
          </div>
        </div>
      </section>

      {/* New Components */}
      <HowItWorks />
      
      <ShowcaseSection />

      <ComparisonTable />

      <PricingCards />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-black relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="text-3xl group-hover:rotate-12 transition-transform">🌌</span>
              <span className="font-bold text-2xl text-white tracking-tight">Vega3D</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              O ecossistema definitivo de Inteligência Artificial generativa para artistas 3D, desenvolvedores de jogos e criadores digitais. O futuro do 3D começa aqui.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Produto</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="#how-it-works" className="hover:text-cyan-400 transition-colors">Como Funciona</Link></li>
              <li><Link href="#showcase" className="hover:text-cyan-400 transition-colors">Galeria de IA</Link></li>
              <li><Link href="#comparison" className="hover:text-cyan-400 transition-colors">Comparação</Link></li>
              <li><Link href="#pricing" className="hover:text-cyan-400 transition-colors">Preços</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Desenvolvedores</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/docs" className="hover:text-indigo-400 transition-colors">Documentação API</Link></li>
              <li><Link href="/status" className="hover:text-indigo-400 transition-colors">Status do Sistema</Link></li>
              <li><Link href="https://github.com/soaru45/vega3d" target="_blank" className="hover:text-indigo-400 transition-colors">Código Aberto (GitHub)</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900/50 text-sm text-slate-600 flex flex-col sm:flex-row justify-between items-center">
          <p>© 2026 Vega3D Studio. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-6 sm:mt-0">
             <Link href="/privacy" className="hover:text-slate-300 transition-colors">Política de Privacidade</Link>
             <Link href="/terms" className="hover:text-slate-300 transition-colors">Termos de Serviço</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 rounded-3xl hover:bg-slate-900/50 hover:border-slate-700 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] transition-all duration-500 group cursor-default">
      <div className="w-14 h-14 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-light text-sm">{description}</p>
    </div>
  );
}
