/**
 * Class for handling pages and giving right page after request.
 */
export class Router {
  #pages = {};
  #defaultPageCreator = {};
  #errorPageCreator = {};

  /**
   * @param {function} pageCreator
   */
  set defaultPage(pageCreator) {
    this.#defaultPageCreator = pageCreator;
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
      return this.#defaultPageCreator;
    } else {
      return this.#errorPageCreator;
    }
  }
}
