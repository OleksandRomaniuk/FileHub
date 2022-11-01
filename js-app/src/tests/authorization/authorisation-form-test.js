import {AuthorisationForm} from '../../authorization/authorisation-form.js';

const {module, test} = QUnit;

module('Authorisation form component', () => {
  test('Should render authorisation form component', function(assert) {
    assert.expect(5);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="form"]`);

    assert.strictEqual(element, null, 'Should be null');

    new AuthorisationForm(fixture);

    const formControls = fixture.querySelectorAll('[data-td="form-control"]');
    const emailInput = formControls[0].getElementsByTagName('input')[0];
    const passwordInput = formControls[1].getElementsByTagName('input')[0];

    assert.strictEqual(emailInput.name, 'email-input', 'Should render email-input as email input name');
    assert.strictEqual(emailInput.placeholder, 'Email', 'Should render Email as email input placeholder');
    assert.strictEqual(passwordInput.name, 'pas-input', 'Should render pas-input as password input name');
    assert.strictEqual(passwordInput.placeholder, 'Password', 'Should render Password as password input placeholder');
  });
});
