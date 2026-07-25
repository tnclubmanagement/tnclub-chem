import { create } from 'zustand';
import type { ElementData } from '../data/elements';

interface ChemStoreState {
  selectedElement: ElementData | null;
  temperature: number;
  heatmapEnabled: boolean;
  activeGroup: number | null;
  activePeriod: number | null;
  isPanelOpen: boolean;
  activeTab: 'atom' | 'bond' | 'real';
  activeView: 'periodic-table' | 'lesson';
  activeLessonId: string | null;
  
  // Actions
  setSelectedElement: (el: ElementData | null) => void;
  setTemperature: (temp: number) => void;
  setHeatmapEnabled: (enabled: boolean) => void;
  setActiveGroup: (group: number | null) => void;
  setActivePeriod: (period: number | null) => void;
  closePanel: () => void;
  setActiveTab: (tab: 'atom' | 'bond' | 'real') => void;
  setActiveView: (view: 'periodic-table' | 'lesson') => void;
  setActiveLessonId: (id: string | null) => void;

  quizModeActive: boolean;
  setQuizModeActive: (active: boolean) => void;
  quizTargetZ: number | null;
  setQuizTargetZ: (z: number | null) => void;
  
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useChemStore = create<ChemStoreState>((set) => ({
  selectedElement: null,
  temperature: 298,
  heatmapEnabled: false,
  activeGroup: null,
  activePeriod: null,
  isPanelOpen: false,
  activeTab: (localStorage.getItem('edu3d_activeTab') as 'atom' | 'bond' | 'real') || 'atom',
  activeView: 'periodic-table',
  activeLessonId: null,

  setSelectedElement: (el) => set({ 
    selectedElement: el, 
    isPanelOpen: !!el, 
    activeGroup: null, 
    activePeriod: null 
  }),
  setTemperature: (temp) => set({ temperature: temp }),
  setHeatmapEnabled: (enabled) => set({ heatmapEnabled: enabled }),
  setActiveGroup: (group) => set({ 
    activeGroup: group, 
    activePeriod: null,
    selectedElement: null,
    isPanelOpen: group !== null 
  }),
  setActivePeriod: (period) => set({ 
    activePeriod: period, 
    activeGroup: null,
    selectedElement: null,
    isPanelOpen: period !== null 
  }),
  closePanel: () => set({ 
    isPanelOpen: false, 
    selectedElement: null, 
    activeGroup: null, 
    activePeriod: null 
  }),
  setActiveTab: (tab) => {
    localStorage.setItem('edu3d_activeTab', tab);
    set({ activeTab: tab });
  },
  setActiveView: (view) => set({ activeView: view, isPanelOpen: false }),
  setActiveLessonId: (id) => set({ activeLessonId: id, activeView: 'lesson', isPanelOpen: false }),

  quizModeActive: false,
  setQuizModeActive: (active) => set({ quizModeActive: active, quizTargetZ: null }),
  quizTargetZ: null,
  setQuizTargetZ: (z) => set({ quizTargetZ: z }),
  
  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled })
}));
