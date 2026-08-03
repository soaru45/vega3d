'use client';

import * as React from 'react';
import { useViewerStore } from '@/shared/stores/useViewerStore';
import { Environment, Grid } from '@react-three/drei';

export function SceneEnvironment() {
  const { showGrid, showAxes, environmentIntensity, backgroundColor } = useViewerStore();

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      
      {/* Luzes Base */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
      
      {/* Reflexos e Ambiente */}
      <Environment preset="city" background={false} environmentIntensity={environmentIntensity} />

      {/* Helpers Visuais */}
      {showGrid && (
        <Grid 
          infiniteGrid 
          fadeDistance={50} 
          sectionColor="#4f46e5" 
          cellColor="#94a3b8" 
          position={[0, -0.01, 0]} 
        />
      )}
      {showAxes && <axesHelper args={[5]} />}
    </>
  );
}
