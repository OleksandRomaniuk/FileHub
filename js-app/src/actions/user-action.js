import {Action} from './action.js';
import {MUTATOR_NAME} from './action-constants.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Action for getting information about user.
 */
export class UserAction extends Action {
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   * @param {ApplicationContext} applicationContext
   * @returns {Promise}
   */
  execute(mutationExecutor, applicationContext) {
    mutationExecutor(MUTATOR_NAME.SET_IS_LOADING_USER, true);

    return applicationContext.apiService.getUser()
        .then((name) => {
          mutationExecutor(MUTATOR_NAME.SET_USERNAME, name);
        })
        .catch((error) => {
          mutationExecutor(MUTATOR_NAME.SET_USER_ERROR, error);
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_IS_LOADING_USER, false);
        });
  }
}
