import {jest} from '@jest/globals';
import {UserInfoWrapper} from '../../../components/wrappers/user-info-wrapper';
import {ApplicationContext} from '../../../application/application-context';
import {BaseAction} from '../../../actions/base-action';
import {MUTATOR_NAME} from '../../../service/state-management/constatns/mutators';
import {State} from '../../../service/state-management/state';

describe('UserInfoWrapper', () => {
  let fixture;
  const eventTarget = new EventTarget();
  let applicationContext;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';

    applicationContext = new ApplicationContext();
  });

  test('Should change markup when get data about userProfile.', ()=> {
    expect.assertions(1);
    jest
        .spyOn(applicationContext.stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener)=> {
          eventTarget.addEventListener(`stateChanged.${fieldName}`,
              (event) => listener(event.detail));
        });
    jest
        .spyOn(applicationContext.stateManagementService, 'dispatch')
        .mockImplementation(()=> {});
    const userInfoWrapper = new UserInfoWrapper(fixture, applicationContext);
    const mockRender = jest
        .spyOn(userInfoWrapper, 'render')
        .mockImplementation(()=>{});

    eventTarget.dispatchEvent(
        new CustomEvent('stateChanged.userProfile',
            {detail: new State({userProfile: 'testName'})},
        ));
    eventTarget.dispatchEvent(
        new CustomEvent('stateChanged.isUserProfileError',
            {detail: new State({error: true})},
        ));
    eventTarget.dispatchEvent(
        new CustomEvent('stateChanged.isUserProfileLoading',
            {detail: new State({isUserProfileLoading: true})},
        ));

    expect(mockRender).toHaveBeenCalledTimes(3);
  });
  test('Should method destroy delete listeners on states.', ()=>{
    expect.assertions(2);
    const applicationContext = new ApplicationContext();
    const userInfoWrapper = new UserInfoWrapper(fixture, applicationContext);
    const mockRender = jest
        .spyOn(userInfoWrapper, 'render')
        .mockImplementation(()=>{});

    applicationContext.stateManagementService.dispatch(new TestSetUserProfileAction('testUserProfile'));

    expect(mockRender).toHaveBeenCalledTimes(1);
    userInfoWrapper.onDestroy();

    applicationContext.stateManagementService.dispatch(new TestSetUserProfileAction('secondTestUserProfile'));

    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});
/**
 * Change field in the state for tests.
 */
class TestSetUserProfileAction extends BaseAction {
  #userProfile;

  /**
   * @param {object} userProfile
   */
  constructor(userProfile) {
    super();
    this.#userProfile = userProfile;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_USER_PROFILE, this.#userProfile);
  }
}

