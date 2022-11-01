import {Preconditions} from '../preconditions.js';

/**
 * Invented to configure {@link Router}.
 */
export class RouterConfig {
  #routeToHandler;
  #homeRoute;

  /**
   * @typedef {Object} RouteToPageHandler
   * @property {string} route
   * @property {Function} routeHandler
   */

  /**
   * @param {RouteToPageHandler} routeToPageHandler
   * @param {string} homeRoute
   */
  constructor(routeToPageHandler, homeRoute) {
    this.#routeToHandler = routeToPageHandler;
    this.#homeRoute = homeRoute;
  }

  /**
   * @returns {RouteToPageHandler}
   */
  get routeToHandler() {
    return this.#routeToHandler;
  }

  /**
   * @returns {string}
   */
  get homeRoute() {
    return this.#homeRoute;
  }

  /**
   * @returns {RouterConfigBuilder}
   */
  static getBuilder() {
    return new RouterConfigBuilder();
  }
}

/**
 * Builder for {@link RouterConfig}.
 */
class RouterConfigBuilder {
  #routeToHandler = {};
  #homeRoute;

  /**
   * Map handler by route.
   * @param {string} route
   * @param {function} pageHandler
   * @returns {RouterConfigBuilder}
   */
  addRoute(route, pageHandler) {
    Preconditions.checkType(route, 'string');
    Preconditions.checkType(pageHandler, 'function');
    this.#routeToHandler[route] = pageHandler;
    return this;
  }

  /**
   * Map handler with reserved route '404' with handler for it.
   * @param {function(HTMLElement)} pageHandler
   * @returns {RouterConfigBuilder}
   */
  addRouteToNotFound(pageHandler) {
    Preconditions.checkType(pageHandler, 'function');
    this.#routeToHandler['404'] = pageHandler;
    return this;
  }

  /**
   * Set route to home.
   * @param {string} homeRoute
   * @returns {RouterConfigBuilder}
   */
  addRouteToHome(homeRoute) {
    Preconditions.checkType(homeRoute, 'string');
    this.#homeRoute = homeRoute;
    return this;
  }

  /**
   * @returns {RouterConfig}
   */
  build() {
    Preconditions.checkNotUndefined(this.#routeToHandler['404']);
    Preconditions.checkNotUndefined(this.#homeRoute);
    if (!this.#routeToHandler[this.#homeRoute]) {
      throw new Error('Route for home page is defined, but there is no such page. ' +
          'Please define it with \'addRoute\' method.');
    }
    return new RouterConfig(this.#routeToHandler, this.#homeRoute);
  }
}
