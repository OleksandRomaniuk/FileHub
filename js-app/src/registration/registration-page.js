import {Component} from '../components/component.js';
import {RegistrationForm} from './registration-form.js';

/**
 * Implementation of {@link Component} that represent page with {@link RegistrationForm}.
 */
export class RegistrationPage extends Component {
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
    const form = new RegistrationForm(formSlot);
    form.onNavigateToAuthorisation(() => {
      this?.#navigateListener();
    });
  }

  /**
   * Subscribe user for navigate event and forward event to upper level.
   * @param {function} listener
   */
  onNavigateToAuthorisation(listener) {
    this.#navigateListener = listener;
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
