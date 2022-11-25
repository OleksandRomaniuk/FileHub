import {Component} from '../components/component.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Component that aware of state management service and wraps the component that comes to creator.
 */
export class BreadcrumbState extends Component {
  #applicationContext;
  #stateManagementService;
  #creator;
  #isBreadcrumbLoading;
  #breadcrumbError;
  #breadcrumbItems;

  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   * @param {Function} creator
   */
  constructor(parent, applicationContext, creator) {
    super(parent);
    this.#applicationContext = applicationContext;
    this.#stateManagementService = applicationContext.stateManagementService;
    this.#creator = creator;
    this.init();
  }

  /**
   * @inheritDoc
   */
  init() {
    this.#stateManagementService.addStateListener('isBreadcrumbLoading', (state) => {
      if (state.isBreadcrumbLoading) {
        this.isBreadcrumbLoading = state.isBreadcrumbLoading;
      }
    });

    this.#stateManagementService.addStateListener('breadcrumbError', (state) => {
      if (state.breadcrumbError) {
        this.breadcrumbError = state.breadcrumbError;
      }
    });

    this.#stateManagementService.addStateListener('currentFolder', (state) => {
      if (state.currentFolder) {
        if (state.currentFolder.id === state.userProfile.rootFolderId) {
          this.breadcrumbItems = [{name: 'Home', id: state.currentFolder.id}];
        } else if (state.currentFolder.parentId === state.userProfile.rootFolderId) {
          this.breadcrumbItems = [
            {name: 'Home', id: state.userProfile.rootFolderId},
            {name: state.currentFolder.name, id: state.currentFolder.id}];
        } else {
          this.breadcrumbItems = [
            {name: 'Home', id: state.userProfile.rootFolderId},
            {name: '...', id: state.currentFolder.parentId},
            {name: state.currentFolder.name, id: state.currentFolder.id},
          ];
        }
      }
    });
    super.init();
  }

  /**
   * @param {string} breadcrumbError
   */
  set breadcrumbError(breadcrumbError) {
    this.#breadcrumbError = breadcrumbError;
    this.#isBreadcrumbLoading = false;
    this.#breadcrumbItems = null;
    this.render();
  }

  /**
   * @param {string} isBreadcrumbLoading
   */
  set isBreadcrumbLoading(isBreadcrumbLoading) {
    this.#isBreadcrumbLoading = isBreadcrumbLoading;
    this.#breadcrumbError = '';
    this.#breadcrumbItems = null;
    this.render();
  }

  /**
   * @typedef BreadcrumbItem
   * @property {string} name
   * @property {string} id
   */

  /**
   * @param {BreadcrumbItem[]} breadcrumbItems
   */
  set breadcrumbItems(breadcrumbItems) {
    this.#breadcrumbItems = breadcrumbItems;
    this.#breadcrumbError = '';
    this.#isBreadcrumbLoading = false;
    this.render();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('breadcrumb-content');
    this.#creator(slot, {
      isBreadcrumbLoading: this.#isBreadcrumbLoading,
      breadcrumbError: this.#breadcrumbError,
      breadcrumbItems: this.#breadcrumbItems,
    },
    );
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('breadcrumb-content')}`;
  }
}
