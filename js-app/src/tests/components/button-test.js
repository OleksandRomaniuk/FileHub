import {Button} from '../../components/button.js';

const {module, test} = QUnit;

module('Button component', () => {
  test('Should render button component', function(assert) {
    assert.expect(4);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="button"]`);

    assert.strictEqual(element, null, 'Should be null');

    new Button(fixture, 'Button');

    const buttonMarkup =
      `<button class="button button-primary" type="submit" title="Button" data-td="button">
            Button
        </button>`;

    const actualButton = fixture.querySelector(`[data-td="button"]`);

    assert.strictEqual(fixture.innerHTML, buttonMarkup, 'Should be the same markup');
    assert.strictEqual(actualButton.innerText, 'Button', 'Should be the same inner text');
    assert.strictEqual(actualButton.title, 'Button', 'Should be the same title');
  });
});
