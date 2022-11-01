import {ValidationError} from './validation-error.js';

/**
 * Provided to hold {@link ValidationError}.
 */
export class ValidationErrorResult extends Error {
  #errors;

  /**
   * @param {ValidationError[]} errors
   */
  constructor(errors) {
    super();
    this.#errors = errors;
  }

  /**
   * @returns {ValidationError[]}
   */
  get errors() {
    return this.#errors;
  }
}
