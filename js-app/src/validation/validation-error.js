/**
 * {@code ValidationError} was invented to store name of field with error and message that need to be shown.
 */
export class ValidationError {
  #fieldName;
  #message;

  /**
   * @param {string} fieldName
   * @param {string} message
   */
  constructor(fieldName, message) {
    this.#fieldName = fieldName;
    this.#message = message;
  }

  /**
   * @returns {string}
   */
  get fieldName() {
    return this.#fieldName;
  }

  /**
   * @returns {string}
   */
  get message() {
    return this.#message;
  }
}
