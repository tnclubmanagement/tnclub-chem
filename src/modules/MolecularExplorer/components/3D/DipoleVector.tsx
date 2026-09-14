import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { DipoleInfo } from '../../services/vseprEngine';

interface DipoleVectorProps {
  dipole: DipoleInfo;
}

export const DipoleVector: React.FC<DipoleVectorProps> = ({ dipole }) => {
  const isVisible = dipole.isPolar && dipole.magnitude !== 0;

  const origin = useMemo(() => new THREE.Vector3(...dipole.origin), [dipole.origin]);
  const vector = useMemo(() => new THREE.Vector3(...dipole.vector), [dipole.vector]);
  const dir = useMemo(() => vector.clone().normalize(), [vector]);
  const length = useMemo(() => Math.min(Math.max(vector.length() * 1.5, 1.2), 3.5), [vector]);

  const quaternion = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  }, [dir]);

  const posPos = useMemo(() => new THREE.Vector3(...dipole.positivePole), [dipole.positivePole]);
  const negPos = useMemo(() => new THREE.Vector3(...dipole.negativePole), [dipole.negativePole]);

  if (!isVisible) return null;

  return (
    <group>
      {/* Dipole Arrow Stem & Head */}
      <group position={origin} quaternion={quaternion}>
        {/* Shaft */}
        <mesh position={[0, length / 2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, length, 16]} />
          <meshBasicMaterial color="#ffaf00" />
        </mesh>

        {/* Arrow Head */}
        <mesh position={[0, length, 0]}>
          <coneGeometry args={[0.15, 0.4, 16]} />
          <meshBasicMaterial color="#ffaf00" />
        </mesh>

        {/* Plus sign cross at tail */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshBasicMaterial color="#ffaf00" />
        </mesh>
      </group>

      {/* Partial Charge 3D Floating Tags */}
      <Html position={posPos} center>
        <div style={{
          background: 'rgba(59, 130, 246, 0.85)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 700,
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
          border: '1px solid #60a5fa',
          userSelect: 'none',
        }}>
          δ⁺
        </div>
      </Html>

      <Html position={negPos} center>
        <div style={{
          background: 'rgba(239, 68, 68, 0.85)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 700,
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
          border: '1px solid #f87171',
          userSelect: 'none',
        }}>
          δ⁻
        </div>
      </Html>
    </group>
  );
};
