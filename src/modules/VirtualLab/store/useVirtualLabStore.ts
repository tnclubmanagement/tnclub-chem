import { create } from 'zustand';
import type { Chemical } from '../data/chemicals';
import { type Reaction } from '../data/reactions';
import { ChemEngine } from '../services/ChemEngine';
import { playSciFiSound } from '../../PeriodicTable/utils/audio';

export interface LogEntry {
  id: number;
  equationHTML?: string;
  description: string;
  type: 'reaction' | 'info' | 'warning';
}

interface VirtualLabState {
  reactants: Chemical[];
  currentReaction: Reaction | null;
  isReacting: boolean;
  isPouring: boolean;
  pouringChemical: Chemical | null;
  reactionLog: LogEntry[];
  theme: 'scifi' | 'classic' | 'realistic';
  addReactant: (chemical: Chemical) => void;
  resetBeaker: () => void;
  clearLog: () => void;
  setTheme: (theme: 'scifi' | 'classic' | 'realistic') => void;
  runExample: (chem1: Chemical, chem2: Chemical) => Promise<void>;
}

export const useVirtualLabStore = create<VirtualLabState>((set, get) => ({
  reactants: [],
  currentReaction: null,
  isReacting: false,
  isPouring: false,
  pouringChemical: null,
  reactionLog: [],
  theme: 'scifi',

  addReactant: (chemical) => {
    const { reactants, isReacting, isPouring } = get();
    
    if (reactants.length >= 2 || isReacting || isPouring) return;
    
    if (reactants.some(r => r.id === chemical.id)) return;

    // Start pouring animation
    set({ isPouring: true, pouringChemical: chemical });
    
    // Log intent
    set((state) => ({ 
      reactionLog: [
        { id: Date.now(), description: `Đang đổ ${chemical.name} vào cốc...`, type: 'info' },
        ...state.reactionLog
      ] 
    }));

    // Wait for pouring animation to finish (3.2 seconds)
    setTimeout(() => {
      // If beaker was reset during animation, cancel logic
      if (get().reactants.length === 0 && get().pouringChemical?.id !== chemical.id && !get().isPouring) return;

      const currentReactants = get().reactants;
      if (currentReactants.some(r => r.id === chemical.id)) return;

      const newReactants = [...currentReactants, chemical];
      set({ reactants: newReactants, isPouring: false, pouringChemical: null });
      
      playSciFiSound('splash');

      if (newReactants.length === 2) {
        const reaction = ChemEngine.predictReaction(newReactants);
        if (reaction) {
          set({ currentReaction: reaction, isReacting: true });
          playSciFiSound('success');
          
          set((state) => ({ 
            reactionLog: [
              { id: Date.now(), equationHTML: reaction.equationHTML, description: reaction.description, type: 'reaction' },
              ...state.reactionLog
            ] 
          }));
          
          // Stop the visual effects after 5 seconds
          setTimeout(() => {
            set({ isReacting: false });
          }, 5000);
        } else {
          playSciFiSound('error');
          set((state) => ({ 
            reactionLog: [
              { id: Date.now(), description: `Không có phản ứng xảy ra giữa ${newReactants[0].name} và ${newReactants[1].name}`, type: 'warning' },
              ...state.reactionLog
            ] 
          }));
        }
      } else {
        set((state) => ({ 
          reactionLog: [
            { id: Date.now(), description: `Đã hoàn tất thêm ${chemical.name}. Hãy chọn thêm một chất nữa.`, type: 'info' },
            ...state.reactionLog
          ] 
        }));
      }
    }, 3200); // 3.2s for pouring animation
  },

  resetBeaker: () => {
    set({ reactants: [], currentReaction: null, isReacting: false, isPouring: false, pouringChemical: null });
  },

  clearLog: () => {
    set({ reactionLog: [] });
  },

  setTheme: (theme) => {
    set({ theme });
  },

  runExample: async (chem1: Chemical, chem2: Chemical) => {
    const state = get();
    // 1. Reset beaker first
    state.resetBeaker();
    
    // 2. Add first chemical after a small delay
    await new Promise(res => setTimeout(res, 500));
    get().addReactant(chem1);
    
    // 3. Add second chemical after the first pouring finishes (3.2s + 0.3s padding)
    await new Promise(res => setTimeout(res, 3500));
    get().addReactant(chem2);
  }
}));
