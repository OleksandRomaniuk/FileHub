import {Component} from '../components/component.js';

import {FormControl} from '../components/form-control.js';

import {Form} from '../components/form.js';
import {FormValidationConfig} from '../validation/form-validation-Config.js';
import {validateEmail, validateSize} from '../validation/validation.js';
import {ValidatorService} from '../validation/validator-service.js';

export const EMAIL = 'email';
export const PASSWORD = 'password';
/**
 * The component for rendering authorization with form controls and button.
 */
export class AuthorizationForm extends Component {
  /**
   * Add values for form-control and button slots.
   */
  afterRender() {
    this._inputs = {};
    const form = new Form(this.rootElement);
    form.buttonText = 'Sign in';
    form.addInput((slot) => {
      const emailFormControl = new FormControl(slot);
      emailFormControl.labelText = 'Email';
      emailFormControl.placeholder = 'Email';
      emailFormControl.name = 'email';
      this._inputs.email = emailFormControl;
    });
    form.addInput((slot) => {
      const passwordFormControl = new FormControl(slot);
      passwordFormControl.labelText = 'Password';
      passwordFormControl.placeholder = 'Password';
      passwordFormControl.name = 'password';
      this._inputs.password = passwordFormControl;
    });

    form.onSubmit((formData) => {
      this.validateForm(formData);
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
            const input = this._inputs[error.name];
            const message = error.message;
            this.#renderError(input, message);
          });
        });
  }

  /**
   * @returns {string} - form html for authorization as string
   */
  markup() {
    return '<slot></slot>';
  }

  /**
   * Clear error messages for all inputs.
   */
  #clearError() {
    Object.entries(this._inputs).forEach(([name, input])=> {
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
    Object.entries(this._inputs).forEach(([name, input])=> {
      input.value = formData.get(name);
    });
  }
}
