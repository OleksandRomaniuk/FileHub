import {Preconditions} from '../preconditions.js';

/**
 * Verify that the input values are equal.
 * @param {string} referenceValue
 * @returns {(function(string): Promise<void>)|*}
 */
export const validateValueEquals = (referenceValue) => {
  Preconditions.checkType(referenceValue, 'string');

  return async (actualValue) => {
    Preconditions.checkType(actualValue, 'string');

    if (actualValue !== referenceValue) {
      throw new Error(`${referenceValue} is not equal to ${actualValue}`);
    }
  };
};

/**
 * Check if input element value match to regex.
 * @param {RegExp} regex - The regex template.
 * @returns {(function(string): Promise<void>)|*}
 */
export const validateValueWithRegex = (regex) => {
  Preconditions.checkForRegExp(regex);

  return async (inputValue) => {
    Preconditions.checkType(inputValue, 'string');


    if (!inputValue.match(regex)) {
      throw new Error('Field is not valid');
    }
  };
};

/**
 * Verify that input length is not less than number which transmitted in parameters.
 * @param {number} minInputLength - The minimum length of input.
 * @returns {(function(string): Promise<void>)|*}
 */
export const validateValueLength = (minInputLength) => {
  Preconditions.checkType(minInputLength, 'number');

  return async (inputValue) => {
    Preconditions.checkType(inputValue, 'string');

    if (inputValue.length < minInputLength) {
      throw new Error(`Text must be more than ${minInputLength} symbols`);
    }
  };
};
