import {expect, jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {BreadcrumbWrapper} from '../../../components/wrappers/breadcrumb-wrapper';
import {State} from '../../../service/state-management/state.js';
import {LoadFolderInfoAction} from '../../../actions/load-folder-info-action.js';

describe('BreadcrumbWrapper', () => {
  let fixture;
  let eventTarget;
  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
    eventTarget = new EventTarget();
  });

  test('Should change markup when get data about userProfile.', ()=> {
    expect.assertions(1);
    const applicationContext = new ApplicationContext();
    jest
        .spyOn(applicationContext.stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener)=> {
          eventTarget.addEventListener(`stateChanged.${fieldName}`,
              (event) => listener(event.detail));
        });
    jest
        .spyOn(applicationContext.apiService, 'getFolder')
        .mockImplementation(async ()=> {
          return {
            folderInfo: 'testFolderInfo',
          };
        });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture, applicationContext);

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
      expect(applicationContext.stateManagementService.state.folderInfo).toBe('testFolderInfo');
      done();
    });
  });
  test('Should method destroy delete listeners on states.', ()=>{
    expect.assertions(2);
    const applicationContext = new ApplicationContext();

    jest
        .spyOn(applicationContext.stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener)=> {
          eventTarget.addEventListener(`stateChanged.${fieldName}`,
              (event) => listener(event.detail));
        });
    const mockDispatch = jest
        .spyOn(applicationContext.stateManagementService, 'dispatch')
        .mockImplementation(()=> {
        });
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture, applicationContext);

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
    expect(mockDispatch).toHaveBeenCalledWith(new LoadFolderInfoAction(applicationContext, 'firstId'));
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
    expect(mockDispatch).toHaveBeenCalledWith( new LoadFolderInfoAction(applicationContext, 'firstId'));
  });
  test('Should generate path. and return null', ()=> {
    expect.assertions(1);
    const applicationContext = new ApplicationContext();
    jest
        .spyOn(applicationContext.stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener)=> {
          eventTarget.addEventListener(`stateChanged.${fieldName}`,
              (event) => listener(event.detail));
        });
    jest
        .spyOn(applicationContext.stateManagementService, 'state', 'get')
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
        .spyOn(applicationContext.apiService, 'getFolder')
        .mockImplementation(async ()=> {
          return {
            folderInfo: 'testFolderInfo',
          };
        });
    let testPath;
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture, applicationContext);
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
    const applicationContext = new ApplicationContext();
    jest
        .spyOn(applicationContext.stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener)=> {
          eventTarget.addEventListener(`stateChanged.${fieldName}`,
              (event) => listener(event.detail));
        });
    jest
        .spyOn(applicationContext.stateManagementService, 'state', 'get')
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
        .spyOn(applicationContext.apiService, 'getFolder')
        .mockImplementation(async ()=> {
          return {
            folderInfo: 'testFolderInfo',
          };
        });
    let testPath;
    const breadcrumbWrapper = new BreadcrumbWrapper(fixture, applicationContext);
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
});

