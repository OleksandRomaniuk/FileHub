import {Component} from '../components/component.js';
import {AuthorisationForm} from './authorisation-form.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Authorisation page component.
 */
export class AuthorisationPage extends Component {
  #navigateListener;
  #submitListener;
  #authorisationData;
  #apiService;

  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent);
    this.init();
    this.#apiService = applicationContext.apiService;
    applicationContext.titleService.title = ['Sign In'];
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const formSlot = this.getSlot('form');
    const form = new AuthorisationForm(formSlot);
    form.onNavigateToRegistration(() => {
      this?.#navigateListener();
    });

    form.onSubmit((authorisationData) => {
      this.#apiService.logIn(authorisationData)
          .then(() => {
            this.#authorisationData = authorisationData;
            this?.#submitListener();
          })
          .catch((error) => {
            form.serverError = error.getError();
          });
    });
  }

  /**
   * Adds listener for 'navigate' event.
   * @param {Function} listener
   */
  onNavigateToRegistration(listener) {
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
      <div class="wrapper" data-td="authorisation-page">
        <header class="page-header">
            <a href="#" title="TeamDev">
                <img src="../../static/images/logo.png" alt="TeamDev" width="200" height="37">
            </a>
        </header>
        <div class="box">
            <h1>Sign in to FileHub</h1>
            <hr>
            ${this.addSlot('form')}
        </div>
      </div>
    `;
  }
}
