import {Component} from '../components/component.js';
import {AuthorizationForm} from './authorization-form.js';

/**
 * The component for generate authorization page.
 */
export class AuthorizationPage extends Component {
  #navigateListener;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
  }

  /**
   * Add values for different inner slots.
   */
  afterRender() {
    const form = new AuthorizationForm( this.getSlot('form'));
    form.onNavigateToRegistration(()=>{
      this?.#navigateListener();
    });
  }

  /**
   * @param {function} listener
   */
  onNavigateToRegistration(listener) {
    this.#navigateListener = listener;
  }

  /**
   * @returns {string} authorization page html as string
   */
  markup() {
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
          ${this.addSlot('form')}
    </main>
</div>
    `;
  }
}
