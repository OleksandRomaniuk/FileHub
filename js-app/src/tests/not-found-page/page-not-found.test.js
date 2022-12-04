import {TitleService} from '../../services/title-service.js';
import {NotFoundPage} from '../../not-found-page/not-found-page.js';
import {jest} from '@jest/globals';

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

    const pageMarkup = `
    <div id="notfound">
    <div class="notfound">
        <div class="notfound-bg">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Page Not Found</h2>
        <a href="#">go back</a>
    </div>
</div>

    `;


      expect(fixture.innerHTML).toBe(pageMarkup);
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    const mockFn = jest.fn();

    page.onNavigateToHome(mockFn);

    const link = fixture.querySelector(`[data-td="link"]`).firstElementChild;
    link.click();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
