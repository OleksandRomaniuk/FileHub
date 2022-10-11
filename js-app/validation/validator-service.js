import {ValidationErrorResult} from './validation-error-result.js';
import {ValidationError} from './validation-error.js';

/**
 * Service for checking data using validation function.
 */
export class ValidatorService {
  /**
   *
   * @param {FormData} formData
   * @param {FormValidationConfig} config
   * @returns {Promise<void>}
   */
  async validate(formData, config) {
    const validationsErrors = [];

    const iterator = config.configs.entries();

    for (let j = 0; j < config.configs.size; j++) {
      const configFieldArray = iterator.next().value;
      const field = configFieldArray[0];
      const validators = configFieldArray[1];

      const value = formData.get(field);

      for (let i = 0; i < validators.length; i++) {
        try {
          await validators[i](value);
        } catch (error) {
          validationsErrors.push(new ValidationError(field, error.message));
        }
      }
    }
    if (validationsErrors.length) {
      throw new ValidationErrorResult(validationsErrors);
    }

  };
}
