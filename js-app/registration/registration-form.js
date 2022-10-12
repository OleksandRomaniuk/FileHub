import {Component} from '../components/component.js';
import {FormControl} from '../components/form-control.js';
import {validateEmail, validatePasswordEquality, validateSize} from '../validation/validation.js';
import {ValidatorService} from '../validation/validator-service.js';
import {Form} from '../components/form.js';
import {FormValidationConfig} from '../validation/form-validation-Config.js';


export const EMAIL = 'email';
export const PASSWORD = 'password';
export const CONFIRM_PASSWORD = 'confirm-password';
/**
 * The component for rendering registration form controls and button.
 */
export class RegistrationForm extends Component {
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
    form.addInput((slot) => {
      const confirmPasswordFormControl = new FormControl(slot);
      confirmPasswordFormControl.labelText = 'Confirm password';
      confirmPasswordFormControl.placeholder = 'Confirm-password';
      confirmPasswordFormControl.name = 'confirm-password';
      this._inputs['confirm-password'] = confirmPasswordFormControl;
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
          .addFields(CONFIRM_PASSWORD, [validatePasswordEquality(formData.get(PASSWORD))])
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
   * @returns {string}
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

