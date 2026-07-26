import { create } from 'zustand';
import type { Molecule } from '../services/moleculeParser';

interface ExplorerState {
  selectedMolecule: Molecule | null;
  setSelectedMolecule: (molecule: Molecule | null) => void;
  hoveredAtomId: string | null;
  setHoveredAtomId: (id: string | null) => void;
  isAutoRotate: boolean;
  toggleAutoRotate: () => void;
  explodeRadius: number;
  setExplodeRadius: (val: number) => void;
  renderMode: 'ball-and-stick' | 'space-filling';
  setRenderMode: (mode: 'ball-and-stick' | 'space-filling') => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedMolecule: null,
  setSelectedMolecule: (molecule) => set({ selectedMolecule: molecule }),
  hoveredAtomId: null,
  setHoveredAtomId: (id) => set({ hoveredAtomId: id }),
  isAutoRotate: true,
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
  explodeRadius: 0,
  setExplodeRadius: (val) => set({ explodeRadius: val }),
  renderMode: 'ball-and-stick',
  setRenderMode: (mode) => set({ renderMode: mode }),
}));
