/**
 * Handles page creators according to the hash.
 */
export class Router {
  #pathToPageCreatorMap = {};
  #defaultPage;
  #errorPageCreator;
  #routeChangeListener;
  #previousRoute;


  /**
   * @typedef {object} pathMap
   * @property {string} path
   * @property {Function} creator
   */
  /**
   * @param {object} pathMap
   * @param {string} defaultPage
   * @param {Function} routeChangeListener
   * @param {Function} errorPageCreator
   */
  constructor(pathMap, defaultPage, routeChangeListener, errorPageCreator) {
    this.#pathToPageCreatorMap = pathMap;
    this.#defaultPage = defaultPage;
    this.#routeChangeListener = routeChangeListener;
    this.#errorPageCreator = errorPageCreator;
    window.addEventListener('hashchange', ()=>{
      this.#handleRoute( window.location.hash.replace('#', ''));
    });
    this.#handleRoute( window.location.hash.replace('#', ''));
  }

  /**
   * Get function for creating page by name.
   * @param {string} name
   */
  #handleRoute(name) {
    if (this.#pathToPageCreatorMap[name]) {
      this.#previousRoute = name;
      this.#pathToPageCreatorMap[name]();
      return;
    } else if (name === '') {
      this.redirect(this.#defaultPage);
      return;
    }
    const parsedPath = this.#parseRouteWithParams(name);
    if (parsedPath.routePath) {
      this.#routeChangeListener(parsedPath.params);
    } else {
      this.#errorPageCreator();
      return;
    }
    if (this.#previousRoute !== parsedPath.routePath) {
      this.#previousRoute = parsedPath.routePath;
      this.#pathToPageCreatorMap[parsedPath.routePath](parsedPath.params);
    }
  }
  /**
   * @param {string} path
   * @returns {{routePath: {string}, params: {}}}
   * @private
   */
  #parseRouteWithParams(path) {
    const routeArray = path.split('/');
    const dynamicParams = {};
    let resultedPathToPageCreatorMap;
    Object.keys(this.#pathToPageCreatorMap).forEach((pathToPageCreatorMap) => {
      resultedPathToPageCreatorMap = pathToPageCreatorMap;
      const arrayPath = pathToPageCreatorMap.split('/');
      arrayPath.every((parsedPath, index) => {
        if (parsedPath.startsWith(':')) {
          dynamicParams[parsedPath.substring(1)] = routeArray[index] || null;
        } else if (parsedPath !== routeArray[index]) {
          resultedPathToPageCreatorMap = null;
          return false;
        }
        return true;
      });
    });
    return {
      routePath: resultedPathToPageCreatorMap,
      params: dynamicParams,
    };
  }

  /**
   * Change path location to path.
   * @param {string} path
   */
  redirect(path) {
    window.location.hash = '#' + path;
  }

  /**
   * Get builder for set all fields.
   * @returns {RouterConfigBuilder}
   */
  static getBuilder() {
    return new RouterConfigBuilder();
  }
}

/**
 * Builder for Router with all parameters.
 */
class RouterConfigBuilder {
  #pathToPageCreatorMap = {};
  #defaultPage;
  #errorPageCreator;
  #routeChangeListener;

  /**
   * Add page with function for Object pages.
   * @param {string} path
   * @param {Function} pageCreator
   * @returns {RouterConfigBuilder}
   * @throws {Error} - throws error when arguments are invalid.
   */
  addPage(path, pageCreator) {
    if (typeof path != 'string' || typeof pageCreator !='function') {
      throw new Error('wrong type of arguments');
    }
    this.#pathToPageCreatorMap[path] = pageCreator;
    return this;
  }

  /**
   * Add listener on changing id in the route.
   * @param {string} RouteChangeListener
   * @returns {RouterConfigBuilder}
   */
  addRouteChangeListener(RouteChangeListener) {
    this.#routeChangeListener = RouteChangeListener;
    return this;
  }

  /**
   * Set default page for rendering when hash is empty.
   * @param {string} path
   * @returns {RouterConfigBuilder}
   */
  setDefaultPage(path) {
    this.#defaultPage = path;
    return this;
  }

  /**
   * Set function for rendering error page when hash is invalid.
   * @param {Function} creator
   * @returns {RouterConfigBuilder}
   * @throws {Error}
   */
  setErrorPageCreator(creator) {
    if (typeof creator != 'function') {
      throw new Error('wrong type of argument');
    }
    this.#errorPageCreator = creator;
    return this;
  }

  /**
   * Creates object of {@link Router} with all parameters.
   * @returns {Router}
   */
  build() {
    return new Router(
      this.#pathToPageCreatorMap,
      this.#defaultPage,
      this.#routeChangeListener,
      this.#errorPageCreator);
  }
}
