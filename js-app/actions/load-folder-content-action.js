import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';

import {inject} from '../application/registry';

/**
 * Action to execute loading information about files and folders in the folder.
 */
export class LoadFolderContentAction extends BaseAction {
  #folderId;
  @inject apiService;

  /**
   * @param {string} folderId
   */
  constructor(folderId) {
    super();
    this.#folderId = folderId;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, true);

    return this.apiService.getFolderContent(this.#folderId)
      .then((body)=>{
        mutationExecutor(MUTATOR_NAME.SET_FOLDER_CONTENT, body.folderContent);
      })
      .catch(()=>{
        mutationExecutor(MUTATOR_NAME.SET_ERROR_FOLDER_CONTENT, true);
      })
      .finally(()=>{
        mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, false);
      });
  }
}
