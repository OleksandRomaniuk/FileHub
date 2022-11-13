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
    const requestService = new RequestService();

    jest.spyOn(requestService, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(401, {});
            resolve(response);
          });
        });

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
    const requestService = new RequestService();

    const postMock = jest.spyOn(requestService, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(200, {});
            resolve(response);
          });
        });

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
    const requestService = new RequestService();

    jest.spyOn(requestService, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(400, {});
            resolve(response);
          });
        });

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
    const errors = [{field: 'email', message: 'Email error'},
      {field: 'password', message: 'Password error'}];
    const requestService = new RequestService();

    jest.spyOn(requestService, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(422, {errors: errors});
            resolve(response);
          });
        });

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.register(new AuthorisationData('', ''))
          .catch((error) => {
            expect(error.getError()).toEqual({'email': ['Email error'], 'password': ['Password error']});
          });

      done();
    });
  });


  test('Register method is called', (done) => {
    const requestService = new RequestService();

    const postMock = jest.spyOn(requestService, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(200, {});
            resolve(response);
          });
        });

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
    const requestService = new RequestService();

    jest.spyOn(requestService, 'postJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(400, {});
            resolve(response);
          });
        });

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

describe('getUser', () => {
  test('Should throw default server error with not 200 response status', (done) => {
    const requestService = new RequestService();

    jest.spyOn(requestService, 'getJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(400, {});
            resolve(response);
          });
        });

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.getUser()
          .catch((error) => {
            expect(error.getError()).toEqual('Error occurred. Please try again.');
          });

      done();
    });
  });

  test('Should return username when response status 200', (done) => {
    const requestService = new RequestService();

    jest.spyOn(requestService, 'getJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(200, {username: 'testName'});
            resolve(response);
          });
        });

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.getUser()
          .then((username) => {
            expect(username).toEqual('testName');
          });

      done();
    });
  });

  test('Should call getJson method', (done) => {
    const requestService = new RequestService();

    const getJsonMock = jest.spyOn(requestService, 'getJson')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            const response = new Response(200, {username: 'testName'});
            resolve(response);
          });
        });

    const apiService = new ApiService(requestService);

    setTimeout(() => {
      apiService.getUser();
      expect(getJsonMock).toHaveBeenCalledTimes(1);
      expect(getJsonMock).toHaveBeenLastCalledWith('api/getUser', undefined);
      done();
    });
  });
});
