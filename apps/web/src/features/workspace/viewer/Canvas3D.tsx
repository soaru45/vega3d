'use client';

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useViewerStore } from '@/shared/stores/useViewerStore';
import { useEditorStore } from '@/shared/stores/useEditorStore';
import { ModelLoader } from './ModelLoader';
import { SceneEnvironment } from './SceneEnvironment';
import { ViewerControls } from './ViewerControls';

export function Canvas3D() {
  const { activeModelUrl } = useViewerStore();
  const { selectedMeshId } = useEditorStore(); // Desativa o OrbitControls se arrastando

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <ViewerControls />
      </div>

      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }} dpr={[1, 2]}>
        <SceneEnvironment />
        
        <React.Suspense fallback={null}>
          <Center>
            {activeModelUrl ? (
              <ModelLoader url={activeModelUrl} />
            ) : (
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
              </mesh>
            )}
          </Center>
        </React.Suspense>
        
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} enabled={!selectedMeshId} />
        
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
        </GizmoHelper>
      </Canvas>
      
      {!activeModelUrl && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-500 bg-white/80 dark:bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm pointer-events-none">
          Nenhum modelo carregado. Selecione um arquivo `.glb` no painel à esquerda.
        </div>
      )}
    </div>
  );
}
