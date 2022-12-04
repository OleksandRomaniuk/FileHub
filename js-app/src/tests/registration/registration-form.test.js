import {RegistrationForm} from '../../registration/registration-form.js';
import {ServerValidationError} from '../../rest/errors/server-validation-error.js';
import {DefaultServerError} from '../../rest/errors/default-server-error.js';
import {jest} from '@jest/globals';
import {AuthorisationData} from '../../authorisation-data.js';


describe('Registration form component', () => {
  let fixture;
  let form;
  let formMarkup;
  let formControls;
  let emailInput;
  let passwordInput;
  let confirmPasswordInput;
  let mockFn;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    form = new RegistrationForm(fixture);
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild;
    formControls = fixture.querySelectorAll('[data-td="form-control"]');

    emailInput = formControls[0].getElementsByTagName('input')[0];
    passwordInput = formControls[1].getElementsByTagName('input')[0];
    confirmPasswordInput = formControls[2].getElementsByTagName('input')[0];
    mockFn = jest.fn();
  });
  test('Should render registration form component', function() {
    expect.assertions(7);

    expect(formMarkup).toBeTruthy();
    expect(emailInput.name).toBe('email');
    expect(emailInput.placeholder).toBe('Email');
    expect(passwordInput.name).toBe('password');
    expect(passwordInput.placeholder).toBe('Password');
    expect(confirmPasswordInput.name).toBe('confirmPassword');
    expect(confirmPasswordInput.placeholder).toBe('Confirm Password');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    form.onNavigateToAuthorisation(mockFn);

    const link = fixture.querySelector('[data-td="link"]');
    link.click();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('Should add listener for submit event', () => {
    return new Promise((done) => {
      expect.assertions(2);

      form.onSubmit(mockFn);

      emailInput.value = 'artem@gmail';
      passwordInput.value = 'aaaaaaa';
      confirmPasswordInput.value = 'aaaaaaa';
      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
        done();
      });
    });
  });

  test('Should render validation errors', () => {
    expect.assertions(1);

    form.handleServerError(new ServerValidationError(
        [{field: 'email', message: 'Email error'},
          {field: 'password', message: 'Password error'}]));

    const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
    expect(errors.map((error) => error.textContent)).toEqual(['Email error', 'Password error']);
  });

  test('Should render server error', () => {
    expect.assertions(1);

    form.handleServerError(new DefaultServerError());

    const error = fixture.querySelector('[class="server-error"]');
    expect(error.textContent.trim()).toBe('Error occurred. Please try again.');
  });

  test('Should show 4 errors while inputs are empty', function() {
    return new Promise((done) => {
      expect.assertions(1);

      formMarkup.requestSubmit();

      setTimeout(() => {
        const errors = fixture.querySelectorAll('[data-td="error-messages"]');
        expect(errors).toHaveLength(4);
        done();
      }, 100);
    });
  });

  test('Should clear errors in authorisation form', function() {
    return new Promise((done) => {
      expect.assertions(7);

      emailInput.value = '%@g';
      passwordInput.value = 'asd';
      confirmPasswordInput.value = 'asds';

      formMarkup.requestSubmit();

      const errorMessages = ['Text must be more than 5 symbols',
        'You can use only latin letters, numbers, and _,@,.,+.-',
        'Text must be more than 6 symbols', 'Text must be more than 6 symbols', 'Passwords are not equal'];

      setTimeout(() => {
        let errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
        expect(errors).toHaveLength(errorMessages.length);
        errors.forEach((error, index) => {
          expect(error.textContent.trim()).toBe(errorMessages[index]);
        });

        emailInput.value = 'artem@g';
        passwordInput.value = 'asdasdasd';
        confirmPasswordInput.value = 'asdasdasd';

        formMarkup.requestSubmit();

        setTimeout(() => {
          errors = fixture.querySelectorAll('[data-td="error-messages"]');
          expect(errors).toHaveLength(0);
          done();
        });
      }, 100);
    });
  });

  [
    {username: '%%%@g', password: 'password', confirmPassword: 'password',
      expectedErrors: ['You can use only latin letters, numbers, and _,@,.,+.-']},
    {username: '%@g', password: 'password', confirmPassword: 'password',
      expectedErrors: ['Text must be more than 5 symbols', 'You can use only latin letters, numbers, and _,@,.,+.-'],
    },
    {username: 'artem@g', password: 'passw', confirmPassword: 'password',
      expectedErrors: ['Text must be more than 6 symbols', 'Passwords are not equal'],
    },
    {username: 'artem@g', password: 'passphrases', confirmPassword: 'password',
      expectedErrors: ['Passwords are not equal'],
    },
    {username: 'a@g', password: 'passphrases', confirmPassword: 'password',
      expectedErrors: ['Text must be more than 5 symbols', 'Passwords are not equal'],
    },
    {username: '%@g', password: 'passphrases', confirmPassword: 'password',
      expectedErrors: ['Text must be more than 5 symbols', 'You can use only latin letters, numbers, and _,@,.,+.-',
        'Passwords are not equal'],
    },
    {username: '%@g', password: 'pas', confirmPassword: 'password',
      expectedErrors: ['Text must be more than 5 symbols', 'You can use only latin letters, numbers, and _,@,.,+.-',
        'Text must be more than 6 symbols', 'Passwords are not equal'],
    },
  ].forEach(({username, password, confirmPassword, expectedErrors}) => {
    test(`Registration validation with args - Email: ${username}, password: ${password},
      confirm password: ${confirmPassword}`, function() {
      return new Promise((done) => {
        expect.assertions(expectedErrors.length + 1);

        emailInput.value = username;
        passwordInput.value = password;
        confirmPasswordInput.value = confirmPassword;

        formMarkup.requestSubmit();

        setTimeout(() => {
          const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
          expect(errors).toHaveLength(expectedErrors.length);
          errors.forEach((error, index) => {
            expect(error.textContent.trim()).toBe(expectedErrors[index]);
          });
          done();
        }, 100);
      });
    });
  });
});
