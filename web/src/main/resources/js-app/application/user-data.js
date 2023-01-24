/**
 * Contains valid data for authorization.
 */
export class UserData {
  #email;
  #password;

  /**
   * @param {string} email
   * @param {string} password
   */
  constructor(email, password) {
    this.#email = email;
    this.#password = password;
  }

  /**
   * @returns {string}
   */
  get email() {
    return this.#email;
  }

  /**
   * @returns {string}
   */
  get password() {
    return this.#password;
  }
}
