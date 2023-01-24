import {Component} from './component';

const LINK_EVENT = 'link_event';
/**
 * The component to generate link.
 */
export class Link extends Component {
  #text;
  #submitTarget = new EventTarget();
  #innerHTML;
  /**
   * @param {HTMLElement} parent
   * @param {string} text
   */
  constructor(parent, text) {
    super(parent);
    this.#text = text;
    this.init();
  }

  /**
   * Insert additional signs.
   * @param {string} text
   */
  addInnerHTML(text) {
    this.#innerHTML = text;
    this.render();
  }

  /**
   * Add event for clicking on this component.
   */
  afterRender() {
    this.rootElement.addEventListener('click', (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(LINK_EVENT));
    });
  };

  /**
   * Adds listener for LINK_EVENT;.
   * @param {function(): void} listener
   */
  onClick(listener) {
    this.#submitTarget.addEventListener(LINK_EVENT, () => {
      listener();
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<a href="#" ${this.markElement('link')} title="${this.#text}">${this.#text}${this.#innerHTML ?? ''}</a>`;
  }
}


