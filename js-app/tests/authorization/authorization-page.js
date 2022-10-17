import {AuthorizationForm} from '../../authorization/authorization-form.js';

const {module, test} = QUnit;


module('authorization-page', () =>{
  test('Should return form from AuthorizationPage', async function(assert) {
    assert.expect(2);
    const fixture = document.getElementById('qunit-fixture');
    let forms = fixture.querySelectorAll('form[data-td="form"]');
    assert.strictEqual(forms.length, 0, 'Should return 0');
    new AuthorizationForm(fixture);
    forms = fixture.querySelectorAll('form[data-td="form"]');
    assert.strictEqual(forms.length, 1, 'Should return 1');
  });
});
