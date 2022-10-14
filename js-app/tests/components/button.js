import {Button} from '../../components/button.js';

const {module, test} = QUnit;

module('buttonComponent', () =>{
  test('Should return title of button in form', async function(assert) {
    assert.expect(3);
    let tmpButton = document.querySelectorAll('button[data-td="button"]');
    assert.strictEqual(tmpButton.length, 0, 'Should return 0.');
    const button = new Button(document.getElementById('qunit-fixture'), 'Sign in');
    tmpButton = document.querySelectorAll('button[data-td="button"]');
    assert.strictEqual(tmpButton.length, 1, 'Should return 1.');
    assert.strictEqual(button.title, 'Sign in', 'Should return title of button.');
  });
});
