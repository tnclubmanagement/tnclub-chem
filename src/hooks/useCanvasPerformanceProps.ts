import { useGlobalSearchStore } from '../components/GlobalSearch/store/useGlobalSearchStore';
import { useSettingsStore } from '../modules/Settings/store/useSettingsStore';

export function useCanvasPerformanceProps() {
  const isSearchOpen = useGlobalSearchStore((state) => state.isOpen);
  const graphicsQuality = useSettingsStore((state) => state.graphicsQuality);

  // Dynamic DPR based on user Graphics Quality setting
  const dpr: [number, number] =
    graphicsQuality === 'low'
      ? [1, 1]
      : graphicsQuality === 'medium'
      ? [1, 1.5]
      : [1, 1.75];

  return {
    // Only suspend WebGL loop when full-screen Global Search Modal is active
    frameloop: (isSearchOpen ? 'demand' : 'always') as 'demand' | 'always',
    dpr,
    performance: { min: 0.5 },
  };
}
