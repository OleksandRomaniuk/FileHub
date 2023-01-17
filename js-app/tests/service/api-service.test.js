import {ApiService} from '../../service/api-service';
import {RequestService} from '../../service/request-service';
import {UserData} from '../../application/user-data';
import {Response} from '../../service/response';
import {jest} from '@jest/globals';
import {LoginFailedError} from '../../service/errors/login-failed-error';
import {GeneralServerError} from '../../service/errors/general-server-error';
import {RegisterError} from '../../service/errors/register-error';


describe('ApiService', () => {
  test('Should call method post during logIn and catch error because of status 401.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();

    const requestServiceMock = jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => new Response(401, {token: 'HelloToken'}));

    const apiService = new ApiService(requestService);
    await expect(apiService.logIn(new UserData('email', 'password')))
      .rejects.toThrow(LoginFailedError);
    expect(requestServiceMock).toHaveBeenCalled();
  });
  test('Should call method post during logIn and catch error because of bad internet.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();

    const requestServiceMock = jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => {
        throw new Error();
      });

    const apiService = new ApiService(requestService);
    await expect(apiService.logIn(new UserData('email', 'password')))
      .rejects.toThrow(GeneralServerError);
    expect(requestServiceMock).toHaveBeenCalled();
  });

  test('Should call method post during logIn and catch error because of status 5**.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => new Response(520, {}));

    const apiService = new ApiService(requestService);
    return expect(apiService.logIn(new UserData('email', 'password')))
      .rejects.toThrow(GeneralServerError);
  });

  test('Should call method post during logIn and catch error because of bad internet connection.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => {
        throw new Error();
      });

    const apiService = new ApiService(requestService);
    return expect(apiService.logIn(new UserData('email', 'password')))
      .rejects.toThrow(GeneralServerError);
  });

  test('Should call method post during and logIn user.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => new Response(200, {token: 'HelloToken'}));

    const apiService = new ApiService(requestService);
    await expect(apiService.logIn(new UserData('email', 'password'))).resolves.toBeUndefined();
  });

  test('Should call method post and register new user.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => {
        return new Response(200, {});
      });

    const apiService = new ApiService(requestService);
    await expect(apiService.register(new UserData('email', 'password'))).resolves.toBeUndefined();
  });

  test('Should call method post during register and catch error 505.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();
    const requestServiceMock = jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => new Response(505, {errors: ''}));

    const apiService = new ApiService(requestService);
    await expect(apiService.register(new UserData('email', 'password')))
      .rejects.toThrow(GeneralServerError);
    expect(requestServiceMock).toHaveBeenCalled();
  });

  test('Should call method post during register and catch error because of bad internet connection.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () => {
        throw new Error();
      });

    const apiService = new ApiService(requestService);
    return expect(apiService.register(new UserData('email', 'password')))
      .rejects.toThrow(GeneralServerError);
  });

  test('Should call method post and during register' +
      ' catch error 422 with errors for inputs.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'post')
      .mockImplementation(async () =>
        new Response(422, {errors:
                    {
                      email: 'Such user already exist.',
                    },
        }),
      );

    const apiService = new ApiService(requestService);
    await expect(apiService.register(new UserData('email', 'password')))
      .rejects.toThrow(RegisterError);
  });

  test('Should call method getFolder wit status 200.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(200, {folderInfo: {
          name: 'trip',
          id: 30,
          parentId: 28,
          itemsAmount: 5,
        },
        }),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.getFolder('25'))
      .resolves
      .toStrictEqual({'folderInfo': {'id': 30, 'itemsAmount': 5, 'name': 'trip', 'parentId': 28}});
  });

  test('Should call method getFolder wit status 400.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(400, {}),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.getFolder('25'))
      .rejects
      .toThrow(new Error('Error occurred. Please try again.'));
  });
  test('Should call method getUser and get status 200.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();
    const requestServiceMock = jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(200),
      );

    const apiService = new ApiService(requestService);
    await expect(apiService.getUser(new UserData('email', 'password')))
      .resolves.toBeUndefined();
    expect(requestServiceMock).toHaveBeenCalled();
  });
  test('Should call method getFolderContent wit status 200.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    const folderContent = {
      items: [
        {
          type: 'folder',
          name: 'Bali',
          size: null,
          id: 'folder5',
        },
        {
          type: 'folder',
          name: 'Study',
          size: null,
          id: 'folder6',
        },
        {
          type: 'PDF Document',
          name: 'Laboratory work.pdf',
          size: '500 KB',
          id: 'file7',
        },
      ],
    };
    jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(200, {folderContent: folderContent}),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.getFolderContent('25'))
      .resolves
      .toStrictEqual({'folderContent': folderContent});
  });
  test('Should call method getUser and get status 400.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();
    const requestServiceMock = jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(400),
      );
    const apiService = new ApiService(requestService);
    await expect(apiService.getUser(new UserData('email', 'password')))
      .rejects.toThrow(new Error('Error occurred. Please try again.'));
    expect(requestServiceMock).toHaveBeenCalled();
  });

  test('Should call method getFolderContent wit status 404.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(404, {}),
      );
    const apiService = new ApiService(requestService);
    return expect(apiService.getFolderContent('25'))
      .rejects
      .toThrow(new Error('Error occurred. Please try again.'));
  });
  test('Should call method getFolderContent and get status 200.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();
    const requestServiceMock = jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(200),
      );

    const apiService = new ApiService(requestService);
    await expect(apiService.getFolderContent('testId')).resolves.toBeUndefined();
    expect(requestServiceMock).toHaveBeenCalled();
  });
  test('Should call method getFolderContent and get status 400.', async () => {
    expect.assertions(2);
    const requestService = new RequestService();
    const requestServiceMock = jest
      .spyOn(requestService, 'get')
      .mockImplementation(async () =>
        new Response(400),
      );

    const apiService = new ApiService(requestService);
    await expect(apiService.getFolderContent('testId')).rejects.toThrow(new Error('Error occurred. Please try again.'));
    expect(requestServiceMock).toHaveBeenCalled();
  });


  test('Should call method deleteItem with status 200.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'delete')
      .mockImplementation(async () =>
        new Response(200),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.deleteItem({
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: 'folder2',
    }))
      .resolves
      .toBeUndefined();
  });
  test('Should call method deleteItem for deleting the file with status 200.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'delete')
      .mockImplementation(async () =>
        new Response(200),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.deleteItem({
      type: 'file',
      name: 'Montenegro',
      size: '5 kb',
      id: 'folder2',
    }))
      .resolves
      .toBeUndefined();
  });

  test('Should call method deleteItem for deleting the folder with status 404.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'delete')
      .mockImplementation(async () =>
        new Response(404),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.deleteItem({
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: 'folder2',
    }))
      .rejects
      .toThrow(new Error('Error occurred. Please try again.'));
  });

  test('Should call method deleteItem for deleting the file with status 404.', () => {
    expect.assertions(1);
    const requestService = new RequestService();
    jest
      .spyOn(requestService, 'delete')
      .mockImplementation(async () =>
        new Response(404),
      );

    const apiService = new ApiService(requestService);
    return expect(apiService.deleteItem({
      type: 'file',
      name: 'Montenegro',
      size: '10 k',
      id: 'folder2',
    }))
      .rejects
      .toThrow(new Error('Error occurred. Please try again.'));
  });

  test('Should call method deleteItem for deleting the folder' +
      ' and catch error because of reject from requestService.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'delete')
      .mockImplementation(async () => {
        throw new Error();
      });

    const apiService = new ApiService(requestService);

    return expect(apiService.deleteItem(
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      },
    )).rejects.toThrow(GeneralServerError);
  });

  test('Should call method deleteItem for deleting the file and catch error ' +
      'because of reject from requestService.', async () => {
    expect.assertions(1);
    const requestService = new RequestService();

    jest
      .spyOn(requestService, 'delete')
      .mockImplementation(async () => {
        throw new Error();
      });

    const apiService = new ApiService(requestService);

    return expect(apiService.deleteItem(
      {
        type: 'file',
        name: 'Montenegro',
        size: '15 kb',
        id: 'folder2',
      },
    )).rejects.toThrow(GeneralServerError);
  });
});
