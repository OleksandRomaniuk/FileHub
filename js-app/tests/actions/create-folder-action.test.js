import {ApplicationContext} from '../../application/application-context';
import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {registry} from '../../application/registry';
import {CreateFolderAction} from '../../actions/create-folder-action';
import {State} from '../../service/state-management/state';
import {LoadFolderContentAction} from '../../actions/load-folder-content-action';

describe('CreateFolderAction', () => {
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(8);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiServiceMock = jest
      .spyOn( apiService, 'createFolder')
      .mockImplementation(async ()=>{});

    const dispatchMock = jest
      .spyOn( stateManagementService, 'dispatch')
      .mockImplementation(async ()=>{});

    jest
      .spyOn( stateManagementService, 'state', 'get')
      .mockImplementation( ()=>{
        return new State({
          locationMetaData: {
            folderId: 'testId',
          },
        });
      });

    const folder = {
      type: 'folder',
      parentId: 'testId',
    };
    const executor = jest.fn(()=>{});
    const createFolderAction = new CreateFolderAction(folder);
    return createFolderAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_NEW_FOLDER, folder);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_NEW_FOLDER, null);
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, false);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(new LoadFolderContentAction('testId'));
    });
  });
  test('Should call mutators when server gives data do not dispatch action .', ()=> {
    expect.assertions(7);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiServiceMock = jest
      .spyOn( apiService, 'createFolder')
      .mockImplementation(async ()=>{});

    const dispatchMock = jest
      .spyOn( stateManagementService, 'dispatch')
      .mockImplementation(async ()=>{});

    jest
      .spyOn( stateManagementService, 'state', 'get')
      .mockImplementation( ()=>{
        return new State({
          locationMetaData: {
            folderId: 'locationMetaDataID',
          },
        });
      });

    const folder = {
      type: 'folder',
      parentId: 'testId',
    };
    const executor = jest.fn(()=>{});
    const createFolderAction = new CreateFolderAction(folder);
    return createFolderAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_NEW_FOLDER, folder);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_NEW_FOLDER, null);
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, false);
      expect(dispatchMock).toHaveBeenCalledTimes(0);
    });
  });
  test('Should call mutators when server returns error.', ()=> {
    expect.assertions(6);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn( apiService, 'createFolder')
      .mockImplementation(async ()=>{
        throw new Error();
      });

    const folder = {
      type: 'folder',
      parentId: 'testId',
    };
    const executor = jest.fn(()=>{});
    const createFolderAction = new CreateFolderAction(folder);
    return createFolderAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(4);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_NEW_FOLDER, folder);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_CREATING_FOLDER_ERROR, new Error());
      expect(executor).toHaveBeenNthCalledWith(4, MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, false);
    });
  });
});
