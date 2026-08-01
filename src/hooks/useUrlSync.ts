import { useEffect, useRef } from 'react';
import { useChemStore } from '../modules/PeriodicTable';
import { routeRegistry } from '../routes';

export const useUrlSync = () => {
  const isInitializing = useRef(true);

  // 1. Sync from URL to State (on mount and popstate)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const rawView = params.get('view');
      const store = useChemStore.getState();

      const route = routeRegistry.getRoute(rawView);

      // Set active view once based on route configuration
      store.setActiveView(route.view);

      // Execute module-specific URL parser if defined
      if (route.parseUrl) {
        route.parseUrl(params, store);
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

      // Set view parameter
      newParams.set('view', state.activeView);

      // Execute active route's URL builder if defined
      const activeRoute = routeRegistry.getRoute(state.activeView);
      if (activeRoute?.buildUrl) {
        activeRoute.buildUrl(newParams, state);
      }

      // Only push state if the search string actually changed
      const newSearch = `?${newParams.toString()}`;
      if (currentUrl.search !== newSearch) {
        window.history.pushState({}, '', `${currentUrl.pathname}${newSearch}`);
      }
    });
  }, []);
};
