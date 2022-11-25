import {Action} from './action.js';
import {MUTATOR_NAME} from '../constants/mutators.js';
import {ApiService} from '../rest/api-service.js';
import {UserModel} from '../state/user-model.js';

/**
 * Action for getting information about user.
 */
export class UserAction extends Action {
  #apiService;

  /**
   * @param {ApiService} apiService
   */
  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   * @returns {Promise}
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_IS_LOADING_USER, true);

    return this.#apiService.getUser()
        .then((userProfile) => {
          mutationExecutor(MUTATOR_NAME.SET_USERPROFILE, new UserModel(userProfile));
        })
        .catch((error) => {
          mutationExecutor(MUTATOR_NAME.SET_USER_ERROR, error.getError());
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_IS_LOADING_USER, false);
        });
  }
}
