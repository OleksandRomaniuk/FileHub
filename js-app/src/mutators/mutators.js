import {MUTATOR_NAME} from '../actions/action-constants.js';

export const mutators = {
  [MUTATOR_NAME.SET_IS_LOADING_USER]: (state, isLoading) => {
    return {...state, isUserLoading: isLoading};
  },
  [MUTATOR_NAME.SET_USERNAME]: (state, name) => {
    return {...state, username: name};
  },
  [MUTATOR_NAME.SET_USER_ERROR]: (state, error) => {
    return {...state, userError: error};
  },
};
