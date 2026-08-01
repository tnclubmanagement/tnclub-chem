import type { RouteConfig, ViewType } from './types';

class RouteRegistry {
  private routes = new Map<ViewType, RouteConfig>();
  private defaultView: ViewType = 'home';

  public register(config: RouteConfig): void {
    this.routes.set(config.view, config);
  }

  public getRoute(view: string | null): RouteConfig {
    if (view && this.routes.has(view as ViewType)) {
      return this.routes.get(view as ViewType)!;
    }
    return this.routes.get(this.defaultView)!;
  }

  public isRegistered(view: string): boolean {
    return this.routes.has(view as ViewType);
  }

  public getDefaultView(): ViewType {
    return this.defaultView;
  }

  public getAllRoutes(): RouteConfig[] {
    return Array.from(this.routes.values());
  }
}

export const routeRegistry = new RouteRegistry();
