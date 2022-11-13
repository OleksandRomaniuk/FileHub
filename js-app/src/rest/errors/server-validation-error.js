import {ServerError} from './server-error.js';

/**
 * An error that comes from the server after data validation on it.
 */
export class ServerValidationError extends ServerError {
  #errors;

  /**
   * @typedef {object} ValidationErrors
   * @property {string} fieldName
   * @property {string[]} errors
   */

  /**
   * @param {ValidationErrors} errors
   */
  constructor(errors) {
    super();
    this.#errors = errors;
  }

  /**
   * @inheritDoc
   * @returns {object}
   */
  getError() {
    return this.#errors;
  }
}
