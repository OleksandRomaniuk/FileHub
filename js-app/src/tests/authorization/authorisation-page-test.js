import {AuthorisationPage} from '../../authorization/authorisation-page.js';
import {TitleService} from '../../title-service.js';

const {module, test} = QUnit;

module('Authorisation page component', () => {
  test('Should render authorisation page component', function(assert) {
    assert.expect(2);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="authorisation-page"]`);

    assert.strictEqual(element, null, 'Should be null');

     const titleService = new TitleService();

    new AuthorisationPage(fixture, titleService);
    const actualPageMarkup = fixture.querySelector('[data-td="authorisation-page"]');

    assert.ok(actualPageMarkup.getElementsByTagName('form')[0]);
  });
});
