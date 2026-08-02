import { routeRegistry } from './registry';
import { ELEMENTS } from '../modules/PeriodicTable/data/elements';

// Register Module Routes dynamically
routeRegistry.register({
  view: 'home',
});

routeRegistry.register({
  view: 'periodic-table',
  parseUrl: (params, store) => {
    const elSymbol = params.get('el');
    if (elSymbol) {
      const el = ELEMENTS.find(e => e.symbol === elSymbol);
      if (el) {
        store.setSelectedElement(el);
      } else {
        store.closePanel();
      }
    } else {
      store.closePanel();
    }
  },
  buildUrl: (params, state) => {
    if (state.selectedElement) {
      params.set('el', state.selectedElement.symbol);
    }
  },
});

routeRegistry.register({
  view: 'lesson',
  parseUrl: (params, store) => {
    const lessonId = params.get('id');
    store.setActiveLessonId(lessonId || null);
  },
  buildUrl: (params, state) => {
    if (state.activeLessonId) {
      params.set('id', state.activeLessonId);
    }
  },
});

routeRegistry.register({
  view: 'explorer',
});

routeRegistry.register({
  view: 'virtual-lab',
});

routeRegistry.register({
  view: 'academy',
});

routeRegistry.register({
  view: 'settings',
});

export * from './types';
export * from './registry';
