import {StateAwareComponent} from '../state-aware-component';
import {CreateFolderModalWindow} from '../create-folder-modal-window';

/**
 * The component for changing state in a {@link DeleteModalWindow}.
 */
export class CreateFolderModalWindowWrapper extends StateAwareComponent {
    #newFolder;
    #isCreatingFolderInProgress;
    #creatingFolderError;
    #createNewFolderModalWindowCreator;


    /**
     * @param {HTMLElement} parent
     */
    constructor(parent) {
      super(parent);
      this.addStateListener('newFolder', (state) => {
        this.#newFolder = state.newFolder;
        this.render();
      });
      this.addStateListener('isCreatingFolderInProgress', (state) => {
        this.#isCreatingFolderInProgress = state.isCreatingFolderInProgress;
        this.render();
      });
      this.addStateListener('creatingFolderError', (state) => {
        this.#creatingFolderError = state.creatingFolderError;
        this.render();
      });
      this.init();
    }

    /**
     * @inheritDoc
     */
    afterRender() {
      const slot = this.getSlot('create-new-folder-modal-window');
      if (this.#createNewFolderModalWindowCreator) {
        return this.#createNewFolderModalWindowCreator(
          slot,
          this.#newFolder,
          this.#isCreatingFolderInProgress,
          this.#creatingFolderError,
        );
      }
    }

    /**
     * @param {function(HTMLElement, object, boolean, string):CreateFolderModalWindow} createNewFolderModalWindowCreator
     */
    set createNewFolderModalWindowCreator(createNewFolderModalWindowCreator) {
      this.#createNewFolderModalWindowCreator = createNewFolderModalWindowCreator;
      this.render();
    }
    /**
     * @inheritDoc
     */
    markup() {
      return `${this.addSlot('create-new-folder-modal-window')}`;
    }
}
