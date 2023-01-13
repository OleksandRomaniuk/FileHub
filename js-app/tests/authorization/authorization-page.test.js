import {AuthorizationPage} from '../../authorization/authorization-page';
import {jest} from '@jest/globals';
import {ApiService} from '../../service/api-service';
import {RequestService} from '../../service/request-service';
import {ApplicationContext} from '../../application/application-context';

describe('AuthorizationPage', () =>{
  let fixture;
  const applicationContext = new ApplicationContext();
  const requestService = new RequestService();
  const apiService = new ApiService(requestService);

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';

    jest
        .spyOn(apiService, 'logIn')
        .mockImplementation(async () => {});
  });

  test('Should return form from AuthorizationPage.', ()=> {
    expect.assertions(2);

    new AuthorizationPage(fixture, applicationContext.titleService, apiService);
    const forms = fixture.querySelectorAll('form[data-td="form"]');
    expect(forms.length).toBe(1);
    expect(applicationContext.titleService.getTitle()).toBe('FileHub - Sign in');
  });

  test('Should call NavigateToRegistration.', ()=> {
    expect.assertions(1);
    const page = new AuthorizationPage(fixture, applicationContext.titleService, apiService);
    const mockFn = jest.fn();
    page.onNavigateToRegistration(mockFn);
    const link = fixture.querySelector('a[data-td="link"]');
    link.click();
    expect(mockFn).toHaveBeenCalled();
  });
  test('Should call onSubmit when all data are valid.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const page = new AuthorizationPage(fixture, applicationContext.titleService, apiService);
      const mockFn = jest.fn();
      page.onSubmit(mockFn);
      const inputs = fixture.querySelectorAll('[data-td="form-control"] input');
      inputs[0].value ='email@gfdhbf.com';
      inputs[1].value ='password';

      const button = fixture.querySelector('button[data-td="button"]');
      button.click();
      setTimeout(()=>{
        expect(mockFn).toHaveBeenCalled();
        done();
      });
    });
  });
});
