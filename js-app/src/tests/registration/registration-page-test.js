import {RegistrationPage} from '../../registration/registration-page.js';
import {TitleService} from '../../title-service.js';

const {module, test} = QUnit;

module('Registration page component', () => {
  test('Should render registration page component', function(assert) {
    assert.expect(3);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="registration-page"]`);

    assert.strictEqual(element, null, 'Should be null');

    const titleService = new TitleService();

    new RegistrationPage(fixture, titleService);
    const actualPageMarkup = fixture.querySelector('[data-td="registration-page"]');

    assert.ok(actualPageMarkup, 'Page should be rendered on the page');
    assert.ok(actualPageMarkup.getElementsByTagName('form')[0]);
  });
});
