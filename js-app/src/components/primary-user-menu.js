import {Component} from './component.js';
import {Link} from './link.js';

/**
 * User menu with username.
 */
export class PrimaryUserMenu extends Component {
  #userName;
  #logOutListener;

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
  afterRender() {
    const linkSlot = this.getSlot('link');
    const link = new Link(linkSlot,
        `Log Out`);

    link.onClick(() => {
      this?.#logOutListener();
    });
  }

  /**
   * Adds listener for 'log out' event.
   * @param {Function} listener
   */
  onLogOut(listener) {
    this.#logOutListener = listener;
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
            <ul class="menu-content">
              <li>  
                <span class="glyphicon glyphicon-user acc-container" aria-hidden="true">
                    <label class="user-icon">${this.#userName}</label>
                </span>
              </li>
              <li>
                  ${this.addSlot('link')}

              </li>
            </ul>`;
  }
}
