'use client';

import * as React from 'react';
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, ContactShadows, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

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
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[0, 0, -20]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color="#b026ff" />
    </instancedMesh>
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
        <color attach="background" args={['#020205']} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00f0ff" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#b026ff" />
        
        <Environment preset="studio" />
        
        <GlassCore />
        <FloatingParticles count={150} />
        
        <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={2} far={4} color="#00f0ff" />

        <EffectComposer disableNormalPass multisampling={0}>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={1.5} mipmapBlur />
          <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} blendFunction={BlendFunction.NORMAL} />
          <Noise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>

        <Preload all />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}
