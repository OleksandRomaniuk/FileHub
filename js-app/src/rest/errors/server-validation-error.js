import {ServerError} from './server-error.js';

/**
 * An error that comes from the server after data validation on it.
 */
export class ServerValidationError extends ServerError {
  #errors;

  /**
   * @typedef {object} ValidationErrors
   * @property {string} fieldName
   * @property {string} error
   */

  /**
   * @param {ValidationErrors[]} errors
   */
  constructor(errors) {
    super();
    this.#errors = this.#castToObject(errors);
  }

  /**
   * @inheritDoc
   * @returns {object}
   */
  getError() {
    return this.#errors;
  }

  /**
   * @param {ValidationErrors[]} errors
   * @returns {{}}
   * @private
   */
  #castToObject(errors) {
    const errorsObject = {};
    errors.forEach((error) => {
      errorsObject[error.field] = [...errorsObject[error.field] ? errorsObject[error.field] : [], error.message];
    });
    return errorsObject;
  }
}
