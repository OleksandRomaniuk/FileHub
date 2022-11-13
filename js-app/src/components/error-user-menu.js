import {Component} from './component.js';

/**
 * User menu in error state.
 */
export class ErrorUserMenu extends Component {
  #errorMessage;

  /**
   * @param {HTMLElement} parent
   * @param {string} errorMessage
   */
  constructor(parent, errorMessage) {
    super(parent);
    this.#errorMessage = errorMessage;
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<div class="logout-container error-logout-container">
            <p class="error-label">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                ${this.#errorMessage}
            </p>
        </div>`;
  }
}
