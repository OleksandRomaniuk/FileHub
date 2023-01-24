import {Component} from './component';
import {Button} from './button';

const CREATE_FOLDER_EVENT = 'create-folder-event';
const CANCEL_EVENT = 'cancel-event';
/**
 * The component to generate modal window to create new folder.
 */
export class CreateFolderModalWindow extends Component {
    #folder;
    #isCreatingFolderInProgress;
    #creatingFolderError;
    #submitTarget = new EventTarget();


    /**
     * @param {HTMLElement} parent
     * @param {object} folder
     * @param {boolean} isCreatingFolderInProgress
     * @param {string} creatingFolderError
     */
    constructor(parent, folder, isCreatingFolderInProgress, creatingFolderError) {
      super(parent);
      this.#folder = folder;
      this.#isCreatingFolderInProgress = isCreatingFolderInProgress;
      this.#creatingFolderError = creatingFolderError;
      this.init();
    }

    /**
     * @inheritDoc
     */
    afterRender() {
      const cancelButtonSlot = this.getSlot('cancel-button');
      const createButtonSlot = this.getSlot('create-button');
      if (cancelButtonSlot && createButtonSlot) {
        const cancelButton = new Button(cancelButtonSlot,
          'Cancel',
          'Cancel',
          'cancel',
          this.#isCreatingFolderInProgress);
        cancelButton.onClick(()=>{
          this.#submitTarget.dispatchEvent(new Event(CANCEL_EVENT));
        });
        const buttonText = this.#isCreatingFolderInProgress ?
            `<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span> Create` : 'Create';
        const createButton = new Button(
          createButtonSlot,
          'Create',
          buttonText,
          'primary',
          this.#isCreatingFolderInProgress );
        createButton.onClick(()=>{
          const input = document.querySelector('input.directory');
          this.#submitTarget.dispatchEvent(new CustomEvent(CREATE_FOLDER_EVENT, {
            detail: {
              newFolder: {...this.#folder, name: input.value},
            },
          }));
        });
        const linkClose = this.rootElement.querySelector('[data-td="close-link"]');
        linkClose.addEventListener('click', (e)=>{
          e.preventDefault();
          this.#submitTarget.dispatchEvent(new Event(CANCEL_EVENT));
        });
      }
    }
    /**
     * Set listener for creating new folder;.
     * @param {function(object) :void} listenerOnCreate
     */
    set listenerOnCreate(listenerOnCreate) {
      this.#submitTarget.addEventListener(CREATE_FOLDER_EVENT, (e)=>{
        listenerOnCreate(e.detail.newFolder);
      });
    }
    /**
     * Set listener for DELETE_EVENT;.
     * @param {function() :void} listenerOnCancel
     */
    set listenerOnCancel(listenerOnCancel) {
      this.#submitTarget.addEventListener(CANCEL_EVENT, listenerOnCancel);
    }

    /**
     * @inheritDoc
     */
    markup() {
      let errors;
      if (this.#creatingFolderError) {
        errors = `<div class="error-text"> ${this.#creatingFolderError} </div>`;
      }
      const errorClass = this.#creatingFolderError ? 'input-error' : '';
      if (this.#folder) {
        const value = this.#folder.name ? `value = ${this.#folder.name}` : '';
        return `<div class="modal delete">
    <div class="box">
        <div class="header">
            <h1>Create New Directory</h1>
            <a href="#" title="close" ${this.markElement('close-link')}>
                <span class="glyphicon glyphicon-remove remove " aria-hidden="true"></span>
            </a>
        </div>
        <main >
            <input  name=“directory” class="input-text directory ${errorClass}" placeholder="Enter directory name..."
             ${value}>
            ${errors ?? ''}
        </main>
        <footer class="flex-buttons">
        ${this.addSlot('cancel-button')}
        ${this.addSlot('create-button')}
        </footer>
      </div> `;
      } else {
        return '<div></div>';
      }
    }
}


