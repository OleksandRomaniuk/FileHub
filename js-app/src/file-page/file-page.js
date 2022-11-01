import {Component} from '../components/component.js';
import {TitleService} from '../title-service.js';

/**
 * Implementation of {@link Component} that represent page with user files.
 */
export class FilePage extends Component {
  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this.init();
    titleService.title = ['Files'];
  }

  /**
   * HTML with functionality inserts for page with file table.
   * @returns {string}
   */
  markup() {
    return `<div class="wrapper" data-td="files-page">
        
      </div>`;
  }
}
