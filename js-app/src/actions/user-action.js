import {Action} from './action.js';
import {ApiService} from '../rest/api-service.js';
import {MUTATOR_NAME} from './action-constants.js';

export class UserAction extends Action {
  #apiService;

  /**
   * @param {ApiService} apiService
   */
  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_IS_LOADING, true);

    return this.#apiService.getUser()
        .then((name) => {
          mutationExecutor(MUTATOR_NAME.SET_NAME, name);
        })
        .catch((error) => {
          mutationExecutor(MUTATOR_NAME.SET_ERROR, error);
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_IS_LOADING, false);
        });
  }
}
