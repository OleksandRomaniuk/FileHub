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
  let mockFn;
  let apiService;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    const titleService = new TitleService('FileHub', '/');
    mockFn = jest.fn();

    apiService = new ApiService(new RequestService());

    page = new RegistrationPage(fixture, apiService, titleService);
    const formControls = fixture.querySelectorAll('[data-td="form-control"]');

    email = formControls[0].getElementsByTagName('input')[0];
    password = formControls[1].getElementsByTagName('input')[0];
    confirmPassword = formControls[2].getElementsByTagName('input')[0];
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;
  });
  test('Should render registration page component', function() {
    expect.assertions(4);
    const actualPageMarkup = fixture.querySelector('[data-td="registration-page"]');
    const form = actualPageMarkup.getElementsByTagName('form')[0];

    expect(actualPageMarkup).toBeTruthy();
    expect(form).toBeTruthy();
    expect(form.getElementsByTagName('input')).toHaveLength(3);
    expect(document.title).toBe('FileHub / Sign Up');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    page.onNavigateToAuthorisation(mockFn);

    const link = fixture.querySelector('[data-td="link"]');
    link.click();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('Should add listener for submit event', () => {
    return new Promise((done) => {
      const registerMock = jest.spyOn(apiService, 'register')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              resolve();
            });
          });

      page.onSuccessSubmit(mockFn);

      email.value = 'alex@gmail';
      password.value = 'aaaaaaa';
      confirmPassword.value = 'aaaaaaa';

      const formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;

      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(registerMock).toHaveBeenCalledTimes(1);
        expect(registerMock).toHaveBeenCalledWith(new AuthorisationData('alex@gmail', 'aaaaaaa'));
        done();
      });
    });
  });

  test('Should render server error in form', () => {
    return new Promise((done) => {
      const registerMock = jest.spyOn(apiService, 'register')
          .mockImplementation(async () => {
            return await new Promise((resolve) => {
              throw new DefaultServerError();
            });
          });

      expect.assertions(3);

      email.value = 'alex@gmail';
      password.value = 'aaaaaaa';
      confirmPassword.value = 'aaaaaaa';

      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(registerMock).toHaveBeenCalledTimes(1);
        expect(registerMock).toHaveBeenCalledWith(new AuthorisationData('alex@gmail', 'aaaaaaa'));
        const error = fixture.querySelector('[class="server-error"]');
        expect(error.textContent.trim()).toBe('Error occurred. Please try again.');
        done();
      }, 100);
    });
  });

  test('Should render server validation error in form', () => {
    return new Promise((done) => {
      const registerMock = jest.spyOn(apiService, 'register')
          .mockImplementation(async () => {
            throw new ServerValidationError(
                [{field: 'email', message: 'Email error'},
                  {field: 'password', message: 'Password error'}]);
          });

      expect.assertions(4);

      email.value = 'alex@gmail';
      password.value = 'aaaaaaa';
      confirmPassword.value = 'aaaaaaa';

      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(registerMock).toHaveBeenCalledTimes(1);
        expect(registerMock).toHaveBeenCalledWith(new AuthorisationData('alex@gmail', 'aaaaaaa'));
        const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
        expect(errors).toHaveLength(2);
        expect(errors.map((error) => error.textContent)).toEqual(['Email error', 'Password error']);
        done();
      }, 100);
    });
  });
});
