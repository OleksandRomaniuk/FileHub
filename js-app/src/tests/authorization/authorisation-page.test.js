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
  let email;
  let password;
  let formMarkup;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;

    jest.spyOn(TitleService.prototype, 'title', 'set')
        .mockImplementation(() => {});

    const titleService = new TitleService('', '');

    page = new AuthorisationPage(fixture, titleService, new ApiService(new RequestService()));

    const formControls = fixture.querySelectorAll('[data-td="form-control"]');

    email = formControls[0].getElementsByTagName('input')[0];
    password = formControls[1].getElementsByTagName('input')[0];
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;
  });
  test('Should render authorisation page component', function() {
    expect.assertions(4);

    const actualPageMarkup = fixture.querySelector('[data-td="authorisation-page"]');

    expect(actualPageMarkup).toBeTruthy();
    expect(formMarkup).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });
  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    const navigateListener = jest.fn(() => {});

    page.onNavigateToRegistration(() => {
      navigateListener();
    });

    const link = fixture.querySelector('[data-td="link"]');
    link.click();

    expect(navigateListener).toHaveBeenCalledTimes(1);
  });

  test('Should add listener for submit event', (done) => {
    const logInMock = jest.spyOn(ApiService.prototype, 'logIn')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            resolve();
          });
        });

    expect.assertions(4);

    const submitListener = jest.fn(() => {});

    page.onSuccessSubmit(() => {
      submitListener();
      expect(true).toBe(true);
      expect(logInMock).toHaveBeenCalledTimes(1);
      expect(logInMock).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
    });

    email.value = 'artem@gmail';
    password.value = 'aaaaaaa';
    formMarkup.requestSubmit();
    setTimeout(() => {
      expect(submitListener).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('Should render server error in form', (done) => {
    const logInMock = jest.spyOn(ApiService.prototype, 'logIn')
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
