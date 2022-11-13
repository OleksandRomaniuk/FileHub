import {RegistrationForm} from '../../registration/registration-form.js';
import {ServerValidationError} from '../../rest/errors/server-validation-error.js';
import {DefaultServerError} from '../../rest/errors/default-server-error.js';
import {jest} from '@jest/globals';


describe('Registration form component', () => {
  let fixture;
  let form;
  let formMarkup;
  let formControls;
  let email;
  let password;
  let confirmPassword;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    form = new RegistrationForm(fixture);
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild;
    formControls = fixture.querySelectorAll('[data-td="form-control"]');

    email = formControls[0].getElementsByTagName('input')[0];
    password = formControls[1].getElementsByTagName('input')[0];
    confirmPassword = formControls[2].getElementsByTagName('input')[0];
  });
  test('Should render registration form component', function() {
    expect.assertions(7);

    expect(formMarkup).toBeTruthy();
    expect(email.name).toBe('email');
    expect(email.placeholder).toBe('Email');
    expect(password.name).toBe('password');
    expect(password.placeholder).toBe('Password');
    expect(confirmPassword.name).toBe('confirmPassword');
    expect(confirmPassword.placeholder).toBe('Confirm Password');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    const navigateListener = jest.fn(() => {});

    form.onNavigateToAuthorisation(() => {
      navigateListener();
    });

    const link = fixture.querySelector('[data-td="link"]');
    link.click();

    expect(navigateListener).toHaveBeenCalledTimes(1);
  });

  test('Should add listener for submit event', (done) => {
    expect.assertions(1);

    const submitListener = jest.fn(() => {});
    form.onSubmit(() => {
      submitListener();
    });

    email.value = 'artem@gmail';
    password.value = 'aaaaaaa';
    confirmPassword.value = 'aaaaaaa';
    formMarkup.requestSubmit();

    setTimeout(() => {
      expect(submitListener).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('Should render validation errors', () => {
    expect.assertions(2);

    form.handleServerError(new ServerValidationError(
        [{field: 'email', message: 'Email error'},
          {field: 'password', message: 'Password error'}]));

    const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
    expect(errors.length).toBe(2);
    expect(errors.map((error) => error.textContent)).toEqual(['Email error', 'Password error']);
  });

  test('Should render server error', () => {
    expect.assertions(1);

    form.handleServerError(new DefaultServerError());

    const error = fixture.querySelector('[class="server-error"]');
    expect(error.textContent.trim()).toBe('Error occurred. Please try again.');
  });

  test('Should show 4 errors while inputs are empty', function(done) {
    expect.assertions(1);

    formMarkup.requestSubmit();

    setTimeout(() => {
      const errors = fixture.querySelectorAll('[data-td="error-messages"]');
      expect(errors.length).toBe(4);
      done();
    }, 100);
  });

  test('Should clear errors in authorisation form', function(done) {
    expect.assertions(7);

    email.value = '%@g';
    password.value = 'asd';
    confirmPassword.value = 'asds';

    formMarkup.requestSubmit();

    const errorMessages = ['Text must be more than 5 symbols', 'Field is not valid',
      'Text must be more than 6 symbols', 'Text must be more than 6 symbols', 'asd is not equal to asds'];

    setTimeout(() => {
      let errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
      expect(errors.length).toBe(errorMessages.length);
      errors.forEach((error, index) => {
        expect(error.textContent.trim()).toBe(errorMessages[index]);
      });

      email.value = 'artem@g';
      password.value = 'asdasdasd';
      confirmPassword.value = 'asdasdasd';

      formMarkup.requestSubmit();

      setTimeout(() => {
        errors = fixture.querySelectorAll('[data-td="error-messages"]');
        expect(errors.length).toBe(0);
        done();
      });
    }, 100);
  });

  [['%%%@g', 'password', 'password',
    ['Field is not valid']],
  ['%@g', 'password', 'password',
    ['Text must be more than 5 symbols', 'Field is not valid']],
  ['artem@g', 'passw', 'password',
    ['Text must be more than 6 symbols', 'passw is not equal to password']],
  ['artem@g', 'passphrases', 'password',
    ['passphrases is not equal to password']],
  ['a@g', 'passphrases', 'password',
    ['Text must be more than 5 symbols', 'passphrases is not equal to password']],
  ['%@g', 'passphrases', 'password',
    ['Text must be more than 5 symbols', 'Field is not valid', 'passphrases is not equal to password']],
  ['%@g', 'pas', 'password',
    ['Text must be more than 5 symbols', 'Field is not valid',
      'Text must be more than 6 symbols', 'pas is not equal to password']],
  ].forEach(([emailValue, passwordValue, confirmValue, errorMessages]) => {
    test(`Registration validation with args - Email: ${emailValue}, password: ${passwordValue},
      confirm password: ${confirmValue}`, function(done) {
      expect.assertions(errorMessages.length + 1);

      email.value = emailValue;
      password.value = passwordValue;
      confirmPassword.value = confirmValue;

      formMarkup.requestSubmit();

      setTimeout(() => {
        const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
        expect(errors.length).toBe(errorMessages.length);
        errors.forEach((error, index) => {
          expect(error.textContent.trim()).toBe(errorMessages[index]);
        });
        done();
      }, 100);
    });
  });
});
