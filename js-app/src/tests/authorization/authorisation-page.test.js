import {AuthorisationPage} from '../../authorization/authorisation-page.js';
import {TitleService} from '../../services/title-service.js';
import {ApiService} from '../../rest/api-service.js';
import {RequestService} from '../../rest/request-service.js';
import {jest} from '@jest/globals';
import {AuthorisationData} from '../../authorisation-data.js';
import {ServerLoginError} from '../../rest/errors/server-login-error.js';

describe('Authorisation page component', () => {
  let fixture;
  let page;
  let mockFn;
  let email;
  let password;
  let formMarkup;
  let apiService;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    const titleService = new TitleService('FileHub', '/');

    apiService = new ApiService(new RequestService());

    page = new AuthorisationPage(fixture, apiService, titleService);

    mockFn = jest.fn();

    const formControls = fixture.querySelectorAll('[data-td="form-control"]');

    email = formControls[0].getElementsByTagName('input')[0];
    password = formControls[1].getElementsByTagName('input')[0];
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;
  });

  test('Should render authorisation page component', function() {
    expect.assertions(4);

    const actualPageMarkup = fixture.querySelector('[data-td="authorisation-page"]');
    const form = actualPageMarkup.getElementsByTagName('form')[0];

    expect(actualPageMarkup).toBeTruthy();
    expect(form).toBeTruthy();
    expect(form.getElementsByTagName('input')).toHaveLength(2);
    expect(document.title).toBe('FileHub / Sign In');
  });

  test('Should add listener for navigate event', () => {
    return new Promise((done) => {
      expect.assertions(1);

      page.onNavigateToRegistration(mockFn);

      const link = fixture.querySelector('[data-td="link"]');
      link.click();

      expect(mockFn).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        done();
      });
    });
  });

  test('Should add listener for submit event', () => {
    return new Promise((done) => {
      const logInMock = jest.spyOn(apiService, 'logIn')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              resolve();
            });
          });

      expect.assertions(3);

      page.onSuccessSubmit(mockFn);

      email.value = 'artem@gmail';
      password.value = 'aaaaaaa';
      formMarkup.requestSubmit();
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(logInMock).toHaveBeenCalledTimes(1);
        expect(logInMock).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
        done();
      });
    });
  });

  test('Should render server error in form', () => {
    return new Promise((done) => {
      const logInMock = jest.spyOn(apiService, 'logIn')
          .mockImplementation(async () => {
            throw new ServerLoginError();
          });

      expect.assertions(3);

      email.value = 'artem@gmail';
      password.value = 'aaaaaaa';

      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(logInMock).toHaveBeenCalledTimes(1);
        expect(logInMock).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
        const error = fixture.querySelector('[class="server-error"]');
        expect(error.textContent.trim()).toBe('Invalid user name or password.');
        done();
      }, 100);
    });
  });
});
