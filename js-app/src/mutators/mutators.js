import {MUTATOR_NAME} from '../constants/mutators.js';
import {State} from '../state/state.js';

export const mutators = {
  [MUTATOR_NAME.SET_IS_LOADING_USER]: (state, isLoading) => {
    if (isLoading) {
      return new State({...state, isUserLoading: isLoading, userProfile: null, userError: ''});
    }
    return new State({...state, isUserLoading: isLoading});
  },
  [MUTATOR_NAME.SET_USERPROFILE]: (state, userProfile) => {
    return new State({...state, userProfile: userProfile});
  },
  [MUTATOR_NAME.SET_USER_ERROR]: (state, error) => {
    return new State({...state, userError: error});
  },
  [MUTATOR_NAME.SET_IS_LOADING_BREADCRUMB]: (state, isBreadcrumbLoading) => {
    if (isBreadcrumbLoading) {
      return new State({...state,
        isBreadcrumbLoading: isBreadcrumbLoading,
        currentFolder: null,
        breadcrumbError: ''});
    }
    return new State({...state, isBreadcrumbLoading: isBreadcrumbLoading});
  },
  [MUTATOR_NAME.SET_CURRENT_FOLDER]: (state, currentFolder) => {
    return new State({...state, currentFolder: currentFolder});
  },
  [MUTATOR_NAME.SET_BREADCRUMB_ERROR]: (state, error) => {
    return new State({...state, breadcrumbError: error});
  },
  [MUTATOR_NAME.SET_IS_FILE_LIST_LOADING]: (state, isLoading) => {
    if (isLoading) {
      return new State({...state,
        isFileListLoading: isLoading,
        fileListError: '',
        folderContent: null});
    }
    return new State({...state, isFileListLoading: isLoading});
  },
  [MUTATOR_NAME.SET_FILE_LIST_ERROR]: (state, error) => {
    return new State({...state, fileListError: error});
  },
  [MUTATOR_NAME.SET_FOLDER_CONTENT]: (state, content) => {
    return new State({...state, folderContent: content});
  },
  [MUTATOR_NAME.SET_LOCATION]: (state, location) => {
    return new State({...state, location: location});
  },
  [MUTATOR_NAME.SET_LOCATION_METADATA]: (state, metadata) => {
    return new State({...state, locationMetadata: metadata});
  },
};
