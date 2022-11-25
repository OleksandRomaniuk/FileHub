import {Component} from '../components/component.js';
import {ApplicationContext} from '../application-context.js';

const FILE_LIST_SLOT = 'file-list-content';

/**
 * File list component that aware of state management service and wraps the component that comes to creator.
 */
export class FileListState extends Component {
  #applicationContext;
  #stateManagementService;
  #creator;
  #isFileListLoading;
  #errorMessage;
  #fileListEntities;

  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   * @param {Function} creator
   */
  constructor(parent, applicationContext, creator) {
    super(parent);
    this.#applicationContext = applicationContext;
    this.#stateManagementService = applicationContext.stateManagementService;
    this.#creator = creator;
    this.init();
  }

  /**
   * @inheritDoc
   */
  init() {
    this.#stateManagementService.addStateListener('isFileListLoading', (state) => {
      if (state.isFileListLoading) {
        this.isFileListLoading = state.isFileListLoading;
      }
    });

    this.#stateManagementService.addStateListener('fileListError', (state) => {
      if (state.fileListError) {
        this.errorMessage = state.fileListError;
      }
    });

    this.#stateManagementService.addStateListener('folderContent', (state) => {
      if (state.folderContent) {
        this.fileListEntities = state.folderContent
            .map((entity) => ({name: entity.name, size: entity.size, type: entity.type, id: entity.id}));
      }
    });
    super.init();
  }

  /**
   * @param {boolean} isFileListLoading
   */
  set isFileListLoading(isFileListLoading) {
    this.#isFileListLoading = isFileListLoading;
    this.#errorMessage = '';
    this.#fileListEntities = null;
    this.render();
  }

  /**
   * @param {string} errorMessage
   */
  set errorMessage(errorMessage) {
    this.#errorMessage = errorMessage;
    this.#fileListEntities = null;
    this.#isFileListLoading = false;
    this.render();
  }

  /**
   * @typedef FileListEntities
   * @property {string} name
   * @property {string} size
   * @property {string} type
   */

  /**
   * @param {FileListEntities[]} fileListEntities
   */
  set fileListEntities(fileListEntities) {
    this.#fileListEntities = fileListEntities;
    this.#isFileListLoading = false;
    this.#errorMessage = '';
    this.render();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot(FILE_LIST_SLOT);
    this.#creator(slot, {errorMessage: this.#errorMessage,
      isFileListLoading: this.#isFileListLoading,
      fileListEntities: this.#fileListEntities});
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot(FILE_LIST_SLOT)}`;
  }
}
