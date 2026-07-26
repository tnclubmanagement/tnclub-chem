import { useMemo } from 'react';
import * as THREE from 'three';

interface BondLinkProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  type: number; // 1 for single, 2 for double, 3 for triple
}

export const BondLink = ({ startPos, endPos, type }: BondLinkProps) => {
  const { position, quaternion, scale } = useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);
    
    // Vector from start to end
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    
    // Midpoint for position
    const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    
    // Quaternion to orient the cylinder
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), // Default cylinder is along Y axis
      direction.clone().normalize()
    );

    return { position, quaternion, scale: length };
  }, [startPos, endPos]);

  // Generate offsets for multiple bonds
  const offsets = useMemo(() => {
    if (type === 1) return [0];
    if (type === 2) return [-0.1, 0.1];
    if (type === 3) return [-0.15, 0, 0.15];
    return [0];
  }, [type]);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#aaaaaa',
    roughness: 0.1,
    metalness: 0.8,
    transmission: 0.3,
    ior: 2.0,
    thickness: 0.2,
    clearcoat: 1.0,
  }), []);

  return (
    <group position={position} quaternion={quaternion}>
      {offsets.map((offset, idx) => (
        <mesh key={idx} position={[offset, 0, 0]} material={material}>
          <cylinderGeometry args={[0.08, 0.08, scale, 16]} />
        </mesh>
      ))}
    </group>
  );
};
