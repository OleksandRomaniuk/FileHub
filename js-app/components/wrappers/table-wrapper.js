import {LoadFolderContentAction} from '../../actions/load-folder-content-action';
import {StateAwareComponent} from '../state-aware-component';
import {SetItemInRemovingStateAction} from '../../actions/set-item-in-removing-state-action';
import {UploadFilesAction} from '../../actions/upload-files-action';
import {SetItemInRenamingStateAction} from '../../actions/set-item-in-renaming-state-action';
import {EditItemAction} from '../../actions/edit-item-action';
import {Folder} from '../file-list/folder';
import {File} from '../file-list/file';
import {DownloadAction} from '../../actions/download-action';

const NAVIGATE_EVENT = 'navigate-event';

/**
 * The component for changing state in the {@link Table}.
 */
export class TableWrapper extends StateAwareComponent {
  #tableCreator;
  #folderContent;
  #isFolderContentLoading;
  #isFolderContentError;
  #submitTarget = new EventTarget();


  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.addStateListener('folderInfo', (state)=>{
      if (state.folderInfo) {
        this.stateManagementService.dispatch(
          new LoadFolderContentAction(state.folderInfo.id));
      }
    });
    this.addStateListener('folderContent', (state) => {
      this.#folderContent = state.folderContent;
      this.render();
    });
    this.addStateListener('isFolderContentLoading', (state) => {
      this.#isFolderContentLoading = state.isFolderContentLoading;
      this.render();
    });
    this.addStateListener('isFolderContentError', (state) => {
      this.#isFolderContentError = state.isFolderContentError;
      this.render();
    });
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('table-wrapper');
    if (this.#tableCreator) {
      const table = this.#tableCreator(
        slot,
        this.#isFolderContentLoading,
        this.#isFolderContentError,
      );
      const folderCreators = [];
      const filesCreators = [];
      this.#folderContent?.items
        ?.filter((element) => element.type === 'folder')
        .sort((firstItem, secondItem) => firstItem.name > secondItem.name ? 1 : -1)
        .forEach((folder) => {
          const folderCreator = (tableSlot)=>{
            const folderComponent = new Folder(tableSlot,
              {
                folder: folder,
              });

            folderComponent.onNavigateToFolder((folderId)=>{
              this.#submitTarget.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, {
                detail: folderId,
              }));
            });
            folderComponent.onUpload((folderId)=>{
              if (!this.stateManagementService.state.fileUploading) {
                const input = document.createElement('input');
                input.type = 'file';
                input.setAttribute('multiple', '');
                input.click();
                input.addEventListener('change', ()=>{
                  this.stateManagementService.dispatch(
                    new UploadFilesAction(
                      folderId,
                      input.files));
                });
              }
            });
            folderComponent.onDelete((item)=> {
              this.stateManagementService.dispatch(new SetItemInRemovingStateAction(item));
            });
            folderComponent.onEditing((item)=>{
              this.stateManagementService.dispatch(new SetItemInRenamingStateAction(item));
            });
            folderComponent.onNameChanged((item)=>{
              this.stateManagementService.dispatch(new EditItemAction(item));
            });

            this.addStateListener('uploadingFiles', (state)=>{
              folderComponent.isUploading = state.uploadingFiles && state.uploadingFiles.folderId === folder.id;
            });
            this.addStateListener('fileUploadError', (state)=>{
              folderComponent.uploadError = state.fileUploadError ?
                state.fileUploadError.folderId === folder.id ?
                  state.fileUploadError : false : false;
            });
            this.addStateListener('itemInRenamingState', (state)=>{
              folderComponent.itemInRenamingState = state.itemInRenamingState ?
                (state.itemInRenamingState.item.id === folder.id ? state.itemInRenamingState : null) : null;
            });
            this.addStateListener('isRenamingInProgress', (state)=>{
              folderComponent.isRenamingInProgress = state.isRenamingInProgress ?
                state.itemInRenamingState.item.id === folder.id : false;
            });
            this.addStateListener('renamingError', (state)=>{
              folderComponent.renamingError = state.renamingError;
            });
          };
          folderCreators.push(folderCreator);
        });
      this.#folderContent?.items
        ?.filter((element) => element.type !== 'folder')
        .sort((firstItem, secondItem) => firstItem.name > secondItem.name ? 1 : -1)
        .forEach((file) => {
          const fileCreator = (tableSlot)=>{
            const fileComponent = new File(tableSlot,
              {
                file: file,
              });
            fileComponent.onDelete((item)=> {
              this.stateManagementService.dispatch(new SetItemInRemovingStateAction(item));
            });
            fileComponent.onDownload(()=>{
              this.stateManagementService.dispatch(new DownloadAction(file));
            });
            fileComponent.onEditing((item)=>{
              this.stateManagementService.dispatch(new SetItemInRenamingStateAction(item));
            });
            fileComponent.onNameChanged((item)=>{
              this.stateManagementService.dispatch(new EditItemAction(item));
            });
            this.addStateListener('itemInRenamingState', (state)=>{
              fileComponent.itemInRenamingState = state.itemInRenamingState ?
                (state.itemInRenamingState.item.id === file.id ? state.itemInRenamingState : null) : null;
            });
            this.addStateListener('itemInDownloadState', (state)=>{
              fileComponent.isDownloadInProgress = state.itemInDownloadState ?
                state.itemInDownloadState.item.id === file.id : false;
            });
            this.addStateListener('downloadError', (state)=>{
              fileComponent.downloadError = state.downloadError?.itemId === file.id ?
                state.downloadError : null;
            });
          };
          filesCreators.push(fileCreator);
        });
      table.setContentCreators(folderCreators, filesCreators);
    }
  }
  /**
   * @param {Function} tableCreator
   */
  set tableCreator(tableCreator) {
    this.#tableCreator = tableCreator;
    this.render();
  }

  /**
   * Add listener to redirect to the another folder.
   * @param {function(string) :void} listenerNavigateToFolder
   */
  onNavigateToFolder(listenerNavigateToFolder) {
    this.#submitTarget.addEventListener(NAVIGATE_EVENT, (event) => {
      listenerNavigateToFolder(event.detail);
    });
  }


  /**
   * @inheritDoc
   */
  markup() {
    return `${this.addSlot('table-wrapper')}`;
  }
}
