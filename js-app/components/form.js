import {Component} from './component.js';
import {Button} from './button.js';

const SUBMIT_EVENT = 'submit_event';
/**
 * The component for generate form.
 */
export class Form extends Component {
  _buttonText;
  _inputCreators = [];
  _submitTarget = new EventTarget();


  /**
   * @param {string} text
   */
  set buttonText(text) {
    this._buttonText = text;
    this.render();
  }

  /**
   * Adds components for form.
   */
  afterRender() {
    const buttonSlot = this.getSlot('button');
    const button = new Button(buttonSlot);
    button.title = this._buttonText;
    const inputsSlot = this.getSlot('inputs');
    this._inputCreators?.forEach((creator)=>{
      creator(inputsSlot);
    });
    this.rootElement.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitTarget.dispatchEvent(new Event(SUBMIT_EVENT));
    });
  }

  /**
   * @param {function()} inputCreator
   */
  addInput(inputCreator) {
    this._inputCreators.push(inputCreator);
    this.render();
  }

  /**
   *
   * @param {function(FormData)} listener
   */
  onSubmit(listener) {
    this._submitTarget.addEventListener(SUBMIT_EVENT, (e)=>{
      const formData = new FormData(this.rootElement);
      listener(formData);
    });
  }

  /**
   *
   * @returns {string} form html as string
   */
  markup() {
    return ` <form>
            <div class="fields-wrapper">
                 ${this.addSlot('inputs')} 
            </div>
            <div class="buttons-wrapper">
                 ${this.addSlot('button')}
                <a href="registration.html" title="Don't have an account yet?">
                    Don't have an account yet?
                </a>
            </div>
        </form>`;
  }
}


