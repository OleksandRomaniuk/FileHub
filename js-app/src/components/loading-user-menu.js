import {Component} from './component.js';

/**
 * User menu in loading state.
 */
export class LoadingUserMenu extends Component {
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
  markup() {
    return `<ul class="menu-content">
                <li>
                    <span class="glyphicon glyphicon-loader" aria-hidden="true"></span>
                </li>
                <li>
                    <a href="#">Log Out <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></a>
                </li>
            </ul>`;
  }
}
