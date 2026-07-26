import { useMemo } from 'react';
import * as THREE from 'three';
import { useExplorerStore } from '../../store/useExplorerStore';
import { getElementColor, getElementRadius } from '../../services/moleculeParser';
import { Html } from '@react-three/drei';

interface AtomNodeProps {
  id: string;
  symbol: string;
  position: [number, number, number];
}

export const AtomNode = ({ id, symbol, position }: AtomNodeProps) => {
  const { setHoveredAtomId, hoveredAtomId, renderMode } = useExplorerStore();
  
  const isHovered = hoveredAtomId === id;
  const baseRadius = getElementRadius(symbol);
  const radius = renderMode === 'space-filling' ? baseRadius * 1.6 : baseRadius;
  const color = getElementColor(symbol);
  
  // Premium glass material
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: renderMode === 'space-filling' ? 0.15 : 0.1,
      metalness: 0.1,
      transmission: 0.6, // Glass-like transparency
      ior: 1.5,
      thickness: baseRadius * 2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: new THREE.Color(isHovered ? color : '#000000'),
      emissiveIntensity: isHovered ? 0.6 : 0,
    });
  }, [color, isHovered, renderMode, baseRadius]);

  return (
    <mesh
      position={position}
      material={material}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredAtomId(id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredAtomId(null);
      }}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      
      {isHovered && (
        <Html distanceFactor={10} center>
          <div style={{
            background: 'rgba(20, 20, 20, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4px 12px',
            borderRadius: '8px',
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            {symbol} ({id})
          </div>
        </Html>
      )}
    </mesh>
  );
};
