import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {SetNewFolderAction} from '../../actions/set-new-folder-action';

describe('SetNewFolderAction', () => {
  test('Should call mutators with changing metadata.', ()=> {
    return new Promise((done) => {
      expect.assertions(2);
      const executor = jest.fn(()=>{});
      const setNewFolderAction = new SetNewFolderAction({name: 'testId'});
      setNewFolderAction.execute(executor);
      setTimeout(()=>{
        expect(executor).toHaveBeenCalledTimes(1);
        expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_NEW_FOLDER,
          {name: 'testId'});
        done();
      });
    });
  });
});
