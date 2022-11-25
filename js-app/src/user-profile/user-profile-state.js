import {Component} from '../components/component.js';
import {StateManagementService} from '../services/state-management-service.js';

/**
 * Wrapper component that can represent user profile in different states.
 */
export class UserProfileState extends Component {
  #stateManagementService;
  #creator;
  #isUserLoading;
  #userError;
  #userProfile;

  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   * @param {Function} userProfileCreator
   */
  constructor(parent, stateManagementService, userProfileCreator) {
    super(parent);
    this.#stateManagementService = stateManagementService;
    this.#creator = userProfileCreator;
    this.init();
  }

  /**
   * @inheritDoc
   */
  init() {
    this.#stateManagementService.addStateListener('userProfile', (state) => {
      if (state.userProfile) {
        this.userProfile = state.userProfile.username;
      }
    });
    this.#stateManagementService.addStateListener('userError', (state) => {
      if (state.userError) {
        this.userError = state.userError;
      }
    });
    this.#stateManagementService.addStateListener('isUserLoading', (state) => {
      if (state.isUserLoading) {
        this.isUserLoading = state.isUserLoading;
      }
    });
    super.init();
  }

  /**
   * @param {boolean} value
   */
  set isUserLoading(value) {
    this.#isUserLoading = value;
    this.render();
  }

  /**
   * @param {string} value
   */
  set userError(value) {
    this.#userError = value;
    this.render();
  }

  /**
   * @param {string} value
   */
  set userProfile(value) {
    this.#userProfile = value;
    this.render();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('user-profile');
    this.#creator(slot, {isUserLoading: this.#isUserLoading,
      userError: this.#userError,
      username: this.#userProfile});
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('user-profile')}`;
  }
}
