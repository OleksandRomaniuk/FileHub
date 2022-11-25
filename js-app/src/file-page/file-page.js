import {Component} from '../components/component.js';
import {UserProfileState} from '../user-profile/user-profile-state.js';
import {Link} from '../components/link.js';
import {UserProfile} from '../user-profile/user-profile.js';
import {UserAction} from '../actions/user-action.js';
import {ApplicationContext} from '../application-context.js';
import {BreadcrumbState} from '../breadcrumb/breadcrumb-state.js';
import {Breadcrumb} from '../components/breadcrumb.js';
import {FolderInfoAction} from '../actions/folder-info-action.js';
import {FileList} from '../components/file-list.js';
import {FileListState} from '../file-list-state/file-list-state.js';
import {FolderContentAction} from '../actions/folder-content-action.js';

const FOLDER_NAVIGATE_EVENT = 'folder-navigate';

const LOG_OUT_EVENT = 'log-out';

/**
 * Implementation of {@link Component} that represent page with user files.
 */
export class FilePage extends Component {
  #stateManagementService;
  #applicationContext;
  eventTarget = new EventTarget();

  /**
   * @param {HTMLElement} parent
   * @param {ApplicationContext} applicationContext
   */
  constructor(parent, applicationContext) {
    super(parent);
    this.#stateManagementService = applicationContext.stateManagementService;
    this.#applicationContext = applicationContext;
    applicationContext.titleService.title = ['Files'];
    this.init();
  }

  /**
   * @inheritDoc
   */
  init() {
    this.#stateManagementService.addStateListener('userProfile', (state) => {
      if (state.userProfile) {
        let folderId;
        if (state.locationMetadata.folderId) {
          folderId = state.locationMetadata.folderId;
        } else {
          folderId = state.userProfile.rootFolderId;
        }

        this.#stateManagementService
            .dispatch(new FolderInfoAction(
                this.#applicationContext.apiService, folderId));
      }
    });

    this.#stateManagementService.addStateListener('locationMetadata', (state) => {
      if (state.locationMetadata && state.userProfile) {
        let folderId;
        if (state.locationMetadata.folderId) {
          folderId = state.locationMetadata.folderId;
        } else {
          folderId = state.userProfile.rootFolderId;
        }
        this.#stateManagementService
            .dispatch(new FolderInfoAction(this.#applicationContext.apiService, folderId));
      }
    });

    this.#stateManagementService.addStateListener('currentFolder', (state) => {
      if (state.currentFolder) {
        this.#stateManagementService.dispatch(
            new FolderContentAction(this.#applicationContext.apiService,
                state.currentFolder.id));
      }
    });
    super.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const userSlot = this.getSlot('user-profile');
    new UserProfileState(userSlot, this.#stateManagementService, (slot, params) => {
      new UserProfile(slot, params);
    });

    const breadcrumbSlot = this.getSlot('breadcrumb');
    const navigateListener = (folderId) => {
      this.eventTarget.dispatchEvent(new CustomEvent(FOLDER_NAVIGATE_EVENT, {detail: folderId}));
    };

    new BreadcrumbState(breadcrumbSlot, this.#applicationContext, (slot, params) => {
      const breadcrumb = new Breadcrumb(slot, params);

      breadcrumb.onNavigate(navigateListener);
    });

    const fileListSlot = this.getSlot('file-list');

    new FileListState(fileListSlot, this.#applicationContext, (slot, params) => {
      const fileList = new FileList(slot, params);

      fileList.onNavigate(navigateListener);
    });

    if (!this.#stateManagementService.state.userProfile) {
      this.#stateManagementService.dispatch(new UserAction(this.#applicationContext.apiService));
    }

    const logOutLinkSlot = this.getSlot('log-out-link');
    const logOutLink = new Link(logOutLinkSlot, 'Log Out');
    logOutLink.iconClass = 'glyphicon-log-out';
    logOutLink.onClick(() => {
      this.eventTarget.dispatchEvent(new Event(LOG_OUT_EVENT));
    });
  }

  /**
   * Adds listener for 'log out' event.
   * @param {Function} listener
   */
  onLogOut(listener) {
    this.eventTarget.addEventListener(LOG_OUT_EVENT, () => {
      listener();
    });
  }

  /**
   * Adds listener for 'folder navigate' event.
   * @param {Function} listener
   */
  onNavigate(listener) {
    this.eventTarget.addEventListener(FOLDER_NAVIGATE_EVENT, (event) => {
      listener(event.detail);
    });
  }

  /**
   * HTML with functionality inserts for page with file table.
   * @returns {string}
   */
  markup() {
    return `<div class="wrapper table-wrapper" data-td="files-page">
        <header class="page-header">
        <a class="logo" href="registration.html">
            <img src="../../static/images/logo.png" alt="TeamDev" width="200" height="37">
        </a>
        <div class="user-menu">
              <ul class="menu-content">
                  <li>
                      ${this.addSlot('user-profile')}
                  </li>
                  <li>
                      ${this.addSlot('log-out-link')}
                  </li>
                </ul>
            </div>
    </header>
    <div class="box">
        <div class="breadcrumb">
            <ul>
                ${this.addSlot('breadcrumb')}
            </ul>
        </div>
        <hr>
        <div class="table-header">
            <form class="search-form" action="">
                <input class="form-input" type="text" placeholder="Enter entity name...">
                <button type="submit" class="button button-primary">Search</button>
            </form>
            
            <div class="button-container">
                <button class="button button-primary">
                    <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
                </button>
                <button class="button button-primary">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </div>
        </div>
        ${this.addSlot('file-list')}
        </div>
      </div>`;
  }
}
