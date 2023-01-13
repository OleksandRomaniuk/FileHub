import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {ApplicationContext} from '../application/application-context';

/**
 * Action to execute loading information about files and folders in the folder.
 */
export class LoadFolderContentAction extends BaseAction {
  #applicationContext;
  #folderId;

  /**
   * @param {ApplicationContext} applicationContext
   * @param {string} folderId
   */
  constructor(applicationContext, folderId) {
    super();
    this.#applicationContext = applicationContext;
    this.#folderId = folderId;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, true);

    this.#applicationContext.apiService.getFolderContent(this.#folderId)
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
