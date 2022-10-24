import {Component} from '../components/component.js';

import {FormControl} from '../components/form-control.js';

import {Form} from '../components/form.js';
import {FormValidationConfig} from '../validation/form-validation-Config.js';
import {validateEmail, validateSize} from '../validation/validation.js';
import {ValidatorService} from '../validation/validator-service.js';
import {Link} from '../components/link.js';

export const EMAIL = 'email';
export const PASSWORD = 'password';
export const NAVIGATE = 'navigate-event';
export const LINK_EVENT = 'link-event';
/**
 * The component for rendering authorization with form controls and button.
 */
export class AuthorizationForm extends Component {
  #inputs = {};
  #submitTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
  }
  /**
   * Add values for form-control and button slots.
   */
  afterRender() {
    const form = new Form(this.rootElement, 'Sign in',
        (slot)=>{
          const link = new Link(slot, 'Don\'t have an account yet?');
          link.onClick(()=>{
            this.#submitTarget.dispatchEvent(new Event(NAVIGATE));
          });
        });
    form.addInput((slot) => {
      this.#inputs.email = new FormControl(slot,
          {
            labelText: 'Email',
            placeholder: 'Email',
            name: 'email',
          });
    });
    form.addInput((slot) => {
      this.#inputs.password = new FormControl(slot,
          {
            labelText: 'Password',
            placeholder: 'Password',
            name: 'password',
          });
    });

    form.onSubmit((formData) => {
      this.validateForm(formData);
    });
  }

  /**
   * @param {function} listener
   */
  onNavigateToRegistration(listener) {
    this.#submitTarget.addEventListener(NAVIGATE, (e)=>{
      listener();
    });
  }

  /**
   * Validates form on correct password and login.
   * @param {FormData} formData
   */
  validateForm(formData) {
    this.saveValue();
    this.#clearError();
    const config =
      new FormValidationConfig
          .Builder()
          .addFields(EMAIL, [validateEmail, validateSize(5)])
          .addFields(PASSWORD, [validateSize(6)])
          .build();
    new ValidatorService()
        .validate(config, formData)
        .catch((result) => {
          result.errors.forEach((error) => {
            const input = this.#inputs[error.name];
            const message = error.message;
            this.#renderError(input, message);
          });
        });
  }

  /**
   * Add event using listener for executing after dispatching.
   * @param {function} listener
   */
  onSubmit(listener) {
    this.#submitTarget.addEventListener(LINK_EVENT, (e)=>{
      listener();
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    return '<slot></slot>';
  }

  /**
   * Clear error messages for all inputs.
   */
  #clearError() {
    Object.entries(this.#inputs).forEach(([name, input])=> {
      input.deleteErrorsMessages();
    });
  }

  /**
   * @param {FormControl} name
   * @param {string} message
   */
  #renderError(name, message) {
    name.errorMessages = message;
  }

  /**
   * Gets values from inputs and put into FormControl.
   */
  saveValue() {
    const formData = new FormData(this.rootElement.firstElementChild);
    Object.entries(this.#inputs).forEach(([name, input])=> {
      input.value = formData.get(name);
    });
  }
}
