import * as React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Zap, Cuboid } from 'lucide-react';

const STEPS = [
  {
    icon: <UploadCloud className="w-8 h-8 text-cyan-400" />,
    title: '1. Descreva ou Envie',
    description: 'Digite um prompt de texto detalhado ou envie uma imagem de referência. Nossa IA entende sua intenção criativa instantaneamente.',
  },
  {
    icon: <Zap className="w-8 h-8 text-indigo-400" />,
    title: '2. Geração em Tempo Real',
    description: 'Em menos de 10 segundos, os algoritmos avançados da Vega geram topologia limpa, texturas 4K e materiais PBR completos.',
  },
  {
    icon: <Cuboid className="w-8 h-8 text-purple-400" />,
    title: '3. Exporte e Use',
    description: 'Faça download nos formatos .GLTF, .OBJ ou .FBX. Seus modelos estão prontos para Unity, Unreal Engine, WebGL ou Impressão 3D.',
  }
];

export function HowItWorks() {
  return (
    <section className="relative py-24 z-10 border-t border-slate-900" id="how-it-works">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/20 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Magia Tecnológica em <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">3 Passos</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -z-10" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-2xl glass-panel flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
