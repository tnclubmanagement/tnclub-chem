import { create } from 'zustand';
import type { SearchCategory } from '../../../services/globalSearch/types';

const RECENT_KEY = 'edu3d_recent_searches';

function getStoredRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : ['Fe', 'H2O', 'Bảng tuần hoàn', 'Phản ứng trung hòa'];
  } catch {
    return ['Fe', 'H2O', 'Bảng tuần hoàn'];
  }
}

interface GlobalSearchState {
  isOpen: boolean;
  query: string;
  selectedCategory: SearchCategory;
  selectedIndex: number;
  recentSearches: string[];

  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setQuery: (query: string) => void;
  setSelectedCategory: (cat: SearchCategory) => void;
  setSelectedIndex: (index: number) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useGlobalSearchStore = create<GlobalSearchState>((set) => ({
  isOpen: false,
  query: '',
  selectedCategory: 'all',
  selectedIndex: 0,
  recentSearches: getStoredRecent(),

  openSearch: () => set({ isOpen: true, query: '', selectedIndex: 0 }),
  closeSearch: () => set({ isOpen: false, query: '', selectedIndex: 0 }),
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen, query: '', selectedIndex: 0 })),
  
  setQuery: (query) => set({ query, selectedIndex: 0 }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat, selectedIndex: 0 }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),

  addRecentSearch: (queryStr) =>
    set((state) => {
      const trimmed = queryStr.trim();
      if (!trimmed) return state;
      const filtered = state.recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return { recentSearches: updated };
    }),

  clearRecentSearches: () =>
    set(() => {
      try {
        localStorage.removeItem(RECENT_KEY);
      } catch {
        // ignore
      }
      return { recentSearches: [] };
    }),
}));
