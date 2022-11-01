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
}
