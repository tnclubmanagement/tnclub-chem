import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Atom3DIcon, Molecule3DIcon, LabFlask3DIcon, LessonBook3DIcon } from './Spatial3DIcons';

interface Feature3DPodProps {
  position: [number, number, number];
  title: string;
  desc: string;
  color: string;
  glow: string;
  podType: 'periodic-table' | 'explorer' | 'virtual-lab' | 'lesson';
  onClick: () => void;
  ctaText: string;
  delayIndex: number;
}

export const Feature3DPod: React.FC<Feature3DPodProps> = ({
  position,
  title,
  desc,
  color,
  podType,
  onClick,
  ctaText,
  delayIndex,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Continuous 3D rotation of the pod outer geometry
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (hovered ? 1.2 : 0.4);
      coreRef.current.rotation.x += delta * (hovered ? 0.6 : 0.2);
    }

    // Hover Mouse Tilt & Zoom
    const mouseX = state.pointer.x * 0.3;
    const mouseY = state.pointer.y * 0.3;

    const targetRotX = hovered ? mouseY * 0.8 : mouseY * 0.2;
    const targetRotY = hovered ? mouseX * 0.8 : mouseX * 0.2;
    const targetScale = hovered ? 1.15 : 1.0;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 6);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 6);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 8));

    // Floating sine wave animation in 3D
    const floatY = Math.sin(state.clock.elapsedTime * 1.8 + delayIndex * 1.2) * 0.12;
    meshRef.current.position.set(position[0], position[1] + floatY, position[2]);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* 3D Geometric Glass Outer Cage */}
      <mesh ref={coreRef}>
        {podType === 'periodic-table' && <octahedronGeometry args={[0.95, 0]} />}
        {podType === 'explorer'       && <dodecahedronGeometry args={[0.88, 0]} />}
        {podType === 'virtual-lab'    && <cylinderGeometry args={[0.75, 0.75, 1.4, 8]} />}
        {podType === 'lesson'         && <icosahedronGeometry args={[0.92, 0]} />}

        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          transmission={0.7}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          transparent={true}
          opacity={0.75}
          wireframe={false}
        />
      </mesh>

      {/* 3D Neon Wireframe Highlight Frame */}
      <mesh scale={[1.03, 1.03, 1.03]}>
        {podType === 'periodic-table' && <octahedronGeometry args={[0.95, 0]} />}
        {podType === 'explorer'       && <dodecahedronGeometry args={[0.88, 0]} />}
        {podType === 'virtual-lab'    && <cylinderGeometry args={[0.75, 0.75, 1.4, 8]} />}
        {podType === 'lesson'         && <icosahedronGeometry args={[0.92, 0]} />}

        <meshBasicMaterial
          color={hovered ? '#ffffff' : color}
          transparent={true}
          opacity={hovered ? 0.8 : 0.3}
          wireframe={true}
        />
      </mesh>

      {/* Inner 3D Rotating Icon Model */}
      <group position={[0, 0, 0]}>
        {podType === 'periodic-table' && <Atom3DIcon />}
        {podType === 'explorer'       && <Molecule3DIcon />}
        {podType === 'virtual-lab'    && <LabFlask3DIcon />}
        {podType === 'lesson'         && <LessonBook3DIcon />}
      </group>

      {/* 3D Glass Tooltip Badge dán bên dưới khối */}
      <Html position={[0, -1.35, 0.2]} transform distanceFactor={5.5} center>
        <div style={{
          width: '210px',
          padding: '12px 14px',
          background: hovered ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${hovered ? color : 'rgba(255, 255, 255, 0.12)'}`,
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: hovered ? `0 0 24px ${color}80, 0 10px 30px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <h3 style={{
            margin: '0 0 4px 0',
            fontSize: '0.98rem',
            fontWeight: 800,
            color: '#ffffff',
            textShadow: hovered ? `0 0 12px ${color}` : 'none',
            fontFamily: "'Outfit', sans-serif",
          }}>
            {title}
          </h3>

          <p style={{
            margin: '0 0 10px 0',
            fontSize: '0.74rem',
            color: 'rgba(200, 220, 255, 0.8)',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {desc}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: hovered ? color : 'rgba(255, 255, 255, 0.08)',
            color: hovered ? '#000000' : color,
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 800,
            transition: 'all 0.25s ease',
          }}>
            <span>{ctaText}</span>
            <span>→</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
