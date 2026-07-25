import React, { useMemo } from 'react';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import type { ElementData } from '../../data/elements';

interface LatticeModelProps {
  element: ElementData;
}

export const LatticeModel: React.FC<LatticeModelProps> = ({ element }) => {
  const { atoms, bonds, color, isCovalent } = useMemo(() => {
    let size = 1; 
    let isCovalent = false;
    let structureType = 'FCC'; 
    
    // Determine category based properties
    let cat = element.category.toLowerCase();
    if (cat.includes('nonmetal') && !cat.includes('noble')) isCovalent = true;
    if (element.symbol === 'Si' || element.symbol === 'C') isCovalent = true;
    
    let spacing = isCovalent ? 1.4 : 1.2; 
    
    // Determine structure type based on element's bondName or category
    if (element.bondName) {
      const name = element.bondName.toLowerCase();
      if (name.includes('bcc') || name.includes('tâm khối')) structureType = 'BCC';
      else if (name.includes('fcc') || name.includes('tâm diện')) structureType = 'FCC';
      else if (name.includes('hcp') || name.includes('lục giác')) structureType = 'HCP';
    } else {
      if (cat.includes('alkali metal')) structureType = 'BCC';
      else if (cat.includes('alkaline earth metal')) structureType = 'HCP';
      else if (cat.includes('post-transition metal') || cat.includes('metalloid')) structureType = 'SC';
    }
    if (isCovalent) structureType = 'Diamond';

    // Determine color
    let colorHex = '#94a3b8';
    if (element.symbol === 'Au') colorHex = '#ffd700';
    else if (element.symbol === 'Ag') colorHex = '#c0c0c0';
    else if (element.symbol === 'Cu') colorHex = '#b87333';
    else if (element.symbol === 'Fe') colorHex = '#a3a3a3';
    else if (cat === 'alkali metal') colorHex = '#ef4444';
    else if (cat === 'alkaline earth metal') colorHex = '#f97316';
    else if (cat === 'lanthanide') colorHex = '#f43f5e';
    else if (cat === 'actinide') colorHex = '#f472b6';
    else if (cat.includes('transition metal')) colorHex = '#94a3b8';
    else if (isCovalent) colorHex = (element.symbol === 'Si' || element.symbol === 'C') ? '#06b6d4' : '#1e293b';

    const posList: THREE.Vector3[] = [];
    const addAtom = (x: number, y: number, z: number) => {
      posList.push(new THREE.Vector3(x, y, z));
    };

    if (structureType === 'SC') {
      size = 2; spacing = 1.0;
      const off = spacing;
      for(let x=0; x<=size; x++) 
        for(let y=0; y<=size; y++) 
          for(let z=0; z<=size; z++) 
            addAtom(x*spacing - off, y*spacing - off, z*spacing - off);
    } 
    else if (structureType === 'BCC') {
      size = 2;
      const off = spacing;
      for(let x=0; x<=size; x++) 
        for(let y=0; y<=size; y++) 
          for(let z=0; z<=size; z++) 
            addAtom(x*spacing - off, y*spacing - off, z*spacing - off);
      for(let x=0; x<size; x++) 
        for(let y=0; y<size; y++) 
          for(let z=0; z<size; z++) 
            addAtom(x*spacing + spacing/2 - off, y*spacing + spacing/2 - off, z*spacing + spacing/2 - off);
    }
    else if (structureType === 'FCC') {
      const off = spacing / 2;
      for(let x=0; x<=1; x++) 
        for(let y=0; y<=1; y++) 
          for(let z=0; z<=1; z++) {
            addAtom(x*spacing - off, y*spacing - off, z*spacing - off);
            if (x<1 && y<1) addAtom(x*spacing + spacing/2 - off, y*spacing + spacing/2 - off, z*spacing - off);
            if (y<1 && z<1) addAtom(x*spacing - off, y*spacing + spacing/2 - off, z*spacing + spacing/2 - off);
            if (x<1 && z<1) addAtom(x*spacing + spacing/2 - off, y*spacing - off, z*spacing + spacing/2 - off);
          }
    }
    else if (structureType === 'HCP') {
      const a = spacing;
      const c = 1.633 * a;
      for (let z = 0; z <= 2; z++) {
        const isB = (z % 2 !== 0);
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            let posX = x * a;
            let posY = y * a * Math.sqrt(3);
            if (Math.abs(x) % 2 === 1) posY += a * Math.sqrt(3)/2;
            if (isB) { posX += a/2; posY += a * Math.sqrt(3)/6; }
            
            if (Math.sqrt(posX*posX + posY*posY) <= a * 1.5) {
              addAtom(posX, posY, z * c/2 - c/2);
            }
          }
        }
      }
    }
    else if (structureType === 'Diamond') {
      spacing = 1.6;
      const off = spacing / 2;
      const addFCC = (ox: number, oy: number, oz: number) => {
        for(let x=0; x<=1; x++) 
          for(let y=0; y<=1; y++) 
            for(let z=0; z<=1; z++) {
              addAtom(x*spacing + ox - off, y*spacing + oy - off, z*spacing + oz - off);
              if (x<1 && y<1) addAtom(x*spacing + spacing/2 + ox - off, y*spacing + spacing/2 + oy - off, z*spacing + oz - off);
              if (y<1 && z<1) addAtom(x*spacing + ox - off, y*spacing + spacing/2 + oy - off, z*spacing + spacing/2 + oz - off);
              if (x<1 && z<1) addAtom(x*spacing + spacing/2 + ox - off, y*spacing + oy - off, z*spacing + spacing/2 + oz - off);
            }
      };
      addFCC(0, 0, 0);
      addFCC(spacing/4, spacing/4, spacing/4);
    }

    // Determine thresholds for bonds
    let threshold = spacing + 0.1;
    if (structureType === 'BCC') threshold = spacing * 0.866 + 0.1;
    else if (structureType === 'FCC' || structureType === 'HCP') threshold = spacing * 0.707 + 0.1;
    else if (structureType === 'Diamond') threshold = spacing * 0.433 + 0.1;

    const bondList: { p1: THREE.Vector3; p2: THREE.Vector3; dist: number }[] = [];
    for(let i=0; i<posList.length; i++) {
      for(let j=i+1; j<posList.length; j++) {
        const dist = posList[i].distanceTo(posList[j]);
        if (dist <= threshold) {
          bondList.push({ p1: posList[i], p2: posList[j], dist });
        }
      }
    }

    // Center the entire structure
    const box = new THREE.Box3();
    posList.forEach(p => box.expandByPoint(p));
    const center = box.getCenter(new THREE.Vector3());
    posList.forEach(p => p.sub(center));

    return { atoms: posList, bonds: bondList, color: colorHex, isCovalent };
  }, [element]);

  return (
    <group>
      {atoms.map((pos, i) => (
        <Sphere key={`atom-${i}`} args={[isCovalent ? 0.25 : 0.35, 32, 32]} position={[pos.x, pos.y, pos.z]}>
          <meshPhysicalMaterial 
            color={color} 
            metalness={isCovalent ? 0.3 : 0.85} 
            roughness={0.2} 
            clearcoat={0.8} 
          />
        </Sphere>
      ))}
      
      {bonds.map((bond, i) => {
        const midpoint = bond.p1.clone().lerp(bond.p2, 0.5);
        const direction = bond.p2.clone().sub(bond.p1).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <mesh key={`bond-${i}`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.06, 0.06, bond.dist, 16]} />
            <meshStandardMaterial color="#cccccc" roughness={0.4} metalness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};
