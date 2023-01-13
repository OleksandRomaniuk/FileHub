import {BaseAction} from './base-action';
import {ApplicationContext} from '../application/application-context';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
/**
 * Action to execute loading information about username.
 */
export class LoadUserAction extends BaseAction {
  #applicationContext;

  /**
   * @param {ApplicationContext} applicationContext
   */
  constructor(applicationContext) {
    super();
    this.#applicationContext = applicationContext;
  }

  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOADING_USER_PROFILE, true);

    return this.#applicationContext.apiService.getUser()
        .then((body) => {
          mutationExecutor(MUTATOR_NAME.SET_USER_PROFILE, body.userProfile);
        })
        .catch(() => {
          mutationExecutor(MUTATOR_NAME.SET_ERROR_USER_PROFILE, true);
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_LOADING_USER_PROFILE, false);
        });
  }
}
