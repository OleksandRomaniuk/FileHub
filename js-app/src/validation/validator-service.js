import {ValidationError} from './validation-error.js';
import {ValidationErrorResult} from './validation-error-result.js';

/**
 * ValidatorService was invented like a service for form validation.
 */
export class ValidatorService {
  /**
   * Validate {@link FormData} with rules that define in {@link FormValidationConfig}.
   * If some rule has thrown an error, method collect them
   * and throw {@link ValidationErrorResult} like the result of validation.
   * @param {FormData} formData
   * @param {FormValidationConfig} config
   * @returns {Promise<void>}
   */
  static async validate(formData, config) {
    let promises = [];

    for (const [key, validators] of Object.entries(config.getFieldValidators())) {
      const value = formData.get(key);

      promises = [...promises, validators.map((validator) => {
        return validator(value)
            .catch((error) => {
              throw new ValidationError(key, error.message);
            });
      })];
    }

    const validationResults = await Promise.allSettled(promises.flat());
    const validationErrors = validationResults
        .filter((result) => result.status === 'rejected')
        .map((error) => error.reason);

    if (validationErrors.length) {
      throw new ValidationErrorResult(validationErrors);
    }
  };
}
