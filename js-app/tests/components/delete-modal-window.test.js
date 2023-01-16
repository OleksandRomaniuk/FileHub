import {DeleteModalWindow} from '../../components/delete-modal-window';
import {expect} from '@jest/globals';
import {jest} from '@jest/globals';

describe('DeleteModalWindow', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText when item is defined.', ()=> {
    expect.assertions(1);
    new DeleteModalWindow(fixture,
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      },
      false,
      null);
    expect(fixture.innerHTML).toBe('<div class="modal delete">\n' +
            '    <div class="box">\n' +
            '        <div class="header">\n' +
            '            <h1>Delete File</h1>\n' +
            '            <a href="#" title="close" data-td="close-link">\n' +
            '                <span class="glyphicon glyphicon-remove remove " aria-hidden="true"></span>\n' +
            '            </a>\n' +
            '        </div>\n' +
            '        <main>\n' +
            '            Are you sure you want to delete "<strong>Montenegro</strong>" folder?\n' +
            '             \n' +
            '        </main>\n' +
            '        <footer class="flex-buttons">\n' +
            '        <slot data-td="cancel-button"><button class="button cancel" data-td="button" ' +
            'type="submit" title="Cancel">Cancel</button></slot>\n' +
            '        <slot data-td="delete-button"><button class="button delete" data-td="button"' +
            ' type="submit" title="Delete">Delete</button></slot>\n' +
            '        </footer>\n' +
            '      </div> </div>');
  });
  test('Should change innerText when state is itemBeingDeleted.', ()=> {
    expect.assertions(1);
    new DeleteModalWindow(fixture,
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      },
      true,
      null);
    // language=HTML
    expect(fixture.innerHTML).toBe('<div class="modal delete">\n' +
            '    <div class="box">\n' +
            '        <div class="header">\n' +
            '            <h1>Delete File</h1>\n' +
            '            <a href="#" title="close" data-td="close-link">\n' +
            '                <span class="glyphicon glyphicon-remove remove " aria-hidden="true"></span>\n' +
            '            </a>\n' +
            '        </div>\n' +
            '        <main>\n' +
            '            Are you sure you want to delete "<strong>Montenegro</strong>" folder?\n' +
            '             \n' +
            '        </main>\n' +
            '        <footer class="flex-buttons">\n' +
            '        <slot data-td="cancel-button"><button class="button cancel" data-td="button" ' +
            'type="submit" title="Cancel" disabled="">Cancel</button></slot>\n' +
            '        <slot data-td="delete-button"><button class="button delete" data-td="button"' +
            ' type="submit" title="Delete" disabled="">' +
            '<span class="glyphicon glyphicon-repeat loading" aria-hidden="true">' +
            '</span> Delete</button></slot>\n' +
            '        </footer>\n' +
            '      </div> </div>');
  });
  test('Should change innerText when state has defined removingError.', ()=> {
    expect.assertions(1);
    new DeleteModalWindow(fixture,
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      },
      true,
      'Server Error');
    expect(fixture.innerHTML)
      .toBe('<div class="modal delete">\n' +
                '    <div class="box">\n' +
                '        <div class="header">\n' +
                '            <h1>Delete File</h1>\n' +
                '            <a href="#" title="close" data-td="close-link">\n' +
                '                <span class="glyphicon glyphicon-remove remove " aria-hidden="true"></span>\n' +
                '            </a>\n' +
                '        </div>\n' +
                '        <main>\n' +
                '            Are you sure you want to delete "<strong>Montenegro</strong>" folder?\n' +
                '             <div class="error-text"> Server Error </div>\n' +
                '        </main>\n' +
                '        <footer class="flex-buttons">\n' +
                '        <slot data-td="cancel-button"><button class="button cancel" data-td="button"' +
                ' type="submit" title="Cancel" disabled="">Cancel</button></slot>\n' +
                '        <slot data-td="delete-button"><button class="button delete" data-td="button"' +
                ' type="submit" title="Delete" disabled="">' +
                '<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span> Delete</button></slot>\n' +
                '        </footer>\n' +
                '      </div> </div>');
  });

  test('Should click on cancel.', ()=>{
    return new Promise((done) => {
      const deleteModalWindow = new DeleteModalWindow(fixture,
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: 'folder2',
        },
        false,
        null);

      const mockCancel = jest.fn();
      deleteModalWindow.listenerOnCancel = mockCancel;
      const buttonCancel = fixture.querySelector('[data-td="cancel-button"] button');
      buttonCancel.click();
      setTimeout(()=>{
        expect(mockCancel).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
  test('Should click on close link.', ()=>{
    return new Promise((done) => {
      const deleteModalWindow = new DeleteModalWindow(fixture,
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: 'folder2',
        },
        false,
        null);

      const mockCancel = jest.fn();
      deleteModalWindow.listenerOnCancel = mockCancel;
      const buttonCancel = fixture.querySelector('[data-td="close-link"]');
      buttonCancel.click();
      setTimeout(()=>{
        expect(mockCancel).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
  test('Should click on delete button.', ()=>{
    return new Promise((done) => {
      const deleteModalWindow = new DeleteModalWindow(fixture,
        {
          type: 'folder',
          name: 'Montenegro',
          size: null,
          id: 'folder2',
        },
        false,
        null);

      const mockCancel = jest.fn();
      deleteModalWindow.listenerOnDelete = mockCancel;
      const buttonCancel = fixture.querySelector('[data-td="delete-button"] button');
      buttonCancel.click();
      setTimeout(()=>{
        expect(mockCancel).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
  test('Should retrn empthy div when do no have the item.', ()=>{
    expect.assertions(1);
    new DeleteModalWindow(fixture,
      null,
      false,
      null);
    expect(fixture.innerHTML).toBe('<div></div>');
  });
});
