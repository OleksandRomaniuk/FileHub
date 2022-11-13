import {RegistrationPage} from '../../registration/registration-page.js';
import {TitleService} from '../../services/title-service.js';
import {ApiService} from '../../rest/api-service.js';
import {RequestService} from '../../rest/request-service.js';
import {jest} from '@jest/globals';
import {AuthorisationData} from '../../authorisation-data.js';
import {DefaultServerError} from '../../rest/errors/default-server-error.js';
import {ServerValidationError} from '../../rest/errors/server-validation-error.js';


describe('Registration page component', () => {
  let fixture;
  let page;
  let email;
  let password;
  let confirmPassword;
  let formMarkup;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;

    jest.spyOn(TitleService.prototype, 'title', 'set')
        .mockImplementation(() => {});

    const titleService = new TitleService('', '');

    page = new RegistrationPage(fixture, titleService, new ApiService(new RequestService()));
    const formControls = fixture.querySelectorAll('[data-td="form-control"]');

    email = formControls[0].getElementsByTagName('input')[0];
    password = formControls[1].getElementsByTagName('input')[0];
    confirmPassword = formControls[2].getElementsByTagName('input')[0];
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;
  });
  test('Should render registration page component', function() {
    expect.assertions(2);
    const actualPageMarkup = fixture.querySelector('[data-td="registration-page"]');

    expect(actualPageMarkup).toBeTruthy();
    expect(actualPageMarkup.getElementsByTagName('form')[0]).toBeTruthy();
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    const navigateListener = jest.fn(() => {});

    page.onNavigateToAuthorisation(() => {
      navigateListener();
    });

    const link = fixture.querySelector('[data-td="link"]');
    link.click();

    expect(navigateListener).toHaveBeenCalledTimes(1);
  });

  test('Should add listener for submit event', (done) => {
    const registerMock = jest.spyOn(ApiService.prototype, 'register')
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
      expect(registerMock).toHaveBeenCalledTimes(1);
      expect(registerMock).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
    });

    email.value = 'artem@gmail';
    password.value = 'aaaaaaa';
    confirmPassword.value = 'aaaaaaa';


    const formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;

    formMarkup.requestSubmit();

    setTimeout(() => {
      expect(submitListener).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('Should render server error in form', (done) => {
    const registerMock = jest.spyOn(ApiService.prototype, 'register')
        .mockImplementation(async () => {
          return await new Promise((resolve) => {
            throw new DefaultServerError();
          });
        });

    expect.assertions(3);

    email.value = 'artem@gmail';
    password.value = 'aaaaaaa';
    confirmPassword.value = 'aaaaaaa';

    formMarkup.requestSubmit();

    setTimeout(() => {
      expect(registerMock).toHaveBeenCalledTimes(1);
      expect(registerMock).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
      const error = fixture.querySelector('[class="server-error"]');
      expect(error.textContent.trim()).toBe('Error occurred. Please try again.');
      done();
    }, 100);
  });

  test('Should render server validation error in form', (done) => {
    const registerMock = jest.spyOn(ApiService.prototype, 'register')
        .mockImplementation(async () => {
          throw new ServerValidationError(
              {'email': ['Email error'], 'password': ['Password error']});
        });

    expect.assertions(4);

    email.value = 'artem@gmail';
    password.value = 'aaaaaaa';
    confirmPassword.value = 'aaaaaaa';

    formMarkup.requestSubmit();

    setTimeout(() => {
      expect(registerMock).toHaveBeenCalledTimes(1);
      expect(registerMock).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
      const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
      expect(errors.length).toBe(2);
      expect(errors.map((error) => error.textContent)).toEqual(['Email error', 'Password error']);
      done();
    }, 100);
  });
});
