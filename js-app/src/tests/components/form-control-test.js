import {FormControl} from '../../components/form-control.js';

const {module, test} = QUnit;

module('Form control component', () => {
  test('Should render form control component', function(assert) {
    assert.expect(6);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="form-control"]`);

    assert.strictEqual(element, null, 'Should be null');

    const formControl = new FormControl(fixture, {
      label: 'Test-label',
      type: 'password',
      placeholder: 'test',
      name: 'test-name',
    });
    formControl.value = 'Password';
    const errors = ['Field is not valid', 'Field is not match regex'];
    formControl.errorMessages = errors;

    const label = fixture.querySelector('[data-td="label"]');
    const input = fixture.querySelector('[data-td="input"]');
    const errorMessages = fixture.querySelectorAll('[data-td="error-messages"]');

    const settedErrors = [];
    errorMessages.forEach((error) => {
      settedErrors.push(error.textContent);
    });

    assert.strictEqual(label.innerText, 'Test-label',
        'Should be the same label text');

    assert.strictEqual(input.type, 'password',
        'Should be the same input type');
    assert.strictEqual(input.placeholder, 'test',
        'Should be the same text inside placeholder');
    assert.strictEqual(input.name, 'test-name',
        'Should be the same input name');

    assert.deepEqual(errors, settedErrors, 'Should set errors');
  });
});
