import {Button} from '../../components/button.js';

const {module, test} = QUnit;

module('buttonComponent', () =>{
  test('Should return title of button in form', async function(assert) {
    assert.expect(4);
    const fixture = document.getElementById('qunit-fixture');
    let tmpButton = document.querySelectorAll('button[data-td="button"]');
    assert.strictEqual(tmpButton.length, 0, 'Should return 0.');
    const button = new Button(fixture, 'Sign in');
    tmpButton = document.querySelectorAll('button[data-td="button"]');
    const markup = '<button class=\"button primary\" data-td=\"button\" type=\"submit\" title=\"Sign in\">Sign in\n' +
      ' </button>';
    assert.strictEqual(fixture.innerHTML, markup, 'Should return innerHTML.');
    assert.strictEqual(tmpButton.length, 1, 'Should return 1.');
    assert.strictEqual(button.title, 'Sign in', 'Should return title of button.');
  });
});
