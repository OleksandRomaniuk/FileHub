import {Component} from '../components/component';
import {FormControl} from '../components/form-control';
import {validateEmail, validatePasswordEquality, validateSize} from '../validation/validators';
import {ValidatorService} from '../validation/validator-service';
import {Form} from '../components/form';
import {FormValidationConfig} from '../validation/validation-config';
import {Link} from '../components/link.js';
import {UserData} from '../application/user-data';


export const EMAIL = 'email';
export const PASSWORD = 'password';
export const CONFIRM_PASSWORD = 'confirm-password';
export const NAVIGATE = 'navigate-event';
export const FORM_EVENT = 'form-event';
/**
 * The component for rendering registration form controls and button.
 */
export class RegistrationForm extends Component {
  #inputs = {};
  #submitTarget = new EventTarget();

  #email ='';
  #password ='';
  #confirm_password ='';
  #inputErrors = {
    [EMAIL]: [],
    [PASSWORD]: [],
    [CONFIRM_PASSWORD]: [],
  };


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
    const form = new Form(this.rootElement, 'Sign up',
      (slot)=>{
        const link = new Link(slot, 'Already have an account?');
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
          value: this.#email,
          errorMessages: this.#inputErrors[EMAIL],
        });
    });
    form.addInput((slot) => {
      this.#inputs.password = new FormControl(slot,
        {
          labelText: 'Password',
          placeholder: 'Password',
          name: 'password',
          value: this.#password,
          type: 'password',
          errorMessages: this.#inputErrors[PASSWORD],
        });
    });
    form.addInput((slot) => {
      this.#inputs['confirm-password'] = new FormControl(slot,
        {
          labelText: 'Confirm password',
          placeholder: 'Confirm-password',
          name: 'confirm-password',
          value: this.#confirm_password,
          type: 'password',
          errorMessages: this.#inputErrors[CONFIRM_PASSWORD],
        });
    });
    form.onSubmit((formData) => {
      this.#email = formData.get('email');
      this.#password = formData.get('password');
      this.#confirm_password = formData.get('confirm-password');
      this.validateForm(formData)
        .then( () => {
          const event = new CustomEvent(FORM_EVENT, {detail: new UserData(this.#email, this.#password)});
          this.#submitTarget.dispatchEvent(event);
        }).catch(()=>{});
    });
  }

  /**
   * @param {object} inputErrors
   */
  set inputErrors(inputErrors) {
    this.#inputErrors = inputErrors;
    this.render();
  }


  /**
   * Add listener for redirect to login page.
   * @param {function() :void} listener
   */
  onNavigateToLogin(listener) {
    this.#submitTarget.addEventListener(NAVIGATE, ()=>{
      listener();
    });
  }
  /**
   * Validates form on correct password and login.
   * @param {FormData} formData
   * @returns {Promise<undefined>}
   */
  validateForm(formData) {
    this.inputErrors = {
      [EMAIL]: [],
      [PASSWORD]: [],
      [CONFIRM_PASSWORD]: [],
    };
    const config =
        FormValidationConfig
          .getBuilder()
          .addField(EMAIL, [validateEmail, validateSize(5)])
          .addField(PASSWORD, [validateSize(6)])
          .addField(CONFIRM_PASSWORD, [validatePasswordEquality(formData.get(PASSWORD))])
          .build();
    return new ValidatorService()
      .validate(config, formData)
      .catch((result) => {
        const validationErrorsByField = result.errors.reduce((hash, error)=>{
          const key = error.name;
          const prevErrors = hash[key] || [];
          hash[key] = [...prevErrors, error.message];
          return hash;
        }, {});
        this.inputErrors = validationErrorsByField;
      });
  }
  /**
   * Add event listener when values in form are valid.
   * @param {function() :void} listener
   */
  onSubmitted(listener) {
    this.#submitTarget.addEventListener(FORM_EVENT, (data) => {
      listener(data.detail);
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    return '<slot></slot>';
  }
}

