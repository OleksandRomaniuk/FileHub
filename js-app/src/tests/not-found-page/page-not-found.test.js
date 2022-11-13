import {TitleService} from '../../services/title-service.js';
import {NotFoundPage} from '../../not-found-page/not-found-page.js';


describe('Page not found component', () => {
  let fixture;
  let page;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    const titleService = new TitleService('+', '+');

    titleService.mainTitle = 'FileHub';
    page = new NotFoundPage(fixture, titleService);
  });
  test('Should render page not found component', function() {
    expect.assertions(1);

    const pageMarkup =
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

    expect(fixture.innerHTML).toBe(pageMarkup);
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    page.onNavigateToHome(() => {
      expect(true).toBe(true);
    });

    const link = fixture.querySelector(`[data-td="link"]`).firstElementChild;
    link.click();
  });
});
