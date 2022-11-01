import {Component} from './component.js';

/**
 * Button component.
 */
export class Button extends Component {
  #text;

  /**
   * @param {HTMLElement} parent
   * @param {string} title - Text in button.
   */
  constructor(parent, title) {
    super(parent);
    this.#text = title;
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
        <button class="button button-primary" type="submit" title="${this.#text}" data-td="button">
            ${this.#text}
        </button>
    `;
  }
}
