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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Advanced Academic Controls
  showLonePairs: boolean;
  toggleShowLonePairs: () => void;
  showOrbitals: boolean;
  toggleShowOrbitals: () => void;
  showDipole: boolean;
  toggleShowDipole: () => void;

  // Measurement Tool
  isMeasureMode: boolean;
  toggleIsMeasureMode: () => void;
  selectedMeasureAtomIds: string[];
  addMeasureAtomId: (id: string) => void;
  clearMeasureAtoms: () => void;

  // Compare Deck
  isCompareMode: boolean;
  toggleCompareMode: () => void;
  compareMolecule: Molecule | null;
  setCompareMolecule: (mol: Molecule | null) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedMolecule: null,
  setSelectedMolecule: (molecule) => set({ selectedMolecule: molecule, explodeRadius: 0, selectedMeasureAtomIds: [] }),
  hoveredAtomId: null,
  setHoveredAtomId: (id) => set({ hoveredAtomId: id }),
  isAutoRotate: true,
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
  explodeRadius: 0,
  setExplodeRadius: (val) => set({ explodeRadius: val }),
  renderMode: 'ball-and-stick',
  setRenderMode: (mode) => set({ renderMode: mode }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'all',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  // Academic Toggles
  showLonePairs: false,
  toggleShowLonePairs: () => set((state) => ({ showLonePairs: !state.showLonePairs })),
  showOrbitals: false,
  toggleShowOrbitals: () => set((state) => ({ showOrbitals: !state.showOrbitals })),
  showDipole: false,
  toggleShowDipole: () => set((state) => ({ showDipole: !state.showDipole })),

  // Measurement
  isMeasureMode: false,
  toggleIsMeasureMode: () => set((state) => ({ isMeasureMode: !state.isMeasureMode, selectedMeasureAtomIds: [] })),
  selectedMeasureAtomIds: [],
  addMeasureAtomId: (id) =>
    set((state) => {
      if (state.selectedMeasureAtomIds.includes(id)) {
        return { selectedMeasureAtomIds: state.selectedMeasureAtomIds.filter((aId) => aId !== id) };
      }
      if (state.selectedMeasureAtomIds.length >= 3) {
        return { selectedMeasureAtomIds: [id] }; // Reset to first item if max reached
      }
      return { selectedMeasureAtomIds: [...state.selectedMeasureAtomIds, id] };
    }),
  clearMeasureAtoms: () => set({ selectedMeasureAtomIds: [] }),

  // Compare Mode
  isCompareMode: false,
  toggleCompareMode: () => set((state) => ({ isCompareMode: !state.isCompareMode })),
  compareMolecule: null,
  setCompareMolecule: (mol) => set({ compareMolecule: mol }),
}));
