/**
 * Verify that the input values are equal.
 * @param {string} referenceValue
 * @returns {(function(*): Promise<void>)|*}
 */
import {Preconditions} from '../preconditions.js';

export const validateValueEquals = (referenceValue) => { // Rename
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

/**
 * Render error state for input.
 * @param {HTMLElement} input
 * @param {string} message
 */
export function renderInputError(input, message) {
  input.classList.add('input-error');

  const errorElement = document.createElement('p');
  errorElement.classList.add('error-label');
  errorElement.textContent = message;
  input.parentElement.append(errorElement);
}

/**
 * Return input to normal state.
 */
export function clearError() {
  const inputs = [...document.getElementsByTagName('input')];
  inputs.forEach((input) => {
    input.classList.remove('input-error');
    [...input.parentElement
        .getElementsByClassName('error-label')]
        .forEach((errorLabel) => errorLabel.remove());
  });
}
