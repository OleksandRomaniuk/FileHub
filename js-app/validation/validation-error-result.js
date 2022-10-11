/**
 * Contains array of errors.
 */
export class ValidationErrorResult extends Error {
  errors;

  /**
   *
   * @param {*[]} errors
   */
  constructor(errors) {
    super();
    this.errors = errors;
  }
}
