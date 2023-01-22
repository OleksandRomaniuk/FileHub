/**
 * Errors during creating the new folder.
 */
export class CreatingFolderError extends Error {
  /**
   * @param {string} error
   */
  constructor(error) {
    super(error);
  }
}
