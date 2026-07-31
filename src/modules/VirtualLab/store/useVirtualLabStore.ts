import { create } from 'zustand';
import type { Chemical } from '../data/chemicals';
import { type Reaction } from '../data/reactions';
import { ChemEngine } from '../services/ChemEngine';
import { playSciFiSound } from '../../PeriodicTable/utils/audio';
import { MISSIONS } from '../data/missions';

export interface LogEntry {
  id: number;
  equationHTML?: string;
  description: string;
  type: 'reaction' | 'info' | 'warning' | 'mission';
}

interface VirtualLabState {
  reactants: Chemical[];
  currentReaction: Reaction | null;
  isReacting: boolean;
  isPouring: boolean;
  pouringChemical: Chemical | null;
  reactionLog: LogEntry[];
  theme: 'scifi' | 'classic' | 'realistic';
  isMuted: boolean;
  ttsSpeed: number;
  ttsVoiceURI: string | null;
  isAutoPlayVoice: boolean;
  addReactant: (chemical: Chemical) => Promise<void>;
  resetBeaker: () => void;
  clearLog: () => void;
  setTheme: (theme: 'scifi' | 'classic' | 'realistic') => void;
  setIsMuted: (isMuted: boolean) => void;
  setTtsSpeed: (speed: number) => void;
  setTtsVoiceURI: (uri: string | null) => void;
  setIsAutoPlayVoice: (isAutoPlay: boolean) => void;
  runExample: (chem1: Chemical, chem2: Chemical) => Promise<void>;
  
  // Gamification
  isMissionModeActive: boolean;
  activeMissionIndex: number;
  completedMissions: string[];
  completeCurrentMission: () => Promise<void>;
  toggleMissionMode: () => void;
  skipToNextMission: () => void;
  goToPreviousMission: () => void;
}

export const useVirtualLabStore = create<VirtualLabState>((set, get) => ({
  reactants: [],
  currentReaction: null,
  isReacting: false,
  isPouring: false,
  pouringChemical: null,
  reactionLog: [],
  theme: 'scifi',
  isMuted: false,
  ttsSpeed: 1.0,
  ttsVoiceURI: null,
  isAutoPlayVoice: true, // Default to true as the user wants auto play

  isMissionModeActive: false,
  activeMissionIndex: 0,
  completedMissions: [],

  toggleMissionMode: () => {
    const { isMissionModeActive } = get();
    set({ 
      isMissionModeActive: !isMissionModeActive,
      // Optional: reset missions when starting
      activeMissionIndex: 0,
      completedMissions: []
    });
  },

  skipToNextMission: () => {
    const { activeMissionIndex } = get();
    if (activeMissionIndex < MISSIONS.length - 1) {
      set({ activeMissionIndex: activeMissionIndex + 1 });
    }
  },

  goToPreviousMission: () => {
    const { activeMissionIndex } = get();
    if (activeMissionIndex > 0) {
      set({ activeMissionIndex: activeMissionIndex - 1 });
    }
  },

  completeCurrentMission: async () => {
    const { activeMissionIndex, completedMissions } = get();
    const mission = MISSIONS[activeMissionIndex];
    if (!mission || completedMissions.includes(mission.id)) return;

    playSciFiSound('success');
    
    set({
      completedMissions: [...completedMissions, mission.id],
      reactionLog: [
        { id: Date.now(), description: mission.rewardText, type: 'mission' },
        ...get().reactionLog
      ]
    });

    if (get().isAutoPlayVoice) {
      const m = await import('../utils/speech');
      await m.speakText(mission.rewardText);
    }

    // Advance to next mission after a short delay
    setTimeout(() => {
      if (activeMissionIndex < MISSIONS.length - 1) {
        set({ activeMissionIndex: activeMissionIndex + 1 });
      }
    }, 4000);
  },

  addReactant: async (chemical) => {
    const { reactants, isReacting, isPouring } = get();
    
    if (reactants.length >= 2 || isReacting || isPouring) return;
    
    if (reactants.some(r => r.id === chemical.id)) return;

    // Start pouring animation
    set({ isPouring: true, pouringChemical: chemical });
    
    // Log intent
    const pouringDesc = `Đang đổ ${chemical.name} vào cốc...`;
    set((state) => ({ 
      reactionLog: [
        { id: Date.now(), description: pouringDesc, type: 'info' },
        ...state.reactionLog
      ] 
    }));

    // Start voice if auto play is enabled
    const speechPromise = get().isAutoPlayVoice 
      ? import('../utils/speech').then(m => m.speakText(pouringDesc)) 
      : Promise.resolve();

    // Wait for both animation (3.2s) and speech to finish
    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 3200)),
      speechPromise
    ]);

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
        
        const reactionSpeechPromise = get().isAutoPlayVoice 
          ? import('../utils/speech').then(m => m.speakText(reaction.description)) 
          : Promise.resolve();

        // Check mission
        const currentMission = MISSIONS[get().activeMissionIndex];
        if (get().isMissionModeActive && currentMission && currentMission.targetReactionIds && currentMission.targetReactionIds.includes(reaction.id)) {
          // Await both the normal speech and then trigger mission completion which has its own speech
          reactionSpeechPromise.then(() => get().completeCurrentMission());
        }

        // Stop the visual effects after 5 seconds OR when speech finishes
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 5000)),
          reactionSpeechPromise
        ]);
        
        set({ isReacting: false });
      } else {
        playSciFiSound('error');
        const errorDesc = `Không có phản ứng xảy ra giữa ${newReactants[0].name} và ${newReactants[1].name}`;
        set((state) => ({ 
          reactionLog: [
            { id: Date.now(), description: errorDesc, type: 'warning' },
            ...state.reactionLog
          ] 
        }));
        
        if (get().isAutoPlayVoice) {
          const m = await import('../utils/speech');
          await m.speakText(errorDesc);
        }
      }
    } else {
      const successDesc = `Đã hoàn tất thêm ${chemical.name}. Hãy chọn thêm một chất nữa.`;
      set((state) => ({ 
        reactionLog: [
          { id: Date.now(), description: successDesc, type: 'info' },
          ...state.reactionLog
        ] 
      }));
      
      if (get().isAutoPlayVoice) {
        const m = await import('../utils/speech');
        await m.speakText(successDesc);
      }
    }
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

  setIsMuted: (isMuted) => {
    set({ isMuted });
  },

  setTtsSpeed: (ttsSpeed) => {
    set({ ttsSpeed });
  },

  setTtsVoiceURI: (ttsVoiceURI) => {
    set({ ttsVoiceURI });
  },

  setIsAutoPlayVoice: (isAutoPlayVoice) => {
    set({ isAutoPlayVoice });
  },

  runExample: async (chem1: Chemical, chem2: Chemical) => {
    const state = get();
    // 1. Reset beaker first
    state.resetBeaker();
    
    // 2. Add first chemical after a small delay
    await new Promise(res => setTimeout(res, 500));
    await get().addReactant(chem1);
    
    // 3. Add second chemical (addReactant already waits for pouring and voice to finish)
    // Add a tiny padding to let the beaker settle
    await new Promise(res => setTimeout(res, 300));
    await get().addReactant(chem2);
  }
}));
