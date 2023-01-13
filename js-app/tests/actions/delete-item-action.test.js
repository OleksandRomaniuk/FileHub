import {ApplicationContext} from '../../application/application-context';
import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {DeleteItemAction} from '../../actions/delete-item-action';

describe('DeleteItemAction', () => {
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(5);
    const applicationContext = new ApplicationContext();
    const apiServiceMock = jest
        .spyOn(applicationContext.apiService, 'deleteItem')
        .mockImplementation(async ()=>{});

    const executor = jest.fn(()=>{});
    const deleteItemAction = new DeleteItemAction(applicationContext);
    return deleteItemAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_BEING_DELETE, true);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE, null);
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_ITEM_BEING_DELETE, false);
    });
  });
  test('Should call mutators when server returns error.', ()=> {
    expect.assertions(5);
    const applicationContext = new ApplicationContext();
    const apiServiceMock = jest
        .spyOn(applicationContext.apiService, 'deleteItem')
        .mockImplementation(async ()=> {
          throw new Error();
        });

    const executor = jest.fn(()=>{});
    const deleteItemAction = new DeleteItemAction(applicationContext);
    return deleteItemAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);

      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_BEING_DELETE, true);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_REMOVING_ERROR, new Error());
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_ITEM_BEING_DELETE, false);
    });
  });
});
