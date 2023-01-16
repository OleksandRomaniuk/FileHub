import {expect} from '@jest/globals';
import {CreatingFolderError} from '../../../service/errors/creating-folder-error';

describe('CreatingFolderError', () => {
  test('Should get text of error.', () => {
    const error = 'testError';
    const creatingFolderError = new CreatingFolderError(error);
    expect(creatingFolderError.errors).toBe(error);
  });
});
