import {jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {TableWrapper} from '../../../components/wrappers/table-wrapper';
import {State} from '../../../service/state-management/state';
import {BaseAction} from '../../../actions/base-action';
import {MUTATOR_NAME} from '../../../service/state-management/constatns/mutators';
import {registry} from '../../../application/registry';
import {UploadFilesAction} from '../../../actions/upload-files-action';
import {SetItemInRemovingStateAction} from '../../../actions/set-item-in-removing-state-action';
import {EditItemAction} from '../../../actions/edit-item-action';
import {DownloadAction} from '../../../actions/download-action';


describe('TableWrapper', () => {
  let fixture;
  let eventTarget;

  beforeEach(() => {
    fixture = document.body;
    new ApplicationContext();
    fixture.innerHTML = '';
    eventTarget = new EventTarget();
  });

  test('Should change markup when get data about userProfile.', ()=> {
    return new Promise((done) => {
      expect.assertions(2);
      const stateManagementService = registry.getInstance('stateManagementService');
      const apiService = registry.getInstance('apiService');
      jest
        .spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((fieldName, listener)=> {
          eventTarget.addEventListener(`stateChanged.${fieldName}`,
            (event) => listener(event.detail));
        });
      const tableWrapper = new TableWrapper(fixture);
      const mockRender = jest.fn();
      jest
        .spyOn(tableWrapper, 'render')
        .mockImplementation(mockRender);
      jest.spyOn(apiService, 'getFolderContent')
        .mockImplementation(async ()=>{
          return {
            folderContent: {
              items: [
                {
                  type: 'folder',
                  name: 'Montenegro',
                  size: null,
                  id: 'folder2',
                },
                {
                  type: 'folder',
                  name: 'My Trip',
                  size: null,
                  id: 'folder3',
                },
                {
                  type: 'PDF Document',
                  name: 'HTML_guidelines.pdf',
                  size: '100 KB',
                  id: 'file4',
                },
              ],
            },
          };
        });


      eventTarget.dispatchEvent(new CustomEvent(
        'stateChanged.isFolderContentLoading',
        {detail: new State({isFolderInfoLoading: false})},
      ));
      eventTarget.dispatchEvent(new CustomEvent(
        'stateChanged.isFolderContentError',
        {detail: new State({isFolderContentError: true})},
      ));
      eventTarget.dispatchEvent(new CustomEvent(
        'stateChanged.folderContent',
        {detail: new State({folderContent:
                  {
                    items: [
                      {
                        type: 'folder',
                        name: 'Montenegro',
                        size: null,
                        id: '36',
                      },
                      {
                        type: 'folder',
                        name: 'My Trip',
                        size: null,
                        id: '37',
                      },
                      {
                        type: 'PDF Document',
                        name: 'HTML_guidelines.pdf',
                        size: '100 KB',
                        id: '38',
                      },
                    ],
                  }})},
      ));

      expect(mockRender).toHaveBeenCalledTimes(3);
      eventTarget.dispatchEvent(new CustomEvent('stateChanged.folderInfo', {
        detail: new State({
          folderInfo: {
            name: 'Weather',
            id: 'folder2',
            parentId: 'folder1',
            itemsAmount: 3,
          },
        })}));
      setTimeout(()=>{
        expect(stateManagementService.state.folderContent)
          .toStrictEqual({
            'items': [
              {
                'id': 'folder2',
                'name': 'Montenegro',
                'size': null,
                'type': 'folder',
              },
              {
                'id': 'folder3',
                'name': 'My Trip',
                'size': null,
                'type': 'folder',
              },
              {
                'id': 'file4',
                'name': 'HTML_guidelines.pdf',
                'size': '100 KB',
                'type': 'PDF Document',
              },
            ],
          });
        done();
      });
    });
  });
  test('Should method destroy delete listeners on states.', ()=>{
    expect.assertions(2);
    const stateManagementService = registry.getInstance('stateManagementService');
    const tableWrapper = new TableWrapper(fixture);
    const mockRender = jest
      .spyOn(tableWrapper, 'render')
      .mockImplementation(()=>{});

    stateManagementService.dispatch(new TestSetFolderContentAction('testFolderContent'));

    expect(mockRender).toHaveBeenCalledTimes(1);
    tableWrapper.onDestroy();

    stateManagementService.dispatch(new TestSetFolderContentAction('secondTestFolderContent'));

    expect(mockRender).toHaveBeenCalledTimes(1);
  });
  test('Should call tableCreator.', ()=> {
    expect.assertions(2);
    const table = {
      setContentCreators: ()=>{},
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=>{
        return new State({
          isFolderContentLoading: true,
          isFolderContentError: false,
        });
      });
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = (slot, isFolderContentLoading, isFolderContentError) =>{
      expect(isFolderContentLoading).toBe(true);
      expect(isFolderContentError).toBe(false);
      return table;
    };
  });
  test('Should create folder and file creators.', ()=> {
    expect.assertions(3);
    let resultLengthOfFolderAndFileCreators;
    const table = {
      folderCreatorsLength: 0,
      fileCreatorsLength: 0,
      setContentCreators: (folderCreators, fileCreators)=> {
        resultLengthOfFolderAndFileCreators = [folderCreators.length, fileCreators.length];
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=>{
        return new State({
          folderContent:
                {
                  items: [
                    {
                      type: 'folder',
                      name: 'Montenegro',
                      size: null,
                      id: '36',
                    },
                    {
                      type: 'folder',
                      name: 'My Trip',
                      size: null,
                      id: '37',
                    },
                    {
                      type: 'PDF Document',
                      name: 'HTML_guidelines.pdf',
                      size: '100 KB',
                      id: '38',
                    },
                  ],
                },
          isFolderContentLoading: false,
          isFolderContentError: false,
        });
      });
    const tableWrapper = new TableWrapper(fixture);
    let testIsFolderContentLoading;
    let testIsFolderContentError;
    tableWrapper.tableCreator = (slot, isFolderContentLoading, isFolderContentError) =>{
      testIsFolderContentLoading = isFolderContentLoading;
      testIsFolderContentError = isFolderContentError;
      return table;
    };
    expect(testIsFolderContentLoading).toBe(true);
    expect(testIsFolderContentError).toBe(false);
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'PDF Document',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    expect(resultLengthOfFolderAndFileCreators).toStrictEqual([2, 1]);
  });

  test('Should call folder and file creators.', ()=> {
    expect.assertions(3);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'state', 'get')
      .mockImplementation(()=>{
        return new State({
          folderContent:
                {
                  items: [
                    {
                      type: 'folder',
                      name: 'Montenegro',
                      size: null,
                      id: '36',
                    },
                    {
                      type: 'folder',
                      name: 'My Trip',
                      size: null,
                      id: '37',
                    },
                    {
                      type: 'PDF Document',
                      name: 'HTML_guidelines.pdf',
                      size: '100 KB',
                      id: '38',
                    },
                  ],
                },
          isFolderContentLoading: false,
          isFolderContentError: false,
        });
      });
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };

    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });
    const rows = fixture.querySelectorAll('tr');
    expect(rows.length).toBe(3);
    const tdWithFolder = fixture.querySelectorAll('td.folder');
    expect(tdWithFolder.length).toBe(2);
    expect(rows[1].querySelector('.cell-name a').innerHTML).toBe('My Trip');
  });

  test('Should call navigate event.', ()=> {
    expect.assertions(1);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    const mockListener = jest.fn();
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    tableWrapper.onNavigateToFolder(mockListener);
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });
    const linkFolder = fixture.querySelector('td.folder a');
    linkFolder.click();
    expect(mockListener).toHaveBeenCalled();
  });

  test('Should call onUpload event.', ()=> {
    expect.assertions(2);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');

    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });

    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});

    const linkUpload = fixture.querySelector('[data-td="link-upload"]');
    const createElementSpy = jest.spyOn(document, 'createElement');

    linkUpload.click();

    const input = createElementSpy.mock.results[0].value;
    input.dispatchEvent(new Event('change'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(new UploadFilesAction('37', input.files));
  });

  test('Should trigger delete action.', ()=> {
    expect.assertions(2);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    const mockListener = jest.fn();
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    tableWrapper.onNavigateToFolder(mockListener);
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });

    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});

    const linkDelete = fixture.querySelector('[data-td="link-delete"]');
    linkDelete.click();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(new SetItemInRemovingStateAction({
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: '36',
    }));
  });

  test('Should trigger file delete action.', ()=> {
    expect.assertions(2);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    const mockListener = jest.fn();
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    tableWrapper.onNavigateToFolder(mockListener);
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });

    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});

    const linkDelete = fixture.querySelectorAll('[data-td="link-delete"]')[2];
    linkDelete.click();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(new SetItemInRemovingStateAction());
  });

  test('Should trigger folder editing event.', ()=> {
    expect.assertions(2);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    const mockListener = jest.fn();
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    tableWrapper.onNavigateToFolder(mockListener);
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });

    const td = fixture.querySelector('td');
    const event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
    });
    td.dispatchEvent(event);
    const input = fixture.querySelector('input');
    expect(input.value).toBe('Montenegro');
    input.value = 'NewName';
    const changeEvent = new MouseEvent('change', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});

    input.dispatchEvent(changeEvent);
    expect(mockDispatch).toHaveBeenCalledWith(new EditItemAction());
  });

  test('Should trigger file  editing event.', ()=> {
    expect.assertions(2);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');
    const mockListener = jest.fn();
    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    tableWrapper.onNavigateToFolder(mockListener);
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });

    const rows = fixture.querySelectorAll('tr');
    const fileRow = rows[2];
    const event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
    });
    fileRow.dispatchEvent(event);
    const input = fixture.querySelector('input');
    expect(input.value).toBe('HTML_guidelines.pdf');
    input.value = 'NewName';
    const changeEvent = new MouseEvent('change', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});

    input.dispatchEvent(changeEvent);
    expect(mockDispatch).toHaveBeenCalledWith(new EditItemAction());
  });

  test('Should trigger download event.', ()=> {
    expect.assertions(2);
    let testFolderCreators;
    let testFileCreators;
    const table = {
      setContentCreators: (folderCreators, fileCreators)=> {
        testFolderCreators = folderCreators;
        testFileCreators = fileCreators;
      },
    };
    const stateManagementService = registry.getInstance('stateManagementService');

    const tableWrapper = new TableWrapper(fixture);
    tableWrapper.tableCreator = () =>{
      return table;
    };
    stateManagementService.dispatch(new TestSetFolderContentAction({
      items: [
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: '36',
        },
        {
          type: 'folder',
          name: 'My Trip',
          size: null,
          id: '37',
        },
        {
          type: 'file',
          mimetype: 'application/pdf',
          name: 'HTML_guidelines.pdf',
          size: '100 KB',
          id: '38',
        },
      ],
    }));
    testFolderCreators.forEach((creator)=>{
      creator(fixture);
    });
    testFileCreators.forEach((creator)=>{
      creator(fixture);
    });

    const mockDispatch = jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=>{});

    const link = fixture.querySelector('[data-td="link-download"]');
    link.click();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(new DownloadAction({
      type: 'file',
      mimetype: 'application/pdf',
      name: 'HTML_guidelines.pdf',
      size: '100 KB',
      id: '38',
    }));
  });
});
/**
 * Change field in the state for tests.
 */
class TestSetFolderContentAction extends BaseAction {
  #folderContent;

  /**
   * @param {object} folderContent
   */
  constructor(folderContent) {
    super();
    this.#folderContent = folderContent;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_FOLDER_CONTENT, this.#folderContent);
  }
}
