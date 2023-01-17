import {File} from '../../../components/file-list/file';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
describe('File', () => {
  let fixture;

  beforeEach(() => {
    new ApplicationContext();
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should change innerText when created File component.', ()=> {
    expect.assertions(1);
    new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '5000',
        id: '36',
      },
    });
    expect(fixture.innerHTML).toBe(
        `<tr>
                    <td class="cell-arrow">

                    </td>
                    <td class="cell-icon">
                        <span class="glyphicon glyphicon-book" aria-hidden="true">
                        </span>
                    </td>
                    <td class="cell-name">
                        Montenegro
                    </td>
                    <td class="cell-type">
                       PDF Document
                    </td>
                    <td class="cell-size">
                        4 KB
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="blue-button" data-td="link-download">
                                <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                            </a>
                            <a href="#" class="red-button" data-td="link-delete">
                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                            </a>
                        </div>

                    </td>
                </tr>`);
  });

  test('Should calls event after click on link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const file = new File(fixture, {
        file: {
          mimetype: 'application/pdf',
          type: 'file',
          name: 'Montenegro',
          size: '5000',
          id: '36',
        },
      });
      const listener = jest.fn();
      file.onDelete(listener);
      const deleteLink = fixture.querySelector('[data-td="link-delete"]');
      deleteLink.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });

  test('Should calls event after dblclick on row.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const file = new File(fixture, {
        file: {
          mimetype: 'application/pdf',
          type: 'file',
          name: 'Montenegro',
          size: '5000',
          id: '36',
        },
      });
      const listener = jest.fn();
      file.onEditing(listener);
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
      const file = new File(fixture, {
        file: {
          mimetype: 'application/pdf',
          type: 'file',
          name: 'Montenegro',
          size: '5000',
          id: '36',
        },
        itemInRenamingState: {
          mimetype: 'application/pdf',
          type: 'file',
          name: 'Montenegro',
          size: '5000',
          id: '36',
        },
      });
      const listener = jest.fn();
      file.onEditing(listener);
      const listenerOnNameChangedMock = jest.fn();
      file.onNameChanged(listenerOnNameChangedMock);
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
    const file = new File(fixture, {
      file: {
        type: 'file',
        mimetype: 'application/pdf',
        name: 'Montenegro',
        size: '50',
        id: '36',
      },
      itemInRenamingState: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '50',
        id: '36',
      },
    });
    const listener = jest.fn();
    file.onEditing(listener);
    const listenerOnNameChangedMock = jest.fn();
    file.onNameChanged(listenerOnNameChangedMock);
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
    new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '500',
        id: '36',
      },
      itemInRenamingState: {
        item: {
          mimetype: 'application/pdf',
          type: 'file',
          name: 'Montenegro',
          size: '500',
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
    new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '500',
        id: '36',
      },
      itemInRenamingState: {
        item: {
          mimetype: 'application/pdf',
          type: 'file',
          name: 'Montenegro',
          size: '500',
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
    const file = new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '500',
        id: '36',
      },
    });
    expect(fixture.innerHTML).toBe('<tr>\n' +
        '                    <td class="cell-arrow">\n' +
        '\n' +
        '                    </td>\n' +
        '                    <td class="cell-icon">\n' +
        '                        <span class="glyphicon glyphicon-book" aria-hidden="true">\n' +
        '                        </span>\n' +
        '                    </td>\n' +
        '                    <td class="cell-name">\n' +
        '                        Montenegro\n' +
        '                    </td>\n' +
        '                    <td class="cell-type">\n' +
        '                       PDF Document\n' +
        '                    </td>\n' +
        '                    <td class="cell-size">\n' +
        '                        500 Bytes\n' +
        '                    </td>\n' +
        '                    <td class="cell-buttons">\n' +
        '                        <div class="button-hidden">\n' +
        '                            <a href="#" class="blue-button" ' +
        'data-td="link-download">\n' +
        '                                <span class="glyphicon glyphicon-download" aria-hidden="true"></span>\n' +
        '                            </a>\n' +
        '                            <a href="#" class="red-button" data-td="link-delete">\n' +
        '                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>\n' +
        '                            </a>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </td>\n' +
        '                </tr>');

    file.file = {
      mimetype: 'application/pdf',
      type: 'file',
      name: 'new file',
      size: '10000',
      id: '40',
    };
    const tdName = fixture.querySelector('td.cell-name');
    expect(tdName.innerHTML).toMatch('new file');

    file.itemInRenamingState = {
      item: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'new file',
        size: '10000',
        id: '40',
      },
    };
    const input = fixture.querySelector('td.cell-name input');
    expect(input.value).toBe('new file');

    file.isRenamingInProgress = true;
    const tdLoadingName = fixture.querySelector('td.cell-name');
    expect(tdLoadingName.innerHTML).toBe('\n' +
        '                        <input class="input-text name" value="new file">\n' +
        '                          <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>\n' +
        '                    ');

    file.renamingError = 'testError';
    const renamingError = fixture.querySelector('div.error-text');
    expect(renamingError.innerHTML).toMatch('testError');
  });

  test('Should calls listener on download.', ()=> {
    expect.assertions(1);
    const file = new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '5000',
        id: '36',
      },
    });
    const listener = jest.fn();
    file.onDownload(listener);
    const link = fixture.querySelector('[data-td="link-download"]');
    link.click();
    expect(listener).toHaveBeenCalled();
  });
  test('Should change link for download when isDownloadInProgress.', ()=> {
    expect.assertions(1);
    new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '5000',
        id: '36',
      },
      isDownloadInProgress: true,
    });
    const link = fixture.querySelector('[data-td="link-download"]');
    expect(link.innerHTML).toMatch(
      '<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>');
  });

  test('Should change link for download when downloadError is defined.', ()=> {
    expect.assertions(2);
    new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '5000',
        id: '36',
      },
      downloadError: {
        error: 'testError',
      },
    });
    const link = fixture.querySelector('[data-td="link-download"]');
    expect(link.innerHTML).toMatch(
      '<span class="glyphicon glyphicon-exclamation-sign error" aria-hidden="true"></span>');
    expect(link.title).toBe('testError');
  });

  test('Should create file without.', ()=> {
    expect.assertions(2);
    new File(fixture, {
      file: {
        mimetype: 'application/pdf',
        type: 'file',
        name: 'Montenegro',
        size: '5000',
        id: '36',
      },
      downloadError: {
        error: 'testError',
      },
    });
    const link = fixture.querySelector('[data-td="link-download"]');
    expect(link.innerHTML).toMatch(
      '<span class="glyphicon glyphicon-exclamation-sign error" aria-hidden="true"></span>');
    expect(link.title).toBe('testError');
  });
});
