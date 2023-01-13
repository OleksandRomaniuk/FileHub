import {AuthorizationPage} from '../../authorization/authorization-page';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../application/application-context';
import {registry} from '../../application/registry.js';
import {GeneralServerError} from '../../service/errors/general-server-error.js';

describe('AuthorizationPage', () =>{
  let fixture;
  new ApplicationContext();
  const apiService = registry.getInstance('apiService');

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';

    jest
      .spyOn(apiService, 'logIn')
      .mockImplementation(async () => {});
  });

  test('Should return form from AuthorizationPage.', ()=> {
    expect.assertions(2);

    new AuthorizationPage(fixture);
    const forms = fixture.querySelectorAll('form[data-td="form"]');
    expect(forms.length).toBe(1);
    expect(registry.getInstance('titleService').getTitle()).toBe('FileHub - Sign in');
  });

  test('Should call NavigateToRegistration.', ()=> {
    expect.assertions(1);
    const page = new AuthorizationPage(fixture);
    const mockFn = jest.fn();
    page.onNavigateToRegistration(mockFn);
    const link = fixture.querySelector('a[data-td="link"]');
    link.click();
    expect(mockFn).toHaveBeenCalled();
  });
  test('Should call onSubmit when all data are valid.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const page = new AuthorizationPage(fixture);
      const mockFn = jest.fn();
      page.onSubmit(mockFn);
      const inputs = fixture.querySelectorAll('[data-td="form-control"] input');
      inputs[0].value ='email@gfdhbf.com';
      inputs[1].value ='password';
      const button = fixture.querySelector('[data-td="button"] button');
      button.click();
      setTimeout(()=>{
        expect(mockFn).toHaveBeenCalled();
        done();
      });
    });
  });
  test('Should catch server error after logIn.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      jest
        .spyOn(apiService, 'logIn')
        .mockImplementation(async () => {
          throw new GeneralServerError();
        });
      new AuthorizationPage(fixture);
      const inputs = fixture.querySelectorAll('[data-td="form-control"] input');
      inputs[0].value ='email@gfdhbf.com';
      inputs[1].value ='password';
      const button = fixture.querySelector('[data-td="button"] button');
      button.click();
      setTimeout(()=>{
        const error = fixture.querySelector('p.error-text');
        expect(error).toBeDefined();
        done();
      });
    });
  });
});
