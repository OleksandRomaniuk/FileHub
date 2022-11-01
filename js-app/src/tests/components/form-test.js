import {Form} from '../../components/form.js';
import {FormControl} from '../../components/form-control.js';
import {Link} from '../../components/link.js';

const {module, test} = QUnit;

module('Form component', () => {
  test('Should render form component', function(assert) {
    assert.expect(7);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="form"]`);

    assert.strictEqual(element, null, 'Should be null');

    const form = new Form(fixture, 'ButtonText');
    form.addInput((slot) => {
      new FormControl(slot, {
        label: 'Test',
        inputName: 'Test',
        inputPlaceHolder: 'Test',
      });
    });
    form.addFooter((slot) => {
      new Link(slot, 'LinkText');
    });

    let onSubmitCheck = false;
    form.onSubmit(() => {
      onSubmitCheck = true;
    });
    const actualFormMarkup = fixture.querySelector('[data-td="form"]');
    actualFormMarkup.requestSubmit();

    const button = fixture.querySelector('[data-td="button"]');
    const link = fixture.querySelector('[data-td="link"]');
    const actualFormControl = fixture.querySelector('[data-td="form-control"]');

    assert.ok(actualFormMarkup, 'Form should be rendered on page');
    assert.strictEqual(button.innerText, 'ButtonText', 'Should be the same button text');
    assert.strictEqual(button.firstElementChild.title, 'ButtonText', 'Should be the same button title');
    assert.strictEqual(link.innerText, 'LinkText', 'Should be the same link text');
    assert.ok(actualFormControl, 'Form control should be in form');
    assert.ok(onSubmitCheck, 'Should change ');
  });
});
