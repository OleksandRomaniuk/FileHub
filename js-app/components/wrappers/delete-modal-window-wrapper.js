import {DeleteModalWindow} from '../delete-modal-window';
import {StateAwareComponent} from '../state-aware-component';
/**
 * The component for changing state in a {@link DeleteModalWindow}.
 */
export class DeleteModalWindowWrapper extends StateAwareComponent {
  #itemInRemovingState;
  #itemBeingDeleted;
  #removingError;
  #deleteModalWindowCreator;


  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.isFolderInfoLoading = this.stateManagementService.state.isFolderInfoLoading;
    this.addStateListener('itemInRemovingState', (state) => {
      this.#itemInRemovingState = state.itemInRemovingState;
      this.render();
    });
    this.addStateListener('itemBeingDeleted', (state) => {
      this.#itemBeingDeleted = state.itemBeingDeleted;
      this.render();
    });
    this.addStateListener('removingError', (state) => {
      this.#removingError = state.removingError;
      this.render();
    });
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('delete-modal-window');
    if (this.#deleteModalWindowCreator) {
      return this.#deleteModalWindowCreator(
        slot,
        this.#itemInRemovingState,
        this.#itemBeingDeleted,
        this.#removingError,
      );
    }
  }

  /**
   * @param {function(HTMLElement, object, boolean, string) :DeleteModalWindow} deleteModalWindowCreator
   */
  set deleteModalWindowCreator(deleteModalWindowCreator) {
    this.#deleteModalWindowCreator = deleteModalWindowCreator;
    this.render();
  }
  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('delete-modal-window')}`;
  }
}
