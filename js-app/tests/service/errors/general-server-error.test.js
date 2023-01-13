import {GeneralServerError} from '../../../service/errors/general-server-error';
import {expect} from '@jest/globals';

describe('GeneralServerError', () => {
  test('Should get text of error.', () => {
    const generalServerError = new GeneralServerError();
    expect(generalServerError.error).toBe('Error occurred. Please try again.');
  });
});
