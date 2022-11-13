import {Component} from '../components/component.js';
import {ErrorUserMenu} from '../components/error-user-menu.js';
import {LoadingUserMenu} from '../components/loading-user-menu.js';
import {PrimaryUserMenu} from '../components/primary-user-menu.js';
import {UserAction} from '../actions/user-action.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Wrapper component that can represent user menu in different states.
 */
export class UserMenu extends Component {
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
  }

  /**
   * @inheritDoc
   */
  init() {
    this.#stateManagementService.addStateListener('name', () => {
      if (this.#stateManagementService.state.name) {
        this.parentElement.innerHTML = '';
        const userMenu = new PrimaryUserMenu(this.parentElement, this.#stateManagementService.state.name);
        userMenu.onLogOut(() =>{
          this?.#logOutListener();
        });
      }
    });
    this.#stateManagementService.addStateListener('error', () => {
      if (this.#stateManagementService.state.error) {
        this.parentElement.innerHTML = '';
        new ErrorUserMenu(this.parentElement,
            this.#stateManagementService.state.error.getError());
      }
    });
    this.#stateManagementService.addStateListener('isLoading', () => {
      if (this.#stateManagementService.state.isLoading === true) {
        this.parentElement.innerHTML = '';
        new LoadingUserMenu(this.parentElement);
      }
    });
    this.#stateManagementService.dispatch(new UserAction(this.#applicationContext.apiService));
  }

  /**
   * @inheritDoc
   */
  afterRender() {
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
    return ``;
  }
}
