import { create } from 'zustand';
import { useChemStore } from '../../PeriodicTable/store/useChemStore';

export type FontSizeOption = 'small' | 'medium' | 'large' | 'xlarge';
export type FontFamilyOption = 'sans' | 'scifi' | 'serif' | 'mono';
export type ThemeMode = 'cyber' | 'neon' | 'nebula' | 'light';
export type GraphicsQuality = 'high' | 'medium' | 'low';

export interface SettingsState {
  fontSize: FontSizeOption;
  fontFamily: FontFamilyOption;
  theme: ThemeMode;
  soundEnabled: boolean;
  soundVolume: number;
  autoRotate3D: boolean;
  graphicsQuality: GraphicsQuality;

  setFontSize: (size: FontSizeOption) => void;
  setFontFamily: (family: FontFamilyOption) => void;
  setTheme: (theme: ThemeMode) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setAutoRotate3D: (autoRotate: boolean) => void;
  setGraphicsQuality: (quality: GraphicsQuality) => void;
  resetDefaults: () => void;
}

const LOCAL_STORAGE_KEY = 'chemedu3d_settings';

const DEFAULT_SETTINGS = {
  fontSize: 'medium' as FontSizeOption,
  fontFamily: 'sans' as FontFamilyOption,
  theme: 'cyber' as ThemeMode,
  soundEnabled: true,
  soundVolume: 80,
  autoRotate3D: true,
  graphicsQuality: 'high' as GraphicsQuality,
};

const loadInitialSettings = () => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_SETTINGS;
};

export const applySettingsToDOM = (settings: typeof DEFAULT_SETTINGS) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', settings.theme);
  root.setAttribute('data-font-size', settings.fontSize);
  root.setAttribute('data-font-family', settings.fontFamily);

  // Sync sound with ChemStore
  const chemStore = useChemStore.getState();
  if (chemStore.soundEnabled !== settings.soundEnabled) {
    chemStore.setSoundEnabled(settings.soundEnabled);
  }
};

const saveSettings = (newSettings: typeof DEFAULT_SETTINGS) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings));
  }
  applySettingsToDOM(newSettings);
};

const initial = loadInitialSettings();
// Apply settings immediately on store creation
applySettingsToDOM(initial);

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...initial,

  setFontSize: (fontSize) => {
    set({ fontSize });
    saveSettings({ ...get(), fontSize });
  },

  setFontFamily: (fontFamily) => {
    set({ fontFamily });
    saveSettings({ ...get(), fontFamily });
  },

  setTheme: (theme) => {
    set({ theme });
    saveSettings({ ...get(), theme });
  },

  setSoundEnabled: (soundEnabled) => {
    set({ soundEnabled });
    saveSettings({ ...get(), soundEnabled });
  },

  setSoundVolume: (soundVolume) => {
    set({ soundVolume });
    saveSettings({ ...get(), soundVolume });
  },

  setAutoRotate3D: (autoRotate3D) => {
    set({ autoRotate3D });
    saveSettings({ ...get(), autoRotate3D });
  },

  setGraphicsQuality: (graphicsQuality) => {
    set({ graphicsQuality });
    saveSettings({ ...get(), graphicsQuality });
  },

  resetDefaults: () => {
    set(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  },
}));
