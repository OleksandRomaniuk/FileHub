import {AuthorisationPage} from '../../authorization/authorisation-page.js';
import {TitleService} from '../../title-service.js';
import {jest} from '@jest/globals';

describe('Authorisation page component', () => {
  let fixture;
  let page;
  let mockFn;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    const titleService = new TitleService('FileHub', '/');
    page = new AuthorisationPage(fixture, titleService);
    mockFn = jest.fn();
  });

  test('Should render authorisation page component', function() {
    expect.assertions(4);

    const actualPageMarkup = fixture.querySelector('[data-td="authorisation-page"]');
    const form = actualPageMarkup.getElementsByTagName('form')[0];

    expect(actualPageMarkup).toBeTruthy();
    expect(form).toBeTruthy();
    expect(form.getElementsByTagName('input')).toHaveLength(2);
    expect(document.title).toBe('FileHub / Sign In');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    page.onNavigateToRegistration(mockFn);

    const link = fixture.querySelector('[data-td="link"]');
    link.click();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('Should add listener for submit event', () => {
    return new Promise((done) => {
      expect.assertions(1);

      page.onSuccessSubmit(mockFn);

      const formControls = fixture.querySelectorAll('[data-td="form-control"]');

      const inputEmail = formControls[0].getElementsByTagName('input')[0];
      const inputPassword = formControls[1].getElementsByTagName('input')[0];

      inputEmail.value = 'alex@gmail';
      inputPassword.value = 'aaaaaaa';


      const formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;

      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
