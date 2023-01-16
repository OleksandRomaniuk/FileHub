import {LoadUserAction} from '../../actions/load-user-action';
import {StateAwareComponent} from '../state-aware-component';

/**
 * The component for changing state about user.
 */
export class UserInfoWrapper extends StateAwareComponent {
  #userInfoCreator;
  #userProfile;
  #isUserProfileLoading;
  #isUserProfileError;
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
    this.addStateListener('userProfile', (state) => {
      this.#userProfile = state.userProfile;
      this.render();
    });
    this.addStateListener('isUserProfileLoading', (state) => {
      this.#isUserProfileLoading = state.isUserProfileLoading;
      this.render();
    });
    this.addStateListener('isUserProfileError', (state) => {
      this.#isUserProfileError = state.isUserProfileError;
      this.render();
    });
    this.stateManagementService.dispatch(new LoadUserAction());
  }
  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('user-info');
    if (this.#userInfoCreator) {
      return this.#userInfoCreator(
        slot,
        this.#userProfile,
        this.#isUserProfileLoading,
        this.#isUserProfileError,
      );
    }
  }
  /**
   * @param {function(HTMLElement, object, boolean, boolean): UserInfoWrapper} userInfoCreator
   */
  set userInfoCreator(userInfoCreator) {
    this.#userInfoCreator = userInfoCreator;
    this.render();
  }
  /**
   * @inheritDoc
   */
  markup() {
    return `<slot>${this.addSlot('user-info')}</slot>`;
  }
}
