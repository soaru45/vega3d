'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@vega3d/ui';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect to explore the platform.',
    features: ['50 Credits / month', 'Standard Quality', 'Public Models', 'Community Support'],
    glow: 'rgba(255, 255, 255, 0.1)',
  },
  {
    name: 'Creator',
    price: '$19',
    description: 'For power users and freelancers.',
    features: ['1,000 Credits / month', 'High-Res Generation', 'Private Models', 'Commercial License', 'Priority Support'],
    glow: 'rgba(0, 240, 255, 0.5)',
    popular: true,
  },
  {
    name: 'Max',
    price: '$49',
    description: 'Unleash the full potential of AI.',
    features: ['3,000 Credits / month', 'Ultra-Res Generation', 'PBR Texture Exports', 'Private Models', 'Commercial License', 'API Access'],
    glow: 'rgba(176, 38, 255, 0.5)',
  }
];

export function PricingCards() {
  return (
    <section id="pricing" className="py-24 relative z-10 bg-black">
      <div className="absolute inset-0 bg-glass-gradient opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-neon-purple text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simple, transparent pricing</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Choose your <span className="text-gradient-neon">Power.</span>
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className={`relative group rounded-3xl p-[1px] overflow-hidden ${plan.popular ? 'scale-105 md:scale-110 z-10' : ''}`}
            >
              {/* Rotating Glow Border Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background: `conic-gradient(from 180deg at 50% 50%, transparent 0%, ${plan.glow} 50%, transparent 100%)`,
                  animation: 'glow-spin 4s linear infinite'
                }}
              />
              
              <div className="relative glass-panel bg-black/90 p-8 h-full rounded-3xl flex flex-col backdrop-blur-2xl">
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-black px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-neon-blue">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-display font-extrabold">{plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className={`w-5 h-5 ${plan.popular ? 'text-neon-blue' : 'text-gray-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full h-12 rounded-full font-bold transition-all duration-300 ${
                    plan.popular 
                    ? 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {plan.price === '$0' ? 'Get Started' : 'Upgrade'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
