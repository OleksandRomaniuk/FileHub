import {MUTATOR_NAME} from "../actions/action-constants.js";

export const mutators = {
    [MUTATOR_NAME.SET_IS_LOADING]: (state, isLoading) => {
        state.isLoading = isLoading;
    },
    [MUTATOR_NAME.SET_NAME]: (state, name) => {
        state.track = name;
    },
    [MUTATOR_NAME.SET_ERROR]: (state, error) => {
        state.error = error;
    }
};
