import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import type { ElementData } from '../../data/elements';
import { BohrModel } from './BohrModel';

interface AtomVisualizerProps {
  element: ElementData;
}

export const AtomVisualizer: React.FC<AtomVisualizerProps> = ({ element }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        
        {/* Basic Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        
        <Suspense fallback={null}>
          {/* HDRI Environment for realistic reflections */}
          <Environment preset="city" />
          
          <BohrModel element={element} />
          
          {/* Subtle floor shadow */}
          <ContactShadows 
            position={[0, -4, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={10} 
          />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
