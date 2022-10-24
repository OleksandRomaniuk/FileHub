import {AuthorizationForm} from '../../authorization/authorization-form.js';

const {module, test} = QUnit;

module('authorization-form', () =>{
  test('Should return values of elements in form', async function(assert) {
    assert.expect(7);
    const fixture = document.getElementById('qunit-fixture');
    let form = fixture.querySelectorAll('form');
    assert.strictEqual(form.length, 0, 'Should return 0.');
    new AuthorizationForm(fixture);
    form = fixture.querySelectorAll('form');
    assert.strictEqual(form.length, 1, 'Should return 1.');

    const inputs = form[0].querySelectorAll('input');
    assert.strictEqual(inputs.length, 2, 'Should return count of inputs in form: 2.');
    assert.strictEqual(inputs[0].name, 'email', 'Should return cname of the second input in the form.');
    assert.strictEqual(inputs[1].name, 'password', 'Should return cname of the second input in the form.');
    const buttonText = form[0].querySelector('button').innerText;
    assert.strictEqual(buttonText, 'Sign in', 'Should return title of the button: Sign in.');
    const textLink = form[0].querySelector('a').innerText;
    assert.strictEqual(textLink, 'Don\'t have an account yet?', 'Should return text of link.');
  });
  test('setValueForInputs', async function(assert) {
    assert.expect(2);
    const fixture = document.getElementById('qunit-fixture');
    new AuthorizationForm(fixture);
    const form = fixture.querySelectorAll('form');
    const inputs = form[0].querySelectorAll('input');
    inputs[0].value ='email@dgvzds.hg';
    inputs[1].value ='password';
    const inputsFromDocument = fixture.querySelectorAll('input');
    assert.strictEqual(inputsFromDocument[0].value, 'email@dgvzds.hg', 'Should return value of the input for email.');
    assert.strictEqual(inputsFromDocument[1].value, 'password', 'Should return value of the input for password.');
  });
  [
    ['emai', 'pasw', 'have to be more than 5', 'have to be more than 6', false],
    ['em@#ai', 'p', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 6', false],
    ['@#ai', 'p', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 6',
      true, 'have to be more than 5'],
  ].forEach(([email, password, textErrorEmail,
    textErrorPassword, secondErrorEmail, secondTextErrorEmail])=>{
    test('validateForm', async function(assert) {
      const done = assert.async();
      assert.expect(3);
      if (secondErrorEmail) {
        assert.expect(4);
      }
      const fixture = document.getElementById('qunit-fixture');
      new AuthorizationForm(fixture);
      const form = fixture.querySelector('form');
      const inputs = form.querySelectorAll('input');
      inputs[0].value = email;
      inputs[1].value = password;
      form.querySelector('button[data-td="button"]').click();

      setTimeout(() => {
        let i = 0;
        const formControls = fixture.querySelectorAll('[data-td="form-control"] p');

        if (!secondErrorEmail) {
          assert.strictEqual(formControls.length, 2, 'Should return count of error texts.');
        } else {
          assert.strictEqual(formControls.length, 3, 'Should return count of error texts.');
        }

        assert.strictEqual(formControls[i++].innerText, textErrorEmail, 'Should return text of error.');
        if (secondErrorEmail) {
          assert.strictEqual(formControls[i++].innerText, secondTextErrorEmail, 'Should return text of error.');
        }
        assert.strictEqual(formControls[i++].innerText, textErrorPassword, 'Should return text of error.');
        done();
      }, 100);
    });
  });
});
