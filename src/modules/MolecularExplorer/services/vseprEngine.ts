import * as THREE from 'three';
import type { Molecule } from './moleculeParser';

// Pauling Electronegativity Scale
export const ELECTRONEGATIVITIES: Record<string, number> = {
  H: 2.20,
  C: 2.55,
  N: 3.04,
  O: 3.44,
  F: 3.98,
  Cl: 3.16,
  Br: 2.96,
  I: 2.66,
  P: 2.19,
  S: 2.58,
  Na: 0.93,
  DEFAULT: 2.20,
};

export interface LonePairInfo {
  id: string;
  atomId: string;
  atomSymbol: string;
  position: [number, number, number]; // 3D position of the lone pair lobe center
  direction: [number, number, number]; // Normalized direction vector from atom
}

export interface HybridizationInfo {
  atomId: string;
  type: 'sp' | 'sp2' | 'sp3';
  geometryName: string;
}

export interface DipoleInfo {
  origin: [number, number, number]; // Center of mass or central atom
  vector: [number, number, number]; // Net dipole vector
  magnitude: number;
  positivePole: [number, number, number]; // delta+ position
  negativePole: [number, number, number]; // delta- position
  isPolar: boolean;
}

export interface OrbitalInfo {
  id: string;
  bondId: string;
  type: 'sigma' | 'pi';
  startPos: [number, number, number];
  endPos: [number, number, number];
  normalVector?: [number, number, number]; // For pi orbital lobes plane
}

export const getElectronegativity = (symbol: string): number => {
  return ELECTRONEGATIVITIES[symbol] ?? ELECTRONEGATIVITIES['DEFAULT'];
};

/**
 * Calculates VSEPR Lone Pairs 3D positions for a given molecule
 */
