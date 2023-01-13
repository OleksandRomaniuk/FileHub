import {State} from '../../../service/state-management/state';

describe('State', () => {
  test('Should check fields in the class.', ()=>{
    expect.assertions(4);
    const state = new State({
      isUserProfileLoading: true,
      isUserProfileError: false,
      userProfile: null,
    });
    expect(state.isUserProfileError).toBe(false);
    expect(state.isUserProfileLoading).toBe(true);
    expect(state.userProfile).toBe(null);
    expect(()=>{
      state.userProfile = {username: 'TestName'};
    }).toThrow(Error);
  });
});
