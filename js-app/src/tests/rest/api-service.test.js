import {ApiService} from '../../rest/api-service.js';
import {RequestService} from '../../rest/request-service';
import {AuthorisationData} from '../../authorisation-data.js';
import {expect, jest} from '@jest/globals';
import {Response} from '../../rest/response.js';
import {ServerValidationError} from '../../rest/errors/server-validation-error.js';
import {DefaultServerError} from '../../rest/errors/default-server-error.js';
import {ServerLoginError} from '../../rest/errors/server-login-error.js';

jest.mock('../../rest/request-service');

describe('logIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('LogIn method throw an error with response status 401', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'postJson')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              const response = new Response(401, {});
              resolve(response);
            });
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.logIn(new AuthorisationData('', '')))
            .rejects.toEqual(new ServerLoginError());
        done();
      });
    });
  });


  test('LogIn method is called', () => {
    return new Promise((done) => {
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
              expect(postMock).toHaveBeenLastCalledWith('api/login',
                  '{"username":"testName","password":"TestPassword"}');
            });
        done();
      });
    });
  });

  test('LogIn method throw an error with response status 400', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'postJson')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              const response = new Response(400, {});
              resolve(response);
            });
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.logIn(new AuthorisationData('', '')))
            .rejects.toEqual(new DefaultServerError());
        done();
      });
    });
  });

  test('Should throw ServerError when postJson throw an error', () => {
    return new Promise(async (done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'postJson')
          .mockImplementation(() => {
            return Promise.reject(new Error());
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.logIn(new AuthorisationData('', '')))
            .rejects.toEqual(new DefaultServerError());
        done();
      });
    });
  });
});

describe('register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Register method throw an error with response status 422', () => {
    return new Promise((done) => {
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

      setTimeout(async () => {
        await expect(apiService.register(new AuthorisationData('', '')))
            .rejects.toEqual(new ServerValidationError(errors));
        done();
      });
    });
  });


  test('Register method is called', () => {
    return new Promise((done) => {
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
  });

  test('Register method throw an error with response status 400', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'postJson')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              const response = new Response(400, {});
              resolve(response);
            });
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.register(new AuthorisationData('', '')))
            .rejects.toEqual(new DefaultServerError());
        done();
      });
    });
  });

  test('Should throw ServerError when postJson throw an error', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'postJson')
          .mockImplementation(async () => {
            return Promise.reject(new Error());
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.register(new AuthorisationData('', '')))
            .rejects.toEqual(new DefaultServerError());
        done();
      });
    });
  });
});

describe('getUser', () => {
  test('Should throw default server error with not 200 response status', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'getJson')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              const response = new Response(400, {});
              resolve(response);
            });
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.getUser())
            .rejects.toEqual(new DefaultServerError());
        done();
      });
    });
  });

  test('Should return user profile when response status 200', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      const body = {userProfile: {username: 'test name', rootFolderId: 1}};
      jest.spyOn(requestService, 'getJson')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              const response = new Response(200, body);
              resolve(response);
            });
          });

      const apiService = new ApiService(requestService);

      setTimeout(() => {
        apiService.getUser()
            .then((username) => {
              expect(username).toEqual({username: 'test name', rootFolderId: 1});
            });
        done();
      });
    });
  });

  test('Should call getJson method', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      const getJsonMock = jest.spyOn(requestService, 'getJson')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              const response = new Response(200, {userProfile: {username: 'test name', rootFolderId: 1}});
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

  test('Should throw ServerError when getJson throw an error', () => {
    return new Promise((done) => {
      const requestService = new RequestService();

      jest.spyOn(requestService, 'getJson')
          .mockImplementation(async () => {
            return Promise.reject(new Error());
          });

      const apiService = new ApiService(requestService);

      setTimeout(async () => {
        await expect(apiService.getUser())
            .rejects.toEqual(new DefaultServerError());
        done();
      });
    });
  });

  describe('getFolder', () => {
    test('Should throw default server error with not 200 response status', () => {
      return new Promise((done) => {
        const requestService = new RequestService();

        jest.spyOn(requestService, 'getJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(400, {});
                resolve(response);
              });
            });

        const apiService = new ApiService(requestService);

        setTimeout(async () => {
          await expect(apiService.getFolder('')).rejects
              .toEqual(new DefaultServerError());
          done();
        });
      });
    });

    test('Should return current folder when response status 200', () => {
      return new Promise((done) => {
        const requestService = new RequestService();

        jest.spyOn(requestService, 'getJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(200, {currentFolder: {id: 1, parentId: 1}});
                resolve(response);
              });
            });

        const apiService = new ApiService(requestService);

        setTimeout(() => {
          apiService.getFolder('')
              .then((currentFolder) => {
                expect(currentFolder).toEqual({id: 1, parentId: 1});
              });

          done();
        });
      });
    });

    test('Should call getJson method', () => {
      return new Promise((done) => {
        const requestService = new RequestService();

        const getJsonMock = jest.spyOn(requestService, 'getJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(200, {currentFolder: {id: 1, parentId: 1}});
                resolve(response);
              });
            });

        const apiService = new ApiService(requestService);

        setTimeout(() => {
          apiService.getFolder('1');
          expect(getJsonMock).toHaveBeenCalledTimes(1);
          expect(getJsonMock).toHaveBeenLastCalledWith('api/getFolder/:1', undefined);
          done();
        });
      });
    });
  });

  describe('Get folder content', () => {
    test('Should throw default server error with not 200 response status', () => {
      return new Promise((done) => {
        const requestService = new RequestService();

        jest.spyOn(requestService, 'getJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(400, {});
                resolve(response);
              });
            });

        const apiService = new ApiService(requestService);

        setTimeout(async () => {
          await expect(apiService.getFolderContent('')).rejects
              .toEqual(new DefaultServerError());
          done();
        });
      });
    });

    test('Should return folder content when response status 200', () => {
      return new Promise((done) => {
        const requestService = new RequestService();

        jest.spyOn(requestService, 'getJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(200, {folderContent: 'Folder content'});
                resolve(response);
              });
            });

        const apiService = new ApiService(requestService);

        setTimeout(() => {
          apiService.getFolderContent('')
              .then((currentFolder) => {
                expect(currentFolder).toBe('Folder content');
              });

          done();
        });
      });
    });

    test('Should call getJson method', () => {
      return new Promise((done) => {
        const requestService = new RequestService();

        jest.spyOn(requestService, 'postJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(200, {token: 'token'});
                resolve(response);
              });
            });

        const getJsonMock = jest.spyOn(requestService, 'getJson')
            .mockImplementation(async () => {
              return await new Promise((resolve) => {
                const response = new Response(200, {});
                resolve(response);
              });
            });

        const apiService = new ApiService(requestService);

        apiService.logIn(new AuthorisationData('testName', 'TestPassword'));

        setTimeout(() => {
          apiService.getFolderContent('1');
          expect(getJsonMock).toHaveBeenCalledTimes(1);
          expect(getJsonMock).toHaveBeenLastCalledWith('api/getFolder/:1/content', 'token');
          done();
        });
      });
    });
  });
});
