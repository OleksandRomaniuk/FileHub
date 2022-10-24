import {Component} from '../components/component.js';
import {AuthorizationPage} from '../authorization/authorization-page.js';
import {RegistrationPage} from '../registration/registration-page.js';
import {ErrorComponent} from '../error/error.js';
import {HashRouter} from './hashRouter.js';
import {TitleService} from '../servise/title-service.js';

/**
 * Creates router for moving on right components.
 */
export class Application extends Component {
  #titleService;

  /**
     * @param {HTMLElement} parent
     */
  constructor(parent) {
    super(parent);
    this.init();
    this.#titleService = new TitleService('FileHub');
    HashRouter.getBuilder()
        .addPage('#login', () => {
          this.rootElement.innerHTML = '';
          const page = new AuthorizationPage(this.rootElement, this.#titleService);
          page.onNavigateToRegistration(() => {
            HashRouter.redirect('#registration');
          });
        })
        .addPage('#registration', () => {
          this.rootElement.innerHTML = '';
          const page = new RegistrationPage(this.rootElement, this.#titleService);
          page.onNavigateToLogin(() => {
            HashRouter.redirect('#login');
          });
        })
        .setDefaultPage('#registration')
        .setErrorPageCreator(() => {
          this.rootElement.innerHTML = '';
          new ErrorComponent(this.rootElement);
        }).build();
  }

  /**
     * @inheritDoc
     * @returns {string}
     */
  markup() {
    return `<slot></slot>`;
  }
}
