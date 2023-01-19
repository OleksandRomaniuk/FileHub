import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';

/**
 * Reset the state in the {@link StateManagementService}.
 */
export class ResetStateAction extends BaseAction {
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.RESET_STATE );
  }
}
