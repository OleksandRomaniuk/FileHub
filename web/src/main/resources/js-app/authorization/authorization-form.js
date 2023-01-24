import {Component} from '../components/component';
import {FormControl} from '../components/form-control';
import {Form} from '../components/form';
import {FormValidationConfig} from '../validation/validation-config';
import {validateEmail, validateSize} from '../validation/validators';
import {ValidatorService} from '../validation/validator-service';
import {Link} from '../components/link';
import {UserData} from '../application/user-data';

export const EMAIL = 'email';
export const PASSWORD = 'password';
export const NAVIGATE = 'navigate-event';
export const FORM_EVENT = 'form-event';
/**
 * The component to rendering authorization with form controls and button.
 */
export class AuthorizationForm extends Component {
  #inputs = {};
  #submitTarget = new EventTarget();

  #email ='';
  #password ='';
  #validationErrors = {
    [EMAIL]: [],
    [PASSWORD]: [],
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
          value: this.#email,
          errorMessages: this.#validationErrors[EMAIL],
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
          errorMessages: this.#validationErrors[PASSWORD],
        });
    });

    form.onSubmit((formData) => {
      this.#email = formData.get('email');
      this.#password = formData.get('password');
      this.validateForm(formData)
        .then( () => {
          const event = new CustomEvent(FORM_EVENT, {detail: new UserData(this.#email, this.#password)});
          this.#submitTarget.dispatchEvent(event);
        }).catch(()=>{});
    });
  }

  /**
   * @param {object} validationErrors
   */
  set validationErrors(validationErrors) {
    this.#validationErrors = validationErrors;
    this.render();
  }

  /**
   * Add listener for redirect to registration page.
   * @param {Function} listener
   */
  onNavigateToRegistration(listener) {
    this.#submitTarget.addEventListener(NAVIGATE, ()=>{
      listener();
    });
  }

  /**
   * Validates form on correct password and login.
   * @param {FormData} formData
   * @returns {Promise}
   */
  validateForm(formData) {
    this.validationErrors = {
      [EMAIL]: [],
      [PASSWORD]: [],
    };
    const config =
      FormValidationConfig
        .getBuilder()
        .addField(EMAIL, [validateEmail, validateSize(5)])
        .addField(PASSWORD, [validateSize(6)])
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
        this.validationErrors = validationErrorsByField;
        return Promise.reject(new Error());
      });
  }

  /**
   * Add event using listener for executing after dispatching.
   * @param {Function} listener
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
