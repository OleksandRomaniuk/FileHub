import {AuthorisationForm} from '../../authorization/authorisation-form.js';
import {jest} from '@jest/globals';

describe('Authorisation form component', () => {
  let fixture;
  let form;
  let formMarkup;
  let formControls;
  let email;
  let password;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    form = new AuthorisationForm(fixture);
    formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild;
    formControls = fixture.querySelectorAll('[data-td="form-control"]');

    email = formControls[0].getElementsByTagName('input')[0];
    password = formControls[1].getElementsByTagName('input')[0];
  });
  test('Should render authorisation form component', function() {
    expect.assertions(5);

    const formControls = fixture.querySelectorAll('[data-td="form-control"]');
    const emailInput = formControls[0].getElementsByTagName('input')[0];
    const passwordInput = formControls[1].getElementsByTagName('input')[0];

    expect(formMarkup).toBeTruthy();
    expect(emailInput.name).toBe('email');
    expect(emailInput.placeholder).toBe('Email');
    expect(passwordInput.name).toBe('password');
    expect(passwordInput.placeholder).toBe('Password');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    const navigateListener = jest.fn(() => {});

    form.onNavigateToRegistration(() => {
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
    formMarkup.requestSubmit();

    setTimeout(() => {
      expect(submitListener).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('Should show 3 errors in authorisation form while inputs are empty', function(done) {
    expect.assertions(1);

    formMarkup.requestSubmit();

    setTimeout(() => {
      const errors = fixture.querySelectorAll('[data-td="error-messages"]');
      expect(errors.length).toBe(3);
      done();
    }, 100);
  });

  test('Should clear errors in authorisation form', function(done) {
    expect.assertions(5);

    email.value = '%@g';
    password.value = 'asd';

    formMarkup.requestSubmit();

    setTimeout(() => {
      let errors = fixture.querySelectorAll('[data-td="error-messages"]');
      expect(errors.length).toBe(3);
      expect(errors[0].textContent).toBe('Text must be more than 5 symbols');
      expect(errors[1].textContent).toBe('Field is not valid');
      expect(errors[2].textContent).toBe('Text must be more than 6 symbols');

      password.value = 'asdasdasd';
      email.value = 'artem@g';

      formMarkup.requestSubmit();

      setTimeout(() => {
        errors = fixture.querySelectorAll('[data-td="error-messages"]');
        expect(errors.length).toBe(0);
        done();
      });
    }, 100);
  });

  [
    ['%@g', 'pas',
      ['Text must be more than 5 symbols', 'Field is not valid',
        'Text must be more than 6 symbols'],
    ],
    ['artem@g', 'asdasdasd',
      [],
    ],
    ['%@g', 'asdasdasd',
      ['Text must be more than 5 symbols', 'Field is not valid'],
    ],
    ['aaa%%%@g', 'asdasdasd',
      ['Field is not valid'],
    ],
    ['artem@gmail.com', 'asd',
      ['Text must be more than 6 symbols'],
    ],
  ].forEach(([emailValue, passwordValue, errorMessages]) => {
    test(`Authorisation validation with args - Email: ${emailValue}, password: ${passwordValue}`, function(done) {
      expect.assertions(errorMessages.length + 1);

      email.value = emailValue;
      password.value = passwordValue;

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

  test(`Should render server error.`, function() {
    expect.assertions(1);

    form.serverError = 'Test error from server';

    const error = fixture.querySelector('[class="server-error"]');

    expect(error.textContent.trim()).toBe('Test error from server');
  });
});
