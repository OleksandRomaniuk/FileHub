/**
 * Class for handling pages and giving right page after request.
 */
export class HashRouter {
  #rootElement;
  #pages = {};
  #defaultPage;
  #errorPageCreator = {};

  /**
   * @param {Object} pages
   * @param {string} defaultPage
   * @param {function} errorPageCreator
   */
  constructor(pages, defaultPage, errorPageCreator) {
    this.#pages = pages;
    this.#defaultPage = defaultPage;
    this.#errorPageCreator = errorPageCreator;
    window.addEventListener('hashchange', ()=>{
      const hash = window.location.hash;
      this.getPage(hash)();
    });
    const hash = window.location.hash;
    this.getPage(hash)(this.#rootElement);
  }


  /**
   * @param {string} page
   */
  set defaultPage(page) {
    this.#defaultPage = page;
  }

  /**
   * @param {function} creator - function for creating error page
   */
  set errorPage(creator) {
    this.#errorPageCreator = creator;
  }

  /**
   * @param {string} pageName
   * @param {function} pageCreator
   */
  addPage(pageName, pageCreator) {
    this.#pages[pageName] = pageCreator;
  }

  /**
   * @param {string} name
   * @returns {function}
   */
  getPage(name) {
    if (this.#pages[name]) {
      return this.#pages[name];
    } else if (name === '') {
      return HashRouter.redirect(this.#defaultPage);
    } else {
      return this.#errorPageCreator;
    }
  }

  /**
   * Change path location to path.
   * @param {string} path
   */
  static redirect(path) {
    window.location.hash = path;
  }

  /**
   * @returns {RouterConfigBuilder}
   */
  static getBuilder() {
    return new RouterConfigBuilder();
  }
}

/**
 * Builder for HashRouter with all parameters.
 */
export class RouterConfigBuilder {
  #pages = {};
  #defaultPage;
  #errorPageCreator = {};


  /**
   * @param {string} pageName
   * @param {function} pageCreator
   * @returns {RouterConfigBuilder}
   */
  addPage(pageName, pageCreator) {
    if (typeof pageName != 'string' || typeof pageCreator !='function') {
      throw new Error('wrong type of arguments');
    }
    this.#pages[pageName] = pageCreator;
    return this;
  }

  /**
   * @param {string} page
   * @returns {RouterConfigBuilder}
   */
  setDefaultPage(page) {
    this.#defaultPage = page;
    return this;
  }

  /**
   * @param {function} creator
   * @returns {RouterConfigBuilder}
   */
  setErrorPageCreator(creator) {
    if (typeof creator != 'function') {
      throw new Error('wrong type of argument');
    }
    this.#errorPageCreator = creator;
    return this;
  }
  /**
   * Creates object of {@link HashRouter} with all parameters.
   * @returns {HashRouter}
   */
  build() {
    return new HashRouter(this.#pages, this.#defaultPage, this.#errorPageCreator);
  }
}
