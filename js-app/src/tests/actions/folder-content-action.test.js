import {jest} from '@jest/globals';
import {FolderContentAction} from '../../actions/folder-content-action.js';

describe('Folder content action', () => {
  let apiService;
  let mutationExecutorMock;

  beforeEach(() => {
    jest.clearAllMocks();

    mutationExecutorMock = jest.fn();

    apiService = {getFolderContent() {}};
  });

  test('Should call getFolderContent method from api service', () => {
    expect.assertions(1);

    const getFolderContentMock = jest.spyOn(apiService, 'getFolderContent')
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({});
          });
        });

    const folderContentAction = new FolderContentAction(apiService, '');

    folderContentAction.execute(mutationExecutorMock);

    expect(getFolderContentMock).toHaveBeenCalledTimes(1);
  });

  test('Should call mutation executor with right arguments', () => {
    return new Promise((done) => {
      expect.assertions(4);

      jest.spyOn(apiService, 'getFolderContent')
          .mockImplementation(() => {
            return new Promise((resolve) => {
              resolve('Content');
            });
          });

      const func = jest.fn();

      const folderContentAction = new FolderContentAction(apiService, '');

      setTimeout(async () => {
        await folderContentAction.execute(func);
        expect(func).toHaveBeenCalledTimes(3);
        expect(func)
            .toHaveBeenNthCalledWith(1, 'set-file-list-loading', true);
        expect(func)
            .toHaveBeenNthCalledWith(2, 'set-folder-content', 'Content');
        expect(func)
            .toHaveBeenNthCalledWith(3, 'set-file-list-loading', false);
        done();
      });
    });
  });

  test('Should call mutation executor with right arguments when server return an error', () => {
    return new Promise((done) => {
      expect.assertions(4);

      const error = {getError() {
        return new Error('test error');
      }};

      jest.spyOn(apiService, 'getFolderContent')
          .mockImplementation(() => {
            return Promise.reject(error);
          });

      const func = jest.fn();

      const folderContentAction = new FolderContentAction(apiService, '');

      setTimeout(async () => {
        await folderContentAction.execute(func);
        expect(func).toHaveBeenCalledTimes(3);
        expect(func)
            .toHaveBeenNthCalledWith(1, 'set-file-list-loading', true);
        expect(func)
            .toHaveBeenNthCalledWith(2, 'set-file-list-error', new Error('test error'));
        expect(func)
            .toHaveBeenNthCalledWith(3, 'set-file-list-loading', false);
        done();
      });
    });
  });
});
