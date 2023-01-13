import {jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {TableWrapper} from '../../../components/wrappers/table-wrapper';
import {State} from '../../../service/state-management/state';
import {BaseAction} from '../../../actions/base-action';
import {MUTATOR_NAME} from '../../../service/state-management/constatns/mutators';

describe('TableWrapper', () => {
  let fixture;
  let eventTarget;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
    eventTarget = new EventTarget();
  });

  test('Should change markup when get data about userProfile.', ()=> {
    return new Promise((done) => {
      expect.assertions(2);
      const applicationContext = new ApplicationContext();
      jest
          .spyOn(applicationContext.stateManagementService, 'addStateListener')
          .mockImplementation((fieldName, listener)=> {
            eventTarget.addEventListener(`stateChanged.${fieldName}`,
                (event) => listener(event.detail));
          });
      const tableWrapper = new TableWrapper(fixture, applicationContext);
      const mockRender = jest.fn();
      jest
          .spyOn(tableWrapper, 'render')
          .mockImplementation(mockRender);
      jest.spyOn(applicationContext.apiService, 'getFolderContent')
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
        expect(applicationContext.stateManagementService.state.folderContent)
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
    const applicationContext = new ApplicationContext();
    const tableWrapper = new TableWrapper(fixture, applicationContext);
    const mockRender = jest
        .spyOn(tableWrapper, 'render')
        .mockImplementation(()=>{});

    applicationContext.stateManagementService.dispatch(new TestSetFolderContentAction('testFolderContent'));

    expect(mockRender).toHaveBeenCalledTimes(1);
    tableWrapper.onDestroy();

    applicationContext.stateManagementService.dispatch(new TestSetFolderContentAction('secondTestFolderContent'));

    expect(mockRender).toHaveBeenCalledTimes(1);
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
