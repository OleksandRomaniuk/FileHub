/**
 * Simple realization of virtual DOM of the element.
 */
export class Component {
  parentElement;
  rootElement;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    this.parentElement = parent;
  }
  /**
   * Implements logic before rendering.
   */
  init() {
    this.render();
  }
  /**
   * @abstract
   */
  markup() {
  }

  /**
   * @param {string} name
   * @returns {HTMLElement}
   */
  getSlot(name) {
    return this.rootElement.querySelector(`[data-td="${name}"]`);
  }

  /**
   * @param {string} name
   * @returns {string}
   */
  addSlot(name) {
    return `<slot data-td="${name}"></slot>`;
  }

  /**
   * Creates element from the markup and insert into parent.
   */
  render() {
    this.#createDomTree();
    this.afterRender();
  }
  /**
   * Returns html attribute to mark element.
   * @param {string}name
   * @returns {string}
   */
  markElement(name) {
    return `data-td="${name}"`;
  }

  /**
   * Finds the element by attribute data-td.
   * @param {string} name
   * @returns {HTMLElement}
   */
  getElement(name) {
    return this.rootElement.querySelector(`[data-td="${name}"]`);
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
   * @returns {HTMLElement}
   */
  #createNewElement() {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this.markup();
    return tempElement.firstElementChild;
  }
}


