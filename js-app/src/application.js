import {Component} from './components/component.js';
import {AuthorisationPage} from './authorization/authorisation-page.js';
import {RegistrationPage} from './registration/registration-page.js';
import {NotFoundPage} from './not-found-page/not-found-page.js';
import {Router} from './router/router.js';
import {RouterConfig} from './router/router-config.js';

const REGISTRATION_PATH = 'registration';

const AUTHORISATION_PATH = 'login';

/**
 * An implementation of component that was invented like single point of entry ro FileHub application.
 */
export class Application extends Component {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();

    const routerConfig = RouterConfig.getBuilder()
        .addRouteToHome(AUTHORISATION_PATH)
        .addRouteToNotFound(() => {
          this.rootElement.innerHTML = '';
          const errorPage = new NotFoundPage(this.rootElement);
          errorPage.onNavigateToHome(() => {
            router.redirect(AUTHORISATION_PATH);
          });
        }).addRoute(AUTHORISATION_PATH, () => {
          this.rootElement.innerHTML = '';
          const authorisationPage = new AuthorisationPage(this.rootElement);
          authorisationPage.onNavigateToRegistration(() => {
            router.redirect(REGISTRATION_PATH);
          });
        }).addRoute(REGISTRATION_PATH, () => {
          this.rootElement.innerHTML = '';
          const registrationPage = new RegistrationPage(this.rootElement);
          registrationPage.onNavigateToAuthorisation(() => {
            router.redirect(AUTHORISATION_PATH);
          });
        }).build();

    const router = new Router(routerConfig);
  }

  /**
   * @inheritDoc
   * @returns {string}
   */
  markup() {
    return `<slot></slot>`;
  }
}
