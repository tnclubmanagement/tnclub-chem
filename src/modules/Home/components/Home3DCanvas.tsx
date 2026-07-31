import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Buckyball / Cage Core
const BuckyballCore = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 60 vertices roughly distributed on sphere (Icosahedron / Truncated Icosahedron approximation)
  const vertices = useMemo(() => {
    const phi = (1 + Math.sqrt(5)) / 2;

    // Standard Icosahedron base
    const basePts = [
      new THREE.Vector3(-1, phi, 0), new THREE.Vector3(1, phi, 0), new THREE.Vector3(-1, -phi, 0), new THREE.Vector3(1, -phi, 0),
      new THREE.Vector3(0, -1, phi), new THREE.Vector3(0, 1, phi), new THREE.Vector3(0, -1, -phi), new THREE.Vector3(0, 1, -phi),
      new THREE.Vector3(phi, 0, -1), new THREE.Vector3(phi, 0, 1), new THREE.Vector3(-phi, 0, -1), new THREE.Vector3(-phi, 0, 1),
    ];

    basePts.forEach((p) => p.normalize().multiplyScalar(2.2));
    return basePts;
  }, []);

  const bonds = useMemo(() => {
    const b: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        if (vertices[i].distanceTo(vertices[j]) < 2.8) {
          b.push([vertices[i], vertices[j]]);
        }
      }
    }
    return b;
  }, [vertices]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glowing Energy Core */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color="#00f7ff"
          emissive="#00f7ff"
          emissiveIntensity={0.6}
          distort={0.4}
          speed={3}
          roughness={0.1}
          transmission={0.8}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* Outer Atoms */}
      {vertices.map((v, idx) => (
        <mesh key={idx} position={v}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshPhysicalMaterial
            color={idx % 2 === 0 ? '#ff1adb' : '#00ff80'}
            emissive={idx % 2 === 0 ? '#ff1adb' : '#00ff80'}
            emissiveIntensity={0.8}
            clearcoat={1}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Connecting Bonds */}
      {bonds.map(([p1, p2], idx) => {
        const mid = p1.clone().lerp(p2, 0.5);
        const dist = p1.distanceTo(p2);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          p2.clone().sub(p1).normalize()
        );

        return (
          <mesh key={idx} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.03, 0.03, dist, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Home3DCanvas: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} color="#ff1adb" intensity={2} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <BuckyballCore />
        </Float>
      </Canvas>
    </div>
  );
};
