import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import type { ElementData } from '../../data/elements';
import { getElectronShells } from '../../utils/electronConfig';
import { useSettingsStore } from '../../../Settings/store/useSettingsStore';

interface BohrModelProps {
  element: ElementData;
}

const Nucleus: React.FC<{ z: number }> = ({ z }) => {
  // To avoid rendering 200+ spheres for heavy elements, cap the visual cluster
  const particleCount = Math.min(z * 2, 80);
  
  const particles = useMemo(() => {
    const pos = [];
    const radius = Math.max(0.5, Math.pow(z, 1/3) * 0.2); // scale nucleus radius with atomic number
    for (let i = 0; i < particleCount; i++) {
      // random position within sphere
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * radius;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const zPos = r * Math.cos(phi);
      
      const isProton = i % 2 === 0;
      pos.push({ position: new THREE.Vector3(x, y, zPos), isProton });
    }
    return { pos, radius };
  }, [z, particleCount]);

  return (
    <group>
      <Instances limit={particleCount} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial 
          roughness={0.2} 
          metalness={0.1} 
          clearcoat={1} 
          transmission={0.1}
        />
        {particles.pos.map((p, i) => (
          <Instance 
            key={i} 
            position={p.position} 
            color={p.isProton ? '#ef4444' : '#94a3b8'} 
          />
        ))}
      </Instances>
      {/* Glow effect for nucleus */}
      <Sphere args={[particles.radius + 0.2, 32, 32]}>
        <meshBasicMaterial color="#ef4444" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
};

const ElectronShell: React.FC<{ radius: number; count: number; speed: number; angleOffset: number }> = ({ radius, count, speed, angleOffset }) => {
  const groupRef = useRef<THREE.Group>(null);
  const autoRotate3D = useSettingsStore((s) => s.autoRotate3D);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate3D) {
      groupRef.current.rotation.y += speed * delta;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.1;
    }
  });

  const electrons = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius
      });
    }
    return arr;
  }, [count, radius]);

  return (
    <group ref={groupRef} rotation={[angleOffset, 0, angleOffset]}>
      {/* Orbit Trail */}
      <Torus args={[radius, 0.01, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </Torus>
      
      {/* Electrons */}
      {electrons.map((pos, i) => (
        <Sphere key={i} args={[0.12, 16, 16]} position={[pos.x, 0, pos.z]}>
          <meshPhysicalMaterial 
            color="#0ea5e9" 
            emissive="#0ea5e9"
            emissiveIntensity={2}
            roughness={0.1} 
            metalness={0.8}
            clearcoat={1}
          />
        </Sphere>
      ))}
    </group>
  );
};

export const BohrModel: React.FC<BohrModelProps> = ({ element }) => {
  const shells = useMemo(() => getElectronShells(element.z), [element.z]);
  
  // Base orbit radius
  const baseRadius = Math.max(2, Math.pow(element.z, 1/3) * 0.5 + 1.5);

  return (
    <group>
      <Nucleus z={element.z} />
      
      {shells.map((count, i) => {
        const radius = baseRadius + i * 0.8;
        // Alternating speeds and tilts for a more dynamic look
        const speed = (i % 2 === 0 ? 1 : -1) * (1.5 - i * 0.15);
        const tilt = (i * Math.PI) / 8;
        
        return (
          <ElectronShell 
            key={`shell-${i}`} 
            radius={radius} 
            count={count} 
            speed={speed} 
            angleOffset={tilt}
          />
        );
      })}
    </group>
  );
};
