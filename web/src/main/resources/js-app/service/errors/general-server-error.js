import {ServiceError} from './service-error';

/**
 * Error for problems with server.
 */
export class GeneralServerError extends ServiceError {
  #message;
  /**
   * Initialize the message.
   */
  constructor() {
    super();
    this.#message ='Error occurred. Please try again.';
  }

  /**
   * @returns {string}
   */
  get error() {
    return this.#message;
  }
}
