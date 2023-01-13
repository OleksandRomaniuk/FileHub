import {Component} from './component';
import {Button} from './button';

const DELETE_EVENT = 'delete-event';
const CANCEL_EVENT = 'cancel-event';

/**
 * The component to generate modal window during delete item.
 */
export class DeleteModalWindow extends Component {
  #item;
  #itemBeingDeleted;
  #removingError;
  #submitTarget = new EventTarget();


  /**
   * @param {HTMLElement} parent
   * @param {object} item
   * @param {boolean} itemBeingDeleted
   * @param {string} removingError
   */
  constructor(parent, item, itemBeingDeleted, removingError) {
    super(parent);
    this.#item = item;
    this.#itemBeingDeleted = itemBeingDeleted;
    this.#removingError = removingError;
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const cancelButtonSlot = this.getSlot('cancel-button');
    const deleteButtonSlot = this.getSlot('delete-button');
    if (cancelButtonSlot && deleteButtonSlot) {
      const buttonCancel = new Button(cancelButtonSlot, 'Cancel', 'Cancel', 'cancel', this.#itemBeingDeleted);
      buttonCancel.onClick(()=>{
        this.#submitTarget.dispatchEvent(new Event(CANCEL_EVENT));
      });
      let buttonDelete;
      if (this.#itemBeingDeleted) {
        buttonDelete = new Button(
            deleteButtonSlot,
            'Delete',
            `<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span> Delete`,
            'delete', this.#itemBeingDeleted );
      } else {
        buttonDelete = new Button(
            deleteButtonSlot,
            'Delete',
            `Delete`,
            'delete');
      }
      buttonDelete.onClick(()=>{
        this.#submitTarget.dispatchEvent(new Event(DELETE_EVENT));
      });
      const linkClose = this.rootElement.querySelector('[data-td="close-link"]');
      linkClose.addEventListener('click', (e)=>{
        e.preventDefault();
        this.#submitTarget.dispatchEvent(new Event(CANCEL_EVENT));
      });
    }
  }
  /**
   * Set listener for DELETE_EVENT;.
   * @param {function() :void} listenerOnDelete
   */
  set listenerOnDelete(listenerOnDelete) {
    this.#submitTarget.addEventListener(DELETE_EVENT, listenerOnDelete);
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
    if (this.#removingError) {
      errors = `<div class="error-text"> ${this.#removingError} </div>`;
    }
    if (this.#item) {
      return `<div class="modal delete">
    <div class="box">
        <div class="header">
            <h1>Delete File</h1>
            <a href="#" title="close" ${this.markElement('close-link')}>
                <span class="glyphicon glyphicon-remove remove " aria-hidden="true"></span>
            </a>
        </div>
        <main >
            Are you sure you want to delete "<strong>${this.#item.name}</strong>" ${this.#item.type}?
             ${errors ?? ''}
        </main>
        <footer class="flex-buttons">
        ${this.addSlot('cancel-button')}
        ${this.addSlot('delete-button')}
        </footer>
      </div> `;
    } else {
      return '<div></div>';
    }
  }
}