export const calculateLonePairs = (molecule: Molecule): LonePairInfo[] => {
  const lonePairs: LonePairInfo[] = [];

  molecule.atoms.forEach((atom) => {
    const connectedBonds = molecule.bonds.filter(
      (b) => b.source === atom.id || b.target === atom.id
    );

    const neighborIds = connectedBonds.map((b) => (b.source === atom.id ? b.target : b.source));
    const neighborAtoms = molecule.atoms.filter((a) => neighborIds.includes(a.id));

    const atomPos = new THREE.Vector3(...atom.position);

    if (atom.symbol === 'O') {
      if (neighborAtoms.length === 2) {
        // Water-like (H2O, H2O2): 2 bonds, 2 lone pairs -> Tetrahedral geometry
        const v1 = new THREE.Vector3(...neighborAtoms[0].position).sub(atomPos).normalize();
        const v2 = new THREE.Vector3(...neighborAtoms[1].position).sub(atomPos).normalize();

        const bisector = v1.clone().add(v2).normalize().negate(); // Point opposite to bond angle
        const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();

        if (normal.lengthSq() === 0) normal.set(0, 0, 1);

        const lpDist = 0.75;
        const angle = 0.75; // Spread angle for lone pairs

        const lp1Dir = bisector.clone().add(normal.clone().multiplyScalar(angle)).normalize();
        const lp2Dir = bisector.clone().add(normal.clone().multiplyScalar(-angle)).normalize();

        const lp1Pos = atomPos.clone().add(lp1Dir.clone().multiplyScalar(lpDist));
        const lp2Pos = atomPos.clone().add(lp2Dir.clone().multiplyScalar(lpDist));

        lonePairs.push({
          id: `lp-${atom.id}-1`,
          atomId: atom.id,
          atomSymbol: atom.symbol,
          position: lp1Pos.toArray(),
          direction: lp1Dir.toArray(),
        });
        lonePairs.push({
          id: `lp-${atom.id}-2`,
          atomId: atom.id,
          atomSymbol: atom.symbol,
          position: lp2Pos.toArray(),
          direction: lp2Dir.toArray(),
        });
      } else if (neighborAtoms.length === 1) {
        // Double bonded O (e.g. CO2) or O2 molecule: 2 lone pairs pointing outward at ~120 degrees
        const v1 = new THREE.Vector3(...neighborAtoms[0].position).sub(atomPos).normalize();
        const mainDir = v1.clone().negate();

        let perp = new THREE.Vector3(0, 1, 0);
        if (Math.abs(mainDir.dot(perp)) > 0.9) perp.set(1, 0, 0);
        const perpNorm = new THREE.Vector3().crossVectors(mainDir, perp).normalize();

        const lpDist = 0.7;
        const lp1Dir = mainDir.clone().add(perpNorm.clone().multiplyScalar(0.6)).normalize();
        const lp2Dir = mainDir.clone().add(perpNorm.clone().multiplyScalar(-0.6)).normalize();

        lonePairs.push({
          id: `lp-${atom.id}-1`,
          atomId: atom.id,
          atomSymbol: atom.symbol,
          position: atomPos.clone().add(lp1Dir.clone().multiplyScalar(lpDist)).toArray(),
          direction: lp1Dir.toArray(),
        });
        lonePairs.push({
          id: `lp-${atom.id}-2`,
          atomId: atom.id,
          atomSymbol: atom.symbol,
          position: atomPos.clone().add(lp2Dir.clone().multiplyScalar(lpDist)).toArray(),
          direction: lp2Dir.toArray(),
        });
      }
    } else if (atom.symbol === 'N') {
      if (neighborAtoms.length === 3) {
        // Ammonia (NH3): 3 bonds, 1 lone pair -> Trigonal Pyramidal
        const v1 = new THREE.Vector3(...neighborAtoms[0].position).sub(atomPos).normalize();
        const v2 = new THREE.Vector3(...neighborAtoms[1].position).sub(atomPos).normalize();
        const v3 = new THREE.Vector3(...neighborAtoms[2].position).sub(atomPos).normalize();

        const lpDir = v1.clone().add(v2).add(v3).normalize().negate();
        const lpPos = atomPos.clone().add(lpDir.clone().multiplyScalar(0.8));

        lonePairs.push({
          id: `lp-${atom.id}-1`,
          atomId: atom.id,
          atomSymbol: atom.symbol,
          position: lpPos.toArray(),
          direction: lpDir.toArray(),
        });
      }
    } else if (atom.symbol === 'Cl' || atom.symbol === 'F' || atom.symbol === 'Br') {
      if (neighborAtoms.length === 1) {
        // Halogen with 1 bond (HCl): 3 lone pairs forming an umbrella at the back
        const v1 = new THREE.Vector3(...neighborAtoms[0].position).sub(atomPos).normalize();
        const mainDir = v1.clone().negate();

        let perp1 = new THREE.Vector3(0, 1, 0);
        if (Math.abs(mainDir.dot(perp1)) > 0.9) perp1.set(1, 0, 0);
        const perpNorm = new THREE.Vector3().crossVectors(mainDir, perp1).normalize();
        const perpNorm2 = new THREE.Vector3().crossVectors(mainDir, perpNorm).normalize();

        const lpDist = 0.75;
        const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

        angles.forEach((angle, i) => {
          const dir = mainDir
            .clone()
            .add(perpNorm.clone().multiplyScalar(Math.cos(angle) * 0.7))
            .add(perpNorm2.clone().multiplyScalar(Math.sin(angle) * 0.7))
            .normalize();

          lonePairs.push({
            id: `lp-${atom.id}-${i + 1}`,
            atomId: atom.id,
            atomSymbol: atom.symbol,
            position: atomPos.clone().add(dir.clone().multiplyScalar(lpDist)).toArray(),
            direction: dir.toArray(),
          });
        });
      }
    }
  });

  return lonePairs;
};

/**
 * Calculates net Dipole Moment vector and partial charges
 */
