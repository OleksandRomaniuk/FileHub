import {UserAction} from '../../actions/user-action.js';
import {ApplicationContext} from '../../application-context.js';
import {jest} from '@jest/globals';

describe('User action', () => {
  let applicationContext;
  let userAction;
  let mutationExecutorMock;

  beforeEach(() => {
    mutationExecutorMock = jest.fn();

    applicationContext = new ApplicationContext();

    userAction = new UserAction();
  });

  test('Should call get user method in from api service', () => {
    const getUserMock = jest.spyOn(applicationContext.apiService, 'getUser')
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({});
          });
        });

    userAction.execute(mutationExecutorMock, applicationContext);

    expect(getUserMock).toHaveBeenCalledTimes(1);
  });

  test('Should call mutation executor function with right arguments', (done) => {
    jest.spyOn(applicationContext.apiService, 'getUser')
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve('name');
          });
        });

    setTimeout(async () => {
      await userAction.execute(mutationExecutorMock, applicationContext);
      expect(mutationExecutorMock).toHaveBeenCalledTimes(3);
      expect(mutationExecutorMock)
          .toHaveBeenNthCalledWith(1, 'is-user-loading', true);
      expect(mutationExecutorMock)
          .toHaveBeenNthCalledWith(2, 'set-username', 'name');
      expect(mutationExecutorMock)
          .toHaveBeenNthCalledWith(3, 'is-user-loading', false);
      done();
    });
  });

  test('Should call mutation executor function with right arguments when server return error', (done) => {
    const error = new Error('test error');
    jest.spyOn(applicationContext.apiService, 'getUser')
        .mockImplementation(() => {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        });

    setTimeout(async () => {
      await userAction.execute(mutationExecutorMock, applicationContext);
      expect(mutationExecutorMock).toHaveBeenCalledTimes(3);
      expect(mutationExecutorMock)
          .toHaveBeenNthCalledWith(1, 'is-user-loading', true);
      expect(mutationExecutorMock)
          .toHaveBeenNthCalledWith(2, 'set-user-error', error);
      expect(mutationExecutorMock)
          .toHaveBeenNthCalledWith(3, 'is-user-loading', false);
      done();
    });
  });
});
