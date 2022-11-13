import {Link} from '../../components/link.js';


describe('Link component', () => {
  let fixture;
  let link;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    link = new Link(fixture, 'Link');
  });
  test('Should render link component', function() {
    expect.assertions(1);

    const linkMarkup =
            `<a href="" title="Link" data-td="link">
            Link
            <span class="glyphicon " aria-hidden="true"></span>
        </a>`;

    expect(fixture.innerHTML).toBe(linkMarkup);
  });

  test('Should add listener on click event', () => {
    expect.assertions(1);

    link.onClick(() => {
      expect(true).toBe(true);
    });

    const renderedLink = fixture.querySelector(`[data-td="link"]`);
    renderedLink.click();
  });

  test('Should render link with icon', () => {
    expect.assertions(1);

    link.iconClass = 'glyphicon-log-out';

    const linkMarkup =
        `<a href="" title="Link" data-td="link">
            Link
            <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
        </a>`;

    expect(fixture.innerHTML).toBe(linkMarkup);
  });
});
