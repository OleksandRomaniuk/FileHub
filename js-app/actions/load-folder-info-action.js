import {BaseAction} from './base-action';
import {inject} from '../application/registry';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';

/**
 * Action to execute loading information about folder and path.
 */
export class LoadFolderInfoAction extends BaseAction {
  @inject apiService;
  #folderId;

  /**
   * @param {string} folderId
   */
  constructor(folderId) {
    super();
    this.#folderId = folderId;
  }
  /**
   * @inheritDoc
   * @param {function(string, object) :void} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_INFO, true);
    return this.apiService.getFolder(this.#folderId)
      .then((body)=>{
        mutationExecutor(MUTATOR_NAME.SET_FOLDER_INFO, body.folderInfo);
      })
      .catch(()=>{
        mutationExecutor(MUTATOR_NAME.SET_ERROR_FOLDER_INFO, true);
      })
      .finally(()=>{
        mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_INFO, false);
      });
  }
}
