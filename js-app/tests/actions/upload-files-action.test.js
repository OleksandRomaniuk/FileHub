import {ApplicationContext} from '../../application/application-context';
import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {registry} from '../../application/registry';
import {UploadFilesAction} from '../../actions/upload-files-action';

describe('UploadFilesAction', () => {
  beforeEach(() => {
    new ApplicationContext();
  });
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(5);
    new ApplicationContext();
    const stateManagementService = registry.getInstance('stateManagementService');
    const folderId = 'testFolderId';
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=>{
        return {
          locationMetaData: {
            folderId: folderId,
          },
        };
      });

    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn( apiService, 'uploadFiles')
      .mockImplementation(async ()=>{});

    const executor = jest.fn(()=>{});
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(async ()=>{});

    const uploadFilesAction = new UploadFilesAction(folderId);
    return uploadFilesAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(2);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_UPLOADING_FILES, {
        folderId: folderId,
      });
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_UPLOADING_FILES, null);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
  test('Should call mutators when server gives data but do not dispatch the LoadFolderContentAction.', ()=> {
    expect.assertions(5);
    new ApplicationContext();
    const stateManagementService = registry.getInstance('stateManagementService');
    const folderId = 'testFolderId';
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=>{
        return {
          locationMetaData: {
            folderId: 'locationId',
          },
        };
      });

    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn( apiService, 'uploadFiles')
      .mockImplementation(async ()=>{});

    const executor = jest.fn(()=>{});
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(async ()=>{});

    const uploadFilesAction = new UploadFilesAction(folderId);
    return uploadFilesAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(2);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_UPLOADING_FILES, {
        folderId: folderId,
      });
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_UPLOADING_FILES, null);
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });
  test('Should call mutators when server return error .', ()=> {
    expect.assertions(5);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn( apiService, 'uploadFiles')
      .mockImplementation(async ()=>{
        throw new Error();
      });

    const executor = jest.fn(()=>{});
    const folderId = 'testFolderId';
    const uploadFilesAction = new UploadFilesAction(folderId);
    return uploadFilesAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_UPLOADING_FILES, {
        folderId: folderId,
      });
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_UPLOADING_FILES_ERROR, {
        folderId: folderId,
      });
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_UPLOADING_FILES, null);
    });
  });
});
