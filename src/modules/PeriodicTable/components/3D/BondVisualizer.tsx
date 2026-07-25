import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import type { ElementData } from '../../data/elements';
import { LatticeModel } from './LatticeModel';

interface BondVisualizerProps {
  element: ElementData;
}

export const BondVisualizer: React.FC<BondVisualizerProps> = ({ element }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
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
          autoRotate
          autoRotateSpeed={1.0}
        />
      </Canvas>
    </div>
  );
};
