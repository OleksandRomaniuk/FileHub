
import {ServiceError} from './service-error.js';
/**
 * Contains detailed information about register errors.
 */
export class RegisterError extends ServiceError {
  #errors;

  /**
   * @typedef {object} ValidationError
   * @property {string} field
   * @property {string[]} message
   */

  /**
   * @param {ValidationError} errors
   */
  constructor(errors) {
    super();
    this.#errors = errors;
  }

  /**
   * @returns {string}
   */
  get error() {
    return this.#errors;
  }
}
