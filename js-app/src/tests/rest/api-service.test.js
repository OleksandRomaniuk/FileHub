import {ApiService} from '../../rest/api-service.js';
import {RequestService} from '../../rest/request-service';
import {AuthorisationData} from '../../authorisation-data.js';
import {jest} from '@jest/globals';
import {Response} from '../../rest/response.js';

jest.mock('../../rest/request-service');

describe('logIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('LogIn method throw an error with response status 401', (done) => {
    jest.spyOn(RequestService.prototype, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(401, {});
            resolve(response);
          });
        });

    const requestService = new RequestService();

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.logIn(new AuthorisationData('', ''))
          .catch((error) => {
            expect(error.getError()).toBe('Invalid user name or password.');
          });

      done();
    });
  });


  test('LogIn method is called', (done) => {
    const postMock = jest.spyOn(RequestService.prototype, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(200, {});
            resolve(response);
          });
        });

    const requestService = new RequestService();

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.logIn(new AuthorisationData('testName', 'TestPassword'))
          .then(() => {
            expect(postMock).toHaveBeenCalledTimes(1);
            expect(postMock).toHaveBeenLastCalledWith('api/login', '{"username":"testName","password":"TestPassword"}');
          });
      done();
    });
  });


  test('LogIn method throw an error with response status 400', (done) => {
    jest.spyOn(RequestService.prototype, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(400, {});
            resolve(response);
          });
        });

    const requestService = new RequestService();

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.logIn(new AuthorisationData('', ''))
          .catch((error) => {
            expect(error.getError()).toBe('Error occurred. Please try again.');
          });

      done();
    });
  });
});

describe('register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Register method throw an error with response status 422', (done) => {
    const errors = {'email': 'Error', 'password': 'Error'};
    jest.spyOn(RequestService.prototype, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(422, {errors: errors});
            resolve(response);
          });
        });

    const requestService = new RequestService();

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.register(new AuthorisationData('', ''))
          .catch((error) => {
            expect(error.getError()).toEqual(errors);
          });

      done();
    });
  });


  test('Register method is called', (done) => {
    const postMock = jest.spyOn(RequestService.prototype, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(200, {});
            resolve(response);
          });
        });

    const requestService = new RequestService();

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.register(new AuthorisationData('testName', 'TestPassword'))
          .then(() => {
            expect(postMock).toHaveBeenCalledTimes(1);
            expect(postMock).toHaveBeenLastCalledWith('api/register',
                '{"username":"testName","password":"TestPassword"}');
          });
      done();
    });
  });


  test('Register method throw an error with response status 400', (done) => {
    jest.spyOn(RequestService.prototype, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(400, {});
            resolve(response);
          });
        });

    const requestService = new RequestService();

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.register(new AuthorisationData('', ''))
          .catch((error) => {
            expect(error.getError()).toBe('Error occurred. Please try again.');
          });

      done();
    });
  });
});
