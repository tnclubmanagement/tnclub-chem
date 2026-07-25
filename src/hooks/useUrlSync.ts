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
      } else if (view === 'periodic-table') {
        store.setActiveView('periodic-table');
        if (elSymbol) {
          const el = ELEMENTS.find(e => e.symbol === elSymbol);
          if (el) store.setSelectedElement(el);
          else store.closePanel();
        } else {
          store.closePanel();
        }
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

      const url = new URL(window.location.href);
      let changed = false;

      if (state.activeView === 'lesson' && state.activeLessonId) {
        if (url.searchParams.get('view') !== 'lesson') { url.searchParams.set('view', 'lesson'); changed = true; }
        if (url.searchParams.get('id') !== state.activeLessonId) { url.searchParams.set('id', state.activeLessonId); changed = true; }
        if (url.searchParams.has('el')) { url.searchParams.delete('el'); changed = true; }
      } else {
        if (url.searchParams.get('view') !== 'periodic-table') { url.searchParams.set('view', 'periodic-table'); changed = true; }
        if (url.searchParams.has('id')) { url.searchParams.delete('id'); changed = true; }
        
        if (state.selectedElement) {
          if (url.searchParams.get('el') !== state.selectedElement.symbol) { 
            url.searchParams.set('el', state.selectedElement.symbol); 
            changed = true; 
          }
        } else {
          if (url.searchParams.has('el')) { url.searchParams.delete('el'); changed = true; }
        }
      }

      if (changed) {
        window.history.pushState({}, '', url);
      }
    });
  }, []);
};
