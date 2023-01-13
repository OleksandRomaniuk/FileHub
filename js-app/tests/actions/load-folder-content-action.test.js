import {mutators} from '../../service/state-management/constatns/mutators';
import {ApplicationContext} from '../../application/application-context';
import {LoadFolderContentAction} from '../../actions/load-folder-content-action';
import {jest} from '@jest/globals';

describe('LoadFolderContentAction', () => {
  test('Should change values in the state.', ()=> {
    return new Promise((done) => {
      expect.assertions(4);

      const initialState = {
        folderContent: null,
        isFolderContentLoading: true,
        isFolderContentError: false,
      };
      const applicationContext = new ApplicationContext();
      jest
          .spyOn(applicationContext.apiService, 'getFolderContent')
          .mockImplementation(async ()=>{
            return {
              folderContent: {
                items: [
                  {
                    type: 'folder',
                    name: 'Montenegro',
                    size: null,
                    id: '36',
                  },
                ],
              },
            };
          });
      let newState;
      const mutationExecutor = (mutatorKey, payload)=>{
        newState = mutators[mutatorKey](initialState, payload);
      };
      const loadFolderContentAction = new LoadFolderContentAction(applicationContext, '25');
      setTimeout(async ()=>{
        await loadFolderContentAction.execute(mutationExecutor);
        expect(newState.folderContent.items[0].type).toBe('folder');
        expect(newState.folderContent.items[0].name).toBe('Montenegro');
        expect(newState.folderContent.items[0].size).toBeNull();
        expect(newState.folderContent.items[0].id).toBe('36');
        done();
      });
    });
  });
});
