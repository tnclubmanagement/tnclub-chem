import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

export type OrbitalType = 's' | 'px' | 'py' | 'pz' | 'p_all' | 'dz2' | 'dxy';
export type ViewMode = 'surface' | 'cloud' | 'hybrid' | 'wireframe';

interface AtomicOrbitalViewerProps {
  initialOrbital?: OrbitalType;
}

// -------------------------------------------------------------
// 1. 3D Axis Component (+X: Red, +Y: Green, +Z: Blue)
// -------------------------------------------------------------
const Axes3D: React.FC<{ showLabels?: boolean }> = ({ showLabels = true }) => {
  return (
    <group>
      {/* X Axis - Red */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.2, 0, 0), new THREE.Vector3(2.2, 0, 0)])} />
        <lineBasicMaterial attach="material" color="#ff4444" linewidth={2} transparent opacity={0.6} />
      </line>
      {/* Y Axis - Green */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -2.2, 0), new THREE.Vector3(0, 2.2, 0)])} />
        <lineBasicMaterial attach="material" color="#44ff44" linewidth={2} transparent opacity={0.6} />
      </line>
      {/* Z Axis - Blue */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -2.2), new THREE.Vector3(0, 0, 2.2)])} />
        <lineBasicMaterial attach="material" color="#4488ff" linewidth={2} transparent opacity={0.6} />
      </line>

      {showLabels && (
        <>
          <Html position={[2.35, 0, 0]} center style={{ pointerEvents: 'none' }}>
            <span style={{ color: '#ff4444', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textShadow: '0 0 6px rgba(255,68,68,0.8)' }}>+X</span>
          </Html>
          <Html position={[0, 2.35, 0]} center style={{ pointerEvents: 'none' }}>
            <span style={{ color: '#44ff44', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textShadow: '0 0 6px rgba(68,255,68,0.8)' }}>+Y</span>
          </Html>
          <Html position={[0, 0, 2.35]} center style={{ pointerEvents: 'none' }}>
            <span style={{ color: '#4488ff', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textShadow: '0 0 6px rgba(68,136,255,0.8)' }}>+Z</span>
          </Html>
        </>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// 2. Central Nucleus Component
// -------------------------------------------------------------
const Nucleus3D: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + Math.sin(clock.getElapsedTime() * 4) * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>
      <pointLight ref={lightRef} color="#ff0055" intensity={1.5} distance={3} />
    </group>
  );
};

// -------------------------------------------------------------
// 3. 3D Volumetric Orbital Mesh Component
// -------------------------------------------------------------
interface OrbitalMeshProps {
  orbital: OrbitalType;
  viewMode: ViewMode;
  opacity: number;
}

