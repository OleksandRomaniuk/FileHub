import {mutators, MUTATOR_NAME} from '../../../../service/state-management/constatns/mutators.js';
import {State} from '../../../../service/state-management/state';


describe('Mutators', () => {
  let state;

  beforeEach(() => {
    state = new State({
      isUserProfileLoading: false,
      isUserProfileError: false,
      userProfile: null,
      isFolderInfoLoading: false,
      isFolderInfoError: false,
      folderInfo: null,
      folderContent: null,
      isFolderContentLoading: false,
      isFolderContentError: false,
    });
  });
  test('Should return new state of field username', () => {
    expect.assertions(2);

    const newState = mutators[MUTATOR_NAME.SET_USER_PROFILE](state, {username: 'Mariia'});
    expect(state.userProfile).toBeNull();
    expect(newState.userProfile.username).toBe('Mariia');
  });
  test('Should return new state of field isUserProfileLoading', () => {
    expect.assertions(2);

    const newState = mutators[MUTATOR_NAME.SET_LOADING_USER_PROFILE](state, true);
    expect(state.isUserProfileLoading).toBe(false);
    expect(newState.isUserProfileLoading).toBe(true);
  });
  test('Should return new state of field isUserProfileError', () => {
    expect.assertions(2);

    const newState = mutators[MUTATOR_NAME.SET_ERROR_USER_PROFILE](state, true);
    expect(state.isUserProfileError).toBe(false);
    expect(newState.isUserProfileError).toBe(true);
  });
  test('Should return new state of field isUserProfileError false', () => {
    expect.assertions(1);
    state = new State({
      isUserProfileLoading: false,
      isUserProfileError: true,
      userProfile: null,
      isFolderInfoLoading: false,
      isFolderInfoError: false,
      folderInfo: null,
      folderContent: null,
      isFolderContentLoading: false,
      isFolderContentError: false,
    });
    const newState = mutators[MUTATOR_NAME.SET_ERROR_USER_PROFILE](state, false);
    expect(newState.isUserProfileError).toBe(false);
  });
  test('Should return new state of field folderInfo', () => {
    expect.assertions(1);
    const newState = mutators[MUTATOR_NAME.SET_FOLDER_INFO](state, {
      name: 'myFolder',
      id: '25',
      parentId: null,
      itemsAmount: 2,
    });
    expect(newState.folderInfo).toStrictEqual({
      name: 'myFolder',
      id: '25',
      parentId: null,
      itemsAmount: 2,
    });
  });
  test('Should return new state of field isFolderInfoError', () => {
    expect.assertions(1);
    const newState = mutators[MUTATOR_NAME.SET_ERROR_FOLDER_INFO](state, true);
    expect(newState.isFolderInfoError).toBe(true);
  });
  test('Should return new state of field isFolderInfoLoading', () => {
    expect.assertions(1);
    const newState = mutators[MUTATOR_NAME.SET_LOADING_FOLDER_INFO](state, true);
    expect(newState.isFolderInfoLoading).toBe(true);
  });
  test('Should return new state of field folderContent', () => {
    expect.assertions(1);
    const folderInfo = {
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'PDF Document',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    };
    const newState = mutators[MUTATOR_NAME.SET_FOLDER_CONTENT](state, folderInfo);
    expect(newState.folderContent).toBe(folderInfo);
  });
  test('Should return new state of field isFolderContentLoading', () => {
    expect.assertions(1);
    const newState = mutators[MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT](state, true);
    expect(newState.isFolderContentLoading).toBe(true);
  });
  test('Should return new state of field isFolderContentError', () => {
    expect.assertions(1);
    const newState = mutators[MUTATOR_NAME.SET_ERROR_FOLDER_CONTENT](state, true);
    expect(newState.isFolderContentError).toBe(true);
  });
  test('Should return new state of field locationMetaData', () => {
    expect.assertions(1);
    const newState = mutators[MUTATOR_NAME.SET_LOCATION_METADATA](state, {folderId: 'testId'});
    expect(newState.locationMetaData).toStrictEqual( {folderId: 'testId'});
  });

  test('Should return new state of field itemBeingDeleted', () => {
    expect.assertions(1);
    const item = {
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: 'folder2',
    };
    const newState = mutators[MUTATOR_NAME.SET_ITEM_BEING_DELETE](state, item);
    expect(newState.itemBeingDeleted).toStrictEqual(item);
  });
  test('Should return new state of field removingError', () => {
    expect.assertions(1);
    const removingError = 'Error message';
    const newState = mutators[MUTATOR_NAME.SET_REMOVING_ERROR](state, removingError);
    expect(newState.removingError).toStrictEqual(removingError);
  });
  test('Should return new state of field fileUploading', () => {
    expect.assertions(1);
    const uploadingFiles = 'testFile';
    const newState = mutators[MUTATOR_NAME.SET_UPLOADING_FILES](state, uploadingFiles);
    expect(newState.uploadingFiles).toStrictEqual(uploadingFiles);
  });
  test('Should return new state of field fileUploadError', () => {
    expect.assertions(1);
    const fileUploadError = 'test';
    const newState = mutators[MUTATOR_NAME.SET_UPLOADING_FILES_ERROR](state, fileUploadError);
    expect(newState.fileUploadError).toStrictEqual(fileUploadError);
  });
  test('Should return new state of field itemInRenamingState', () => {
    expect.assertions(1);
    const itemInRenamingState = 'testItemInRenamingState';
    const newState = mutators[MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE](state, itemInRenamingState);
    expect(newState.itemInRenamingState).toStrictEqual(itemInRenamingState);
  });
  test('Should return new state of field isRenamingInProgress', () => {
    expect.assertions(1);
    const isRenamingInProgress = 'testIsRenamingInProgress';
    const newState = mutators[MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS](state, isRenamingInProgress);
    expect(newState.isRenamingInProgress).toStrictEqual(isRenamingInProgress);
  });
  test('Should return new state of field renamingError', () => {
    expect.assertions(1);
    const renamingError = 'testRenamingErrors';
    const newState = mutators[MUTATOR_NAME.SET_ITEM_RENAMING_ERROR_STATE](state, renamingError);
    expect(newState.renamingError).toStrictEqual(renamingError);
  });
  test('Should return new state of field newFolder', () => {
    expect.assertions(1);
    const newFolder = 'testNewFolder';
    const newState = mutators[MUTATOR_NAME.SET_NEW_FOLDER](state, newFolder);
    expect(newState.newFolder).toStrictEqual(newFolder);
  });
  test('Should return new state of field isCreatingFolderInProgress', () => {
    expect.assertions(1);
    const isCreatingFolderInProgress = true;
    const newState = mutators[MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED](state, isCreatingFolderInProgress);
    expect(newState.isCreatingFolderInProgress).toStrictEqual(isCreatingFolderInProgress);
  });
  test('Should return new state of field creatingFolderError', () => {
    expect.assertions(1);
    const creatingFolderError = 'testError';
    const newState = mutators[MUTATOR_NAME.SET_CREATING_FOLDER_ERROR](state, creatingFolderError);
    expect(newState.creatingFolderError).toStrictEqual(creatingFolderError);
  });
});
