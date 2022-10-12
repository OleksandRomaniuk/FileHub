/**
 * Contains data about error in field.
 */
export class ValidationError {
  name;
  message;

  /**
   * @param {FormControl} name
   * @param {string} message
   */
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }
}
