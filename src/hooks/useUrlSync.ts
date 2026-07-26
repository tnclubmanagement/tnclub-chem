import { useEffect, useRef } from 'react';
import { useChemStore } from '../modules/PeriodicTable';
import { ELEMENTS } from '../modules/PeriodicTable/data/elements';

export const useUrlSync = () => {
  const isInitializing = useRef(true);

  // 1. Sync from URL to State (on mount and popstate)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      const lessonId = params.get('id');
      const elSymbol = params.get('el');

      const store = useChemStore.getState();

      if (view === 'lesson' && lessonId) {
        store.setActiveLessonId(lessonId);
      } else if (view === 'explorer') {
        store.setActiveView('explorer');
      } else if (view === 'periodic-table') {
        store.setActiveView('periodic-table');
        if (elSymbol) {
          const el = ELEMENTS.find(e => e.symbol === elSymbol);
          if (el) store.setSelectedElement(el);
          else store.closePanel();
        } else {
          store.closePanel();
        }
      } else if (view === 'virtual-lab') {
        store.setActiveView('virtual-lab');
      } else {
        // Default
        store.setActiveView('periodic-table');
      }
    };

    // Run once on mount
    handleUrlChange();
    isInitializing.current = false;

    // Listen to browser back/forward buttons
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // 2. Sync from State to URL
  useEffect(() => {
    return useChemStore.subscribe((state) => {
      if (isInitializing.current) return;

      const currentUrl = new URL(window.location.href);
      const newParams = new URLSearchParams();

      // Set view
      newParams.set('view', state.activeView);

      // Set view-specific params
      if (state.activeView === 'lesson' && state.activeLessonId) {
        newParams.set('id', state.activeLessonId);
      } else if (state.activeView === 'periodic-table' && state.selectedElement) {
        newParams.set('el', state.selectedElement.symbol);
      }

      // Only push state if the search string actually changed
      const newSearch = `?${newParams.toString()}`;
      if (currentUrl.search !== newSearch) {
        window.history.pushState({}, '', `${currentUrl.pathname}${newSearch}`);
      }
    });
  }, []);
};
