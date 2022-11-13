/**
 * Invented to store data about user authorisation or registration.
 */
export class AuthorisationData {
  #loginName;
  #password;

  /**
   * @param {string} loginName
   * @param {string} password
   */
  constructor(loginName, password) {
    this.#loginName = loginName;
    this.#password = password;
  }

  /**
   * @returns {string}
   */
  get loginName() {
    return this.#loginName;
  }

  /**
   * @returns {string}
   */
  get password() {
    return this.#password;
  }
}
