import {expect, jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {State} from '../../../service/state-management/state';
import {registry} from '../../../application/registry.js';
import {CreateFolderModalWindowWrapper} from '../../../components/wrappers/create-folder-modal-window-wrapper';

describe('CreateFolderModalWindowWrapper', () => {
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
    const createFolderModalWindowWrapper = new CreateFolderModalWindowWrapper(fixture);
    const mockRender = jest.fn();
    jest
      .spyOn(createFolderModalWindowWrapper, 'render')
      .mockImplementation(mockRender);

    eventTarget.dispatchEvent(new CustomEvent(
      'stateChanged.newFolder',
      {detail: new State(
        {newFolder: 'testFolder'})},
    ));
    eventTarget.dispatchEvent(new CustomEvent(
      'stateChanged.isCreatingFolderInProgress',
      {detail: new State({isCreatingFolderInProgress: true})},
    ));
    eventTarget.dispatchEvent(new CustomEvent(
      'stateChanged.creatingFolderError',
      {detail: new State({creatingFolderError: 'error'})},
    ));
    expect(mockRender).toHaveBeenCalledTimes(3);
  });
  test('Should method set creator.', ()=>{
    expect.assertions(1);
    const createFolderModalWindowWrapper = new CreateFolderModalWindowWrapper(fixture);
    const mockCreator = jest.fn();
    createFolderModalWindowWrapper.createNewFolderModalWindowCreator = mockCreator;
    expect(mockCreator).toHaveBeenCalledTimes(1);
  });
});
