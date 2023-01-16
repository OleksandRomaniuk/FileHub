import {ApplicationContext} from '../../application/application-context';
import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {registry} from '../../application/registry';
import {EditItemAction} from '../../actions/edit-item-action';
import {State} from '../../service/state-management/state';

describe('EditItemAction', () => {
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(7);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiServiceMock = jest
      .spyOn( apiService, 'rename')
      .mockImplementation(async ()=>{});
    jest
      .spyOn( stateManagementService, 'state', 'get')
      .mockImplementation( ()=>{
        return new State({
          locationMetaData: {
            folderId: 'testFolderId',
          },
        });
      });
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(async ()=>{});
    const item = {
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: 'folder2',
      parentId: 'testFolderId',
    };
    const executor = jest.fn(()=>{});
    const editItemAction = new EditItemAction(item);
    return editItemAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, {item: item});
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, null);
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, false);
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
  test('Should call mutators when server gives data but do not dispatch LoadFolderContentAction.', ()=> {
    expect.assertions(7);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiServiceMock = jest
      .spyOn( apiService, 'rename')
      .mockImplementation(async ()=>{});
    jest
      .spyOn( stateManagementService, 'state', 'get')
      .mockImplementation( ()=>{
        return new State({
          locationMetaData: {
            folderId: 'testFolderId',
          },
        });
      });
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation( ()=>{});
    const item = {
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: 'folder2',
      parentId: 'secondId',
    };
    const executor = jest.fn(()=>{});
    const editItemAction = new EditItemAction(item);
    return editItemAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, {item: item});
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, null);
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, false);
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });
  test('Should call mutators when server returns error.', ()=> {
    expect.assertions(6);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiServiceMock = jest
      .spyOn( apiService, 'rename')
      .mockImplementation(async ()=>{
        throw new Error();
      });
    jest
      .spyOn( stateManagementService, 'state', 'get')
      .mockImplementation(async ()=>{
        return new State({
          locationMetaData: {
            folderId: 'testFolderId',
          },
        });
      });
    jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(async ()=>{});
    const executor = jest.fn(()=>{});
    const editItemAction = new EditItemAction();
    return editItemAction.execute(executor).then((item)=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, {item: item});
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_ITEM_RENAMING_ERROR_STATE, new Error());
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, false);
    });
  });
});
