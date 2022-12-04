import {Preconditions} from '../preconditions.js';

/**
 * Router configuration class.
 */
export class RouterConfig {
  #routeToHandler;
  #homeRoute;
  #dynamicRoutes;
  #eventTarget;

  /**
   * @typedef {object} RouteToPageHandler
   * @property {string} route
   * @property {Function} routeHandler
   */

  /**
   * @param {RouteToPageHandler} routeToPageHandler
   * @param {string} homeRoute
   * @param {DynamicRoutes[]} dynamicRoutes
   * @param {EventTarget} eventTarget
   */
  constructor(routeToPageHandler, homeRoute, dynamicRoutes, eventTarget) {
    this.#routeToHandler = routeToPageHandler;
    this.#homeRoute = homeRoute;
    this.#dynamicRoutes = dynamicRoutes;
    this.#eventTarget = eventTarget;
  }

  /**
   * @returns {RouteToPageHandler}
   */
  get routeToHandler() {
    return this.#routeToHandler;
  }

  /**
   * @returns {DynamicRoutes}
   */
  get dynamicRoutes() {
    return this.#dynamicRoutes;
  }

  /**
   * @returns {string}
   */
  get homeRoute() {
    return this.#homeRoute;
  }

  /**
   * @returns {EventTarget}
   */
  get eventTarget() {
    return this.#eventTarget;
  }

  /**
   * Returns builder class for {@link RouterConfig}.
   * @returns {RouterConfigBuilder}
   */
  static getBuilder() {
    return new RouterConfigBuilder();
  }
}

const ROUTE_SEPARATOR = '/:';

/**
 * Builder for {@link RouterConfig}.
 */
class RouterConfigBuilder {
  #routeToHandler = {};
  #homeRoute;
  #eventTarget = new EventTarget();

  /**
   * @typedef DynamicRoutes
   * @property {string} mainRoute
   * @property {string} dynamicRoute
   */

  /**
   * @type {DynamicRoutes[]}
   */
  #dynamicRoutes = [];

  /**
   * Maps handler by route.
   * @param {string} route
   * @param {Function} pageHandler
   * @returns {RouterConfigBuilder}
   */
  addRoute(route, pageHandler) {
    Preconditions.checkType(route, 'string');
    Preconditions.checkType(pageHandler, 'function');
    if (route.includes(ROUTE_SEPARATOR)) {
      const [mainRoute, dynamicRoute] = route.split(ROUTE_SEPARATOR);
      this.#dynamicRoutes.push({mainRoute, dynamicRoute});
      this.#routeToHandler[mainRoute] = pageHandler;
      return this;
    }
    this.#routeToHandler[route] = pageHandler;
    return this;
  }

  /**
   * Adds listener for route change.
   * @param {string} route
   * @param {Function} routeChangeListener
   * @returns {RouterConfigBuilder}
   */
  addMetadataChangeListener(route, routeChangeListener) {
    this.#eventTarget.addEventListener(route, (event) => {
      routeChangeListener(event.detail.route, event.detail.metadata);
    });
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
    return new RouterConfig(this.#routeToHandler, this.#homeRoute, this.#dynamicRoutes, this.#eventTarget);
  }
}
