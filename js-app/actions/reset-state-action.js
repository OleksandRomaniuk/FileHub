import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';


export class ResetStateAction extends BaseAction {

  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.RESET_STATE );
  }
}
