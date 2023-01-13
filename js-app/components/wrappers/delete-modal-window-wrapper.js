import {ApplicationContext} from '../../application/application-context';
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
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent, applicationContext.stateManagementService);
    this.isFolderInfoLoading = this.stateManagementService.state.isFolderInfoLoading;
    this.addStateListener('itemInRemovingState', (state) => {
      this.itemInRemovingState = state.itemInRemovingState;
    });
    this.addStateListener('itemBeingDeleted', (state) => {
      this.itemBeingDeleted = state.itemBeingDeleted;
    });
    this.addStateListener('removingError', (state) => {
      this.removingError = state.removingError;
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
   * @param {object} itemInRemovingState
   */
  set itemInRemovingState(itemInRemovingState) {
    this.#itemInRemovingState = itemInRemovingState;
    this.render();
  }
  /**
   * @param {boolean} itemBeingDeleted
   */
  set itemBeingDeleted(itemBeingDeleted) {
    this.#itemBeingDeleted = itemBeingDeleted;
    this.render();
  }
  /**
   * @param {string} removingError
   */
  set removingError(removingError) {
    this.#removingError = removingError;
    this.render();
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
