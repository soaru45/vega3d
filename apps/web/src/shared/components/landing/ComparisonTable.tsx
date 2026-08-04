import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function ComparisonTable() {
  return (
    <section className="relative py-24 z-10 border-t border-slate-900 bg-black/50" id="comparison">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Por que a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Vega3D</span> é Superior?
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-sm md:text-base">
                  <th className="p-6 text-slate-400 font-medium w-1/3">Recurso</th>
                  <th className="p-6 text-white font-bold bg-indigo-900/20 border-x border-slate-800 w-1/3 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Vega3D Studio</span>
                  </th>
                  <th className="p-6 text-slate-500 font-medium w-1/3 text-center">Outras IAs (Tripo/Meshy)</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base divide-y divide-slate-800/50">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-6 text-slate-300 font-medium">Tempo de Geração</td>
                  <td className="p-6 bg-indigo-900/10 border-x border-slate-800 text-center text-cyan-400 font-bold">&lt; 10 Segundos</td>
                  <td className="p-6 text-center text-slate-500">3 a 5 Minutos</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-6 text-slate-300 font-medium">Topologia Limpa (Retopology)</td>
                  <td className="p-6 bg-indigo-900/10 border-x border-slate-800 text-center"><Check className="w-5 h-5 mx-auto text-green-400" /></td>
                  <td className="p-6 text-center"><X className="w-5 h-5 mx-auto text-red-900" /></td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-6 text-slate-300 font-medium">Texturas PBR Nativas</td>
                  <td className="p-6 bg-indigo-900/10 border-x border-slate-800 text-center"><Check className="w-5 h-5 mx-auto text-green-400" /></td>
                  <td className="p-6 text-center"><X className="w-5 h-5 mx-auto text-red-900" /></td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-6 text-slate-300 font-medium">Integração API (Webhooks)</td>
                  <td className="p-6 bg-indigo-900/10 border-x border-slate-800 text-center"><Check className="w-5 h-5 mx-auto text-green-400" /></td>
                  <td className="p-6 text-center text-slate-500">Apenas planos Enterprise</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-6 text-slate-300 font-medium">Qualidade de Voxel/Mesh</td>
                  <td className="p-6 bg-indigo-900/10 border-x border-slate-800 text-center text-purple-400 font-bold">AAA (Ready-to-game)</td>
                  <td className="p-6 text-center text-slate-500">Rascunho / Concept</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
