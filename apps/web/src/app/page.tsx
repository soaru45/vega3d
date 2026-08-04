'use client';

import Link from 'next/link';
import { Button } from '@vega3d/ui';
import { Box, Sparkles, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Hero3D = dynamic(() => import('@/shared/components/landing/Hero3D').then((mod) => mod.Hero3D), {
  ssr: false,
});

import { PricingCards } from '@/shared/components/landing/PricingCards';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white relative overflow-hidden font-sans">
      
      {/* 3D WEBGL CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0">
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
          <Box className="w-8 h-8 text-neon-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
          <span className="text-2xl font-bold tracking-tight font-display text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Vega3D</span>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 glass-panel px-8 py-3 rounded-full"
        >
          <Link href="#features" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Engine</Link>
          <Link href="#showcase" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Gallery</Link>
          <Link href="#pricing" className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all">Pricing</Link>
        </motion.nav>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">Sign In</Link>
          <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
            <Link href="/register">Start Free</Link>
          </Button>
        </motion.div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 md:pt-56 md:pb-32 flex flex-col items-center justify-center text-center px-4 min-h-[90vh]">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-neon-blue text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Next-Gen Spatial Computing</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter mb-6 max-w-5xl leading-tight"
        >
          Create the <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-[0_0_30px_rgba(176,38,255,0.5)]">Impossible.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl font-light"
        >
          The ultimate 3D AI generator. Turn text and images into hyper-realistic, production-ready meshes in seconds.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 hover:scale-105 rounded-full px-10 h-14 text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all">
            <Link href="/login">Launch Workspace <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glass-panel text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg transition-all border-white/20">
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 relative z-10 bg-black/80 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Infinite Possibilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Powered by a proprietary orchestration of the world's most advanced WebGL and AI models.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-neon-blue" />}
              title="Neural Mesh Engine"
              description="Real-time topology generation and texture mapping directly in your browser without plugins."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-neon-purple" />}
              title="Spatial Viewport"
              description="Edit and rotate your creations in a fully physical environment with HDRI lighting and Accumulative Shadows."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-pink-500" />}
              title="Cloud Orchestration"
              description="Your renders are securely stored, version-controlled, and instantly exportable to any game engine."
            />
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <PricingCards />
      
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500 group">
      <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </div>
  );
}
