import {RegistrationPage} from '../../registration/registration-page';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../application/application-context';
import {registry} from "../../application/registry.js";

describe('RegistrationPage', () =>{
  let fixture;
  new ApplicationContext();
  const apiService = registry.getInstance('apiService');

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';

    jest
      .spyOn(apiService, 'register')
      .mockImplementation(async () => {});
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
});
