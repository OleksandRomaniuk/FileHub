import {Component} from '../components/component.js';
import {RegistrationForm} from './registration-form.js';

/**
 * The component for generate registration page.
 */
export class RegistrationPage extends Component {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
  }
  /**
   * Fills fields for different inner slots.
   */
  afterRender() {
    const formSlot = this.getSlot('form');
    new RegistrationForm(formSlot);
  }

  /**
   * @returns {string} registration page html as string
   */
  markup() {
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
       ${this.addSlot('form')}
    </main>
</div>
    `;
  }
}
