import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useExplorerStore } from '../../store/useExplorerStore';
import { AtomNode } from './AtomNode';
import { BondLink } from './BondLink';
import { LonePairNode } from './LonePairNode';
import { OrbitalCloud } from './OrbitalCloud';
import { DipoleVector } from './DipoleVector';
import { MeasurementOverlay3D } from './MeasurementOverlay3D';
import { calculateLonePairs, calculateDipoleMoment, calculateOrbitals } from '../../services/vseprEngine';
import { useMemo, Suspense } from 'react';

export const MoleculeCanvas = () => {
  const {
    selectedMolecule,
    isAutoRotate,
    explodeRadius,
    renderMode,
    showLonePairs,
    showOrbitals,
    showDipole,
    selectedMeasureAtomIds,
  } = useExplorerStore();

  const explodedAtoms = useMemo(() => {
    if (!selectedMolecule) return [];

    // Find center of mass
    const center = new THREE.Vector3(0, 0, 0);
    selectedMolecule.atoms.forEach((a) => center.add(new THREE.Vector3(...a.position)));
    center.divideScalar(selectedMolecule.atoms.length);

    return selectedMolecule.atoms.map((atom) => {
      const pos = new THREE.Vector3(...atom.position);
      const dir = pos.clone().sub(center);

      // Handle the case where atom is exactly at center
      if (dir.lengthSq() < 0.001) {
        dir.set(0, 1, 0);
      } else {
        dir.normalize();
      }

      const newPos = pos.add(dir.multiplyScalar(explodeRadius));
      return { ...atom, explodedPosition: newPos.toArray() as [number, number, number] };
    });
  }, [selectedMolecule, explodeRadius]);

  const bondsToRender = useMemo(() => {
    if (!selectedMolecule) return [];
    const atomMap = new Map(explodedAtoms.map((a) => [a.id, a.explodedPosition]));

    return selectedMolecule.bonds
      .map((bond, idx) => {
        const startPos = atomMap.get(bond.source);
        const endPos = atomMap.get(bond.target);
        if (!startPos || !endPos) return null;

        return {
          id: `bond-${bond.source}-${bond.target}-${idx}`,
          startPos,
          endPos,
          type: bond.type,
        };
      })
      .filter((b) => b !== null) as {
      id: string;
      startPos: [number, number, number];
      endPos: [number, number, number];
      type: number;
    }[];
  }, [selectedMolecule, explodedAtoms]);

  // VSEPR Lone Pairs
  const lonePairs = useMemo(() => {
    if (!selectedMolecule || !showLonePairs) return [];
    const currentMol: typeof selectedMolecule = {
      ...selectedMolecule,
      atoms: explodedAtoms.map((a) => ({ id: a.id, symbol: a.symbol, position: a.explodedPosition })),
    };
    return calculateLonePairs(currentMol);
  }, [selectedMolecule, explodedAtoms, showLonePairs]);

  // Net Dipole Moment
  const dipole = useMemo(() => {
    if (!selectedMolecule || !showDipole) return null;
    const currentMol: typeof selectedMolecule = {
      ...selectedMolecule,
      atoms: explodedAtoms.map((a) => ({ id: a.id, symbol: a.symbol, position: a.explodedPosition })),
    };
    return calculateDipoleMoment(currentMol);
  }, [selectedMolecule, explodedAtoms, showDipole]);

  // Orbitals
  const orbitals = useMemo(() => {
    if (!selectedMolecule || !showOrbitals) return [];
    const currentMol: typeof selectedMolecule = {
      ...selectedMolecule,
      atoms: explodedAtoms.map((a) => ({ id: a.id, symbol: a.symbol, position: a.explodedPosition })),
    };
    return calculateOrbitals(currentMol);
  }, [selectedMolecule, explodedAtoms, showOrbitals]);

  // Measurement selected atoms
  const selectedMeasureAtoms = useMemo(() => {
    return selectedMeasureAtomIds
      .map((id) => explodedAtoms.find((a) => a.id === id))
      .filter((a) => a !== undefined)
      .map((a) => ({ id: a!.id, symbol: a!.symbol, position: a!.explodedPosition }));
  }, [selectedMeasureAtomIds, explodedAtoms]);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      {/* Lighting and Environment */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Suspense fallback={null}>
        <Environment preset="studio" />

        {/* Molecule Rendering */}
        {selectedMolecule && (
          <group>
            <Center>
              <group>
                {/* Render Atoms */}
                {explodedAtoms.map((atom) => (
                  <AtomNode
                    key={atom.id}
                    id={atom.id}
                    symbol={atom.symbol}
                    position={atom.explodedPosition}
                  />
                ))}

                {/* Render Bonds */}
                {renderMode === 'ball-and-stick' &&
                  bondsToRender.map((bond) => (
                    <BondLink
                      key={bond.id}
                      startPos={bond.startPos}
                      endPos={bond.endPos}
                      type={bond.type}
                    />
                  ))}

                {/* Render Lone Pairs */}
                {showLonePairs &&
                  lonePairs.map((lp) => <LonePairNode key={lp.id} lonePair={lp} />)}

                {/* Render Orbitals */}
                {showOrbitals &&
                  orbitals.map((orb) => <OrbitalCloud key={orb.id} orbital={orb} />)}

                {/* Render Dipole Vector */}
                {showDipole && dipole && <DipoleVector dipole={dipole} />}

                {/* Render 3D Measurement Overlay */}
                <MeasurementOverlay3D selectedAtoms={selectedMeasureAtoms} />
              </group>
            </Center>
            <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={15} blur={2.5} far={4} color="#00f3ff" />
          </group>
        )}
      </Suspense>

      {/* Controls */}
      <OrbitControls
        autoRotate={isAutoRotate}
        autoRotateSpeed={2.0}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};
