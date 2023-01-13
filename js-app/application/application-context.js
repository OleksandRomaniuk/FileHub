import {TitleService} from '../service/title-service';
import {ApiService} from '../service/api-service';
import {RequestService} from '../service/request-service';
import {StateManagementService} from '../service/state-management/state-management-service';
import {State} from '../service/state-management/state';
import {mutators} from '../service/state-management/constatns/mutators';

/**
 * Application context to create and provide dependencies.
 */
export class ApplicationContext {
  #titleService;
  #apiService;
  #stateManagementService;

  /**
   * Initialize fields.
   */
  constructor() {
    this.#titleService = new TitleService('FileHub', ' - ');
    this.#apiService = new ApiService(new RequestService());

    const initialState = new State({
      isUserProfileLoading: true,
      isUserProfileError: false,
      userProfile: null,
      isFolderInfoLoading: true,
      isFolderInfoError: false,
      folderInfo: null,
      folderContent: null,
      isFolderContentLoading: true,
      isFolderContentError: false,
      locationMetaData: null,
      itemInRemovingState: null,
      itemBeingDeleted: false,
      removingError: null,
    });
    this.#stateManagementService = new StateManagementService(mutators, initialState);
  }

  /**
   * @returns {TitleService}
   */
  get titleService() {
    return this.#titleService;
  }
  /**
   * @returns {StateManagementService}
   */
  get stateManagementService() {
    return this.#stateManagementService;
  }

  /**
   * @returns {ApiService}
   */
  get apiService() {
    return this.#apiService;
  }
}
