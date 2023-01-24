import {Component} from './component';
import {Link} from './link';


/**
 * The component for generate breadcrumb.
 */
export class Breadcrumb extends Component {
  #isError;
  #isLoading;
  #path;
  #listenerNavigateToFolder;

  /**
   * @param {HTMLElement} parent
   * @param {object[]} path
   * @param {boolean} isLoading
   * @param {boolean} isError
   */
  constructor(parent, path, isLoading, isError) {
    super(parent);
    this.#isLoading = isLoading;
    this.#isError = isError;
    this.#path = path;
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    this.#path?.forEach((folder, index) => {
      if (index < this.#path.length - 1) {
        const breadcrumbLinkSlot = this.getSlot('breadcrumb-link-' + index);
        let link;
        if (breadcrumbLinkSlot) {
          if (index === 0) {
            link = new Link(breadcrumbLinkSlot, 'Home');
          } else {
            link = new Link(breadcrumbLinkSlot, folder.name);
          }
          link.onClick(()=> {
            this.#listenerNavigateToFolder(folder.id);
          });
        }
      }
    });
  }

  /**
   * Add listener to redirect to the another folder.
   * @param {Function} listenerNavigateToFolder
   */
  onNavigateToFolder(listenerNavigateToFolder) {
    this.#listenerNavigateToFolder = listenerNavigateToFolder;
  }
  /**
   * @inheritDoc
   */
  markup() {
    let innerText = '';
    this.#path?.forEach((folder, index) => {
      if (index < this.#path.length - 1) {
        innerText += `<li>${this.addSlot('breadcrumb-link-' + index)}</li>`;
      } else {
        innerText += ` <li>
                    ${folder.name}
                </li>`;
      }
    });
    if (this.#isError) {
      innerText = `<span class="error-text">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                   Can't load user data
                </span>`;
    } else if (this.#isLoading) {
      innerText = `<li>
                    <span class="glyphicon glyphicon-repeat loading" aria-hidden="true">
                    </span>
                </li>`;
    }
    return `<slot>${innerText}</slot>`;
  }
}
