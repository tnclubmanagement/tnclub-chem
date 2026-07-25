import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { MoleculesRenderer } from './Molecules';

interface BondModelVisualizerProps {
  modelType: string;
}

export const BondModelVisualizer: React.FC<BondModelVisualizerProps> = ({ modelType }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <color attach="background" args={['transparent']} />
        
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <group position={[0, -0.5, 0]}>
            <MoleculesRenderer modelType={modelType} />
          </group>
          
          <ContactShadows 
            position={[0, -2.5, 0]} 
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
