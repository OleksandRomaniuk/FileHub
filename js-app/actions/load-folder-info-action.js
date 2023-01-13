import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {ApplicationContext} from '../application/application-context';

/**
 * Action to execute loading information about folder and path.
 */
export class LoadFolderInfoAction extends BaseAction {
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
   * @param {function(string, object) :void} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_INFO, true);
    this.#applicationContext.apiService.getFolder(this.#folderId)
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
