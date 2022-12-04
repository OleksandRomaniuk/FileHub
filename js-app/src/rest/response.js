/**
 * Custom response class that can hold error code and body that can be any object.
 */
export class Response {
  #code;
  #body;

  /**
   * @param {number} code
   * @param {object} body
   */
  constructor(code, body) {
    this.#code = code;
    this.#body = body;
  }

  /**
   * @returns {number}
   */
  get code() {
    return this.#code;
  }

  /**
   * @returns {object}
   */
  get body() {
    return this.#body;
  }
}
