import {clearError, renderError} from './render.js';
import {ValidatorService} from './validator-service.js';
import {FormValidationConfig} from './form-validation-Config.js';
import {CONFIRM_PASSWORD, EMAIL, EMAIL_INPUT_SIZE, PASSWORD, PASSWORD_INPUT_SIZE} from './constants.js';
import {validateEmail, validatePasswordEquality, validateSize} from './validation.js';

/**
 * Validate form using form and validators.
 * @param {HTMLElement} form - form for creating FormData
 */
export function validateAuthorization(form) {
  const config =
    new FormValidationConfig
        .Builder()
        .addFields(EMAIL, [validateEmail, validateSize(EMAIL_INPUT_SIZE)])
        .addFields(PASSWORD, [validateSize(PASSWORD_INPUT_SIZE)])
        .build();


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();
    const formData = new FormData(form);
    new ValidatorService()
        .validate(formData, config)
        .catch((result) => {
          result.errors.forEach((error) => {
            renderError(error.name, error.message);
          });
        });
  });
}

/**
 * Validate registration form using form and validators.
 * @param {HTMLElement} formForRegistration - form for creating FormData
 */
export function validateRegistration(formForRegistration) {
  formForRegistration.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const formData = new FormData(formForRegistration);

    const config =
      new FormValidationConfig
          .Builder()
          .addFields(EMAIL, [validateEmail, validateSize(EMAIL_INPUT_SIZE)])
          .addFields(PASSWORD, [validateSize(PASSWORD_INPUT_SIZE)])
          .addFields(CONFIRM_PASSWORD, [validatePasswordEquality(formData.get(PASSWORD))])
          .build();

    new ValidatorService()
        .validate(formData, config)
        .catch((result) => {
          result.errors.forEach((error) =>{
            renderError(error.name, error.message);
          });
        });
  });
}
