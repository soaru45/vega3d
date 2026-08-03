'use client';

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, MeshDistortMaterial, Float, Environment } from '@react-three/drei';

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-[600px] w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <TorusKnot args={[1, 0.3, 128, 32]}>
            <MeshDistortMaterial 
              color="#4f46e5" 
              attach="material" 
              distort={0.4} 
              speed={2} 
              roughness={0.2} 
              metalness={0.8}
            />
          </TorusKnot>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950" />
    </div>
  );
}
