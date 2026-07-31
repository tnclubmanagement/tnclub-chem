import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { OrbitalInfo } from '../../services/vseprEngine';

interface OrbitalCloudProps {
  orbital: OrbitalInfo;
}

export const OrbitalCloud: React.FC<OrbitalCloudProps> = ({ orbital }) => {
  const start = useMemo(() => new THREE.Vector3(...orbital.startPos), [orbital.startPos]);
  const end = useMemo(() => new THREE.Vector3(...orbital.endPos), [orbital.endPos]);
  const midpoint = useMemo(() => start.clone().lerp(end, 0.5), [start, end]);
  const distance = useMemo(() => start.distanceTo(end), [start, end]);

  const quaternion = useMemo(() => {
    const direction = end.clone().sub(start).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  }, [start, end]);

  if (orbital.type === 'sigma') {
    // Sigma bond: Cylindrical cloud surrounding bond axis
    return (
      <group position={midpoint} quaternion={quaternion}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, distance * 0.9, 32]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.35}
            roughness={0.2}
            transmission={0.7}
          />
        </mesh>
      </group>
    );
  }

  // Pi bond: Dumbbell-like lobes offset above and below the bond plane
  const offsetDistance = 0.45;
  const normalVec = orbital.normalVector
    ? new THREE.Vector3(...orbital.normalVector).normalize()
    : new THREE.Vector3(0, 1, 0);

  const pos1 = midpoint.clone().add(normalVec.clone().multiplyScalar(offsetDistance));
  const pos2 = midpoint.clone().add(normalVec.clone().multiplyScalar(-offsetDistance));

  return (
    <group>
      {/* Top Pi Lobe */}
      <group position={pos1} quaternion={quaternion}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, distance * 0.85, 24]} />
          <meshPhysicalMaterial
            color="#ff1adb"
            emissive="#c026d3"
            emissiveIntensity={0.5}
            transparent={true}
            opacity={0.4}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Bottom Pi Lobe */}
      <group position={pos2} quaternion={quaternion}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, distance * 0.85, 24]} />
          <meshPhysicalMaterial
            color="#ff1adb"
            emissive="#c026d3"
            emissiveIntensity={0.5}
            transparent={true}
            opacity={0.4}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
