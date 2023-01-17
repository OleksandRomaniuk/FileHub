import {expect, jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {State} from '../../../service/state-management/state';
import {BaseAction} from '../../../actions/base-action';
import {MUTATOR_NAME} from '../../../service/state-management/constatns/mutators';
import {DeleteModalWindowWrapper} from '../../../components/wrappers/delete-modal-window-wrapper';
import {registry} from "../../../application/registry.js";

describe('DeleteModalWindowWrapper', () => {
  let fixture;
  let eventTarget;

  beforeEach(() => {
    fixture = document.body;
    new ApplicationContext();
    fixture.innerHTML = '';
    eventTarget = new EventTarget();
  });

  test('Should change markup and call render when dispatching events.', ()=> {
    expect.assertions(1);
      const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    const deleteModalWindowWrapper = new DeleteModalWindowWrapper(fixture);
    const mockRender = jest.fn();
    jest
      .spyOn(deleteModalWindowWrapper, 'render')
      .mockImplementation(mockRender);

    eventTarget.dispatchEvent(new CustomEvent(
      'stateChanged.itemInRemovingState',
      {detail: new State(
        {itemInRemovingState:
                      {
                        type: 'folder',
                        name: 'Montenegro',
                        size: null,
                        id: 'folder2',
                      },
        })},
    ));
    eventTarget.dispatchEvent(new CustomEvent(
      'stateChanged.itemBeingDeleted',
      {detail: new State({
        itemInRemovingState:
                      {
                        type: 'folder',
                        name: 'Montenegro',
                        size: null,
                        id: 'folder2',
                      },
        itemBeingDeleted: true,
      },
      )},
    ));
    eventTarget.dispatchEvent(new CustomEvent(
      'stateChanged.removingError',
      {detail: new State({
        itemInRemovingState:
                  {
                    type: 'folder',
                    name: 'Montenegro',
                    size: null,
                    id: 'folder2',
                  },
        itemBeingDeleted: true,
        removingError: 'serverError',
      })},
    ));
    expect(mockRender).toHaveBeenCalledTimes(3);
  });
  test('Should method set creator.', ()=>{
    expect.assertions(1);
    const deleteModalWindowWrapper = new DeleteModalWindowWrapper(fixture);
    const mockCreator = jest.fn();
    deleteModalWindowWrapper.deleteModalWindowCreator = mockCreator;
    expect(mockCreator).toHaveBeenCalledTimes(1);
  });
  test('Should method destroy delete listeners on states.', ()=>{
    expect.assertions(2);
      const stateManagementService = registry.getInstance('stateManagementService');
    const deleteModalWindowWrapper = new DeleteModalWindowWrapper(fixture);
    const mockRender = jest
      .spyOn(deleteModalWindowWrapper, 'render')
      .mockImplementation(()=>{});

    stateManagementService.dispatch(new TestSetItemInRemovingStateAction(
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      },
    ));
    expect(mockRender).toHaveBeenCalledTimes(1);
    deleteModalWindowWrapper.onDestroy();
    stateManagementService.dispatch(new TestSetItemInRemovingStateAction(
      {
        type: 'folder',
        name: 'Montenegro2',
        size: null,
        id: 'folder3',
      },
    ));

    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});
/**
 * Change field in the state for tests.
 */
class TestSetItemInRemovingStateAction extends BaseAction {
  #itemInRemovingState;

  /**
   * @param {object} itemInRemovingState
   */
  constructor(itemInRemovingState) {
    super();
    this.#itemInRemovingState = itemInRemovingState;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE, this.#itemInRemovingState);
  }
}
