import {jest} from '@jest/globals';
import {FolderInfoAction} from '../../actions/folder-info-action.js';
import {FileModel} from '../../state/file-model.js';
import {ApiService} from '../../rest/api-service.js';
import {RequestService} from '../../rest/request-service.js';

describe('Load user action', () => {
  let apiService;
  let folderInfoAction;
  let mutationExecutorMock;

  beforeEach(() => {
    mutationExecutorMock = jest.fn();

    apiService = new ApiService(new RequestService());
  });

  test('Should call get folder method from api service', () => {
    const getFolderMock = jest.spyOn(apiService, 'getFolder')
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({});
          });
        });

    folderInfoAction = new FolderInfoAction(apiService, '');

    folderInfoAction.execute(mutationExecutorMock);

    expect(getFolderMock).toHaveBeenCalledTimes(1);
  });

  test('Should call mutation executor function with right arguments', () => {
    return new Promise((done) => {
      jest.spyOn(apiService, 'getFolder')
          .mockImplementation(() => {
            return new Promise((resolve) => {
              resolve();
            });
          });

      folderInfoAction = new FolderInfoAction(apiService, '');

      setTimeout(async () => {
        await folderInfoAction.execute(mutationExecutorMock);
        expect(mutationExecutorMock).toHaveBeenCalledTimes(3);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(1, 'is-breadcrumb-loading', true);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(2, 'set-current-folder', new FileModel());
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(3, 'is-breadcrumb-loading', false);
        done();
      });
    });
  });

  test('Should call mutation executor function with right arguments when server return error', () => {
    return new Promise((done) => {
      const error = {getError() {
        return new Error('test error');
      }};

      jest.spyOn(apiService, 'getFolder')
          .mockImplementation(() => {
            return new Promise((resolve, reject) => {
              reject(error);
            });
          });

      folderInfoAction = new FolderInfoAction(apiService, '');

      setTimeout(async () => {
        await folderInfoAction.execute(mutationExecutorMock);
        expect(mutationExecutorMock).toHaveBeenCalledTimes(3);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(1, 'is-breadcrumb-loading', true);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(2, 'set-breadcrumb-error', new Error('test error'));
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(3, 'is-breadcrumb-loading', false);
        done();
      });
    });
  });
});
