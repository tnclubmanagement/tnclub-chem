import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. 3D Atom Model (Bohr Model with rotating electron rings)
export const Atom3DIcon: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 1.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 1.2;
  });

  return (
    <group ref={groupRef} scale={[0.5, 0.5, 0.5]}>
      {/* Central Nucleus */}
      <mesh>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshPhysicalMaterial color="#00f7ff" emissive="#00f7ff" emissiveIntensity={0.8} clearcoat={1} />
      </mesh>

      {/* Ring 1 */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.9, 0.03, 16, 64]} />
          <meshBasicMaterial color="#00f7ff" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Ring 2 */}
      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[0.9, 0.03, 16, 64]} />
          <meshBasicMaterial color="#00ff80" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
};

// 2. 3D CH4 Molecule Model (Tetrahedral Methane)
export const Molecule3DIcon: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
      groupRef.current.rotation.x += delta * 0.3;
    }
  });

  const t = 1.0 / Math.sqrt(3);
  const hPositions: [number, number, number][] = [
    [t * 0.8, t * 0.8, t * 0.8],
    [-t * 0.8, -t * 0.8, t * 0.8],
    [-t * 0.8, t * 0.8, -t * 0.8],
    [t * 0.8, -t * 0.8, -t * 0.8],
  ];

  return (
    <group ref={groupRef} scale={[0.55, 0.55, 0.55]}>
      {/* Central Carbon */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshPhysicalMaterial color="#ff1adb" emissive="#ff1adb" emissiveIntensity={0.8} clearcoat={1} />
      </mesh>

      {/* 4 Hydrogens */}
      {hPositions.map((pos, idx) => (
        <group key={idx}>
          <mesh position={pos}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 3. 3D Lab Flask Model
export const LabFlask3DIcon: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={[0.5, 0.5, 0.5]}>
      {/* Glass Body Cone */}
      <mesh position={[0, -0.2, 0]}>
        <coneGeometry args={[0.7, 1.0, 16]} />
        <meshPhysicalMaterial color="#00ff80" transmission={0.8} roughness={0.1} transparent opacity={0.6} emissive="#00ff80" emissiveIntensity={0.5} />
      </mesh>

      {/* Flask Neck */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
        <meshPhysicalMaterial color="#00ff80" transmission={0.8} roughness={0.1} transparent opacity={0.6} />
      </mesh>

      {/* Liquid inside */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.4, 16]} />
        <meshBasicMaterial color="#00ff80" transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

// 4. 3D Diamond & Book Model
export const LessonBook3DIcon: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[0.5, 0.5, 0.5]}>
      {/* Octahedron Diamond Crystal */}
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} clearcoat={1} transmission={0.5} roughness={0.1} />
      </mesh>
    </group>
  );
};

// 5. Academy 3D Icon (Graduation cap with golden tassel)
export const Academy3DIcon: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const tasselRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.4;
    if (tasselRef.current) {
      tasselRef.current.rotation.y += delta * 2.5;
    }
  });

  return (
    <group ref={groupRef} scale={[0.45, 0.45, 0.45]}>
      {/* Graduation cap base (flat board) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.02, 1.2]} />
        <meshPhysicalMaterial
          color="#eab308"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Cap peak */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <coneGeometry args={[0.6, 0.8, 32]} />
        <meshPhysicalMaterial
          color="#eab308"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Golden tassel */}
      <mesh ref={tasselRef} position={[0, -0.2, 0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          metalness={0.8}
          roughness={0.1}
          transmission={0.3}
        />
        {/* Tassel ball */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshPhysicalMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </mesh>
      </mesh>
    </group>
  );
};


