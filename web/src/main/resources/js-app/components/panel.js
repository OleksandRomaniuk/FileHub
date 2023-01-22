import {Component} from './component';
import {ButtonPanel} from './button-panel';
import {Button} from './button';

const UPLOAD_EVENT = 'upload_event';
const CREATE_FOLDER_EVENT = 'create-folder-event';
const SEARCH_EVENT = 'search-event';
/**
 * The component to generate panel.
 */
export class Panel extends Component {
    #submitTarget = new EventTarget();

    #isLoadingUpload;
    #fileUploadError;

    /**
     * @param {HTMLElement} parent
     * @param {boolean} isLoadingUpload
     * @param {string} fileUploadError
     */
    constructor(parent,
      isLoadingUpload,
      fileUploadError,
    ) {
      super(parent);
      this.#isLoadingUpload = isLoadingUpload;
      this.#fileUploadError = fileUploadError;
      this.init();
    }
    /**
     * @inheritDoc
     */
    afterRender() {
      const searchButton = new Button(
        this.getSlot('button-search'),
        'Search',
        'Search',
      );
      searchButton.onClick(()=>{
        const input = this.rootElement.querySelector('input.input-text.search');
        const value = input.value.trim();
        if (value.length > 3 ) {
          this.#submitTarget.dispatchEvent(new CustomEvent(SEARCH_EVENT, {
            detail: value,
          }));
        }
      });
      const buttonPanel = new ButtonPanel(
        this.getSlot('button-panel'),
        this.#isLoadingUpload,
        this.#fileUploadError);
      buttonPanel.onUpload(()=>{
        this.#submitTarget.dispatchEvent(new Event(UPLOAD_EVENT));
      });
      buttonPanel.onCreateNewFolder(()=>{
        this.#submitTarget.dispatchEvent(new Event(CREATE_FOLDER_EVENT));
      });
    }

    /**
     * Adds listener for uploading files event.
     * @param {function(void)} listener
     */
    onUpload(listener) {
      this.#submitTarget.addEventListener(UPLOAD_EVENT, () => {
        listener();
      });
    }
    /**
     * Adds listener for create new folder event.
     * @param {function(void)} listener
     */
    onCreateNewFolder(listener) {
      this.#submitTarget.addEventListener(CREATE_FOLDER_EVENT, () => {
        listener();
      });
    }
    /**
     * Adds listener for search item by name.
     * @param {function(string) :void} listener
     */
    onSearch(listener) {
      this.#submitTarget.addEventListener(SEARCH_EVENT, (e) => {
        listener(e.detail);
      });
    }


    /**
     * @inheritDoc
     */
    markup() {
      return `<div class="panel">
                <div class="searching">
                    <input class="input-text search" placeholder="Enter entity name..." >
                    ${this.addSlot('button-search')}
                </div>
             ${this.addSlot('button-panel')
        }</div>`;
    }
}
