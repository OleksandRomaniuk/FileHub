
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
    this.#errors = this.#changeToObject(errors);
  }

  /**
   * Cast error to object.
   * @param {object} errors
   * @returns {*}
   */
  #changeToObject(errors) {
    return errors.reduce((hash, error)=>{
      const key = error.name;
      const prevErrors = hash[key] || [];
      hash[key] = [...prevErrors, error.message];
      return hash;
    }, {});
  }
  /**
   * @returns {string}
   */
  get error() {
    return this.#errors;
  }
}
