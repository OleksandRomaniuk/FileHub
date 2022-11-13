import {Component} from '../components/component.js';
import {TitleService} from '../services/title-service.js';
import {UserData} from '../components/user-data.js';

/**
 * Implementation of {@link Component} that represent page with user files.
 */
export class FilePage extends Component {
  #userName;

  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this.init();
    titleService.title = ['Files'];
  }

  afterRender() {
    const userSlot = this.getSlot('user-data');
    new UserData(userSlot, this.#userName);
  }

  /**
   * HTML with functionality inserts for page with file table.
   * @returns {string}
   */
  markup() {
    return `<div class="wrapper table-wrapper" data-td="files-page">
        <header class="page-header">
        <a class="logo" href="registration.html">
            <img src="../../static/images/logo.png" alt="TeamDev" width="200" height="37">
        </a>
        <div class="user-menu">
            ${this.addSlot('user-data')}
            <ul class="menu-content">
            </ul>
        </div>
    </header>
      </div>`;
  }
}
