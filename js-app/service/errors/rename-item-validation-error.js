/**
 * Errors during validation data in input for renaming item.
 */
export class RenameItemValidationError extends Error {
    errors;
    /**
     * @param {object} errors
     */
    constructor(errors) {
      super();
      this.errors = errors;
    }
}
