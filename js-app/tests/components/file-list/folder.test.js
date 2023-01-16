import {Folder} from '../../../components/file-list/folder';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';

describe('Folder', () => {
  let fixture;

  beforeEach(() => {
    new ApplicationContext();
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should change innerText when created File component.', ()=> {
    expect.assertions(1);
    new Folder(fixture, {
      folder:
          {
            type: 'folder',
            name: 'Montenegro',
            size: null,
            id: '36',
          },
      isUploading: false,
      uploadError: null,
    });
    expect(fixture.innerHTML).toBe(
        `<tr>
                    <td class="cell-arrow">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    </td>
                    <td class="cell-icon">
                       <span class="glyphicon glyphicon-folder-close" aria-hidden="true">
                       </span>
                    </td>
                     <td class="cell-name folder">
                   <slot data-td="link-slot-folder"><a href="#" data-td="link" title="Montenegro">Montenegro</a></slot>
                    </td>
                    <td class="cell-type">
                        Folder
                    </td>
                    <td class="cell-size">
                        —
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="green-button " data-td="link-upload">
                                <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
                            </a>
                            <a href="#" class="red-button" data-td="link-delete">
                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                            </a>
                        </div>
                    </td>
                </tr>`);
  });

  test('Should calls event after click on removing link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        folder:
            {
              type: 'folder',
              name: 'Montenegro',
              size: null,
              id: '36',
            },
        isUploading: false,
        uploadError: null,
      });
      const listener = jest.fn();
      folder.onDelete(listener);
      const deleteLink = fixture.querySelector('[data-td="link-delete"]');
      deleteLink.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });

  test('Should calls event after click on folder link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        folder:
            {
              type: 'folder',
              name: 'Montenegro',
              size: null,
              id: '36',
            },
        isUploading: false,
        uploadError: null,
      });
      const listener = jest.fn();
      folder.onNavigateToFolder(listener);
      const link = fixture.querySelector('[data-td="link-slot-folder"] a');
      link.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });

  test('Should calls listener after click on upload link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        folder:
            {
              type: 'folder',
              name: 'Montenegro',
              size: null,
              id: '36',
            },
        isUploading: false,
        uploadError: null,
      });
      const listener = jest.fn();
      folder.onUpload(listener);
      const link = fixture.querySelector('[data-td="link-upload"]');
      link.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });

  test('Should change link when uploading files in the progress.', ()=> {
    expect.assertions(1);
    new Folder(fixture, {
      folder:
          {
            type: 'folder',
            name: 'Montenegro',
            size: null,
            id: '36',
          },
      isUploading: true,
      uploadError: null,
    });
    const link = fixture.querySelector('[data-td="link-upload"]');
    expect(link.innerHTML).toBe(`
                                <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>
                            `);
  });

  test('Should change link when uploading files in the error state.', ()=> {
    expect.assertions(1);
    new Folder(fixture, {
      folder:
          {
            type: 'folder',
            name: 'Montenegro',
            size: null,
            id: '36',
          },
      isUploading: false,
      uploadError: 'error',
    });
    const link = fixture.querySelector('[data-td="link-upload"]');
    expect(link.innerHTML).toBe(`
                                <span class="glyphicon glyphicon-exclamation-sign error" aria-hidden="true"></span>
                            `);
  });

  test('Should calls event after dblclick on row.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        folder:
            {
              type: 'folder',
              name: 'Montenegro',
              size: null,
              id: '36',
            },
        isUploading: false,
        uploadError: null,
      });
      const listener = jest.fn();
      folder.onEditing(listener);
      const row = fixture.querySelector('tr');
      const event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
      });
      row.dispatchEvent(event);
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });

  test('Should calls event after dblclick on row when itemInRenamingState is defined.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        folder: {
          type: 'folder',
          name: 'Montenegro',
          size: '5 kb',
          id: '36',
        },
        itemInRenamingState: {
          type: 'folder',
          name: 'Montenegro',
          size: '5 kb',
          id: '36',
        },
      });
      const listener = jest.fn();
      folder.onEditing(listener);
      const listenerOnNameChangedMock = jest.fn();
      folder.onNameChanged(listenerOnNameChangedMock);
      const row = fixture.querySelector('tr');
      const event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
      });
      row.dispatchEvent(event);
      const input = fixture.querySelector('input.name');
      input.value = 'testNewName';
      const changeEvent = new MouseEvent('change', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      input.dispatchEvent(changeEvent);
      setTimeout(()=>{
        expect(listenerOnNameChangedMock).toHaveBeenCalled();
        done();
      });
    });
  });

  test('Should delete input when name after editing state has not changed.', ()=> {
    expect.assertions(2);
    const folder = new Folder(fixture, {
      folder: {
        type: 'folder',
        name: 'Montenegro',
        size: '5 kb',
        id: '36',
      },
      itemInRenamingState: {
        type: 'folder',
        name: 'Montenegro',
        size: '5 kb',
        id: '36',
      },
    });
    const listener = jest.fn();
    folder.onEditing(listener);
    const listenerOnNameChangedMock = jest.fn();
    folder.onNameChanged(listenerOnNameChangedMock);
    const row = fixture.querySelector('tr');
    const event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
    });
    row.dispatchEvent(event);
    expect(fixture.querySelector('input')).toBeDefined();
    const input = fixture.querySelector('input.name');
    input.blur();
    expect(fixture.querySelector('input')).toBeNull();
  });

  test('Should show renaming error state .', ()=> {
    expect.assertions(1);
    const errorText = 'testError';
    new Folder(fixture, {
      folder: {
        type: 'folder',
        name: 'Montenegro',
        size: '5 kb',
        id: '36',
      },
      itemInRenamingState: {
        item: {
          type: 'folder',
          name: 'Montenegro',
          size: '5 kb',
          id: '36',
        },
      },
      renamingError: errorText,
    });
    const errors = fixture.querySelector('div.error-text');
    expect(errors.innerHTML).toMatch(errorText);
  });

  test('Should show isRenamingInProgress state .', ()=> {
    expect.assertions(1);
    new Folder(fixture, {
      folder: {
        type: 'file',
        name: 'Montenegro',
        size: '5 kb',
        id: '36',
      },
      itemInRenamingState: {
        item: {
          type: 'file',
          name: 'Montenegro',
          size: '5 kb',
          id: '36',
        },
      },
      isRenamingInProgress: true,
    });
    const loading = fixture.querySelector('input.input-text.name span.loading');
    expect(loading).toBeDefined();
  });

  test('Should change innerHTML when states have changed by setters.', ()=> {
    expect.assertions(5);
    const folder = new Folder(fixture, {
      folder: {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: '36',
      },
    });
    expect(fixture.innerHTML).toBe('<tr>\n' +
        '                    <td class="cell-arrow">\n' +
        '                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
        '                    </td>\n' +
        '                    <td class="cell-icon">\n' +
        '                       <span class="glyphicon glyphicon-folder-close" aria-hidden="true">\n' +
        '                       </span>\n' +
        '                    </td>\n' +
        '                     <td class="cell-name folder">\n' +
        '                   <slot data-td="link-slot-folder"><a href="#" data-td="link" title="Montenegro">' +
        'Montenegro</a></slot>\n' +
        '                    </td>\n' +
        '                    <td class="cell-type">\n' +
        '                        Folder\n' +
        '                    </td>\n' +
        '                    <td class="cell-size">\n' +
        '                        —\n' +
        '                    </td>\n' +
        '                    <td class="cell-buttons">\n' +
        '                        <div class="button-hidden">\n' +
        '                            <a href="#" class="green-button " data-td="link-upload">\n' +
        '                                <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>\n' +
        '                            </a>\n' +
        '                            <a href="#" class="red-button" data-td="link-delete">\n' +
        '                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>\n' +
        '                            </a>\n' +
        '                        </div>\n' +
        '                    </td>\n' +
        '                </tr>');

    folder.folder = {
      type: 'folder',
      name: 'new folder',
      size: null,
      id: '40',
    };
    const tdName = fixture.querySelector('td.cell-name');
    expect(tdName.innerHTML).toMatch('new folder');

    folder.itemInRenamingState = {
      item: {
        type: 'pdf',
        name: 'new folder',
        size: '10 kb',
        id: '40',
      },
    };
    const input = fixture.querySelector('td.cell-name input');
    expect(input.value).toBe('new folder');

    folder.isRenamingInProgress = true;
    const tdLoadingName = fixture.querySelector('td.cell-name');
    expect(tdLoadingName.innerHTML).toBe('\n' +
        '                        <input class="input-text name" value="new folder">\n' +
        '                          <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>\n' +
        '                    ');

    folder.renamingError = 'testError';
    const renamingError = fixture.querySelector('div.error-text');
    expect(renamingError.innerHTML).toMatch('testError');
  });
});
