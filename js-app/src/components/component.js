/**
 * Abstract class for JS component that must be inherited by all components.
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
   * Lifecycle hook that performed before render.
   * @abstract
   * @protected
   */
  init() {
    this.render();
  }

  /**
   * Method that was invented for defining html code that must be rendered.
   * @abstract
   * @returns {string}
   * @protected
   */
  markup() {
  }

  /**
   * Lifecycle hook that performed after render.
   * @abstract
   * @protected
   */
  afterRender() {}

  /**
   * Returns slot by its name.
   * @param {string} slotName
   * @returns {HTMLElement}
   * @protected
   */
  getSlot(slotName) {
    return this.rootElement.querySelector(`[data-td=${slotName}]`);
  }

  /**
   * Creates slot with name.
   * @param {string} slotName
   * @returns {string}
   * @protected
   */
  addSlot(slotName) {
    return `<slot data-td="${slotName}"></slot>`;
  }

  /**
   * Renders component and call afterRender lifecycle hook.
   * @protected
   */
  render() {
    this.#createDomTree();
    this.afterRender();
  }
  /**
   * @private
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
   * @returns {Element}
   * @private
   */
  #createNewElement() {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this.markup();

    return tempElement.firstElementChild;
  }
}
