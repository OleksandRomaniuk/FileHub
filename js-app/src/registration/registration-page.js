import {Component} from '../components/component.js';
import {RegistrationForm} from './registration-form.js';
import {TitleService} from '../title-service.js';

/**
 * Registration page component.
 */
export class RegistrationPage extends Component {
  #navigateListener;
  #submitListener;
  #registrationData;

  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this.init();
    titleService.title = ['Sign Up'];
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
      this.#registrationData = registrationData;
      this?.#submitListener();
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
            <a href="#" title="TeamDev"><img src="./images/logo.png" alt="TeamDev" width="200" height="37"></a>
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
