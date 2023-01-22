import {Component} from './component';

const BUTTON_EVENT = 'button_event';
/**
 * The component to generate button.
 */
export class Button extends Component {
  #title;
  #text;
  #type = 'primary';
  #isDisabled = false;
  #submitTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   * @param {string} title
   * @param {string} text
   * @param {string} type
   * @param {boolean} isDisabled
   */
  constructor(parent, title, text, type, isDisabled) {
    super(parent);
    this.#title = title;
    this.#text = text;
    this.#type = type;
    this.#isDisabled = isDisabled;
    this.init();
  }
  /**
   * Add event for clicking on this component.
   */
  afterRender() {
    this.rootElement.addEventListener('click', ()=>{
      this.#submitTarget.dispatchEvent(new Event(BUTTON_EVENT));
    });
  };
  /**
   * @returns {string}
   */
  get title() {
    return this.#text;
  }
  /**
   * Adds listener for BUTTON_EVENT;.
   * @param {function() :void} listener
   */
  onClick(listener) {
    this.#submitTarget.addEventListener(BUTTON_EVENT, listener);
  }
  /**
   * @inheritDoc
   */
  markup() {
    const text = this.title;
    const disabled = this.#isDisabled ? ' disabled' : '';
    // eslint-disable-next-line max-len
    return `<button class="button ${this.#type || 'primary'}" ${this.markElement('button')} type="submit" title="${this.#title}"${disabled}>${text}</button>`;
  }
}


