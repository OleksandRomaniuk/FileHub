import {Component} from '../components/component';
import {RegistrationForm} from './registration-form';
import {GeneralServerError} from '../service/errors/general-server-error';
import {inject} from '../application/registry';

const SUBMIT_EVENT = 'submitted';

/**
 * The component for generate registration page.
 */
export class RegistrationPage extends Component {
  #navigateListener;
  #successRegistration;
  @inject apiService;
  @inject titleService;
  #serverError;
  #submitTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent ) {
    super(parent);
    this.init();
    this.titleService.setTitle(['Sign in']);
  }

  /**
   * Fills fields for different inner slots.
   */
  afterRender() {
    const form = new RegistrationForm(this.getSlot('form'));
    form.onNavigateToLogin(()=>{
      this?.#navigateListener();
    });
    form.onSubmitted((userData)=>{
      this.#serverError = null;
      this.apiService.register(userData)
        .then(()=>{
          this?.#successRegistration();
        })
        .catch((error)=>{
          if ( error instanceof GeneralServerError) {
            this.serverError = error.error;
          } else {
            form.inputErrors = error.error;
          }
        });
    });
  }

  /**
   * Add listener for redirect on login page.
   * @param {Function} listener
   */
  onNavigateToLogin(listener) {
    this.#navigateListener = listener;
  }
  /**
   * Set listener for redirect to table page.
   * @param {Function} listener
   */
  onSubmit(listener) {
    this.#submitTarget.addEventListener(SUBMIT_EVENT, (userData)=>listener(userData));

    this.#successRegistration = listener;
  }
  /**
   * @param {string} error
   */
  set serverError(error) {
    this.#serverError = error;
    this.render();
  }
  /**
   * @inheritDoc
   */
  markup() {
    const serverError = this.#serverError ? `<p class="error-text">${this.#serverError}</p>` : null;
    return `
<div class="wrapper">
    <header class="page-header">
        <a href="https://jobs.dou.ua/companies/teamdev/">
            <img src="images/logo.png" class="logo" alt="TeamDev" height="37" width="200">
        </a>
    </header>

    <main class="box">
        <h1>Sign up to FileHub</h1>
        <hr class="hr">
        ${serverError ?? ''}
       ${this.addSlot('form')}
    </main>
</div>
    `;
  }
}
