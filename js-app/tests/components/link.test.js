import {Link} from '../../components/link';
import {jest} from '@jest/globals';

describe('Link', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should return text of link', ()=> {
    expect.assertions(4);

    const link = new Link(fixture, 'Already have an account?');
    const mockFn = jest.fn();
    link.onClick(mockFn);
    const tmpLink = fixture.querySelector('a[data-td="link"]');
    expect(tmpLink).toBeDefined();

    tmpLink.click();
    const markup = '<a href="#" data-td="link" title="Already have an account?">Already have an account?</a>';
    expect(fixture.innerHTML).toEqual(markup);

    expect(tmpLink.innerHTML).toMatch('Already have an account?');
    expect(mockFn).toHaveBeenCalled();
  });
  test('Should add innerHtml', ()=> {
    expect.assertions(1);

    const link = new Link(fixture, 'Already have an account?');
    link.addInnerHTML(' <span class="glyphicon glyphicon-log-out log-out" aria-hidden="true"></span>');
    expect(fixture.innerHTML)
      .toBe('<a href="#" data-td="link" title="Already have an account?">' +
            'Already have an account? ' +
            '<span class="glyphicon glyphicon-log-out log-out" aria-hidden="true"></span></a>');
  });
});
