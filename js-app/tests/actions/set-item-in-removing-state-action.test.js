import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {SetItemInRemovingStateAction} from '../../actions/set-item-in-removing-state-action';


describe('SetItemInRemovingStateAction', () => {
  test('Should call mutators.', ()=> {
    expect.assertions(1);

    const executor = jest.fn(()=>{});
    const setItemInRemovingStateAction = new SetItemInRemovingStateAction('item');
    setItemInRemovingStateAction.execute(executor);
    expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE, 'item');
  });
});
