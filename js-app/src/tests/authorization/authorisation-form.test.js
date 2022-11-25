import {AuthorisationForm} from '../../authorization/authorisation-form.js';
import {jest} from '@jest/globals';
import {AuthorisationData} from '../../authorisation-data.js';

describe('Authorisation form component', () => {
  let fixture;
  let form;
  let formMarkup;
  let formControls;
  let emailInput;
  let passwordInput;
  let mockFn;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    form = new AuthorisationForm(fixture);
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild;
    formControls = fixture.querySelectorAll('[data-td="form-control"]');

    emailInput = formControls[0].getElementsByTagName('input')[0];
    passwordInput = formControls[1].getElementsByTagName('input')[0];

    mockFn = jest.fn();
    jest.clearAllMocks();
  });
  test('Should render authorisation form component', function() {
    expect.assertions(5);

    expect(formMarkup).toBeTruthy();
    expect(emailInput.name).toBe('email');
    expect(emailInput.placeholder).toBe('Email');
    expect(passwordInput.name).toBe('password');
    expect(passwordInput.placeholder).toBe('Password');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    form.onNavigateToRegistration(mockFn);

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

      formMarkup.requestSubmit();
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(new AuthorisationData('artem@gmail', 'aaaaaaa'));
        done();
      });
    });
  });

  test('Should show 3 errors in authorisation form while inputs are empty', function() {
    return new Promise((done) => {
      expect.assertions(1);

      formMarkup.requestSubmit();

      setTimeout(() => {
        const errors = fixture.querySelectorAll('[data-td="error-messages"]');
        expect(errors).toHaveLength(3);
        done();
      }, 100);
    });
  });

  test('Should clear errors in authorisation form', function() {
    return new Promise((done) => {
      expect.assertions(5);

      emailInput.value = '%@g';
      passwordInput.value = 'asd';

      formMarkup.requestSubmit();

      setTimeout(() => {
        let errors = fixture.querySelectorAll('[data-td="error-messages"]');
        expect(errors).toHaveLength(3);
        expect(errors[0].textContent).toBe('Text must be more than 5 symbols');
        expect(errors[1].textContent).toBe('You can use only latin letters, numbers, and _,@,.,+.-');
        expect(errors[2].textContent).toBe('Text must be more than 6 symbols');

        passwordInput.value = 'asdasdasd';
        emailInput.value = 'artem@g';

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
    {
      username: '%@g', password: 'pas',
      expectedErrors: ['Text must be more than 5 symbols', 'You can use only latin letters, numbers, and _,@,.,+.-',
        'Text must be more than 6 symbols'],
    },
    {
      username: 'artem@g', password: 'asdasdasd',
      expectedErrors: [],
    },
    {
      username: '%@g', password: 'asdasdasd',
      expectedErrors: ['Text must be more than 5 symbols', 'You can use only latin letters, numbers, and _,@,.,+.-'],
    },
    {
      username: 'aaa%%%@g', password: 'asdasdasd',
      expectedErrors: ['You can use only latin letters, numbers, and _,@,.,+.-'],
    },
    {
      username: 'artem@gmail.com', password: 'asd',
      expectedErrors: ['Text must be more than 6 symbols'],
    },
  ].forEach(({username, password, expectedErrors}) => {
    test(`Authorisation validation with args - Email: ${username}, password: ${password}`,
        function() {
          return new Promise((done) => {
            expect.assertions(expectedErrors.length + 1);

            emailInput.value = username;
            passwordInput.value = password;

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

  test(`Should render server error.`, function() {
    expect.assertions(1);

    form.serverError = 'Test error from server';

    const error = fixture.querySelector('[class="server-error"]');

    expect(error.textContent.trim()).toBe('Test error from server');
  });
});
