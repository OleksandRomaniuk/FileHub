/**
 * Contains array of errors.
 */
export class ValidationErrorResult extends Error {
  errors;

  /**
   * @param {[ValidationError]} errors
   */
  constructor(errors) {
    super();
    this.errors = errors;
  }
}
