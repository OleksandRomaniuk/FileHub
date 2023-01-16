import {expect} from '@jest/globals';
import {RenameItemValidationError} from '../../../service/errors/rename-item-validation-error';

describe('RenameItemValidationError', () => {
  test('Should get text of error.', () => {
    const error = 'testError';
    const renameItemValidationError = new RenameItemValidationError(error);
    expect(renameItemValidationError.errors).toBe(error);
  });
});
