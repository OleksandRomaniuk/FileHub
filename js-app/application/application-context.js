import {TitleService} from '../service/title-service';
import {ApiService} from '../service/api-service';
import {RequestService} from '../service/request-service';
import {StateManagementService} from '../service/state-management/state-management-service';
import {State} from '../service/state-management/state';
import {mutators} from '../service/state-management/constatns/mutators';
import {clearRegistry, registry} from './registry';
import {FileTypeIconFactory} from '../components/file-list/file-type-icon-factory';
import {DownloadService} from '../service/download-service';
import {Storage} from '../service/storage';

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
      return new StateManagementService(mutators, new State());
    });
    registry.register('downloadService', ()=>{
      return new DownloadService();
    });
    registry.register('storage', ()=>{
      return new Storage();
    });
  }
}
