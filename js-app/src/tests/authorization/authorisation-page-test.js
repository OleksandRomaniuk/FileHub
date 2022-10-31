import {AuthorisationPage} from '../../authorization/authorisation-page.js';

const {module, test} = QUnit;

module('Authorisation page component', () => {
  test('Should render authorisation page component', function(assert) {
    assert.expect(2);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="authorisation-page"]`);

    assert.strictEqual(element, null, 'Should be null');

    new AuthorisationPage(fixture);
    const actualPageMarkup = fixture.querySelector('[data-td="authorisation-page"]');

    assert.ok(actualPageMarkup.getElementsByTagName('form')[0]);
  });
});
