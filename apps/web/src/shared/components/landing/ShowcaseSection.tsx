import * as React from 'react';
import { motion } from 'framer-motion';

const MOCK_MODELS = [
  { id: 1, title: 'Cyberpunk Helmet', prompt: 'futuristic helmet with neon purple lights, photorealistic', author: 'Vega Team' },
  { id: 2, title: 'Low-Poly Fox', prompt: 'low poly cute fox character, vibrant colors', author: 'User1029' },
  { id: 3, title: 'Sci-Fi Rifle', prompt: 'sci-fi assault rifle weapon asset, highly detailed, 4k textures', author: 'Vega Team' },
  { id: 4, title: 'Medieval Tavern', prompt: 'isometric medieval tavern building, wooden textures', author: 'FantasyArt' },
  { id: 5, title: 'Robot Dog', prompt: 'robotic dog companion, boston dynamics style', author: 'TechBro' },
  { id: 6, title: 'Magic Potion', prompt: 'glowing green magic potion in a glass bottle', author: 'Alchemist' },
];

export function ShowcaseSection() {
  return (
    <section className="relative py-24 z-10 overflow-hidden" id="showcase">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Galeria da <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Comunidade</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Veja o que nossos usuários estão criando com a Vega3D. Modelos prontos para jogos, animações e impressão 3D gerados em segundos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MODELS.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Simulated 3D Viewport Background */}
              <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                 <div className="w-24 h-24 border border-slate-700/50 rounded-full animate-spin-slow flex items-center justify-center">
                    <div className="w-16 h-16 border-t-2 border-cyan-400 rounded-full animate-spin"></div>
                 </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">{model.title}</h3>
                <p className="text-xs text-slate-300 font-mono bg-black/50 p-2 rounded line-clamp-2 mb-2 border border-slate-800">
                  <span className="text-cyan-400">&gt; prompt: </span>
                  {model.prompt}
                </p>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span className="text-xs text-slate-400">por @{model.author}</span>
                  <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-full transition-colors">
                    Ver em 3D
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
