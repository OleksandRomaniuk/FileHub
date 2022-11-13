import {Action} from './action.js';
import {ApiService} from '../rest/api-service.js';
import {ACTION_NAME, MUTATOR_NAME} from "./action-constants.js";

export class UserAction extends Action {
  #apiService;

  /**
   * @param {ApiService} apiService
   * @param {{}}payload
   */
  constructor(apiService, payload) {
    super();
    this.#apiService = apiService;
    this.title = ACTION_NAME.GET_USER;
    this.payload = payload;
  }

  execute(mutationExecutor) {
    const {userId} = this.payload;

    mutationExecutor(MUTATOR_NAME.SET_IS_LOADING, true);

    return this.#apiService.getUser(userId)
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
