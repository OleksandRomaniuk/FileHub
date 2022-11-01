import {RouterConfig} from './router-config.js';

/**
 * Router class for web pages. It can be configured with {@link RouterConfig}.
 */
export class Router {
  #routerConfig;

  /**
   * @param {RouterConfig} routerConfig
   */
  constructor(routerConfig) {
    this.#routerConfig = routerConfig;
    this.#routeToPage(window.location.hash.replace('#', ''))();
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      this.#routeToPage(hash.replace('#', ''))();
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
   * @returns {Function}
   * @private
   */
  #routeToPage(route) {
    if (route === '') {
      return () => {
        this.redirect(this.#routerConfig.homeRoute);
      };
    }
    if (!this.#routerConfig.routeToHandler[route]) {
      return this.#routerConfig.routeToHandler['404'];
    }

    return this.#routerConfig.routeToHandler[route];
  }
}

