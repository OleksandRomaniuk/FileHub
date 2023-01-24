import {State} from '../state';

export const MUTATOR_NAME = {
  SET_USER_PROFILE: 'userProfile',
  SET_FOLDER_INFO: 'folderInfo',
  SET_FOLDER_CONTENT: 'folderContent',
  SET_LOADING_USER_PROFILE: 'set-loading-user-profile',
  SET_LOADING_FOLDER_INFO: 'set-loading-folder-info',
  SET_LOADING_FOLDER_CONTENT: 'set-loading-folder-content',
  SET_ERROR_USER_PROFILE: 'set-error-user-profile',
  SET_ERROR_FOLDER_INFO: 'set-error-folder-info',
  SET_ERROR_FOLDER_CONTENT: 'set-error-folder-content',
  SET_LOCATION_METADATA: 'set-location-metadata',
  SET_ITEM_IN_REMOVING_STATE: 'set-item-in-removing-state',
  SET_ITEM_BEING_DELETE: 'set-item-being-delete',
  SET_REMOVING_ERROR: 'set-item-removing-error',
  SET_UPLOADING_FILES: 'set-uploading-files',
  SET_UPLOADING_FILES_ERROR: 'set-uploading_files_error',
  SET_ITEM_IN_RENAMING_STATE: 'set-item-in-renaming-state',
  SET_ITEM_IS_RENAMING_IN_PROGRESS: 'set-item-is-renaming-in-progress',
  SET_ITEM_RENAMING_ERROR_STATE: 'set-item-renaming-error-state',
  SET_NEW_FOLDER: 'set-new-folder',
  SET_FOLDER_IS_BEING_CREATED: 'set-folder-is-being-created',
  SET_CREATING_FOLDER_ERROR: 'set-creating_folder_error',
  SET_ITEM_IN_DOWNLOAD_STATE: 'set-item-in-download-state',
  SET_IS_DOWNLOAD_IN_PROGRESS: 'set-is-download-in-progress',
  SET_DOWNLOAD_ERROR: 'set-download-error',
  RESET_STATE: 'reset-state',
};
export const mutators = {
  [MUTATOR_NAME.SET_USER_PROFILE]: (state: State, userProfile: object | null) => {
    return {...state, userProfile: userProfile};
  },
  [MUTATOR_NAME.SET_FOLDER_INFO]: (state: State, folderInfo: object | null) => {
    return {...state, folderInfo: folderInfo};
  },
  [MUTATOR_NAME.SET_FOLDER_CONTENT]: (state: State, folderContent: object | null) => {
    return {...state, folderContent: folderContent};
  },
  [MUTATOR_NAME.SET_ERROR_USER_PROFILE]: (state: State, isUserProfileError: boolean) => {
    if (isUserProfileError) {
      return {...state, isUserProfileError: isUserProfileError, userProfile: null};
    }
    return {...state, isUserProfileError: isUserProfileError};
  },
  [MUTATOR_NAME.SET_ERROR_FOLDER_INFO]: (state: State, isFolderInfoError: boolean) => {
    if (isFolderInfoError) {
      return {...state, isFolderInfoError: isFolderInfoError, folderInfo: null};
    }
    return {...state, isFolderInfoError: isFolderInfoError};
  },
  [MUTATOR_NAME.SET_ERROR_FOLDER_CONTENT]: (state: State, isFolderContentError: boolean) => {
    return {...state, isFolderContentError: isFolderContentError};
  },
  [MUTATOR_NAME.SET_LOADING_USER_PROFILE]: (state: State, isUserProfileLoading: boolean) => {
    if (isUserProfileLoading) {
      return {...state, isUserProfileLoading: isUserProfileLoading, userProfile: null, isUserProfileError: false};
    }
    return {...state, isUserProfileLoading: isUserProfileLoading};
  },
  [MUTATOR_NAME.SET_LOADING_FOLDER_INFO]: (state: State, isFolderInfoLoading: boolean) => {
    if (isFolderInfoLoading) {
      return {...state,
        isFolderInfoLoading: isFolderInfoLoading,
        isFolderInfoError: false,
        folderInfo: null,
      };
    }
    return {...state, isFolderInfoLoading: isFolderInfoLoading};
  },
  [MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT]: (state: State, isFolderContentLoading: boolean) => {
    if (isFolderContentLoading) {
      return {...state,
        isFolderContentLoading: isFolderContentLoading,
        folderContent: null,
        isFolderContentError: false,
      };
    }
    return {...state, isFolderContentLoading: isFolderContentLoading};
  },
  [MUTATOR_NAME.SET_LOCATION_METADATA]: (state: State, locationMetaData: object | null) => {
    return {...state, locationMetaData: locationMetaData};
  },
  [MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE]: (state: State, itemInRemovingState: object | null) => {
    return {...state, itemInRemovingState: itemInRemovingState};
  },
  [MUTATOR_NAME.SET_ITEM_BEING_DELETE]: (state: State, itemBeingDeleted: object | null) => {
    return {...state, itemBeingDeleted: itemBeingDeleted};
  },
  [MUTATOR_NAME.SET_REMOVING_ERROR]: (state: State, removingError: object | null) => {
    return {...state, removingError: removingError};
  },
  [MUTATOR_NAME.SET_UPLOADING_FILES]: (state: State, uploadingFiles: object | null) => {
    return {...state, uploadingFiles: uploadingFiles};
  },
  [MUTATOR_NAME.SET_UPLOADING_FILES_ERROR]: (state: State, fileUploadError: object | null) => {
    return {...state, fileUploadError: fileUploadError};
  },
  [MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE]: (state: State, itemInRenamingState: object | null) => {
    return {...state, itemInRenamingState: itemInRenamingState, renamingError: null};
  },
  [MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS]: (state: State, isRenamingInProgress: boolean) => {
    return {...state, isRenamingInProgress: isRenamingInProgress};
  },
  [MUTATOR_NAME.SET_ITEM_RENAMING_ERROR_STATE]: (state: State, renamingError: object | null) => {
    return {...state, renamingError: renamingError};
  },
  [MUTATOR_NAME.SET_NEW_FOLDER]: (state: State, newFolder: object | null) => {
    return {...state, newFolder: newFolder};
  },
  [MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED]: (state: State, isCreatingFolderInProgress: boolean) => {
    return {...state, isCreatingFolderInProgress: isCreatingFolderInProgress};
  },
  [MUTATOR_NAME.SET_CREATING_FOLDER_ERROR]: (state: State, creatingFolderError: object | null) => {
    return {...state, creatingFolderError: creatingFolderError};
  },
  [MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE]: (state: State, itemInDownloadState: object | null) => {
    if (itemInDownloadState) {
      return {...state, itemInDownloadState: itemInDownloadState, downloadError: null};
    }
    return {...state, itemInDownloadState: itemInDownloadState};
  },
  [MUTATOR_NAME.SET_DOWNLOAD_ERROR]: (state: State, downloadError: object | null) => {
    return {...state, downloadError: downloadError};
  },
  [MUTATOR_NAME.RESET_STATE]: () => {
    return new State();
  },
};
