import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Beaker3D } from './Beaker3D';
import { ReactionEffects } from './ReactionEffects';
import { PouringAnimation } from './PouringAnimation';
import styles from '../../styles/VirtualLab.module.less';

export const VirtualLabScene = () => {
  return (
    <div className={styles.sceneContainer}>
      <Canvas camera={{ position: [0, 1.5, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Environment preset="city" />

        <group position={[0, -0.5, 0]}>
          <Beaker3D />
          <ReactionEffects />
          <PouringAnimation />
          
          <ContactShadows 
            position={[0, -2.25, 0]} 
            opacity={0.6} 
            scale={5} 
            blur={1.5} 
            far={4} 
            color="#000000" 
          />
        </group>

        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={4}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
};