const OrbitalMesh3D: React.FC<OrbitalMeshProps> = ({ orbital, viewMode, opacity }) => {
  const isWireframe = viewMode === 'wireframe';
  const effectiveOpacity = isWireframe ? 0.35 : opacity;

  // Material builder helper
  const createMaterial = (color: string, emissive: string) => (
    <meshPhysicalMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.4}
      transparent={true}
      opacity={effectiveOpacity}
      roughness={0.15}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      transmission={0.3}
      side={THREE.DoubleSide}
      wireframe={isWireframe}
    />
  );

  const matCyan = createMaterial('#00f7ff', '#0099bb');
  const matMagenta = createMaterial('#ff1adb', '#aa0099');
  const matGreen = createMaterial('#00ff80', '#009944');
  const matAmber = createMaterial('#ffaf00', '#bb7700');

  // Helper for dumbbell p-lobes
  const renderDumbbell = (axis: 'x' | 'y' | 'z', posColor: React.ReactNode, negColor: React.ReactNode) => {
    let pos: [number, number, number] = [0, 0, 0];
    let neg: [number, number, number] = [0, 0, 0];
    let scale: [number, number, number] = [1, 1, 1];

    const d = 1.05;
    if (axis === 'x') {
      pos = [d, 0, 0];
      neg = [-d, 0, 0];
      scale = [1.25, 0.8, 0.8];
    } else if (axis === 'y') {
      pos = [0, d, 0];
      neg = [0, -d, 0];
      scale = [0.8, 1.25, 0.8];
    } else {
      pos = [0, 0, d];
      neg = [0, 0, -d];
      scale = [0.8, 0.8, 1.25];
    }

    return (
      <group>
        {/* Positive lobe */}
        <mesh position={pos} scale={scale}>
          <sphereGeometry args={[0.75, 32, 32]} />
          {posColor}
        </mesh>
        {/* Negative lobe */}
        <mesh position={neg} scale={scale}>
          <sphereGeometry args={[0.75, 32, 32]} />
          {negColor}
        </mesh>
      </group>
    );
  };

  return (
    <group>
      {/* Orbital s: Spherical symmetry */}
      {orbital === 's' && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.3, 36, 36]} />
          {matCyan}
        </mesh>
      )}

      {/* Orbital px */}
      {orbital === 'px' && renderDumbbell('x', matCyan, matMagenta)}

      {/* Orbital py */}
      {orbital === 'py' && renderDumbbell('y', matGreen, matMagenta)}

      {/* Orbital pz */}
      {orbital === 'pz' && renderDumbbell('z', matAmber, matCyan)}

      {/* Combined p orbitals (px + py + pz) */}
      {orbital === 'p_all' && (
        <group>
          {renderDumbbell('x', matCyan, matCyan)}
          {renderDumbbell('y', matMagenta, matMagenta)}
          {renderDumbbell('z', matAmber, matAmber)}
        </group>
      )}

      {/* Orbital dz2: Dumbbell on Z + Torus ring in XY plane */}
      {orbital === 'dz2' && (
        <group>
          {renderDumbbell('z', matCyan, matCyan)}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.95, 0.3, 24, 48]} />
            {matAmber}
          </mesh>
        </group>
      )}

      {/* Orbital dxy: 4 Cloverleaf lobes in XY plane */}
      {orbital === 'dxy' && (
        <group>
          {[
            { pos: [0.85, 0.85, 0] as [number, number, number], mat: matCyan },
            { pos: [-0.85, 0.85, 0] as [number, number, number], mat: matMagenta },
            { pos: [-0.85, -0.85, 0] as [number, number, number], mat: matCyan },
            { pos: [0.85, -0.85, 0] as [number, number, number], mat: matMagenta },
          ].map((item, i) => (
            <mesh key={i} position={item.pos} scale={[0.8, 0.8, 0.7]}>
              <sphereGeometry args={[0.65, 28, 28]} />
              {item.mat}
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// 4. Electron Density Cloud Particle System
// -------------------------------------------------------------
const OrbitalCloudParticles: React.FC<{ orbital: OrbitalType }> = ({ orbital }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f7ff');
    const magenta = new THREE.Color('#ff1adb');
    const green = new THREE.Color('#00ff80');
    const amber = new THREE.Color('#ffaf00');

    let idx = 0;
    while (idx < count) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;
      const r = Math.sqrt(x * x + y * y + z * z);
      if (r < 0.05 || r > 2.2) continue;

      let prob = 0;
      let pColor = cyan;

      if (orbital === 's') {
        prob = Math.exp(-1.8 * r) * (r * r);
        pColor = cyan;
      } else if (orbital === 'px') {
        const cosTheta = Math.abs(x) / r;
        prob = Math.exp(-1.6 * r) * (r * r) * (cosTheta * cosTheta);
        pColor = x >= 0 ? cyan : magenta;
      } else if (orbital === 'py') {
        const cosTheta = Math.abs(y) / r;
        prob = Math.exp(-1.6 * r) * (r * r) * (cosTheta * cosTheta);
        pColor = y >= 0 ? green : magenta;
      } else if (orbital === 'pz') {
        const cosTheta = Math.abs(z) / r;
        prob = Math.exp(-1.6 * r) * (r * r) * (cosTheta * cosTheta);
        pColor = z >= 0 ? amber : cyan;
      } else if (orbital === 'p_all') {
        const pxProb = (Math.abs(x) / r) ** 2;
        const pyProb = (Math.abs(y) / r) ** 2;
        const pzProb = (Math.abs(z) / r) ** 2;
        prob = Math.exp(-1.6 * r) * (r * r) * Math.max(pxProb, pyProb, pzProb);
        if (pxProb > pyProb && pxProb > pzProb) pColor = cyan;
        else if (pyProb > pzProb) pColor = magenta;
        else pColor = amber;
      } else if (orbital === 'dz2') {
        const cosTheta = z / r;
        const term = 3 * cosTheta * cosTheta - 1;
        prob = Math.exp(-1.5 * r) * (r * r) * (term * term);
        pColor = Math.abs(term) > 1.2 ? cyan : amber;
      } else if (orbital === 'dxy') {
        const term = (x * y) / (r * r);
        prob = Math.exp(-1.5 * r) * (r * r) * (term * term);
        pColor = x * y >= 0 ? cyan : magenta;
      }

      if (Math.random() < prob * 3.5) {
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        colors[idx * 3] = pColor.r;
        colors[idx * 3 + 1] = pColor.g;
        colors[idx * 3 + 2] = pColor.b;

        idx++;
      }
    }

    return { positions, colors };
  }, [orbital]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.045}
        vertexColors={true}
        transparent={true}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// -------------------------------------------------------------
// MAIN ATOMIC ORBITAL VIEWER COMPONENT
// -------------------------------------------------------------
import { useCanvasPerformanceProps } from '../../../hooks/useCanvasPerformanceProps';

export const AtomicOrbitalViewer: React.FC<AtomicOrbitalViewerProps> = ({
  initialOrbital = 'p_all'
}) => {
  const canvasProps = useCanvasPerformanceProps();
  const [orbital, setOrbital] = useState<OrbitalType>(initialOrbital);
  const [viewMode, setViewMode] = useState<ViewMode>('hybrid');
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(0.55);

  const orbitalInfoMap: Record<OrbitalType, { title: string; desc: string; shape: string }> = {
    s: {
      title: 'Orbital s (l = 0)',
      shape: 'Hình cầu đối xứng 3D',
      desc: 'Orbital s có dạng hình cầu đối xứng qua tâm hạt nhân. Xác suất xuất hiện electron là như nhau theo mọi hướng trong không gian.'
    },
    px: {
      title: 'Orbital px (l = 1, m = ±1)',
      shape: 'Hình số 8 nổi nằm ngang (Trục X)',
      desc: 'Orbital px gồm 2 thùy đối xứng nằm dọc theo trục X. Mặt phẳng YZ là mặt phẳng nút (nơi xác suất tìm thấy electron = 0).'
    },
    py: {
      title: 'Orbital py (l = 1, m = ±1)',
      shape: 'Hình số 8 nổi thẳng đứng (Trục Y)',
      desc: 'Orbital py gồm 2 thùy đối xứng nằm dọc theo trục Y. Mặt phẳng XZ là mặt phẳng nút.'
    },
    pz: {
      title: 'Orbital pz (l = 1, m = 0)',
      shape: 'Hình số 8 nổi chiều sâu (Trục Z)',
      desc: 'Orbital pz gồm 2 thùy đối xứng nằm dọc theo trục Z. Mặt phẳng XY là mặt phẳng nút.'
    },
    p_all: {
      title: 'Tập hợp 3 Orbital p (px, py, pz)',
      shape: '3 Cặp thùy vuông góc 3D',
      desc: 'Ba orbital p định hướng vuông góc từng đôi một theo 3 trục tọa độ X, Y, Z tạo nên lớp vỏ phân lớp p chứa tối đa 6 electron.'
    },
    dz2: {
      title: 'Orbital dz² (l = 2, m = 0)',
      shape: 'Hai thùy Trục Z + Vành đai Torus',
      desc: 'Orbital dz² có 2 thùy nổi nằm dọc theo trục Z cùng một vành đai bánh xe hình xô-nhiệt (Torus) nằm trong mặt phẳng XY.'
    },
    dxy: {
      title: 'Orbital dxy (l = 2, m = -2)',
      shape: 'Cỏ 4 lá 3D (Mặt phẳng XY)',
      desc: 'Orbital dxy gồm 4 thùy phân bố nằm giữa hai trục X và Y trong mặt phẳng XY. Các mặt phẳng XZ và YZ là mặt phẳng nút.'
    }
  };

  return (
    <div style={{
      background: 'rgba(10, 11, 26, 0.85)',
      border: '1px solid rgba(0, 247, 255, 0.25)',
      borderRadius: '20px',
      padding: '20px',
      margin: '24px 0',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(16px)',
      color: '#f0f4ff',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Header Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <h4 style={{ margin: 0, color: '#00f7ff', fontFamily: 'var(--font-display)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚛️</span> Mô Phỏng 3D Hình Dạng Orbital Electron
        </h4>

        {/* Orbital Selector Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(['s', 'px', 'py', 'pz', 'p_all', 'dz2', 'dxy'] as const).map(type => (
            <button
              key={type}
              onClick={() => setOrbital(type)}
              style={{
                background: orbital === type ? 'linear-gradient(135deg, #00f7ff, #0088ff)' : 'rgba(255,255,255,0.05)',
                color: orbital === type ? '#050510' : '#94a3b8',
                border: orbital === type ? '1px solid #00f7ff' : '1px solid rgba(255,255,255,0.1)',
                padding: '5px 12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: orbital === type ? '0 0 12px rgba(0, 247, 255, 0.4)' : 'none'
              }}
            >
              {type === 's' && 's'}
              {type === 'px' && 'pₓ'}
              {type === 'py' && 'pᵧ'}
              {type === 'pz' && 'p_z'}
              {type === 'p_all' && 'p (Tất cả)'}
              {type === 'dz2' && 'd_z²'}
              {type === 'dxy' && 'd_xy'}
            </button>
          ))}
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div style={{
        height: '340px',
        width: '100%',
        position: 'relative',
        background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.95) 0%, rgba(3, 4, 13, 0.98) 100%)',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <Canvas camera={{ position: [2.8, 2.2, 3.8], fov: 45 }} {...canvasProps}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} />
          <Environment preset="city" />

          {/* Coordinate Axes */}
          {showAxes && <Axes3D />}

          {/* Central Nucleus */}
          <Nucleus3D />

          {/* Volumetric Surface Mesh */}
          {(viewMode === 'surface' || viewMode === 'hybrid' || viewMode === 'wireframe') && (
            <OrbitalMesh3D orbital={orbital} viewMode={viewMode} opacity={opacity} />
          )}

          {/* Electron Probability Density Cloud */}
          {(viewMode === 'cloud' || viewMode === 'hybrid') && (
            <OrbitalCloudParticles orbital={orbital} />
          )}

          <OrbitControls
            enablePan={false}
            minDistance={2.0}
            maxDistance={7.0}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
          />
        </Canvas>

        {/* Floating Quick Settings Panel inside Canvas */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          background: 'rgba(5, 5, 16, 0.75)',
          padding: '6px 12px',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          fontSize: '0.8rem'
        }}>
          <span style={{ color: '#8892b0', fontSize: '0.75rem', fontWeight: 600 }}>Hiển thị:</span>
          {(['hybrid', 'surface', 'cloud', 'wireframe'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                background: viewMode === mode ? '#00f7ff' : 'transparent',
                color: viewMode === mode ? '#050510' : '#8892b0',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '5px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {mode === 'hybrid' && 'Hỗn hợp'}
              {mode === 'surface' && 'Khối 3D'}
              {mode === 'cloud' && 'Mây Hạt'}
              {mode === 'wireframe' && 'Khung Dây'}
            </button>
          ))}
        </div>

        {/* Top-Right Toggles */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => setShowAxes(!showAxes)}
            style={{
              background: showAxes ? 'rgba(0,247,255,0.15)' : 'rgba(0,0,0,0.5)',
              color: showAxes ? '#00f7ff' : '#8892b0',
              border: '1px solid rgba(0,247,255,0.3)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
          >
            {showAxes ? '📐 Trục XYZ: Bật' : '📐 Trục XYZ: Tắt'}
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            style={{
              background: autoRotate ? 'rgba(0,255,128,0.15)' : 'rgba(0,0,0,0.5)',
              color: autoRotate ? '#00ff80' : '#8892b0',
              border: '1px solid rgba(0,255,128,0.3)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
          >
            {autoRotate ? '🔄 Tự Xoay: Bật' : '⏸️ Tự Xoay: Tắt'}
          </button>
        </div>
      </div>

      {/* Opacity Control Slider */}
      {(viewMode === 'surface' || viewMode === 'hybrid') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', padding: '0 4px' }}>
          <span style={{ fontSize: '0.8rem', color: '#8892b0', width: '130px' }}>Độ trong suốt khối 3D:</span>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: '#00f7ff', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.8rem', color: '#00f7ff', fontFamily: 'var(--font-mono)', width: '36px' }}>
            {Math.round(opacity * 100)}%
          </span>
        </div>
      )}

      {/* Educational Explanation Box */}
      <div style={{
        marginTop: '16px',
        padding: '14px 16px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        borderLeft: '4px solid #00f7ff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <strong style={{ color: '#00f7ff', fontSize: '0.95rem' }}>
            {orbitalInfoMap[orbital].title}
          </strong>
          <span style={{ fontSize: '0.8rem', color: '#00ff80', background: 'rgba(0,255,128,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
            {orbitalInfoMap[orbital].shape}
          </span>
        </div>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
          {orbitalInfoMap[orbital].desc}
        </p>
      </div>
    </div>
  );
};
