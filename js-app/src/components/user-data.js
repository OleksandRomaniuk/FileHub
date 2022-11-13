import {Component} from './component.js';

export class UserData extends Component {
  #userName;

  /**
   * @param {HTMLElement} parent
   * @param {string} userName
   */
  constructor(parent, userName) {
    super(parent);
    this.#userName = userName;
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `
        <ul class="menu-content" data-td="user-data">
            <li>
                <span class="glyphicon glyphicon-user acc-container" aria-hidden="true">
                <label class="user-icon">${this.#userName}</label>
                </span>
            </li>
            <li>
                <a href="#">Log Out <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></a>
            </li>
        </ul>`;
  }
}
