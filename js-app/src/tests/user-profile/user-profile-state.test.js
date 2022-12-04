import {UserProfileState} from '../../user-profile/user-profile-state.js';
import {jest} from '@jest/globals';

describe('User profile state', () => {
  let fixture;
  let stateManagementService;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    stateManagementService = {addStateListener() {}, dispatch() {}};
    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});
  });

  test('Should call creator with right arguments', () => {
    const credentials = {userProfile: {username: 'User name'}, userError: 'User error', isUserLoading: true};

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });
    const creatorMock = jest.fn();


    new UserProfileState(fixture, stateManagementService, creatorMock);

    const slot = fixture.querySelector('[data-td="user-profile"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {username: 'User name',
      isUserLoading: true,
      userError: 'User error'});
  });
});
