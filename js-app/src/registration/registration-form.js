import {Component} from '../components/component.js';
import {FormControl} from '../components/form-control.js';
import {Form} from '../components/form.js';
import {FormValidationConfig} from '../validation/form-validation-config.js';
import {validateValueEquals, validateValueLength, validateValueWithRegex} from '../validation/validators.js';
import {ValidatorService} from '../validation/validator-service.js';
import {Link} from '../components/link.js';

const EMAIL_NAME = 'email';

const PASSWORD_NAME = 'password';

const CONFIRM_PASSWORD_NAME = 'confirmPassword';

const EMAIL_REGEX = /^[a-z\d+.\-_@]+$/;

const NAVIGATE_EVENT = 'navigate';

/**
 * Implementation of {@link Component} that represent registration form.
 */
export class RegistrationForm extends Component {
  #inputs = {};
  #eventTarget = new EventTarget();
  #email = '';
  #password = '';
  #confirmPassword = '';

  /**
   * @typedef ValidationErrors
   * @type {{'[EMAIL_NAME]': [string], '[PASSWORD_NAME]': [string], '[CONFIRM_PASSWORD_NAME]': [string]}}
   */
  #validationErrors = {
    [EMAIL_NAME]: [],
    [PASSWORD_NAME]: [],
    [CONFIRM_PASSWORD_NAME]: [],
  };

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const form = new Form(this.rootElement, 'Sign In');

    form.addInput((slot) => {
      this.#inputs[EMAIL_NAME] = new FormControl(slot, {
        label: 'Email',
        type: 'text',
        placeholder: 'Email',
        name: EMAIL_NAME,
        value: this.#email,
        errorMessages: this.#validationErrors[EMAIL_NAME],
      });
    });

    form.addInput((slot) => {
      this.#inputs[PASSWORD_NAME] = new FormControl(slot, {
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
        name: PASSWORD_NAME,
        value: this.#password,
        errorMessages: this.#validationErrors[PASSWORD_NAME],
      });
    });

    form.addInput((slot) => {
      this.#inputs[CONFIRM_PASSWORD_NAME] = new FormControl(slot, {
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm Password',
        name: CONFIRM_PASSWORD_NAME,
        value: this.#confirmPassword,
        errorMessages: this.#validationErrors[CONFIRM_PASSWORD_NAME],
      });
    });

    form.addFooter((slot) => {
      const link = new Link(slot, 'Already have an account?');

      link.onClick(() => {
        this.#eventTarget.dispatchEvent(new Event(NAVIGATE_EVENT));
      });
    });

    form.onSubmit((formData) => {
      this.#validateForm(formData);
      this.#email = formData.get(EMAIL_NAME);
      this.#password = formData.get(PASSWORD_NAME);
      this.#confirmPassword = formData.get(CONFIRM_PASSWORD_NAME);
      this.render();
    });
  }

  /**
   * Subscribe user for navigate event and forward event to upper level.
   * @param {function} listener
   */
  onNavigateToAuthorisation(listener) {
    this.#eventTarget.addEventListener(NAVIGATE_EVENT, () => {
      listener();
    });
  }

  /**
   * @param {FormData} formData
   */
  #validateForm(formData) {
    this.#setValidationErrors([]);

    const config = FormValidationConfig.getBuilder()
        .addField(EMAIL_NAME, [validateValueLength(5), validateValueWithRegex(EMAIL_REGEX)])
        .addField(PASSWORD_NAME, [validateValueLength(6)])
        .addField(CONFIRM_PASSWORD_NAME, [validateValueLength(6),
          validateValueEquals(formData.get(PASSWORD_NAME))])
        .build();

    ValidatorService.validate(formData, config)
        .catch((result) => {
          const errors = result.errors.reduce((hash, error) => {
            const prevErrors = hash[error.fieldName] || [];
            hash[error.fieldName] = [...prevErrors, error.message];
            return hash;
          }, {});

          this.#setValidationErrors(errors);
        });
  }

  /**
   * @param {ValidationErrors} errors
   */
  #setValidationErrors(errors) {
    this.#validationErrors = errors;
    this.render();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
      ${this.addSlot('form')}
    `;
  }
}
