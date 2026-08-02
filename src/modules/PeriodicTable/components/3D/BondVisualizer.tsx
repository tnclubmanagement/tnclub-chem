import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import type { ElementData } from '../../data/elements';
import { LatticeModel } from './LatticeModel';
import { useCanvasPerformanceProps } from '../../../../hooks/useCanvasPerformanceProps';
import { CanvasPlayPauseButton } from '../../../../components/CanvasControls/CanvasPlayPauseButton';
import { useSettingsStore } from '../../../Settings/store/useSettingsStore';

interface BondVisualizerProps {
  element: ElementData;
}

export const BondVisualizer: React.FC<BondVisualizerProps> = ({ element }) => {
  const canvasProps = useCanvasPerformanceProps();
  const { autoRotate3D } = useSettingsStore();

  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab', position: 'relative' }}>
      <CanvasPlayPauseButton />
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }} {...canvasProps}>
        <color attach="background" args={['#0f172a']} />
        
        {/* Basic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <LatticeModel element={element} />
          
          <ContactShadows 
            position={[0, -3, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={1.5} 
            far={10} 
          />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={15}
          autoRotate={autoRotate3D}
          autoRotateSpeed={1.0}
        />
      </Canvas>
    </div>
  );
};
