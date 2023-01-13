import {expect} from '@jest/globals';
import {ServiceError} from '../../../service/errors/service-error';

describe('ServiceError', () => {
  test('Should get text of error.', () => {
    const serviceError = new ServiceError();
    expect(serviceError.error).toBeUndefined();
  });
});
