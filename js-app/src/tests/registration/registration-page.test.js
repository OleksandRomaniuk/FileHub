import {RegistrationPage} from '../../registration/registration-page.js';
import {TitleService} from '../../title-service.js';
import {jest} from '@jest/globals';

describe('Registration page component', () => {
  let fixture;
  let page;
  let mockFn;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    const titleService = new TitleService('FileHub', '/');

    page = new RegistrationPage(fixture, titleService);
    mockFn = jest.fn();
  });
  test('Should render registration page component', function() {
    expect.assertions(4);
    const actualPageMarkup = fixture.querySelector('[data-td="registration-page"]');
    const form = actualPageMarkup.getElementsByTagName('form')[0];

    expect(actualPageMarkup).toBeTruthy();
    expect(form).toBeTruthy();
    expect(form.getElementsByTagName('input')).toHaveLength(3);
    expect(document.title).toBe('FileHub / Sign Up');
  });

  test('Should add listener for navigate event', () => {
    expect.assertions(1);

    page.onNavigateToAuthorisation(mockFn);

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
      const confirmPassword = formControls[2].getElementsByTagName('input')[0];

      inputEmail.value = 'artem@gmail';
      inputPassword.value = 'aaaaaaa';
      confirmPassword.value = 'aaaaaaa';


      const formMarkup = fixture.querySelector('[data-td="form"]').firstElementChild.firstElementChild;

      formMarkup.requestSubmit();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
