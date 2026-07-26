import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import * as THREE from 'three';

export const Beaker3D = () => {
  const reactants = useVirtualLabStore((state) => state.reactants);
  const currentReaction = useVirtualLabStore((state) => state.currentReaction);
  const isPouring = useVirtualLabStore((state) => state.isPouring);
  const pouringChemical = useVirtualLabStore((state) => state.pouringChemical);
    
  // Determine color based on reactants/products
  let targetColor = '#e0f7fa'; // empty/colorless baseline
  let targetOpacity = 0.0;
  let targetScaleY = 0.001; // nearly invisible when empty
  
  if (reactants.length === 0 && isPouring && pouringChemical) {
    targetColor = pouringChemical.colorHex;
    targetOpacity = 0.8;
    targetScaleY = 0.4;
  } else if (reactants.length === 1) {
    if (isPouring && pouringChemical) {
      targetColor = reactants[0].colorHex; 
      targetOpacity = 0.8;
      targetScaleY = 0.8;
    } else {
      targetColor = reactants[0].colorHex;
      targetOpacity = 0.8;
      targetScaleY = 0.4;
    }
  } else if (reactants.length >= 2) {
    targetColor = reactants[reactants.length - 1].colorHex;
    targetOpacity = 0.8;
    targetScaleY = 0.8;
  }
  
  if (currentReaction && reactants.length === 2) {
    if (currentReaction.products.length > 0) {
      targetColor = currentReaction.products[0].colorHex;
    }
  }

  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const liquidMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const lerpSpeed = isPouring ? delta * 0.5 : delta * 2;
    
    if (liquidMaterialRef.current) {
      liquidMaterialRef.current.color.lerp(new THREE.Color(targetColor), delta * 2);
      liquidMaterialRef.current.opacity = THREE.MathUtils.lerp(liquidMaterialRef.current.opacity, targetOpacity, delta * 2);
    }

    if (liquidMeshRef.current) {
      liquidMeshRef.current.scale.y = THREE.MathUtils.lerp(liquidMeshRef.current.scale.y, targetScaleY, lerpSpeed);
      liquidMeshRef.current.position.y = liquidMeshRef.current.scale.y - 1.2;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Glass Beaker */}
      <mesh>
        <cylinderGeometry args={[1, 1, 2.5, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.15}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Liquid inside */}
      <mesh ref={liquidMeshRef} position={[0, -1.2, 0]} scale={[0.95, 0.001, 0.95]}>
        <cylinderGeometry args={[1, 1, 2, 64]} />
        <meshPhysicalMaterial
          ref={liquidMaterialRef}
          color={targetColor}
          transparent={true}
          opacity={0.0}
          roughness={0.1}
          metalness={0.0}
          clearcoat={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Beaker Bottom */}
      <mesh position={[0, -1.23, 0]}>
        <cylinderGeometry args={[1, 1, 0.04, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.2}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1.0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
