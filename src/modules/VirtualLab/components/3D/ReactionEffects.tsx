import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;

export const ReactionEffects = () => {
  const isReacting = useVirtualLabStore((state) => state.isReacting);
  const currentReaction = useVirtualLabStore((state) => state.currentReaction);

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  
  // Dummy object for matrix calculations
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store individual particle data: position, velocity, phase, lifetime
  const particleData = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5 - 0.25, // roughly within liquid bounds
        (Math.random() - 0.5) * 1.5
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      phase: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.5 + 0.5,
      active: true
    }));
  }, []);

  // Reset particles when a new reaction starts
  useEffect(() => {
    if (isReacting && currentReaction) {
      const isGas = currentReaction.effect === 'explosion';
      const isPrecipitate = currentReaction.effect.includes('precipitation');
      
      particleData.forEach((p) => {
        p.active = true;
        // Spawn radius
        const r = Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        p.position.x = r * Math.cos(theta);
        p.position.z = r * Math.sin(theta);
        
        if (isGas) {
          // Bubbles start at bottom
          p.position.y = -1.0 + Math.random() * 0.2;
          p.velocity.y = Math.random() * 0.05 + 0.02;
          p.scale = Math.random() * 0.4 + 0.2; // smaller bubbles
        } else if (isPrecipitate) {
          // Precipitates spawn gently throughout the liquid
          p.position.y = -0.5 + Math.random() * 1.0;
          p.velocity.y = -(Math.random() * 0.01 + 0.005); // fall very slowly
          p.scale = Math.random() * 0.4 + 0.2; // finer particles
        } else {
          // Magic/Color change: swirling
          p.position.y = -1.0 + Math.random() * 1.5;
          p.velocity.y = (Math.random() - 0.5) * 0.01;
          p.scale = Math.random() * 0.3 + 0.2;
        }
      });
    }
  }, [isReacting, currentReaction, particleData]);

  useFrame((state) => {
    const mesh = instancedMeshRef.current;
    if (!isReacting || !currentReaction || !mesh) return;

    const time = state.clock.getElapsedTime();
    const isGas = currentReaction.effect === 'explosion';
    const isPrecipitate = currentReaction.effect.includes('precipitation');

    particleData.forEach((p, i) => {
      if (!p.active) return;

      if (isGas) {
        // Bubbles rise and wobble
        p.position.y += p.velocity.y;
        p.position.x += Math.sin(time * 5 + p.phase) * 0.005;
        p.position.z += Math.cos(time * 4 + p.phase) * 0.005;
        
        // Pop at surface
        if (p.position.y > 0.5) {
          p.position.y = -1.0;
          p.position.x = (Math.random() - 0.5) * 1.5;
          p.position.z = (Math.random() - 0.5) * 1.5;
        }
      } 
      else if (isPrecipitate) {
        // Fall down, slow down near bottom, pile up softly
        if (p.position.y > -1.0 + p.scale * 0.2) {
          p.position.y += p.velocity.y;
          // Smooth cloudy drifting instead of jagged random jumps
          p.position.x += Math.sin(time * 2 + p.phase) * 0.002;
          p.position.z += Math.cos(time * 2 + p.phase) * 0.002;
        } else {
          // Settled at bottom, barely drift
          p.position.x += Math.sin(time * 0.5 + p.phase) * 0.0005;
        }
      } 
      else {
        // Swirl around center
        const angle = time + p.phase;
        const radius = Math.sqrt(p.position.x * p.position.x + p.position.z * p.position.z);
        p.position.x = radius * Math.cos(angle);
        p.position.z = radius * Math.sin(angle);
        p.position.y += p.velocity.y;
        
        if (p.position.y > 0.5 || p.position.y < -1.0) {
          p.velocity.y *= -1;
        }
      }

      dummy.position.copy(p.position);
      // Optional pulse scaling
      const dynamicScale = isGas ? p.scale * (1 + Math.sin(time * 10 + p.phase) * 0.1) : p.scale;
      dummy.scale.set(dynamicScale, dynamicScale, dynamicScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!isReacting || !currentReaction) return null;

  let effectColor = '#ffffff';

  if (currentReaction.effect === 'explosion') {
    effectColor = '#ef4444'; // vibrant red/orange
  }
  if (currentReaction.effect === 'precipitation_white') effectColor = '#f1f5f9'; // solid white/gray
  if (currentReaction.effect === 'precipitation_blue') effectColor = '#3b82f6'; // vibrant blue
  if (currentReaction.effect === 'color_change_pink') {
    effectColor = '#ec4899'; // vibrant pink
  }

  // Choose geometry and material based on effect
  const isPrecipitate = currentReaction.effect.includes('precipitation');

  return (
    <group position={[0, -1, 0]}>
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        {isPrecipitate ? (
          // Soft small spheres for cloudy suspension
          <sphereGeometry args={[0.03, 8, 8]} />
        ) : (
          // Smooth spheres for bubbles / sparkles
          <sphereGeometry args={[0.04, 16, 16]} />
        )}
        
        {isPrecipitate ? (
          // Cloudy suspension material (made opaque to fix z-sorting depth issues with the transparent beaker)
          <meshStandardMaterial
            color={effectColor}
            roughness={1}
            metalness={0.1}
            opacity={1}
            transparent={false}
          />
        ) : (
          // Shiny solid bubble material
          <meshPhysicalMaterial
            color={effectColor}
            roughness={0.1}
            metalness={0.1}
            transmission={0.4}
            ior={1.2}
            clearcoat={1}
            opacity={0.9}
            transparent={true}
          />
        )}
      </instancedMesh>
    </group>
  );
};
