import {Component} from '../components/component.js';
import {AuthorizationPage} from '../authorization/authorization-page.js';
import {RegistrationPage} from '../registration/registration-page.js';
import {ErrorComponent} from '../error/error.js';
import {Router} from './router.js';

/**
 * Creates router for moving on right components.
 */
export class Application extends Component {
  #router;
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    const router = new Router();
    router.defaultPage = (slot) => {
      const page = new AuthorizationPage(slot);
      page.onNavigateToRegistration(() => {
        window.location.hash = '#registration';
      });
    };
    router.errorPage = (slot) =>{
      new ErrorComponent(slot);
    };
    router.addPage('#login', (slot) => {
      const page = new AuthorizationPage(slot);
      page.onNavigateToRegistration(() => {
        window.location.hash = '#registration';
      });
    });
    router.addPage('#registration', (slot) => {
      const page = new RegistrationPage(slot);
      page.onNavigateToLogin(() => {
        window.location.hash = '#login';
      });
    });
    this.#router = router;
    this.init();
  }

  /**
   * Add action when the hash in link changes.
   */
  afterRender() {
    this.#renderPage();
    window.addEventListener('hashchange', ()=>{
      this.#renderPage();
    });
  }

  /**
   * Render page using router.
   */
  #renderPage() {
    const hash = window.location.hash;
    this.rootElement.innerHTML = '';
    this.#router.getPage(hash)(this.rootElement);
  }

  /**
   * @inheritDoc
   * @returns {string}
   */
  markup() {
    return `<slot></slot>`;
  }
}
