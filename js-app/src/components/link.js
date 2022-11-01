import {Component} from './component.js';

const CLICK_EVENT = 'click-event';

/**
 * Link component.
 */
export class Link extends Component {
  #linkText;
  #eventTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   * @param {string} linkText
   */
  constructor(parent, linkText) {
    super(parent);
    this.#linkText = linkText;
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    this.rootElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.#eventTarget.dispatchEvent(new Event(CLICK_EVENT));
    });
  }

  /**
   * Adds listener for click event.
   * @param {Function} listener
   */
  onClick(listener) {
    this.#eventTarget.addEventListener(CLICK_EVENT, listener);
  }

  /**
   * @inheritDoc
   * @returns {string}
   */
  markup() {
    return `
        <a href="" title="${this.#linkText}" data-td="link">
            ${this.#linkText}
        </a>
    `;
  }
}
