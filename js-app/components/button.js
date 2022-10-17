import {Component} from './component.js';

/**
 * The component for generate button.
 */
export class Button extends Component {
  #text;

  /**
   * @param {HTMLElement} parent
   * @param {string} title
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
    const text = this.title;
    return ` <button class="button primary" ${this.markElement('button')}  type="submit" title="${text}">${text}
 </button>`;
  }
  /**
   * @returns {string}
   */
  get title() {
    return this.#text;
  }
}


