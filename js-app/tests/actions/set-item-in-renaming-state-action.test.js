import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {SetItemInRenamingStateAction} from '../../actions/set-item-in-renaming-state-action';

describe('SetItemInRenamingStateAction', () => {
  test('Should call mutators with changing metadata.', ()=> {
    return new Promise((done) => {
      expect.assertions(2);
      const executor = jest.fn(()=>{});
      const item = {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      };
      const setMetadataAction = new SetItemInRenamingStateAction(item);
      setMetadataAction.execute(executor);
      setTimeout(()=>{
        expect(executor).toHaveBeenCalledTimes(1);
        expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, {item: item});
        done();
      });
    });
  });
});
