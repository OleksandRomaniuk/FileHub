import {ServerError} from './server-error.js';

/**
 * Error from server that matches '401' error code.
 */
export class UnauthorizedServerError extends ServerError {
  /**
   * @inheritDoc
   * @returns {string}
   */
  getError() {
    return 'Invalid user name or password.';
  }
}
