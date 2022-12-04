import {jest} from '@jest/globals';
import {FileListState} from '../../file-list-state/file-list-state.js';

describe('File list state', () => {
  let fixture;
  let stateManagementService;
  let applicationContext;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    stateManagementService = {addStateListener() {}, dispatch() {}, get state() {}};
    applicationContext = {stateManagementService: stateManagementService, apiService: {name: 'apiService'}};
  });

  test('Should call creator with right arguments when loading is true', () => {
    expect.assertions(2);

    const credentials = {isFileListLoading: true,
      fileListError: '',
      folderContent: null,
    };

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    const creatorMock = jest.fn();

    new FileListState(fixture, applicationContext, creatorMock);

    const slot = fixture.querySelector('[data-td="file-list-content"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {isFileListLoading: true,
      errorMessage: '',
      fileListEntities: null});
  });

  test('Should call creator with right arguments when error is occurred', () => {
    expect.assertions(2);

    const credentials = {isFileListLoading: false,
      fileListError: 'Test error',
      folderContent: null,
    };

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    const creatorMock = jest.fn();

    new FileListState(fixture, applicationContext, creatorMock);

    const slot = fixture.querySelector('[data-td="file-list-content"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {isFileListLoading: false,
      errorMessage: 'Test error',
      fileListEntities: null});
  });

  test('Should call creator with right arguments with file list entities', () => {
    expect.assertions(2);

    const credentials = {isFileListLoading: false,
      fileListError: '',
      folderContent: [{name: 'name', size: 'size', type: 'type'}],
    };

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    const creatorMock = jest.fn();

    new FileListState(fixture, applicationContext, creatorMock);

    const slot = fixture.querySelector('[data-td="file-list-content"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {isFileListLoading: false,
      errorMessage: '',
      fileListEntities: [{name: 'name', size: 'size', type: 'type'}]});
  });
});
