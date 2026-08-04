'use client';

import * as React from 'react';
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, ContactShadows, Preload } from '@react-three/drei';
import * as THREE from 'three';

function GlassCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Smoothly rotate towards pointer
    const targetX = (pointer.x * viewport.width) / 5;
    const targetY = (pointer.y * viewport.height) / 5;
    
    mesh.current.rotation.x += (targetY - mesh.current.rotation.x) * 2 * delta;
    mesh.current.rotation.y += (targetX - mesh.current.rotation.y) * 2 * delta;
  });

  return (
    <Float floatIntensity={4} rotationIntensity={3} speed={2}>
      <mesh ref={mesh} position={[0, 0, 0]} scale={viewport.width / 4}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={5}
          thickness={2}
          chromaticAberration={1}
          anisotropy={0.5}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          ior={1.5}
          color="#00f0ff"
          resolution={512}
        />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-black">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 35 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00f0ff" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#b026ff" />
        
        <Environment preset="studio" />
        <GlassCore />
        <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={2} far={4} color="#00f0ff" />
        <Preload all />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}
