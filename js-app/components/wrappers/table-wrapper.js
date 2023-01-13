import {LoadFolderContentAction} from '../../actions/load-folder-content-action';
import {ApplicationContext} from '../../application/application-context';
import {StateAwareComponent} from '../state-aware-component';

/**
 * The component for changing state in the {@link Table}.
 */
export class TableWrapper extends StateAwareComponent {
  #tableCreator;
  #folderContent;
  #isFolderContentLoading;
  #isFolderContentError;


  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent, applicationContext.stateManagementService);
    this.isFolderContentLoading = this.stateManagementService.state.isFolderContentLoading;
    this.stateManagementService.addStateListener('folderInfo', (state)=>{
      if (state.folderInfo) {
        this.stateManagementService.dispatch(
            new LoadFolderContentAction(applicationContext, state.folderInfo.id));
      }
    });
    this.addStateListener('folderContent', (state) => {
      this.folderContent = state.folderContent;
    });
    this.addStateListener('isFolderContentLoading', (state) => {
      this.isFolderContentLoading = state.isFolderContentLoading;
    });
    this.addStateListener('isFolderContentError', (state) => {
      this.isFolderContentError = state.isFolderContentError;
    });
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('table-wrapper');
    if (this.#tableCreator) {
      return this.#tableCreator(
          slot,
          this.#folderContent,
          this.#isFolderContentLoading,
          this.#isFolderContentError,
      );
    }
  }
  /**
   * @param {object} folderContent
   */
  set folderContent(folderContent) {
    this.#folderContent = folderContent;
    this.render();
  }
  /**
   * @param {boolean} isFolderContentLoading
   */
  set isFolderContentLoading(isFolderContentLoading) {
    this.#isFolderContentLoading = isFolderContentLoading;
    this.render();
  }
  /**
   * @param {boolean} isFolderContentError
   */
  set isFolderContentError(isFolderContentError) {
    this.#isFolderContentError = isFolderContentError;
    this.render();
  }
  /**
   * @param {Function} tableCreator
   */
  set tableCreator(tableCreator) {
    this.#tableCreator = tableCreator;
    this.render();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('table-wrapper')}`;
  }
}
