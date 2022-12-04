/**
 * Model that represent meta data about user.
 */
export class UserModel {
  /**
   * @type {string}
   */
  username;

  /**
   * @type {string}
   */
  rootFolderId;

  /**
   * @param {UserModel|object} fileModel
   */
  constructor(fileModel = {}) {
    this.#setOwnProperties(fileModel);
  }

  /**
   * @param {UserModel|object} source
   * @private
   */
  #setOwnProperties(source) {
    const properties = Object.keys(this);
    const entries = Object.entries(source)
        .filter(([key]) => properties.includes(key));
    entries.forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
