/**
 * Abstract class for JS component that is independent and reusable.
 * Have functionality for rendering and configuring inheritors.
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
   * @abstract method that performed before render.
   * @protected
   */
  init() {
    this.render();
  }

  /**
   * @abstract method that was invented for defining html code that must be rendered.
   * @protected
   */
  markup() {
  }

  /**
   * @abstract lifecycle hook that performed after render.
   * @protected
   */
  afterRender() {}

  /**
   * @protected
   * @param {string} slotName
   * @returns {HTMLElement}
   */
  getSlot(slotName) {
    return this.rootElement.querySelector(`[data-td=${slotName}]`);
  }

  /**
   * @protected
   * @param {string} slotName
   * @returns {string}
   */
  addSlot(slotName) {
    return `<slot data-td="${slotName}"></slot>`;
  }

  /**
   * Render component.
   * @protected
   */
  render() {
    this.#createDomTree();
    this.afterRender();
  }
  /**
   * Render html element returned from {@link this.#createNewElement} inside {@link parentElement}
   * if it doesn't exist before or instead of {@link rootElement}.
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
   * Crete temporary html element that contain element form {@link markup} and return it.
   * @returns {Element}
   */
  #createNewElement() {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this.markup();

    return tempElement.firstElementChild;
  }
}
