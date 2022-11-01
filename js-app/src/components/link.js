import {Component} from './component.js';

const CLICK_EVENT = 'click-event';

/**
 * An implementation of {@link Component} that represent link element.
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
   * Subscribe user for link click event and forward event to upper level.
   * @param {function} listener
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
