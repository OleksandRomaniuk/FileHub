import {Component} from './component.js';

/**
 * Breadcrumb item component.
 */
export class BreadcrumbItem extends Component {
  #breadcrumbItemText;

  /**
   * @param {HTMLElement} parent
   * @param {string} breadcrumbItemText
   */
  constructor(parent, breadcrumbItemText) {
    super(parent);
    this.#breadcrumbItemText = breadcrumbItemText;
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<li>${this.#breadcrumbItemText}</li>`;
  }
}
