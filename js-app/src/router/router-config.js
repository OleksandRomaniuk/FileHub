import {Preconditions} from '../preconditions.js';

/**
 * Router configuration class.
 */
export class RouterConfig {
  #routeToHandler;
  #homeRoute;

  /**
   * @typedef {object} RouteToPageHandler
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
   * Returns builder class for {@link RouterConfig}.
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
   * Maps handler by route.
   * @param {string} route
   * @param {Function} pageHandler
   * @returns {RouterConfigBuilder}
   */
  addRoute(route, pageHandler) {
    Preconditions.checkType(route, 'string');
    Preconditions.checkType(pageHandler, 'function');
    this.#routeToHandler[route] = pageHandler;
    return this;
  }

  /**
   * Maps handler with reserved route '404' with handler for it.
   * @param {function(HTMLElement)} pageHandler
   * @returns {RouterConfigBuilder}
   */
  addRouteToNotFound(pageHandler) {
    Preconditions.checkType(pageHandler, 'function');
    this.#routeToHandler['404'] = pageHandler;
    return this;
  }

  /**
   * Sets route to home.
   * @param {string} homeRoute
   * @returns {RouterConfigBuilder}
   */
  addRouteToHome(homeRoute) {
    Preconditions.checkType(homeRoute, 'string');
    this.#homeRoute = homeRoute;
    return this;
  }

  /**
   * Creates and returns {@link RouterConfig}.
   * @returns {RouterConfig}
   * @throws Error - In case when route to home is defined, but its handler is not defined.
   */
  build() {
    Preconditions.checkNotUndefined(this.#routeToHandler['404'],
        'Handler for route to \'404 not found page\' is not defined.');
    Preconditions.checkNotUndefined(this.#homeRoute, 'Route to home page is not defined');
    if (!this.#routeToHandler[this.#homeRoute]) {
      throw new Error('Route for home page is defined, but there is no such page. ' +
          'Please define it with \'addRoute\' method.');
    }
    return new RouterConfig(this.#routeToHandler, this.#homeRoute);
  }
}
