import {Component} from '../components/component.js';
import {UserMenu} from '../user-menu/user-menu.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Implementation of {@link Component} that represent page with user files.
 */
export class FilePage extends Component {
  #stateManagementService;
  #applicationContext;
  #logOutListener;

  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent);
    this.#stateManagementService = applicationContext.stateManagementService;
    this.#applicationContext = applicationContext;
    this.init();
    applicationContext.titleService.title = ['Files'];
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const userSlot = this.getSlot('user-data');
    const userMenu = new UserMenu(userSlot, this.#applicationContext);
    userMenu.onLogOut(() =>{
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
        </div>
    </header>
      </div>`;
  }
}
