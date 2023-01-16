/**
 * Errors during creating the new folder.
 */
export class CreatingFolderError extends Error {
    errors;
    /**
     * @param {object} errors
     */
    constructor(errors) {
      super();
      this.errors = errors;
    }
}
