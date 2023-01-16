/**
 * States for the StateManagementService.
 */
export class State {
  /**
   * @type {object}
   */
  userProfile;
  /**
   * @type {boolean}
   */
  isUserProfileError;
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
  isFolderInfoError;
  /**
   * @type {object}
   */
  folderInfo;
  /**
   * @type {boolean}
   */
  isFolderContentLoading = true;
  /**
   * @type {boolean}
   */
  isFolderContentError;
  /**
   * @type {object}
   */
  folderContent;
  /**
   * @type {object}
   */
  locationMetaData;
  /**
   * @type {object}
   */
  itemInRemovingState;
  /**
   * @type {boolean}
   */
  itemBeingDeleted;
  /**
   * @type {string}
   */
  removingError;
  /**
   * @type {object}
   */
  uploadingFiles;
  /**
   * @type {object}
   */
  fileUploadError;
  /**
   * @type {object}
   */
  itemInRenamingState
  /**
   * @type {boolean}
   */
  isRenamingInProgress
  /**
   * @type {object}
   */
  renamingError
  /**
   * @type {object}
   */
  newFolder
  /**
   * @type {boolean}
   */
  isCreatingFolderInProgress
  /**
   * @type {object}
   */
  creatingFolderError
  /**
   * @type {object}
   */
  itemInDownloadState

  /**
   * @type {object}
   */
  downloadError
  /**
   * @param {object} state
   */
  constructor(state = {}) {
    this.#setOwnProperties(state);
    this.#deepFreeze(this);
  }

  /**
   * @param {object} source
   * @private
   */
  #setOwnProperties(source) {
    const properties = Object.keys(this);
    const entries = Object.entries(source)
      .filter(([key])=>properties.includes(key));
    entries.forEach(([key, value]) => this[key] = value);
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
