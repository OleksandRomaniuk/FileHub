import {Component} from '../components/component.js';
import {Link} from '../components/link.js';
import {TitleService} from '../services/title-service.js';

/**
 * 404 error page component.
 */
export class NotFoundPage extends Component {
  #navigateListener;

  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this.init();
    titleService.title = ['404'];
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const linkSlot = this.getSlot('link');
    const link = new Link(linkSlot, 'YES');

    link.onClick(() => {
      this?.#navigateListener();
    });
  }

  /**
   * Adds listener for 'navigate' event.
   * @param {Function} listener
   */
  onNavigateToHome(listener) {
    this.#navigateListener = listener;
  }

  /**
   * @inheritDoc
   * @returns {string}
   */
    markup() {

    return `
        <div id="notfound">
        <div class="notfound">
        <div class="notfound-bg">
        <div></div>
    <div></div>
    <div></div>
  </div>
    <h1>oops!</h1>
    <h2>Error 404 : Page Not Found</h2>
    <a href="#">go back</a>
  </div>
  </div>

    `;
  }
}
