import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MOCK_MOLECULES } from '../../MolecularExplorer/data/mockMolecules';
import { getElementColor, getElementRadius } from '../../MolecularExplorer/services/moleculeParser';

interface AcademyMoleculeViewerProps {
  moleculeId: string;
}

const SimpleAtomNode = ({ symbol, position }: { symbol: string; position: [number, number, number] }) => {
  const radius = getElementRadius(symbol) * 0.8;
  const color = getElementColor(symbol);

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.4}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const SimpleBondLink = ({ start, end, type }: { start: THREE.Vector3; end: THREE.Vector3; type: number }) => {
  const distance = start.distanceTo(end);
  const position = start.clone().lerp(end, 0.5);
  
  // Calculate orientation
  const quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const direction = end.clone().sub(start).normalize();
  quaternion.setFromUnitVectors(up, direction);

  const radius = 0.08;
  const gap = 0.12;

  // Single bond
  if (type === 1) {
    return (
      <mesh position={position} quaternion={quaternion}>
        <cylinderGeometry args={[radius, radius, distance, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} transparent opacity={0.8} />
      </mesh>
    );
  }

  // Double bond
  if (type === 2) {
    return (
      <group position={position} quaternion={quaternion}>
        <mesh position={[gap, 0, 0]}>
          <cylinderGeometry args={[radius, radius, distance, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} transparent opacity={0.8} />
        </mesh>
        <mesh position={[-gap, 0, 0]}>
          <cylinderGeometry args={[radius, radius, distance, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} transparent opacity={0.8} />
        </mesh>
      </group>
    );
  }

  // Triple bond
  return (
    <group position={position} quaternion={quaternion}>
      <mesh position={[gap * 1.5, 0, 0]}>
        <cylinderGeometry args={[radius, radius, distance, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius, distance, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-gap * 1.5, 0, 0]}>
        <cylinderGeometry args={[radius, radius, distance, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

export const AcademyMoleculeViewer: React.FC<AcademyMoleculeViewerProps> = ({ moleculeId }) => {
  const molecule = useMemo(() => MOCK_MOLECULES.find(m => m.id === moleculeId), [moleculeId]);

  if (!molecule) return null;

  return (
    <div style={{ width: '100%', height: '350px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', overflow: 'hidden', margin: '20px 0', border: '1px solid rgba(255,255,255,0.05)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Center>
          <group>
            {molecule.atoms.map((atom) => (
              <SimpleAtomNode
                key={atom.id}
                symbol={atom.symbol}
                position={atom.position as [number, number, number]}
              />
            ))}
            
            {molecule.bonds.map((bond, idx) => {
              const startAtom = molecule.atoms.find(a => a.id === bond.source);
              const endAtom = molecule.atoms.find(a => a.id === bond.target);
              if (!startAtom || !endAtom) return null;
              
              const start = new THREE.Vector3(...startAtom.position);
              const end = new THREE.Vector3(...endAtom.position);
              
              return (
                <SimpleBondLink
                  key={idx}
                  start={start}
                  end={end}
                  type={bond.type}
                />
              );
            })}
          </group>
        </Center>
        
        <Environment preset="city" />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={2.0} />
      </Canvas>
    </div>
  );
};
