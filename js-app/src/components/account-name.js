import {Component} from './component.js';

/**
 * User menu with username.
 */
export class AccountName extends Component {
  #userName;

  /**
   * @param {HTMLElement} parent
   * @param {string} username
   */
  constructor(parent, username) {
    super(parent);
    this.#userName = username;
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<span class="glyphicon glyphicon-user acc-container" aria-hidden="true">
                    <label class="user-icon">${this.#userName}</label>
                </span>`;
  }
}
