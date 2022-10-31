import {NotFoundPage} from '../../not-found-page/not-found-page.js';

const {module, test} = QUnit;

module('Page not found component', () => {
  test('Should render page not found component', function(assert) {
    assert.expect(3);

    const fixture = document.getElementById('qunit-fixture');

    const element = fixture.querySelector(`[data-td="page-not-found"]`);

    assert.strictEqual(element, null, 'Should be null');

    const page = new NotFoundPage(fixture);

    let onNavigateChecker = false;

    page.onNavigateToHome(() => {
      onNavigateChecker = true;
    });

    const link = fixture.querySelector(`[data-td="link"]`).firstElementChild;
    link.click();

    const buttonMarkup =
            `<section class="notFound" data-td="page-not-found">
        <div class="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"\>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"\>
        </div>
        <div class="text">
        <h1>404</h1>
        <h2 class="page-not">PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <p>
            <slot data-td="link"><a href="" title="YES" data-td="link">
            YES
        </a></slot>
        </p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">NO</a>
        </div>
        </section>`;

    assert.strictEqual(fixture.innerHTML, buttonMarkup, 'Should be the same markup');
    assert.ok(onNavigateChecker, 'Variable should be true after link click');
  });
});
