import {Component} from './component';

/**
 * The component for generate user info in main page.
 */
export class UserInfo extends Component {
  #isLoading = true;
  #isError;
  #userProfile;

  /**
   * @param {HTMLElement} parent
   * @param {object} userProfile
   * @param {boolean} isLoading
   * @param {boolean} isError
   */
  constructor(parent, userProfile, isLoading, isError) {
    super(parent);
    this.#isLoading = isLoading;
    this.#isError = isError;
    this.#userProfile = userProfile;
    this.init();
  }

  /**
   * @param {boolean} isLoading
   */
  set isLoading(isLoading) {
    this.#isLoading = isLoading;
    this.init();
  }
  /**
   * @param {boolean} isError
   */
  set isError(isError) {
    this.#isError = isError;
    this.init();
  }
  /**
   * @param {object} userProfile
   */
  set userProfile(userProfile) {
    this.#userProfile = userProfile;
    this.init();
  }


  /**
   * @inheritDoc
   */
  markup() {
    let innerText;
    if (this.#isLoading) {
      innerText = `<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>`;
    } else if (this.#isError) {
      innerText = `<span class="error-text">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                   Can't load user data
                </span>`;
    } else if (this.#userProfile) {
      innerText = `<span class="glyphicon glyphicon-user user" aria-hidden="true"></span>
                    <span class="glyphicon-class user">
                        ${this.#userProfile.username}
                    </span>`;
    }
    return `<slot>${innerText}</slot>`;
  }
}
