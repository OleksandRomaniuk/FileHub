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

  test('Should change markup when get data about userProfile.', ()=> {
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
      .spyOn(apiService, 'getFolder')
      .mockImplementation(async ()=> {
        return {
          folderInfo: 'testFolderInfo',
        };
      });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);

    const mockRender = jest
      .spyOn(breadcrumbWrapper, 'render')
      .mockImplementation(()=>{});

    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.folderInfo',
        {detail: new State({
          userProfile: {
            username: 'Cherhynska',
            rootFolderId: '25',
          },
          folderInfo: {
            name: 'trip',
            id: '30',
            parentId: '28',
            itemsAmount: '5',
          }})},
      ));
    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.isFolderInfoError',
        {detail: new State({isFolderInfoError: false})},
      ));
    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.isFolderInfoLoading',
        {detail: new State({isFolderInfoLoading: false})},
      ));

    expect(mockRender).toHaveBeenCalledTimes(3);
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.locationMetaData',
      {
        detail: {
          locationMetaData: {
            folderId: 'testFolderId',
          },
        },
      }));
    setTimeout(()=>{
      expect(stateManagementService.state.folderInfo).toBe('testFolderInfo');
      done();
    });
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
  test('Should call navigate listener after changing userProfile state.', ()=> {
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
  test('Should change state locationMetaData and dispatch LoadFolderInfoAction.', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});
    new BreadcrumbWrapper(fixture);
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.locationMetaData',
      {
        detail: new State({
          locationMetaData: {
            folderId: 'testId',
          },
          userProfile: {
            name: 'testName',
          },
        }),
      }));
    expect(mockDispatch).toHaveBeenCalledWith( new LoadFolderInfoAction('testId'));
  });
  test('Should change state isUserProfileLoading and call listener with render.', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);
    const mockRender = jest
      .spyOn(breadcrumbWrapper, 'render')
      .mockImplementation(()=>{});
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.isUserProfileLoading',
      {
        detail: new State({
          isUserProfileLoading: true,
        }),
      }));
    expect(mockRender).toHaveBeenCalled();
  });
  test('Should change state userProfile and do not call dispatch action .', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    new BreadcrumbWrapper(fixture);
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});
    eventTarget.dispatchEvent(new CustomEvent('stateChanged.userProfile',
      {
        detail: new State({
          userProfile: null,
        }),
      }));
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  test('Should change markup when get data about userProfile and nested on second level.', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture);
    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.folderInfo',
        {detail: new State({
          userProfile: {
            username: 'Cherhynska',
            rootFolderId: '25',
          },
          folderInfo: {
            name: 'trip',
            id: '30',
            parentId: '25',
            itemsAmount: '5',
          }})},
      ));
    breadcrumbWrapper.breadcrumbCreator = (slot, path)=>{
      expect(path).toStrictEqual([
        {
          'id': '25',
          'name': 'Home',
        },
        {
          'id': '30',
          'name': 'trip',
        },
      ]);
    };
  });
});

