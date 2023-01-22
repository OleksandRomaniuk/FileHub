/**
 * Provides access to a local storage.
 */
export class Storage {
  /**
   * Add token to the local storage object,
   * or update token's value if it already exists.
   * @param {string} value
   */
  saveToken(value) {
    localStorage.setItem('token', value);
  }

  /**
   * Return user token.
   * @returns {string}
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Remove the user token.
   */
  deleteToken() {
    localStorage.removeItem('token');
  }
}
