import {ApplicationContext} from '../../application/application-context';
import {LoadUserAction} from '../../actions/load-user-action.js';
import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {registry} from "../../application/registry.js";

describe('UserAction', () => {
  new ApplicationContext();
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(4);
    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn(apiService, 'getUser')
      .mockImplementation(async ()=>{
        return {
          userProfile: {username: 'mockName'},
        };
      });

    const executor = jest.fn(()=>{});
    const userAction = new LoadUserAction();
    return userAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_LOADING_USER_PROFILE, false);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_USER_PROFILE, {username: 'mockName'});
    });
  });
  test('Should call mutators when server returns error.', ()=> {
    expect.assertions(4);
    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn(apiService, 'getUser')
      .mockImplementation(async ()=> {
        throw new Error();
      });

    const executor = jest.fn(()=>{});
    const userAction = new LoadUserAction();
    return userAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);

      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_LOADING_USER_PROFILE, false);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ERROR_USER_PROFILE, true);
    });
  });
});
