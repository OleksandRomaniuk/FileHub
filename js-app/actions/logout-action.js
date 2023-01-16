import {BaseAction} from './base-action';
import {inject} from '../application/registry';

export class LogoutAction extends BaseAction {
    @inject apiService;

    /**
     * @inheritDoc
     * @param {Function} mutationExecutor
     */
    execute(mutationExecutor) {
      return this.apiService.logout();
    }
}
