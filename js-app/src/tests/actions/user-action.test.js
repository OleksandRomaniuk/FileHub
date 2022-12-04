import {UserAction} from '../../actions/user-action.js';
import {ApiService} from '../../rest/api-service.js';
import {jest} from '@jest/globals';

describe('User action', () => {
  let apiService;
  let userAction;
  let mutationExecutorMock;

  beforeEach(() => {
    mutationExecutorMock = jest.fn();

    apiService = new ApiService();

    userAction = new UserAction(apiService);
  });

  test('Should call get user method in from api service', () => {
    const getUserMock = jest.spyOn(apiService, 'getUser')
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({});
          });
        });

    userAction.execute(mutationExecutorMock);

    expect(getUserMock).toHaveBeenCalledTimes(1);
  });

  test('Should call mutation executor function with right arguments', () => {
    return new Promise((done) => {
      jest.spyOn(apiService, 'getUser')
          .mockImplementation(() => {
            return new Promise((resolve) => {
              resolve( {username: 'test name', rootFolderId: 1});
            });
          });

      setTimeout(async () => {
        await userAction.execute(mutationExecutorMock);
        expect(mutationExecutorMock).toHaveBeenCalledTimes(3);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(1, 'set-user-loading', true);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(2, 'set-user-profile', {username: 'test name', rootFolderId: 1});
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(3, 'set-user-loading', false);
        done();
      });
    });
  });

  test('Should call mutation executor function with right arguments when server return error', () => {
    return new Promise((done) => {
      const error = {getError() {
        return 'test error';
      }};
      jest.spyOn(apiService, 'getUser')
          .mockImplementation(() => {
            return new Promise((resolve, reject) => {
              reject(error);
            });
          });

      setTimeout(async () => {
        await userAction.execute(mutationExecutorMock);
        expect(mutationExecutorMock).toHaveBeenCalledTimes(3);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(1, 'set-user-loading', true);
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(2, 'set-user-error', 'test error');
        expect(mutationExecutorMock)
            .toHaveBeenNthCalledWith(3, 'set-user-loading', false);
        done();
      });
    });
  });
});
