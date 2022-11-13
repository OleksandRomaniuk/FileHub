import {StateManagementService} from '../../services/state-management-service.js';
import {ApplicationContext} from '../../application-context.js';
import {UserAction} from '../../actions/user-action.js';
import {jest} from '@jest/globals';

describe('State management service', () => {
  let stateManagementService;
  let action;
  let mutators;
  let applicationContext;
  const mutatorName = 'test-value';

  beforeEach(() => {
    mutators = {
      [mutatorName]: (state, value) => {
        return {...state, value: value};
      },
    };

    const state = {
      value: null,
    };

    applicationContext = new ApplicationContext();

    stateManagementService = new StateManagementService(mutators, state, applicationContext);

    action = new UserAction();
  });

  test('Should call listener one time without dispatching event', () => {
    expect.assertions(2);

    const listener = jest.fn();

    stateManagementService.addStateListener('value', listener);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({'value': null});
  });

  test('Should return frozen state on getter', () => {
    expect.assertions(1);

    expect(Object.isFrozen(stateManagementService.state)).toBe(true);
  });

  test('Should dispatch action and change state', () => {
    const executeMock = jest.spyOn(action, 'execute')
        .mockImplementation((mutationExecutor) => {
          mutationExecutor(mutatorName, 'value');
        });

    expect.assertions(3);

    const listener = jest.fn();

    stateManagementService.addStateListener('value', listener);

    stateManagementService.dispatch(action);

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(stateManagementService.state).toEqual({'value': 'value'});
  });
});
