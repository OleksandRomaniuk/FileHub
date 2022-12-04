/**
 * Abstract class for server error that must be inherited by all server errors.
 */
export class ServerError {
  /**
   * Must be overridden by all inheritors and return data with error that came from server.
   * @abstract
   */
  getError() {
    throw new Error('Method getError() must be overridden by the inheritor');
  }
}
