import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { LonePairInfo } from '../../services/vseprEngine';

interface LonePairNodeProps {
  lonePair: LonePairInfo;
}

export const LonePairNode: React.FC<LonePairNodeProps> = ({ lonePair }) => {
  const quaternion = useMemo(() => {
    const dir = new THREE.Vector3(...lonePair.direction).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  }, [lonePair.direction]);

  return (
    <group position={lonePair.position} quaternion={quaternion}>
      {/* Outer translucent electron cloud lobe */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#00f7ff"
          emissive="#00f7ff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.2}
          transmission={0.8}
          transparent={true}
          opacity={0.65}
          ior={1.2}
        />
      </mesh>

      {/* Inner high-energy electron pair core */}
      <group position={[0, 0, 0]}>
        <mesh position={[-0.08, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
};
