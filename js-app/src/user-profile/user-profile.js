import {Component} from '../components/component.js';
import {ErrorMessage} from '../components/error-message.js';
import {AccountName} from '../components/account-name.js';
import {LoadingIcon} from '../components/loading-icon.js';

/**
 * User profile component.
 */
export class UserProfile extends Component {
  #userProfileCreator;

  /**
   * @typedef UserProfileParams
   * @property {string} username
   * @property {boolean} isUserLoading
   * @property {string} userError
   */

  /**
   * @param {HTMLElement} parent
   * @param {UserProfileParams} params
   */
  constructor(parent, params) {
    super(parent);
    if (params?.userError) {
      this.#showError(params.userError);
    }
    if (params?.isUserLoading) {
      this.#showLoading();
    }
    if (params?.username) {
      this.#showUsername(params.username);
    }
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const userProfileSlot = this.getSlot('user-profile');
    this.#userProfileCreator?.(userProfileSlot);
  }

  /**
   * Shows error in the user profile.
   * @param {string} errorMessage
   */
  #showError(errorMessage) {
    this.#userProfileCreator = (slot) => {
      new ErrorMessage(slot, errorMessage);
    };
  }

  /**
   * Shows username in the user profile.
   * @param {string} userName
   */
  #showUsername(userName) {
    this.#userProfileCreator = (slot) => {
      new AccountName(slot, userName);
    };
  }

  /**
   * Shows loading icon in the user profile.
   */
  #showLoading() {
    this.#userProfileCreator = (slot) => {
      new LoadingIcon(slot);
    };
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('user-profile')}`;
  }
}
