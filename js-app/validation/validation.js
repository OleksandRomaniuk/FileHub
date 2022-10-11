/**
 * Checks for valid characters
 * @param {string} email - text for validation
 * @param {string} name - name of text
 * @returns {Promise<string>}
 */
export function validateEmail(email) {
  return new Promise(function(resolve, reject) {
    if ((/^[a-zA-Z1-9+.-\\-_@]+$/.test(email))) {
      resolve();
    } else {
      reject(new Error(`Only latin and number symbols are allowed in email`));
      reject(new ValidationError(`Only latin and number symbols are allowed in email`));
    }
  });
}

/**
 * Checks the allowed size.
 * @param {number} minSize - The minimum input length
 * @returns {Promise<string>|(function(text))|*}
 */
export function validateSize(minSize) {
  return (text) => {
    return new Promise(function(resolve, reject) {
      if (typeof text === 'string' && (text.length >= minSize) ) {
        resolve();
      } else {
        reject(new Error(`Size must be at list  ${minSize} symbols`));
      }
    });
  };
}

/**
 * Validate if two text are equals.
 * @param {string} password
 * @returns {function(*): Promise<unknown>}
 */
export function validatePasswordEquality(password) {
  return (confirmPassword) => {
    return new Promise(function(resolve, reject) {
      if ((password === confirmPassword)) {
        resolve();
      } else {
        reject(new Error('Passwords do not match'));
      }
    });
  };
}

