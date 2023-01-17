import {expect, jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {BreadcrumbWrapper} from '../../../components/wrappers/breadcrumb-wrapper';
import {State} from '../../../service/state-management/state';
import {LoadFolderInfoAction} from '../../../actions/load-folder-info-action';
import {registry} from '../../../application/registry';

describe('BreadcrumbWrapper', () => {
  let fixture;
  let eventTarget;

  beforeEach(() => {
    new ApplicationContext();
    fixture = document.body;
    fixture.innerHTML = '';
    eventTarget = new EventTarget();
  });
  test('Should method destroy delete listeners on states.', ()=>{
    expect.assertions(2);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=> {
      });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);

    eventTarget.dispatchEvent(new CustomEvent('stateChanged.userProfile', {
      detail: {
        userProfile: {
          rootFolderId: 'firstId',
        },
        locationMetaData: {
          folderId:
              'firstId',
        },
      },
    }));
    expect(mockDispatch).toHaveBeenCalledWith(new LoadFolderInfoAction('firstId'));
    breadcrumbWrapper.onDestroy();

    eventTarget.dispatchEvent(new CustomEvent('stateChanged.userProfile', {
      detail: {
        userProfile: {
          rootFolderId: 'firstId',
        },
        locationMetaData: {
          folderId:
              'firstId',
        },
      },
    }));
    expect(mockDispatch).toHaveBeenCalledWith( new LoadFolderInfoAction('firstId'));
  });
  test('Should generate path. and return null', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiService = registry.getInstance('apiService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=> {
        return new State({
          userProfile: {
            rootFolderId: 'firstId',
          },
          locationMetaData: {
            folderId:
                      'firstId',
          },
        });
      });
    jest
      .spyOn(apiService, 'getFolder')
      .mockImplementation(async ()=> {
        return {
          folderInfo: 'testFolderInfo',
        };
      });
    let testPath;
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);
    breadcrumbWrapper.breadcrumbCreator = (slot, path)=>{
      testPath = path;
      return path;
    };
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.folderInfo',
      {
        detail: new State({
          userProfile: {
            rootFolderId: 'firstId',
          },
          locationMetaData: {
            folderId:
                      'firstId',
          },
        }),
      }));
    expect(testPath).toBeNull();
  });
  test('Should generate path and return array with path', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    const apiService = registry.getInstance('apiService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=> {
        return new State({
          userProfile: {
            rootFolderId: 'firstId',
          },
          locationMetaData: {
            folderId:
                            'firstId',
          },
        });
      });
    jest
      .spyOn(apiService, 'getFolder')
      .mockImplementation(async ()=> {
        return {
          folderInfo: 'testFolderInfo',
        };
      });
    let testPath;
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);
    breadcrumbWrapper.breadcrumbCreator = (slot, path)=>{
      testPath = path;
      return path;
    };
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.folderInfo',
      {
        detail: new State({
          userProfile: {
            rootFolderId: 'folderInfo',
          },
          folderInfo: {
            parentId: 'parent',
            name: 'testName',
            id: 'testId',
          },
          locationMetaData: {
            folderId:
                            'firstId',
          },
        }),
      }));
    expect(testPath).toStrictEqual([
      {'id': 'folderInfo', 'name': 'Home'},
      {'id': 'parent', 'name': '...'},
      {'id': 'testId', 'name': 'testName'}]);
  });
  test('Should', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);
    const mockNavigate = jest.fn();
    breadcrumbWrapper.onNavigateToFolder(mockNavigate);
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.userProfile',
      {
        detail: new State({
          userProfile: {
            rootFolderId: 'firstId',
          },
        }),
      }));
    expect(mockNavigate).toHaveBeenCalled();
  });
});

