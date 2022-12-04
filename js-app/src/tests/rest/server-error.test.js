import {ServerError} from '../../rest/errors/server-error.js';
import {expect} from '@jest/globals';

describe('Server error', () => {
  test('Should throw error when getError method is not overridden', () => {
    /**
     * Test server error inheritor class that doesn't override getError method.
     */
    class TestServerError extends ServerError {}

    const testError = new TestServerError();
    expect(testError.getError)
        .toThrow('Method getError() must be overridden by the inheritor');
  });
});
