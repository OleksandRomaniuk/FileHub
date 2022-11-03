import {Component} from '../components/component.js';
import {Link} from '../components/link.js';

/**
 * An implementation of {@link Component} that represent 404 error page.
 */
export class NotFoundPage extends Component {
  #navigateListener;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
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
   * Subscribe user for navigate event and forward event to upper level.
   * @param {function} listener
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
