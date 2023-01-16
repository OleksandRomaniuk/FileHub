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
import {inject} from '../application/registry';
import {UploadFilesAction} from '../actions/upload-files-action';
import {PanelWrapper} from '../components/wrappers/panel-wrapper';
import {Panel} from '../components/panel';
import {SetNewFolderAction} from '../actions/set-new-folder-action';
import {CreateFolderModalWindowWrapper} from '../components/wrappers/create-folder-modal-window-wrapper';
import {CreateFolderModalWindow} from '../components/create-folder-modal-window';
import {CreateFolderAction} from '../actions/create-folder-action';
import {LogoutAction} from '../actions/logout-action';

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
    linkLogOut.onClick(()=>{
      this.stateManagementService.dispatch(new LogoutAction());
    });
    linkLogOut.addInnerHTML('  <span class="glyphicon glyphicon-log-out log-out" aria-hidden="true"></span>');
    const breadcrumbWrapper = new BreadcrumbWrapper(this.getSlot('breadcrumb'));
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
    tableWrapper.tableCreator = (slot, isLoading, isError)=>{
      return new Table(slot, isLoading, isError);
    };
    tableWrapper.onNavigateToFolder((folderId)=>{
      this.#eventTarget.dispatchEvent(new CustomEvent(NAVIGATE_TO_FOLDER, {
        detail: {
          folderId: folderId,
        }}));
    });
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

    const createFolderModalWindowWrapper = new CreateFolderModalWindowWrapper(modalWindowSlot);
    createFolderModalWindowWrapper.createNewFolderModalWindowCreator =
        (
          slot,
          folder,
          isCreatingFolderInProgress,
          creatingFolderError,
        ) => {
          const createFolderModalWindow = new CreateFolderModalWindow(
            slot,
            folder,
            isCreatingFolderInProgress,
            creatingFolderError,
          );
          createFolderModalWindow.listenerOnCreate = (newFolder)=>{
            this.stateManagementService.dispatch(new CreateFolderAction(newFolder));
          };
          createFolderModalWindow.listenerOnCancel = ()=>{
            this.stateManagementService.dispatch(
              new SetNewFolderAction( null));
          };
        };
    const panelSlot = this.getSlot('panel');
    const panelWrapper = new PanelWrapper(panelSlot);
    panelWrapper.panelCreator =
        (slot,
          fileUploading,
          fileUploadError) => {
          const panel = new Panel(
            slot,
            fileUploading,
            fileUploadError);
          if (!this.stateManagementService.state.fileUploading) {
            panel.onUpload(()=>{
              const input = document.createElement('input');
              input.type = 'file';
              input.setAttribute('multiple', '');
              input.click();
              input.addEventListener('change', ()=>{
                this.stateManagementService.dispatch(
                  new UploadFilesAction(
                    this.stateManagementService.state.locationMetaData.folderId,
                    input.files));
              });
            });
            panel.onCreateNewFolder(()=>{
              this.stateManagementService.dispatch(
                new SetNewFolderAction({
                  parentId: this.stateManagementService.state.locationMetaData.folderId,
                  name: null,
                }));
            });
          }
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
        ${this.addSlot('panel')}
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
