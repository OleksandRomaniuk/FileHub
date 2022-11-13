import {AuthorisationForm} from '../../authorization/authorisation-form.js';

const {module, test} = QUnit;

module('authFormValidation', (hooks) => {
  let form;
  let inputPassword;
  let inputEmail;
  let fixture;

  hooks.beforeEach((assert) => {
    assert.ok(true, 'beforeEach called');
    fixture = document.getElementById('qunit-fixture');

    new AuthorisationForm(fixture);

    const formControls = fixture.querySelectorAll('[data-td="form-control"]');

    form = fixture.firstElementChild.firstElementChild;
    inputEmail = formControls[0].getElementsByTagName('input')[0];
    inputPassword = formControls[1].getElementsByTagName('input')[0];
  });

  test('Should show 3 errors in authorisation form while inputs are empty', async function(assert) {
    assert.expect(2);
    const done = assert.async();

    form.requestSubmit();

    setTimeout(() => {
      const errors = fixture.querySelectorAll('[data-td="error-messages"]');
      assert.strictEqual(errors.length, 3, 'Should show 3 errors');
      done();
    }, 100);
  });

  test('Should clear errors in authorisation form', async function(assert) {
    assert.expect(6);
    const done = assert.async();

    inputPassword.value = 'asd';
    inputEmail.value = '%@g';

    form.requestSubmit();

    setTimeout(() => {
      let errors = fixture.querySelectorAll('[data-td="error-messages"]');
      assert.strictEqual(errors.length, 3, 'Should show 3 errors');
      assert.strictEqual(errors[0].textContent, 'Text must be more than 5 symbols',
          'Should show regex validation error under email input.');
      assert.strictEqual(errors[1].textContent, 'Field is not valid',
          'Should show regex validation error under email input.');
      assert.strictEqual(errors[2].textContent, 'Text must be more than 6 symbols',
          'Should show regex validation error under password input.');

      inputPassword.value = 'asdasdasd';
      inputEmail.value = 'artem@g';

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
    ['alex@gmail.com', 'asd',
      ['Text must be more than 6 symbols'],
    ],
  ].forEach(([email, password, errorMessages]) => {
    test(`Authorisation validation with args - Email: ${email}, password: ${password}`, async function(assert) {
      assert.expect(errorMessages.length + 2);
      const done = assert.async();

      inputEmail.value = email;
      inputPassword.value = password;

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
