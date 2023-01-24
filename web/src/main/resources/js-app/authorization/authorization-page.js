import {Component} from '../components/component';
import {AuthorizationForm} from './authorization-form';
import {inject} from '../application/registry';

const SUBMIT_EVENT = 'submitted';

/**
 * The component to generate authorization page.
 */
export class AuthorizationPage extends Component {
  #navigateListener;
  #successAuthorization;
  #serverError;
  #submitTarget = new EventTarget();
  @inject titleService;
  @inject apiService;


  /**
   * @param {HTMLElement} parent
   */
  constructor(parent ) {
    super(parent);
    this.init();
    this.titleService.setTitle(['Sign in']);
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const form = new AuthorizationForm( this.getSlot('form'));
    form.onNavigateToRegistration(()=>{
      this?.#navigateListener();
    });
    form.onSubmitted((userData)=>{
      this.#serverError = null;
      this.apiService.logIn(userData)
        .then(()=>{
          this?.#successAuthorization();
        })
        .catch((error)=>{
          this.serverError = error.error;
        });
    });
  }

  /**
   * Set listener for redirect to registration page.
   * @param {Function} listener
   */
  onNavigateToRegistration(listener) {
    this.#navigateListener = listener;
  }
  /**
   * Set listener for redirect to table page.
   * @param {Function} listener
   */
  onSubmit(listener) {
    this.#submitTarget.addEventListener(SUBMIT_EVENT, (userData)=>listener(userData));
    this.#successAuthorization = listener;
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
             <a href="#">
                <img src="images/logo.png" class="logo" alt="TeamDev" height="37" width="200">
              </a>
        </header>
    
    <main class="box">
        <h1>Sign in to FileHub</h1>
        <hr class="hr">
        ${serverError ?? ''}
          ${this.addSlot('form')}
    </main>
</div>
    `;
  }
}
