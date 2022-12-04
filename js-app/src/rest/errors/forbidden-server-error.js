import {ServerError} from './server-error.js';

/**
 * Error from server that matches '403' error code.
 */
export class ForbiddenServerError extends ServerError {
  /**
   * @inheritDoc
   * @returns {string}
   */
  getError() {
    return 'Access forbidden. You don\'t have permission to access.';
  }
}
