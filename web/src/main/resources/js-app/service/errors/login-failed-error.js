import {ServiceError} from './service-error';

/**
 * Error for problems with username or password during log in.
 */
export class LoginFailedError extends ServiceError {
  #message;

  /**
   * Initialize the message.
   */
  constructor() {
    super();
    this.#message ='Invalid username or password';
  }

  /**
   * @returns {string}
   */
  get error() {
    return this.#message;
  }
}
