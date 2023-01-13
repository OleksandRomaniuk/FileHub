/**
 * Class with data about request such as success with status and information in body.
 */
export class Response {
  #status;
  #body;

  /**
   * @param {number} status
   * @param {object} body
   */
  constructor(status, body) {
    this.#status = status;
    this.#body = body;
  }

  /**
   * @returns {number}
   */
  get status() {
    return this.#status;
  }
  /**
   * @returns {object}
   */
  get body() {
    return this.#body;
  }
}
