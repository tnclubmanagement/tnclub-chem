import React, { useMemo } from 'react';
import * as THREE from 'three';

// --- Shared Components ---

const Atom: React.FC<{ position: THREE.Vector3 | [number, number, number], radius: number, color: string, metalness?: number, roughness?: number, clearcoat?: number }> = ({ position, radius, color, metalness = 0.5, roughness = 0.4, clearcoat = 1.0 }) => {
  return (
    <mesh position={position instanceof THREE.Vector3 ? [position.x, position.y, position.z] : position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhysicalMaterial color={color} metalness={metalness} roughness={roughness} clearcoat={clearcoat} />
    </mesh>
  );
};

const Bond: React.FC<{ p1: THREE.Vector3, p2: THREE.Vector3, count?: number }> = ({ p1, p2, count = 1 }) => {
  const midpoint = useMemo(() => p1.clone().lerp(p2, 0.5), [p1, p2]);
  const distance = useMemo(() => p1.distanceTo(p2), [p1, p2]);
  const quaternion = useMemo(() => {
    const direction = p2.clone().sub(p1).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  }, [p1, p2]);

  // Compute offsets for multiple bonds
  const offsets = useMemo(() => {
    if (count === 1) return [0];
    if (count === 2) return [-0.15, 0.15];
    if (count === 3) return [-0.2, 0, 0.2];
    return [0];
  }, [count]);

  return (
    <group position={midpoint} quaternion={quaternion}>
      {offsets.map((offset, i) => (
        <mesh key={i} position={[offset, 0, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[0.05, 0.05, distance, 16]} />
          <meshStandardMaterial color="#cccccc" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// --- Molecule Implementations ---

export const H2O: React.FC = () => {
  const oPos = new THREE.Vector3(0, 0.2, 0);
  const angle = (104.5 / 2) * (Math.PI / 180);
  const bondLength = 0.95;
  const h1Pos = new THREE.Vector3(Math.sin(angle) * bondLength, -Math.cos(angle) * bondLength + 0.2, 0);
  const h2Pos = new THREE.Vector3(-Math.sin(angle) * bondLength, -Math.cos(angle) * bondLength + 0.2, 0);

  return (
    <group>
      <Atom position={oPos} radius={0.45} color="#ef4444" roughness={0.2} />
      <Atom position={h1Pos} radius={0.25} color="#ffffff" roughness={0.1} />
      <Atom position={h2Pos} radius={0.25} color="#ffffff" roughness={0.1} />
      <Bond p1={oPos} p2={h1Pos} />
      <Bond p1={oPos} p2={h2Pos} />
    </group>
  );
};

export const CH4: React.FC = () => {
  const cPos = new THREE.Vector3(0, 0, 0);
  const bondLength = 1.1;
  const t = 1.0 / Math.sqrt(3);
  const hPositions = [
    new THREE.Vector3(t, t, t).multiplyScalar(bondLength),
    new THREE.Vector3(-t, -t, t).multiplyScalar(bondLength),
    new THREE.Vector3(-t, t, -t).multiplyScalar(bondLength),
    new THREE.Vector3(t, -t, -t).multiplyScalar(bondLength)
  ];

  return (
    <group>
      <Atom position={cPos} radius={0.45} color="#222222" roughness={0.4} clearcoat={0.8} />
      {hPositions.map((pos, i) => (
        <React.Fragment key={`h-${i}`}>
          <Atom position={pos} radius={0.25} color="#ffffff" roughness={0.1} />
          <Bond p1={cPos} p2={pos} />
        </React.Fragment>
      ))}
    </group>
  );
};

export const NaCl: React.FC = () => {
  const size = 3; 
  const spacing = 0.85;
  const offset = (size - 1) * spacing / 2;

  const atoms = [];
  const bonds = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        const isSodium = (x + y + z) % 2 === 0;
        const pos = new THREE.Vector3(x * spacing - offset, y * spacing - offset, z * spacing - offset);
        atoms.push({
          pos,
          radius: isSodium ? 0.25 : 0.35,
          color: isSodium ? "#a855f7" : "#22c55e",
          isSodium
        });

        if (x < size - 1) bonds.push({ p1: pos, p2: new THREE.Vector3((x+1)*spacing-offset, y*spacing-offset, z*spacing-offset) });
        if (y < size - 1) bonds.push({ p1: pos, p2: new THREE.Vector3(x*spacing-offset, (y+1)*spacing-offset, z*spacing-offset) });
        if (z < size - 1) bonds.push({ p1: pos, p2: new THREE.Vector3(x*spacing-offset, y*spacing-offset, (z+1)*spacing-offset) });
      }
    }
  }

  return (
    <group>
      {atoms.map((a, i) => (
        <Atom key={`atom-${i}`} position={a.pos} radius={a.radius} color={a.color} roughness={0.3} metalness={0.1} />
      ))}
      {bonds.map((b, i) => (
        <Bond key={`bond-${i}`} p1={b.p1} p2={b.p2} />
      ))}
    </group>
  );
};

export const NH3: React.FC = () => {
  const nPos = new THREE.Vector3(0, 0.3, 0);
  const angle = (107.8 / 2) * (Math.PI / 180);
  const bondLength = 1.0;
  // Trigonal pyramidal
  const h1 = new THREE.Vector3(0, -Math.cos(angle) * bondLength + 0.3, Math.sin(angle) * bondLength);
  const h2 = new THREE.Vector3(Math.cos(Math.PI/6)*Math.sin(angle)*bondLength, -Math.cos(angle) * bondLength + 0.3, -Math.sin(Math.PI/6)*Math.sin(angle)*bondLength);
  const h3 = new THREE.Vector3(-Math.cos(Math.PI/6)*Math.sin(angle)*bondLength, -Math.cos(angle) * bondLength + 0.3, -Math.sin(Math.PI/6)*Math.sin(angle)*bondLength);

  return (
    <group>
      <Atom position={nPos} radius={0.4} color="#3b82f6" roughness={0.2} />
      <Atom position={h1} radius={0.25} color="#ffffff" roughness={0.1} />
      <Atom position={h2} radius={0.25} color="#ffffff" roughness={0.1} />
      <Atom position={h3} radius={0.25} color="#ffffff" roughness={0.1} />
      <Bond p1={nPos} p2={h1} />
      <Bond p1={nPos} p2={h2} />
      <Bond p1={nPos} p2={h3} />
    </group>
  );
};

export const CO2: React.FC = () => {
  const cPos = new THREE.Vector3(0, 0, 0);
  const o1 = new THREE.Vector3(1.2, 0, 0);
  const o2 = new THREE.Vector3(-1.2, 0, 0);
  return (
    <group>
      <Atom position={cPos} radius={0.4} color="#222222" roughness={0.4} />
      <Atom position={o1} radius={0.45} color="#ef4444" roughness={0.2} />
      <Atom position={o2} radius={0.45} color="#ef4444" roughness={0.2} />
      <Bond p1={cPos} p2={o1} count={2} />
      <Bond p1={cPos} p2={o2} count={2} />
    </group>
  );
};

export const O2: React.FC = () => {
  const o1 = new THREE.Vector3(0.6, 0, 0);
  const o2 = new THREE.Vector3(-0.6, 0, 0);
  return (
    <group>
      <Atom position={o1} radius={0.45} color="#ef4444" roughness={0.2} />
      <Atom position={o2} radius={0.45} color="#ef4444" roughness={0.2} />
      <Bond p1={o1} p2={o2} count={2} />
    </group>
  );
};

export const N2: React.FC = () => {
  const n1 = new THREE.Vector3(0.55, 0, 0);
  const n2 = new THREE.Vector3(-0.55, 0, 0);
  return (
    <group>
      <Atom position={n1} radius={0.4} color="#3b82f6" roughness={0.2} />
      <Atom position={n2} radius={0.4} color="#3b82f6" roughness={0.2} />
      <Bond p1={n1} p2={n2} count={3} />
    </group>
  );
};

export const HCl: React.FC = () => {
  const h = new THREE.Vector3(-0.6, 0, 0);
  const cl = new THREE.Vector3(0.6, 0, 0);
  return (
    <group>
      <Atom position={h} radius={0.25} color="#ffffff" roughness={0.1} />
      <Atom position={cl} radius={0.5} color="#22c55e" roughness={0.3} />
      <Bond p1={h} p2={cl} />
    </group>
  );
};

export const C2H4: React.FC = () => {
  const c1 = new THREE.Vector3(0.65, 0, 0);
  const c2 = new THREE.Vector3(-0.65, 0, 0);
  const h1 = new THREE.Vector3(1.2, 0.8, 0);
  const h2 = new THREE.Vector3(1.2, -0.8, 0);
  const h3 = new THREE.Vector3(-1.2, 0.8, 0);
  const h4 = new THREE.Vector3(-1.2, -0.8, 0);
  return (
    <group>
      <Atom position={c1} radius={0.4} color="#222222" roughness={0.4} />
      <Atom position={c2} radius={0.4} color="#222222" roughness={0.4} />
      <Atom position={h1} radius={0.25} color="#ffffff" />
      <Atom position={h2} radius={0.25} color="#ffffff" />
      <Atom position={h3} radius={0.25} color="#ffffff" />
      <Atom position={h4} radius={0.25} color="#ffffff" />
      <Bond p1={c1} p2={c2} count={2} />
      <Bond p1={c1} p2={h1} />
      <Bond p1={c1} p2={h2} />
      <Bond p1={c2} p2={h3} />
      <Bond p1={c2} p2={h4} />
    </group>
  );
};

export const C2H2: React.FC = () => {
  const c1 = new THREE.Vector3(0.6, 0, 0);
  const c2 = new THREE.Vector3(-0.6, 0, 0);
  const h1 = new THREE.Vector3(1.6, 0, 0);
  const h2 = new THREE.Vector3(-1.6, 0, 0);
  return (
    <group>
      <Atom position={c1} radius={0.4} color="#222222" />
      <Atom position={c2} radius={0.4} color="#222222" />
      <Atom position={h1} radius={0.25} color="#ffffff" />
      <Atom position={h2} radius={0.25} color="#ffffff" />
      <Bond p1={c1} p2={c2} count={3} />
      <Bond p1={c1} p2={h1} />
      <Bond p1={c2} p2={h2} />
    </group>
  );
};

export const H2O2: React.FC = () => {
  const o1 = new THREE.Vector3(0.5, 0, 0.3);
  const o2 = new THREE.Vector3(-0.5, 0, -0.3);
  const h1 = new THREE.Vector3(1.0, 0.7, 0.5);
  const h2 = new THREE.Vector3(-1.0, -0.7, -0.5);
  return (
    <group>
      <Atom position={o1} radius={0.45} color="#ef4444" />
      <Atom position={o2} radius={0.45} color="#ef4444" />
      <Atom position={h1} radius={0.25} color="#ffffff" />
      <Atom position={h2} radius={0.25} color="#ffffff" />
      <Bond p1={o1} p2={o2} />
      <Bond p1={o1} p2={h1} />
      <Bond p1={o2} p2={h2} />
    </group>
  );
};

export const O3: React.FC = () => {
  const o1 = new THREE.Vector3(0, 0.3, 0);
  const angle = (116.8 / 2) * (Math.PI / 180);
  const o2 = new THREE.Vector3(Math.sin(angle)*1.2, -Math.cos(angle)*1.2+0.3, 0);
  const o3 = new THREE.Vector3(-Math.sin(angle)*1.2, -Math.cos(angle)*1.2+0.3, 0);
  return (
    <group>
      <Atom position={o1} radius={0.45} color="#ef4444" />
      <Atom position={o2} radius={0.45} color="#ef4444" />
      <Atom position={o3} radius={0.45} color="#ef4444" />
      <Bond p1={o1} p2={o2} count={2} />
      <Bond p1={o1} p2={o3} />
    </group>
  );
};

export const Diamond: React.FC = () => {
  const c = 0.8;
  const atoms = [
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(c,c,c),
    new THREE.Vector3(-c,-c,c),
    new THREE.Vector3(-c,c,-c),
    new THREE.Vector3(c,-c,-c),
  ];
  return (
    <group>
      {atoms.map((pos, i) => (
        <Atom key={i} position={pos} radius={0.35} color="#222222" clearcoat={0.9} />
      ))}
      <Bond p1={atoms[0]} p2={atoms[1]} />
      <Bond p1={atoms[0]} p2={atoms[2]} />
      <Bond p1={atoms[0]} p2={atoms[3]} />
      <Bond p1={atoms[0]} p2={atoms[4]} />
    </group>
  );
};

export const MoleculesRenderer: React.FC<{ modelType: string }> = ({ modelType }) => {
  switch (modelType) {
    case 'h2o': return <H2O />;
    case 'ch4': return <CH4 />;
    case 'nacl': return <NaCl />;
    case 'nh3': return <NH3 />;
    case 'co2': return <CO2 />;
    case 'o2': return <O2 />;
    case 'n2': return <N2 />;
    case 'hcl': return <HCl />;
    case 'c2h4': return <C2H4 />;
    case 'c2h2': return <C2H2 />;
    case 'h2o2': return <H2O2 />;
    case 'o3': return <O3 />;
    case 'diamond': return <Diamond />;
    default: return <H2O />;
  }
};
