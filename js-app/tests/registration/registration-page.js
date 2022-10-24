import {RegistrationPage} from '../../registration/registration-page.js';

const {module, test} = QUnit;


module('registration-page', () =>{
  test('Should return form from RegistrationPage', async function(assert) {
    assert.expect(2);
    const fixture = document.getElementById('qunit-fixture');
    let forms = fixture.querySelectorAll('form[data-td="form"]');
    assert.strictEqual(forms.length, 0, 'Should return 0');
    new RegistrationPage(fixture);
    forms = fixture.querySelectorAll('form[data-td="form"]');
    assert.strictEqual(forms.length, 1, 'Should return 1');
  });
});
