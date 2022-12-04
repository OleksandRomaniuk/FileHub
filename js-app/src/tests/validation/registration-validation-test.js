import {RegistrationForm} from '../../registration/registration-form.js';

const {module, test} = QUnit;

module('registrationFormValidation', (hooks) => {
  let fixture;
  let form;
  let inputPassword;
  let inputEmail;
  let inputConfirm;

  hooks.beforeEach((assert) => {
    assert.ok(true, 'beforeEach called');
    fixture = document.getElementById('qunit-fixture');

    new RegistrationForm(fixture);

    const formControls = fixture.querySelectorAll('[data-td="form-control"]');

    form = fixture.firstElementChild.firstElementChild;
    inputEmail = formControls[0].getElementsByTagName('input')[0];
    inputPassword = formControls[1].getElementsByTagName('input')[0];
    inputConfirm = formControls[2].getElementsByTagName('input')[0];
  });

  test('Should show 4 errors while inputs are empty', async function(assert) {
    assert.expect(2);
    const done = assert.async();

    form.requestSubmit();

    setTimeout(() => {
      const errors = fixture.querySelectorAll('[data-td="error-messages"]');
      assert.strictEqual(errors.length, 4, `Should show ${errors.length} errors`);
      done();
    }, 100);
  });

  test('Should clear errors in registration form', async function(assert) {
    assert.expect(8);
    const done = assert.async();

    inputPassword.value = 'asd';
    inputEmail.value = '%@g';
    inputConfirm.value = 'asds';

    form.requestSubmit();

    const errorMessages = ['Text must be more than 5 symbols', 'Field is not valid',
      'Text must be more than 6 symbols', 'Text must be more than 6 symbols', 'asd is not equal to asds'];

    setTimeout(() => {
      let errors = fixture.querySelectorAll('[data-td="error-messages"]');
      assert.strictEqual(errors.length, errorMessages.length, 'Should have same amount of errors');
      for (let i = 0; i < errorMessages.length; i++) {
        assert.strictEqual(errors[i].textContent, errorMessages[i],
            'Should show length validation error under password input.');
      }

      inputEmail.value = 'artem@g';
      inputPassword.value = 'asdasdasd';
      inputConfirm.value = 'asdasdasd';

      form = fixture.firstElementChild.firstElementChild;

      form.requestSubmit();

      form = fixture.firstElementChild.firstElementChild;

      setTimeout(() => {
        errors = form.querySelectorAll('[data-td="error-messages"]');
        assert.strictEqual(errors.length, 0, 'Should be no errors in form');
        done();
      });
    }, 100);
  });

  [['%%%@g', 'password', 'password', ['Field is not valid']],
  ['%@g', 'password', 'password',['Text must be more than 5 symbols', 'Field is not valid']],
  ['alex@g', 'passw', 'password', ['Text must be more than 6 symbols', 'passw is not equal to password']],
  ['alex@g', 'passphrases', 'password', ['passphrases is not equal to password']],
  ['a@g', 'passphrases', 'password', ['Text must be more than 5 symbols', 'passphrases is not equal to password']],
  ['%@g', 'passphrases', 'password', ['Text must be more than 5 symbols', 'Field is not valid', 'passphrases is not equal to password']],
  ['%@g', 'pas', 'password', ['Text must be more than 5 symbols', 'Field is not valid', 'Text must be more than 6 symbols', 'pas is not equal to password']],
  ].forEach(([email, password, confirm, errorMessages]) => {
    test(`Registration validation with args - Email: ${email}, password: ${password},
      confirm password: ${confirm}`, async function(assert) {
      assert.expect(errorMessages.length + 2);
      const done = assert.async();

      inputEmail.value = email;
      inputPassword.value = password;
      inputConfirm.value = confirm;

      fixture = document.getElementById('qunit-fixture');

      form.requestSubmit();

      setTimeout(() => {
        const errors = [...fixture.querySelectorAll('[data-td="error-messages"]')];
        assert.strictEqual(errors.length, errorMessages.length, 'Should have same amount of errors');
        for (let i = 0; i < errorMessages.length; i++) {
          assert.strictEqual(errors[i].textContent, errorMessages[i],
              'Should show length validation error under password input.');
        }
        done();
      }, 100);
    });
  });
});
