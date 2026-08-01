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
  const { setHoveredAtomId, hoveredAtomId, renderMode, isMeasureMode, selectedMeasureAtomIds, addMeasureAtomId } = useExplorerStore();
  
  const isHovered = hoveredAtomId === id;
  const measureIndex = selectedMeasureAtomIds.indexOf(id);
  const isSelectedForMeasure = measureIndex !== -1;

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
      emissive: new THREE.Color(isSelectedForMeasure ? '#ff1adb' : isHovered ? color : '#000000'),
      emissiveIntensity: isSelectedForMeasure ? 0.8 : isHovered ? 0.6 : 0,
    });
  }, [color, isHovered, isSelectedForMeasure, renderMode, baseRadius]);

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
      onClick={(e) => {
        if (isMeasureMode) {
          e.stopPropagation();
          addMeasureAtomId(id);
        }
      }}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      
      {isSelectedForMeasure && (
        <Html center>
          <div style={{
            background: '#ff1adb',
            color: '#fff',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.85rem',
            boxShadow: '0 0 12px #ff1adb',
            pointerEvents: 'none',
          }}>
            {measureIndex + 1}
          </div>
        </Html>
      )}

      {isHovered && !isSelectedForMeasure && (
        <Html distanceFactor={10} center>
          <div style={{
            background: 'rgba(20, 20, 20, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '4px 12px',
            borderRadius: '8px',
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            {symbol} ({id}) {isMeasureMode ? '— Click để chọn đo' : ''}
          </div>
        </Html>
      )}
    </mesh>
  );
};
