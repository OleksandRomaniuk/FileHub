import {StateAwareComponent} from '../state-aware-component';
import {Panel} from '../panel';

/**
 * The component for changing state in a {@link Panel}.
 */
export class PanelWrapper extends StateAwareComponent {
    #panelCreator;
    #fileUploadError;
    #fileUploading;
    /**
     * @param {HTMLElement} parent
     */
    constructor(parent) {
      super(parent);
      this.addStateListener('uploadingFiles', (state)=>{
        this.#fileUploading = state.uploadingFiles &&
                state.locationMetaData.folderId === state.uploadingFiles.folderId;
        this.render();
      });
      this.addStateListener('fileUploadError', (state)=>{
        this.#fileUploadError =
                state.fileUploadError &&
                state.locationMetaData.folderId === state.fileUploadError.folderId;
        this.render();
      });
      this.addStateListener('locationMetaData', (state)=>{
        this.#fileUploading = state.uploadingFiles &&
                state.locationMetaData.folderId === state.uploadingFiles.folderId;
        this.#fileUploadError =
                state.fileUploadError &&
                state.locationMetaData.folderId === state.fileUploadError.folderId;
        this.render();
      });
      this.init();
    }

    /**
     * @inheritDoc
     */
    afterRender() {
      const slot = this.getSlot('panel-wrapper');
      if (this.#panelCreator) {
        return this.#panelCreator(
          slot,
          this.#fileUploading,
          this.#fileUploadError,
        );
      }
    }
    /**
     * @param {function(HTMLElement, boolean, string) :Panel} panelCreator
     */
    set panelCreator(panelCreator) {
      this.#panelCreator = panelCreator;
      this.render();
    }
    /**
     * @inheritDoc
     */
    markup() {
      return `${this.addSlot('panel-wrapper')}`;
    }
}
