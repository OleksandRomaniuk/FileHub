import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';

import {inject} from '../application/registry';


export class SearchAction extends BaseAction {
    #folderId;
    #searchName;
    @inject apiService;

    /**
     * @param {string} folderId
     * @param {string} searchName
     */
    constructor(folderId, searchName) {
      super();
      this.#folderId = folderId;
      this.#searchName = searchName;
    }
    /**
     * @inheritDoc
     * @param {Function} mutationExecutor
     */
    execute(mutationExecutor) {
      mutationExecutor(MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, true);
      return this.apiService.getFolderContentByName(this.#folderId, this.#searchName)
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
