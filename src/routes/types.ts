import type { useChemStore } from '../modules/PeriodicTable/store/useChemStore';

export type ChemStoreState = ReturnType<typeof useChemStore.getState>;
export type ViewType = ChemStoreState['activeView'];

export interface RouteConfig {
  view: ViewType;
  parseUrl?: (params: URLSearchParams, store: ChemStoreState) => void;
  buildUrl?: (params: URLSearchParams, state: ChemStoreState) => void;
}
