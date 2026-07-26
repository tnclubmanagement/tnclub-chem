import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';

const PARTICLE_COUNT = 150;

export const PouringAnimation: React.FC = () => {
  const isPouring = useVirtualLabStore((state) => state.isPouring);
  const chemical = useVirtualLabStore((state) => state.pouringChemical);

  const groupRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.InstancedMesh>(null);
  
  // State for animation timing
  const animTime = useRef(0);
  
  // Initialize particles
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      active: false,
      delay: Math.random() * 0.5 // staggered start
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_state, delta) => {
    if (!isPouring || !chemical) {
      animTime.current = 0;
      if (groupRef.current) groupRef.current.visible = false;
      if (streamRef.current) streamRef.current.visible = false;
      return;
    }

    if (groupRef.current) groupRef.current.visible = true;
    if (streamRef.current) streamRef.current.visible = true;

    animTime.current += delta;
    const t = animTime.current;

    // 1. Animate Test Tube (Tilt over 1s, hold, then fade out)
    if (groupRef.current) {
      // Tilt animation
      const targetRotation = Math.PI / 1.8; // ~100 degrees
      if (t < 1.0) {
        // Ease in out rotation
        const ease = 1 - Math.pow(1 - (t / 1.0), 3);
        groupRef.current.rotation.z = ease * targetRotation;
      } else {
        groupRef.current.rotation.z = targetRotation;
      }
      
      // Float slightly
      groupRef.current.position.y = 2.5 + Math.sin(t * 2) * 0.1;
    }

    // 2. Animate Stream Particles
    if (streamRef.current && t > 0.8) {
      // Pour for 2 seconds (from 0.8s to 2.8s)
      const isActivelyPouring = t < 2.8;
      
      // The tip of the test tube is at local [0, 1.5, 0] when vertical.
      // When rotated by targetRotation, calculate world position.
      // Base X is -1.2, Base Y is groupRef.current.position.y
      const tipX = -1.2 + Math.sin(Math.PI / 1.8) * 1.5;
      const tipY = (groupRef.current ? groupRef.current.position.y : 2.5) + Math.cos(Math.PI / 1.8) * 1.5;

      particles.forEach((p, i) => {
        if (!p.active && isActivelyPouring && t > 0.8 + p.delay) {
          // Spawn particle
          p.active = true;
          p.position.set(
            tipX + (Math.random() - 0.5) * 0.15,
            tipY + (Math.random() - 0.5) * 0.15,
            (Math.random() - 0.5) * 0.15
          );
          // Initial velocity
          p.velocity.set(
            (Math.random() - 0.5) * 0.2, // less scatter on X
            -1.5 - Math.random() * 1.5,
            (Math.random() - 0.5) * 0.2 // less scatter on Z
          );
        }

        if (p.active) {
          // Update physics
          p.position.addScaledVector(p.velocity, delta);
          p.velocity.y -= 9.8 * delta; // Gravity

          // Reset if it hits the beaker bottom (around Y = -1 or 0)
          if (p.position.y < -0.5) {
            p.active = false;
            p.position.set(0, -100, 0); // Hide
          }
        }

        dummy.position.copy(p.position);
        
        // Scale down based on state (solid = chunky, liquid = long drops)
        if (chemical.state === 'solid') {
          dummy.scale.set(0.15, 0.15, 0.15);
        } else {
          // Liquid stretches based on velocity
          dummy.scale.set(0.1, 0.3 + Math.abs(p.velocity.y) * 0.1, 0.1);
          dummy.rotation.z = Math.atan2(p.velocity.x, p.velocity.y);
        }
        
        dummy.updateMatrix();
        streamRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      streamRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (!chemical) return null;

  const color = new THREE.Color(chemical.colorHex);
  const isSolid = chemical.state === 'solid';

  return (
    <group>
      {/* The Test Tube */}
      <group ref={groupRef} position={[-1.2, 2.5, 0]} rotation={[0, 0, 0]}>
        {/* Glass Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 3, 16]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.9}
            opacity={1}
            metalness={0}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Rounded Bottom */}
        <mesh position={[0, -1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.9}
            transparent
            roughness={0.1}
          />
        </mesh>
        
        {/* Chemical Content inside the tube */}
        <mesh position={[0, -0.5, 0]}>
          {isSolid ? (
            <boxGeometry args={[0.7, 1.5, 0.7]} />
          ) : (
            <cylinderGeometry args={[0.35, 0.35, 2, 16]} />
          )}
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={isSolid ? 1 : 0.8}
            roughness={isSolid ? 0.8 : 0.1}
          />
        </mesh>
      </group>

      {/* The Pouring Stream Particles */}
      <instancedMesh ref={streamRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        {isSolid ? (
          <dodecahedronGeometry args={[0.5, 0]} />
        ) : (
          <sphereGeometry args={[0.5, 8, 8]} />
        )}
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isSolid ? 1 : 0.6}
          roughness={isSolid ? 0.9 : 0.1}
        />
      </instancedMesh>
    </group>
  );
};
