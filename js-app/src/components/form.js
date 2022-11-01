import {Component} from './component.js';
import {Button} from './button.js';

const SUBMIT_EVENT = 'form-submit';

/**
 * Form component.
 */
export class Form extends Component {
  #buttonText;
  #inputCreators = [];
  #footerCreator;
  #submitTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   * @param {string} buttonText
   */
  constructor(parent, buttonText) {
    super(parent);
    this.#buttonText = buttonText;
    this.init();
  }

  /**
   * Adds {@link inputCreator} to {@link this.#inputCreators}.
   * @param {Function} inputCreator
   */
  addInput(inputCreator) {
    this.#inputCreators.push(inputCreator);
    this.render();
  }

  /**
   * Adds html element on the right side of the button.
   * @param {function(HTMLElement)} footerCreator
   */
  addFooter(footerCreator) {
    this.#footerCreator = footerCreator;
    this.render();
  }

  /**
   * Adds event listener on form.
   * @param {function(FormData)} listener
   */
  onSubmit(listener) {
    this.#submitTarget.addEventListener(SUBMIT_EVENT, () => {
      const formData = new FormData(this.rootElement);
      listener(formData);
    });
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const buttonSlot = this.getSlot('button');
    new Button(buttonSlot, this.#buttonText);

    const inputsSlot = this.getSlot('inputs');
    this.#inputCreators?.forEach((creator) => creator(inputsSlot));

    const footerSlot = this.getSlot('footer');
    this.#footerCreator?.(footerSlot);

    this.rootElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(SUBMIT_EVENT));
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
        <form data-td="form">
            <fieldset class="form-container">
                ${this.addSlot('inputs')}
            </fieldset>
            <div class="form-footer">
                ${this.addSlot('button')}
                ${this.addSlot('footer')}
            </div>        
        </form>
        `;
  }
}
