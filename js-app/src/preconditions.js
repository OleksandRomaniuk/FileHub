
export class Preconditions {
  /**
   * Provided for check if {@link valueToCheck} is a type of {@link type}.
   * @param {any} valueToCheck
   * @param {string} type
   */
  static checkType(valueToCheck, type) {
    if (typeof valueToCheck !== type) {
      throw new Error(`Expected ${type} but ${typeof valueToCheck} provided.`);
    }
  }

  /**
   * Provided for argument validation with {@link RegExp} type.
   * @param {any} valueToCheck
   */
  static checkForRegExp(valueToCheck) {
    if (valueToCheck.constructor.name !== 'RegExp') {
      throw new Error(`Expected RegExp but ${typeof valueToCheck} provided.`);
    }
  }

  /**
   * Provided for check if {@link valueToCheck} is an instance of {@link type}.
   * @param {any} valueToCheck
   * @param {any} type
   */
  static checkInstance(valueToCheck, type) {
    if (!(valueToCheck instanceof type)) {
      throw new Error(`Expected ${type} but ${valueToCheck.constructor.name} provided`);
    }
  }

  /**
   * Provided for check if {@link valueToCheck} is undefined.
   * @param {any} valueToCheck
   */
  static checkNotUndefined(valueToCheck) {
    if (typeof valueToCheck == 'undefined') {
      throw new Error(`Value is undefined.`);
    }
  }
}
