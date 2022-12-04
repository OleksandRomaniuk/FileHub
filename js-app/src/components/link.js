import {Component} from './component.js';

const CLICK_EVENT = 'click-event';

/**
 * Link component.
 */
export class Link extends Component {
  #linkText;
  #iconClass = '';
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
   * @param {string} value
   */
  set iconClass(value) {
    this.#iconClass = value;
    this.render();
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
    const linkMarkup = `
        <a href="" title="${this.#linkText}"data-td="link">${this.#linkText}
<span class="glyphicon ${this.#iconClass}" aria-hidden="true"></span></a>`;
    return linkMarkup.replace(/\n|\r/g, '');
  }
}
