import {TitleService} from '../service/title-service';
import {ApiService} from '../service/api-service';
import {RequestService} from '../service/request-service';
import {StateManagementService} from '../service/state-management/state-management-service';
import {State} from '../service/state-management/state';
import {mutators} from '../service/state-management/constatns/mutators';
import {clearRegistry, registry} from './registry';
import {FileTypeIconFactory} from '../components/file-list/file-type-icon-factory';

/**
 * Application context to create and provide dependencies.
 */
export class ApplicationContext {
  /**
   * Initialize fields.
   */
  constructor() {
    clearRegistry();
    registry.register('titleService', ()=>{
      return new TitleService('FileHub', ' - ');
    });

    registry.register('apiService', ()=>{
      return new ApiService(new RequestService());
    });
    registry.register('fileTypeIconFactory', ()=>{
      return new FileTypeIconFactory();
    });

    registry.register('stateManagementService', ()=>{
      return new StateManagementService(mutators, new State({
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
      }));
    });
  }
}
