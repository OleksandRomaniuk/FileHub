import {RegistrationForm} from '../../registration/registration-form.js';

const {module, test} = QUnit;

module('Registration form component', () => {
  test('Should render registration form component', function(assert) {
    assert.expect(8);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="form"]`);

    assert.strictEqual(element, null, 'Should be null');

    new RegistrationForm(fixture);

    const actualFormMarkup = fixture.querySelector('[data-td="form"]').firstElementChild;
    const formControls = fixture.querySelectorAll('[data-td="form-control"]');
    const emailInput = formControls[0].getElementsByTagName('input')[0];
    const passwordInput = formControls[1].getElementsByTagName('input')[0];
    const confirmPasswordInput = formControls[2].getElementsByTagName('input')[0];

    assert.ok(actualFormMarkup, 'Form should be rendered on page');
    assert.strictEqual(emailInput.name, 'email-input', 'Should render email-input as email input name');
    assert.strictEqual(emailInput.placeholder, 'Email', 'Should render Email as email input placeholder');
    assert.strictEqual(passwordInput.name, 'pas-input', 'Should render pas-input as password input name');
    assert.strictEqual(passwordInput.placeholder, 'Password', 'Should render Password as password input placeholder');
    assert.strictEqual(confirmPasswordInput.name, 'con-pas-input', 'Should render pas-input as password input name');
    assert.strictEqual(confirmPasswordInput.placeholder, 'Confirm Password',
        'Should render Confirm Password as confirm password input placeholder');
  });
});
