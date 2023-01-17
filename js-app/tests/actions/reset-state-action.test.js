import {ApplicationContext} from '../../application/application-context';
import {ResetStateAction} from '../../actions/reset-state-action';
import {State} from '../../service/state-management/state';
import {mutators} from '../../service/state-management/constatns/mutators';
describe('ResetStateAction', () => {
  new ApplicationContext();
  test('Should reset values in state.', ()=> {
    expect.assertions(1);
    const resetStateAction = new ResetStateAction();
    let newState;
    const mutationExecutor = (mutatorKey, payload)=>{
      newState = mutators[mutatorKey](initialState, payload);
    };
    const initialState = new State({
      isUserProfileLoading: true,
      isUserProfileError: false,
      userProfile: {
        username: 'alex',
        rootFolderId: 25,
      },
      isFolderInfoLoading: true,
      isFolderInfoError: false,
      folderInfo: null,
    });
    resetStateAction.execute(mutationExecutor);
    expect(newState).toStrictEqual(new State());
  });
});
