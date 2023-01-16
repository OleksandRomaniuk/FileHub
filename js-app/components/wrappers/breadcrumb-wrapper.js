import {LoadFolderInfoAction} from '../../actions/load-folder-info-action';
import {State} from '../../service/state-management/state';
import {StateAwareComponent} from '../state-aware-component';
import {Breadcrumb} from '../breadcrumb';

/**
 * The component for changing state in a {@link Breadcrumb}.
 */
export class BreadcrumbWrapper extends StateAwareComponent {
  #path;
  #isFolderInfoLoading;
  #isFolderInfoError;
  #breadcrumbCreator;
  #listenerNavigateToFolder;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.addStateListener('locationMetaData', (state)=>{
      if (state.locationMetaData && state.userProfile) {
        this.stateManagementService.dispatch(
          new LoadFolderInfoAction(state.locationMetaData.folderId));
      }
    });

    this.addStateListener('userProfile', (state)=>{
      if (state.userProfile) {
        if (!state.locationMetaData || !state.locationMetaData.folderId) {
          this.#listenerNavigateToFolder(state.userProfile.rootFolderId);
        } else {
          this.stateManagementService.dispatch(
            new LoadFolderInfoAction(state.locationMetaData.folderId));
        }
      }
    });
    this.addStateListener('folderInfo', (state) => {
      if (state.userProfile) {
        this.#path = this.#generatePath(state);
        this.render();
      }
    });
    this.addStateListener('isFolderInfoLoading', (state) => {
      this.#isFolderInfoLoading = state.isFolderInfoLoading;
      this.render();
    });
    this.addStateListener('isUserProfileLoading', (state) => {
      this.#isFolderInfoLoading = state.isFolderInfoLoading;
      this.render();
    });
    this.addStateListener('isFolderInfoError', (state) => {
      this.#isFolderInfoError = state.isFolderInfoError;
      this.render();
    });
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('breadcrumb');
    if (this.#breadcrumbCreator) {
      return this.#breadcrumbCreator(
        slot,
        this.#path,
        this.#isFolderInfoLoading,
        this.#isFolderInfoError,
      );
    }
  }

  /**
   * @param {State} state
   * @returns {object[] | null}
   * @private
   */
  #generatePath(state) {
    if (state.folderInfo) {
      const path = [{name: 'Home', id: state.userProfile.rootFolderId}];
      if (state.folderInfo.parentId === state.userProfile.rootFolderId) {
        path.push({name: state.folderInfo.name, id: state.folderInfo.id});
        return path;
      } else if (state.folderInfo.parentId !== null) {
        path.push({name: '...', id: state.folderInfo.parentId});
        path.push({name: state.folderInfo.name, id: state.folderInfo.id});
      }
      return path;
    }
    return null;
  }
  /**
   * @param {function(HTMLElement, object[], boolean, boolean) :Breadcrumb} breadcrumbCreator
   */
  set breadcrumbCreator(breadcrumbCreator) {
    this.#breadcrumbCreator = breadcrumbCreator;
    this.render();
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
    return `<slot>${this.addSlot('breadcrumb')}</slot>`;
  }
}
