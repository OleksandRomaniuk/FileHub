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
};
