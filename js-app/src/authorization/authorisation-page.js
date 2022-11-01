import {Component} from '../components/component.js';
import {AuthorisationForm} from './authorisation-form.js';
import {TitleService} from '../title-service.js';

/**
 * Authorisation page component.
 */
export class AuthorisationPage extends Component {
  #navigateListener;

  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this.init();
    titleService.title = ['Sign In'];
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
  }

  /**
   * Adds listener for 'navigate' event.
   * @param {Function} listener
   */
  onNavigateToRegistration(listener) {
    this.#navigateListener = listener;
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
      <div class="wrapper" data-td="authorisation-page">
        <header class="page-header">
            <a href="#" title="TeamDev"><img src="./images/logo.png" alt="TeamDev" width="200" height="37"></a>
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
