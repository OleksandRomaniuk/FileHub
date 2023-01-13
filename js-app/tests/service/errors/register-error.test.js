import {expect} from '@jest/globals';
import {RegisterError} from '../../../service/errors/register-error';

describe('RegisterError', () => {
  test('Should get text of error.', () => {
    const registerError = new RegisterError({
      email: ['Such email already exist.'],
    });
    expect(registerError.error.email[0]).toBe('Such email already exist.');
  });
});
