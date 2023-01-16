import {Component} from './component';
import {Button} from './button';
const CREATE_FOLDER_EVENT = 'create-folder-event';
const UPLOAD_EVENT = 'upload-event';
/**
 * The component to generate Buttons in the {@link Panel}.
 */
export class ButtonPanel extends Component {
    #submitTarget = new EventTarget();

    #isLoadingUpload;
    #errorUpload;
    /**
     * @param {HTMLElement} parent
     * @param {boolean} isLoadingUpload
     * @param {string} errorUpload
     */
    constructor(parent, isLoadingUpload, errorUpload) {
      super(parent);
      this.#isLoadingUpload = isLoadingUpload;
      this.#errorUpload = errorUpload;
      this.init();
    }


    /**
     * @inheritDoc
     */
    afterRender() {
      const uploadButtonSlot = this.getSlot('upload-button');
      let uploadButton;
      if (this.#isLoadingUpload) {
        uploadButton = new Button(
          uploadButtonSlot,
          'uploading',
            `<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>`,
            'primary',
            true);
      } else if (this.#errorUpload) {
        uploadButton = new Button(
          uploadButtonSlot,
          this.#errorUpload,
              `<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>`,
              'error-button');
      } else {
        uploadButton = new Button(
          uploadButtonSlot,
          'upload',
            `<span class="glyphicon glyphicon-upload" aria-hidden="true"></span>`);
      }

      uploadButton.onClick(()=>{
        this.#submitTarget.dispatchEvent(new Event(UPLOAD_EVENT));
      });

      const createNewFolderButtonSlot = this.getSlot('create-folder-button');
      const createNewFolderButton = new Button(
        createNewFolderButtonSlot,
        'Create new folder',
            `<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>`);
      createNewFolderButton.onClick(()=>{
        this.#submitTarget.dispatchEvent(new Event(CREATE_FOLDER_EVENT));
      });
    };

    /**
     * Adds listener for UPLOAD_EVENT;.
     * @param {function() :void} listener
     */
    onUpload(listener) {
      this.#submitTarget.addEventListener(UPLOAD_EVENT, () => {
        listener();
      });
    }
    /**
     * Adds listener for CREATE_FOLDER_EVENT.
     * @param {function() :void} listener
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
      return `
            <div class="buttons">
                ${this.addSlot('upload-button')}
                ${this.addSlot('create-folder-button')}
            </div>`;
    }
}


