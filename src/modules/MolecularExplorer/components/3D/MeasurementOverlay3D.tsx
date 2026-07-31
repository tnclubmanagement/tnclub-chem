import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { Atom } from '../../services/moleculeParser';

interface MeasurementOverlay3DProps {
  selectedAtoms: Atom[];
}

export const MeasurementOverlay3D: React.FC<MeasurementOverlay3DProps> = ({ selectedAtoms }) => {
  if (selectedAtoms.length < 2) return null;

  const p1 = useMemo(() => new THREE.Vector3(...selectedAtoms[0].position), [selectedAtoms]);
  const p2 = useMemo(() => new THREE.Vector3(...selectedAtoms[1].position), [selectedAtoms]);

  if (selectedAtoms.length === 2) {
    // Measure Distance between Atom 1 and Atom 2
    const distance = p1.distanceTo(p2).toFixed(2);
    const midpoint = p1.clone().lerp(p2, 0.5);

    return (
      <group>
        <line>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([p1, p2])} />
          <lineDashedMaterial attach="material" color="#00ff80" dashSize={0.1} gapSize={0.05} linewidth={2} />
        </line>

        <Html position={midpoint} center>
          <div style={{
            background: 'rgba(0, 255, 128, 0.9)',
            color: '#000',
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 800,
            boxShadow: '0 0 14px rgba(0, 255, 128, 0.8)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            📏 {distance} Å
          </div>
        </Html>
      </group>
    );
  }

  // Measure Angle ∠ A-B-C where Atom 2 is central vertex p2
  const p3 = new THREE.Vector3(...selectedAtoms[2].position);

  const v1 = p1.clone().sub(p2).normalize();
  const v2 = p3.clone().sub(p2).normalize();

  const angleRad = v1.angleTo(v2);
  const angleDeg = ((angleRad * 180) / Math.PI).toFixed(1);

  return (
    <group>
      {/* Dashed lines connecting p1-p2 and p2-p3 */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([p1, p2, p3])} />
        <lineBasicMaterial attach="material" color="#ff1adb" linewidth={2} />
      </line>

      {/* Floating Angle Badge */}
      <Html position={p2} center>
        <div style={{
          background: 'rgba(255, 26, 219, 0.95)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '14px',
          fontSize: '0.9rem',
          fontWeight: 800,
          boxShadow: '0 0 16px rgba(255, 26, 219, 0.8)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          transform: 'translateY(-24px)',
        }}>
          📐 {angleDeg}°
        </div>
      </Html>
    </group>
  );
};
