import * as React from 'react';
import { useViewerStore } from '@/shared/stores/useViewerStore';
import { useEditorStore } from '@/shared/stores/useEditorStore';
import { useGLTF, TransformControls } from '@react-three/drei';
import * as THREE from 'three';

export function ModelLoader({ url }: { url: string }) {
  const { setModelMetadata, wireframeMode } = useViewerStore();
  const { isEditMode, selectedMeshId, setSelectedMesh, transformMode } = useEditorStore();
  
  const { scene } = useGLTF(url);
  const groupRef = React.useRef<THREE.Group>(null);
  const transformRef = React.useRef(null);

  React.useEffect(() => {
    let vertices = 0;
    let faces = 0;
    let meshes = 0;
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        meshes++;
        // Garante UUID único
        if (!mesh.userData.id) mesh.userData.id = mesh.uuid;
        
        if (mesh.geometry) {
           vertices += mesh.geometry.attributes.position?.count || 0;
           faces += (mesh.geometry.index?.count || 0) / 3;
        }
      }
    });

    setModelMetadata({
      vertices,
      faces: Math.floor(faces),
      meshes,
      size: [size.x, size.y, size.z]
    });
  }, [scene, setModelMetadata]);

  // Raycaster de seleção de malha
  const handlePointerDown = (e: any) => {
    if (!isEditMode) return;
    e.stopPropagation();
    const meshId = e.object.userData.id || e.object.uuid;
    setSelectedMesh(meshId);
  };

  const handlePointerMissed = () => {
    if (isEditMode) setSelectedMesh(null);
  };

  // Aplica material wireframe ou outline de seleção
  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const isSelected = selectedMeshId === (mesh.userData.id || mesh.uuid);
        
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => {
              m.wireframe = wireframeMode;
              m.emissive = isSelected ? new THREE.Color('#3b82f6') : new THREE.Color(0x000000);
              m.emissiveIntensity = isSelected ? 0.5 : 0;
            });
          } else {
            const m = mesh.material as THREE.MeshStandardMaterial;
            m.wireframe = wireframeMode;
            m.emissive = isSelected ? new THREE.Color('#3b82f6') : new THREE.Color(0x000000);
            m.emissiveIntensity = isSelected ? 0.5 : 0;
          }
        }
      }
    });
  }, [scene, wireframeMode, selectedMeshId]);

  // Busca objeto selecionado para grudar o TransformControls
  let selectedObject = null;
  if (selectedMeshId && groupRef.current) {
    groupRef.current.traverse((child) => {
      if ((child.userData.id || child.uuid) === selectedMeshId) {
        selectedObject = child;
      }
    });
  }

  return (
    <>
      <group ref={groupRef} onPointerDown={handlePointerDown} onPointerMissed={handlePointerMissed}>
        <primitive object={scene} />
      </group>
      
      {isEditMode && selectedObject && (
        <TransformControls 
          ref={transformRef}
          object={selectedObject} 
          mode={transformMode}
        />
      )}
    </>
  );
}
