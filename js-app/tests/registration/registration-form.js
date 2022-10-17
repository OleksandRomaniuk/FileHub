import {RegistrationForm} from '../../registration/registration-form.js';


const {module, test} = QUnit;

module('registration-form', () =>{
  test('Should return values of elements in form', async function(assert) {
    assert.expect(8);
    const fixture = document.getElementById('qunit-fixture');
    let form = fixture.querySelectorAll('form');
    assert.strictEqual(form.length, 0, 'Should return 0.');
    new RegistrationForm(fixture);
    form = fixture.querySelectorAll('form');
    assert.strictEqual(form.length, 1, 'Should return 1.');

    const inputs = form[0].querySelectorAll('input');
    assert.strictEqual(inputs.length, 3, 'Should return count of inputs in form: 3.');
    assert.strictEqual(inputs[0].name, 'email', 'Should return cname of the second input in the form.');
    assert.strictEqual(inputs[1].name, 'password', 'Should return cname of the second input in the form.');
    assert.strictEqual(inputs[2].name, 'confirm-password', 'Should return cname of the third input in the form.');
    const buttonText = form[0].querySelector('button').innerText;
    assert.strictEqual(buttonText, 'Sign up', 'Should return title of the button: Sign up.');
    const textLink = form[0].querySelector('a').innerText;
    assert.strictEqual(textLink, 'Don\'t have an account yet?', 'Should return text of link.');
  });
  test('setValueForInputs', async function(assert) {
    assert.expect(3);
    const fixture = document.getElementById('qunit-fixture');
    new RegistrationForm(fixture);
    const form = fixture.querySelectorAll('form');
    const inputs = form[0].querySelectorAll('input');
    inputs[0].value ='email@dgvzds.hg';
    inputs[1].value ='password';
    inputs[2].value ='cobfbpassword';
    const inputsFromDocument = fixture.querySelectorAll('input');
    assert.strictEqual(inputsFromDocument[0].value, 'email@dgvzds.hg', 'Should return value of the input for email.');
    assert.strictEqual(inputsFromDocument[1].value, 'password', 'Should return value of the input for password.');
    assert.strictEqual(inputsFromDocument[2].value, 'cobfbpassword',
        'Should return value of the input for confirm-password.');
  });

  [
    ['emai', 'pasw', 'pas', 3, 'have to be more than 5', 'have to be more than 6', 'Passwords aren\'t equals', false],
    ['em@#ai', 'p', 'er', 3, 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 6',
      'Passwords aren\'t equals', false],
  ].forEach(([email, password, confirmPassword, countError, textErrorEmail,
    textErrorPassword, textErrorConfirmPassword, isSecondErrorEmail,
    secondTextErrorEmail])=>{
    test('validateForm', async function(assert) {
      const done = assert.async();
      assert.expect(4);
      if (isSecondErrorEmail) {
        assert.expect(5);
      }
      const fixture = document.getElementById('qunit-fixture');
      new RegistrationForm(fixture);
      const form = fixture.querySelector('form');
      const inputs = form.querySelectorAll('input');
      inputs[0].value = email;
      inputs[1].value = password;
      inputs[2].value = confirmPassword;
      form.querySelector('button[data-td="button"]').click();

      setTimeout(() => {
        let i = 0;
        const formControls = form.querySelectorAll('[data-td="form-control"] p');
        assert.strictEqual(formControls.length, countError, 'Should return count of error texts.');
        assert.strictEqual(formControls[i++].innerText, textErrorEmail, 'Should return text of error.');
        if (isSecondErrorEmail) {
          assert.strictEqual(formControls[i++].innerText, secondTextErrorEmail, 'Should return text of error.');
        }
        assert.strictEqual(formControls[i++].innerText, textErrorPassword, 'Should return text of error.');
        assert.strictEqual(formControls[i++].innerText, textErrorConfirmPassword, 'Should return text of error.');
        done();
      }, 100);
    });
  });
});
