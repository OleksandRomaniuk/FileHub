import {expect} from '@jest/globals';
import {LoginFailedError} from '../../../service/errors/login-failed-error';

describe('LoginFailedError', () => {
  test('Should get text of error.', () => {
    const loginFailedError = new LoginFailedError();
    expect(loginFailedError.error).toBe('Invalid username or password');
  });
});
