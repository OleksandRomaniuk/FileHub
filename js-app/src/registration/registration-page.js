import {Component} from '../components/component.js';
import {RegistrationForm} from './registration-form.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Registration page component.
 */
export class RegistrationPage extends Component {
  #navigateListener;
  #submitListener;
  #apiService;

  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent);
    this.init();
    applicationContext.titleService.title = ['Sign Up'];
    this.#apiService = applicationContext.apiService;
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const formSlot = this.getSlot('form');
    const form = new RegistrationForm(formSlot);
    form.onNavigateToAuthorisation(() => {
      this?.#navigateListener();
    });

    form.onSubmit((registrationData) => {
      this.#apiService.register(registrationData)
          .then(() => {
            this?.#submitListener();
          })
          .catch((error) => {
            form.handleServerError(error);
          });
    });
  }

  /**
   * Add listener for 'navigate' event.
   * @param {Function} listener
   */
  onNavigateToAuthorisation(listener) {
    this.#navigateListener = listener;
  }

  /**
   * Subscribe user on success submit event and forward event to upper level.
   * @param {Function} listener
   */
  onSuccessSubmit(listener) {
    this.#submitListener = listener;
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
      <div class="wrapper" data-td="registration-page">
        <header class="page-header">
            <a href="#" title="TeamDev">
                <img src="../../static/images/logo.png" alt="TeamDev" width="200" height="37">\
            </a>
        </header>
        <div class="box">
            <h1>Sign up to FileHub</h1>
            <hr>
            ${this.addSlot('form')}
        </div>
      </div>
    `;
  }
}
