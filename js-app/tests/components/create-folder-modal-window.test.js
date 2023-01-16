import {expect} from '@jest/globals';
import {jest} from '@jest/globals';
import {CreateFolderModalWindow} from '../../components/create-folder-modal-window.js';

describe('CreateFolderModalWindow', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText when item is defined.', ()=> {
    expect.assertions(3);
    new CreateFolderModalWindow(fixture,
      {},
      false,
      null);
    const input = fixture.querySelector('input.directory');
    const error = fixture.querySelector('.error-text');
    const createButton = fixture.querySelector('[data-td="create-button"] button');

    expect(input).toBeDefined();
    expect(error).toBeNull();
    expect(createButton.innerHTML).toBe('Create');
  });
  test('Should change innerText when state is isCreatingFolderInProgress.', ()=> {
    expect.assertions(3);
    new CreateFolderModalWindow(fixture,
      {name: 'testName'},
      true,
      null);
    const input = fixture.querySelector('input.directory');
    const error = fixture.querySelector('.error-text');
    const createButton = fixture.querySelector('[data-td="create-button"] button');

    expect(input.value).toBe('testName');
    expect(error).toBeNull();
    expect(createButton.innerHTML).toBe(
      '<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span> Create');
  });
  test('Should change innerText when state has defined creatingFolderError.', ()=> {
    expect.assertions(2);
    new CreateFolderModalWindow(fixture,
      {},
      false,
      'testError');

    const input = fixture.querySelector('input.directory');
    const error = fixture.querySelector('.error-text');

    expect(input.value).toBe('');
    expect(error.innerHTML).toBe(' testError ');
  });

  test('Should click on cancel.', ()=>{
    expect.assertions(1);

    const createFolderModalWindow = new CreateFolderModalWindow(
      fixture,
      {},
      false,
      null);

    const mockCancel = jest.fn();
    createFolderModalWindow.listenerOnCancel = mockCancel;
    const buttonCancel = fixture.querySelector('[data-td="cancel-button"] button');
    buttonCancel.click();

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  test('Should click on close link.', ()=>{
    expect.assertions(1);

    const createFolderModalWindow = new CreateFolderModalWindow(
      fixture,
      {},
      false,
      null);

    const mockCancel = jest.fn();
    createFolderModalWindow.listenerOnCancel = mockCancel;
    const closeLink = fixture.querySelector('[data-td="close-link"]');
    closeLink.click();

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  test('Should click on create button.', ()=>{
    expect.assertions(1);

    const createFolderModalWindow = new CreateFolderModalWindow(
      fixture,
      {},
      false,
      null);
    const mockCreate = jest.fn();

    createFolderModalWindow.listenerOnCreate = mockCreate;
    const buttonCreate = fixture.querySelector('[data-td="create-button"] button');
    buttonCreate.click();
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  test('Should return empty div when do no have the item.', ()=>{
    expect.assertions(1);
    new CreateFolderModalWindow(fixture,
      null,
      false,
      null);
    expect(fixture.innerHTML).toBe('<div></div>');
  });
});
