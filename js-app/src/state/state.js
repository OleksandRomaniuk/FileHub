import {FileModel} from './file-model.js';
import {UserModel} from './user-model.js';

/**
 * Application state.
 */
export class State {
  /**
   * @type {string}
   */
  userError = '';
  /**
   * @type {UserModel}
   */
  userProfile = null;
  /**
   * @type {boolean}
   */
  isUserLoading = false;

  /**
   * @type {boolean}
   */
  isBreadcrumbLoading = true;

  /**
   * @type {FileModel}
   */
  currentFolder = null;

  /**
   * @type {string}
   */
  breadcrumbError = '';

  /**
   * @type {boolean}
   */
  isFileListLoading = true;

  /**
   * @type {string}
   */
  fileListError = '';

  /**
   * @type {FileModel[]}
   */
  folderContent = null;

  location = '';

  locationMetadata = null;

  /**
   * @param {State|object} state
   */
  constructor(state = {}) {
    this.#setOwnProperties(state);
    this.#deepFreeze(this);
  }

  /**
   * @param {State|object} source
   * @throws {Error}
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

  /**
   * @param {object} object
   * @returns {object}
   * @private
   */
  #deepFreeze(object) {
    Object.getOwnPropertyNames(object).forEach((name) => {
      const value = object[name];

      if (value && typeof value === 'object') {
        this.#deepFreeze(value);
      }
    });
    return Object.freeze(object);
  }
}
