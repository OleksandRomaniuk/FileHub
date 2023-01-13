/**
 *Error for problems diring {@link ApiService}.
 */
export class ServiceError extends Error {
  /**
   * @abstract
   */
  get error() {}
}
