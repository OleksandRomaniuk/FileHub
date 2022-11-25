import {Component} from './component.js';
import {Link} from './link.js';

const NAVIGATE_EVENT = 'breadcrumb-navigate-event';

/**
 * Breadcrumb item component with link.
 */
export class BreadcrumbItemLink extends Component {
  #breadcrumbItemText;
  #folderId;
  #eventTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   * @param {string} breadcrumbItemText
   * @param {string} folderId
   */
  constructor(parent, breadcrumbItemText, folderId) {
    super(parent);
    this.#breadcrumbItemText = breadcrumbItemText;
    this.#folderId = folderId;
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const linkSlot = this.getSlot('link-slot');
    const link = new Link(linkSlot, this.#breadcrumbItemText);
    link.onClick(() => {
      this.#eventTarget.dispatchEvent(
          new CustomEvent(NAVIGATE_EVENT, {detail: this.#folderId}));
    });
  }

  /**
   * Adds listener for 'breadcrumb navigate' event.
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
    return `<li>${this.addSlot('link-slot')}</li>`;
  }
}
