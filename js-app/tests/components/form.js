import {Form} from '../../components/form.js';
import {FormControl} from '../../components/form-control.js';

const {module, test} = QUnit;

module('formComponent', () =>{
  test('Should return values of form', async function(assert) {
    assert.expect(3);
    let forms = document.querySelectorAll('form[data-td="form"]');
    assert.strictEqual(forms.length, 0, 'Should return 0.');
    new Form(document.getElementById('qunit-fixture'), 'Sign up');
    forms = document.querySelectorAll('form[data-td="form"]');
    assert.strictEqual(forms.length, 1, 'Should return 1.');
    const buttonText = forms[0].querySelector('button').innerText;
    assert.strictEqual(buttonText, 'Sign up', 'Should return \'Sign up\'.');
  });

  test('Should return added inputs', async function(assert) {
    assert.expect(6);
    const form = new Form(document.getElementById('qunit-fixture'), 'Sign up');
    let formFromDocument = document.querySelector('form[data-td="form"]');
    let formInputs = formFromDocument.querySelectorAll('input');
    let formLabels = formFromDocument.querySelectorAll('label');
    assert.strictEqual(formInputs.length, 0, 'Should return 0.');
    assert.strictEqual(formLabels.length, 0, 'Should return 0.');
    form.addInput((slot) => {
      new FormControl(slot,
          {
            labelText: 'Email',
            placeholder: 'Email',
            name: 'email',
          });
    });
    formFromDocument = document.querySelector('form[data-td="form"]');
    formInputs = formFromDocument.querySelectorAll('input');
    formLabels = formFromDocument.querySelectorAll('label');

    assert.strictEqual(formInputs.length, 1, 'Should return 1.');
    assert.strictEqual(formLabels.length, 1, 'Should return 1.');

    const placeholder = formInputs[0].placeholder;
    const labelText = formLabels[0].innerText;

    assert.strictEqual(placeholder, 'Email', 'Should return \'Email\'.');
    assert.strictEqual(labelText, 'Email', 'Should return \'Email\'.');
  });

  test('onSubmit', async function(assert) {
    assert.expect(2);
    const form = new Form(document.getElementById('qunit-fixture'), 'Sign up');
    let isSubmitted = false;
    form.onSubmit((formData)=>{
      isSubmitted = !!formData;
    });
    assert.notOk(isSubmitted, 'Should return false isSubmitted .');
    const fixture = document.getElementById('qunit-fixture');
    fixture.querySelector('button[data-td="button"]').click();
    assert.ok(isSubmitted, 'Should return true isSubmitted');
  });
});
