/**
 * Contains detailed information about errors.
 */
export class RegisterError extends Error {
  errors;

  /**
   * @typedef {object} Errors
   * @property {string} field
   * @property {string} message
   */

  /**
   * @param {Errors} errors
   */
  constructor(errors) {
    super();
    this.errors = errors;
  }
}
