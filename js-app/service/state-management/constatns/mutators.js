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
  [MUTATOR_NAME.SET_USER_PROFILE]: (state, userProfile) => {
    return {...state, userProfile: userProfile};
  },
  [MUTATOR_NAME.SET_FOLDER_INFO]: (state, folderInfo) => {
    return {...state, folderInfo: folderInfo};
  },
  [MUTATOR_NAME.SET_FOLDER_CONTENT]: (state, folderContent) => {
    return {...state, folderContent: folderContent};
  },
  [MUTATOR_NAME.SET_ERROR_USER_PROFILE]: (state, isUserProfileError) => {
    if (isUserProfileError) {
      return {...state, isUserProfileError: isUserProfileError, userProfile: null};
    }
    return {...state, isUserProfileError: isUserProfileError};
  },
  [MUTATOR_NAME.SET_ERROR_FOLDER_INFO]: (state, isFolderInfoError) => {
    if (isFolderInfoError) {
      return {...state, isFolderInfoError: isFolderInfoError, folderInfo: null};
    }
    return {...state, isFolderInfoError: isFolderInfoError};
  },
  [MUTATOR_NAME.SET_ERROR_FOLDER_CONTENT]: (state, isFolderContentError) => {
    return {...state, isFolderContentError: isFolderContentError};
  },
  [MUTATOR_NAME.SET_LOADING_USER_PROFILE]: (state, isUserProfileLoading) => {
    if (isUserProfileLoading) {
      return {...state, isUserProfileLoading: isUserProfileLoading, userProfile: null, isUserProfileError: false};
    }
    return {...state, isUserProfileLoading: isUserProfileLoading};
  },
  [MUTATOR_NAME.SET_LOADING_FOLDER_INFO]: (state, isFolderInfoLoading) => {
    if (isFolderInfoLoading) {
      return {...state,
        isFolderInfoLoading: isFolderInfoLoading,
        isFolderInfoError: false,
        folderInfo: null,
      };
    }
    return {...state, isFolderInfoLoading: isFolderInfoLoading};
  },
  [MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT]: (state, isFolderContentLoading) => {
    if (isFolderContentLoading) {
      return {...state,
        isFolderContentLoading: isFolderContentLoading,
        folderContent: null,
        isFolderContentError: false,
      };
    }
    return {...state, isFolderContentLoading: isFolderContentLoading};
  },
  [MUTATOR_NAME.SET_LOCATION_METADATA]: (state, locationMetaData) => {
    return {...state, locationMetaData: locationMetaData};
  },
  [MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE]: (state, itemInRemovingState) => {
    return {...state, itemInRemovingState: itemInRemovingState};
  },
  [MUTATOR_NAME.SET_ITEM_BEING_DELETE]: (state, itemBeingDeleted) => {
    return {...state, itemBeingDeleted: itemBeingDeleted};
  },
  [MUTATOR_NAME.SET_REMOVING_ERROR]: (state, removingError) => {
    return {...state, removingError: removingError};
  },
  [MUTATOR_NAME.SET_UPLOADING_FILES]: (state, uploadingFiles) => {
    return {...state, uploadingFiles: uploadingFiles};
  },
  [MUTATOR_NAME.SET_UPLOADING_FILES_ERROR]: (state, fileUploadError) => {
    return {...state, fileUploadError: fileUploadError};
  },
  [MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE]: (state, itemInRenamingState) => {
    return {...state, itemInRenamingState: itemInRenamingState, renamingError: null};
  },
  [MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS]: (state, isRenamingInProgress) => {
    return {...state, isRenamingInProgress: isRenamingInProgress};
  },
  [MUTATOR_NAME.SET_ITEM_RENAMING_ERROR_STATE]: (state, renamingError) => {
    return {...state, renamingError: renamingError};
  },
  [MUTATOR_NAME.SET_NEW_FOLDER]: (state, newFolder) => {
    return {...state, newFolder: newFolder};
  },
  [MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED]: (state, isCreatingFolderInProgress) => {
    return {...state, isCreatingFolderInProgress: isCreatingFolderInProgress};
  },
  [MUTATOR_NAME.SET_CREATING_FOLDER_ERROR]: (state, creatingFolderError) => {
    return {...state, creatingFolderError: creatingFolderError};
  },
  [MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE]: (state, itemInDownloadState) => {
    if (itemInDownloadState) {
      return {...state, itemInDownloadState: itemInDownloadState, downloadError: null};
    }
    return {...state, itemInDownloadState: itemInDownloadState};
  },
  [MUTATOR_NAME.SET_DOWNLOAD_ERROR]: (state, downloadError) => {
    return {...state, downloadError: downloadError};
  },
  [MUTATOR_NAME.RESET_STATE]: () => {
    return new State();
  },
};
