import {ApplicationContext} from '../application-context.js';
import {ApiService} from '../rest/api-service.js';
import {TitleService} from '../services/title-service.js';

describe('Application context', () => {
  test('Should return instance of services', () => {
    const applicationContext = new ApplicationContext();
    expect(applicationContext.apiService).toBeInstanceOf(ApiService);
    expect(applicationContext.titleService).toBeInstanceOf(TitleService);
  });
});
