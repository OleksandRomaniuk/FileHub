import {ServerError} from './server-error.js';

/**
 * Error from server not expecting to be processed with special message.
 */
export class DefaultServerError extends ServerError {
  /**
   * @inheritDoc
   * @returns {string}
   */
  getError() {
    return 'Error occurred. Please try again.';
  }
}
