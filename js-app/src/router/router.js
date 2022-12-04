import {RouterConfig} from './router-config.js';

/**
 * Router class for web pages. It can be configured with {@link RouterConfig}.
 */
export class Router {
  #routerConfig;
  #currentDynamicRoute;

  /**
   * @param {RouterConfig} routerConfig
   */
  constructor(routerConfig) {
    this.#routerConfig = routerConfig;
    this.#routeToPage(window.location.hash.replace('#', ''));
    window.addEventListener('hashchange', () => {
      this.#routeToPage(window.location.hash.replace('#', ''));
    });
  }

  /**
   * Changes hash in URL to {@link path}.
   * @param {string} path
   */
  redirect(path) {
    window.location.hash = path;
  }

  /**
   * Returns page handler by route.
   * @param {string} route
   * @private
   */
  #routeToPage(route) {
    if (route === '') {
      this.redirect(this.#routerConfig.homeRoute);
    }

    const path = this.#parseRoute(route);

    const dynamicRouteFromConfig = this.#findConfiguredDynamicRoute(path.mainRoute);

    if (dynamicRouteFromConfig) {
      if (dynamicRouteFromConfig.mainRoute !== this.#currentDynamicRoute) {
        this.#currentDynamicRoute = dynamicRouteFromConfig.mainRoute;
        this.#routerConfig.routeToHandler[dynamicRouteFromConfig.mainRoute]();
      }

      this.#routerConfig.eventTarget.dispatchEvent(
          new CustomEvent(dynamicRouteFromConfig.mainRoute,
              {detail: {route: dynamicRouteFromConfig.mainRoute,
                metadata: {[dynamicRouteFromConfig.dynamicRoute]: path.dynamicRoute}}}));
      return;
    }
    this.#currentDynamicRoute = null;

    if (!this.#routerConfig.routeToHandler[route]) {
      this.#routerConfig.routeToHandler['404']();
    }

    this.#routerConfig.routeToHandler[route]();
  }

  /**
   * @param {string} route
   * @returns {{}}
   * @private
   */
  #findConfiguredDynamicRoute(route) {
    return this.#routerConfig.dynamicRoutes.filter((dynamicRoute) => dynamicRoute.mainRoute === route)[0];
  }

  /**
   * @param {string} route
   * @returns {{}}
   * @private
   */
  #parseRoute(route) {
    const routeParts = route.split('/');
    if (routeParts.length === 1) {
      return {mainRoute: routeParts[0], dynamicRoute: ''};
    }
    return {mainRoute: routeParts[0], dynamicRoute: routeParts[1]};
  }
}

