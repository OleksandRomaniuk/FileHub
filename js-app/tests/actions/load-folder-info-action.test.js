import {mutators} from '../../service/state-management/constatns/mutators';
import {ApplicationContext} from '../../application/application-context';
import {LoadFolderInfoAction} from '../../actions/load-folder-info-action';
import {jest} from '@jest/globals';
import {registry} from '../../application/registry.js';

describe('LoadFolderInfoAction', () => {
  new ApplicationContext();
  test('Should change values in state.', ()=> {
    return new Promise((done) => {
      expect.assertions(5);

      const initialState = {
        isUserProfileLoading: true,
        isUserProfileError: false,
        userProfile: {
          username: 'Cherhynska',
          rootFolderId: 25,
        },
        isFolderInfoLoading: true,
        isFolderInfoError: false,
        folderInfo: null,
      };

      const apiService = registry.getInstance('apiService');
      jest
        .spyOn(apiService, 'getFolder')
        .mockImplementation(async ()=>{
          return {
            folderInfo: {
              name: 'trip',
              id: '30',
              parentId: '28',
              itemsAmount: '5',
            },
          };
        });
      let newState;
      const mutationExecutor = (mutatorKey, payload)=>{
        newState = mutators[mutatorKey](initialState, payload);
      };
      const loadFolderInfoAction = new LoadFolderInfoAction('25');
      setTimeout(async ()=>{
        await loadFolderInfoAction.execute(mutationExecutor);
        expect(newState.folderInfo.name).toBe('trip');
        expect(newState.folderInfo.id).toBe('30');
        expect(newState.folderInfo.parentId).toBe('28');
        expect(newState.folderInfo.itemsAmount).toBe('5');
        expect(newState.isUserProfileLoading).toBeTruthy();
        done();
      });
    });
  });
});
