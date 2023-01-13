import {StateManagementService} from '../../../service/state-management/state-management-service.js';
import {ApplicationContext} from '../../../application/application-context.js';
import {mutators, MUTATOR_NAME} from '../../../service/state-management/constatns/mutators.js';
import {BaseAction} from '../../../actions/base-action.js';
import {jest} from '@jest/globals';

describe('StateManagementService', () => {
  test('Should dispatch event for field in state.', () => {
    expect.assertions(1);
    const initialState = {
      isUserProfileLoading: true,
      isUserProfileError: true,
      userProfile: null,
    };
    const stateManagementService = new StateManagementService(mutators, initialState);
    const listener = jest.fn();
    stateManagementService.addStateListener('userProfile', listener);
    stateManagementService.dispatch(new TestAction());
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Should return error on constructor without state', function() {
    expect.assertions(1);
    expect(()=>{
      new StateManagementService({}, undefined);
    }).toThrow(new Error('Initial state is not valid'));
  });

  test('Should return error on constructor without mutators', function() {
    expect.assertions(1);
    expect(()=>{
      new StateManagementService(undefined, {});
    }).toThrow(new Error('Mutators are not valid'));
  });
});

/**
 * Class for testing StateManagementService.
 */
class TestAction extends BaseAction {
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   * @param {ApplicationContext} applicationContext
   */
  execute(mutationExecutor, applicationContext) {
    mutationExecutor(MUTATOR_NAME.SET_USER_PROFILE, {username: 'testName'});
  }
}