export const calculateDipoleMoment = (molecule: Molecule): DipoleInfo => {
  const centerOfMass = new THREE.Vector3(0, 0, 0);
  molecule.atoms.forEach((a) => centerOfMass.add(new THREE.Vector3(...a.position)));
  centerOfMass.divideScalar(molecule.atoms.length);

  const netDipole = new THREE.Vector3(0, 0, 0);

  molecule.bonds.forEach((bond) => {
    const a1 = molecule.atoms.find((a) => a.id === bond.source);
    const a2 = molecule.atoms.find((a) => a.id === bond.target);

    if (a1 && a2) {
      const en1 = getElectronegativity(a1.symbol);
      const en2 = getElectronegativity(a2.symbol);

      const p1 = new THREE.Vector3(...a1.position);
      const p2 = new THREE.Vector3(...a2.position);

      const bondVector = p2.clone().sub(p1);
      const deltaEN = en2 - en1;

      // Bond dipole points towards more electronegative atom
      const bondDipole = bondVector.clone().multiplyScalar(deltaEN * 0.5);
      netDipole.add(bondDipole);
    }
  });

  const magnitude = netDipole.length();
  const isPolar = magnitude > 0.15;

  const negativePole = centerOfMass.clone().add(netDipole.clone().multiplyScalar(0.75)).toArray() as [number, number, number];
  const positivePole = centerOfMass.clone().sub(netDipole.clone().multiplyScalar(0.75)).toArray() as [number, number, number];

  return {
    origin: centerOfMass.toArray() as [number, number, number],
    vector: netDipole.toArray() as [number, number, number],
    magnitude: parseFloat(magnitude.toFixed(2)),
    positivePole,
    negativePole,
    isPolar,
  };
};

/**
 * Calculates Orbital Overlap information (sigma and pi bonds)
 */
export const calculateOrbitals = (molecule: Molecule): OrbitalInfo[] => {
  const orbitals: OrbitalInfo[] = [];

  molecule.bonds.forEach((bond, idx) => {
    const a1 = molecule.atoms.find((a) => a.id === bond.source);
    const a2 = molecule.atoms.find((a) => a.id === bond.target);

    if (a1 && a2) {
      // Sigma bond is always present along bond axis
      orbitals.push({
        id: `orb-sigma-${idx}`,
        bondId: `${bond.source}-${bond.target}`,
        type: 'sigma',
        startPos: a1.position,
        endPos: a2.position,
      });

      // Double bond -> 1 Pi bond
      if (bond.type >= 2) {
        const p1 = new THREE.Vector3(...a1.position);
        const p2 = new THREE.Vector3(...a2.position);
        const bondDir = p2.clone().sub(p1).normalize();

        let norm = new THREE.Vector3(0, 1, 0);
        if (Math.abs(bondDir.dot(norm)) > 0.9) norm.set(1, 0, 0);
        const normal = new THREE.Vector3().crossVectors(bondDir, norm).normalize();

        orbitals.push({
          id: `orb-pi1-${idx}`,
          bondId: `${bond.source}-${bond.target}`,
          type: 'pi',
          startPos: a1.position,
          endPos: a2.position,
          normalVector: normal.toArray(),
        });
      }

      // Triple bond -> 2 Pi bonds (perpendicular to each other)
      if (bond.type >= 3) {
        const p1 = new THREE.Vector3(...a1.position);
        const p2 = new THREE.Vector3(...a2.position);
        const bondDir = p2.clone().sub(p1).normalize();

        let norm1 = new THREE.Vector3(0, 1, 0);
        if (Math.abs(bondDir.dot(norm1)) > 0.9) norm1.set(1, 0, 0);
        const normal1 = new THREE.Vector3().crossVectors(bondDir, norm1).normalize();
        const normal2 = new THREE.Vector3().crossVectors(bondDir, normal1).normalize();

        orbitals.push({
          id: `orb-pi2-${idx}`,
          bondId: `${bond.source}-${bond.target}`,
          type: 'pi',
          startPos: a1.position,
          endPos: a2.position,
          normalVector: normal2.toArray(),
        });
      }
    }
  });

  return orbitals;
};
