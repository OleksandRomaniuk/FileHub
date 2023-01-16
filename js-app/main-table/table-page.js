import {Component} from '../components/component';
import {Link} from '../components/link';
import {UserInfoWrapper} from '../components/wrappers/user-info-wrapper';
import {UserInfo} from '../components/user-info';
import {BreadcrumbWrapper} from '../components/wrappers/breadcrumb-wrapper';
import {Breadcrumb} from '../components/breadcrumb';
import {TableWrapper} from '../components/wrappers/table-wrapper';
import {Table} from '../components/file-list/table';
import {DeleteItemAction} from '../actions/delete-item-action';
import {DeleteModalWindowWrapper} from '../components/wrappers/delete-modal-window-wrapper';
import {DeleteModalWindow} from '../components/delete-modal-window';
import {SetItemInRemovingStateAction} from '../actions/set-item-in-removing-state-action';
import {inject} from '../application/registry.js';

const NAVIGATE_TO_FOLDER = 'navigateToFolder';
/**
 * The component for generate table page.
 */
export class TablePage extends Component {
  #eventTarget;
  @inject stateManagementService;
  @inject titleService;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.#eventTarget = new EventTarget();
    this.titleService.setTitle(['files']);
    this.init();
  }
  /**
   * Add listener to redirect to the another folder.
   * @param {Function} listenerNavigateToFolder
   */
  onNavigateToFolder(listenerNavigateToFolder) {
    this.#eventTarget.addEventListener(NAVIGATE_TO_FOLDER, (event)=>{
      listenerNavigateToFolder(event.detail.folderId);
    });
  }
  /**
   * Add values for different inner slots.
   */
  afterRender() {
    const userInfoWrapper = new UserInfoWrapper(this.getSlot('user-information'));
    userInfoWrapper.userInfoCreator = (slot, userProfile, isLoading, isError)=>{
      return new UserInfo(slot, userProfile, isLoading, isError);
    };
    const linkLogOut = new Link(this.getSlot('link-log-out'), 'Log Out');
    linkLogOut.addInnerHTML('  <span class="glyphicon glyphicon-log-out log-out" aria-hidden="true"></span>');
    const breadcrumbWrapper = new BreadcrumbWrapper(
      this.getSlot('breadcrumb'));
    breadcrumbWrapper.onNavigateToFolder((folderId)=>{
      this.#eventTarget.dispatchEvent(new CustomEvent(NAVIGATE_TO_FOLDER, {
        detail: {
          folderId: folderId,
        }}));
    });
    breadcrumbWrapper.breadcrumbCreator = (slot, path, isLoading, isError)=>{
      const breadcrumb = new Breadcrumb(slot, path, isLoading, isError);
      breadcrumb.onNavigateToFolder((folderId)=>{
        this.#eventTarget.dispatchEvent(new CustomEvent(NAVIGATE_TO_FOLDER, {
          detail: {
            folderId: folderId,
          }}));
      });
      return breadcrumb;
    };
    const tableWrapper = new TableWrapper(this.getSlot('main-table'));
    tableWrapper.tableCreator = (slot, folderContent, isLoading, isError)=>{
      const table = new Table(slot, folderContent, isLoading, isError);
      table.onNavigateToFolder((folderId)=>{
        this.#eventTarget.dispatchEvent(new CustomEvent(NAVIGATE_TO_FOLDER, {
          detail: {
            folderId: folderId,
          }}));
      });
      table.onDeleteItem((item)=> {
        this.stateManagementService.dispatch(new SetItemInRemovingStateAction(item));
      });
      return table;
    };
    const modalWindowSlot = this.getSlot('modal-window');
    const deleteModalWindowWrapper = new DeleteModalWindowWrapper(modalWindowSlot);
    deleteModalWindowWrapper.deleteModalWindowCreator =
        (slot, item, itemBeingDeleted, removingError) => {
          const deleteModalWindow = new DeleteModalWindow(slot, item, itemBeingDeleted, removingError);
          deleteModalWindow.listenerOnDelete = ()=>{
            this.stateManagementService.dispatch(
              new DeleteItemAction(item));
          };
          deleteModalWindow.listenerOnCancel = ()=>{
            this.stateManagementService.dispatch(
              new SetItemInRemovingStateAction( null));
          };
        };
  }


  /**
   * @inheritDoc
   */
  markup() {
    return `<slot>
    <div class="table-wrapper">
    <header class="page-header">
        <div class="header" >
            <a href="https://www.teamdev.com/" title="TeamDev">
                <img src="images/logo.png" class="logo" alt="TeamDev"  height="37"   width="200">
            </a>
            <ul class="user-info">
                <li class="grey-text">
                    ${this.addSlot('user-information')}
                </li>
                <li>
                   ${this.addSlot('link-log-out')}
                </li>
            </ul>
            
    </header>

    <main class="box">
       <div class="breadcrumb">
            <ul class="breadcrumb-list">
                    ${this.addSlot('breadcrumb')}
            </ul>
        </div>

        <hr class="hr">
        <div class="panel">
            <form >
                <div class="searching">
                    <input name=“name” class="input-text search" value="Enter entity name..." >
                    <button type="submit" class="button primary search" title = "Search">
                        Search
                    </button>
                </div>
            </form>
            <div class="buttons">
                <button class="button primary" title = "upload">
                    <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
                </button>
                <button class="button primary" title = "create new folder">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </div>
        </div>

        <div class="table-scroll">
             ${this.addSlot('main-table')}
        </div>
    </main>
    <footer class="footer">
        <div class="icons-footer">
            <ul class="icons-list">

                <li>
                    <a href="https://www.linkedin.com/company/teamdev-ltd-/" title="linkedin">
                        <img src="images/icon-linkedin.png" alt="linkedin" >
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/TeamDev" title="facebook">
                        <img src="images/icon-facebook.png" alt="facebook">
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/teamdev_ltd/" title="instagram">
                        <img src="images/icon-instagram.png" alt="instagram">
                    </a>
                </li>

            </ul>
        </div>
        <div class="grey-text">
            Copyright © 2022 <a href="https://www.teamdev.com/">TeamDev</a>. All rights reserved.
        </div>

    </footer>
</div>
${this.addSlot('modal-window')}
</slot>
`;
  }
}