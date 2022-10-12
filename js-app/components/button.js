import {Component} from './component.js';

/**
 * The component for generate button.
 */
export class Button extends Component {
  _text;

  /**
   * @param{string} text
   */
  set title(text) {
    this._text = text;
    this.render();
  }

  /**
   * @returns {string}
   */
  get title() {
    return this._text;
  }

  /**
   * @returns {string} button html as string
   */
  markup() {
    const text = this.title;
    return ` <button class="button primary" type="submit" title="${text}">${text}</button>`;
  }
}


