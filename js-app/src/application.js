import {Component} from './components/component.js';
import {AuthorisationPage} from './authorization/authorisation-page.js';
import {RegistrationPage} from './registration/registration-page.js';
import {Router} from './router/router.js';
import {RouterConfig} from './router/router-config.js';
import {NotFoundPage} from './components/not-found-page/not-found-page.js';
import {TitleService} from './title-service.js';

const REGISTRATION_PATH = 'registration';

const AUTHORISATION_PATH = 'login';

/**
 * Single point of entry to FileHub application.
 */
export class Application extends Component {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();

    const titleService = new TitleService('FileHub', '-');

    const routerConfig = RouterConfig.getBuilder()
        .addRouteToHome(AUTHORISATION_PATH)
        .addRouteToNotFound(() => {
          this.rootElement.innerHTML = '';
          const errorPage = new NotFoundPage(this.rootElement, titleService);
          errorPage.onNavigateToHome(() => {
            router.redirect(AUTHORISATION_PATH);
          });
        }).addRoute(AUTHORISATION_PATH, () => {
          this.rootElement.innerHTML = '';
          const authorisationPage = new AuthorisationPage(this.rootElement, titleService);
          authorisationPage.onNavigateToRegistration(() => {
            router.redirect(REGISTRATION_PATH);
          });
        }).addRoute(REGISTRATION_PATH, () => {
          this.rootElement.innerHTML = '';
          const registrationPage = new RegistrationPage(this.rootElement, titleService);
          registrationPage.onNavigateToAuthorisation(() => {
            router.redirect(AUTHORISATION_PATH);
          });
        }).build();

    const router = new Router(routerConfig);
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<slot></slot>`;
  }
}
