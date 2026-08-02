import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Atom3DIcon, Molecule3DIcon, LabFlask3DIcon, LessonBook3DIcon, Academy3DIcon } from './Spatial3DIcons';

interface Feature3DPodProps {
  position: [number, number, number];
  title: string;
  desc: string;
  color: string;
  glow: string;
  podType: 'periodic-table' | 'explorer' | 'virtual-lab' | 'lesson' | 'academy';
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

    // Adjust rotation speed for Academy pod to be smoother
    const rotationSpeedY = podType === 'academy' ? (hovered ? 0.6 : 0.2) : (hovered ? 1.2 : 0.4);
    const rotationSpeedX = podType === 'academy' ? (hovered ? 0.3 : 0.1) : (hovered ? 0.6 : 0.2);
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * rotationSpeedY;
      coreRef.current.rotation.x += delta * rotationSpeedX;
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
        {podType === 'academy'        && <coneGeometry args={[0.6, 0.8, 32]} />}

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
        {podType === 'academy'        && <coneGeometry args={[0.6, 0.8, 32]} />}

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
        {podType === 'academy'        && <Academy3DIcon />}
      </group>

      {/* 3D Glass Tooltip Badge dán bên dưới khối */}
      <Html position={[0, -1.4, 0.25]} transform distanceFactor={5.6} center>
        <div style={{
          width: '215px',
          padding: '12px 14px',
          background: hovered ? 'rgba(15, 23, 42, 0.94)' : 'rgba(15, 23, 42, 0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? color : 'rgba(255, 255, 255, 0.15)'}`,
          borderRadius: '18px',
          textAlign: 'center',
          boxShadow: hovered ? `0 0 28px ${color}90, 0 12px 36px rgba(0,0,0,0.6)` : '0 6px 24px rgba(0,0,0,0.35)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          userSelect: 'none',
          cursor: 'pointer',
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
