import {ApplicationContext} from '../../application/application-context';
import {jest} from '@jest/globals';
import {registry} from '../../application/registry';
import {LogoutAction} from '../../actions/logout-action';

describe('LogoutAction', () => {
  new ApplicationContext();
  test('Should change values in state.', ()=> {
    expect.assertions(1);
    const logoutAction = new LogoutAction();
    const apiService = registry.getInstance('apiService');
    jest
      .spyOn(apiService, 'logout')
      .mockImplementation(async ()=>{});
    const mutationExecutor = ()=>{};
    return expect(logoutAction.execute(mutationExecutor)).resolves.toBeUndefined();
  });
});
