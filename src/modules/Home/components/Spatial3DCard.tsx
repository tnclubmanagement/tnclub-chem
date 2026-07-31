import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Atom3DIcon, Molecule3DIcon, LabFlask3DIcon, LessonBook3DIcon } from './Spatial3DIcons';

interface Spatial3DCardProps {
  position: [number, number, number];
  title: string;
  desc: string;
  color: string;
  glow: string;
  iconType: 'atomic' | 'molecule' | 'lab' | 'lesson';
  onClick: () => void;
  ctaText: string;
  delayIndex: number;
}

export const Spatial3DCard: React.FC<Spatial3DCardProps> = ({
  position,
  title,
  desc,
  color,
  iconType,
  onClick,
  ctaText,
  delayIndex,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Staggered Fly-in Animation state ($z = -15 \rightarrow 0$)
  const currentZ = useRef(-15 - delayIndex * 3);
  const targetZ = position[2];

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth Staggered Fly-in interpolation
    currentZ.current = THREE.MathUtils.lerp(currentZ.current, targetZ, delta * 3.5);

    // Mouse Tilt Parallax
    const mouseX = state.pointer.x * 0.2;
    const mouseY = state.pointer.y * 0.2;

    const targetRotX = hovered ? mouseY * 0.8 - 0.15 : mouseY * 0.3;
    const targetRotY = hovered ? mouseX * 0.8 : mouseX * 0.3;
    const targetScale = hovered ? 1.08 : 1.0;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 6);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 6);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 8));

    // Floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 1.5 + delayIndex) * 0.08;
    meshRef.current.position.set(position[0], position[1] + floatY, currentZ.current);
  });

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], currentZ.current]}
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
      {/* 3D Glass Slab Card Mesh */}
      <mesh>
        <boxGeometry args={[2.6, 3.2, 0.15]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.35 : 0.1}
          transmission={0.7}
          roughness={0.15}
          metalness={0.2}
          clearcoat={1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* 3D Glowing Edge Border Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.64, 3.24, 0.14]} />
        <meshBasicMaterial color={hovered ? color : '#ffffff'} transparent opacity={hovered ? 0.7 : 0.15} wireframe={true} />
      </mesh>

      {/* Floating 3D Animated Icon above the card */}
      <group position={[0, 0.8, 0.3]}>
        {iconType === 'atomic' && <Atom3DIcon />}
        {iconType === 'molecule' && <Molecule3DIcon />}
        {iconType === 'lab' && <LabFlask3DIcon />}
        {iconType === 'lesson' && <LessonBook3DIcon />}
      </group>

      {/* 3D HTML Overlay for Title, Description & CTA button */}
      <Html position={[0, -0.4, 0.12]} transform distanceFactor={5} center>
        <div style={{
          width: '230px',
          padding: '14px',
          color: '#fff',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <h3 style={{
            margin: '0 0 6px 0',
            fontSize: '1.05rem',
            fontWeight: 800,
            color: '#fff',
            textShadow: `0 0 12px ${color}`,
            fontFamily: "'Outfit', sans-serif",
          }}>
            {title}
          </h3>

          <p style={{
            margin: '0 0 12px 0',
            fontSize: '0.76rem',
            color: 'rgba(200, 220, 255, 0.85)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 3,
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
            border: `1px solid ${color}`,
            color: hovered ? '#000' : color,
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 800,
            transition: 'all 0.25s ease',
            boxShadow: hovered ? `0 0 16px ${color}` : 'none',
          }}>
            <span>{ctaText}</span>
            <span>→</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
