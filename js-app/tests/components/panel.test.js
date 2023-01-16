import {Panel} from '../../components/panel';
import {jest} from '@jest/globals';

describe('Panel', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should call listener for upload button', ()=> {
    expect.assertions(1);
    const panel = new Panel(fixture);
    const mockOnUploadListener = jest.fn();
    panel.onUpload(mockOnUploadListener);
    const uploadButton = fixture.querySelector('[data-td="upload-button"] button');
    uploadButton.click();
    expect(mockOnUploadListener).toHaveBeenCalled();
  });

  test('Should call listener for create new folder button', ()=> {
    expect.assertions(1);
    const panel = new Panel(fixture);
    const mockOnCreateFolderListener = jest.fn();
    panel.onCreateNewFolder(mockOnCreateFolderListener);
    const createFolderButton = fixture.querySelector('[data-td="create-folder-button"] button');
    createFolderButton.click();
    expect(mockOnCreateFolderListener).toHaveBeenCalled();
  });

  test('Should change innerHTML', ()=> {
    expect.assertions(1);
    new Panel(fixture);
    expect(fixture.innerHTML).toBe('<div class="panel"><form>\n' +
        '                <div class="searching">\n' +
        '                    <input name="“name”" class="input-text search" value="Enter entity name...">\n' +
        '                    <button type="submit" class="button primary search" title="Search">\n' +
        '                        Search\n' +
        '                    </button>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '             <slot data-td="button-panel"><div class="buttons">\n' +
        '                <slot data-td="upload-button"><button class="button primary" data-td="button" ' +
        'type="submit" title="upload"><span class="glyphicon glyphicon-upload" aria-hidden="true">' +
        '</span></button></slot>\n' +
        '                <slot data-td="create-folder-button"><button class="button primary" ' +
        'data-td="button" type="submit" title="Create new folder"><span class="glyphicon glyphicon-plus" ' +
        'aria-hidden="true"></span></button></slot>\n' +
        '            </div></slot></div>');
  });
});
