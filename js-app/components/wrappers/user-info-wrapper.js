import {LoadUserAction} from '../../actions/load-user-action';
import {UserInfo} from '../user-info';
import {ApplicationContext} from '../../application/application-context';
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
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent, applicationContext.stateManagementService);
    this.isUserProfileLoading = this.stateManagementService.state.isUserProfileLoading;
    this.init();
    this.addStateListener('userProfile', (state) => {
      this.userProfile = state.userProfile;
    });
    this.addStateListener('isUserProfileLoading', (state) => {
      this.isUserProfileLoading = state.isUserProfileLoading;
    });
    this.addStateListener('isUserProfileError', (state) => {
      this.isUserProfileError = state.isUserProfileError;
    });
    this.stateManagementService.dispatch(new LoadUserAction(applicationContext));
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
   * @param {function(HTMLElement, object, boolean, boolean) :UserInfo} userInfoCreator
   */
  set userInfoCreator(userInfoCreator) {
    this.#userInfoCreator = userInfoCreator;
    this.render();
  }
  /**
   * @param {object} userProfile
   */
  set userProfile(userProfile) {
    this.#userProfile = userProfile;
    this.render();
  }
  /**
   * @param {boolean} isUserProfileLoading
   */
  set isUserProfileLoading(isUserProfileLoading) {
    this.#isUserProfileLoading = isUserProfileLoading;
    this.render();
  }
  /**
   * @param {boolean} isUserProfileError
   */
  set isUserProfileError(isUserProfileError) {
    this.#isUserProfileError = isUserProfileError;
    this.render();
  }
  /**
   * @inheritDoc
   */
  markup() {
    return `<slot>${this.addSlot('user-info')}</slot>`;
  }
}
