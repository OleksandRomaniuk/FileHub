import {RegistrationPage} from '../../registration/registration-page';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../application/application-context';
import {registry} from '../../application/registry';
import {GeneralServerError} from '../../service/errors/general-server-error';

describe('RegistrationPage', () =>{
  let fixture;

  beforeEach(() => {
    new ApplicationContext();
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should return form from RegistrationPage', ()=> {
    expect.assertions(1);
    new RegistrationPage(fixture);
    const forms = fixture.querySelectorAll('form[data-td="form"]');
    expect(forms.length).toBe(1);
  });

  test('Should call NavigateToLogin', ()=> {
    expect.assertions(1);
    const page = new RegistrationPage(fixture);
    const apiService = registry.getInstance('apiService');
    jest
      .spyOn(apiService, 'register')
      .mockImplementation(async () => {});
    const mockFn = jest.fn();
    page.onNavigateToLogin(mockFn);
    const link = fixture.querySelector('a[data-td="link"]');
    link.click();
    expect(mockFn).toHaveBeenCalled();
  });

  test('Should call onSubmit when all data are valid.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const page = new RegistrationPage(fixture);
      const apiService = registry.getInstance('apiService');
      jest
        .spyOn(apiService, 'register')
        .mockImplementation(async () => {});
      const mockFn = jest.fn();
      page.onSubmit(mockFn);

      const inputs = fixture.querySelectorAll('[data-td="form-control"] input');
      inputs[0].value ='email@gfdhbf.com';
      inputs[1].value ='password';
      inputs[2].value ='password';
      const button = fixture.querySelector('button[data-td="button"]');
      button.click();

      setTimeout(()=>{
        expect(mockFn).toHaveBeenCalled();
        done();
      });
    });
  });
  test('Should during onSubmit catch GeneralServerError.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      new RegistrationPage(fixture);
      const apiService = registry.getInstance('apiService');
      jest
        .spyOn(apiService, 'register')
        .mockImplementation(async () => {
          throw new GeneralServerError();
        });

      const inputs = fixture.querySelectorAll('[data-td="form-control"] input');
      inputs[0].value ='email@gfdhbf.com';
      inputs[1].value ='password';
      inputs[2].value ='password';
      const button = fixture.querySelector('button[data-td="button"]');
      button.click();

      setTimeout(()=>{
        const error = fixture.querySelector('p.error-text');
        expect(error).toBeDefined();
        done();
      });
    });
  });
  test('Should during onSubmit catch error.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      new RegistrationPage(fixture);
      const apiService = registry.getInstance('apiService');
      jest
        .spyOn(apiService, 'register')
        .mockImplementation(async () => {
          throw new TestError({
            'confirm-password': ['error'],
          });
        });

      const inputs = fixture.querySelectorAll('[data-td="form-control"] input');
      inputs[0].value ='email@gfdhbf.com';
      inputs[1].value ='password';
      inputs[2].value ='password';
      const button = fixture.querySelector('button[data-td="button"]');
      button.click();
      setTimeout(()=>{
        const error = fixture.querySelector('p.error-text');
        expect(error).toBeDefined();
        done();
      });
    });
  });
});

/**
 * Class for testing validation error.
 */
class TestError extends Error {
  error;

  /**
   * @param {object} error
   */
  constructor(error) {
    super();
    this.error = error;
  }
}
