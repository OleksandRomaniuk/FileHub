import {Component} from '../components/component.js';
import {ErrorMessage} from '../components/error-message.js';
import {LoadingIcon} from '../components/loading-icon.js';
import {AccountName} from '../components/account-name.js';
import {UserAction} from '../actions/user-action.js';
import {StateManagementService} from '../services/state-management-service.js';

/**
 * Wrapper component that can represent user menu in different states.
 */
export class UserProfile extends Component {
  #stateManagementService;

  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   */
  constructor(parent, stateManagementService) {
    super(parent);
    this.#stateManagementService = stateManagementService;
    this.init();
  }

  /**
   * @inheritDoc
   */
  init() {
    this.#stateManagementService.addStateListener('username', () => {
      if (this.#stateManagementService.state.username) {
        this.parentElement.innerHTML = '';
        new AccountName(this.parentElement, this.#stateManagementService.state.username);
      }
    });
    this.#stateManagementService.addStateListener('userError', () => {
      if (this.#stateManagementService.state.userError) {
        this.parentElement.innerHTML = '';
        new ErrorMessage(this.parentElement,
            this.#stateManagementService.state.userError.getError());
      }
    });
    this.#stateManagementService.addStateListener('isUserLoading', () => {
      if (this.#stateManagementService.state.isUserLoading === true) {
        this.parentElement.innerHTML = '';
        new LoadingIcon(this.parentElement);
      }
    });
    this.#stateManagementService.dispatch(new UserAction());
  }
}
