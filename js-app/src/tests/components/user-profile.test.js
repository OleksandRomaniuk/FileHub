import {UserProfile} from '../../user-menu/user-profile.js';
import {StateManagementService} from '../../services/state-management-service.js';
import {jest} from '@jest/globals';

describe('User profile component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render user profile component', async function() {
    expect.assertions(3);

    const stateManagementService = new StateManagementService();

    const listeners = {};

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener) => {
          listeners[fieldName] = listener;
        });

    const userError = {getError() {
      return 'Test error';
    }};

    const credentials = {username: 'User name', userError: userError, isUserLoading: true};

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    new UserProfile(fixture, stateManagementService);

    Object.keys(listeners).forEach((key) => {
      fixture.innerHTML = '';
      listeners[key]();
      switch (key) {
        case 'userError': {
          const errorMessageMarkup =
              `<p class="error-label">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Test error
            </p>`;

          expect(errorMessageMarkup).toBe(fixture.innerHTML);
          break;
        }
        case 'username': {
          const accountNameMarkup =
              `<span class="glyphicon glyphicon-user acc-container" aria-hidden="true">
                    <label class="user-icon">User name</label>
                </span>`;

          expect(accountNameMarkup).toBe(fixture.innerHTML);
          break;
        }
        case 'isUserLoading': {
          const loadingIconMarkup =
              `<span class="glyphicon glyphicon-loader" aria-hidden="true"></span>`;

          expect(loadingIconMarkup).toBe(fixture.innerHTML);
          break;
        }
      }
    });
  });
});
