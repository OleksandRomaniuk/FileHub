import {LoadingIcon} from './loading-icon.js';
import {ErrorMessage} from './error-message.js';
import {Component} from './component.js';
import {BreadcrumbItem} from './breadcrumb-item.js';
import {BreadcrumbItemLink} from './breadcrumb-item-link.js';

const NAVIGATE_EVENT = 'breadcrumb-navigate-event';

/**
 * Breadcrumb component.
 */
export class Breadcrumb extends Component {
  #breadcrumbContentCreator;
  #eventTarget = new EventTarget();

  /**
   * @typedef BreadcrumbItems
   * @property {string} name
   * @property {string} id
   */

  /**
   * @typedef BreadcrumbParams
   * @property {string} breadcrumbError
   * @property {boolean} isBreadcrumbLoading
   * @property {BreadcrumbItems[]} breadcrumbItems
   */

  /**
   * @param {HTMLElement} parent
   * @param {BreadcrumbParams} params
   */
  constructor(parent, params) {
    super(parent);
    if (params.isBreadcrumbLoading) {
      this.#showLoading();
    }
    if (params.breadcrumbError) {
      this.#showError(params.breadcrumbError);
    }
    if (params.breadcrumbItems) {
      this.#showBreadcrumb(params.breadcrumbItems);
    }
    this.init();
  }

  /**
   * @private
   */
  #showLoading() {
    this.#breadcrumbContentCreator = (slot) => {
      new LoadingIcon(slot);
    };
  }

  /**
   * @param {string} errorMessage
   * @private
   */
  #showError(errorMessage) {
    this.#breadcrumbContentCreator = (slot) => {
      new ErrorMessage(slot, errorMessage);
    };
  }

  /**
   * @param {BreadcrumbItems[]} breadcrumbItems
   * @private
   */
  #showBreadcrumb(breadcrumbItems) {
    const navigateListener = (folderId) => {
      this.#eventTarget.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, {detail: folderId}));
    };

    if (breadcrumbItems.length > 2) {
      this.#breadcrumbContentCreator = (slot) => {
        const rootBreadcrumbItem = new BreadcrumbItemLink(slot, 'Home', breadcrumbItems[0].id);
        const nestedBreadcrumbItem = new BreadcrumbItemLink(slot, '...', breadcrumbItems[1].id);
        new BreadcrumbItem(slot, breadcrumbItems[2].name);

        rootBreadcrumbItem.onNavigate(navigateListener);
        nestedBreadcrumbItem.onNavigate(navigateListener);
      };
    }

    if (breadcrumbItems.length === 2) {
      this.#breadcrumbContentCreator = (slot) => {
        const rootBreadcrumbItem = new BreadcrumbItemLink(slot, 'Home', breadcrumbItems[0].id);
        new BreadcrumbItem(slot, breadcrumbItems[1].name);
        rootBreadcrumbItem.onNavigate(navigateListener);
      };
    }

    if (breadcrumbItems.length === 1) {
      this.#breadcrumbContentCreator = (slot) => {
        new BreadcrumbItem(slot, 'Home');
      };
    }
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('content');
    if (this.#breadcrumbContentCreator) {
      this.#breadcrumbContentCreator(slot);
    }
  }

  /**
   * Adds event listener for 'breadcrumb navigate' event.
   * @param {Function} listener
   */
  onNavigate(listener) {
    this.#eventTarget.addEventListener(NAVIGATE_EVENT, (event) => {
      listener(event.detail);
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('content')}`;
  }
}
