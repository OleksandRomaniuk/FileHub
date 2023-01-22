/**
 * States for the StateManagement.
 */
export class State {
  /**
   * @type {object}
   */
  userProfile: object | null;
  /**
   * @type {boolean}
   */
  isUserProfileError: boolean;
  /**
   * @type {boolean}
   */
  isUserProfileLoading = true;
  /**
   * @type {boolean}
   */
  isFolderInfoLoading = true;
  /**
   * @type {boolean}
   */
  isFolderInfoError: boolean;
  /**
   * @type {object}
   */
  folderInfo: object | null;
  /**
   * @type {boolean}
   */
  isFolderContentLoading = true;
  /**
   * @type {boolean}
   */
  isFolderContentError: boolean;
  /**
   * @type {object}
   */
  folderContent:object | null;
  /**
   * @type {object}
   */
  locationMetaData:object | null;
  /**
   * @type {object}
   */
  itemInRemovingState:object | null;
  /**
   * @type {boolean}
   */
  itemBeingDeleted: boolean;
  /**
   * @type {string}
   */
  removingError: string | null;
  /**
   * @type {object}
   */
  uploadingFiles: object | null;
  /**
   * @type {object}
   */
  fileUploadError:object | null;
  /**
   * @type {object}
   */
  itemInRenamingState:object | null;
  /**
   * @type {boolean}
   */
  isRenamingInProgress: boolean | null;
  /**
   * @type {object}
   */
  renamingError: object | null;
  /**
   * @type {object}
   */
  newFolder: object | null;
  /**
   * @type {boolean}
   */
  isCreatingFolderInProgress: boolean | null;
  /**
   * @type {object}
   */
  creatingFolderError: object | null;
  /**
   * @type {object}
   */
  itemInDownloadState: object | null;

  /**
   * @type {object}
   */
  downloadError: object | null;
  /**
   * @param {object} state
   */
  constructor(state:State | object = {}) {
    this.#setOwnProperties(state);
    this.#deepFreeze(this);
  }

  /**
   * @param {State | object} source
   * @private
   */
  #setOwnProperties(source: State| object) {
    const properties = Object.keys(this);
    const entries = Object.entries(source)
      .filter(([key])=>properties.includes(key));
    entries.forEach(([key, value]) => this [key] = value as object|boolean|null);
  }

  /**
   * @param {object} object
   * @returns {object}
   * @private
   */
  #deepFreeze(object: object) {
    Object.getOwnPropertyNames(object).forEach((name) => {
      const value = object[name] as object|boolean|null;

      if (value && typeof value === 'object') {
        this.#deepFreeze(value);
      }
    });
    return Object.freeze(object);
  }
}
