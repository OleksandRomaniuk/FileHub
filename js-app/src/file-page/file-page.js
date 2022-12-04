import {Component} from '../components/component.js';
import {UserProfile} from '../user-menu/user-profile.js';
import {Link} from '../components/link.js';
import {StateManagementService} from '../services/state-management-service.js';
import {TitleService} from '../services/title-service.js';

/**
 * Implementation of {@link Component} that represent page with user files.
 */
export class FilePage extends Component {
  #stateManagementService;
  #logOutListener;

  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   * @param {TitleService} titleService
   */
  constructor(parent, stateManagementService, titleService) {
    super(parent);
    this.#stateManagementService = stateManagementService;
    this.init();
    titleService.title = ['Files'];
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const userSlot = this.getSlot('user-data');
    new UserProfile(userSlot, this.#stateManagementService);
    const logOutLinkSlot = this.getSlot('log-out-link');
    const logOutLink = new Link(logOutLinkSlot, 'Log Out');
    logOutLink.iconClass = 'glyphicon-log-out';
    logOutLink.onClick(() => {
      this.#logOutListener();
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
            <ul class="menu-content">
                <li>
                    ${this.addSlot('user-data')}
                </li>
                <li>
                    ${this.addSlot('log-out-link')}
                </li>
            </ul>
        </div>
    </header>
      </div>`;
  }
}
