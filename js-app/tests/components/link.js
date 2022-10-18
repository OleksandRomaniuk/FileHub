import {Link} from '../../components/link.js';

const {module, test} = QUnit;

module('linkComponent', () =>{
  test('Should return text of link', async function(assert) {
    assert.expect(4);
    const fixture = document.getElementById('qunit-fixture');
    let tmpLink = document.querySelectorAll('a[data-td="link"]');
    assert.strictEqual(tmpLink.length, 0, 'Should return 0.');
    new Link(fixture, 'Already have an account?');
    tmpLink = document.querySelectorAll('a[data-td="link"]');
    const markup = `<a href="#" data-td="link" title="Already have an account?">
                   Already have an account?
                </a>`;
    assert.strictEqual(fixture.innerHTML, markup, 'Should return innerHTML.');
    assert.strictEqual(tmpLink.length, 1, 'Should return 1.');
    assert.strictEqual(tmpLink[0].innerText, 'Already have an account?', 'Should return text of link.');
  });
});
