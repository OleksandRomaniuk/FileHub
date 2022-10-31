import {Component} from '../components/component.js';
import {AuthorisationForm} from './authorisation-form.js';

/**
 * Implementation of {@link Component} that represent page with {@link AuthorisationForm}.
 */
export class AuthorisationPage extends Component {
  #navigateListener;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
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
   * Subscribe user for navigate event and forward event to upper level.
   * @param {function} listener
   */
  onNavigateToRegistration(listener) {
    this.#navigateListener = listener;
  }

  /**
   * @returns {string} - HTML code for authorisation page.
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
