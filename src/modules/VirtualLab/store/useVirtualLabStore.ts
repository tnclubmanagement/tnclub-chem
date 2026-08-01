import { create } from 'zustand';
import type { Chemical } from '../data/chemicals';
import { type Reaction } from '../data/reactions';
import { ChemEngine } from '../services/ChemEngine';
import { playSciFiSound } from '../../PeriodicTable/utils/audio';
import { MISSIONS } from '../data/missions';
import { useLanguageStore } from '../../../i18n/useTranslation';

export interface LogEntry {
  id: number;
  equationHTML?: string;
  description: string;
  descriptionEn?: string;
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
  isAutoPlayVoice: true,

  isMissionModeActive: false,
  activeMissionIndex: 0,
  completedMissions: [],

  toggleMissionMode: () => {
    const { isMissionModeActive } = get();
    set({ 
      isMissionModeActive: !isMissionModeActive,
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
    const rewardTextVi = mission.rewardText;
    const rewardTextEn = mission.rewardTextEn || mission.rewardText;
    
    set({
      completedMissions: [...completedMissions, mission.id],
      reactionLog: [
        { 
          id: Date.now(), 
          description: rewardTextVi, 
          descriptionEn: rewardTextEn,
          type: 'mission' 
        },
        ...get().reactionLog
      ]
    });

    if (get().isAutoPlayVoice) {
      const m = await import('../utils/speech');
      const lang = useLanguageStore.getState().language;
      await m.speakText(lang === 'en' ? rewardTextEn : rewardTextVi);
    }

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

    set({ isPouring: true, pouringChemical: chemical });
    
    const pouringDescVi = `Đang đổ ${chemical.name} vào cốc...`;
    const pouringDescEn = `Pouring ${chemical.nameEn || chemical.name} into beaker...`;

    set((state) => ({ 
      reactionLog: [
        { 
          id: Date.now(), 
          description: pouringDescVi, 
          descriptionEn: pouringDescEn,
          type: 'info' 
        },
        ...state.reactionLog
      ] 
    }));

    const lang = useLanguageStore.getState().language;
    const activePouringText = lang === 'en' ? pouringDescEn : pouringDescVi;

    const speechPromise = get().isAutoPlayVoice 
      ? import('../utils/speech').then(m => m.speakText(activePouringText)) 
      : Promise.resolve();

    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 3200)),
      speechPromise
    ]);

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
            { 
              id: Date.now(), 
              equationHTML: reaction.equationHTML, 
              description: reaction.description, 
              descriptionEn: reaction.descriptionEn || reaction.description,
              type: 'reaction' 
            },
            ...state.reactionLog
          ] 
        }));
        
        const activeReactionText = lang === 'en' ? (reaction.descriptionEn || reaction.description) : reaction.description;

        const reactionSpeechPromise = get().isAutoPlayVoice 
          ? import('../utils/speech').then(m => m.speakText(activeReactionText)) 
          : Promise.resolve();

        const currentMission = MISSIONS[get().activeMissionIndex];
        if (get().isMissionModeActive && currentMission && currentMission.targetReactionIds && currentMission.targetReactionIds.includes(reaction.id)) {
          reactionSpeechPromise.then(() => get().completeCurrentMission());
        }

        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 5000)),
          reactionSpeechPromise
        ]);
        
        set({ isReacting: false });
      } else {
        playSciFiSound('error');
        const c1NameVi = newReactants[0].name;
        const c1NameEn = newReactants[0].nameEn || newReactants[0].name;
        const c2NameVi = newReactants[1].name;
        const c2NameEn = newReactants[1].nameEn || newReactants[1].name;

        const errorDescVi = `Không có phản ứng xảy ra giữa ${c1NameVi} và ${c2NameVi}`;
        const errorDescEn = `No reaction occurs between ${c1NameEn} and ${c2NameEn}`;

        set((state) => ({ 
          reactionLog: [
            { 
              id: Date.now(), 
              description: errorDescVi, 
              descriptionEn: errorDescEn,
              type: 'warning' 
            },
            ...state.reactionLog
          ] 
        }));
        
        if (get().isAutoPlayVoice) {
          const m = await import('../utils/speech');
          const activeErrorText = lang === 'en' ? errorDescEn : errorDescVi;
          await m.speakText(activeErrorText);
        }
      }
    } else {
      const chemNameVi = chemical.name;
      const chemNameEn = chemical.nameEn || chemical.name;
      const successDescVi = `Đã hoàn tất thêm ${chemNameVi}. Hãy chọn thêm một chất nữa.`;
      const successDescEn = `Added ${chemNameEn}. Select one more chemical.`;

      set((state) => ({ 
        reactionLog: [
          { 
            id: Date.now(), 
            description: successDescVi, 
            descriptionEn: successDescEn,
            type: 'info' 
          },
          ...state.reactionLog
        ] 
      }));
      
      if (get().isAutoPlayVoice) {
        const m = await import('../utils/speech');
        const activeSuccessText = lang === 'en' ? successDescEn : successDescVi;
        await m.speakText(activeSuccessText);
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
    state.resetBeaker();
    
    await new Promise(res => setTimeout(res, 500));
    await get().addReactant(chem1);
    
    await new Promise(res => setTimeout(res, 300));
    await get().addReactant(chem2);
  }
}));
