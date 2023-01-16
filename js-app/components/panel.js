import {Component} from './component';
import {ButtonPanel} from './button-panel';
const UPLOAD_EVENT = 'upload_event';
const CREATE_FOLDER_EVENT = 'create-folder-event';
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
     * @inheritDoc
     */
    markup() {
      return `<div class="panel"><form >
                <div class="searching">
                    <input name=“name” class="input-text search" value="Enter entity name..." >
                    <button type="submit" class="button primary search" title = "Search">
                        Search
                    </button>
                </div>
            </form>
             ${this.addSlot('button-panel')
        }</div>`;
    }
}
