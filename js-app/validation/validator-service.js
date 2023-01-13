import {ValidationErrorResult} from './validation-error-result.js';
import {FormValidationConfig} from './validation-config.js';
import {ValidationError} from './validation-error.js';


/**
 * Service for checking data using validation function.
 */
export class ValidatorService {
  /**
   * Validate values from {@link formData} using rules in {@link config}.
   * @param {FormValidationConfig} config
   * @param {FormData} formData
   * @returns {Promise<void>}
   */
  async validate(config, formData) {
    const configs = Array.from(config.configs, ([field, validators]) => ({field, validators}));
    const promises = configs.map(({field, validators}) => {
      const value = formData.get(field);
      return validators.map((validator) => validator(value)
          .catch((error) => {
            throw new ValidationError(field, error.message);
          }));
    }).flat();
    const promise = Promise.allSettled(promises);
    return promise.then((results) => {
      const validatorErrors = results
          .filter((result) => result.status==='rejected')
          .map((error) => error.reason);
      if (validatorErrors.length > 0) {
        throw new ValidationErrorResult(validatorErrors);
      }
    });
  }
}
