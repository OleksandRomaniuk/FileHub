import {FormControl} from '../../components/form-control.js';

const {module, test} = QUnit;

module('formControlComponent', () => {
  test('Should return values of button', async function(assert) {
    assert.expect(5);
    let formControls = document.querySelectorAll('div[data-td="form-control"]');
    assert.strictEqual(formControls.length, 0, 'Should return 0.');
    new FormControl(document.getElementById('qunit-fixture'),
        {
          labelText: 'Email',
          placeholder: 'Email',
          name: 'email',
        });
    formControls = document.querySelectorAll('div[data-td="form-control"]');
    assert.strictEqual(formControls.length, 1, 'Should return 1.');
    const label = formControls[0].querySelector('label').innerText;
    const placeholder = formControls[0].querySelector('input').placeholder;
    const nameInput = formControls[0].querySelector('input').name;
    assert.strictEqual(label, 'Email', 'Should return "Email".');
    assert.strictEqual(placeholder, 'Email', 'Should return "Email".');
    assert.strictEqual(nameInput, 'email', 'Should return "email".');
  });
});
