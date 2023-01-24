import {Component} from './component';
import {Button} from './button';

const SUBMIT_EVENT = 'submit_event';
/**
 * The component to generate form.
 */
export class Form extends Component {
  #buttonText;
  #inputCreators = [];
  #linkCreator;
  #submitTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   * @param {string} buttonText
   * @param {function(HTMLElement, string, function(HTMLElement):void) :void} linkCreator
   */
  constructor(parent, buttonText, linkCreator ) {
    super(parent);
    this.#buttonText = buttonText;
    this.#linkCreator = linkCreator;
    this.init();
  }

  /**
   * Adds components for form.
   */
  afterRender() {
    const buttonSlot = this.getSlot('button');
    new Button(buttonSlot, this.#buttonText, this.#buttonText);
    const inputsSlot = this.getSlot('inputs');
    this.#inputCreators?.forEach((creator)=>{
      creator(inputsSlot);
    });
    const linkSlot = this.getSlot('link');
    this.#linkCreator?.(linkSlot);

    this.rootElement.addEventListener('submit', (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(SUBMIT_EVENT));
    });
  }

  /**
   * Add input in the form.
   * @param {function(HTMLElement) :void} inputCreator
   */
  addInput(inputCreator) {
    this.#inputCreators.push(inputCreator);
    this.render();
  }

  /**
   * Add listener for submit event.
   * @param {function(FormData) :void} listener
   */
  onSubmit(listener) {
    this.#submitTarget.addEventListener(SUBMIT_EVENT, ()=>{
      const formData = new FormData(this.rootElement);
      listener(formData);
    });
  }
  /**
   * @inheritDoc
   */
  markup() {
    return ` <form ${this.markElement('form')}>
            <div class="fields-wrapper">
                 ${this.addSlot('inputs')} 
            </div>
            <div class="buttons-wrapper">
                 ${this.addSlot('button')}
                 ${this.addSlot('link')}
            </div>
        </form>`;
  }
}


