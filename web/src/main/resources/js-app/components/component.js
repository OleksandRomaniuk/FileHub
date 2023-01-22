/**
 * The base class with curtain life cycle and own markup.
 */
export class Component {
  parentElement;
  rootElement;
  #listeners = [];
  #isInitializationDone = false;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    this.parentElement = parent;
  }
  /**
   * Implements logic after delete child element.
   */
  destroy() {}
  /**
   * Implements logic before rendering.
   * @protected
   */
  init() {
    this.#isInitializationDone = true;
    this.render();
  }
  /**
   * Generete string for HTMLElement.
   * @abstract
   */
  markup() {}

  /**
   * Find slot by name.
   * @param {string} name
   * @returns {HTMLElement}
   * @protected
   */
  getSlot(name) {
    if (this.rootElement.getAttribute('data-td') === name) {
      return this.rootElement;
    }
    return this.rootElement.querySelector(`[data-td="${name}"]`);
  }

  /**
   * Add slot with exact name.
   * @param {string} name
   * @returns {string}
   */
  addSlot(name) {
    return `<slot data-td="${name}"></slot>`;
  }

  /**
   * Add a listener to the array for deleting on destroy.
   * @param {{field: string, listener}} listener
   */
  addListeners(listener) {
    this.#listeners.push(listener);
  }

  /**
   * @returns {{field: string, listener}[]}
   */
  get listeners() {
    return this.#listeners;
  }

  /**
   * Creates element from the markup and insert into parent.
   * @protected
   */
  render() {
    if (this.#isInitializationDone) {
      this.#createDomTree();
      this.afterRender();
    }
  }
  /**
   * Returns html attribute to mark element.
   * @param {string}name
   * @returns {string}
   * @protected
   */
  markElement(name) {
    return `data-td="${name}"`;
  }
  /**
   * Implements logic after rendering.
   */
  afterRender() {
  }
  /**
   * Creates Dom Tree the new one or replace old version.
   */
  #createDomTree() {
    const isFirstRendering = !this.rootElement;
    const newElement = this.#createNewElement();
    if (isFirstRendering) {
      this.parentElement.appendChild(newElement);
    } else {
      this.rootElement.replaceWith(newElement);
    }
    this.rootElement = newElement;
  }

  /**
   * Create new element in dav and return it.
   * @returns {HTMLElement}
   */
  #createNewElement() {
    // const tempElement = document.createElement('div');
    // tempElement.innerHTML = this.markup();
    // return tempElement.firstElementChild;

    const tempElement = document.createElement('template');
    tempElement.innerHTML = this.markup();
    return tempElement.content.firstElementChild;
  }
}


