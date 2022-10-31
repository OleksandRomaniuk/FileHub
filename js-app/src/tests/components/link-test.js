import {Link} from '../../components/link.js';

const {module, test} = QUnit;

module('Link component', () => {
  test('Should render link component', function(assert) {
    assert.expect(3);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="link"]`);

    assert.strictEqual(element, null, 'Should be null');

    const link = new Link(fixture, 'Link');

    let onClickChecker = false;
    link.onClick(() => {
      onClickChecker = true;
    });

    const renderedLink = fixture.querySelector(`[data-td="link"]`);
    renderedLink.click();

    const linkMarkup =
            `<a href="" title="Link" data-td="link">
            Link
        </a>`;

    assert.strictEqual(fixture.innerHTML, linkMarkup, 'Should be the same markup');
    assert.ok(onClickChecker, 'Variable for submit check must be true');
  });
});
