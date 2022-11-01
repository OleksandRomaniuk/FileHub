/**
 * Provide static methods that invented for value validation.
 */
export class Preconditions {
  /**
   * Checks if {@link valueToCheck} is a type of {@link type}.
   * @param {any} valueToCheck
   * @param {string} type
   * @throws {Error}
   */
  static checkType(valueToCheck, type) {
    if (typeof valueToCheck !== type) {
      throw new Error(`Expected ${type} but ${typeof valueToCheck} provided.`);
    }
  }

  /**
   * Checks argument validation with {@link RegExp} type.
   * @param {any} valueToCheck
   * @throws {Error}
   */
  static checkForRegExp(valueToCheck) {
    if (valueToCheck.constructor.name !== 'RegExp') {
      throw new Error(`Expected RegExp but ${typeof valueToCheck} provided.`);
    }
  }

  /**
   * Checks if {@link valueToCheck} is an instance of {@link type}.
   * @param {any} valueToCheck
   * @param {any} type
   * @throws {Error}
   */
  static checkInstance(valueToCheck, type) {
    if (!(valueToCheck instanceof type)) {
      throw new Error(`Expected ${type} but ${valueToCheck.constructor.name} provided`);
    }
  }

  /**
   * Checks if {@link valueToCheck} is undefined.
   * @param {any} valueToCheck
   * @throws {Error}
   */
  static checkNotUndefined(valueToCheck) {
    if (typeof valueToCheck == 'undefined') {
      throw new Error(`Value is undefined.`);
    }
  }
}
