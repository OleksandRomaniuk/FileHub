/**
 * Checks for valid characters
 * @param {string} email - text for validation
 * @returns {Promise<string>}
 */
export function validateEmail(email) {
  return new Promise(function(resolve, reject) {
    if ((/^[a-zA-Z1-9+.-\\-_@]+$/.test(email))) {
      resolve();
    } else {
      reject(new Error(`only Latin, numbers and symbols +.-_@ are allowed in email`));
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
        reject(new Error(`have to be more than ${minSize}`));
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
        reject(new Error('Passwords aren\'t equals'));
      }
    });
  };
}

